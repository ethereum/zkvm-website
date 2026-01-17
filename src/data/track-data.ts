import { TrackData } from '@/lib/track-types';

const executionCriteria = [
  {
    id: 'hardforks',
    name: 'Up to date with current hardforks',
    description: 'Client supports all mainnet hardforks'
  },
  {
    id: 'eest',
    name: 'Passes all EEST tests',
    description: 'Program compilation passes Ethereum Execution Specification Tests'
  },
  {
    id: 'witness',
    name: 'Generates ExecutionWitness',
    description: 'Node can generate the ExecutionWitness data structure'
  },
  {
    id: 'compilation',
    name: 'Compiles to zkVM target',
    description: 'Can compile to target supported by production-ready zkVMs'
  }
];

const consensusCriteria = [
  {
    id: 'hardforks',
    name: 'Up to date with current hardforks',
    description: 'Client supports all mainnet hardforks'
  },
  {
    id: 'executionProofs',
    name: 'Implemented Optional execution proofs',
    description: 'Support for optional execution proof generation'
  },
  {
    id: 'epbs',
    name: 'Implemented ePBS',
    description: 'Support for enshrined Proposer-Builder Separation'
  }
];

export const trackData: TrackData = {
  categories: [
    {
      id: 'real-time-proving',
      name: 'Real-Time Proving',
      description: 'Prover performance, benchmarks, and hardware acceleration for sub-12s proof generation',
      workstream: 1,
      icon: 'zap',
      lastUpdated: '2026-01-17',
      milestones: [
        {
          id: 'sub-15s-proving',
          name: 'Sub-15s block proof generation',
          description: 'Generate proof for full Ethereum block in under 15 seconds',
          status: 'in-progress',
          metric: {
            current: 18,
            target: 15,
            unit: 'seconds'
          }
        }
      ]
    },
    {
      id: 'client-integration',
      name: 'Client & Protocol Integration',
      description: 'Ethereum client readiness and protocol specifications for zkEVM integration',
      workstream: 2,
      icon: 'network',
      lastUpdated: '2026-01-17',
      milestones: [
        {
          id: 'geth-readiness',
          name: 'Geth zkVM readiness',
          description: 'Geth passes all criteria for zkVM integration',
          status: 'in-progress'
        },
        {
          id: 'reth-readiness',
          name: 'Reth zkVM readiness',
          description: 'Reth achieves spec compliance for zkVM integration',
          status: 'achieved',
          verification: {
            date: '2026-01-15',
            note: 'Rust is readily supported by zkVMs'
          }
        },
        {
          id: 'consensus-integration',
          name: 'Consensus client integration',
          description: 'At least one consensus client supports execution proofs',
          status: 'in-progress'
        }
      ],
      clients: [
        // Execution clients
        {
          name: 'Geth',
          type: 'execution' as const,
          progress: 2,
          total: 4,
          status: 'IN DEVELOPMENT',
          statusColor: 'orange' as const,
          criteria: {
            hardforks: {
              id: 'hardforks',
              name: 'Up to date with current hardforks',
              description: 'Client supports all mainnet hardforks',
              status: 'complete',
              note: 'Running on mainnet'
            },
            eest: {
              id: 'eest',
              name: 'Passes all EEST tests',
              description: 'Program compilation passes Ethereum Execution Specification Tests',
              status: 'complete'
            },
            witness: {
              id: 'witness',
              name: 'Generates ExecutionWitness',
              description: 'Node can generate the ExecutionWitness data structure',
              status: 'under-review',
              note: 'PR #32216 merged, compatibility being verified',
              disputeDetails: 'Geth team: Implementation complete. EF: Verifying compatibility with reference implementation.'
            },
            compilation: {
              id: 'compilation',
              name: 'Compiles to zkVM target',
              description: 'Can compile to target supported by production-ready zkVMs',
              status: 'under-review',
              note: 'Works with Ziren, production readiness under discussion',
              disputeDetails: 'Geth team: Compiles and proves with Ziren. EF: Concerns about partial syscall support and brittleness.'
            }
          },
          notes: [
            'Can run as zkVM guest program in Ziren',
            'ExecutionWitness implementation under verification',
            'Discussion ongoing about zkVM target requirements'
          ]
        },
        {
          name: 'Nethermind',
          type: 'execution' as const,
          progress: 2,
          total: 4,
          status: 'IN DEVELOPMENT',
          statusColor: 'orange' as const,
          criteria: {
            hardforks: {
              id: 'hardforks',
              name: 'Up to date with current hardforks',
              description: 'Client supports all mainnet hardforks',
              status: 'complete',
              note: 'Up to date with current hardforks'
            },
            eest: {
              id: 'eest',
              name: 'Passes all EEST tests',
              description: 'Program compilation passes Ethereum Execution Specification Tests',
              status: 'in-progress'
            },
            witness: {
              id: 'witness',
              name: 'Generates ExecutionWitness',
              description: 'Node can generate the ExecutionWitness data structure',
              status: 'complete',
              note: 'Generates ExecutionWitness'
            },
            compilation: {
              id: 'compilation',
              name: 'Compiles to zkVM target',
              description: 'Can compile to target supported by production-ready zkVMs',
              status: 'in-progress'
            }
          }
        },
        {
          name: 'Besu',
          type: 'execution' as const,
          progress: 1,
          total: 4,
          status: 'PLANNING',
          statusColor: 'blue' as const,
          criteria: {
            hardforks: {
              id: 'hardforks',
              name: 'Up to date with current hardforks',
              description: 'Client supports all mainnet hardforks',
              status: 'complete',
              note: 'Up to date with current hardforks'
            },
            eest: {
              id: 'eest',
              name: 'Passes all EEST tests',
              description: 'Program compilation passes Ethereum Execution Specification Tests',
              status: 'not-started'
            },
            witness: {
              id: 'witness',
              name: 'Generates ExecutionWitness',
              description: 'Node can generate the ExecutionWitness data structure',
              status: 'not-started'
            },
            compilation: {
              id: 'compilation',
              name: 'Compiles to zkVM target',
              description: 'Can compile to target supported by production-ready zkVMs',
              status: 'not-started'
            }
          }
        },
        {
          name: 'Reth',
          type: 'execution' as const,
          progress: 4,
          total: 4,
          status: 'SPEC COMPLIANT',
          statusColor: 'green' as const,
          criteria: {
            hardforks: {
              id: 'hardforks',
              name: 'Up to date with current hardforks',
              description: 'Client supports all mainnet hardforks',
              status: 'complete'
            },
            eest: {
              id: 'eest',
              name: 'Passes all EEST tests',
              description: 'Program compilation passes Ethereum Execution Specification Tests',
              status: 'complete'
            },
            witness: {
              id: 'witness',
              name: 'Generates ExecutionWitness',
              description: 'Node can generate the ExecutionWitness data structure',
              status: 'complete'
            },
            compilation: {
              id: 'compilation',
              name: 'Compiles to zkVM target',
              description: 'Can compile to target supported by production-ready zkVMs',
              status: 'complete',
              note: 'Rust is readily supported by zkVMs'
            }
          }
        },
        {
          name: 'Ethrex',
          type: 'execution' as const,
          progress: 4,
          total: 4,
          status: 'SPEC COMPLIANT',
          statusColor: 'green' as const,
          criteria: {
            hardforks: {
              id: 'hardforks',
              name: 'Up to date with current hardforks',
              description: 'Client supports all mainnet hardforks',
              status: 'complete'
            },
            eest: {
              id: 'eest',
              name: 'Passes all EEST tests',
              description: 'Program compilation passes Ethereum Execution Specification Tests',
              status: 'complete'
            },
            witness: {
              id: 'witness',
              name: 'Generates ExecutionWitness',
              description: 'Node can generate the ExecutionWitness data structure',
              status: 'complete'
            },
            compilation: {
              id: 'compilation',
              name: 'Compiles to zkVM target',
              description: 'Can compile to target supported by production-ready zkVMs',
              status: 'complete',
              note: 'Rust is readily supported by zkVMs'
            }
          }
        },
        // Consensus clients
        {
          name: 'Lighthouse',
          type: 'consensus' as const,
          progress: 2,
          total: 3,
          status: 'IN DEVELOPMENT',
          statusColor: 'orange' as const,
          criteria: {
            hardforks: {
              id: 'hardforks',
              name: 'Up to date with current hardforks',
              description: 'Client supports all mainnet hardforks',
              status: 'complete',
              note: 'Up to date with current hardforks'
            },
            executionProofs: {
              id: 'executionProofs',
              name: 'Implemented Optional execution proofs',
              description: 'Support for optional execution proof generation',
              status: 'complete',
              note: 'Implemented Optional execution proofs'
            },
            epbs: {
              id: 'epbs',
              name: 'Implemented ePBS',
              description: 'Support for enshrined Proposer-Builder Separation',
              status: 'in-progress',
              note: 'Implemented ePBS (in progress)'
            }
          }
        },
        {
          name: 'Teku',
          type: 'consensus' as const,
          progress: 1,
          total: 3,
          status: 'IN DEVELOPMENT',
          statusColor: 'orange' as const,
          criteria: {
            hardforks: {
              id: 'hardforks',
              name: 'Up to date with current hardforks',
              description: 'Client supports all mainnet hardforks',
              status: 'complete',
              note: 'Up to date with current hardforks'
            },
            executionProofs: {
              id: 'executionProofs',
              name: 'Implemented Optional execution proofs',
              description: 'Support for optional execution proof generation',
              status: 'in-progress',
              note: 'Implemented Optional execution proofs (in progress)'
            },
            epbs: {
              id: 'epbs',
              name: 'Implemented ePBS',
              description: 'Support for enshrined Proposer-Builder Separation',
              status: 'in-progress',
              note: 'Implemented ePBS (in progress)'
            }
          }
        },
        {
          name: 'Prysm',
          type: 'consensus' as const,
          progress: 1,
          total: 3,
          status: 'IN DEVELOPMENT',
          statusColor: 'orange' as const,
          criteria: {
            hardforks: {
              id: 'hardforks',
              name: 'Up to date with current hardforks',
              description: 'Client supports all mainnet hardforks',
              status: 'complete',
              note: 'Up to date with current hardforks'
            },
            executionProofs: {
              id: 'executionProofs',
              name: 'Implemented Optional execution proofs',
              description: 'Support for optional execution proof generation',
              status: 'not-started'
            },
            epbs: {
              id: 'epbs',
              name: 'Implemented ePBS',
              description: 'Support for enshrined Proposer-Builder Separation',
              status: 'in-progress',
              note: 'Implemented ePBS (in progress)'
            }
          }
        },
        {
          name: 'Nimbus',
          type: 'consensus' as const,
          progress: 1,
          total: 3,
          status: 'NOT STARTED',
          statusColor: 'gray' as const,
          criteria: {
            hardforks: {
              id: 'hardforks',
              name: 'Up to date with current hardforks',
              description: 'Client supports all mainnet hardforks',
              status: 'complete',
              note: 'Up to date with current hardforks'
            },
            executionProofs: {
              id: 'executionProofs',
              name: 'Implemented Optional execution proofs',
              description: 'Support for optional execution proof generation',
              status: 'not-started'
            },
            epbs: {
              id: 'epbs',
              name: 'Implemented ePBS',
              description: 'Support for enshrined Proposer-Builder Separation',
              status: 'not-started'
            }
          }
        },
        {
          name: 'Lodestar',
          type: 'consensus' as const,
          progress: 1,
          total: 3,
          status: 'NOT STARTED',
          statusColor: 'gray' as const,
          criteria: {
            hardforks: {
              id: 'hardforks',
              name: 'Up to date with current hardforks',
              description: 'Client supports all mainnet hardforks',
              status: 'complete',
              note: 'Up to date with current hardforks'
            },
            executionProofs: {
              id: 'executionProofs',
              name: 'Implemented Optional execution proofs',
              description: 'Support for optional execution proof generation',
              status: 'not-started'
            },
            epbs: {
              id: 'epbs',
              name: 'Implemented ePBS',
              description: 'Support for enshrined Proposer-Builder Separation',
              status: 'not-started'
            }
          }
        }
      ]
    },
    {
      id: 'economic-security',
      name: 'Economic Incentives & Security',
      description: 'Research milestones, audit status, and economic model development',
      workstream: 3,
      icon: 'shield',
      lastUpdated: '2026-01-17',
      milestones: [
        {
          id: 'prover-market-design',
          name: 'Prover market incentive design',
          description: 'Complete research and specification for prover market economics',
          status: 'not-started'
        }
      ]
    },
    {
      id: 'testing-validation',
      name: 'Testing & Validation',
      description: 'Test coverage, RISC-V compliance, and specification conformance',
      workstream: null,
      icon: 'check-circle',
      lastUpdated: '2026-01-17',
      milestones: [
        {
          id: 'riscv-compliance',
          name: 'RISC-V compliance',
          description: 'Full RISC-V specification compliance',
          status: 'in-progress',
          metric: {
            current: 85,
            target: 100,
            unit: '%'
          }
        }
      ]
    }
  ],
  recentChanges: [
    {
      date: '2026-01-17',
      category: 'client-integration',
      description: 'Initial tracker setup',
      milestoneId: 'geth-readiness'
    }
  ]
};
