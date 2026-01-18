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
      ],
      benchmarks: [
        // SP1 performance data
        { date: '2026-01-15', implementation: 'SP1', proofTime: 14.2, hardware: 'AWS c6i.8xlarge' },
        { date: '2026-01-10', implementation: 'SP1', proofTime: 15.8, hardware: 'AWS c6i.8xlarge' },
        { date: '2026-01-05', implementation: 'SP1', proofTime: 17.1, hardware: 'AWS c6i.8xlarge' },
        { date: '2025-12-30', implementation: 'SP1', proofTime: 18.5, hardware: 'AWS c6i.8xlarge' },
        { date: '2025-12-25', implementation: 'SP1', proofTime: 19.2, hardware: 'AWS c6i.8xlarge' },

        // RISC Zero performance data
        { date: '2026-01-15', implementation: 'RISC Zero', proofTime: 16.5, hardware: 'AWS c6i.8xlarge' },
        { date: '2026-01-10', implementation: 'RISC Zero', proofTime: 17.9, hardware: 'AWS c6i.8xlarge' },
        { date: '2026-01-05', implementation: 'RISC Zero', proofTime: 19.2, hardware: 'AWS c6i.8xlarge' },
        { date: '2025-12-30', implementation: 'RISC Zero', proofTime: 20.8, hardware: 'AWS c6i.8xlarge' },
        { date: '2025-12-25', implementation: 'RISC Zero', proofTime: 21.5, hardware: 'AWS c6i.8xlarge' },

        // Jolt performance data
        { date: '2026-01-15', implementation: 'Jolt', proofTime: 22.3, hardware: 'AWS c6i.8xlarge' },
        { date: '2026-01-10', implementation: 'Jolt', proofTime: 23.1, hardware: 'AWS c6i.8xlarge' },
        { date: '2026-01-05', implementation: 'Jolt', proofTime: 24.5, hardware: 'AWS c6i.8xlarge' },
        { date: '2025-12-30', implementation: 'Jolt', proofTime: 25.8, hardware: 'AWS c6i.8xlarge' },
        { date: '2025-12-25', implementation: 'Jolt', proofTime: 27.2, hardware: 'AWS c6i.8xlarge' },
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
          status: 'in-progress'
        },
        {
          id: 'security-audit',
          name: 'Initial security audit',
          description: 'Complete first comprehensive security audit of zkEVM integration',
          status: 'in-progress'
        }
      ],
      audits: [
        {
          id: 'audit-001',
          name: 'zkEVM Protocol Security Audit',
          organization: 'Trail of Bits',
          status: 'completed',
          startDate: '2025-11-01',
          completionDate: '2025-12-15',
          reportUrl: 'https://github.com/ethereum/zkvm-audits/audit-001',
          scope: 'Core zkEVM protocol integration, proof verification logic',
          findings: {
            critical: 0,
            high: 2,
            medium: 5,
            low: 8
          }
        },
        {
          id: 'audit-002',
          name: 'Prover Market Economics Review',
          organization: 'Economic Security Research',
          status: 'in-progress',
          startDate: '2026-01-05',
          scope: 'Prover incentive mechanisms, censorship resistance analysis'
        },
        {
          id: 'audit-003',
          name: 'Client Integration Security',
          organization: 'OpenZeppelin',
          status: 'planned',
          scope: 'Geth and Reth zkVM integration security review'
        }
      ],
      researchPapers: [
        {
          id: 'paper-001',
          title: 'Economic Incentives in zkEVM Prover Markets',
          authors: ['Research Team'],
          date: '2025-12-01',
          url: 'https://ethresear.ch/zkvm-economics',
          summary: 'Analysis of prover market dynamics and incentive alignment for zkEVM L1 integration'
        },
        {
          id: 'paper-002',
          title: 'Censorship Resistance in Proving Systems',
          authors: ['Security Research Group'],
          date: '2025-11-15',
          url: 'https://ethresear.ch/zkvm-censorship',
          summary: 'Mechanisms for ensuring censorship resistance in decentralized proving markets'
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
      ],
      zkvmImplementations: [
        {
          name: 'SP1',
          description: 'A performant, open-source zero-knowledge virtual machine (zkVM) that verifies the execution of arbitrary Rust (or any LLVM-compiled language) programs',
          architecture: 'RISC-V',
          testResults: {
            passed: 892,
            total: 1024,
            percentage: 87.1
          },
          status: 'Production Ready',
          securityTests: true,
          openSource: true,
          supportedClients: [
            { name: 'Reth', color: 'green', status: 'Full support' },
            { name: 'Geth', color: 'orange', status: 'Experimental' }
          ],
          links: {
            github: 'https://github.com/succinctlabs/sp1',
            docs: 'https://docs.succinct.xyz/sp1'
          }
        },
        {
          name: 'RISC Zero',
          description: 'General-purpose zero-knowledge virtual machine that lets you prove correct execution of arbitrary code',
          architecture: 'RISC-V',
          testResults: {
            passed: 845,
            total: 1024,
            percentage: 82.5
          },
          status: 'Production Ready',
          securityTests: true,
          openSource: true,
          supportedClients: [
            { name: 'Reth', color: 'green', status: 'Full support' },
            { name: 'Ethrex', color: 'green', status: 'Full support' }
          ],
          links: {
            github: 'https://github.com/risc0/risc0',
            docs: 'https://dev.risczero.com'
          }
        },
        {
          name: 'Jolt',
          description: 'zkVM designed for simplicity and auditability, using lookup-based proof systems',
          architecture: 'RISC-V',
          testResults: {
            passed: 723,
            total: 1024,
            percentage: 70.6
          },
          status: 'In Development',
          securityTests: false,
          openSource: true,
          supportedClients: [
            { name: 'Reth', color: 'orange', status: 'Experimental' }
          ],
          links: {
            github: 'https://github.com/a16z/jolt',
            docs: 'https://jolt.a16zcrypto.com'
          }
        },
        {
          name: 'Valida',
          description: 'STARK-based zkVM optimized for performance and developer experience',
          architecture: 'Custom RISC-like',
          testResults: {
            passed: 612,
            total: 1024,
            percentage: 59.8
          },
          status: 'In Development',
          securityTests: false,
          openSource: true,
          supportedClients: [
            { name: 'Reth', color: 'orange', status: 'Experimental' }
          ],
          links: {
            github: 'https://github.com/valida-xyz/valida',
            docs: 'https://valida.org'
          }
        },
        {
          name: 'Powdr',
          description: 'Modular zkVM toolkit for building custom zero-knowledge proving systems',
          architecture: 'Modular (supports RISC-V)',
          testResults: {
            passed: 534,
            total: 1024,
            percentage: 52.1
          },
          status: 'In Development',
          securityTests: false,
          openSource: true,
          supportedClients: [],
          links: {
            github: 'https://github.com/powdr-labs/powdr',
            docs: 'https://docs.powdr.org'
          }
        }
      ]
    }
  ],
  recentChanges: [
    {
      date: '2026-01-18',
      category: 'real-time-proving',
      description: 'Added benchmark visualization with performance trends',
      milestoneId: 'sub-15s-proving'
    },
    {
      date: '2026-01-18',
      category: 'economic-security',
      description: 'Added audit tracking and research publications',
      milestoneId: 'formal-verification'
    },
    {
      date: '2026-01-18',
      category: 'client-integration',
      description: 'Improved mobile responsiveness for client cards',
      milestoneId: 'geth-readiness'
    },
    {
      date: '2026-01-17',
      category: 'testing-validation',
      description: 'Added zkVM comparison table with 5 implementations',
      milestoneId: 'riscv-compliance'
    },
    {
      date: '2026-01-17',
      category: 'client-integration',
      description: 'Added detailed tracking for 10 Ethereum clients',
      milestoneId: 'geth-readiness'
    },
    {
      date: '2026-01-17',
      category: 'client-integration',
      description: 'Reth achieves spec compliance (4/4 criteria)',
      milestoneId: 'reth-readiness'
    },
    {
      date: '2026-01-17',
      category: 'real-time-proving',
      description: 'Added benchmark visualization placeholders',
      milestoneId: 'sub-15s-proving'
    },
    {
      date: '2026-01-17',
      category: 'economic-security',
      description: 'Added audit and research tracking section',
      milestoneId: 'prover-market-design'
    }
  ]
};
