import { notFound } from 'next/navigation';
import Link from 'next/link';
import { trackData } from '@/data/track-data';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';
import PerformanceMilestones from '@/components/zkvms/PerformanceMilestones';
import ClientSupportMatrix from '@/components/zkvms/ClientSupportMatrix';

interface ZKVMPageProps {
  params: Promise<{
    zkvmId: string;
  }>;
}

export async function generateStaticParams() {
  return trackData.zkvms.map((zkvm) => ({
    zkvmId: zkvm.id,
  }));
}

export async function generateMetadata({ params }: ZKVMPageProps) {
  const { zkvmId } = await params;
  const zkvm = trackData.zkvms.find(z => z.id === zkvmId);

  if (!zkvm) {
    return {
      title: 'zkVM Not Found',
    };
  }

  return {
    title: `${zkvm.name} - zkVM Progress`,
    description: zkvm.description,
  };
}

export default async function ZKVMPage({ params }: ZKVMPageProps) {
  const { zkvmId } = await params;
  const zkvm = trackData.zkvms.find(z => z.id === zkvmId);

  if (!zkvm) {
    notFound();
  }

  // Get milestones from real-time-proving category
  const category = trackData.categories.find(c => c.id === 'real-time-proving');
  const milestones = category?.milestones || [];

  // Proving system badge
  const provingSystemBadges: Record<string, string> = {
    'STARK': 'bg-indigo-500 hover:bg-indigo-600 text-white',
    'SNARK': 'bg-violet-500 hover:bg-violet-600 text-white',
    'Lookup': 'bg-pink-500 hover:bg-pink-600 text-white'
  };

  const badgeClass = provingSystemBadges[zkvm.provingSystem] || 'bg-gray-500 text-white';

  return (
    <div className="container mx-auto px-4 pb-16">
      <div className="mx-auto max-w-4xl">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-muted-foreground">
          <Link href="/zkvms" className="hover:text-foreground">
            zkVMs
          </Link>
          {' / '}
          <span className="text-foreground">{zkvm.name}</span>
        </div>

        {/* zkVM Header */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{zkvm.name}</h1>
                  <p className="text-muted-foreground">{zkvm.description}</p>
                </div>
                <Badge className={badgeClass}>
                  {zkvm.provingSystem}
                </Badge>
              </div>

              {/* Metadata */}
              <div className="flex flex-wrap gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Proving System:</span>{' '}
                  <span className="font-medium">{zkvm.provingSystem}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Language:</span>{' '}
                  <span className="font-medium">{zkvm.language}</span>
                </div>
                {zkvm.maintainer && (
                  <div>
                    <span className="text-muted-foreground">Maintainer:</span>{' '}
                    <span className="font-medium">{zkvm.maintainer}</span>
                  </div>
                )}
                {zkvm.repository && (
                  <div>
                    <a
                      href={zkvm.repository}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:underline"
                    >
                      Repository <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                )}
                {zkvm.website && (
                  <div>
                    <a
                      href={zkvm.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:underline"
                    >
                      Website <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Milestones */}
        <div className="mb-8">
          <PerformanceMilestones zkvm={zkvm} milestones={milestones} />
        </div>

        {/* Client Support */}
        <ClientSupportMatrix zkvm={zkvm} clients={trackData.clients} />
      </div>
    </div>
  );
}
