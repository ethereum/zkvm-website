export interface Milestone {
  id: string;
  name: string;
  description: string;
  status: 'not-started' | 'in-progress' | 'achieved';
  metric?: {
    current: number;
    target: number;
    unit: string;
  };
  verification?: {
    date: string;
    link?: string;
    note?: string;
  };
}

export interface ClientCriterion {
  id: string;
  name: string;
  description: string;
  status: 'not-started' | 'in-progress' | 'under-review' | 'complete';
  note?: string;
  disputeDetails?: string;
}

export interface EthereumClient {
  name: string;
  type: 'execution' | 'consensus';
  progress: number;
  total: number;
  status: string;
  statusColor: 'green' | 'orange' | 'blue' | 'gray';
  criteria: Record<string, ClientCriterion>;
  notes?: string[];
}

export interface ZKVMImplementation {
  name: string;
  description: string;
  architecture: string;
  testResults: {
    passed: number;
    total: number;
    percentage: number;
  };
  status: 'Not Started' | 'Planning' | 'In Development' | 'Testing' | 'Production Ready' | 'Deprecated';
  securityTests: boolean;
  openSource: boolean;
  supportedClients: Array<{
    name: string;
    color: string;
    status: string;
  }>;
  links: {
    github: string;
    docs: string;
  };
}

export interface BenchmarkData {
  date: string;
  implementation: string;
  proofTime: number; // in seconds
  blockNumber?: number;
  hardware?: string;
}

export interface CategoryData {
  id: string;
  name: string;
  description: string;
  workstream: number | null; // 1, 2, 3, or null for testing-validation
  icon: string;
  lastUpdated: string;
  milestones: Milestone[];
  // New fields for Phase 2
  clients?: EthereumClient[];
  zkvmImplementations?: ZKVMImplementation[];
  // New fields for Phase 4
  benchmarks?: BenchmarkData[];
}

export interface RecentChange {
  date: string;
  category: string;
  description: string;
  milestoneId?: string;
}

export interface TrackData {
  categories: CategoryData[];
  recentChanges: RecentChange[];
}
