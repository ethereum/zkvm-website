'use client';

import { ZKVM, Milestone, MilestoneStatus } from '@/lib/track-types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, AlertCircle, Circle, XCircle } from 'lucide-react';

interface PerformanceMilestonesProps {
  zkvm: ZKVM;
  milestones: Milestone[];
}

const statusConfig: Record<MilestoneStatus, {
  icon: typeof CheckCircle;
  color: string;
  label: string;
}> = {
  'complete': {
    icon: CheckCircle,
    color: 'text-green-500',
    label: 'Complete'
  },
  'in-progress': {
    icon: AlertCircle,
    color: 'text-orange-500',
    label: 'In Progress'
  },
  'not-started': {
    icon: Circle,
    color: 'text-gray-400',
    label: 'Not Started'
  },
  'blocked': {
    icon: XCircle,
    color: 'text-red-500',
    label: 'Blocked'
  }
};

export default function PerformanceMilestones({ zkvm, milestones }: PerformanceMilestonesProps) {
  // Calculate overall progress
  const statuses = Object.values(zkvm.milestoneStatuses);
  const completed = statuses.filter(s => s.status === 'complete').length;
  const total = statuses.length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  // Get milestones for this zkvm
  const zkvmMilestones = milestones.filter(m =>
    zkvm.milestoneStatuses.hasOwnProperty(m.id)
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Milestones</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Milestone list */}
          <div className="space-y-4">
            {zkvmMilestones.map((milestone) => {
              const progress = zkvm.milestoneStatuses[milestone.id];
              const status = progress.status;
              const config = statusConfig[status];
              const Icon = config.icon;

              return (
                <div key={milestone.id} className="space-y-2">
                  <div className="flex items-start gap-3">
                    <Icon className={`h-5 w-5 flex-shrink-0 mt-0.5 ${config.color}`} />
                    <div className="flex-1">
                      <h3 className="text-sm font-medium">{milestone.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {milestone.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Status: <span className="font-medium">{config.label}</span>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Overall progress */}
          <div className="space-y-2 pt-4 border-t">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Overall Progress</span>
              <span className="text-muted-foreground">
                {completed}/{total} milestones ({percentage}%)
              </span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
