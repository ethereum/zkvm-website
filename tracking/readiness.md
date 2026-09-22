# Readiness


## zkevm-standards

Status tracks the standard itself; implementation is tracked in the guest program and zkVM tables below.

| Standard                                                                         | Status                                                                                                    |
| -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| [Host randomness](https://github.com/eth-act/zkevm-standards/pull/42)            | 🟡 Proposed                                                                                                |
| [Proving cost estimation](https://github.com/eth-act/zkevm-standards/pull/36)    | 🟡 Proposed                                                                                                |
| [Logging function](https://github.com/eth-act/zkevm-standards/pull/27)           | 🟡 Proposed                                                                                                |
| [Keccak-f[1600] permutation](https://github.com/eth-act/zkevm-standards/pull/26) | 🟡 Proposed                                                                                                |
| [U256 interface](https://github.com/eth-act/zkevm-standards/pull/22)             | 🟡 Proposed                                                                                                |
| [Minimum memory resources](https://github.com/eth-act/zkevm-standards/pull/20)   | 🟡 Proposed                                                                                                |
| Open issues (excluding PRs)                                                      | [12](https://github.com/eth-act/zkevm-standards/issues?q=is%3Aissue%20is%3Aopen) as of September 21, 2026 |

## Guest programs


🟢 Supported · 🟡 Partial · 🔴 Unsupported · ❓ Unknown · 🚧 TBD (assessment criteria not yet defined)

| Requirement                                                                                                                                                                                                                                                                                         | Ethrex                    | Reth                    | Zesu                    | Nethermind               | evm-asm               |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- | ----------------------- | ----------------------- | ------------------------ | --------------------- |
| [MIT + Apache 2.0 dual licensing](https://github.com/eth-act/zkevm-standards/blob/main/handbooks/guest-handbook.md#guest-program-rubric)                                                                                                                                                            | [🟢](https://github.com/lambdaclass/ethrex/blob/5b611f1/Cargo.toml#L47) | [🟢](https://github.com/paradigmxyz/stateless/blob/881516c/Cargo.toml#L5) | [🟢](https://github.com/Consensys-Incorporated/zesu/blob/1f5ef17/README.md#license) | 🔴                        | 🔴                     |
| [EEST tests passing across zkVMs](https://github.com/eth-act/zkevm-standards/blob/main/handbooks/guest-handbook.md#eest-specs-and-tests) ([dashboard: v0.8.4](https://eth-act.github.io/eest-execution-witness-dashboard/#/group/tests-zkevm%20v0.8.4)) | 🟡 | 🟢 | 🟡 | 🔴 | 🔴 |
| [Signed ELF and verification-key release assets](https://github.com/eth-act/zkevm-standards/blob/main/handbooks/guest-handbook.md#release-elfs-in-teams-gh-repo-via-ci)                                                                                                                             | [🟢](https://github.com/lambdaclass/ethrex/releases/tag/v27.0.0) | [🟢](https://github.com/paradigmxyz/stateless/blob/881516c/.github/workflows/reth-guests.yml)      | 🟡                       | 🟡                        | ❓                     |
| [ELF builds via public, fully open-source CI](https://github.com/eth-act/zkevm-standards/blob/main/handbooks/guest-handbook.md#release-elfs-in-teams-gh-repo-via-ci)                                                                                                                                | [🟢](https://github.com/lambdaclass/ethrex/blob/5b611f1/.github/workflows/tag_release.yaml)      | [🟢](https://github.com/paradigmxyz/stateless/blob/881516c/.github/workflows/reth-guests.yml)      | [🟢](https://github.com/Consensys-Incorporated/zesu-zkvm/blob/e9f6dd0/.github/workflows/release.yml)      | [🟢](https://github.com/NethermindEth/nethermind/blob/364eaaf/.github/workflows/stateless-tests.yml) | [🟢](https://github.com/Verified-zkEVM/evm-asm/blob/7e65e4d/.github/workflows/build.yml) |
| [ELF formal verification](https://github.com/eth-act/zkevm-standards/blob/main/handbooks/guest-handbook.md#guest-program-rubric)                                                                                                                                                                    | 🚧                         | 🚧                       | 🚧                       | 🚧                        | 🚧                     |
| [RISC-V target](https://github.com/eth-act/zkevm-standards/blob/main/standards/riscv-target/target.md)                                                                                                                                                                                              | 🟢                         | 🟢                       | 🟢                       | 🟢                        | ❓                     |
| [I/O interface](https://github.com/eth-act/zkevm-standards/blob/main/standards/io-interface/README.md)                                                                                                                                                                                              | ❓                         | ❓                       | [🟢](https://github.com/Consensys-Incorporated/zesu/blob/1f5ef17/src/zkvm/extern_io.zig)      | ❓                        | ❓                     |
| [Cryptographic accelerators C interface](https://github.com/eth-act/zkevm-standards/blob/main/standards/c-interface-accelerators/README.md)                                                                                                                                                         | ❓                         | ❓                       | ❓                       | ❓                        | ❓                     |
| [Accelerated memory operations](https://github.com/eth-act/zkevm-standards/blob/main/standards/accelerated-memory-operations/README.md)                                                                                                                                                             | ❓                         | ❓                       | ❓                       | ❓                        | ❓                     |
| [Standard entry point and vendor-library linking](https://github.com/eth-act/zkevm-standards/blob/main/standards/static-library-and-linker-script/README.md), including [vendor memory layout](https://github.com/eth-act/zkevm-standards/blob/main/standards/memory-layout-restrictions/README.md) | ❓                         | ❓                       | ❓                       | ❓                        | ❓                     |
| [ELF artifact compliance](https://github.com/eth-act/zkevm-standards/blob/main/standards/elf-loading-and-validation/README.md)                                                                                                                                                                      | ❓                         | ❓                       | ❓                       | ❓                        | ❓                     |
| [Exit codes and language-level failure mapping](https://github.com/eth-act/zkevm-standards/blob/main/standards/standard-termination-semantics/README.md)                                                                                                                                            | ❓                         | ❓                       | ❓                       | ❓                        | ❓                     |
| Uses non-bump allocator (TBD)   | ❓ | ❓ | ❓ | ❓ | ❓ |

Notes below apply only to non-green statuses.

<details>
<summary>Ethrex</summary>

- **EEST tests passing across zkVMs — 🟡:** In the [v0.8.4 dashboard](https://eth-act.github.io/eest-execution-witness-dashboard/#/group/tests-zkevm%20v0.8.4), SP1 v6.4.0 passes all 20,593 tests; Zisk v1.1.0-alpha and OpenVM v2.1.0-preview each pass 20,590/20,593, with three failures each.

</details>

<details>
<summary>Zesu</summary>

- **EEST tests passing across zkVMs — 🟡:** In the [v0.8.4 dashboard](https://eth-act.github.io/eest-execution-witness-dashboard/#/group/tests-zkevm%20v0.8.4), Zisk v1.1.0-alpha passes all 20,593 tests; OpenVM and SP1 results are missing.
- **Signed ELF and verification-key release assets — 🟡:** The [reviewed release](https://github.com/Consensys-Incorporated/zesu-zkvm/releases/tag/tests-glamsterdam-devnet%40v8.1.4) includes signed ELFs for ZisK, OpenVM, and Linea, but a signed verification key only for ZisK. The [release workflow](https://github.com/Consensys-Incorporated/zesu-zkvm/blob/e9f6dd0/.github/workflows/release.yml) documents the missing keys for the other targets.

</details>

<details>
<summary>Nethermind</summary>

- **EEST tests passing across zkVMs — 🔴:** The [v0.8.4 dashboard](https://eth-act.github.io/eest-execution-witness-dashboard/#/group/tests-zkevm%20v0.8.4) contains Nethermind EL witness results, but no Nethermind guest results.
- **MIT + Apache 2.0 dual licensing — 🔴:** The [guest source](https://github.com/NethermindEth/nethermind/blob/364eaaf/src/Nethermind/Nethermind.Stateless.ZiskGuest/Program.cs) is licensed LGPL-3.0-only.
- **Signed ELF and verification-key release assets — 🟡:** The [release workflow](https://github.com/NethermindEth/nethermind/blob/364eaaf/.github/workflows/release-zisk-guest.yml) signs an archive containing the guest ELF, but does not generate or publish a verification key.

</details>

<details>
<summary>evm-asm</summary>

- **EEST tests passing across zkVMs — 🔴:** No guest results appear in the [v0.8.4 dashboard](https://eth-act.github.io/eest-execution-witness-dashboard/#/group/tests-zkevm%20v0.8.4).
- **MIT + Apache 2.0 dual licensing — 🔴:** The [repository license](https://github.com/Verified-zkEVM/evm-asm/blob/7e65e4d/LICENSE) is MIT-only.
- **RISC-V target — ❓:** Support has not been established.

</details>

## zkVMs


🟢 Supported · 🟡 Partial · 🔴 Unsupported · 🚧 TBD (assessment criteria not yet defined) · ❓ Unknown · ⏸️ Delayed

| Requirement                                                                                                                                                                       | Zisk | OpenVM | SP1 |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | ------ | --- |
| [MIT + Apache 2.0 dual licensing](https://github.com/eth-act/zkevm-standards/blob/main/handbooks/zkvm-handbook.md#zkvm-rubric)                                                    | 🟢    | 🟢      | 🟢   |
| [Circuit formal verification](https://github.com/eth-act/zkevm-standards/blob/main/handbooks/zkvm-handbook.md#formal-verification-requirements)                                   | 🚧    | 🚧      | 🚧   |
| [RTP* on the EF reference cluster](https://github.com/eth-act/zkevm-standards/blob/main/handbooks/zkvm-handbook.md#real-time-proving-rtp) ([benchmark tracking](#benchmarks--repricings)) | 🚧    | 🚧      | 🚧   |
| [Host randomness](https://github.com/eth-act/zkevm-standards/pull/42) | ❓ | 🟡 | ❓ |
| [Deterministic program verification-key generation](https://github.com/eth-act/ere/blob/225ce841dbdc33f28e509c5516c907cb8e7a039f/docs/vk-generation.md) | 🟢 | 🟢 | 🟢 |
| Documented cluster-mode support tested on the EF cluster | 🟡 | 🟡 | ❓ |
| [Final proof size ≤300 KiB](https://github.com/eth-act/zkevm-standards/blob/main/handbooks/zkvm-handbook.md#zkvm-rubric)                                                          | ❓    | ❓      | ❓   |
| [EF Cryptography review](https://github.com/eth-act/zkevm-standards/blob/main/handbooks/zkvm-handbook.md#cryptographic-security-proofs)                                           | ⏸️    | ⏸️      | ⏸️   |
| [RISC-V target](https://github.com/eth-act/zkevm-standards/blob/main/standards/riscv-target/target.md) ([tracker](https://eth-act.github.io/zkevm-test-monitor/))                 | 🟡    | 🟢      | 🔴   |
| [I/O interface](https://github.com/eth-act/zkevm-standards/blob/main/standards/io-interface/README.md)                                                                            | 🟡    | ❓      | 🟡   |
| [Cryptographic accelerators C interface](https://github.com/eth-act/zkevm-standards/blob/main/standards/c-interface-accelerators/README.md)                                       | 🟢    | ❓      | ❓   |
| [Accelerated memory operations](https://github.com/eth-act/zkevm-standards/blob/main/standards/accelerated-memory-operations/README.md)                                           | ❓    | ❓      | ❓   |
| [Static library and linker script](https://github.com/eth-act/zkevm-standards/blob/main/standards/static-library-and-linker-script/README.md)                                     | 🟡    | ❓      | 🟡   |
| [Memory layout restrictions](https://github.com/eth-act/zkevm-standards/blob/main/standards/memory-layout-restrictions/README.md)                                                 | 🟢    | ❓      | 🟢   |
| [Memory safety guard regions](https://github.com/eth-act/zkevm-standards/blob/main/standards/memory-safety-guard-regions/README.md)                                               | ❓    | ❓      | ❓   |
| [ELF loading and validation](https://github.com/eth-act/zkevm-standards/blob/main/standards/elf-loading-and-validation/README.md)                                                 | 🟡    | 🟡      | 🟡   |
| [Execution termination semantics](https://github.com/eth-act/zkevm-standards/blob/main/standards/standard-termination-semantics/README.md)                                        | 🟡    | 🟡      | 🟡   |
| [Instruction address misaligned exception semantics](https://github.com/eth-act/zkevm-standards/blob/main/standards/instruction-address-misaligned-exception-semantics/README.md) | ❓    | ❓      | ❓   |

Notes below apply only to non-green statuses.

<details>
<summary>ZisK</summary>

Reviewed September 21, 2026 at commit [`02d2ae7b`](https://github.com/0xPolygonHermez/zisk/tree/02d2ae7b711454ce4574d852f8bfbddbfcbb1d67) (source review only; builds and conformance tests were not run). Unknown rows reassessed against [zkevm-standards at `d1191c57`](https://github.com/eth-act/zkevm-standards/tree/d1191c57b5c19c13e4ad3520adf08fa75bb8db4d).

- **Documented cluster-mode support tested on the EF cluster — 🟡:** [Provoor documents ZisK 1.2.0-alpha cluster deployment](https://github.com/han0110/provoor/blob/e56c675c20297a4d883830245bb3d55255ca12b1/docs/zkvm/zisk.md), including coordinator/worker setup and a four-host, four-GPU-per-host example. This establishes documented deployment support; testing on the EF cluster has not been confirmed from the reviewed documentation.
- **RISC-V target — 🟡:** The latest published [standard ISA run](https://eth-act.github.io/zkevm-test-monitor/zkvm.html?name=zisk&suite=act4-standard&run=latest), dated July 15, 2026 at `4b9f758f`, passes execution for all 72 tests, but `I-auipc-00` fails during proving (71/72 overall). The tracker attributes this to AUIPC constraints for program counters with bit 12 set. This older run does not establish the result for the source commit reviewed above; a new monitor run is needed.
- **I/O interface — 🟡:** The C library provides `read_input` and `write_output`, but the [output implementation](https://github.com/0xPolygonHermez/zisk/blob/02d2ae7b711454ce4574d852f8bfbddbfcbb1d67/ziskos/entrypoint/src/lib.rs#L329-L349) limits public output to 256 bytes and asserts beyond that limit. The standard specifies concatenated output across calls without that cap and requires `write_output` not to fail.
- **Static library and linker script — 🟡:** Both are provided, but the [linker script](https://github.com/0xPolygonHermez/zisk/blob/02d2ae7b711454ce4574d852f8bfbddbfcbb1d67/ziskbuild/zisk_linker_script.ld#L140-L142) defines `_heap_bottom` / `_heap_top` instead of the required `_heap_start` / `_heap_end` symbols. The I/O limitation above also remains.
- **ELF loading and validation — 🟡:** The [loader](https://github.com/0xPolygonHermez/zisk/blob/02d2ae7b711454ce4574d852f8bfbddbfcbb1d67/transpilers/common/src/elf_extraction.rs) accepts both `PF_X` and `PF_X | PF_R` executable segments, whereas the standard requires a zkVM to accept exactly one combination.
- **Execution termination semantics — 🟡:** The [entrypoint](https://github.com/0xPolygonHermez/zisk/blob/02d2ae7b711454ce4574d852f8bfbddbfcbb1d67/ziskos/entrypoint/src/lib.rs#L376-L401) forwards `main`'s return code in `a0`, but the [exit syscall handler](https://github.com/0xPolygonHermez/zisk/blob/02d2ae7b711454ce4574d852f8bfbddbfcbb1d67/transpilers/riscv/src/riscv2zisk_context.rs#L3155-L3168) checks only `a7 == 93` and routes to the successful end path without checking `a0`. This is a source-level gap in the required zero/non-zero distinction; a compliance test should cover non-zero `main` returns through proof verification.

The other reassessed rows remain unknown:

- **Final proof size ≤300 KiB — ❓:** The [quickstart documents recursive proof compression](https://github.com/0xPolygonHermez/zisk/blob/02d2ae7b711454ce4574d852f8bfbddbfcbb1d67/book/getting_started/quickstart.md#compressed-proof-optional), but does not establish the final serialized proof size for the L1 proving configuration. A measured artifact or configuration-specific size bound is needed.
- **Accelerated memory operations — ❓:** The [runtime includes all four standard memory functions](https://github.com/0xPolygonHermez/zisk/blob/02d2ae7b711454ce4574d852f8bfbddbfcbb1d67/ziskos/entrypoint/src/lib.rs#L657-L661). Compliance still needs evidence for symbol resolution in the final guest link and C semantics across alignments, zero lengths, overlapping `memmove`, and `memcmp` result signs.
- **Memory safety guard regions — ❓:** The [linker places the stack at the start of RAM](https://github.com/0xPolygonHermez/zisk/blob/02d2ae7b711454ce4574d852f8bfbddbfcbb1d67/ziskbuild/zisk_linker_script.ld#L97-L106). That layout alone does not establish the required fault behavior. Compliance tests should cover reads and writes throughout the null and stack guard regions, including proof-verification outcomes.
- **Instruction address misaligned exception semantics — ❓:** The [JALR implementation clears only bit 0 and supports compressed instructions](https://github.com/0xPolygonHermez/zisk/blob/02d2ae7b711454ce4574d852f8bfbddbfcbb1d67/transpilers/riscv/src/riscv2zisk_context.rs#L1468-L1541). This alone establishes neither compliance nor a violation: tests must account for the supported ISA's alignment rules and check fault outcomes through proof verification.

</details>

<details>
<summary>OpenVM</summary>

Reviewed September 21, 2026 at [`538c5488` (`v2.1.0-preview`)](https://github.com/openvm-org/openvm/tree/538c5488130da56c8442d33445efe3c1fe5ea8b8), the unchanged RV64 version pinned by the [ISA monitor](https://github.com/eth-act/zkevm-test-monitor/blob/9137dbb3eb7713238c053588b2f6a6007b652833/config.json#L21-L28). This review and the SP1 review below use zkevm-standards `d1191c57`; builds and conformance tests were not run. The latest published [standard ISA run](https://eth-act.github.io/zkevm-test-monitor/zkvm.html?name=openvm&suite=act4-standard&run=latest) remains July 29, 2026 at this commit, with 72/72 tests passing.

- **Documented cluster-mode support tested on the EF cluster — 🟡:** [Provoor documents OpenVM 2.1.0-preview cluster deployment](https://github.com/han0110/provoor/blob/e56c675c20297a4d883830245bb3d55255ca12b1/docs/zkvm/openvm.md) through an Axiom Edge fork, with a [four-host, four-GPU-per-host example](https://github.com/han0110/provoor/blob/e56c675c20297a4d883830245bb3d55255ca12b1/examples/openvm-4x4.example.yaml). This establishes documented deployment support; testing on the EF cluster has not been confirmed from the reviewed documentation.
- **Host randomness — 🟡:** On [`main` at `f08bf28364`](https://github.com/openvm-org/openvm/tree/f08bf28364), `hint_random`/`sys_rand` provide host randomness, but the [fixed zero seed](https://github.com/openvm-org/openvm/pull/1769) repeats sequences across executions. The required `zkvm_random_u64` export is missing.
- **ELF loading and validation — 🟡:** The [loader](https://github.com/openvm-org/openvm/blob/538c5488130da56c8442d33445efe3c1fe5ea8b8/crates/toolchain/transpiler/src/elf.rs) validates ELF64/RISC-V headers and loads `PT_LOAD` segments, but tests only the executable flag when classifying permissions. It does not reject writable executable segments or enforce exactly one of `PF_X` and `PF_X | PF_R`.
- **Execution termination semantics — 🟡:** The [runtime](https://github.com/openvm-org/openvm/blob/538c5488130da56c8442d33445efe3c1fe5ea8b8/crates/toolchain/openvm/src/lib.rs#L101-L115) calls `main` as a function returning no value, then [exits with code zero](https://github.com/openvm-org/openvm/blob/538c5488130da56c8442d33445efe3c1fe5ea8b8/crates/toolchain/openvm/src/process.rs). This does not preserve non-zero C `main` returns.

The other reviewed rows remain unknown:

- **Final proof size — ❓:** The [2.0 Beta benchmarks](https://blog.openvm.dev/2.0-beta) report Ethereum STARK proofs under 300 kB at 100 bits of provable security. They do not establish the bound for the reviewed RV64 version and the handbook's 128-bit configuration.
- **I/O, cryptographic C interface, static library/linker script, and memory layout — ❓:** The reviewed tree provides [Rust I/O](https://github.com/openvm-org/openvm/blob/538c5488130da56c8442d33445efe3c1fe5ea8b8/crates/toolchain/openvm/src/io/mod.rs) and [build-time linker flags](https://github.com/openvm-org/openvm/blob/538c5488130da56c8442d33445efe3c1fe5ea8b8/crates/toolchain/build/src/lib.rs#L320-L340). These do not establish delivery of the standard C interfaces and vendor library/linker-script package.
- **Accelerated memory operations, guard regions, and instruction-address faults — ❓:** Full linking/semantic compliance and the required fault behavior through proof verification have not been established.

</details>

<details>
<summary>SP1</summary>

Reviewed September 21, 2026 at [`9c940780`](https://github.com/succinctlabs/sp1/tree/9c94078055b9c1a1201b0636eb2990539fce8f11).

- **Documented cluster-mode support tested on the EF cluster — ❓:** [Provoor lists ZisK and OpenVM as supported zkVMs](https://github.com/han0110/provoor/blob/e56c675c20297a4d883830245bb3d55255ca12b1/README.md#zkvms), but does not list SP1. It therefore provides no basis for changing SP1's status on this requirement.
- **RISC-V target — 🔴:** The latest published [standard ISA run](https://eth-act.github.io/zkevm-test-monitor/zkvm.html?name=sp1&suite=act4-standard&run=latest), dated July 15, 2026, passes 62/72 tests and reports execution failures for `I-auipc-00`, `I-fence-00`, and eight misaligned load/store tests. It uses the monitor fork `codygunton/sp1` at `10995181`, not the upstream source commit reviewed above; a new monitor run is needed to assess current upstream behavior.
- **I/O interface — 🟡:** The [C wrappers](https://github.com/succinctlabs/sp1/blob/9c94078055b9c1a1201b0636eb2990539fce8f11/zkevm/libzkevm/src/io.rs) cache the first input chunk and concatenate output calls. However, input is consumed on the first `read_input` call, rather than during initialization before `main` as the standard requires. The documented host contract also requires all input in one chunk.
- **Static library and linker script — 🟡:** The [SDK supplies both](https://github.com/succinctlabs/sp1/blob/9c94078055b9c1a1201b0636eb2990539fce8f11/zkevm/README.md), but the initialization and `main` return-value gaps described here prevent full compliance.
- **ELF loading and validation — 🟡:** The [loader explicitly accepts both ELF32 and ELF64](https://github.com/succinctlabs/sp1/blob/9c94078055b9c1a1201b0636eb2990539fce8f11/crates/core/executor/src/disassembler/elf.rs#L104-L112); the standard requires rejecting a class other than ELF64. The new loader change in [PR #2981](https://github.com/succinctlabs/sp1/pull/2981) fixes zero-fill overwriting file bytes, but leaves this class check unchanged.
- **Execution termination semantics — 🟡:** The [runtime forwards `(exit_code & 0xff) as u8`](https://github.com/succinctlabs/sp1/blob/9c94078055b9c1a1201b0636eb2990539fce8f11/crates/zkvm/entrypoint/src/lib.rs#L237-L246). A non-zero C return such as `256` becomes zero, violating the required zero/non-zero distinction.

The other reviewed rows remain unknown:

- **Cryptographic accelerators C interface — ❓:** The [SDK implements all 19 functions](https://github.com/succinctlabs/sp1/blob/9c94078055b9c1a1201b0636eb2990539fce8f11/zkevm/libzkevm/src/precompile/mod.rs), but its [encoding and validation notes](https://github.com/succinctlabs/sp1/blob/9c94078055b9c1a1201b0636eb2990539fce8f11/zkevm/docs/upstream-issue-encoding-spec.md) identify unresolved interoperability questions. Matching symbols alone does not settle these.
- **Final proof size, accelerated memory operations, guard regions, and instruction-address faults — ❓:** No configuration-specific final L1 proof-size bound or complete evidence for the standard's linking, memory semantics, and proof-verification fault requirements was established.

</details>

## ELs

✅ Done · 🟡 Partial · 🔴 Not implemented · ⏳ Pending · ❓ Unknown · 🚧 Blocked: waiting for spec to be defined

| Requirement                                                                                                    | Ethrex                    | Reth | Besu | Nethermind                    | Nimbus                    | Geth                      | Erigon |
| -------------------------------------------------------------------------------------------------------------- | ------------------------- | ---- | ---- | ----------------------------- | ------------------------- | ------------------------- | ------ |
| Integrate into [EEST execution witness dashboard](https://github.com/eth-act/eest-execution-witness-dashboard) | [✅](https://eth-act.github.io/eest-execution-witness-dashboard/listing.jsonl) | 🟡    | 🟡    | [✅](https://eth-act.github.io/eest-execution-witness-dashboard/listing.jsonl)     | [✅](https://eth-act.github.io/eest-execution-witness-dashboard/listing.jsonl) | [✅](https://eth-act.github.io/eest-execution-witness-dashboard/listing.jsonl) | ❓      |
| Implement `engine_newPayloadWithWitness{V4, V5}`                                                               | 🟡                         | 🟡    | 🟡    | [✅](https://github.com/NethermindEth/nethermind/blob/93ca2644a45d1385d55e06d93a633408b4432c6f/src/Nethermind/Nethermind.Merge.Plugin/EngineRpcModule.Prague.cs#L25-L31) | [✅](https://github.com/status-im/nimbus-eth1/blob/08aec3a4c9709e8402b5630cbf64e5ed09b5b56d/execution_chain/rpc/engine_api.nim#L110-L140)    | [✅](https://github.com/ethereum/go-ethereum/blob/aa1f2fcf512988eb8890d9352e601b898d6fdb2c/eth/catalyst/witness.go#L139-L187)      | ❓      |
| Implement EngineAPI block building with witness                                                              | 🚧                         | 🚧    | 🚧    | 🚧                             | 🚧                         | 🚧                         | 🚧      |
| Implement [`debug_executionWitness` RPC](https://github.com/ethereum/execution-apis/pull/847)                  | 🟡                         | 🟡    | ❓    | ❓                             | 🟡                         | 🟡                         | 🟡      |
| Implement [`POST /engine/v1/payloads/witness`](https://github.com/ethereum/execution-apis/pull/885)           | 🟡                         | 🔴    | 🔴    | 🔴                             | 🔴                         | 🔴                         | 🔴      |

Notes below apply only to non-green statuses.

<details>
<summary>Ethrex</summary>

- **`engine_newPayloadWithWitness{V4, V5}` — 🟡:** Waiting for [PR #7286](https://github.com/lambdaclass/ethrex/pull/7286) to be merged.
- **`POST /engine/v1/payloads/witness` — 🟡:** Open draft [PR #7297](https://github.com/lambdaclass/ethrex/pull/7297) adds authenticated REST/SSZ payload validation with execution witnesses and sender public keys, implementing [execution-apis#885](https://github.com/ethereum/execution-apis/pull/885) for Paris through Amsterdam. It awaits the underlying REST/SSZ Engine API [PR #6770](https://github.com/lambdaclass/ethrex/pull/6770), which remains open.
- **`debug_executionWitness` RPC — 🟡:** The [method](https://github.com/lambdaclass/ethrex/blob/5b611f12483b31ef6bf39370d6c59a29e1e7f804/crates/networking/rpc/debug/execution_witness.rs#L7-L34) accepts block numbers/tags, with block hashes handled by a separate method. The proposal requires accepting hashes through the same method.

</details>

<details>
<summary>Reth</summary>

- **`engine_newPayloadWithWitness{V4, V5}` — 🟡:** [PR #27083](https://github.com/paradigmxyz/reth/pull/27083) adds both endpoints and is awaiting merge.
- **EEST execution witness dashboard integration — 🟡:** Waiting for [PR #27083](https://github.com/paradigmxyz/reth/pull/27083) to be merged so Reth can be added to the EL dashboard.
- **`debug_executionWitness` RPC — 🟡:** The [witness format defaults to legacy](https://github.com/paradigmxyz/reth/blob/0032bec310b1531dc24d6b5bfeffa690eb35531a/crates/trie/common/src/execution_witness.rs#L1-L27); the proposal requires canonical output when no format parameter is supplied.

</details>

<details>
<summary>Besu</summary>

- **EEST execution witness dashboard integration — 🟡:** Blocked on the team re-including `newPayloadWithWitnessV{4,5}` into the main branch.
- **`engine_newPayloadWithWitness{V4, V5}` — 🟡:** Waiting for team to re-include `newPayloadWithWitnessV{4,5}` into main branch.
- **`debug_executionWitness` RPC — ❓:** An [implementation exists](https://github.com/besu-eth/besu/blob/7e05c2342404d27bd06a992e336c5e0c86a5d8d1/ethereum/api/src/main/java/org/hyperledger/besu/ethereum/api/jsonrpc/internal/methods/DebugExecutionWitness.java), but full conformance with the proposed canonical witness requirements was not established.

</details>

<details>
<summary>Nethermind</summary>

- **`debug_executionWitness` RPC — ❓:** An [implementation exists](https://github.com/NethermindEth/nethermind/blob/364eaaf0315525b1217d062fdd7ef8d615ea3e5a/src/Nethermind/Nethermind.JsonRpc/Modules/DebugModule/DebugRpcModule.cs#L907-L927), but full conformance with the proposed canonical witness requirements was not established.

</details>

<details>
<summary>Nimbus</summary>

- **`debug_executionWitness` RPC — 🟡:** The [method](https://github.com/status-im/nimbus-eth1/blob/5dfdf626b88baefd4754580ca5a5e058efa3172b/execution_chain/rpc/debug.nim#L263-L276) accepts block numbers/tags, with block hashes handled by a separate method. The proposal requires accepting hashes through the same method.

</details>

<details>
<summary>Geth</summary>

- **`debug_executionWitness` RPC — 🟡:** The [RPC returns `ExtWitness`](https://github.com/ethereum/go-ethereum/blob/a5b90d2a28e8b68c2d6c335e17af4c64e23f7323/eth/api_debug.go#L510-L532), whose [`headers` field](https://github.com/ethereum/go-ethereum/blob/a5b90d2a28e8b68c2d6c335e17af4c64e23f7323/core/stateless/encoding.go#L97-L102) contains JSON header objects rather than the required RLP bytes.

</details>

<details>
<summary>Erigon</summary>

- **`debug_executionWitness` RPC — 🟡:** The [witness format defaults to legacy](https://github.com/erigontech/erigon/blob/ae4e8e4e12252a1da1e6e025fe172fc897dd0851/rpc/jsonrpc/debug_execution_witness.go#L551-L575); the proposal requires canonical output when no format parameter is supplied.

</details>

## CLs

✅ Done · 🟡 Partial · ⏳ Pending · ❓ Unknown

| Requirement                                                                                 | Lighthouse                                           | Prysm                                           | Teku                                           | Nimbus                                           | Lodestar                                           | Grandine                                           |
| ------------------------------------------------------------------------------------------- | ---------------------------------------------------- | ----------------------------------------------- | ---------------------------------------------- | ------------------------------------------------ | -------------------------------------------------- | -------------------------------------------------- |
| EIP-8025 implementation on top of Glamsterdam                                                 | [✅](https://github.com/eth-act/lighthouse/tree/optional-proofs-gloas)                               | [🟡](https://github.com/OffchainLabs/prysm/tree/eip8025-optional-proofs)                              | [❓](https://github.com/Consensys/teku/tree/optional-proofs)                             | [❓](https://github.com/status-im/nimbus-eth2/tree/eip8025-initial)                             | [❓](https://github.com/ChainSafe/lodestar/tree/optional-proofs)                              | [🟡](https://github.com/eip8025-grandine/grandine/tree/feature/eip8025)                              |
| Integrated into `zkboost`                                                                    | [✅](https://github.com/eth-act/zkboost/blob/fa2457920fdfa0fc202d3a9f4ca82c949d51123b/docker/example/testnet/README.md) | 🟡                                               | ❓                                              | ❓                                                | ❓                                                  | ❓                                                  |
| Integrated into [Kurtosis](https://github.com/ethpandaops/ethereum-package/tree/main/src/zkboost) | [✅](https://github.com/eth-act/zkboost/blob/fa2457920fdfa0fc202d3a9f4ca82c949d51123b/docker/example/testnet/network_params.yaml) | [✅](https://github.com/ethpandaops/ethereum-package/blob/c0db06b29b8266e65c9b80b64895e07058d28d0b/.github/tests/examples/8gpu_zkvm.yaml#L36-L43)                          | ❓                                              | ❓                                                | ❓                                                  | ❓                                                  |

Notes below describe implementation evidence and integration limits.

<details>
<summary>Lighthouse</summary>

- **EIP-8025 implementation on top of Glamsterdam — ✅:** `optional-proofs-gloas` at `e676ea54` reconstructs proof inputs from Gloas bids and payload envelopes in its [gossip verification path](https://github.com/eth-act/lighthouse/blob/e676ea5459fc667d5fa4fec2ab4b96fdb79ff844/beacon_node/beacon_chain/src/execution_proof_verification/gossip_verified_execution_proof.rs), with an [in-process proof engine](https://github.com/eth-act/lighthouse/blob/e676ea5459fc667d5fa4fec2ab4b96fdb79ff844/beacon_node/proof_engine/src/lib.rs). Upstream progress: open [#10063](https://github.com/sigp/lighthouse/pull/10063) refactors proof envelopes and verification; draft [#10080](https://github.com/sigp/lighthouse/pull/10080) adds ERE verification and depends on #10063. The duplicate fork draft [eth-act/lighthouse#49](https://github.com/eth-act/lighthouse/pull/49) is now closed without merging; upstream #10080 remains open. The `optional-proofs` branch at [`cadf289e`](https://github.com/eth-act/lighthouse/tree/cadf289ec956df665130347ee06939848bc91573) also contains this Gloas proof flow and the merged [observability changes (#51)](https://github.com/eth-act/lighthouse/pull/51).
- **Integrated into `zkboost` — ✅:** The [zkboost v0.10.0 Gloas testnet example](https://github.com/eth-act/zkboost/blob/fa2457920fdfa0fc202d3a9f4ca82c949d51123b/docker/example/testnet/README.md) connects Lighthouse to zkboost as an Engine API proxy and submits signed proof envelopes to Lighthouse’s Beacon API. The current branch has [in-process ERE verification](https://github.com/eth-act/lighthouse/blob/cadf289ec956df665130347ee06939848bc91573/beacon_node/proof_engine/src/ere/mod.rs) and a [proof-submission handler](https://github.com/eth-act/lighthouse/blob/cadf289ec956df665130347ee06939848bc91573/beacon_node/http_api/src/beacon/execution_proofs.rs); the earlier HTTP verification-client mismatch no longer describes this branch. The [Kurtosis configuration](https://github.com/eth-act/zkboost/blob/fa2457920fdfa0fc202d3a9f4ca82c949d51123b/docker/example/testnet/network_params.yaml) includes a proof-verifying node without an EL. This configuration was inspected, not run.

</details>

<details>
<summary>Prysm</summary>

- **EIP-8025 implementation on top of Glamsterdam — 🟡:** Both [`optional-proofs-gloas`](https://github.com/OffchainLabs/prysm/tree/optional-proofs-gloas) and the newer `eip8025-optional-proofs` branch contain Gloas work. The latter, reviewed at `8d9d669e`, [derives proof inputs from revealed payloads](https://github.com/OffchainLabs/prysm/blob/8d9d669e711fce81fd7b9f9c9c79b27dc085b667/beacon-chain/blockchain/execution_proof.go). Open draft [#17490](https://github.com/OffchainLabs/prysm/pull/17490) explicitly remains WIP; its Gloas Kurtosis example uses mock proofs and requires the `nalepae/zkboost` fork.
- **Integrated into `zkboost` — 🟡:** The older `optional-proofs` branch still has a [verification client](https://github.com/OffchainLabs/prysm/blob/c4a6a9b76a08ccfcf77d73447d8150e25cc00114/beacon-chain/verification/verifier_client.go#L18-L41) that sends query-parameter metadata and a raw proof body. The [Kurtosis GPU example](https://github.com/ethpandaops/ethereum-package/blob/c0db06b29b8266e65c9b80b64895e07058d28d0b/.github/tests/examples/8gpu_zkvm.yaml#L36-L43) pins zkboost v0.9.0, whose [handler](https://github.com/eth-act/zkboost/blob/v0.9.0/crates/server/src/http/v1/post_execution_proof_verifications.rs#L17-L27) expects an SSZ `ProofVerificationBody`. Current [zkboost v0.10.0](https://github.com/eth-act/zkboost/blob/fa2457920fdfa0fc202d3a9f4ca82c949d51123b/README.md) instead acts as an Engine API proxy and submits proofs to the CL; the old verifier-client configuration does not establish compatibility with that architecture. The newer Gloas branch’s example still requires the `nalepae/zkboost` fork and mock proofs, as noted above.

</details>

<details>
<summary>Teku</summary>

- **EIP-8025 implementation on top of Glamsterdam — ❓:** `optional-proofs` at `3828963a` contains a [prototype generator](https://github.com/Consensys/teku/blob/3828963a9a334a8960200700d5e9832c094f2592/ethereum/statetransition/src/main/java/tech/pegasys/teku/statetransition/executionproofs/ExecutionProofGeneratorImpl.java) that uses Electra schemas, reads the payload from the beacon block body, and generates dummy proofs. This does not establish support for Gloas payload envelopes. No relevant open EIP-8025 PR was found in `Consensys/teku`.
- **Both integrations — ❓:** A connection to zkboost was not established in the reviewed sources. General Kurtosis client support alone does not establish these integrations.

</details>

<details>
<summary>Nimbus</summary>

- **EIP-8025 implementation on top of Glamsterdam — ❓:** Open draft [#8004](https://github.com/status-im/nimbus-eth2/pull/8004), from `eip8025-initial` into `optional-proofs`, tracks the initial implementation. At `9afbef91`, its [proof types](https://github.com/status-im/nimbus-eth2/blob/9afbef91191a42f4cf563d71bfa28c6acfb81924/beacon_chain/spec/datatypes/eip8025.nim) use Deneb payloads and Electra requests, and its [proof engine](https://github.com/status-im/nimbus-eth2/blob/9afbef91191a42f4cf563d71bfa28c6acfb81924/beacon_chain/spec/proof_engine.nim) has placeholder verification. Gloas support was not established; the PR still lists proof storage, validation, and prover plumbing as TODOs.
- **Both integrations — ❓:** A connection to zkboost was not established in the reviewed sources. General Kurtosis client support alone does not establish these integrations.

</details>

<details>
<summary>Lodestar</summary>

- **EIP-8025 implementation on top of Glamsterdam — ❓:** `optional-proofs` at `cd716e73` contains an EIP-8025 prototype, but its [proof-input construction](https://github.com/ChainSafe/lodestar/blob/cd716e738484822b8735c828f4b43a1925705d52/packages/beacon-node/src/chain/eip8025/newPayloadRequestHeader.ts) still selects the Deneb payload schema for every fork from Deneb onward. Gloas proof support was not established. No relevant open EIP-8025 PR was found in `ChainSafe/lodestar`.
- **Both integrations — ❓:** A connection to zkboost was not established in the reviewed sources. Lodestar has an [EIP-8025 Kurtosis setup with a dummy prover](https://github.com/ChainSafe/lodestar/blob/cd716e738484822b8735c828f4b43a1925705d52/scripts/eip8025-devnet/README.md), but this does not establish zkboost integration. General Kurtosis client support alone does not establish these integrations.

</details>

<details>
<summary>Grandine</summary>

- **EIP-8025 implementation on top of Glamsterdam — 🟡:** `feature/eip8025` at `2be90a1e` includes proof containers and [Gloas-specific payload binding](https://github.com/eip8025-grandine/grandine/blob/2be90a1e41dedf9afbeb8555886380bdde1332f1/types/src/eip8025/container_impls.rs). Open fork PRs track [BLS signing (#7)](https://github.com/eip8025-grandine/grandine/pull/7), the [proof-engine skeleton (#9)](https://github.com/eip8025-grandine/grandine/pull/9), [proof state (#10)](https://github.com/eip8025-grandine/grandine/pull/10), [task plumbing (#11)](https://github.com/eip8025-grandine/grandine/pull/11), and [verifier/prover separation (#15)](https://github.com/eip8025-grandine/grandine/pull/15); draft [#3](https://github.com/eip8025-grandine/grandine/pull/3) adds progressive-list Merkle tests. #15 proposes to supersede the alternative designs in [#13](https://github.com/eip8025-grandine/grandine/pull/13) and [#14](https://github.com/eip8025-grandine/grandine/pull/14), but all three PRs remain open. No relevant open EIP-8025 PR was found in upstream `grandinetech/grandine`.
- **Both integrations — ❓:** A connection to zkboost was not established in the reviewed sources. General Kurtosis client support alone does not establish these integrations.

</details>

## Specs

### Execution layer (EL)

| Item | Status | Next step / link |
| ---- | ------ | ---------------- |
| Fill benchmark test fixtures                      | ✅      | [Execution-specs releases](https://github.com/ethereum/execution-specs/releases) with `test-zkevm` in the name |
| Stateless EEST benchmark releases   | ✅      | [Execution-specs releases](https://github.com/ethereum/execution-specs/releases) with `tests-zkevm-benchmark` in the name                     |
| Stateful EEST benchmark releases   | 🔴      | Integrate into existing stateful filling infrastructure from STEEL                     |
| REST+SSZ newPayload with witness | 🟡      | [execution-apis#885](https://github.com/ethereum/execution-apis/pull/885)                |
| REST+SSZ getPayload with witness | 🚧      | Waiting for spec to be defined |
| JSON-RPC getPayload with witness | 🚧      | Waiting for spec to be defined |
| `debug_executionWitness` spec  | 🟡      | Merge pending: [execution-apis#847](https://github.com/ethereum/execution-apis/pull/847) |
| Execution specs                | ✅      | [Implementation](https://github.com/ethereum/execution-specs/tree/projects/zkevm)        |
| High-coverage tests            | ✅      | [Test releases](https://github.com/ethereum/execution-specs/releases)                    |
| Merge execution specs upstream | 🟡      | Await acceptance                                                                         |
| Upstream execution-witness dashboard to official Hive | 🚧 Blocked | Waiting for EIP-8025 to be Considered for Inclusion (CFI) |
| Switch witness-generation test runs to the SSZ Engine API | 🚧 Blocked | Waiting for EIP-8025 to be Considered for Inclusion (CFI) |

### Consensus layer (CL)

Upstream coordination: [EIP-8025 tracking issue](https://github.com/ethereum/consensus-specs/issues/5653).

| Item                                      | Status     | Spec / pending PR                                                                                                                                                   |
| ----------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Main consensus specs                      | ✅ Merged   | [`consensus-specs/specs/_features/eip8025`](https://github.com/ethereum/consensus-specs/tree/master/specs/_features/eip8025)                                        |
| Refine `ProofData` and gossip validation  | 🟡 Proposed | [consensus-specs#5593](https://github.com/ethereum/consensus-specs/pull/5593)                                                                                       |
| Validation-only Proof Engine              | 🟡 Draft    | [consensus-specs#5639](https://github.com/ethereum/consensus-specs/pull/5639); depends on #5593; removes the prover guide and proof-generation/retrieval interfaces |
| Recursive execution proof guest           | 🟡 Draft    | [consensus-specs#5534](https://github.com/ethereum/consensus-specs/pull/5534)                                                                                       |
| Remove EIP-8025 consensus-spec tests       | 🟡 Proposed | [consensus-specs#5622](https://github.com/ethereum/consensus-specs/pull/5622); proposes removing tests because EIP-8025 is not yet Considered for Inclusion (CFI) |
| Beacon API proof retrieval and submission | 🟡 Proposed | [beacon-APIs#569](https://github.com/ethereum/beacon-APIs/pull/569)                                                                                                 |

## Benchmarks & repricings

✅ Done · ⏳ Pending

| Item                                                 | Status | Next step / link                                                                                                                              |
| ---------------------------------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Mainnet block benchmarks by zkVM and guest program   | ⏳      | Build a comparison table; assess [zkevm-prof](https://han0110.github.io/zkevm-prof/) as a data source                                         |
| EEST worst-case benchmarks by zkVM and guest program | ⏳      | Build a comparison table for the latest `test-zkevm` worst cases; assess [zkevm-prof](https://han0110.github.io/zkevm-prof/) as a data source |
| Gas repricing analysis for worst cases               | ⏳      | Link worst-case benchmark results to repricing analysis using `evm-gasfit`                                                                    |
| Research available proving time | ✅ | [Proving-time scenarios](https://jsign.github.io/proving-time-scenarios/) |
| Determine when sub-block proving is needed | ⏳ | Identify the gas limit at which serial execution consumes the available proving time for each zkVM |
| Run a broad historical-mainnet correctness campaign | ⏳ | Generate witnesses for older forks and validate guest programs across a large historical block set |
