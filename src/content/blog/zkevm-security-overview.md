---
title: "zkEVM Security Overview"
date: "2026-01-09"
excerpt: "A comprehensive overview of security considerations for zkEVMs, covering diversity, guest programs, proving systems, and the engineering stack."
author: "Cody Gunton"
featured: true
---

*Acknowledgements: I thank Andrés Láinez, Guillaume Ballet and Ladislaus for helpful comments during the preparation of this article.*

A [proposed change to the protocol](https://vitalik.eth.limo/general/2024/10/23/futures4.html#2) invites new entities, Provers, to execute the EVM inside of cryptographic VMs, producing proofs to be checked by attesters. These proofs are tiny when compared with the transactions they prove, and attesters do not need to receive all of the state updates, so the networking requirements placed on attesters remain low. Moreover, the work of checking a proof is tiny in comparison to the work of re-executing all of the transactions in a block, so attesters can run on modest hardware.

The present article looks at eighteen issues relating to the security of this upgrade, giving special attention the security of zkVMs and the software they will execute. It aims to show the tradeoff space we navigate in pursuit of holistic security, while also suggesting many specific mitigations. A [zkEVM security working group](https://github.com/eth-act/planning/pull/1) will meet regularly to discuss these issue. You can follow our progress on [Ethereum R&D Discord](https://discord.com/invite/qGpsxSA).

## Terminology

We use the following terms and abbreviations:
 - EL: The Execution Layer in an Ethereum [node](https://ethereum.org/developers/docs/nodes-and-clients/). EL clients are responsible for checking validity of blocks, among other responsiblities.
- CL: The Consensus Layer, introduced in The Merge, which handles proof of stake consensus.
- The STF, $\Upsilon$: The State Transition Function, sometimes denoted by the Greek letter, $\Upsilon$, which describes the legal state transitions of the network.
- zkVM: A program that implements a virtual machine and can provide cryptographic attestations ("proofs") to the correct execution of code runnable by that machine.
- Guest Program: The compilation of a computer program to be executed by a zkVM.
- zkEVM: A program that can provide cryptographic attestations to the correct execution of EVM programs. zkEVMs are most commonly built by choosing a zkVM and setting the guest program to be an implementation of the STF $\Upsilon$. The claim that a state transition $s_{\text{out}} = \Upsilon(s_{\text{in}})$ is valid is equivalent, for all practical purposes, to the claim that a zkEVM proof constructed with inputs $(s_{\text{in}}, s_{\text{out}})$ is valid.
- ISA (Instruction Set Architecture): A formal description of the instructions a computer supports. Examples are various flavors of x86-64, ARM, RISC-V, MIPS. WASM is another example.
- Circuit: In the context of the zkVMs, this is where the rules for the VM are written down. This is generally thought of as the most complex part of the system, and the most sensitive.

## Overview of changes
At present, to check block validity, nodes execute an implementation of the STF. After the changes, nodes will optimistically await proofs of STF Execution.

Before zkEVMs:
 - EL software is compiled or interpreted to the ISA of the node's CPU, say x86-64 or ARM, or interpreted, depending on language.
 - CL requests validation of a block.
 - EL re-executes every transaction in the block.

With zkEVMs:
 - STF is compiled to ISA of zkVM, say, rv32im augmented with special instructions to handle precompiles and syscalls.
 - Provers, entities distinct from Ethereum nodes, construct execution proofs for Ethereum blocks, and broadcast those proofs.
 - CL waits for proofs to arrive.
 - CL now verifies those proofs.
 - Stateful ELs are still responsible for syncing, state mangement, and more.

![A diagram showing how guest program generation, proving, and verification fit together in a complete ZKEVM stack. Dotted arrows represent data being sent or requested across a network.](/blog/pipeline.svg)

## A word on diversity via a "multiproofs strategy"
Diversity among implementations of zkEVMs will be a critical component of security. This diversity should be diversity of both of zkVM provers and of STF implementations. If CL clients do not accept a block until several different zkEVM proofs have been verified, covering diversity of both EL implementations and zkVMs, then security is much greater than it would be with a single proof. Let's call this a "multiproofs" strategy. A forthcoming article by Kev Wedderburn will further explore this topic.

## A word on formal verification
The [zkEVM Formal Verification Project](https://verified-zkevm.org/) has a goal to formally verify some components of zkEVMs. The goals include verifying that certain [zkSNARK protocols](https://en.wikipedia.org/wiki/Non-interactive_zero-knowledge_proof) are secure in a theoretical sense, verifying adherence of virtual machine implementations to formal specifications of those machines (EVM and RISC-V). These techniques are powerful, but can be slow to develop, and the author does not believe that formal verification should be a blocker for scaling L1 with zkEVMs.

## A word on "zk"
The term "zk" is commonly abused to refer to systems that merely provide SNARK proofs (zkVM, zk proving, etc.) without the zero knowledge property. These systems are good enough for scaling, but the reader should know that these proofs do not provide guarantees of privacy, which would come at the cost of both additional complexity and additional prover work.

# Components of security
For the remainder of the article, we will zoom in on several aspects of the security of the system and how they change with zkEVMs. Each is attributed a subjective measure, "level of concern," which is the author's opinion, roughly, of the potential for a serious exploit due to this factor. Opinions, of course, vary a lot, and the opinions here do not necessarily reflect those of the people who have reviewed the article.

## Security Component: The Network Composition
Changing the protocol to depend on a new class of unspecified actors, provers, raises questions about decentralization and incentive alignment, especially since the infrastructure of doing at-home proving would, in a typical case, cost 10s of thousands of dollars, and would require electrical upgrades (at least as things stand in 2025). We don't address this important topic here. As a useful starting point, we recommend the [ZKEVM Book](https://zkevm.fyi/trees/external/incentives.html).

## Security Component: Diversity

### Potential Issue 1: EL client diversity worsens
Currently, https://clientdiversity.org/ shows that there are three clients with with over 10% market share, and five with over 1% market share.  If only one or two clients are competitive (on a speed and cost basis) in a world with zkEVMs, then client diversity will worsen. It should be noted that new clients not included in the above list, such as [Ethrex](https://github.com/lambdaclass/ethrex), may gain traction due to their amenability to zk proving (as we will see, Rust has favorable tradeoffs in this regard). While replacing a pool of battle-tested clients with less tested clients would be a loss of security, it is of course possible that new clients could improve diversity metrics in the long run.

**Level of concern:** Medium**

This is a serious potential problem, but there is a solid core of EL developers who want to see their work in production.

**Mitigations:** Diversity can be enforced at the level of the multiproof strategy. This requires that RTP produces timely proofs for multiple different STFs, which makes scaling more difficult, but more secure.


### Potential Issue 2: Poor zkVM diversity
Just as we strive to have diversity of STF implementations, we also strive to have a diversity of zkVMs. In fact, we should also aim to have diversity of dependencies for all of these pieces of software. Notably, it would be risky if the only zkVMs in use all relied on a single SNARK library for constructing proofs.

**Level of concern:** Medium
There is a great diversity of teams aiming to deliver secure Ethereum L1 scaling, with more projects expected to come out of stealth mode over the coming year. Moreover, those teams see opportunities outside of Ethereum, such as in provable AI inference. Altogether we should be confident that there will be a robust zkVM ecosystem.

**Mitigations:** Again, the multiproof stategy is key. Validators should only accept blocks after having verified several proofs, covering a range of zkVM+STF combinations. In addition, analysis of shared points of failure, including at least the SNARK libraries and other cryptography primitives used to build zkVMs, should be tracked and risk should be spread out if any critical single point of failure is found.

## Security Component: The Guest Program

### Potential Issue 3: New bugs in old STFs and bugs in new STFs
EL clients have been running in production for years, successfully supporting billions of dollars of economic activity on Ethereum and allowing the network to grow to global importance. Making big changes to EL clients to support proving increases the chance of a critical bug in their core logic.

**Level of concern:** Medium-Low
The experience of EL client teams, coupled with the extensive [EEST testing framework](https://eest.ethereum.org/main/) gives us the confidence to refactor as needed for proving.

**Mitigations:** Teams should take care to avoid unnecessary code changes and to maintain, or even expand, testing. Formal verification that compiled guest programs match an EVM specification (a work in progress) would increase our confidence when making changes to STF implementations.


### Potential Issue 4: Risk due to changing the guest execution environment of battle-tested EL clients
Existing EL clients were designed to run on traditional CPUs inside of the most common operating systems. In this setting, the compiler is free to emit any of a large number of instructions and syscalls. As they exist now, zkVMs are dramatically more constrained (i.e., they support only a subset of the instructions and syscalls present in a typical program). This presents difficulties for compiling some languages for execution in zkVMs.

Of the EL clients listed [here](https://ethereum.org/developers/docs/nodes-and-clients/), only Reth is written in a language, Rust, for which there is official support for compilation to a minimal target ISA supported by several zkVMs, the RISC-V ISA called [RV32IM](https://doc.rust-lang.org/rustc/platform-support/riscv32-unknown-none-elf.html). For the clients written in Go, there is support for compilation to MIPS which can be proven by [Ziren](https://github.com/ProjectZKM/Ziren). There is also support for the RISC-V [rva20u64 profile](https://docs.riscv.org/reference/profiles/rva20-rvi20-rva22/_attachments/RISC-V_Profiles.pdf), which uses a rather complex set of extensions, much larger than RV32IM. It is likely that only a subset of these instructions need to be supported for a given guest program, but there is no guarantee that this subset will be stable under upgrades to dependencies or the compiler. For clients in other managed languages, similar considerations arise.

In recent months, support for additional ISAs has grown, with Jolt upgrading to RV64IMAC and Zisk upgrading to mildly non-compliant subset of RV64IMAFDCZicsr. Widespread support for, say, rva20u64, feels far off.

In a similar vein, there is the question of support for Linux syscalls in guest programs. At a recent client interop event, there was loose consensus among the zkVM teams present to standardize around Linux syscalls to, for instance, allocate guest memory&mdash;but no formal description of this commitment has been written down. Note that [there are many Linux syscalls](https://man7.org/linux/man-pages/man2/syscalls.2.html), but only some of these would need to be supported.

It has been [proposed](https://github.com/eth-act/zkvm-standards/pull/7) to standardize around the rv64im-unknown-none-elf target as a minimal baseline. The Geth team rejected this proposal, arguing that additional extensions should be supported by zkVMs to enable proving Go and other managed languages. Research on this is currently being conducted.

**Level of concern:** High
Supporting large targets in zkVMs requires some combination of:
1) added complexity to the core zkVM circuit;
2) software emulation in a simpler ISA;
3) program design + validation to compile to a strict subset of the available mandatory set.

**Mitigations:** The balancing act between different aspects of security is a core concern of the zkEVM project. We address this in terms of the points above.

1) *Added complexity to the core zkVM circuit*: It is commonly argued that Point 1 is the worst approach because writing custom circuits is quite bug-prone, due to both the complexity of the task itself and the fragmentation and immaturity of low-level circuit writing frameworks. That said, the core zkVM circuit should not change much, and formal verification of circuits against [Sail](https://github.com/rems-project/sail) specifications might give us confidence to build more complex machines.
2) *Software emulation in a simpler ISA*: Point 2 is viable as long as the prevalence of the more exotic instructions is low, since emulation overhead is typically very large (think 500$\times$). Note that Point 2 requires the ability to compile to a simpler target, so the software emulators would likely be written in C, C++, Rust, or Zig.
3) *Compile to a subset of the mandatory set*: The approach in Point 3 is brittle, but reliability-focused engineering and CI can go a long way. Breakages would be easy to detect (e.g., dumping to binary to look for new instructions and syscalls), and there is no evidence that breakages would be common in practice. Minimizing external dependencies in the STF code is reportedly easy. Teams can use testing to ensure that they can revert to an earlier compiler version for fast incident response. The approach of Point 3 has the benefit of allowing EL client teams to continue to use familiar tools, with the addition of a "de facto target ISA validation framework." This may make it easier for the EL client teams to respond to security incidents.

The same considerations apply with regard to the question of partial support for Linux syscalls.


### Potential Issue 5: Lack of tests for uncommon compilation targets supported by zkVMs
Rust defines [tiers of targets](https://doc.rust-lang.org/nightly/rustc/platform-support.html) to describe the level of testing that will be done for that target before a compiler release is made.
In brief:
 - Tier 1 *"Guaranteed to work"*: Programs are built for that target before a release, and those programs are tested. Support for the standard library is guaranteed.
 - Tier 2 *"Guaranteed to build"*: Programs are built for that target before a release, but the programs may not be tested. Standard library support may be incomplete unless the tiering is "with host tools," in which case standard library support is guaranteed.
 - Tier 3: Programs are not built for that target before a release.

Rust support for [RV32IM is only Tier 2](https://doc.rust-lang.org/rustc/platform-support/riscv32-unknown-none-elf.html), while [RV64GC is Tier 2 "with host tools"](https://doc.rust-lang.org/rustc/platform-support/riscv64gc-unknown-linux-gnu.html) (but this target emits Linux syscalls). An example CI run of Rust tests against a RISC-V 64-bit target is [here](https://github.com/rust-lang/rust/actions/runs/19116334329/job/54626328406).

Go, by contrast, seems to do robust testing of RISC-V. For instance, on [this Go CI dashboard](https://build.golang.org/) one can find this [CI failure of a RISC-V target](https://ci.chromium.org/ui/p/golang/builders/ci/gotip-linux-riscv64/b8699006944076070321/overview) where 127 out of 61836 tests fail. Unfortunately, Go offer much less control over the RISC-V code that is emitted, which (at present) can use a rather large set of extensions, Linux syscalls, and does not ofter built-in floating point emulation.

Regarding C++ compilers, [GCC](https://gcc.gnu.org/gcc-16/criteria.html) does not have higher-tier support for RISC-V, though it does support MIPS. Clang does test RISC-V, for instance, it seems to run over 6000 RISC-V specific unit tests [here](https://lab.llvm.org/buildbot/#/builders/87/builds/4010/steps/11/logs/stdio). But, as with Go compiler, only large target ISAs are covered.

[The RISE Project](https://riseproject.dev/) is pursuing improvements for compiler testing and support for RISC-V targets. We refer to their blog for information on support for [Rust](https://riseproject.dev/2025/04/15/project-rp004-support-for-a-64-bit-risc-v-linux-port-of-rust-to-tier-1/) and [Go](https://riseproject.dev/2025/04/04/advancing-go-on-risc-v-progress-through-the-rise-project/).

**Level of concern:** High
Compilers are highly complicated black boxes in this project. Any poor testing of these means that zkVMs can produce binaries that do not share the semantics of the STF under all inputs. This could clearly be very bad, since attesters would then not actually verify proofs of Ethereum state transitions, rather, they would verify proofs of some related but slightly different state transition. For a particular example, see this [blog post by Certora](https://www.certora.com/blog/llvm-bug), which is mentioned in this useful [overview by Argument](https://argument.xyz/blog/riscv-good-bad/).

**Mitigations:**
 - CL clients should impose diversity of guest program compilers in their multiproof settings.
 - Fuzz (compiled) guest programs.
 - Implement zkVMs with better-supported architectures, such at RV64GC or RVA20U64.
 - Advocate, and possibly implement, high-bar testing of compilation to "bare metal" targets (i.e., the small targets such as RV32IM supported by zkVMs today).

### Potential Issue 6: Use of custom ISAs
Projects such as [Valida](https://github.com/valida-xyz/valida) introduce bespoke ISAs that are designed for efficient proving. This means using compilers that do not benefit from the extensive testing and scrutiny that the most well-known compilers receive.

**Level of concern:** Medium-High

One the one hand, the LLVM stack has tons of eyes on it. On the other hand, it's massively complex, and bugs are regularly found in it. Still, on balance, it feels safer to use a standard compiler, at the very least because one can switch compilers (say, between GCC to Clang) in the event of a critical bug in either one.

**Mitigations:** Thorough testing and auditing. If the compiler is sufficiently simple and stable, we can become more confident in its security with time "in the wild."

### Potential Issue 7: Precompiles for proving
Due to the fact that execution in arithmetic circuits has a cost model that is fundamentally different to executing on a traditional binary computer, zkVMs introduce zkVM precompiles to optimize proving for difficult cases, like Keccak hashing. Traditional EVM precompiles have long been a target for simplification to improve Ethereum's security. While zkVM precompiles are, in practice, usually related to existing EVM precompiles, they are a distinct notion. zkVM precompiles may also be harder to vanquish than traditional precompiles as we pursue L1 Scaling, since this pursuit creates significant pressures to optimize for execution speed and cost. Note that in the case of EVM precompiles, the execution environment is a piece of commodity hardware, whereas in the zkVM case the execution environment is a virtual environment that is much easier to customize. The relative ease with which one can customize the environment tends to increase the attack surface of the composite system.

**Level of concern:** Medium-High

These precompiles tend to be complex.

**Mitigations:** Prover incentives that are more aligned with maintenance, and perhaps even proliferation of precompiles.
Some things that could help are:
 - Gas schedule changes: Reducing the need for, say, an efficient modexp or Keccak implementation, could reduce the worst-case proving time dramatically, reducing the need for an efficient implementation.
 - Reduce precompile surface area: ZKsync Airbender has [demonstrated](https://github.com/matter-labs/zksync-airbender/tree/main/risc_v_simulator/src/delegations) that making precompiles for 256-bit modular arithmetic, and using that as a building block for functions that might otherwise be separate precompiles, is a viable approach in terms of performance.
 - Autoprecompiles: Powdr Labs has worked on "autoprecompiles." These aim to give efficient code, akin to a precompile via an automated process, rather than a manual, per-operation process. [Reported](https://www.powdr.org/blog/accelerating-ethereum-with-autoprecompiles) performance is promising, but the security implications are unclear to the author.
 - The zkEVM Formal Verification project has a focus on such precompiles. Veridise has already [deployed](https://risczero.com/blog/RISCZero-formally-verified-zkvm) formal verification in this context.

## Security Component: The Proving

### Potential Issue 8: Emulator correctness
Each zkVM implements a custom VM emulator to execute a given program. If the emulator has a bug, then the proving that is done downstream of emulation will not demonstrate that EVM semantics have been followed faithfully.

**Level of concern:** Medium-High

**Mitigations:** Thorough test suites exist to test compliance of of RISC-V emulators. These are being run in the zkEVM Team's [zkEVM Test Monitor](https://eth-act.github.io/zkevm-test-monitor/). Compliance testing for additional ISAs should be run nightly and tracked similarly. When ready, formal verification will provide greater assurances of correctness.

### Potential Issue 9: Circuit correctness
At the core of every zkVM library is the implementation of machine specification using arithmetic circuits. It is required that this machine implements the correct semantics. Otherwise, demonstrating that it has executed correctly after being fed a STF and a set of inputs and outputs does not mean that the state transition was valid in the sense of conforming to the Ethereum protocol specification.

**Level of concern:** High

**Mitigations:** Exhaustive unit testing of fundamental circuits is critical. Thorough audits and compelling bug bounties are critical. Fuzzing has been shown to be effective in finding circuit bugs; see the work of [Hochrainer, Isychev, Wüstholz, and Christakis](https://arxiv.org/pdf/2411.02077) who have found significant bugs in R0VM, Noir, and other zkSNARK software.

### Potential Issue 10: EVM semantics of composite system are wrong
The ultimate desired property of a zkEVM is that it exactly constrains a prover to describe a valid state transition. While, for security purposes, it is useful to take a modular approach, it is also important to stress-test the full pipeline.

**Level of concern:** High
This is a meta-issue encompassing many others.

**Mitigations:** All of the [EEST](https://eest.ethereum.org/main/) test cases should be proven, [not just a subset](https://github.com/paradigmxyz/reth/pull/18140) of these. As mentioned before, formal verification will eventually offer strong guarantees up to the point where the proving system consumes a compile's guest program.

### Potential Issue 11: Transpilation
The zkVMs transform an input binary to a representation that is suitable for proving. In some cases this is quite faithful to the RISC-V itself, while in other cases this introduces another low-level abstraction that a programmer or auditor must understand. In some cases this is done for performance reasons, specifically concerning the emulation of these programs. If the transpilation step has a bug, for instance it silently NOPs a block of instructions, then witness generation (see below) for that part of the program is meaningless.

**Level of concern:** Medium

**Mitigations:** Thorough, explicit documentation, ideally in the form of unit tests that cover both success and failure cases, can help engineers avoid mistakes and can help auditors find mistakes.


### Potential Issue 12: Witness generation
In addition to generating a complete trace for the execution of a client for a given set of inputs, and possibly transpiling it to an internal representation suitable for proving, a zkVM must generate a complete witness for proving. This is a kind of finer-grained execution trace generation that, for instance, may generate data for lookup arguments or constraints, gluing constraints that link different parts of the program. If the witness generation is incorrect, even for a correct arithmetic circuit, the system might incorrectly reject a valid transaction, or incorrectly accept an invalid transaction.

**Level of concern:** High
Note that this is closely related to circuit correctness.

**Mitigations:** Similar to circuit correctness. It is a good idea to write many failure tests where, for example, it is checked that supplying a specially crafted, malicious witness results in a proof that does not pass verification. One could start with examples from the bug trackers maintained by [0xPARC](https://github.com/0xPARC/zk-bug-tracker) and [zkSecurity](https://bugs.zksecurity.xyz).


### Potential Issue 13: Protocol bug in whitepaper
Bugs, including the famous ZCash bug (see p.25 of [BCTV](https://eprint.iacr.org/2013/879.pdf)), are found even in well-studied papers, written by the world's foremost experts on zk proving, years after publication. For newer and less known protocols, the probability of a bug is likely even higher.

**Level of concern:** Medium

**Mitigations:** When implementing systems described in less well-studied papers, the implementing teams and their auditors should conduct a review of the paper, possibly seeking guidance and opinions from an expert in the theory. Formal verification will help significantly here&mdash;it will require an in-depth rewrite of the protocols, then reducing correctness statements (such as completeness and soundness of the protocol) to certain basic axioms.

### Potential Issue 14: Paper is under-specified or inexplicit
The well known [Frozen Heart Vulernability](https://blog.trailofbits.com/2022/04/15/the-frozen-heart-vulnerability-in-bulletproofs/) can be attributed in some cases to papers being unclear about what data is to be hashed in order to correctly implement the Fiat-Shamir transformation, a ubiquitous component of zkEVMs. One could argue that this is a protocol bug, but it feels more accurate to attribute this to the gap between theory and implementation.

**Level of concern:** Medium

**Mitigations:** Thorough specifications and in-depth audits.


### Potential Issue 15: Protocol "optimizations" break the protocol
The protocols as written in papers may differ from what the teams intend to implement. For instance, batching of polynomial commitments might be added or modified, or additional steps that require further prover-verifier interactions may be incorrectly fused into other steps. Another, less concerning, sort of discrepancy is that the papers on SNARK protocols often fix an arithmetization that is simple, such as R1CS or the 'vanilla' madd gate in PlonK. For production-grade systems capable of proving Ethereum in real time, dramatically more complex setups are needed. In practice, this component is rather modular, and not too much of a concern for the security of the protocol (but this _is_ a BIG concern for semantic correctness of the zkEVM!).

**Level of concern:** High
The incentives to optimize these systems are strong. Attacks could allow malicious payloads to be constructed that grief the network or cause invalid transactions to be accepted.

**Mitigations:** Precise, clear protocol specifications should be written, ideally before implementation. These should be kept current. Auditors should read these specifications and be sure that security proofs for "basic" protocols do in fact carry over under modification. This should also be covered by formal verification&mdash;the protocols _as implemented_ should be specified.

### Potential Issue 16: Implementation of SNARK protocol does not match the spec
If the implementation of the SNARK protocol does not match a correct specification, then it's not even clear what is implied by a verifier accepting a proof as valid.

**Level of concern:** Medium
Potential impact is high, but audits focus on such issues and should catch this.

**Mitigations:** Clarity of code, correct comments in the code, and, best of all, explicitly linking sections of code with the spec, all mean that the spec can be checked. The most extreme and powerful version of this mitigation is formal verification. Testing, including failure cases, helps here.

### Potential Issue 17: The protocol offers a low number of bits of security
The security of any cryptographic protocol depends on computation hardness assumptions. zkVMs rely on a variety of assumptions, as well as the correct setting of security parameters. Such parameters can include choices of elliptic curves, lattice parameters, and hash functions. One prominent security parameter is the number of query rounds executed during proving of "proximity proofs," which are the heart of the most widely used polynomial commitment schemes. In such settings, it is known how to set the number of queries securely (say, to achieve 128 bits of security), but it is [conjectured](https://eprint.iacr.org/2021/582) that around half as many queries would in fact give this level of security. A forthcoming [ethresear.ch](https://ethresear.ch/) post by Arantxa Zapico will detail these issues. If such conjectures turned out to be incorrect, then the zkEVM using the protocol would in fact be more vulnerable to brute force attacks than believed, allowing provers to find malicious inputs that could cause proofs to be incorrectly accepted.

**Level of concern:** Medium
The goal here is security by deterrance. The potential impact is high, but unless community standards erode significantly or there is a massive gap in the security analysis, exploitability is low when compared to more mundane attacks on the code.

**Mitigations:** Audits by cryptographers are essential. It would be wise to implement and regularly test fallback systems using parameters that are either proven secure or have a longer track record of use "in the wild."

## Security Component: The Engineering Stack

### Potential Issue 18: zkVMs depend heavily on unsafe code
It is good for security that the zkVMs are written in safer languages such as Rust, but this is significantly undermined by the use of unsafe Rust. Unsafe code comes in primarily for reasons of performance, either to optimize Rust, or to call out to C, C++ or CUDA. Bugs tend to spring from complexity, so defaulting to unsafe languages for the most complex, low-level code significantly undermines the value of using a safe language.

**Level of concern:** Medium-High

**Mitigations:** Reduce the amount of unsafe code where possible. Run sanitizers regularly and before any release. Fuzzing for crashes is also helpful here.

# Conclusion
zkEVMs rely on what is often called "moon math." While it is true that these systems represent a cutting-edge frontier of cryptography, ensuring the security of these systems will come down to a few simple ideas.

One of those ideas is to spread out risk through diversity, with validators verifying not just one proof, but several proofs, with the goal of minimizing the number of shared zkEVM dependencies. Thorough testing is critical. Maintaining and conforming to formal specifications, whether of cryptographic protocols or virtual machines, is necessary in order to reason about the system. Techniques for bug finding, such as auditing and fuzzing, have been successfully deployed for years by many different security firms. Longer term, formal verification of parts of the zkEVMs will give us a higher degree of security, and perhaps even the confidence to grow [faster](https://aws.amazon.com/blogs/security/an-unexpected-discovery-automated-reasoning-often-makes-systems-more-efficient-and-easier-to-maintain/).
