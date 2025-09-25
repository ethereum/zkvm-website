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
      { name: 'Geth', color: 'bg-gray-200 text-gray-800', status: 'Testing' }
    ],
    links: {
      github: 'https://github.com/airbender-zkvm/airbender',
      docs: 'https://docs.airbender.zkvm.dev/',
    },
  },
  {
    name: 'Jolt',
    description: 'A high-performance RISC-V ZKVM optimized for speed and developer experience.',
    architecture: 'rv32im',
    testResults: { passed: 47, total: 47, percentage: 100 },
    status: 'Production Ready',
    securityTests: true,
    openSource: true,
    supportedClients: [
      { name: 'Geth', color: 'bg-gray-200 text-gray-800', status: 'Production Ready' },
      { name: 'Nethermind', color: 'bg-yellow-100 text-yellow-800', status: 'Testing' }
    ],
    links: {
      github: 'https://github.com/jolt-zkvm/jolt',
      docs: 'https://docs.jolt.zkvm.dev/',
    },
  },
  {
    name: 'OpenVM',
    description: 'An open-source RISC-V ZKVM implementation focused on modularity and extensibility.',
    architecture: 'rv32im',
    testResults: { passed: 47, total: 47, percentage: 100 },
    status: 'Production Ready',
    securityTests: true,
    openSource: true,
    supportedClients: [
      { name: 'Geth', color: 'bg-gray-200 text-gray-800', status: 'Production Ready' }
    ],
    links: {
      github: 'https://github.com/openvm/openvm',
      docs: 'https://docs.openvm.dev/',
    },
  },
  {
    name: 'Pico',
    description: 'A lightweight RISC-V ZKVM designed for minimal resource consumption and fast execution.',
    architecture: 'rv32im',
    testResults: { passed: 46, total: 47, percentage: 97.9 },
    status: 'Testing',
    securityTests: false,
    openSource: true,
    supportedClients: [
      { name: 'Geth', color: 'bg-gray-200 text-gray-800', status: 'Testing' }
    ],
    links: {
      github: 'https://github.com/pico-zkvm/pico',
      docs: 'https://docs.pico.zkvm.dev/',
    },
  },
  {
    name: 'RISC0',
    description: 'A production-ready RISC-V ZKVM with comprehensive tooling and developer ecosystem.',
    architecture: 'rv32im',
    testResults: { passed: 47, total: 47, percentage: 100 },
    status: 'Production Ready',
    securityTests: true,
    openSource: true,
    supportedClients: [
      { name: 'Geth', color: 'bg-gray-200 text-gray-800', status: 'Production Ready' }
    ],
    links: {
      github: 'https://github.com/risc0/risc0',
      docs: 'https://docs.risc0.com/',
    },
  },
  {
    name: 'SP1',
    description: 'A RISC-V ZKVM implementation by Succinct Labs, optimized for high-throughput applications.',
    architecture: 'rv32im',
    testResults: { passed: 46, total: 47, percentage: 97.9 },
    status: 'Testing',
    securityTests: false,
    openSource: true,
    supportedClients: [
      { name: 'Geth', color: 'bg-gray-200 text-gray-800', status: 'Testing' }
    ],
    links: {
      github: 'https://github.com/succinctlabs/sp1',
      docs: 'https://docs.sp1.dev/',
    },
  },
  {
    name: 'Zisk',
    description: 'A 64-bit RISC-V ZKVM with atomic operations support for advanced smart contract functionality.',
    architecture: 'rv64ima',
    testResults: { passed: 82, total: 82, percentage: 100 },
    status: 'Production Ready',
    securityTests: true,
    openSource: true,
    supportedClients: [
      { name: 'Geth', color: 'bg-gray-200 text-gray-800', status: 'Production Ready' },
      { name: 'Nethermind', color: 'bg-yellow-100 text-yellow-800', status: 'Testing' }
    ],
    links: {
      github: 'https://github.com/zisk-zkvm/zisk',
      docs: 'https://docs.zisk.dev/',
    },
  },
];


