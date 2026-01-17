# RISCV target 

Defining the riscv target for zkEVMs has numerous second order effects on client diversity and the complexity of the system. The by default goal should be to reduce complexity, because high complexity systems are harder to maintain and remain resilient.

# Long term

Defining the RISCV target for zkEVMs has numerous second order effects on client diversity and the complexity of the system. Given how invasive this feature is, we consider the long-term implications of our decision to avoid optimizing ourselves into a local minimum. Of course, we need to consider the trade-offs

# Varying levels of support and their tradeoffs

## RV32I

This is the minimal ISA needed _in theory_ in order to support the execution layer's state transition function.

However, it is very limited and will not support features such as trap handling, reading cycles and for some zkVMs, precompiles.

**Tradeoffs** 

*Advantages*

- zkEVMs will target the absolute minimum amount of instructions needed
- The work needed to formally verify a zkVM system is kept at its minimum.

*Disadvantages*

- The zkVM may not be performant and or easy to debug without control status registers.
- EL teams will need to target bare metal RISCV.

## RV32I + Zicsr

The STF will be written in a modern language and most modern RISCV toolchains will automatically emit `Zicsr` for common operations such as reading the number of cycles; in general for talking to the host environment. So while they are not needed for the STF, they are needed in order to use standard compilers and linkers productively.

> Note: ECALL is listed under the base `I` instruction set and is one of the ways for a zkVM to enable precompiles, the other way is to use CSRs in Zicsr.

> Note: Many zkVMs support a subset of Zicsr.

**Tradeoffs**

*Disadvantages*

- The zkVM will need to support an additional extension.

*Advantages*

- Common functionality that one may expect from a bare metal system will be supported.

This in practice, is the **minimal target** needed in order to prove the state transition function.

Why not support this minimal target? Below, we discuss the second order effects of supporting this bare metal target.

# High level languages

Ethereum's execution layer is written in a myriad of languages. High level languages like Java and C#:

- Tend to be less configurable and will compile to the most general RISCV target.
- Have richer runtimes, due to additional features like garbage collection.
- Depend on an operating system

Richer runtimes tend to only be a factor in terms of performance and in most cases won't affect the complexity of the zkVM. We will go into detail on the other two points, as they do imply additional zkVM complexity.


## Extensions


