---
title: "EIP-8025: bringing optional execution proofs to Hegotá"
date: "2026-05-14"
excerpt: "The non-headliner proposal window for Hegotá - the fork planned to follow Glamsterdam - is open, and the L1-zkEVM workstream is putting EIP-8025 (Optional Execution Proofs) forward for inclusion."
author: "Ladislaus von Daniels"
featured: true
---

The non-headliner proposal window for [Hegotá](https://forkcast.org/upgrade/hegota) - the fork planned to follow Glamsterdam - is open, and the L1-zkEVM workstream is putting **EIP-8025 (Optional Execution Proofs)** forward for inclusion, with two adjacent EIPs to potentially accompany it.

If it lands, this would be the first step towards one of the more consequential architectural shifts on Ethereum's roadmap: validating blocks by verifying proofs rather than re-executing them.

This post covers what's being proposed, why now, and where the R&D stands.

## What execution proofs change

Today, every full node verifies every block by re-executing every transaction inside it. The cost scales linearly with the gas the block consumes, and every verifying node has to hold the EL state to do its job.

Both couple node requirements to throughput: raising the gas limit increases the threshold for who can run a node.

zkEVM proofs (proofs of correct execution) provide an alternative. Instead of replaying transactions, **a node downloads a small proof and verifies it**.

Verification is stateless (no EL state needed), and crucially, the cost of checking the proof is roughly constant in block size: a 60M-gas block and a 600M-gas block verify in approximately the same time.

This property of zkEVM proofs is what **permits the gas limit to rise** without raising the bar for running a verifying node (see also this [primer](https://www.youtube.com/watch?v=Z0Nad1wB_pY) on scaling Ethereum with zkEVM proofs).

## What's in EIP-8025?

The central proposal for inclusion in Hegotá is **[EIP-8025: Optional Execution Proofs](https://eips.ethereum.org/EIPS/eip-8025)**.

It introduces a consensus-layer mechanism by which beacon nodes can verify the validity of an *execution payload* using zkEVM proofs received over the P2P network, rather than purely re-executing locally.

The **EIP defines two new opt-in node roles**, expressed in the spec as modes a node enables independently or together:

- **Provers** (proof-generating mode) altruistically produce zkEVM proofs for each block's execution and gossip them.
- **zkAttesters**, also called *stateless attesters* (proof-verifying mode), verify a block by checking received zkEVM proofs and attest on that basis.

EIP-8025 lives primarily on the consensus layer, but it also introduces an execution-layer artefact: the *guest program*, the block-execution logic that runs inside a zkVM and constitutes the computation the prover proves.

The EVM itself is not modified; existing EL clients continue producing payloads as before.

Importantly, validators who do not opt in see no change.

## Why optional first?

L1-zkEVM is a **substantial shift in how blocks are validated on Ethereum**, and the surface area touches many parts of the protocol stack: execution, consensus, cryptography, networking, economics, and governance.

Making EIP-8025 **non-consensus-critical** lets the network test real-time zkEVM proving & verifying under mainnet conditions with only a subset of attesters opting in.

In this optional phase, attestation duties are still driven by the EL client's re-execution of payloads, with **proofs serving as a supplementary check** rather than the sole source of validity. A node that has opted in but hasn't received enough valid proofs in time simply attests as it does today.

This preserves a **robust fallback** if proofs are late, missing, or buggy, and it is the rational stance for an individual zkAttester: **proving is altruistic during the optional phase**, and missed or late proofs translate into missed timeliness rewards.

## Why propose now?

ZK **technology has significantly matured**. Proving stacks have been running in production on L2s/rollups for years. As a logical continuation of the rollup-centric roadmap, the idea is to make L1 a rollup itself — always has been 🧑‍🚀🔫🧑‍🚀

Moreover, both CL and EL **specs for EIP-8025 are largely settled**, and both already have functioning **client implementations**. As a fully opt-in change, inclusion in Hegotá is **low-risk**: validators that don't enable either mode see no change to behaviour, bandwidth, or attestation duties.

Just as important, proposing the EIP now anchors the work inside the protocol upgrade process, where it needs to live. Very practically, client teams, zkVM teams, tooling maintainers, and spec writers should feel empowered to **allocate sustained resources** to working on zkVMs, *guest programs*, execution witness generation, and the surrounding test infrastructure.

Whether and when proofs eventually become protocol-native and *mandatory* is a separate decision for a later EIP and a later fork, at which point attesters won't be required to run a stateful EL client anymore — reducing the cost of running a verifying node dramatically.

## What's being proposed alongside?

Beyond EIP-8025, the broader L1-zkEVM rollout calls for further EL adaptations, which is why two further EL-side proposals are being proposed alongside EIP-8025:

- [**EIP-7709**](https://forkcast.org/eips/7709): reroutes the BLOCKHASH opcode to read from the EIP-2935 history system contract instead of relying on the client's local view of recent blocks. That removes the last opcode in the EVM that **implicitly assumes statefulness**, with a corresponding gas-price adjustment to reflect the underlying storage read.
- [**EIP-8200 (EVMification)**](https://ethereum-magicians.org/t/eip-8200-evmification/28036/3): replaces a limited set of low-usage precompiles with equivalent EVM bytecode which would meaningfully **reduce worst-case proving** times. Average-case single-digit-second proving is of limited value if an attacker can craft a block that takes minutes to prove.

These two might land in Hegotá or later. EIP-8025 is specified to work without either of them; the accompanying EIPs make the next steps cleaner, but they aren't preconditions for it.

## What's happening in parallel?

An initial **multi-client devnet** running EIP-8025 on Lighthouse and Prysm is being spun up as a first integration target in the coming weeks. The EF's zkEVM team has been working closely with EL and CL client teams, as well as zkVM teams, through **many months of joint preparation** leading up to this point.

Meanwhile, the EF is commissioning an **on-prem GPU prover cluster** for benchmarking and ongoing proving work, which provides the standardisation and prover-infrastructure workstreams with a stable target to develop against.

Once the Glamsterdam specs stabilise, **follow-up devnets** are expected to be adapted on top of two Glamsterdam features: block-level access lists (**BALs**), which allow provers to fetch state and parallelise proving work, and **ePBS** (enshrined Proposer-Builder Separation), which restructures the slot in a way that gives provers a more generous time window between block availability and the attestation deadline.

## How to engage

- The plan is to propose EIP-8025 for inclusion in Hegotá on the next AllCoreDevs Consensus call on May 14. [Tune in](https://github.com/ethereum/pm/issues/2028) for the full run-down.
- EIP discussion may happen in the [ethmagicians thread](https://ethereum-magicians.org/t/eip-8025-optional-execution-proofs/25500).
- There's also a monthly L1-zkEVM breakout call (scheduled on the [protocol calendar](https://calendar.google.com/calendar/embed?src=c_upaofong8mgrmrkegn7ic7hk5s%40group.calendar.google.com)).
- Asynchronous discussions happen on Eth R&D Discord, where #l1-zkevm-protocol is dedicated to protocol-related discussions and #l1-zkevm to zkVM-related discussions.

---

**Key Takeaway: EIP-8025 lets execution proofs run on Ethereum mainnet without putting them on the consensus-critical path. It is a minimum viable step that meaningfully moves the L1-zkEVM effort closer to the protocol — and a reasonable one for Hegotá.**
