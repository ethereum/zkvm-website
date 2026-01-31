import { notFound } from 'next/navigation';
import Link from 'next/link';
import { trackData } from '@/data/track-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Breadcrumbs from '@/components/Breadcrumbs';
import { ExternalLink, GitBranch, CheckCircle2, Circle, Loader2, ArrowLeft } from 'lucide-react';

interface ClientPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  const clientParams = trackData.clients.map((client) => ({
    slug: client.slug,
  }));
  const guestProgramParams = trackData.guestPrograms.map((gp) => ({
    slug: gp.slug,
  }));
  return [...clientParams, ...guestProgramParams];
}

export async function generateMetadata({ params }: ClientPageProps) {
  const { slug } = await params;
  const client = trackData.clients.find(c => c.slug === slug);
  const guestProgram = trackData.guestPrograms.find(gp => gp.slug === slug);

  if (!client && !guestProgram) {
    return {
      title: 'Not Found',
    };
  }

  const item = client || guestProgram!;
  return {
    title: `${item.name} - ${client ? 'Ethereum Client' : 'Guest Program'} Progress`,
    description: item.description,
  };
}

export default async function ClientPage({ params }: ClientPageProps) {
  const { slug } = await params;
  const client = trackData.clients.find(c => c.slug === slug);
  const guestProgram = trackData.guestPrograms.find(gp => gp.slug === slug);

  if (!client && !guestProgram) {
    notFound();
  }

  const item = client || guestProgram!;
  const isGuestProgram = !!guestProgram;

  // Get common milestones based on type
  const commonMilestones = isGuestProgram
    ? trackData.commonGuestProgramMilestones
    : client!.type === 'execution'
      ? trackData.commonExecutionMilestones
      : trackData.commonConsensusMilestones;

  // Build milestones with status and proofs
  const milestones = commonMilestones.map(m => {
    const progress = item.milestoneStatuses[m.id];
    return {
      ...m,
      status: progress?.status || 'not-started',
      proofs: progress?.proofs || []
    };
  });

  // Calculate milestone statistics
  const completedMilestones = milestones.filter(m => m.status === 'complete').length;
  const inProgressMilestones = milestones.filter(m => m.status === 'in-progress').length;
  const notStartedMilestones = milestones.filter(m => m.status === 'not-started').length;
  const progressPercentage = milestones.length > 0
    ? Math.round((completedMilestones / milestones.length) * 100)
    : 0;

  // Find related roadmap items
  const relatedRoadmapItems = trackData.roadmap.filter(
    item => isGuestProgram
      ? item.relatedGuestPrograms?.includes(guestProgram!.id)
      : item.relatedClients?.includes(client!.id)
  );

  // Status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'production':
        return 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200';
      case 'in-development':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200';
      case 'planning':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-950 dark:text-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-950 dark:text-gray-200';
    }
  };

  // Milestone status icon
  const getMilestoneIcon = (status: string) => {
    switch (status) {
      case 'complete':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'in-progress':
        return <Loader2 className="h-5 w-5 text-blue-600" />;
      default:
        return <Circle className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="container mx-auto px-4 pb-16">
      <div className="mx-auto max-w-4xl">
        <Breadcrumbs items={[
          { label: 'Clients', href: '/clients' },
          { label: item.name }
        ]} />

        {/* Back link */}
        <Link
          href="/clients"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all clients
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-3">{item.name}</h1>
              <div className="flex gap-2">
                {isGuestProgram ? (
                  <span className="rounded-full px-3 py-1 text-sm font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200">
                    Guest Program
                  </span>
                ) : (
                  <span className={`rounded-full px-3 py-1 text-sm font-semibold ${
                    client!.type === 'execution'
                      ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-200'
                      : 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-200'
                  }`}>
                    {client!.type === 'execution' ? 'Execution Layer' : 'Consensus Layer'}
                  </span>
                )}
              </div>
            </div>
            <span className={`rounded-full px-3 py-1 text-sm font-semibold capitalize whitespace-nowrap ${getStatusColor(item.status)}`}>
              {item.status.replace('-', ' ')}
            </span>
          </div>
          <p className="text-lg text-muted-foreground mb-4">{item.description}</p>

          {/* Technical details */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              <GitBranch className="h-4 w-4 text-muted-foreground" />
              <span><strong>Language:</strong> {item.language}</span>
            </div>
            {item.team && (
              <div>
                <strong>Team:</strong> {item.team}
              </div>
            )}
            {item.license && (
              <div>
                <strong>License:</strong> {item.license}
              </div>
            )}
          </div>

          {/* Guest program specific: supported zkVMs */}
          {isGuestProgram && guestProgram!.supportedZKVMs.length > 0 && (
            <div className="mt-4">
              <div className="text-sm font-semibold mb-2">Supported zkVMs:</div>
              <div className="flex flex-wrap gap-2">
                {guestProgram!.supportedZKVMs.map((zkvmId) => {
                  const zkvm = trackData.zkvms.find(z => z.id === zkvmId);
                  return zkvm ? (
                    <Link
                      key={zkvmId}
                      href={`/zkvms/${zkvmId}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200 px-3 py-1 text-sm font-semibold hover:bg-blue-200 dark:hover:bg-blue-900 transition-colors"
                    >
                      {zkvm.name}
                    </Link>
                  ) : (
                    <span key={zkvmId} className="inline-block rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200 px-3 py-1 text-sm font-semibold uppercase">
                      {zkvmId}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* Links */}
          <div className="flex gap-4 mt-4">
            <a
              href={item.repository}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
            >
              <ExternalLink className="h-4 w-4" />
              Repository
            </a>
            {item.documentation && (
              <a
                href={item.documentation}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
              >
                <ExternalLink className="h-4 w-4" />
                Documentation
              </a>
            )}
          </div>
        </div>

        <div className="space-y-8">
          {/* Overall progress - only for guest programs */}
          {isGuestProgram && (
            <Card>
              <CardHeader>
                <CardTitle>zkVM Integration Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="font-medium">Overall Completion</span>
                  <span className="text-2xl font-bold">{progressPercentage}%</span>
                </div>
                <div className="h-3 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4 pt-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">{completedMilestones}</div>
                    <div className="text-xs text-muted-foreground">Completed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{inProgressMilestones}</div>
                    <div className="text-xs text-muted-foreground">In Progress</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-400">{notStartedMilestones}</div>
                    <div className="text-xs text-muted-foreground">Not Started</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Milestones */}
          <Card>
            <CardHeader>
              <CardTitle>Milestones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {milestones.map((milestone) => (
                  <div
                    key={milestone.id}
                    className="flex gap-4 p-4 rounded-lg border hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      {getMilestoneIcon(milestone.status)}
                    </div>
                    <div className="flex-1 space-y-3">
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="font-semibold">{milestone.name}</h3>
                          <span className="text-xs text-muted-foreground capitalize whitespace-nowrap">
                            {milestone.status.replace('-', ' ')}
                          </span>
                        </div>
                        {milestone.description && (
                          <p className="text-sm text-muted-foreground">{milestone.description}</p>
                        )}
                      </div>

                      {milestone.proofs && milestone.proofs.length > 0 && (
                        <div className="pt-2 border-t">
                          <p className="text-xs font-semibold text-muted-foreground mb-2">Evidence:</p>
                          <div className="space-y-2">
                            {milestone.proofs.map((proof, idx) => (
                              <a
                                key={idx}
                                href={proof.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block group"
                              >
                                <div className="flex items-start gap-2">
                                  <span className="text-primary mt-0.5">→</span>
                                  <div className="flex-1">
                                    <p className="text-sm font-medium text-primary group-hover:underline">
                                      {proof.title}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                      {proof.description}
                                    </p>
                                    <p className="text-xs text-muted-foreground/60 mt-0.5 font-mono">
                                      {proof.url}
                                    </p>
                                  </div>
                                  <ExternalLink className="h-3 w-3 text-muted-foreground flex-shrink-0 mt-1" />
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {milestones.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No milestones defined yet
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Related roadmap items */}
          {relatedRoadmapItems.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Related Roadmap Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {relatedRoadmapItems.map((item) => (
                    <Link
                      key={item.id}
                      href="/track"
                      className="block p-4 rounded-lg border hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-semibold">{item.title}</h3>
                        <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary capitalize whitespace-nowrap">
                          {item.priority}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      {item.targetDate && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Target: {item.targetDate}
                        </p>
                      )}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
