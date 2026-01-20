import { TrackData, CommonMilestone } from '@/lib/track-types';

// Common milestones that all execution layer clients must complete
const commonExecutionMilestones: CommonMilestone[] = [
  {
    id: 'witness-generation-api',
    name: 'Witness Generation API',
    description: 'Implement API endpoints for execution witness generation',
    priority: 'critical'
  },
  {
    id: 'state-access-optimization',
    name: 'State Access Optimization',
    description: 'Optimize state access patterns for efficient witness generation',
    priority: 'high'
  },
  {
    id: 'zkvm-integration',
    name: 'zkVM Integration',
    description: 'Integrate with zkVM provers for block validation',
    priority: 'critical'
  },
  {
    id: 'performance-benchmarking',
    name: 'Performance Benchmarking',
    description: 'Benchmark witness generation performance and optimize',
    priority: 'medium'
  }
];

// Common milestones that all consensus layer clients must complete
const commonConsensusMilestones: CommonMilestone[] = [
  {
    id: 'proof-verification',
    name: 'Proof Verification Integration',
    description: 'Integrate zkEVM proof verification into consensus validation',
    priority: 'critical'
  },
  {
    id: 'epbs-support',
    name: 'ePBS Support',
    description: 'Implement enshrined Proposer-Builder Separation',
    priority: 'high'
  },
  {
    id: 'performance-optimization',
    name: 'Performance Optimization',
    description: 'Optimize proof verification for production readiness',
    priority: 'high'
  }
];

