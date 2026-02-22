import Link from 'next/link';
import { ZKVM, RoadmapItem } from '@/lib/track-types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target } from 'lucide-react';

interface RelatedRoadmapProps {
  zkvm: ZKVM;
  roadmap: RoadmapItem[];
  allZKVMs: ZKVM[];
}

export default function RelatedRoadmap({ zkvm, roadmap, allZKVMs }: RelatedRoadmapProps) {
  // Filter roadmap items applicable to zkVMs
  const relatedItems = roadmap.filter(item =>
    item.applicableType === 'zkvm' || item.applicableType === 'both'
  );

  if (relatedItems.length === 0) {
    return null;
  }

  // Calculate progress for each item
  const getProgress = (item: RoadmapItem) => {
    if (!item.milestoneIds) {
      return null;
    }

    const applicableZKVMs = item.applicableType === 'both'
      ? allZKVMs
      : allZKVMs;

    const completedZKVMs = applicableZKVMs.filter(z => {
      return item.milestoneIds!.every(milestoneId =>
        z.milestoneStatuses[milestoneId]?.status === 'complete'
      );
    });

    return {
      completed: completedZKVMs.length,
      total: applicableZKVMs.length,
      percentage: Math.round((completedZKVMs.length / applicableZKVMs.length) * 100)
    };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Related Roadmap Items
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {relatedItems.map((item) => {
            const progress = getProgress(item);

            return (
              <div key={item.id} className="space-y-2 pb-4 border-b last:border-b-0 last:pb-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-medium">{item.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>Target: {item.targetDate}</span>
                </div>

                {progress && (
                  <div className="space-y-1 mt-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        Progress: {progress.completed}/{progress.total} zkVMs ({progress.percentage}%)
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${progress.percentage}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          <Link
            href="/track"
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
          >
            View full roadmap →
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
