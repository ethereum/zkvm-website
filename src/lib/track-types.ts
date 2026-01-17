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

export interface CategoryData {
  id: string;
  name: string;
  description: string;
  workstream: number | null; // 1, 2, 3, or null for testing-validation
  icon: string;
  lastUpdated: string;
  milestones: Milestone[];
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
