import { ZKEVMData } from "@/lib/types";

export const zkevmData: ZKEVMData[] = [
  {
    name: 'Airbender',
    description: 'A RISC-V based zero-knowledge virtual machine designed for efficient proof generation.',
    architecture: 'rv32im',
    testResults: { passed: 46, total: 47, percentage: 97.9 },
    status: 'Testing',
    securityTests: false,
    openSource: true,
    supportedClients: [
      { name: 'Reth', color: 'bg-green-100 text-green-800', status: 'Production Ready' },
      { name: 'Ethrex', color: 'bg-green-100 text-green-800', status: 'Production Ready' }
    ],
    links: {
      github: 'https://github.com/matter-labs/zksync-airbender',
      docs: 'https://docs.zksync.io/zksync-protocol/zksync-airbender/overview',
    },
  },
  {
    name: 'Jolt',
    description: 'A high-performance RISC-V ZKVM optimized for speed and developer experience.',
    architecture: 'rv64imac',
    testResults: { passed: 47, total: 47, percentage: 100 },
    status: 'In Development',
    securityTests: true,
    openSource: true,
    supportedClients: [],
    links: {
      github: 'https://github.com/a16z/jolt',
      docs: 'https://jolt.a16zcrypto.com/',
    },
  },
  {
    name: 'OpenVM',
    description: 'An open-source RISC-V ZKVM implementation focused on modularity and extensibility.',
    architecture: 'rv32im',
    testResults: { passed: 47, total: 47, percentage: 100 },
    status: 'Testing',
    securityTests: true,
    openSource: true,
    supportedClients: [
      { name: 'Reth', color: 'bg-green-100 text-green-800', status: 'Production Ready' },
      { name: 'Ethrex', color: 'bg-green-100 text-green-800', status: 'Production Ready' }
    ],
    links: {
      github: 'https://github.com/openvm-org/openvm',
      docs: 'https://openvm.dev/',
    },
  },
  {
    name: 'RISC0',
    description: 'A production-ready RISC-V ZKVM with comprehensive tooling and developer ecosystem.',
    architecture: 'rv32im',
    testResults: { passed: 47, total: 47, percentage: 100 },
    status: 'Testing',
    securityTests: true,
    openSource: true,
    supportedClients: [
      { name: 'Reth', color: 'bg-green-100 text-green-800', status: 'Production Ready' },
      { name: 'Ethrex', color: 'bg-green-100 text-green-800', status: 'Production Ready' }
    ],
    links: {
      github: 'https://github.com/risc0/risc0',
      docs: 'https://dev.risczero.com/api',
    },
  },
  {
    name: 'Zisk',
    description: 'A 64-bit RISC-V ZKVM with atomic operations support for advanced smart contract functionality.',
    architecture: 'rv64ima',
    testResults: { passed: 82, total: 82, percentage: 100 },
    status: 'Testing',
    securityTests: true,
    openSource: true,
    supportedClients: [
      { name: 'Reth', color: 'bg-green-100 text-green-800', status: 'Production Ready' },
      { name: 'Ethrex', color: 'bg-green-100 text-green-800', status: 'Production Ready' }
    ],
    links: {
      github: 'https://github.com/0xPolygonHermez/zisk',
      docs: 'https://0xpolygonhermez.github.io/zisk/',
    },
  },
];


