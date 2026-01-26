// ISA compliance data from https://eth-act.github.io/zkevm-test-monitor/
// Data should be updated periodically from the test monitor

export interface ZKVMSecurityEntry {
  name: string;
  architecture: string;
  isaCompliance: number; // percentage, 0 if no RISC-V compliance testing
  license?: string;
  links: {
    github: string;
    docs: string;
  };
  supportedClients: Array<{
    name: string;
    status: string;
  }>;
}

export const zkvmSecurityData: ZKVMSecurityEntry[] = [
  {
    name: 'Airbender',
    architecture: 'RV32IM',
    isaCompliance: 97.9, // 46/47 tests
    links: {
      github: 'https://github.com/matter-labs/zksync-airbender',
      docs: 'https://docs.zksync.io/zksync-protocol/zksync-airbender/overview',
    },
    supportedClients: [
      { name: 'Reth', status: 'Production Ready' },
      { name: 'Ethrex', status: 'Production Ready' },
    ],
  },
  {
    name: 'Jolt',
    architecture: 'RV64IMAC',
    isaCompliance: 100, // 124/124 tests
    links: {
      github: 'https://github.com/a16z/jolt',
      docs: 'https://jolt.a16zcrypto.com/',
    },
    supportedClients: [],
  },
  {
    name: 'OpenVM',
    architecture: 'RV32IM',
    isaCompliance: 100, // 47/47 tests
    links: {
      github: 'https://github.com/openvm-org/openvm',
      docs: 'https://openvm.dev/',
    },
    supportedClients: [
      { name: 'Reth', status: 'Production Ready' },
      { name: 'Ethrex', status: 'Production Ready' },
    ],
  },
  {
    name: 'Pico',
    architecture: 'RV32IM',
    isaCompliance: 97.9, // 46/47 tests
    links: {
      github: 'https://github.com/brevis-network/pico',
      docs: 'https://docs.brevis.network/',
    },
    supportedClients: [],
  },
  {
    name: 'Powdr',
    architecture: '—',
    isaCompliance: 0, // Not yet in test monitor
    links: {
      github: 'https://github.com/powdr-labs/powdr',
      docs: 'https://docs.powdr.org',
    },
    supportedClients: [],
  },
  {
    name: 'RISC Zero',
    architecture: 'RV32IM',
    isaCompliance: 100, // 47/47 tests (R0VM)
    links: {
      github: 'https://github.com/risc0/risc0',
      docs: 'https://dev.risczero.com/api',
    },
    supportedClients: [
      { name: 'Reth', status: 'Production Ready' },
      { name: 'Ethrex', status: 'Production Ready' },
    ],
  },
  {
    name: 'Valida',
    architecture: '—',
    isaCompliance: 0, // Not yet in test monitor
    links: {
      github: 'https://github.com/valida-xyz/valida',
      docs: 'https://valida.org',
    },
    supportedClients: [],
  },
  {
    name: 'Zisk',
    architecture: 'RV64IMAFDC_Zicsr',
    isaCompliance: 98.2, // 661/673 tests
    links: {
      github: 'https://github.com/0xPolygonHermez/zisk',
      docs: 'https://0xpolygonhermez.github.io/zisk/',
    },
    supportedClients: [
      { name: 'Reth', status: 'Production Ready' },
      { name: 'Ethrex', status: 'Production Ready' },
    ],
  },
];
