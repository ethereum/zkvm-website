'use client';

import Link from 'next/link';
import { ZKVM } from '@/lib/track-types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, CheckCircle2, Loader2, Circle } from 'lucide-react';

interface ZKVMProgressCardProps {
  zkvm: ZKVM;
}

export default function ZKVMProgressCard({ zkvm }: ZKVMProgressCardProps) {
  // Calculate milestone statistics
  const milestoneStatuses = Object.values(zkvm.milestoneStatuses);
  const completedMilestones = milestoneStatuses.filter(s => s.status === 'complete').length;
  const inProgressMilestones = milestoneStatuses.filter(s => s.status === 'in-progress').length;
  const totalMilestones = milestoneStatuses.length;
  const progressPercentage = totalMilestones > 0
    ? Math.round((completedMilestones / totalMilestones) * 100)
    : 0;

  // Calculate guest program support statistics
  const guestProgramSupportStatuses = Object.values(zkvm.guestProgramSupport);
  const supportedGuestPrograms = guestProgramSupportStatuses.filter(s => s.status === 'complete').length;
  const inProgressGuestPrograms = guestProgramSupportStatuses.filter(s => s.status === 'in-progress').length;
  const totalGuestPrograms = guestProgramSupportStatuses.length;

  const getStatusColor = () => {
    if (progressPercentage >= 75) return 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200';
    if (progressPercentage >= 40) return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200';
    return 'bg-gray-100 text-gray-800 dark:bg-gray-950 dark:text-gray-200';
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="mb-2">
              <Link href={`/zkvms/${zkvm.id}`} className="hover:text-primary transition-colors">
                {zkvm.name}
              </Link>
            </CardTitle>
            <p className="text-sm text-muted-foreground font-normal">
              {zkvm.description}
            </p>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap ${getStatusColor()}`}>
            {progressPercentage}% Ready
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Performance Progress */}
        <div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="font-medium">Performance Milestones</span>
            <span className="text-muted-foreground">{completedMilestones}/{totalMilestones}</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="grid grid-cols-3 gap-2 mt-3 text-center">
            <div>
              <div className="flex items-center justify-center gap-1">
                <CheckCircle2 className="h-3 w-3 text-green-600" />
                <span className="text-sm font-bold text-green-600">{completedMilestones}</span>
              </div>
              <div className="text-xs text-muted-foreground">Complete</div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1">
                <Loader2 className="h-3 w-3 text-blue-600" />
                <span className="text-sm font-bold text-blue-600">{inProgressMilestones}</span>
              </div>
              <div className="text-xs text-muted-foreground">In Progress</div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1">
                <Circle className="h-3 w-3 text-gray-400" />
                <span className="text-sm font-bold text-gray-400">
                  {totalMilestones - completedMilestones - inProgressMilestones}
                </span>
              </div>
              <div className="text-xs text-muted-foreground">Not Started</div>
            </div>
          </div>
        </div>

        {/* Guest Program Support */}
        <div className="border-t pt-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="font-medium">Guest Program Support</span>
            <span className="text-muted-foreground">{supportedGuestPrograms}/{totalGuestPrograms} programs</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {supportedGuestPrograms > 0 && (
              <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200">
                {supportedGuestPrograms} supported
              </span>
            )}
            {inProgressGuestPrograms > 0 && (
              <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200">
                {inProgressGuestPrograms} in progress
              </span>
            )}
          </div>
        </div>

        {/* Technical Details */}
        <div className="border-t pt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Proving System:</span>
            <span className="font-medium">{zkvm.provingSystem}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Language:</span>
            <span className="font-medium">{zkvm.language}</span>
          </div>
          {zkvm.maintainer && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Maintainer:</span>
              <span className="font-medium">{zkvm.maintainer}</span>
            </div>
          )}
        </div>

        {/* Links */}
        <div className="border-t pt-4 flex gap-4">
          {zkvm.repository && (
            <a
              href={zkvm.repository}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
            >
              <ExternalLink className="h-4 w-4" />
              Repository
            </a>
          )}
          {zkvm.website && (
            <a
              href={zkvm.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
            >
              <ExternalLink className="h-4 w-4" />
              Website
            </a>
          )}
          <Link
            href={`/zkvms/${zkvm.id}`}
            className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline ml-auto"
          >
            View Details →
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
