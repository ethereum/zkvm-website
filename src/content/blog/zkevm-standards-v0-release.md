---
title: "zkVM standards v0: Ethereum zkVM Interoperability"  
date: "2026-02-07"  
excerpt: "The first release of zkvm-standards establishes three initial standards for zkVM development: RV64IM target architecture, C interfaces for precompiles, and standardized IO handling."  
author: "Kevaundray Wedderburn, Marcin Bugaj"  
topics: ["standards", "interoperability", "zkvm"]
---

Imagine an Ethereum execution client team preparing for zkVM-based proving. They face a fragmented landscape: each zkVM requires custom compilation targets, different precompile interfaces, and unique IO handling. Supporting three zkVMs means potentially three separate integrations.

To address this fragmentation, today we're announcing three initial standards.

## The Three Standards

These standards create a cleaner separation between zkVM implementations and guest programs, reducing integration friction and making subsequent updates easier; whether it's to the zkVM or the guest program.

Note: while guest programs still require recompilation and relinking for each zkVM, the benefit is that the core execution logic; how you call precompiles, handle IO, and structure your code remains unchanged across implementations.

### RV64IM Target Architecture with Zicclsm Extension

The first standard establishes **RV64IM** as the common instruction set architecture (ISA) for RISC-V compatible zkVMs.

The standard also includes the **Zicclsm extension**, which enables zkVM support for misaligned loads and stores. This acts as a pragmatic safety net: if a compiler mistakenly introduces misaligned accesses, execution remains correct but possibly slow; preventing subtle toolchain differences from becoming consensus or liveness issues.

By standardizing on RV64IM+Zicclsm, we establish a common compilation baseline that RISC-V zkVMs can target. Each zkVM still has implementation-specific details like memory layouts, however, a shared ISA foundation means optimizations and tooling improvements can benefit the entire ecosystem rather than being siloed per RISC-V zkVM.

### C Interface for Precompiles

Ethereum's EVM has a set of precompiles like BLAKE2F, MODEXP, and BLS12-381. Most if not all are expensive to prove using standard instruction traces, so zkVMs implement them as optimized **zkVM precompiles**.

This standard defines a C-based API that allows guest programs to call these zkVM precompiles. In short, this allows execution client teams to write precompile-calling code once and switch zkVM backends without invasive refactors.

### C interface for IO

Guest programs need to communicate with the _outside_ world: receiving private inputs and committing to public outputs that verifiers can check. The **zkVM IO interface** standardizes how this communication happens.

This C interface provides two key functions: accessing private input data provided by the host, and committing to public outputs that verifiers can check. Subtly, the interface assumes the region of memory being used to hold the input will not change during program execution.

## What's Next

**For zkVM implementers**: Adopt these standards and help us refine them. Open issues in the repository or on the [Ethereum R&D Discord](https://discord.com/invite/qGpsxSA) for anything that doesn't fit your architecture.

**For execution client teams**: Start experimenting with the common compilation target. We want to hear what breaks.

**For the broader ecosystem**: Review the standards and share your perspective.

We expect these standards to evolve. Version 0 signals a foundation, not a commitment freeze. As zkVM technology matures and we move closer to deploying zkEVM on L1, the standards will adapt.

All three standards are documented in the [zkvm-standards repository](https://github.com/eth-act/zkvm-standards), along with the rationale and design decisions behind each. The repository also tracks ongoing discussions and potential future standards—areas like memory models, debugging interfaces, and additional precompile specifications.

Join the conversation on [Ethereum R&D Discord](https://discord.com/invite/qGpsxSA) to discuss these standards and watch the ongoing progress towards zkEVM on L1.

Building Ethereum's zkVM future requires coordination across many teams. These standards are a step toward that coordination, providing common ground for the challenging work ahead.