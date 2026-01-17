import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RecentChange } from '@/lib/track-types';
import { Clock } from 'lucide-react';

interface RecentChangesFeedProps {
  changes: RecentChange[];
  maxItems?: number;
}

export default function RecentChangesFeed({ changes, maxItems = 5 }: RecentChangesFeedProps) {
  const displayChanges = changes.slice(0, maxItems);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Updates
        </CardTitle>
      </CardHeader>
      <CardContent>
        {displayChanges.length === 0 ? (
          <p className="text-sm text-muted-foreground">No recent updates</p>
        ) : (
          <div className="space-y-4">
            {displayChanges.map((change, index) => (
              <div key={index} className="flex gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-sm font-medium">{change.description}</p>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {new Date(change.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground capitalize">
                    {change.category.replace('-', ' ')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
