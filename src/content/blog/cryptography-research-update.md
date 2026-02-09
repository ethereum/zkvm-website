---
title: "zkEVM Security Sprint: February Update"
date: "2026-02-09"
excerpt: "A comprehensive overview of our Q2 achievements, upcoming milestones, and how the community can get involved in the zkEVM initiative."
author: "Dmitry Khovratovich, Arantxa Zapico, George Kadianakis"
featured: true
---

*(Guest post by the [EF Cryptography Research team](https://crypto.ethereum.org/))*

![Cryptography milestones timeline](/blog/crypto-milestone.png)

Updates from [the zkEVM security sprint](https://blog.ethereum.org/2025/12/18/zkevm-security-foundations):

## Published zkVM Architecture Whitepaper Guidelines

We've [released detailed requirements](https://crypto.ethereum.org/docs/zkvm_architecture_whitepaper_details.pdf) for the *zkVM architecture whitepaper*, a document we're asking teams to produce alongside the M2 and M3 security milestones from our [original post](https://blog.ethereum.org/2025/12/18/zkevm-security-foundations#three-milestones).

Why is this document needed? Modern zkVMs aren't monolithic circuits. They are composed of many moving parts: segmentation, buses, memory handling, recursion, and aggregation. Each component may be sound on its own, but system-level security depends on how they fit together.

Analyzing isolated components doesn't tell the full story: architectural assumptions and the glue between the components is often implicit, making robust security evaluation difficult.

We believe well-structured whitepapers will strengthen overall ecosystem security. We ask the whitepaper to be delivered in three milestones (W1, W2, W3), aligned with the existing deliverable timeline:

| Milestone | Deadline | Deliverable overview |
|-----------|----------|-------------|
| W1 | May 1 | Architecture overview: how segmentation works and basic recursive structure |
| W2 | Sep 1 | Architecture details: bus organization, memory handling, instruction fetching, in-depth recursive structure |
| W3 | Dec 1 | Security argument: proof sketch that the zkVM implements an argument of knowledge |

Check [our document](https://crypto.ethereum.org/docs/zkvm_architecture_whitepaper_details.pdf) for the full details.

## soundcalc: Lookup Security Evaluation

We've integrated lookup argument support into [soundcalc](https://github.com/ethereum/soundcalc). For M1, teams should integrate [their inner-segment lookups](https://github.com/ethereum/soundcalc/blob/main/soundcalc/zkvms/openvm/openvm.toml#L69-L75) to get accurate security estimates.

## M3 Deadline Updated

We've moved the M3 deadline to early December 2026, allowing time for review before the holidays. This also aligns M3 with the W3 whitepaper deadline.

Please let us know ([cryptography@ethereum.org](mailto:cryptography@ethereum.org)) if you need any help or clarifications.
