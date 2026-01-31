import { Milestone } from '@/lib/track-types';
import { CheckCircle2, Circle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MilestoneChecklistProps {
  milestones: Milestone[];
}

export default function MilestoneChecklist({ milestones }: MilestoneChecklistProps) {
  const getStatusIcon = (status: Milestone['status']) => {
    switch (status) {
      case 'achieved':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-orange-500" />;
      case 'not-started':
        return <Circle className="h-5 w-5 text-gray-300" />;
    }
  };

  const getStatusLabel = (status: Milestone['status']) => {
    switch (status) {
      case 'achieved':
        return 'Achieved';
      case 'in-progress':
        return 'In Progress';
      case 'not-started':
        return 'Not Started';
    }
  };

  const getStatusColor = (status: Milestone['status']) => {
    switch (status) {
      case 'achieved':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-orange-100 text-orange-800';
      case 'not-started':
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Milestones</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {milestones.map((milestone) => (
            <div key={milestone.id} className="flex gap-4 rounded-lg border p-4">
              <div className="mt-1">
                {getStatusIcon(milestone.status)}
              </div>
              <div className="flex-1">
                <div className="mb-2 flex items-start justify-between gap-4">
                  <h3 className="font-medium">{milestone.name}</h3>
                  <span className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(milestone.status)}`}>
                    {getStatusLabel(milestone.status)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {milestone.description}
                </p>

                {/* Show metric if exists */}
                {milestone.metric && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Current Progress</span>
                      <span className="font-medium">
                        {milestone.metric.current} / {milestone.metric.target} {milestone.metric.unit}
                      </span>
                    </div>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{
                          width: `${Math.min(100, (milestone.metric.current / milestone.metric.target) * 100)}%`
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Show verification if achieved */}
                {milestone.verification && (
                  <div className="mt-3 rounded-md bg-green-50 p-3 text-sm">
                    <p className="font-medium text-green-900">
                      ✓ Verified on {new Date(milestone.verification.date).toLocaleDateString()}
                    </p>
                    {milestone.verification.note && (
                      <p className="mt-1 text-green-700">{milestone.verification.note}</p>
                    )}
                    {milestone.verification.link && (
                      <a
                        href={milestone.verification.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-block text-green-700 underline hover:text-green-900"
                      >
                        View details →
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
