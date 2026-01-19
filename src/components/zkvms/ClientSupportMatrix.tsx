'use client';

import Link from 'next/link';
import { ZKVM, Client, MilestoneStatus } from '@/lib/track-types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, AlertCircle, Circle, XCircle } from 'lucide-react';

interface ClientSupportMatrixProps {
  zkvm: ZKVM;
  clients: Client[];
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

export default function ClientSupportMatrix({ zkvm, clients }: ClientSupportMatrixProps) {
  // Calculate overall client support progress
  const clientStatuses = Object.values(zkvm.clientSupport);
  const supported = clientStatuses.filter(s => s === 'complete').length;
  const total = clientStatuses.length;
  const percentage = total > 0 ? Math.round((supported / total) * 100) : 0;

  // Get clients for this zkvm's support matrix
  const supportedClients = clients.filter(c =>
    zkvm.clientSupport.hasOwnProperty(c.id)
  );

  // Group by client type
  const executionClients = supportedClients.filter(c => c.type === 'execution');
  const consensusClients = supportedClients.filter(c => c.type === 'consensus');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Client Support</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Execution Clients */}
          {executionClients.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Execution Clients</h3>
              <div className="space-y-3">
                {executionClients.map((client) => {
                  const status = zkvm.clientSupport[client.id];
                  const config = statusConfig[status];
                  const Icon = config.icon;

                  return (
                    <div key={client.id} className="space-y-1">
                      <div className="flex items-start gap-3">
                        <Icon className={`h-5 w-5 flex-shrink-0 mt-0.5 ${config.color}`} />
                        <div className="flex-1">
                          <Link
                            href={`/clients/${client.slug}`}
                            className="text-sm font-medium hover:underline"
                          >
                            {client.name}
                          </Link>
                          <p className="text-sm text-muted-foreground">
                            {client.description}
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

          {/* Consensus Clients */}
          {consensusClients.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Consensus Clients</h3>
              <div className="space-y-3">
                {consensusClients.map((client) => {
                  const status = zkvm.clientSupport[client.id];
                  const config = statusConfig[status];
                  const Icon = config.icon;

                  return (
                    <div key={client.id} className="space-y-1">
                      <div className="flex items-start gap-3">
                        <Icon className={`h-5 w-5 flex-shrink-0 mt-0.5 ${config.color}`} />
                        <div className="flex-1">
                          <Link
                            href={`/clients/${client.slug}`}
                            className="text-sm font-medium hover:underline"
                          >
                            {client.name}
                          </Link>
                          <p className="text-sm text-muted-foreground">
                            {client.description}
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

          {/* Overall client support */}
          <div className="space-y-2 pt-4 border-t">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Client Support Progress</span>
              <span className="text-muted-foreground">
                {supported}/{total} clients ({percentage}%)
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
