export type WorkstreamType = 'real-time-proving' | 'client-integration' | 'economic-security' | 'testing-validation';

export interface BlogPostMetadata {
  title: string;
  date: string;
  excerpt: string;
  author: string;
  tags?: string[];
  featured: boolean;
  workstream?: WorkstreamType;
  topics?: string[];
  description?: string;
}

export interface BlogPost extends BlogPostMetadata {
  slug: string;
  content: string;
}

export interface BlogPostSummary {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  tags?: string[];
  featured: boolean;
  workstream?: WorkstreamType;
  topics?: string[];
  description?: string;
}

// ZKVM Tracker Types
export interface SupportedClient {
  name: string;
  color: string;
  status: 'Not Started' | 'Planning' | 'In Development' | 'Testing' | 'Production Ready' | 'Deprecated';
}

export interface ZKEVMLinks {
  github: string;
  docs: string;
}

export interface TestResults {
  passed: number;
  total: number;
  percentage: number;
}

export type ZKVMStatus = 'Not Started' | 'Planning' | 'In Development' | 'Testing' | 'Production Ready' | 'Deprecated';

export interface ZKEVMData {
  name: string;
  description: string;
  architecture: string; // e.g., "rv32im", "rv64ima"
  testResults: TestResults;
  status: ZKVMStatus;
  securityTests: boolean;
  openSource: boolean;
  supportedClients: SupportedClient[];
  links: ZKEVMLinks;
}