| Language                       | Target ISA                                | Reference                                                                                                                                                                                               |
| ------------------------------ | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Java (GraalVM)**             | RV64IMACFD                                | [GraalVM source code](https://github.com/oracle/graal/blob/1d34199ccb381a441e997fe03a7b8f2ecf1f444c/substratevm/src/com.oracle.svm.hosted/src/com/oracle/svm/hosted/util/CPUTypeRISCV64.java#L61) |
| **Go**                         | RVA20U64                                  | [Golang source coded](https://github.com/golang/go/blob/385dc33250336081c0c630938c3efede481eff76/src/cmd/go/internal/help/helpdoc.go#L977)                                                                    |
| **.NET (CoreCLR / NativeAOT)** | RV64IMAFDC + Zicsr + Zifencei + Zbb + Zba | [dotnet runtime source code](https://github.com/dotnet/runtime/blob/e8812e7419db9137f20b990786a53ed71e27e11e/src/coreclr/jit/instrsriscv64.h#L23)                                                           |

We need to take the union of all of the extensions, so that we support all of the above languages. This in turn means RVA20U64 + Zbb + Zba. For the specifications of RVA20U64 see [here](https://github.com/riscv/riscv-profiles/blob/main/src/profiles.adoc#rva20u64-mandatory-extensions). We list out the extensions needed to be explicit:

- **I** (Integer base operations)
- **M** (Integer multiplication and division)
- **A** (Atomic instructions)
- **F** (Single-precision floating point instructions)
- **D** (Double-precision floating point instructions)
- **C** (Compressed instructions)
- **Zicsr** (CSR instructions)
- **Zicntr** (Basic counters)
- **Ziccif** (Main memory regions with both the cacheability and coherence PMAs must support instruction fetch, and any instruction fetches of naturally aligned power-of-2 sizes up to min(ILEN,XLEN) (i.e., 32 bits for RVA20) are atomic)
- **Ziccrse** (Main memory regions with both the cacheability and coherence PMAs must support RsrvEventual)
- **Ziccamoa** (Main memory regions with both the cacheability and coherence PMAs must support AMOArithmetic)
- **Za128rs** (Reservation sets must be contiguous, naturally aligned, and at most 128 bytes in size)
- **Zicclsm** (Misaligned loads and stores to main memory regions with both the cacheability and coherence PMAs must be supported)

This adds ~100 new instructions, where ~50 are coming from floating point instructions(F/D) and ~50 coming from compressed instructions ( C ).

*Compressed instruction*

Since modern compilers care about smaller binaries, they will automatically emit the compressed instruction variant whenever possible.

*Floating point instructions*

Although the STF will not use floating points. We have seen partial usage of floating points instructions during the runtimes of higher level languages. The most common case being floating point loads and stores for context switching.

The choice to support all instructions is for practical purposes, where otherwise:
- Each language will need to modify the dependencies and or the runtime that requires floating point instructions, updating it each time a dependency changes
- We take the union of all of the floating point instructions that need to be supported, and everytime a new floating point instruction is needed, all zkVMs will update for support.

*Supporting floating point using microcode*

Floating points instructions following IEEE 7594 are complex. The easiest way to support floating would be by precompiling a softfloat library like Berkeley into RISCV bytecode and whenever a floating point instruction is called, it will jump to the appropriate function in the softfloat library.

The tradeoff being that they will be slow, which seems like an appropriate tradeoff given we don't expect them to be called frequently.
  

**Tradeoffs**

*Advantages*

- The advantage of adding all of the above instructions is that the higher level languages that the EL has been implemented with will now be supported modulo OS.

*Disadvantages*

- The zkVM now needs to account for the extra instruction sets. This may also affect performance since the circuit may need to account for the extra instructions.
- If another high level language is added, the set of instructions that are needed may increase.

## Operating System

High level languages tend to assume that the program will be ran on top of a operating system. For simplicity, we can take this to mean Linux.

Linux has an API that programs written in higher level languages use to request privileged operations, like memory allocations, fetching randomness, creating threads etc. These are called system calls(syscalls).

When the STF is compiled, it will emit these syscalls using the ECALL instruction. There are hundreds of syscalls, so implementing each of these manually in a zkVM would not be feasible. There are currently two ways to do this:

- **Partial syscall emulation:** Figure out the syscalls that are (currently) being called by the STF and support those. Whenever a new syscall is needed, then each zkVM will be updated to support it
- **Linux kernel emulation:** Boot Linux in the zkVM, and build the user program on top of this. All syscalls will be supported because the linux kernel is inside of the zkVM.

### Partial syscall emulation

Linux syscalls are the API for calling the linux operating system, if we no longer have the operating system, we must satisfy the explicit and or implicit assumptions that the syscalls rely on. An example of these are:

*Memory management unit*

Linux applications assumes an isolated, contiguous virtual address space, where memory starts from 0 for each application. zkVMs currently assume a flat and shared address space, so emulating the virtual address space will require a deterministic mapping layer for address translation.

A memory management unit will handle translations from virtual addresses to physical addresses, while also handling page permissions and page faults.

*Privilege levels*

Syscalls assume a separation between what is known as the user mode, where the application lives and has limited privileges to kernel mode, where the kernel lives with elevated privileges that allow it to perform seemingly simple tasks such as memory allocation. 

*Threading and synchronization support*

Many runtimes expect concurrency primitives, preemption and concurrency primitives via syscalls like clone and futex.

Since zkVMs are by default deterministic, this would essentially require modeling concurrent interleaving

> Add note on what makes it hard to have full support
> One thing is that each linux syscall is easy to use, but actually pretty detailed in terms of implementation
> Add a note on this being formally verified 
> I think this also requires privilege levels

**Full support**

This is by far the most robust solution, however it requires supporting supervisor mode and booting the linux kernel in order to run the STF.

> ADDD SECTION ON TRADE OFFS ALSO ADD MORE NOTES ON THE INVESTIGATIONS WE DID BUT PERHAPS PUT THAT DOWN BELOW, RE WHAT SYSCALLS ARE NEEDED ETC

ALSO CAN WE MAKE A DECISION SAYING ESSENTIALLY RVA20U64, AND THAT EACH ZKVM SHOULD BE ABLE TO SUPPORT THE LANGUAGES WE CARE ABOUT

### Where to place the complexity

If starting from a high level language, the complexity of supporting the linux syscall needs to live somewhere. Above, we discussed placing it in the zkVM which is already an inherently complex system. However this is not the only strategy, below we describe three alternatives where the zkVM is left untouched:

- Compile the higher level language to WASM-WASI. WASM is nice here because it allows one to implement a set of methods that live under the WASI toolchain. These methods are the exact methods that the user space program uses to call the kernel.
- Modify the toolchain to allow compilation to bare metal
- Reimplement the STF in a language that does not require linux syscalls
- Since most languages will call linux syscalls via libc, one could patch the calls in libc instead

**Tradeoffs**

*Advantages*

- The complexity of linux syscalls is not seen by each zkVM, it's also on a language by language basis.
- Languages that don't require linux syscalls are not affected by linux syscalls due to the increased complexity for the circuit. Alternatively, zkVM teams do not need to maintain two circuits; one for the bare metal languages and one for the high level languages.
- Auditing changes made on the programming language level will be easier and more accessible than changes made by each zkVM.

*Disadvantages*

- On WASM, there may be some performance degradation to compiling to WASM first and then transpiling to RISCV.
- On modifying the toolchain, one may need in-house expertise for this. This is the case for Java and C#. Golang has TamaGo with the chances of it being upstreamed being very promising.
- On reimplementing the STF, this is additional work and in the short term, may use up resources that would otherwise had gone towards the current and next hardfork. Note, just implementing the STF is simpler than maintaining an EL because components like networking are not needed.
- On patching libc, runtimes are often bounded and tested with a specific libc implementation. Given, there are multiple languages with different libc requirements, this is not a feasible solution. We also note that Golang will call syscalls directly instead of via libc.

---------

This is a topic that requires some introduction, so the structure of the document is as follow:

- What is the minimum RISCV instruction set that is needed?
- What are the tradeoffs to not supporting it?
- Why do some ELs require linux support (written in higher level languages)?
- What does the system look like if we try to support these languages?
- What can higher level languages that want to be supported by RISCV do other than having the zkVM support them?
- Note on code lindiness vs developer lindiness and why we need to look at this from a long term vision, the legacy being built here is Ethereum and the code that enables Ethereum needs to go through many stages. zkEVMs enable a paradigm shift, however with the paradigm shift comes tradeoffs. If the main tradeoff being made is the fact that we need to rewrite it in another language, then that seems okay. We should also target the minimal needed.
- How does it affect formal verification