// Common milestones that all guest programs must complete
const commonGuestProgramMilestones: CommonMilestone[] = [
  {
    id: 'guest-witness-generation-api',
    name: 'Witness Generation API',
    description: 'Implement API endpoints for execution witness generation in guest program',
    priority: 'critical'
  },
  {
    id: 'guest-state-access-optimization',
    name: 'State Access Optimization',
    description: 'Optimize state access patterns for efficient witness generation in zkVM environment',
    priority: 'high'
  },
  {
    id: 'guest-zkvm-integration',
    name: 'zkVM Integration',
    description: 'Successfully compile and run in target zkVM environment',
    priority: 'critical'
  },
  {
    id: 'guest-performance-benchmarking',
    name: 'Performance Benchmarking',
    description: 'Benchmark guest program performance and optimize for zkVM execution',
    priority: 'medium'
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
      name: 'ZKVM Security',
      description: 'zkVM security testing, compliance validation, and implementation verification',
      workstream: null,
      icon: 'check-circle',
      lastUpdated: '2026-01-19',
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
  commonExecutionMilestones,
  commonConsensusMilestones,
  commonGuestProgramMilestones,
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
      relatedClients: ['reth', 'geth'],
      commonMilestoneIds: ['witness-generation-api', 'state-access-optimization', 'performance-benchmarking'],
      applicableType: 'execution' as const
    },
    {
      id: 'guest-program-zkvm-integration',
      title: 'Guest Program zkVM Integration',
      description: 'Integrate guest programs with zkVM provers for production-ready block validation',
      category: 'client-integration',
      priority: 'critical' as const,
      status: 'in-progress' as const,
      targetDate: '2026-Q2',
      dependencies: ['production-client-integration'],
      relatedGuestPrograms: ['reth-guest', 'geth-guest'],
      commonMilestoneIds: ['guest-zkvm-integration', 'guest-performance-benchmarking'],
      applicableType: 'guest-program' as const
    },
    {
      id: 'real-time-proving-milestone',
      title: 'Sub-12 Second Block Proving',
      description: 'Optimize zkVM performance to prove Ethereum blocks within the 12-second slot time for real-time validation',
      category: 'real-time-proving',
      priority: 'critical' as const,
      status: 'in-progress' as const,
      targetDate: '2026-Q3',
      dependencies: ['opcode-repricing', 'hardware-acceleration', 'guest-program-zkvm-integration']
    },
    {
      id: 'sub-15s-proving',
      title: 'Achieve sub-15s block proving',
      description: 'Generate proof for full Ethereum block in under 15 seconds on defined hardware',
      category: 'real-time-proving',
      targetDate: 'Q2 2026',
      priority: 'critical' as const,
      status: 'in-progress' as const,
      dependencies: ['guest-program-zkvm-integration'],
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
      dependencies: ['sub-15s-proving'],
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
      targetDate: '2026-Q2',
      dependencies: ['production-client-integration', 'guest-program-zkvm-integration']
    },
    {
      id: 'evm-test-compliance',
      title: '100% EVM Test Suite Compliance',
      description: 'Achieve complete compliance with the Ethereum test suite across all zkVM implementations',
      category: 'testing-validation',
      priority: 'high' as const,
      status: 'in-progress' as const,
      targetDate: '2026-Q3',
      dependencies: ['witness-generation-integration', 'universal-guest-program-support']
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
      relatedClients: ['reth', 'geth', 'nethermind', 'besu', 'erigon', 'ethrex'],
      commonMilestoneIds: ['witness-generation-api', 'state-access-optimization'],
      applicableType: 'execution' as const
    },
    {
      id: 'universal-guest-program-support',
      title: 'Universal Guest Program Support',
      description: 'Compile and optimize all major execution clients as guest programs for zkVM proving',
      category: 'client-integration',
      priority: 'high' as const,
      status: 'in-progress' as const,
      targetDate: '2026-Q3',
      dependencies: ['guest-program-zkvm-integration'],
      relatedGuestPrograms: ['reth-guest', 'geth-guest', 'nethermind-guest', 'besu-guest', 'erigon-guest', 'ethrex-guest'],
      commonMilestoneIds: ['guest-witness-generation-api', 'guest-state-access-optimization', 'guest-zkvm-integration'],
      applicableType: 'guest-program' as const
    },
    {
      id: 'opcode-repricing',
      title: 'Opcode Gas Repricing Implementation',
      description: 'Implement and deploy EVM opcode gas repricing to align costs with zero-knowledge proving overhead',
      category: 'real-time-proving',
      priority: 'medium' as const,
      status: 'in-progress' as const,
      targetDate: '2026-Q4',
      dependencies: ['sub-15s-proving']
    },
    {
      id: 'consensus-client-integration',
      title: 'Consensus Client Proof Verification',
      description: 'Integrate zkEVM proof verification into all major consensus layer clients',
      category: 'client-integration',
      priority: 'critical' as const,
      status: 'not-started' as const,
      targetDate: '2026-Q4',
      dependencies: ['real-time-proving-milestone', 'comprehensive-security-audits'],
      relatedClients: ['teku', 'prysm', 'lighthouse', 'lodestar', 'nimbus'],
      commonMilestoneIds: ['proof-verification', 'epbs-support', 'performance-optimization'],
      applicableType: 'consensus' as const
    },
    {
      id: 'economic-sustainability',
      title: 'Economic Sustainability Model',
      description: 'Establish long-term economic model for prover incentives, validator rewards, and network sustainability',
      category: 'economic-security',
      priority: 'medium' as const,
      status: 'not-started' as const,
      targetDate: '2027-Q1',
      dependencies: ['consensus-client-integration', 'evm-test-compliance']
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
      milestoneStatuses: {
        'witness-generation-api': {
          status: 'complete',
          proofs: [{
            url: 'https://github.com/paradigmxyz/reth/pull/8234',
            title: 'Witness Generation API Implementation',
            description: 'Implements execution witness generation API for zkVM integration'
          }]
        },
        'state-access-optimization': {
          status: 'complete',
          proofs: [{
            url: 'https://paradigmxyz.github.io/reth/optimizations.html',
            title: 'State Access Optimization',
            description: 'Optimized state access patterns for efficient witness generation'
          }]
        },
        'zkvm-integration': {
          status: 'complete',
          proofs: [{
            url: 'https://github.com/paradigmxyz/reth/pull/9100',
            title: 'zkVM Integration Support',
            description: 'Successfully integrated with SP1 and RISC Zero zkVMs'
          }]
        },
        'performance-benchmarking': {
          status: 'in-progress'
        }
      }
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
      milestoneStatuses: {
        'witness-generation-api': { status: 'in-progress' },
        'state-access-optimization': { status: 'in-progress' },
        'zkvm-integration': { status: 'not-started' },
        'performance-benchmarking': { status: 'not-started' }
      }
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
      milestoneStatuses: {
        'witness-generation-api': { status: 'in-progress' },
        'state-access-optimization': { status: 'not-started' },
        'zkvm-integration': { status: 'not-started' },
        'performance-benchmarking': { status: 'not-started' }
      }
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
      milestoneStatuses: {
        'witness-generation-api': { status: 'not-started' },
        'state-access-optimization': { status: 'not-started' },
        'zkvm-integration': { status: 'not-started' },
        'performance-benchmarking': { status: 'not-started' }
      }
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
      milestoneStatuses: {
        'witness-generation-api': { status: 'not-started' },
        'state-access-optimization': { status: 'not-started' },
        'zkvm-integration': { status: 'not-started' },
        'performance-benchmarking': { status: 'not-started' }
      }
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
      milestoneStatuses: {
        'witness-generation-api': { status: 'not-started' },
        'state-access-optimization': { status: 'not-started' },
        'zkvm-integration': { status: 'not-started' },
        'performance-benchmarking': { status: 'not-started' }
      }
    },
    // Consensus Layer Clients
    {
      id: 'teku',
      name: 'Teku',
      slug: 'teku',
      type: 'consensus' as const,
      description: 'Enterprise-grade Java consensus client by Consensys',
      status: 'production' as const,
      language: 'Java',
      repository: 'https://github.com/ConsenSys/teku',
      documentation: 'https://docs.teku.consensys.net',
      team: 'Consensys',
      license: 'Apache-2.0',
      milestoneStatuses: {
        'proof-verification': { status: 'not-started' },
        'epbs-support': { status: 'not-started' },
        'performance-optimization': { status: 'not-started' }
      }
    },
    {
      id: 'prysm',
      name: 'Prysm',
      slug: 'prysm',
      type: 'consensus' as const,
      description: 'Go implementation of Ethereum consensus by Prysmatic Labs',
      status: 'production' as const,
      language: 'Go',
      repository: 'https://github.com/prysmaticlabs/prysm',
      documentation: 'https://docs.prylabs.network',
      team: 'Prysmatic Labs',
      license: 'GPL-3.0',
      milestoneStatuses: {
        'proof-verification': { status: 'not-started' },
        'epbs-support': { status: 'not-started' },
        'performance-optimization': { status: 'not-started' }
      }
    },
    {
      id: 'lighthouse',
      name: 'Lighthouse',
      slug: 'lighthouse',
      type: 'consensus' as const,
      description: 'Rust Ethereum consensus client by Sigma Prime',
      status: 'production' as const,
      language: 'Rust',
      repository: 'https://github.com/sigp/lighthouse',
      documentation: 'https://lighthouse-book.sigmaprime.io',
      team: 'Sigma Prime',
      license: 'Apache-2.0',
      milestoneStatuses: {
        'proof-verification': { status: 'not-started' },
        'epbs-support': { status: 'not-started' },
        'performance-optimization': { status: 'not-started' }
      }
    },
    {
      id: 'lodestar',
      name: 'Lodestar',
      slug: 'lodestar',
      type: 'consensus' as const,
      description: 'TypeScript consensus client by ChainSafe',
      status: 'production' as const,
      language: 'TypeScript',
      repository: 'https://github.com/ChainSafe/lodestar',
      documentation: 'https://chainsafe.github.io/lodestar',
      team: 'ChainSafe',
      license: 'LGPL-3.0',
      milestoneStatuses: {
        'proof-verification': { status: 'not-started' },
        'epbs-support': { status: 'not-started' },
        'performance-optimization': { status: 'not-started' }
      }
    },
    {
      id: 'nimbus',
      name: 'Nimbus',
      slug: 'nimbus',
      type: 'consensus' as const,
      description: 'Lightweight Nim consensus client by Status',
      status: 'production' as const,
      language: 'Nim',
      repository: 'https://github.com/status-im/nimbus-eth2',
      documentation: 'https://nimbus.guide',
      team: 'Status',
      license: 'Apache-2.0 / MIT',
      milestoneStatuses: {
        'proof-verification': { status: 'not-started' },
        'epbs-support': { status: 'not-started' },
        'performance-optimization': { status: 'not-started' }
      }
    }
  ],
  guestPrograms: [
    {
      id: 'reth-guest',
      name: 'Reth Guest Program',
      slug: 'reth-guest',
      description: 'Reth execution client compiled as a guest program for zkVM proving',
      status: 'in-development' as const,
      language: 'Rust',
      repository: 'https://github.com/paradigmxyz/reth',
      documentation: 'https://paradigmxyz.github.io/reth',
      team: 'Paradigm',
      license: 'MIT/Apache-2.0',
      basedOnClient: 'reth',
      supportedZKVMs: ['sp1', 'risc-zero'],
      milestoneStatuses: {
        'guest-witness-generation-api': {
          status: 'complete',
          proofs: [{
            url: 'https://github.com/paradigmxyz/reth/pull/8500',
            title: 'Guest Program Witness API',
            description: 'Implemented witness generation for guest program execution'
          }]
        },
        'guest-state-access-optimization': { status: 'in-progress' },
        'guest-zkvm-integration': { status: 'in-progress' },
        'guest-performance-benchmarking': { status: 'not-started' }
      }
    },
    {
      id: 'geth-guest',
      name: 'Geth Guest Program',
      slug: 'geth-guest',
      description: 'Geth execution client compiled as a guest program for zkVM proving',
      status: 'in-development' as const,
      language: 'Go',
      repository: 'https://github.com/ethereum/go-ethereum',
      documentation: 'https://geth.ethereum.org/docs',
      team: 'Ethereum Foundation',
      license: 'LGPL-3.0',
      basedOnClient: 'geth',
      supportedZKVMs: ['sp1'],
      milestoneStatuses: {
        'guest-witness-generation-api': { status: 'in-progress' },
        'guest-state-access-optimization': { status: 'not-started' },
        'guest-zkvm-integration': { status: 'in-progress' },
        'guest-performance-benchmarking': { status: 'not-started' }
      }
    },
    {
      id: 'nethermind-guest',
      name: 'Nethermind Guest Program',
      slug: 'nethermind-guest',
      description: 'Nethermind execution client compiled as a guest program for zkVM proving',
      status: 'planning' as const,
      language: 'C#',
      repository: 'https://github.com/NethermindEth/nethermind',
      documentation: 'https://docs.nethermind.io',
      team: 'Nethermind',
      license: 'LGPL-3.0 / MIT',
      basedOnClient: 'nethermind',
      supportedZKVMs: [],
      milestoneStatuses: {
        'guest-witness-generation-api': { status: 'not-started' },
        'guest-state-access-optimization': { status: 'not-started' },
        'guest-zkvm-integration': { status: 'not-started' },
        'guest-performance-benchmarking': { status: 'not-started' }
      }
    },
    {
      id: 'besu-guest',
      name: 'Besu Guest Program',
      slug: 'besu-guest',
      description: 'Besu execution client compiled as a guest program for zkVM proving',
      status: 'planning' as const,
      language: 'Java',
      repository: 'https://github.com/hyperledger/besu',
      documentation: 'https://besu.hyperledger.org',
      team: 'Hyperledger',
      license: 'Apache-2.0',
      basedOnClient: 'besu',
      supportedZKVMs: [],
      milestoneStatuses: {
        'guest-witness-generation-api': { status: 'not-started' },
        'guest-state-access-optimization': { status: 'not-started' },
        'guest-zkvm-integration': { status: 'not-started' },
        'guest-performance-benchmarking': { status: 'not-started' }
      }
    },
    {
      id: 'erigon-guest',
      name: 'Erigon Guest Program',
      slug: 'erigon-guest',
      description: 'Erigon execution client compiled as a guest program for zkVM proving',
      status: 'planning' as const,
      language: 'Go',
      repository: 'https://github.com/ledgerwatch/erigon',
      documentation: 'https://github.com/ledgerwatch/erigon#erigon',
      team: 'Erigon',
      license: 'LGPL-3.0',
      basedOnClient: 'erigon',
      supportedZKVMs: [],
      milestoneStatuses: {
        'guest-witness-generation-api': { status: 'not-started' },
        'guest-state-access-optimization': { status: 'not-started' },
        'guest-zkvm-integration': { status: 'not-started' },
        'guest-performance-benchmarking': { status: 'not-started' }
      }
    },
    {
      id: 'ethrex-guest',
      name: 'EthRex Guest Program',
      slug: 'ethrex-guest',
      description: 'EthRex execution client compiled as a guest program for zkVM proving',
      status: 'planning' as const,
      language: 'Rust',
      repository: 'https://github.com/lambdaclass/ethrex',
      documentation: 'https://github.com/lambdaclass/ethrex#readme',
      team: 'LambdaClass',
      license: 'Apache-2.0 / MIT',
      basedOnClient: 'ethrex',
      supportedZKVMs: [],
      milestoneStatuses: {
        'guest-witness-generation-api': { status: 'not-started' },
        'guest-state-access-optimization': { status: 'not-started' },
        'guest-zkvm-integration': { status: 'not-started' },
        'guest-performance-benchmarking': { status: 'not-started' }
      }
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
        'sub-15s-proving': {
          status: 'complete',
          proofs: [
            {
              url: 'https://blog.succinct.xyz/sp1-performance-update/',
              title: 'SP1 Performance Update: Sub-15s Proving',
              description: 'Announcement of SP1 achieving sub-15 second proving times for Ethereum blocks'
            }
          ]
        },
        'hardware-acceleration': {
          status: 'complete',
          proofs: [
            {
              url: 'https://github.com/succinctlabs/sp1/releases/tag/v1.0.0-cuda',
              title: 'SP1 CUDA Acceleration Release',
              description: 'Release notes for SP1 hardware acceleration with CUDA support'
            }
          ]
        }
      },
      guestProgramSupport: {
        'reth-guest': {
          status: 'complete',
          proofs: [
            {
              url: 'https://github.com/succinctlabs/reth-guest-sp1',
              title: 'Reth Guest Program for SP1',
              description: 'Production-ready Reth guest program implementation for SP1'
            }
          ]
        },
        'ethrex-guest': {
          status: 'complete',
          proofs: [
            {
              url: 'https://github.com/lambdaclass/ethrex/tree/main/crates/blockchain/sp1',
              title: 'Ethrex SP1 Integration',
              description: 'Native SP1 integration in Ethrex execution client'
            }
          ]
        },
        'geth-guest': { status: 'in-progress' },
        'nethermind-guest': { status: 'not-started' }
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
        'sub-15s-proving': {
          status: 'complete',
          proofs: [
            {
              url: 'https://www.risczero.com/blog/benchmarks-2024',
              title: 'RISC Zero Proving Performance Benchmarks',
              description: 'Detailed benchmarks showing sub-15 second proving times for Ethereum blocks'
            }
          ]
        },
        'hardware-acceleration': { status: 'in-progress' }
      },
      guestProgramSupport: {
        'reth-guest': {
          status: 'complete',
          proofs: [
            {
              url: 'https://github.com/risc0/risc0-ethereum/tree/main/steel',
              title: 'Steel: Reth Integration for RISC Zero',
              description: 'Production Steel library providing Reth guest program support for RISC Zero'
            }
          ]
        },
        'ethrex-guest': { status: 'in-progress' },
        'geth-guest': { status: 'in-progress' },
        'nethermind-guest': { status: 'not-started' }
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
        'sub-15s-proving': { status: 'in-progress' },
        'hardware-acceleration': { status: 'not-started' }
      },
      guestProgramSupport: {
        'reth-guest': { status: 'in-progress' },
        'ethrex-guest': { status: 'not-started' },
        'geth-guest': { status: 'not-started' },
        'nethermind-guest': { status: 'not-started' }
      }
    }
  ]
};
