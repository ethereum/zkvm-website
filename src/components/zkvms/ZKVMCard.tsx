import Link from 'next/link';
import { ZKVM } from '@/lib/track-types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ZKVMCardProps {
  zkvm: ZKVM;
}

export default function ZKVMCard({ zkvm }: ZKVMCardProps) {
  // Calculate performance progress
  const performanceStatuses = Object.values(zkvm.milestoneStatuses);
  const performanceCompleted = performanceStatuses.filter(s => s === 'complete').length;
  const performanceTotal = performanceStatuses.length;
  const performancePercentage = performanceTotal > 0
    ? Math.round((performanceCompleted / performanceTotal) * 100)
    : 0;

  // Calculate client support progress
  const clientStatuses = Object.values(zkvm.clientSupport);
  const clientsSupported = clientStatuses.filter(s => s === 'complete').length;
  const clientsTotal = clientStatuses.length;
  const clientPercentage = clientsTotal > 0
    ? Math.round((clientsSupported / clientsTotal) * 100)
    : 0;

  // Proving system badge styling
  const provingSystemBadges: Record<string, string> = {
    'STARK': 'bg-indigo-500 hover:bg-indigo-600 text-white',
    'SNARK': 'bg-violet-500 hover:bg-violet-600 text-white',
    'Lookup': 'bg-pink-500 hover:bg-pink-600 text-white'
  };

  const badgeClass = provingSystemBadges[zkvm.provingSystem] || 'bg-gray-500 text-white';

  return (
    <Link href={`/zkvms/${zkvm.id}`}>
      <Card className="h-full transition-all hover:shadow-lg hover:border-primary cursor-pointer">
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg">{zkvm.name}</CardTitle>
            <Badge className={badgeClass}>
              {zkvm.provingSystem}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {zkvm.language}
          </p>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {zkvm.description}
          </p>

          {/* Performance Progress */}
          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">
                  Performance: {performanceCompleted}/{performanceTotal} milestones ({performancePercentage}%)
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${performancePercentage}%` }}
                />
              </div>
            </div>

            {/* Client Support Progress */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">
                  Client Support: {clientsSupported}/{clientsTotal} clients ({clientPercentage}%)
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${clientPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
