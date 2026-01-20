'use client';

import Link from 'next/link';
import { ZKVM, GuestProgram, MilestoneStatus } from '@/lib/track-types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, AlertCircle, Circle, XCircle } from 'lucide-react';

interface ClientSupportMatrixProps {
  zkvm: ZKVM;
  guestPrograms: GuestProgram[];
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

export default function ClientSupportMatrix({ zkvm, guestPrograms }: ClientSupportMatrixProps) {
  // Calculate overall guest program support progress
  const guestProgramStatuses = Object.values(zkvm.guestProgramSupport);
  const supported = guestProgramStatuses.filter(s => s.status === 'complete').length;
  const total = guestProgramStatuses.length;
  const percentage = total > 0 ? Math.round((supported / total) * 100) : 0;

  // Get guest programs for this zkvm's support matrix
  const supportedGuestPrograms = guestPrograms.filter(gp =>
    zkvm.guestProgramSupport.hasOwnProperty(gp.id)
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Guest Program Support</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Guest Programs */}
          {supportedGuestPrograms.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Supported Guest Programs</h3>
              <div className="space-y-3">
                {supportedGuestPrograms.map((guestProgram) => {
                  const progress = zkvm.guestProgramSupport[guestProgram.id];
                  const status = progress.status;
                  const config = statusConfig[status];
                  const Icon = config.icon;

                  return (
                    <div key={guestProgram.id} className="space-y-1">
                      <div className="flex items-start gap-3">
                        <Icon className={`h-5 w-5 flex-shrink-0 mt-0.5 ${config.color}`} />
                        <div className="flex-1">
                          <Link
                            href={`/clients/${guestProgram.slug}`}
                            className="text-sm font-medium hover:underline"
                          >
                            {guestProgram.name}
                          </Link>
                          <p className="text-sm text-muted-foreground">
                            {guestProgram.description}
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
            </div>
          )}

          {/* Overall guest program support */}
          <div className="space-y-2 pt-4 border-t">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Guest Program Support Progress</span>
              <span className="text-muted-foreground">
                {supported}/{total} guest programs ({percentage}%)
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
