import { TrackData } from '@/lib/track-types';

export const trackData: TrackData = {
  categories: [
    {
      id: 'real-time-proving',
      name: 'Real-Time Proving',
      description: 'Prover performance, benchmarks, and hardware acceleration for sub-12s proof generation',
      workstream: 1,
      icon: 'zap', // Will use lucide-react icons
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
