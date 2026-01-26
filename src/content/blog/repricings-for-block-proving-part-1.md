---
title: "Repricings for block proving (Part 1: The motivation)"
date: "2025-12-17"
excerpt: "This is a two-part article series exploring gas repricing driven by block proof generation in the Ethereum protocol."
author: "Ignacio Hagopian"
featured: true
workstream: "economic-security"
topics: ["economics", "gas-costs", "repricing"]
---

*Thanks to Cody, Kev, Marius, Maria, Ladislaus, Justin, and Thomas for their feedback.*

This is a two-part article series exploring gas repricing driven by block proof generation in the Ethereum protocol.

Figuring out any repricing for Ethereum is complex—the current [Glamsterdam](https://forkcast.org/upgrade/glamsterdam/) repricing working group includes more than 15 experienced coredevs. While running a benchmark in a single EL client is easy, concluding repricings requires considering all relevant clients, building tools for measuring, and analyzing user impact. Block proving is no exception; it requires new tooling to enable reproducible measurements so we can collectively agree on changes.

In this first article of the series, we walk through the underlying motivations and technical reasons for repricings. In the second part, we will dive into the engineering of the tools we have created, so you can see how we walk through the process, run the benchmarks yourself, and help us improve.

It is important to remember that this is ongoing work. Different ELs and zkVMs are rapidly evolving, meaning benchmarks will fluctuate in the coming months. This doesn't mean we should wait; rather, we must focus on building the right measurement processes so conclusions can be refreshed as fresh data becomes available.

## Why do we need to price operations?

The purpose of "gas" in Ethereum is to serve as a proxy for the resources an operation consumes. By "resources," we usually mean compute, bandwidth, disk IO, and state growth. As with any system, if we can't meter the accepted workload, we can't guarantee reliable operation.

The starting point is defining the hardware setup. Today's node requirements are described by [EIP-7870](https://eips.ethereum.org/EIPS/eip-7870). After defining the hardware, we need to ensure that if the system is running at full capacity (i.e., hitting the `gas_limit`), it still behaves as designed. Some examples of what "behaving as designed" means:

- Attestors can perform duties within the deadline.
- The network remains stable under deep reorgs.
- Long-term effects, such as state growth, remain within manageable bounds.

Block proving is not an exception—the starting point is the defined prover hardware (an example definition is in [this article](https://blog.ethereum.org/2025/07/10/realtime-proving)). While not as precise as EIP-7870, the article establishes the CapEx and OpEx required to run a prover for P99. This sounds like a reasonable strategy for now, since it isn't entirely clear yet whether all zkVMs will require the same hardware for peak performance.

For a defined gas pricing, any block that uses the `gas_limit` must be provable within the defined proving time. Failing to do so breaks protocol guarantees. This highlights that **proving is a new kind of resource in the network**, and like compute or bandwidth, it must be metered.

Today's gas prices do not account for the *proving resource* usage, thus if one operation's highest cost is using prover resources, it must be priced accordingly to guarantee this resource can't be exhausted in a block using `gas_limit`. This is the nature of the unidimensional gas pricing model: it is simple for the protocol and users, but each operation must be priced for the worst-case usage of required. This is not necessarily a wink to [multidimensional gas](https://vitalik.eth.limo/general/2024/05/09/multidim.html), but keeping this "worst-case" model in mind helps understand the implications of network throughput when operations have different costs per resource.

## What are the effects of mispriced operations for provers?

If a precompile or opcode is mispriced, we face two scenarios:

- It is *underpriced:* it allows blocks that require more resources than are available, opening the door to Denial-of-Service (DoS) attacks.
- It is *overpriced:* the network underutilizes resources, leaving performance on the table.

For block proving, underpricing causes either *delayed proof creation* or a *crash fault*. A delayed proof can have downstream effects on the protocol, e.g., loss of block rewards and delays in finality. A *crash fault* is more severe: it means that no matter how long the prover tries, generating a proof is impossible due to fundamental design limitations. A *crash fault* isn't only a bug that can always be fixed without affecting verifiers—they can be bound to things deeply tied to their proving system, thus aren't easily fixable (i.e., proving system finite field).

Examples of crash faults include:

- *Max cycle limits:* Similar to CPU cycles, zkVMs often have a hard limit on execution length. If a block exceeds this, it cannot be proven.
- *Max memory:* Similar to an OOM crash during a block re-execution. Unlike a host machine, where you can add RAM, zkVMs often have architectural memory limits that cannot be solved with hardware upgrades.
- *Max input size:* Proving the state transition function (STF) means executing a block statelessly. All the required state, such as the block, ancestors, and pre-state, must be provided. Some zkVMs enforce hard limits on the size of this data.

These are not theoretical tail risks—we have already triggered these faults in testing. This isn't to blame zkVM teams, but to highlight that Ethereum's worst-case execution traces were previously unexplored in the context of ZK proving. If you are interested in a bit more on this topic, you can also read a [previous article on benchmarking zkVMs](/blog/benchmarking-zkvms).

Conversely, if an opcode is overpriced for proving, the gas cost likely remains unchanged under the current model, since we still must cover the cost of standard re-execution.

## How realistic is it that prover killers happen on mainnet?

The concept of a *prover killer* describes an Ethereum transaction that exploits a very underpriced operation for provers, forcing them to do more work than we might expect given their gas usage.

Sending these transactions to mainnet is easy, since there are already worst-case datasets and tooling to do so, which we will cover in the next article of this series. Today's block builders don't have the duty of creating proofs, so they have no incentive to censor transactions that are prover-killers.

When builders are responsible for generating block proofs, whether they are doing it themselves or paying a service provider, there are two potential realities:

- [FOCIL](https://eips.ethereum.org/EIPS/eip-7805) doesn't exist: in this case, nothing prevents them from excluding these transactions from the blocks they create, effectively working around the problem. It could be a plain exclusion or asking for a higher fee to include them—whichever makes economic sense. Note this can have strange effects on UX, or indirect "censorship" of txs.
- FOCIL does exist: unless their block is full, builders could be forced to include killer transactions, since they will be interpreted as censored and thus included in FOCIL inclusion lists (ILs).

Note that [EIP-7825](https://eips.ethereum.org/EIPS/eip-7825) caps the maximum gas a single transaction can use. While this helps, it is not a solution to the problem. FOCIL can have up to 16 ILs, where each has a maximum size of 8KiB. Prover killers don't necessarily require big calldata, thus even a single IL can always force block spare capacity up to the gas limit. As a conservative estimate, a single IL could force 40 txs, each consuming 17M gas, forcing up to 680M gas into a block (assuming no FOCIL gas limit exists).

To be clear, there is nothing intrinsic to FOCIL that makes it a prover killer. It is just a mechanism that an attacker can use to force mispriced gas into a block. This can be used for both mispriced re-execution and prover-related workload—we mainly mention *prover killers* here since proving has the highest mispriced operations.

## EL and zkVM performance improvements

The block proving throughput depends on three dimensions:

- The efficiency of the EL doing the STF: this is the same as how EL clients can optimize for re-execution.
- The efficiency of the zkVM proving the execution trace: the zkVMs prove the correctness of whatever execution trace is provided by the used EL. Better cryptographic arguments, or raw engineering optimizations in their implementation, can make them faster.
- The efficiency of the hardware used by the zkVM: this is related to how fast the underlying hardware used for proving improves over time, e.g., GPU performance.

Within the same capital and operational cost bounds, three independent dimensions compound their improvements. Each dimension improves at a different pace since they have different levels of maturity. For example, few EL clients have optimized their implementations for efficient execution on zkVMs so that significant gains may emerge in the future. zkVMs have shown impressive improvements over the last year, as shown in [Ethproofs](https://ethproofs.org/), and hardware is expected to continue improving over time. The last dimension might disappear if we eventually switch from defining prover requirements in terms of CapEx/OpEx to concrete hardware specs.

While it is hard to predict the overall pace of improvement, we should focus on having proper tooling and processes to continually evaluate them and their implications for pricing. There might be opcodes that could be bottlenecked by proving capacity within the next one or two years, but after many more years, they could be bottlenecked again by some other existing resource (i.e., re-execution related bottlenecks).

## Conclusion

Block proving introduces a new "resource dimension" to Ethereum that is currently unmetered. This lack of defined metering creates risks that range from inefficient pricing to fatal crash faults that could halt core parts of Ethereum's functioning.

While the ecosystem is moving fast—with hardware accelerating and zkVMs optimizing daily—we cannot rely on assumptions. We need a rigorous, data-driven approach to pricing and treating proving costs with the same granularity and seriousness as we treat compute and I/O today.

Developing this data-driven approach to repricing block proving will require a shift from theoretical debates to reproducible engineering. We need to generate worst-case blocks, run them through various zkVM/EL combinations, and objectively measure the results. And, more importantly, these measurements must be reproducible—our team doesn't want to (nor could we) be the authoritative voice on any repricing conclusion. We will need the help of the EL and zkVM teams to reproduce and optimize their implementations while this process is underway.

In Part 2 of this series, we will leave the theory behind and dive into the practical tooling we have built to make this possible. We will show you how to reproduce these measurements and how you can help us stress-test the next generation of Ethereum's proving infrastructure.
