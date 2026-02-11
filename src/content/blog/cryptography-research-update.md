---
title: "zkEVM Security Sprint: February Update"
date: "2026-02-11"
excerpt: "zkEVM Security Sprint: Whitepaper guidelines, lookups in soundcalc, and an updated deadline."
author: "Dmitry Khovratovich, Arantxa Zapico, George Kadianakis"
featured: true
---

*(Guest post by the [EF Cryptography Research team](https://crypto.ethereum.org/))*

![Cryptography milestones timeline](/blog/sprint_timeline.png)

In this post, we provide some updates from [the zkEVM security sprint](https://blog.ethereum.org/2025/12/18/zkevm-security-foundations).

## Published zkVM Architecture Whitepaper Guidelines

In [a previous blog post](https://blog.ethereum.org/2025/12/18/zkevm-security-foundations#three-milestones) we outlined three security related milestones for zkVMs:
- **M1** (Feb 2026): [soundcalc](https://github.com/ethereum/soundcalc) integration
- **M2** (May 2026): 100-bit provable security, ≤600 KiB proofs, architecture overview
- **M3** (Dec 2026): 128-bit provable security, ≤300 KiB proofs, architecture security proof

Today we are [releasing detailed requirements](https://crypto.ethereum.org/docs/zkvm_architecture_whitepaper_details.pdf) for the *zkVM architecture whitepaper*, a document we're asking teams to produce in the M2 and M3 milestones.

Why is this document needed? Modern zkVMs aren't monolithic circuits. They are composed of many moving parts: segmentation, buses, memory handling, recursion, and aggregation. Each component may be sound on its own, but system-level security depends on how they fit together.

Analyzing isolated components doesn't tell the full story: architectural assumptions and the glue between the components is often implicit, making robust security evaluation difficult.

We believe well-structured whitepapers will strengthen overall ecosystem security. We ask the whitepaper to be delivered in three milestones (W1, W2, W3), aligned with the existing deliverable timeline:
| Milestone | Deadline | Deliverable overview |
|-----------|----------|-------------|
| W1 | May 1 | Architecture overview: segmentation and recursive structure |
| W2 | Sep 1 | Architecture details: buses, memory, instruction fetching, in-depth recursive structure |
| W3 | Dec 1 | Security argument: proof sketch that the zkVM is an argument of knowledge |

Check out [our document](https://crypto.ethereum.org/docs/zkvm_architecture_whitepaper_details.pdf) for the full details.


## soundcalc: Lookups (and beyond) Security Evaluation

 For M1, we want teams to also integrate [their inner-segment arguments](https://github.com/ethereum/soundcalc/blob/main/soundcalc/zkvms/openvm/openvm.toml#L69-L75) to soundcalc. We've integrated support for lookups into soundcalc, and already implemented [the logup soundness](https://github.com/ethereum/soundcalc/pull/59), which captures arguments such as permutations, range checks, interaction buses, and connections.

## M3 Deadline Updated

We've moved the M3 deadline to early December 2026, allowing time for review before the holidays. This also aligns M3 with the W3 whitepaper deadline.

Please reach out at `cryptography@ethereum.org` if you need help or have any questions.
