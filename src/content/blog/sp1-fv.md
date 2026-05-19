---
title: "On Formal Verification and Bugs in SP1 Hypercube"
date: "2026-05-04"
excerpt: "A practical study in establishing and validating formal correctness guarantees"
author: "Cody Gunton"
featured: true
---

*Acknowledgements: I thank Tamir Hemo, Alex Hicks, Petar Maksimović, Derek Sorensen and Devon Tuma for reviewing earlier drafts of this article.*

On 2025-10-09, [the following announcement was made on the blog of Succinct Labs](https://blog.succinct.xyz/nethermind-lean/):

> We are happy to announce that the Nethermind Security Formal Verification team and Succinct Labs have joined forces to formally verify the correctness of all of the core RV-64 chips from SP1 Hypercube (https://blog.succinct.xyz/sp1-hypercube/) RISC-V zkVM in the Lean proof assistant.

This technical blog post will break down what precisely was achieved by the formal verification, which established some strong security properties for certain parts of SP1 Hypercube. It will highlight some known limitations of the formal verification, and it will also describe some additional unknown gaps that were recently discovered and disclosed to Succinct. The post ends by making some recommendations about how the community of zkVM security professionals might better communicate about formal verification to improve the security of Ethereum.


# Formal verification claims
Loosely speaking, formally verifying software promises to reduce the trusted computing base (TCB) of a piece of software to a short list of components that can then be highly scrutinized. Trusted components typically include the following:
- Foundational logic; in this case, Lean's type theory and its implementation in the Lean kernel. Lean's elaborator, which translates high-level Lean to the kernel language, is not trusted in the sense that a bug in its implementation would not allow proving False, but could result in the kernel verifying a valid proof of something other than the intended statement.
- Specifications; in this case, the ultimate source of truth is the [Sail RISC-V specification](https://github.com/riscv/sail-riscv). [Sail](https://github.com/rems-project/sail) is a domain-specific language for describing instruction set architectures, and the Sail RISC-V model is maintained by the [Golden Model Task Group](https://lists.riscv.org/g/tech-golden-model).
- Extraction pipelines to bring things into the verification environment; in this case, the constraints are extracted from Rust to Lean and the RISC-V specification is extracted from Sail to Lean.
- Post-extraction processing of any kind (e.g. compilation to lower level code that is then executed) does not affect the semantics of the extracted artefacts.
- The theorem statements themselves and any axioms or hypotheses relied on.
- If executing a program, Lean's runtime execution is also trusted. This does not apply here.

If there are no issues with the above, then the announcement entails that there are Lean proofs showing that a number of SP1's constraints implement the corresponding RISC-V machine instructions as defined by the Sail RISC-V specification; that is, satisfaction of the constraints implies correct execution of the corresponding instruction. (There is some nuance here: the other direction, that correct execution of the RISC-V instruction implies satisfying the corresponding constraint, is not shown as this would require reasoning about SP1's witness generation.)

This helps increase confidence in the security of the system. Indeed, even a weaker statement with additional assumptions can still be useful by helping security professionals focus their efforts on features missed by formal verification.

## What's discussed in the announcement
The formal verification source code is [publicly available](https://github.com/succinctlabs/sp1-lean/), and the blog post functions as a survey targeted at an audience with significant background in the subject matter. Some of the claims in the blog are:

> In particular, the behaviour of the relevant RISC-V opcodes was verified against the official 64-bit RISC-V Sail specification. ... we have used the Lean proof assistant to verify the correctness of the entire core of the 64-bit SP1 Hypercube RISC-V zkVM with respect to the official RISC-V Sail specification. This covers the following 62 opcodes:
>   - 41 ALU-related opcodes: ADD, ADDW, ADDI, ADDIW, SUB, SUBW, XOR, XORI, OR, ORI, AND, ANDI, SLL, SLLI, SLLW, SLLIW, SRL, SRLI, SRLW, SRLIW, SRA, SRAI, SRAW, SRAIW, SLT, SLTI, SLTU, SLTIU, MUL, MULH, MULHU, MULHSU, MULW, DIV, DIVU, DIVW, DIVUW, REM, REMU, REMW, REMUW
>   - 10 control-flow-related opcodes: JAL, JALR, BEQ, BNE, BLT, BGE, BLTU, BGEU, LUI, AUIPC
>   - 11 memory-related opcodes: SB, SH, SW, SD, LB, LBU, LH, LHU, LW, LWU, LD

This quote uses the term "correctness" but, as we will discuss later, it is more accurate to say that the "soundness" of certain opcodes was verified. The formal verification effort was split according to the above groupings. Nethermind was contracted to prove soundness of ALU opcodes only, while Succinct took on the task of proving soundness of the control-flow and memory-related opcodes themselves.

In the final section, the blog post enumerates standard assumptions: the correctness of Lean's kernel, of the extraction, and of the authors' translation of the official RISC-V specification. It also enumerates nonstandard assumptions and limitations. These include: correctness of the bus infrastructure that "binds together statements proven in different 'chips'" (an optimization), "memory consistency", and correctness of certain lookup tables.

## Claims in the code

The [sp1-lean repository](https://github.com/succinctlabs/sp1-lean/) at its most recent commit [`e4fa1b7`](https://github.com/succinctlabs/sp1-lean/tree/e4fa1b7), which was pushed on the day the announcement was published, contains the Lean 4 proofs. This section catalogs what is assumed and what is proven, working from the foundations up.

### Axioms

In Lean 4, `axiom` declares a proposition that the kernel accepts without proof. Unlike a `theorem`, which must be justified by a proof term that the kernel type-checks, an `axiom` is simply asserted. Any theorem that depends (even transitively) on an axiom is only as trustworthy as that axiom: if an axiom is inconsistent—if it asserts something false—then every proposition becomes provable.

The sp1-lean proofs use four explicit axioms, declared in [Assumptions.lean](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Foundations/Assumptions.lean) and [SailM.lean](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Foundations/SailM.lean).

#### HTIF disabled
```lean
-- SailM.lean line 10
@[simp] axiom plat_enable_htif_eq_false : plat_enable_htif () = false
```

HTIF (Host/Target Interface Facility) is a mechanism that allows a simulated target machine to communicate with its host. It is not required—in fact, [an unofficial specification](https://github.com/riscv/sail-riscv/issues/147#issuecomment-4063872714) has only recently been prepared. But the Sail model of RISC-V supports this notion, so one assumes it needed to be addressed in the Lean.

#### SP1 memory protection disabled
```lean
-- Assumptions.lean line 87
@[simp] axiom mprotect_disabled : public_value () 151 = 0
```

This axiom is unrelated to the RISC-V specification. SP1 implements its own application-level memory protection mechanism (`mprotect`) as a custom zkVM syscall. `public_value () 151` is a flag in SP1's constraint system that controls whether mprotect is active. Its effect is concrete: in every [instruction reader's constraints](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Operations/Reader/RTypeReader/Constraints.lean#L28), there is a term `(is_real - is_trusted) * (public_value () 151 - 1)` that must equal zero. When the flag is 0 (mprotect disabled), this simplifies to `(is_real - is_trusted) * (-1) = 0`, which forces `is_trusted = is_real`—every executed instruction must be validated against the program table via a bus lookup. When the flag is 1 (mprotect enabled), the term vanishes and `is_trusted` is unconstrained, allowing rows to execute without being checked against the loaded program. This axiom asserts the proofs assume mprotect is off, meaning all instructions are program-verified.

#### PMP checks always succeed
```lean
-- Assumptions.lean lines 95-105
-- Comment: "We can't prove this directly because the loop in pmpCheck doesn't unfold."
axiom pmp_check_machine (reg_val offset : BitVec 64)
    (s : SailState) (hs : SailState.isInitialized s) (width : ℕ) :
    EStateM.run (pmpCheck ...) s = EStateM.Result.ok none s
axiom pmp_check_machine' (reg_val offset : BitVec 64)
    (s : SailState) (hs : SailState.isInitialized s) (width : ℕ) :
    EStateM.run (pmpCheck ...) s = EStateM.Result.ok none s
```

Physical Memory Protection (PMP) is defined in [Section 3.7 of the RISC-V Privileged Architecture specification](https://github.com/riscv/riscv-isa-manual/blob/main/src/priv-csrs.adoc). The spec states: "If no PMP entry matches an M-mode access, the access succeeds." SP1 does not implement privilege modes, CSR instructions, or `MRET`—it is an M-mode-only system, which is the simplest valid RISC-V implementation per [Section 3.1.1](https://github.com/riscv/riscv-isa-manual/blob/main/src/priv-csrs.adoc) ("A simple RISC-V implementation may provide only M-mode"). Since SP1 runs exclusively in Machine mode and does not configure any PMP entries (all address-matching fields remain in their reset state of OFF), all memory accesses should succeed unconditionally. These axioms assert exactly this.

They exist due to a Lean technical limitation rather than because the claim is in doubt. Lean's kernel verifies proofs by stepwise reduction of terms — evaluating expressions until they reach a normal form. The Sail model's `pmpCheck` function contains a recursive loop that iterates over all PMP entries, and this loop exceeds Lean's reduction budget (controlled by `maxHeartbeats`). The kernel cannot compute the result by brute-force evaluation, so the authors assert it as an axiom instead.

### Prerequisites: constraint tables and `Main`

SP1 organizes its circuit into "chips," each handling a group of RISC-V instructions. Each chip has a constraint table where every row represents one instruction execution, and every column is a KoalaBear field element (`Fin KB`, where KB is the prime 2^31 - 2^24 + 1). The number of columns varies by chip; for instance, the ADD chip has 34, the JALR chip has 39, and the DivRem chip has 247. Column meanings are chip-specific — recoverable from how the [generated constraint code](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/Add/Constraints.lean#L10) passes `Main[N]` values to named struct fields, but not defined in a standalone schema.

### Hypotheses on theorems

Beyond the global axioms, individual soundness theorems carry hypotheses — preconditions that must hold for the theorem to apply. Every hypothesis is a place where the proof's coverage ends and trust begins. The following is a complete enumeration of all distinct hypothesis types across the chip theorems.

#### Standard hypotheses (all chips)

Every theorem requires these three hypotheses. The first, `cstrs`, asserts that the [generated polynomial constraints](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/Add/Constraints.lean) for a chip are satisfied by the column values in `Main`. In SP1's proof system, each execution step produces a row of field elements; the prover must demonstrate that these values satisfy the chip's constraint polynomials. The `cstrs` hypothesis says: assume they do. The proof then shows what follows.

```lean
(cstrs : (constraints Main).allHold)
```

The second, `h_is_real`, distinguishes real execution rows from padding. SP1's constraint tables are padded to power-of-two sizes; padding rows have `is_real = 0` and are not expected to satisfy the semantic constraints. This hypothesis restricts the theorem to rows that represent actual instruction executions.

```lean
(h_is_real : Main[N] = 1)  -- N varies by chip (e.g., Main[33] for ADD)
```

The third, `state_cstrs`, ties the constraint columns to a concrete Sail machine state _before_ the instruction executes. It asserts that the register and memory values encoded in `Main` match the **input** state `s` — for example, that the PC columns match `s.regs[PC]` and that operand columns match the corresponding register values. The theorem's _conclusion_ then proves that the **output** states agree: the Sail spec and SP1 implementation produce the same result when run from this input.

```lean
(state_cstrs : (constraints Main).initialState s)
```

This makes each chip theorem a single-step soundness statement as in "if the input state matches the columns, this one instruction step is correct." Composing these into a full-trace soundness argument requires the bus argument and memory consistency infrastructure that the blog post lists as unverified nonstandard assumptions.

#### State initialization (JAL, JALR, branch, memory chips)

Theorems for instructions that read the PC or access memory additionally require:

```lean
(hs : isInitialized s)
```

The Sail machine state stores registers in a hash map. [`isInitialized`](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Foundations/Register.lean#L9) is defined as `∀ reg : Register, reg ∈ s.regs` — every register key exists in the map. This is not about register values being nonzero; it is about the keys being present so that `s.regs.get Register.PC (hs _)` is well-defined. Without this hypothesis, register reads would be undefined at the type level. ALU-only chips (ADD, SUB, MUL, etc.) do not need this because they only read register values from the constraint columns, not from the Sail state directly.

#### Opcode selectors (multi-opcode chips)

Some chips handle multiple opcodes with a single constraint system. For example, the [BranchChip](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/BranchChip.lean) covers BEQ, BNE, BLT, BGE, BLTU, and BGEU. Rather than one theorem for all six, there is a separate theorem per opcode, each with a hypothesis like `h_is_beq : Main[29] = 1` selecting which opcode flag is active. These are not environmental assumptions — they are case splits, selecting which Sail specification function the SP1 implementation is compared against.

This pattern appears across 8 chips covering ~40 opcode variants: [BranchChip](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/BranchChip.lean) (6 branch types), [ShiftLeftChip](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/ShiftLeftChip.lean)/[ShiftRightChip](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/ShiftRightChip.lean) (12 shift variants), [BitwiseChip](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/BitwiseChip.lean) (6 bitwise ops), [LtChip](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/LtChip.lean) (4 comparisons), [MulChip](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/MulChip.lean) (5 multiply variants), [DivRemChip](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/DivRemChip.lean) (8 div/rem variants), [AddwChip](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/AddwChip.lean) (2 variants), and the load chips (signed/unsigned variants).

#### `h_is_trusted` (ADDW only)

```lean
-- AddwChip.lean line 39
(h_is_trusted : Main[32] = 1)
```

Each instruction reader in SP1 has an `is_trusted` column. When `is_trusted = 1`, the reader emits a [`send (.program ...)`](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Operations/Reader/RTypeReader/Constraints.lean#L67) bus interaction with multiplicity `is_trusted` — this is a lookup that proves the instruction exists in the loaded program table. When `is_trusted = 0`, no lookup occurs, and the instruction executes without being checked against the program.

As explained in the "SP1 memory protection disabled" axiom above, when mprotect is disabled the constraints force `is_trusted = is_real`, so this hypothesis follows from `h_is_real` and `cstrs`. Most chip proofs derive this automatically. The [ADDW theorem](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/AddwChip.lean#L39) states it explicitly — likely because the proof was written before the automatic derivation was in place, or because the ALU reader's more complex structure made the automatic extraction inconvenient.

#### `h_valid_pc` (JALR only)

```lean
-- JalrChip.lean line 38
-- Write value is a valid PC value. This can be proved from constraints on newest sp1 branch
(h_valid_pc : (Main[15].val + Main[21].val) % 4 = 0)
```

The [JALR theorem](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/JalrChip.lean#L38) assumes `next_pc % 4 = 0`, the same alignment hypothesis that every other branching/jumping chip carries. Because SP1's JALR omits the spec's `& ~1` step, this amounts to requiring `(rs1 + imm) % 4 = 0` on the un-masked sum. The source comment acknowledges this is unproven and deferred to a newer SP1 branch. This is the hypothesis most relevant to this article's findings, and it is the central topic of the "This bug was outside the scope of the formal verification effort" section below.

#### `hs_config` (all memory chips)

```lean
-- e.g. StoreWordChip.lean line 34
(hs_config : SailState.isValidMemConfig s hs)
```

Every store and load theorem requires [`isValidMemConfig`](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Foundations/Register.lean#L21), a structure with seven fields:

```lean
structure SailState.isValidMemConfig (s : SailState) (hs : SailState.isInitialized s) where
  h_mprv_disabled : BitVec.ofNat 1 (BitVec.toNat (s.regs.get Register.mstatus (hs _)) >>> 17) = 0#1
  h_cur_privilege  : s.regs.get Register.cur_privilege (hs _) = Privilege.Machine
  h_clint_base     : s.regs.get Register.plat_clint_base (hs _) = 0
  h_clint_size     : s.regs.get Register.plat_clint_size (hs _) = 0
  h_plat_ram_base  : s.regs.get Register.plat_ram_base (hs _) = 0
  h_plat_rom_base  : s.regs.get Register.plat_rom_base (hs _) = 0
  h_plat_ram_size  : s.regs.get Register.plat_ram_size (hs _) = BitVec.ofNat 64 (2^64 - 1)
```

This assumes Machine privilege mode ([Section 3.1 of the Privileged Architecture spec](https://github.com/riscv/riscv-isa-manual/blob/main/src/priv-csrs.adoc)), MPRV disabled (no address translation override), CLINT base and size at zero (no interrupt controller region), ROM base at zero, and RAM spanning the entire 64-bit address space. These reflect SP1's actual execution model but are not derived from the constraint system.

#### `h_fits_in_mem` (all memory chips)

```lean
-- e.g. StoreWordChip.lean line 38
(h_fits_in_mem :
  let reg_val := (Word.toBitVec64 #v[Main[15], Main[16], Main[17], Main[18]]).toNat
  let offset := (BitVec.signExtend 64 (sp1_imm_c Main)).toNat
  let ram_size := (s.regs.get Register.plat_ram_size (hs _)).toNat
  reg_val + offset + 4 ≤ ram_size)
```

Every store and load theorem assumes the target address fits in memory. The bound varies by access width and direction:

- Stores: `reg_val + offset + width ≤ ram_size` where width is 1 ([SB](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/StoreByteChip.lean#L37)), 2 ([SH](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/StoreHalfChip.lean#L38)), 4 ([SW](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/StoreWordChip.lean#L38)), or 8 ([SD](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/StoreDoubleChip.lean#L38))
- Loads: `reg_val + offset + width < 2^64` — a weaker no-overflow bound for [LB](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/LoadByteChip.lean#L45)/[LH](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/LoadHalfChip.lean#L38)/[LW](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/LoadWordChip.lean#L39) and their unsigned variants

#### `h_is_aligned` (SH, SW, SD only)

```lean
-- e.g. StoreWordChip.lean line 45
-- dt: This should eventually come from trusted instruction assumption
(h_is_aligned : is_aligned_vaddr (virtaddr.Virtaddr
  (Word.toBitVec64 #v[Main[15], Main[16], Main[17], Main[18]] + BitVec.signExtend 64
    (BitVec.ofNat 12 (Word.toNat #v[Main[21], Main[22], Main[23], Main[24]])))) 4 = true)
```

Store half, store word, and store double require the effective address to be naturally aligned: 2-byte for [SH](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/StoreHalfChip.lean#L45), 4-byte for [SW](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/StoreWordChip.lean#L45), 8-byte for [SD](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/StoreDoubleChip.lean#L45). The source comment "dt: This should eventually come from trusted instruction assumption" indicates this was intended to be derived from the constraint system but is currently assumed. Store byte ([SB](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/StoreByteChip.lean#L31)) does not need this since byte accesses are trivially aligned. No load theorem requires alignment.

### What the theorems say

Each chip has a per-row soundness theorem of the single-step form described in the "State initialization" hypothesis subsection above. For example, the [ADD chip theorem](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/AddChip.lean#L30) (annotations ours) is:

```lean
theorem correct_add
    (Main : Vector (Fin KB) 34)            -- Let Main be a row of the ADD constraint table.
    (s : SailState)                        -- Let s be a valid state of the reference machine.
    (h_cstrs : (constraints Main).allHold) -- If all polynomial constraints are satisfied,
    (h_is_real : Main[33] = 1)             -- if the row is not a padding row,
    (state_cstrs : (constraints Main).initialState s)
                                           -- and if the state of SP1 matches s,
    :                                      -- then
    (spec_add op_c op_b op_a).run s        -- the state of the reference after executing ADD
    =                                      -- equals
    (sp1_add Main).run s                   -- the state of SP1 Hypercube after executing ADD.
```

`Main` refers to a single row of the relevant chip's constraint table, which is assumed to be filled in with witness values. The theorem asks: if the constraints accept this row, does it describe a correct state transition? Both sides of the conclusion describe the state update for a single ADD instruction. [`spec_add`](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/AddChip.lean#L15) is the RISC-V specification's version: read two source registers from state `s`, compute their sum via the [Sail model's](https://github.com/rems-project/sail-riscv) `execute_RTYPE`, write the result to the destination register, and set the next PC to `PC + 4`. [`sp1_add`](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/AddChip.lean#L20) is SP1's version: perform the same register writes but read all values from the constraint columns — the result from `Main[29..32]`, the next PC from `Main[3..5] + 4`. Both are just a few register writes. `.run s` applies those writes to the input state `s` and returns the resulting machine state.

# Finding the bug through testing
The [RISC-V Architectural Test SIG](https://lists.riscv.org/g/sig-arch-test) maintains a canonical set of tests, the [RISC-V Architectural Certification Tests (ACTs)](https://github.com/riscv/riscv-arch-test). In this testing framework, the behavior of the device under testing is compared with that of a reference, which can be a C implementation derived from the Sail model. These are self-checking ELFs that embed expected values computed by the Sail reference model at compile time.

Running ACT4 against the executor in SP1 v6.0.2 yields 62 out of 64 passes on the RV64IM suite. One failure is the FENCE instruction, which has never been implemented by SP1. The other is `I-jalr-00`, the JALR instruction test.

## What JALR should do and SP1 Hypercube's implementation

The RISC-V specification defines JALR (Jump And Link Register) in the ["Unconditional Jumps" section of the unprivileged ISA manual](https://github.com/riscv/riscv-isa-manual/blob/main/src/rv32.adoc#L458-L464):

> The indirect jump instruction JALR (jump and link register) uses the I-type encoding. The [target address](https://github.com/riscv/riscv-isa-manual/blob/main/src/rv32.adoc#L459-L461) is obtained by adding the sign-extended 12-bit I-immediate to the register `rs1`, then setting the least-significant bit of the result to zero. The [address of the instruction following the jump](https://github.com/riscv/riscv-isa-manual/blob/main/src/rv32.adoc#L462-L463) (`pc`+4) is written to register `rd`.

That is, the computed target address is `(rs1 + imm) & ~1`. Clearing the lowest bit ensures the result is at least 2-byte aligned.

In the SP1 codebase, we see that this last step is missing.

The [JALR AIR](https://github.com/succinctlabs/sp1/blob/v6.0.2/crates/core/machine/src/control_flow/jalr/air.rs#L39-L48) defines next_pc as the raw output of an AddOperation on op_b (rs1) and op_c(imm), with no bit-clearing, then checks that next_pc is divisible by 4. Any input where rs1 + imm has bit 0 set will fail the check. A correct implementation would constrain next_pc = raw_sum & ~1 before the divisibility check.

```
// We constrain `next_pc` to be the sum of `op_b` and `op_c`.
let op_input = AddOperationInput::<AB>::new(
    local.adapter.b().map(|x| x.into()),
    local.adapter.c().map(|x| x.into()),
    local.add_operation,
    local.is_real.into(),
);
<AddOperation<AB::F> as SP1Operation<AB>>::eval(builder, op_input);

let next_pc = local.add_operation.value;
builder.assert_zero(next_pc[3]);

// Check that the `next_pc` value is a multiple of 4.
builder.send_byte(
    AB::Expr::from_canonical_u32(ByteOpcode::Range as u32),
    next_pc[0].into() * AB::F::from_canonical_u32(4).inverse(),
    AB::Expr::from_canonical_u32(14),
    AB::Expr::zero(),
    local.is_real,
);
```

Similarly, the corresponding [trace generation code](https://github.com/succinctlabs/sp1/blob/v6.0.2/crates/core/machine/src/control_flow/jalr/trace.rs#L96-L100) for the prover computes only the addition. The range check will fail if the sum is not 4-byte aligned.

```
cols.is_real = F::one();
cols.op_a_value = event.a.into();
let low_limb = (event.b.wrapping_add(imm) & 0xFFFF) as u16;
blu.add_bit_range_check(low_limb / 4, 14);
cols.add_operation.populate(blu, event.b, imm); -- event.b is the rs1 value
```

Finally, SP1's executor has multiple backends. On x86_64 Linux, which is where virtually all proving infrastructure runs, the executor uses a [JIT backend](https://github.com/succinctlabs/sp1/blob/v6.0.2/crates/core/jit/src/backends/x86/instruction_impl.rs#L835) that emits native x86 instructions. The JALR implementation in this backend computes `rs1 + imm` and stores it directly as the next PC.

```asm
add Rq(TEMP_A), imm as i32;
mov QWORD [Rq(CONTEXT) + PC_OFFSET], Rq(TEMP_A)
```

All three layers are consistent with each other, showing the issue is in the circuit design.

The practical impact may be limited: compilers almost never produce JALR targets with bit 0 set, because the & ~1 clearing is a spec-level detail that most toolchains don't rely on. But the RISC-V specification permits it, the architectural test suite covers it, and a formally verified system should handle it (or document it more explicitly as a limitation).

## This bug was outside the scope of the formal verification effort

As noted above, the [formal verification of SP1's JALR chip](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/JalrChip.lean#L38) includes this `h_valid_pc` hypothesis

```lean
(h_valid_pc : (Main[15].val + Main[21].val) % 4 = 0)
```
on the [`JALR_correct`](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/JalrChip.lean#L33) theorem:

```lean
theorem JALR_correct
    (cstrs : (constraints Main).allHold)
    (h_is_real : Main[30] = 1)
    (hs : isInitialized s)
    -- Write value is a valid PC value. This can be proved from constraints on newest sp1 branch
    (h_valid_pc : (Main[15].val + Main[21].val) % 4 = 0)
    (state_cstrs : (constraints Main).initialState s) :
    let op_b := sp1_op_b Main
    let op_a := sp1_op_a Main
    let op_c := sp1_op_c Main
    (spec_jalr op_c (.Regidx op_b) (.Regidx op_a)).run s = (sp1_jalr Main).run s
```

This `next_pc % 4 = 0` alignment is a hypothesis carried by every branching/jumping chip. In the case of JALR, SP1 omits the spec's `& ~1` mask from the computation of `next_pc`, so the hypothesis applies to the un-masked sum `rs1 + imm`.

Compilers may produce JALR inputs where `rs1 + imm` has bit 0 set, even though after the spec-mandated mask the target is 4-byte aligned. For such programs, the soundness theorem does not apply, and in testing, the SP1 prover crashes. Even if it didn't crash, constraints exist that would cause the verifier to reject the proof. This is a completeness bug which, in practical terms, could be a denial-of-service vector. **According to the scoping of the formal verification effort, this is not a gap in sp1-lean**. That effort only sought to establish soundness guarantees by modeling SP1 and showing that its semantics match a subset of the full semantics of the Sail model. This highlights the need for broadening the scope of sp1-lean or augmenting formal methods with other methods to ensure prover uptime.

For [branches](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Foundations/Assumptions.lean#L38) and [JAL](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Foundations/Assumptions.lean#L67), the [`trusted_instr`](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Foundations/Assumptions.lean#L45) assumption imposes four-byte alignment on the immediate, which combined with PC alignment yields `next_pc % 4 = 0`. SP1 does not implement the C (compressed instructions) extension, so a target that is 2-byte-aligned should raise an instruction-address-misaligned exception. Future work will check for compliance with [Execution Termination Semantics Standard](https://github.com/eth-act/zkvm-standards/tree/main/standards/standard-termination-semantics), which will cover this case.

After we reported the JALR bug to them, Succinct reported that they fixed it in SP1 [v6.1.0](https://github.com/succinctlabs/sp1/releases/tag/v6.1.0) (see the [`fix: JALR LSB clearing`](https://github.com/succinctlabs/sp1/commit/ea9cadcbcf0a582a9d78f19c9a9ce75f66781399) commit). We have not attempted to update the Lean proofs.

# Reiterating the value of standards

When informed of the JALR bug, Succinct promptly acknowledged the finding, and their next release of SP1 contained a patch, demonstrating their commitment to following standards.

In general, there is a tradeoff between optimality of a standard for a particular use case, and the benefits of interoperability, including the availability of shared tooling and applicability of external security analysis. One could reasonably argue that two-byte-aligned target addresses that are not four-byte-aligned are a niche possibility, either not seen in our use cases or one that would be caught in testing. However, **Ethereum requires the strongest available assurances**. Relying on test coverage plus a post-compilation validation step to ensure that a guest program does not contain valid but unsupported instructions is too brittle for security-critical infrastructure.

More broadly, the Ethereum Foundation's zkEVM Team, with broad community input and support, has advanced a set of [zkEVM standards](https://github.com/eth-act/zkvm-standards/tree/main/standards) that build on the official RISC-V specification without modification. The goal of these is to provide interoperability guarantees and security improvements.

# Additional findings from an LLM-assisted audit

The JALR findings above emerged from compliance testing and manual inspection. After learning of this issue, Alex Hicks conducted a systematic audit of the remaining theorems using an LLM-assisted process. This exposed the additional issues that we now discuss.

An agent was given the JALR issue as a guiding example and asked to perform the following tasks:
1. Compile a list of all declarations (theorems, lemmas, ...).
2. For each declaration, list the theorem goal and assumptions.
3. For each theorem goal and set of assumptions, evaluate whether the theorem goal and whether any assumptions used are reasonable with respect to the RISC-V specification.

This process surfaced two classes of issues that manual review of hypothesis lists alone would not have caught: a theorem that proves nothing (vacuous truth from contradictory hypotheses) and theorems that prove the wrong thing (spec functions parameterized with incorrect values).

## Vacuous proofs

Due to a copy-paste error from the `Sltu` namespace, the [SLTI theorem](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/LtChip.lean#L132) in `LtChip.lean` is vacuously true. The `Slti` namespace declares a [`variable (h_is_sltu : is_sltu Main)`](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/LtChip.lean#L84) at line 84, which requires `Main[31] = 0`. The theorem `correct_slti` then takes an explicit [`(h_is_slti : is_slti Main)`](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/LtChip.lean#L134) at line 134, which requires `Main[31] = 1`. Due to Lean 4's variable auto-insertion, both hypotheses appear in the final theorem type:

```lean
Slti.correct_slti (Main : ...) (s : SailState)
  (h_is_sltu : is_sltu Main)   -- requires Main[31] = 0
  (h_is_slti : is_slti Main)   -- requires Main[31] = 1
  ...
```

Since `Main[31]` cannot simultaneously be 0 and 1, the hypotheses are contradictory and the theorem is discharged without proving anything — no `sorry` is needed because Lean's kernel can derive any conclusion from `False`.

While this does mean that SLTI had no valid soundness proof in the initial development, once the typo is corrected it is [straightforward to prove the theorem as intended](https://github.com/succinctlabs/sp1-lean/blob/7c76907a41f69b06682c177f8d03f72626015b58/SP1Chips/LtChip.lean#L73), meaning that the `Lt` chip implemented the `SLTI` instruction correctly from the start and that there were no related potential exploits whatsoever. With the fix, which is to be included in [this pull request](https://github.com/succinctlabs/sp1-lean/pull/92), SP1 becomes protected against silent regressions in `SLTI`.

## Wrong specifications

The LoadHalf and LoadWord spec functions use the wrong access width. [LoadHalfChip.lean:26](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/LoadHalfChip.lean#L26) defines `spec_lb` with `execute_LOAD ... (width := 1)` where it should be `width := 2` (half-word); [LoadWordChip.lean:27](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/LoadWordChip.lean#L27) does the same where it should be `width := 4` (word). The theorems prove that the LoadHalf and LoadWord chip constraints match **byte-load** semantics — even if the `sorry` markers in these files were resolved, the proofs would be proving the wrong thing. **LH, LHU, LW, and LWU are effectively unverified.**


# Final accounting of the formal verification outcomes
The full list of chips with per-row soundness theorems:

The blog post claims 62 verified opcodes in three categories. The following lists each opcode with a link to its soundness theorem, or notes its absence. Two labels are introduced here: **no theorem** means the constraints are extracted to Lean but no soundness proof is stated, and **sorry** means the theorem depends on an unfinished lemma. The remaining labels — **vacuously true** and **wrong specification** — are as discussed in the preceding sections of the same name.

- 40 of 41 ALU-related opcodes have complete, correct theorems: [ADD](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/AddChip.lean#L30), [ADDW](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/AddwChip.lean#L35), [ADDI](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/AddiChip.lean#L34), [ADDIW](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/AddwChip.lean#L121), [SUB](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/SubChip.lean#L35), [SUBW](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/SubwChip.lean#L34), [XOR](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/BitwiseChip.lean#L33), [XORI](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/BitwiseChip.lean#L97), [OR](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/BitwiseChip.lean#L161), [ORI](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/BitwiseChip.lean#L224), [AND](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/BitwiseChip.lean#L288), [ANDI](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/BitwiseChip.lean#L351), [SLL](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/ShiftLeftChip.lean#L34), [SLLI](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/ShiftLeftChip.lean#L91), [SLLW](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/ShiftLeftChip.lean#L148), [SLLIW](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/ShiftLeftChip.lean#L205), [SRL](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/ShiftRightChip.lean#L34), [SRLI](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/ShiftRightChip.lean#L94), [SRLW](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/ShiftRightChip.lean#L154), [SRLIW](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/ShiftRightChip.lean#L214), [SRA](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/ShiftRightChip.lean#L274), [SRAI](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/ShiftRightChip.lean#L334), [SRAW](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/ShiftRightChip.lean#L394), [SRAIW](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/ShiftRightChip.lean#L454), [SLT](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/LtChip.lean#L34), [SLTU](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/LtChip.lean#L252), [SLTIU](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/LtChip.lean#L339), [MUL](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/MulChip.lean#L32), [MULH](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/MulChip.lean#L94), [MULHU](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/MulChip.lean#L155), [MULHSU](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/MulChip.lean#L214), [MULW](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/MulChip.lean#L274), [DIV](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/DivRemChip.lean#L40), [DIVU](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/DivRemChip.lean#L87), [DIVW](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/DivRemChip.lean#L133), [DIVUW](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/DivRemChip.lean#L179), [REM](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/DivRemChip.lean#L225), [REMU](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/DivRemChip.lean#L271), [REMW](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/DivRemChip.lean#L317), [REMUW](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/DivRemChip.lean#L363). [SLTI](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/LtChip.lean#L132) has a theorem but it is **vacuously true** due to contradictory hypotheses (see the "Vacuous proofs" section above). NOP is not a separate opcode — it is an alias for `ADDI x0, x0, 0` and is covered by the ADDI theorem.
- 7 of 10 control-flow-related opcodes have correct theorems: [JAL](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/JalChip.lean#L40), [BEQ](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/BranchChip.lean#L31), [BNE](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/BranchChip.lean#L158), [BLT](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/BranchChip.lean#L285), [BGE](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/BranchChip.lean#L414), [BLTU](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/BranchChip.lean#L547), [BGEU](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/BranchChip.lean#L680). These assume 4-byte alignment on targets via `trusted_instr`, which is formally stricter than the spec's 2-byte requirement but excludes no programs with well-defined behavior in RV64I without the C extension (see the "This bug was outside the scope of the formal verification effort" section above). [JALR](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/JalrChip.lean#L33) is distinct: `h_valid_pc` assumes 4-byte alignment on the _pre-bit-clearing_ sum, which excludes valid inputs where `rs1 + imm` has bit 0 set — a case with well-defined spec behavior (clear bit 0, continue normally). [LUI and AUIPC](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/UTypeChip.lean) have **no theorem** — the file imports constraints but contains no proof.
- 4 of 11 memory-related opcodes have complete, correct theorems: [SB](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/StoreByteChip.lean#L31), [SH](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/StoreHalfChip.lean#L32), [SW](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/StoreWordChip.lean#L32), [SD](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/StoreDoubleChip.lean#L32). All 6 load theorems depend on **sorry** (incomplete proofs in sign extension lemmas). Additionally, the [LH](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/LoadHalfChip.lean#L32) and [LHU](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/LoadHalfChip.lean#L317) theorems prove **byte-load semantics** (width=1) instead of half-word (width=2), and [LW](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/LoadWordChip.lean#L33) and [LWU](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/LoadWordChip.lean#L325) similarly prove byte-load instead of word-load (width=4) — even if completed, these proofs verify the **wrong specification** (see the "Wrong specifications" section above). Only [LB](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/LoadByteChip.lean#L39) and [LBU](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/LoadByteChip.lean#L325) prove the correct spec, though they remain incomplete due to sorry. [LD](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/LoadDoubleChip.lean) has **no theorem** — the file contains definitions but no proof, despite having [fully extracted constraints](https://github.com/succinctlabs/sp1-lean/blob/e4fa1b7/SP1Chips/Load/LoadDouble/Constraints.lean).

Beyond the 62-opcode claim, FENCE is part of the RV64I base integer ISA and is required for compliance, but it has never been implemented by SP1 — neither in the executor nor in the constraint system.

Accounting for all issues, **51 of the 62 claimed opcodes have complete, correct proofs**: 40 ALU-related (all except SLTI), 7 control-flow (JAL and all six branches), and 4 stores (SB, SH, SW, SD).

# Recommendations for communicating and validating formal verification

Formal verification is often spoken of as the ultimate form of security analysis, one that might even remove the need for other safeguards such as implementation diversity, testing, and auditing of source code. This makes it incredibly important that the verification efforts are done with great care, and that the communication of results is always precise.

Regarding the code used in formal verification, whether in specifications, extractions, or theorem proving, it is incumbent upon practitioners to maximize clarity. With AI improving dramatically in recent years, one could argue that 'code quality' matters less and less. By the same token, AI agents can easily rewrite code for clarity, and as long as human validation is part of the process of producing critical systems, it is prudent to use abstractions and patterns of development that make the code readable. Regarding organization, a particular practice we suggest is having a small number of encapsulating theorems. It is harder to reason upward from many small individual theorems to a statement about the system in its entirety, and global theorems likely imply that more expressive abstractions exist.

Another development practice that should be followed is explicit reproducibility from basic inputs. In the case of SP1, versions of Lean and Mathlib are specified in a README, but the extraction of SP1 to Lean is provided without an indication of which version of SP1 was used. The same holds for the reference side: the commit of the Sail RISC-V model and the ratified version of the RISC-V unprivileged ISA it corresponds to should be pinned and surfaced alongside the proofs, so that readers can tell which revision of the standard the verification is a claim about. A full reproducible build setup should be provided. The extraction should be performed and proof files rebuilt on every commit that affects the code about which verification claims are made.

Public communication should properly contextualize the progress. The announcement deserves credit for explicitly calling out assumptions, but in an attempt to simplify things for a general audience, and also due to genuine errors in the formal verification, it contained significant misleading statements.

Finally, validation is critical. For any large enough codebase, bugs are a statistical likelihood. In the case of formal verification, specifications are code and the same principle applies. Specifications and precise security goals (i.e. theorems) are difficult to get right in many cases; both humans and AIs regularly make mistakes. This must be mitigated by review processes that can be far more deterministic.
Proper testing of the validation claims, plus a review by fresh eyes and an AI, should be done before putting forward public claims about the code.

Given the strong promise of formal verification, and the general perception in many technical audiences that it is The Final Tool that makes other forms of security analysis inessential, great care is needed in communicating what has and has not been proven.
