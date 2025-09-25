import { ZKEVMData } from "@/lib/types";

export const zkevmData: ZKEVMData[] = [
  {
    name: 'Kakarot ZK-EVM',
    description: 'A Type 2 ZK-EVM written in Cairo, leveraging the Starknet stack.',
    securityTests: true,
    openSource: true,
    supportedClients: [
      { name: 'Geth', color: 'bg-gray-200 text-gray-800' }
    ],
    links: {
      github: 'https://github.com/sayajin-labs/kakarot',
      docs: 'https://docs.kakarot.org/',
    },
  },
  {
    name: 'Taiko ZK-EVM',
    description: 'A decentralized, Ethereum-equivalent ZK-Rollup focused on Type-1 compatibility.',
    securityTests: true,
    openSource: true,
    supportedClients: [
      { name: 'Geth', color: 'bg-gray-200 text-gray-800' },
      { name: 'Nethermind', color: 'bg-yellow-100 text-yellow-800' },
    ],
    links: {
      github: 'https://github.com/taikoxyz/taiko-mono',
      docs: 'https://docs.taiko.xyz/',
    },
  },
  {
    name: 'Polygon zkEVM',
    description: 'An open-source ZK-Rollup providing EVM equivalence for a seamless developer experience.',
    securityTests: true,
    openSource: true,
    supportedClients: [
      { name: 'Geth', color: 'bg-gray-200 text-gray-800' }
    ],
    links: {
      github: 'https://github.com/0xPolygonHermez/zkevm-prover',
      docs: 'https://docs.polygon.technology/docs/zkEVM/',
    },
  },
  {
    name: 'Scroll',
    description: 'A native zkEVM Layer 2 solution for Ethereum, designed for scalability and security.',
    securityTests: true,
    openSource: true,
    supportedClients: [
      { name: 'Geth', color: 'bg-gray-200 text-gray-800' },
    ],
    links: {
      github: 'https://github.com/scroll-tech',
      docs: 'https://docs.scroll.io/',
    },
  },
  {
    name: 'zkSync Era',
    description: 'A Type 4 ZK-EVM that compiles Solidity to zkSNARK circuits for maximum security.',
    securityTests: true,
    openSource: true,
    supportedClients: [
      { name: 'Geth', color: 'bg-gray-200 text-gray-800' }
    ],
    links: {
      github: 'https://github.com/matter-labs/zksync-era',
      docs: 'https://docs.zksync.io/',
    },
  },
  {
    name: 'Linea',
    description: 'A Type 2 ZK-EVM by ConsenSys, providing full EVM equivalence with zero-knowledge proofs.',
    securityTests: true,
    openSource: true,
    supportedClients: [
      { name: 'Geth', color: 'bg-gray-200 text-gray-800' }
    ],
    links: {
      github: 'https://github.com/Consensys/linea',
      docs: 'https://docs.linea.build/',
    },
  },
];


