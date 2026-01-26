'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Client } from '@/lib/track-types';
import { ExternalLink, GitBranch, CheckCircle2, Circle, Loader2 } from 'lucide-react';

interface ClientCardProps {
  client: Client;
}

export default function ClientCard({ client }: ClientCardProps) {
  // Calculate milestone progress from status map
  const milestoneStatuses = Object.values(client.milestoneStatuses);
  const completedMilestones = milestoneStatuses.filter(s => s.status === 'complete').length;
  const inProgressMilestones = milestoneStatuses.filter(s => s.status === 'in-progress').length;
  const totalMilestones = milestoneStatuses.length;
  const progressPercentage = totalMilestones > 0
    ? Math.round((completedMilestones / totalMilestones) * 100)
    : 0;

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

  return (
    <Link href={`/clients/${client.slug}`}>
      <Card className="h-full hover:bg-muted/30 transition-colors cursor-pointer">
        <CardHeader>
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1">
              <CardTitle className="text-xl mb-2">{client.name}</CardTitle>
              <div className="flex gap-2">
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  client.type === 'execution'
                    ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-200'
                    : 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-200'
                }`}>
                  {client.type === 'execution' ? 'Execution Layer' : 'Consensus Layer'}
                </span>
              </div>
            </div>
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize whitespace-nowrap ${getStatusColor(client.status)}`}>
              {client.status.replace('-', ' ')}
            </span>
          </div>
          <CardDescription className="mt-2">{client.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Technical details */}
          <div className="flex flex-wrap gap-3 text-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <GitBranch className="h-4 w-4" />
              <span>{client.language}</span>
            </div>
            {client.team && (
              <div className="text-muted-foreground">
                <span className="font-medium">Team:</span> {client.team}
              </div>
            )}
          </div>

          {/* Milestone progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">zkEVM Integration Progress</span>
              <span className="text-muted-foreground">
                {completedMilestones}/{totalMilestones} milestones
              </span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              {completedMilestones > 0 && (
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-green-600" />
                  <span>{completedMilestones} completed</span>
                </div>
              )}
              {inProgressMilestones > 0 && (
                <div className="flex items-center gap-1">
                  <Loader2 className="h-3 w-3 text-blue-600" />
                  <span>{inProgressMilestones} in progress</span>
                </div>
              )}
              {totalMilestones - completedMilestones - inProgressMilestones > 0 && (
                <div className="flex items-center gap-1">
                  <Circle className="h-3 w-3 text-gray-400" />
                  <span>{totalMilestones - completedMilestones - inProgressMilestones} not started</span>
                </div>
              )}
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-3 pt-2">
            <a
              href={client.repository}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline flex items-center gap-1"
              onClick={(e) => e.stopPropagation()}
            >
              Repository <ExternalLink className="h-3 w-3" />
            </a>
            {client.documentation && (
              <a
                href={client.documentation}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline flex items-center gap-1"
                onClick={(e) => e.stopPropagation()}
              >
                Docs <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
