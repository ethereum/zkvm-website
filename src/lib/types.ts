export interface BlogPostMetadata {
  title: string;
  date: string;
  excerpt: string;
  author: string;
  tags: string[];
  featured: boolean;
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
  tags: string[];
  featured: boolean;
}

// ZK-EVM Tracker Types
export interface SupportedClient {
  name: string;
  color: string;
}

export interface ZKEVMLinks {
  github: string;
  docs: string;
}

export interface ZKEVMData {
  name: string;
  description: string;
  securityTests: boolean;
  openSource: boolean;
  supportedClients: SupportedClient[];
  links: ZKEVMLinks;
}
