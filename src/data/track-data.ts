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
      name: 'Benchmarks',
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
        },
        {
          id: 'hardware-acceleration',
          name: 'Hardware acceleration deployed',
          description: 'GPU-optimized proving infrastructure deployed and operational',
          status: 'in-progress'
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
      ],
      opcodeRepricings: [
        // Storage Operations (High Impact)
        {
          opcode: 'SLOAD',
          description: 'Load word from storage',
          category: 'storage' as const,
          currentGas: 2100,
          newGas: 21000,
          multiplier: 10,
          reason: 'Reading state requires merkle proofs'
        },
        {
          opcode: 'SSTORE',
          description: 'Save word to storage',
          category: 'storage' as const,
          currentGas: 20000,
          newGas: 100000,
          multiplier: 5,
          reason: 'Writing state plus proof updates'
        },
        {
          opcode: 'TLOAD',
          description: 'Load word from transient storage',
          category: 'storage' as const,
          currentGas: 100,
          newGas: 500,
          multiplier: 5,
          reason: 'Transient storage reads'
        },
        {
          opcode: 'TSTORE',
          description: 'Save word to transient storage',
          category: 'storage' as const,
          currentGas: 100,
          newGas: 500,
          multiplier: 5,
          reason: 'Transient storage writes'
        },

        // Crypto & Precompiles (Very High Impact)
        {
          opcode: 'KECCAK256',
          description: 'Compute Keccak-256 hash',
          category: 'crypto' as const,
          currentGas: 30,
          newGas: 300,
          multiplier: 10,
          reason: 'Hash proving overhead'
        },
        {
          opcode: 'SHA256',
          description: 'Compute SHA-256 hash',
          category: 'crypto' as const,
          currentGas: 60,
          newGas: 600,
          multiplier: 10,
          reason: 'Precompile proving'
        },
        {
          opcode: 'ECRECOVER',
          description: 'Recover ECDSA signature',
          category: 'crypto' as const,
          currentGas: 3000,
          newGas: 30000,
          multiplier: 10,
          reason: 'Elliptic curve operations'
        },
        {
          opcode: 'MODEXP',
          description: 'Modular exponentiation',
          category: 'crypto' as const,
          currentGas: 200,
          newGas: 2000,
          multiplier: 10,
          reason: 'Complex modular arithmetic'
        },
        {
          opcode: 'BN256ADD',
          description: 'BN256 elliptic curve addition',
          category: 'crypto' as const,
          currentGas: 150,
          newGas: 1500,
          multiplier: 10,
          reason: 'BN256 addition proving'
        },
        {
          opcode: 'BN256MUL',
          description: 'BN256 elliptic curve multiplication',
          category: 'crypto' as const,
          currentGas: 6000,
          newGas: 60000,
          multiplier: 10,
          reason: 'BN256 multiplication proving'
        },
        {
          opcode: 'BN256PAIRING',
          description: 'BN256 pairing check',
          category: 'crypto' as const,
          currentGas: 34000,
          newGas: 510000,
          multiplier: 15,
          reason: 'Pairing check complexity'
        },

        // Call Operations (Medium Impact)
        {
          opcode: 'CALL',
          description: 'Message call into account',
          category: 'calls' as const,
          currentGas: 700,
          newGas: 3500,
          multiplier: 5,
          reason: 'External call overhead'
        },
        {
          opcode: 'DELEGATECALL',
          description: 'Message call with alternative account code',
          category: 'calls' as const,
          currentGas: 700,
          newGas: 3500,
          multiplier: 5,
          reason: 'Delegated execution proving'
        },
        {
          opcode: 'STATICCALL',
          description: 'Static message call',
          category: 'calls' as const,
          currentGas: 700,
          newGas: 3500,
          multiplier: 5,
          reason: 'Read-only call proving'
        },
        {
          opcode: 'CREATE',
          description: 'Create new contract',
          category: 'calls' as const,
          currentGas: 32000,
          newGas: 64000,
          multiplier: 2,
          reason: 'Contract creation complexity'
        },
        {
          opcode: 'CREATE2',
          description: 'Create new contract with deterministic address',
          category: 'calls' as const,
          currentGas: 32000,
          newGas: 64000,
          multiplier: 2,
          reason: 'Deterministic creation proving'
        },

        // Memory Operations (Low-Medium Impact)
        {
          opcode: 'MLOAD',
          description: 'Load word from memory',
          category: 'memory' as const,
          currentGas: 3,
          newGas: 9,
          multiplier: 3,
          reason: 'Memory reads'
        },
        {
          opcode: 'MSTORE',
          description: 'Save word to memory',
          category: 'memory' as const,
          currentGas: 3,
          newGas: 9,
          multiplier: 3,
          reason: 'Memory writes'
        },
        {
          opcode: 'CALLDATACOPY',
          description: 'Copy input data to memory',
          category: 'memory' as const,
          currentGas: 3,
          newGas: 9,
          multiplier: 3,
          reason: 'Calldata copy proving'
        },
        {
          opcode: 'CODECOPY',
          description: 'Copy code to memory',
          category: 'memory' as const,
          currentGas: 3,
          newGas: 9,
          multiplier: 3,
          reason: 'Code copy proving'
        },

        // Computation (Medium Impact)
        {
          opcode: 'EXP',
          description: 'Exponential operation',
          category: 'computation' as const,
          currentGas: 10,
          newGas: 100,
          multiplier: 10,
          reason: 'Exponentiation complexity'
        },
        {
          opcode: 'DIV',
          description: 'Integer division',
          category: 'computation' as const,
          currentGas: 5,
          newGas: 15,
          multiplier: 3,
          reason: 'Division operations'
        },
        {
          opcode: 'MOD',
          description: 'Modulo operation',
          category: 'computation' as const,
          currentGas: 5,
          newGas: 15,
          multiplier: 3,
          reason: 'Modulo operations'
        },
        {
          opcode: 'ADDMOD',
          description: 'Modular addition',
          category: 'computation' as const,
          currentGas: 8,
          newGas: 24,
          multiplier: 3,
          reason: 'Modular addition proving'
        },
        {
          opcode: 'MULMOD',
          description: 'Modular multiplication',
          category: 'computation' as const,
          currentGas: 8,
          newGas: 24,
          multiplier: 3,
          reason: 'Modular multiplication proving'
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
  roadmap: [
    {
      id: 'production-client-integration',
      title: 'Production-Ready Client Integration',
      description: 'Achieve full production readiness for Reth and Geth execution clients with witness generation support',
      category: 'client-integration',
      priority: 'critical' as const,
      status: 'in-progress' as const,
      targetDate: '2026-Q2',
      dependencies: [],
      relatedClients: ['reth', 'geth']
    },
    {
      id: 'real-time-proving-milestone',
      title: 'Sub-12 Second Block Proving',
      description: 'Optimize zkVM performance to prove Ethereum blocks within the 12-second slot time for real-time validation',
      category: 'real-time-proving',
      priority: 'critical' as const,
      status: 'in-progress' as const,
      targetDate: '2026-Q3',
      dependencies: ['opcode-repricing']
    },
    {
      id: 'sub-15s-proving',
      title: 'Achieve sub-15s block proving',
      description: 'Generate proof for full Ethereum block in under 15 seconds on defined hardware',
      category: 'real-time-proving',
      targetDate: 'Q2 2026',
      priority: 'critical' as const,
      status: 'in-progress' as const,
      milestoneIds: ['sub-15s-proving'],
      applicableType: 'zkvm' as const
    },
    {
      id: 'hardware-acceleration',
      title: 'Hardware acceleration deployed',
      description: 'GPU-optimized proving infrastructure deployed and operational',
      category: 'real-time-proving',
      targetDate: 'Q3 2026',
      priority: 'high' as const,
      status: 'not-started' as const,
      milestoneIds: ['hardware-acceleration'],
      applicableType: 'zkvm' as const
    },
    {
      id: 'comprehensive-security-audits',
      title: 'Complete Security Audit Program',
      description: 'Conduct comprehensive security audits across all zkVM implementations and prover infrastructure',
      category: 'economic-security',
      priority: 'high' as const,
      status: 'in-progress' as const,
      targetDate: '2026-Q2'
    },
    {
      id: 'evm-test-compliance',
      title: '100% EVM Test Suite Compliance',
      description: 'Achieve complete compliance with the Ethereum test suite across all zkVM implementations',
      category: 'testing-validation',
      priority: 'high' as const,
      status: 'in-progress' as const,
      targetDate: '2026-Q3'
    },
    {
      id: 'witness-generation-integration',
      title: 'Universal Witness Generation',
      description: 'Integrate witness generation capabilities in all major Ethereum execution clients (Reth, Geth, Nethermind, Besu)',
      category: 'client-integration',
      priority: 'high' as const,
      status: 'in-progress' as const,
      targetDate: '2026-Q3',
      dependencies: ['production-client-integration'],
      relatedClients: ['reth', 'geth', 'nethermind', 'besu', 'erigon', 'ethrex']
    },
    {
      id: 'opcode-repricing',
      title: 'Opcode Gas Repricing Implementation',
      description: 'Implement and deploy EVM opcode gas repricing to align costs with zero-knowledge proving overhead',
      category: 'real-time-proving',
      priority: 'medium' as const,
      status: 'in-progress' as const,
      targetDate: '2026-Q4'
    },
    {
      id: 'economic-sustainability',
      title: 'Economic Sustainability Model',
      description: 'Establish long-term economic model for prover incentives, validator rewards, and network sustainability',
      category: 'economic-security',
      priority: 'medium' as const,
      status: 'not-started' as const,
      targetDate: '2027-Q1'
    }
  ],
  clients: [
    {
      id: 'reth',
      name: 'Reth',
      slug: 'reth',
      type: 'execution' as const,
      description: 'Modular, high-performance Ethereum execution client written in Rust',
      status: 'production' as const,
      language: 'Rust',
      repository: 'https://github.com/paradigmxyz/reth',
      documentation: 'https://paradigmxyz.github.io/reth',
      team: 'Paradigm',
      license: 'MIT/Apache-2.0',
      milestones: [
        {
          id: 'reth-witness-generation',
          name: 'Witness Generation Support',
          status: 'completed' as const,
          description: 'Implement execution witness generation for zkEVM proving'
        },
        {
          id: 'reth-spec-compliance',
          name: 'Full Spec Compliance',
          status: 'completed' as const,
          description: 'Achieve 100% Ethereum specification compliance'
        },
        {
          id: 'reth-production-ready',
          name: 'Production Readiness',
          status: 'in-progress' as const,
          description: 'Stabilize for mainnet deployment with zkEVM support'
        },
        {
          id: 'reth-performance-optimization',
          name: 'Performance Optimization',
          status: 'in-progress' as const,
          description: 'Optimize witness generation performance for real-time proving'
        }
      ]
    },
    {
      id: 'geth',
      name: 'Geth',
      slug: 'geth',
      type: 'execution' as const,
      description: 'Official Go implementation of the Ethereum protocol',
      status: 'production' as const,
      language: 'Go',
      repository: 'https://github.com/ethereum/go-ethereum',
      documentation: 'https://geth.ethereum.org',
      team: 'Ethereum Foundation',
      license: 'LGPL-3.0',
      milestones: [
        {
          id: 'geth-witness-api',
          name: 'Witness Generation API',
          status: 'in-progress' as const,
          description: 'Add API endpoints for execution witness generation'
        },
        {
          id: 'geth-state-access',
          name: 'State Access Optimization',
          status: 'in-progress' as const,
          description: 'Optimize state access patterns for efficient witness generation'
        },
        {
          id: 'geth-zkvm-integration',
          name: 'zkVM Integration',
          status: 'not-started' as const,
          description: 'Integrate with zkVM provers for block validation'
        }
      ]
    },
    {
      id: 'nethermind',
      name: 'Nethermind',
      slug: 'nethermind',
      type: 'execution' as const,
      description: 'High-performance .NET Ethereum client',
      status: 'production' as const,
      language: 'C#',
      repository: 'https://github.com/NethermindEth/nethermind',
      documentation: 'https://docs.nethermind.io',
      team: 'Nethermind',
      license: 'LGPL-3.0',
      milestones: [
        {
          id: 'nethermind-witness-support',
          name: 'Witness Generation Support',
          status: 'in-progress' as const,
          description: 'Implement execution witness generation capabilities'
        },
        {
          id: 'nethermind-performance',
          name: 'Performance Benchmarking',
          status: 'not-started' as const,
          description: 'Benchmark witness generation performance'
        }
      ]
    },
    {
      id: 'besu',
      name: 'Besu',
      slug: 'besu',
      type: 'execution' as const,
      description: 'Enterprise-grade Java Ethereum client',
      status: 'production' as const,
      language: 'Java',
      repository: 'https://github.com/hyperledger/besu',
      documentation: 'https://besu.hyperledger.org',
      team: 'Hyperledger',
      license: 'Apache-2.0',
      milestones: [
        {
          id: 'besu-witness-exploration',
          name: 'Witness Generation Exploration',
          status: 'not-started' as const,
          description: 'Explore witness generation implementation strategies'
        }
      ]
    },
    {
      id: 'erigon',
      name: 'Erigon',
      slug: 'erigon',
      type: 'execution' as const,
      description: 'Efficiency-focused Ethereum client',
      status: 'production' as const,
      language: 'Go',
      repository: 'https://github.com/ledgerwatch/erigon',
      documentation: 'https://github.com/ledgerwatch/erigon#erigon',
      team: 'Erigon',
      license: 'LGPL-3.0',
      milestones: [
        {
          id: 'erigon-witness-research',
          name: 'Witness Generation Research',
          status: 'not-started' as const,
          description: 'Research witness generation integration approach'
        }
      ]
    },
    {
      id: 'ethrex',
      name: 'Ethrex',
      slug: 'ethrex',
      type: 'execution' as const,
      description: 'Rust-based Ethereum execution client focused on simplicity',
      status: 'in-development' as const,
      language: 'Rust',
      repository: 'https://github.com/lambdaclass/ethrex',
      documentation: 'https://github.com/lambdaclass/ethrex#readme',
      team: 'Lambda Class',
      license: 'MIT',
      milestones: [
        {
          id: 'ethrex-core-development',
          name: 'Core Development',
          status: 'in-progress' as const,
          description: 'Develop core execution engine functionality'
        },
        {
          id: 'ethrex-witness-design',
          name: 'Witness Generation Design',
          status: 'not-started' as const,
          description: 'Design witness generation architecture'
        }
      ]
    }
  ],
  zkvms: [
    {
      id: 'sp1',
      name: 'SP1',
      description: 'High-performance zkVM optimized for Ethereum block proving',
      provingSystem: 'STARK',
      language: 'Rust',
      repository: 'https://github.com/succinctlabs/sp1',
      website: 'https://succinctlabs.github.io/sp1/',
      maintainer: 'Succinct',
      milestoneStatuses: {
        'sub-15s-proving': 'complete',
        'hardware-acceleration': 'complete'
      },
      clientSupport: {
        'reth': 'complete',
        'ethrex': 'complete',
        'geth': 'in-progress',
        'nethermind': 'not-started'
      }
    },
    {
      id: 'risc-zero',
      name: 'RISC Zero',
      description: 'General-purpose zkVM based on the RISC-V instruction set',
      provingSystem: 'STARK',
      language: 'Rust',
      repository: 'https://github.com/risc0/risc0',
      website: 'https://risczero.com',
      maintainer: 'RISC Zero',
      milestoneStatuses: {
        'sub-15s-proving': 'complete',
        'hardware-acceleration': 'in-progress'
      },
      clientSupport: {
        'reth': 'complete',
        'ethrex': 'in-progress',
        'geth': 'in-progress',
        'nethermind': 'not-started'
      }
    },
    {
      id: 'jolt',
      name: 'Jolt',
      description: 'zkVM using lookup arguments for efficient proving',
      provingSystem: 'Lookup',
      language: 'Rust',
      repository: 'https://github.com/a16z/jolt',
      maintainer: 'a16z crypto',
      milestoneStatuses: {
        'sub-15s-proving': 'in-progress',
        'hardware-acceleration': 'not-started'
      },
      clientSupport: {
        'reth': 'in-progress',
        'ethrex': 'not-started',
        'geth': 'not-started',
        'nethermind': 'not-started'
      }
    }
  ]
};
