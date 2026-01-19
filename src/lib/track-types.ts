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

export interface AuditEntry {
  id: string;
  name: string;
  organization: string;
  status: 'planned' | 'in-progress' | 'completed';
  startDate?: string;
  completionDate?: string;
  reportUrl?: string;
  scope: string;
  findings?: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
}

export interface ResearchPaper {
  id: string;
  title: string;
  authors: string[];
  date: string;
  url: string;
  summary: string;
}

export interface GraphNode {
  id: string;
  label: string;
  type: 'client' | 'milestone' | 'integration-point';
  status: 'complete' | 'in-progress' | 'not-started' | 'blocked';
  x: number; // Position for simple layout (0-100 as percentage)
  y: number; // Position for simple layout (0-100 as percentage)
  description?: string;
}

export interface GraphEdge {
  from: string; // Node id
  to: string; // Node id
  type: 'depends-on' | 'enables' | 'blocks';
  label?: string;
}

export interface DependencyGraph {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface OpcodeRepricing {
  opcode: string;
  description: string;
  category: 'storage' | 'crypto' | 'calls' | 'memory' | 'computation';
  currentGas: number;
  newGas: number;
  multiplier: number;
  reason?: string;
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
  audits?: AuditEntry[];
  researchPapers?: ResearchPaper[];
  // Dependency graph visualization
  dependencyGraph?: DependencyGraph;
  // Opcode repricing data
  opcodeRepricings?: OpcodeRepricing[];
}

export interface Client {
  id: string;
  name: string;
  slug: string;
  type: 'execution' | 'consensus';
  description: string;
  status: 'production' | 'in-development' | 'planning';
  language: string;
  repository: string;
  documentation?: string;
  milestones: {
    id: string;
    name: string;
    status: 'not-started' | 'in-progress' | 'completed';
    description?: string;
  }[];
  team?: string;
  license?: string;
}

export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  category: string; // Category ID (client-integration, real-time-proving, etc.)
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'not-started' | 'in-progress' | 'completed';
  targetDate?: string;
  dependencies?: string[]; // IDs of other roadmap items
  relatedClients?: string[]; // IDs of related clients
}

export interface TrackData {
  categories: CategoryData[];
  roadmapItems: RoadmapItem[];
  clients: Client[];
}
