'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { RoadmapItem, Client, ZKVM, CommonMilestone } from '@/lib/track-types';
import { Target, Calendar, Link2, Users, CheckCircle2, Loader2, Circle, GitBranch } from 'lucide-react';

interface RoadmapViewProps {
  items: RoadmapItem[];
  clients?: Client[];
  zkvms?: ZKVM[];
  commonExecutionMilestones?: CommonMilestone[];
  commonConsensusMilestones?: CommonMilestone[];
}

export default function RoadmapView({
  items,
  clients = [],
  zkvms = [],
  commonExecutionMilestones = [],
  commonConsensusMilestones = []
}: RoadmapViewProps) {
  // Helper: Calculate progress for roadmap items with applicableType (zkvm/execution/consensus/both)
  const calculateRoadmapProgress = (item: RoadmapItem): { completed: number; total: number; percentage: number; label: string } | null => {
    if (!item.milestoneIds || !item.applicableType) {
      return null;
    }

    // Only support zkvm type for now (clients use legacy getClientProgress)
    if (item.applicableType !== 'zkvm') {
      return null;
    }

    const applicableItems = zkvms;
    const label = 'zkVMs';

    if (applicableItems.length === 0) {
      return null;
    }

    // Count items that completed ALL milestones
    const completedItems = applicableItems.filter(impl => {
      return item.milestoneIds!.every(milestoneId =>
        impl.milestoneStatuses[milestoneId] === 'complete'
      );
    });

    const percentage = Math.round((completedItems.length / applicableItems.length) * 100);

    return {
      completed: completedItems.length,
      total: applicableItems.length,
      percentage,
      label
    };
  };

  // Helper: Calculate client milestone progress for a roadmap item (legacy)
  const getClientProgress = (item: RoadmapItem) => {
    if (!item.relatedClients || item.relatedClients.length === 0) {
      return null;
    }

    const relatedClientData = clients.filter(c => item.relatedClients?.includes(c.id));
    if (relatedClientData.length === 0) return null;

    const totalMilestones = relatedClientData.reduce((sum, c) => sum + Object.keys(c.milestoneStatuses).length, 0);
    const completedMilestones = relatedClientData.reduce(
      (sum, c) => sum + Object.values(c.milestoneStatuses).filter(s => s === 'completed').length,
      0
    );

    return {
      total: totalMilestones,
      completed: completedMilestones,
      percentage: totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0,
      clients: relatedClientData
    };
  };

  // Group items by category
  const groupedItems = useMemo(() => {
    const groups = items.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {} as Record<string, RoadmapItem[]>);

    return groups;
  }, [items]);

  // Category display names
  const categoryNames: Record<string, string> = {
    'client-integration': 'Client Integration',
    'real-time-proving': 'Benchmarks',
    'economic-security': 'Economic Security',
    'testing-validation': 'Testing & Validation',
  };

  // Status badge colors
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200';
      case 'not-started':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-950 dark:text-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-950 dark:text-gray-200';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Strategic Roadmap
          </CardTitle>
          <Link href="/roadmap-visual">
            <Button variant="outline" size="sm">
              <GitBranch className="mr-2 h-4 w-4" />
              Visualize
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Summary stats */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-2">
            <div>
              <span className="font-semibold text-foreground">{items.length}</span> total items
            </div>
            <div>
              <span className="font-semibold text-foreground">
                {items.filter(i => i.status === 'in-progress').length}
              </span> in progress
            </div>
          </div>

          {/* Grouped accordion */}
          <Accordion type="multiple" defaultValue={Object.keys(categoryNames)} className="w-full">
            {Object.entries(groupedItems).map(([category, categoryItems]) => {
              const categoryName = categoryNames[category] || category;

              return (
                <AccordionItem key={category} value={category}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center justify-between w-full pr-4">
                      <span className="font-semibold">{categoryName}</span>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span>{categoryItems.length} items</span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-2">
                      {categoryItems.map((item) => (
                        <div
                          key={item.id}
                          className="rounded-lg border p-4 space-y-3 hover:bg-muted/30 transition-colors"
                        >
                          {/* Title and badges */}
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                            <h3 className="font-semibold text-base">{item.title}</h3>
                            <div className="flex flex-wrap gap-2">
                              <span
                                className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${getStatusColor(item.status)}`}
                              >
                                {item.status.replace('-', ' ')}
                              </span>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-sm text-muted-foreground">{item.description}</p>

                          {/* Metadata row */}
                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            {item.targetDate && (
                              <div className="flex items-center gap-1.5">
                                <Calendar className="h-4 w-4" />
                                <span>Target: {item.targetDate}</span>
                              </div>
                            )}
                            {(() => {
                              const progress = calculateRoadmapProgress(item);
                              return progress && (
                                <div className="flex items-center gap-1.5">
                                  <Users className="h-4 w-4" />
                                  <span>
                                    Progress: {progress.completed}/{progress.total} {progress.label} ({progress.percentage}%)
                                  </span>
                                </div>
                              );
                            })()}
                            {item.relatedClients && item.relatedClients.length > 0 && (() => {
                              const progress = getClientProgress(item);
                              return progress && (
                                <div className="flex items-center gap-1.5">
                                  <Users className="h-4 w-4" />
                                  <span>
                                    {progress.completed}/{progress.total} milestones ({progress.percentage}%)
                                  </span>
                                </div>
                              );
                            })()}
                            {item.dependencies && item.dependencies.length > 0 && (
                              <div className="flex items-center gap-1.5">
                                <Link2 className="h-4 w-4" />
                                <span>{item.dependencies.length} dependencies</span>
                              </div>
                            )}
                          </div>

                          {/* Progress indicator */}
                          {(() => {
                            const progress = calculateRoadmapProgress(item);
                            if (!progress) return null;

                            return (
                              <div className="pl-4 space-y-1 mt-2">
                                <div className="h-2 bg-muted rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-primary transition-all duration-300"
                                    style={{ width: `${progress.percentage}%` }}
                                  />
                                </div>
                              </div>
                            );
                          })()}

                          {/* Dependencies list (if any) */}
                          {item.dependencies && item.dependencies.length > 0 && (
                            <div className="pt-2 border-t">
                              <p className="text-xs font-medium text-muted-foreground mb-1">
                                Depends on:
                              </p>
                              <ul className="text-xs text-muted-foreground space-y-1">
                                {item.dependencies.map((depId) => {
                                  const depItem = items.find(i => i.id === depId);
                                  return (
                                    <li key={depId} className="flex items-center gap-1">
                                      <span className="text-primary">→</span>
                                      {depItem ? depItem.title : depId}
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          )}

                          {/* Related clients list (if any) */}
                          {item.relatedClients && item.relatedClients.length > 0 && (() => {
                            const progress = getClientProgress(item);
                            return progress && progress.clients.length > 0 && (
                              <div className="pt-2 border-t">
                                <p className="text-xs font-medium text-muted-foreground mb-2">
                                  Related Clients:
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {progress.clients.map((client) => {
                                    const clientCompleted = Object.values(client.milestoneStatuses).filter(s => s === 'completed').length;
                                    const clientTotal = Object.keys(client.milestoneStatuses).length;
                                    return (
                                      <Link
                                        key={client.id}
                                        href={`/clients/${client.slug}`}
                                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted hover:bg-muted/80 transition-colors text-xs"
                                      >
                                        <span className="font-medium">{client.name}</span>
                                        <span className="text-muted-foreground">
                                          {clientCompleted}/{clientTotal}
                                        </span>
                                      </Link>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })()}

                          {/* Common Milestones Progress Matrix */}
                          {item.commonMilestoneIds && item.commonMilestoneIds.length > 0 && item.relatedClients && item.relatedClients.length > 0 && (() => {
                            // Get the appropriate common milestones based on applicableType
                            const commonMilestones = item.applicableType === 'consensus'
                              ? commonConsensusMilestones
                              : commonExecutionMilestones;

                            const relevantMilestones = commonMilestones.filter(m => item.commonMilestoneIds?.includes(m.id));
                            const relatedClientData = clients.filter(c => item.relatedClients?.includes(c.id));

                            if (relevantMilestones.length === 0 || relatedClientData.length === 0) return null;

                            const getMilestoneIcon = (status: string) => {
                              switch (status) {
                                case 'completed':
                                  return <CheckCircle2 className="h-4 w-4 text-green-600" />;
                                case 'in-progress':
                                  return <Loader2 className="h-4 w-4 text-blue-600" />;
                                default:
                                  return <Circle className="h-4 w-4 text-gray-400" />;
                              }
                            };

                            return (
                              <div className="pt-4 border-t">
                                <Accordion type="single" collapsible className="w-full">
                                  <AccordionItem value="milestones" className="border-0">
                                    <AccordionTrigger className="py-2 hover:no-underline">
                                      <span className="text-xs font-medium text-muted-foreground">
                                        View Milestone Progress ({relevantMilestones.length} milestones)
                                      </span>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                      <div className="space-y-3 pt-2">
                                        {relevantMilestones.map((milestone) => (
                                          <div key={milestone.id} className="rounded-lg border p-3 bg-muted/30">
                                            <div className="mb-2">
                                              <h4 className="text-sm font-semibold">{milestone.name}</h4>
                                              <p className="text-xs text-muted-foreground">{milestone.description}</p>
                                            </div>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                                              {relatedClientData.map((client) => {
                                                const status = client.milestoneStatuses[milestone.id] || 'not-started';
                                                return (
                                                  <Link
                                                    key={client.id}
                                                    href={`/clients/${client.slug}`}
                                                    className="flex items-center gap-1.5 px-2 py-1 rounded bg-background hover:bg-muted/50 transition-colors"
                                                  >
                                                    {getMilestoneIcon(status)}
                                                    <span className="text-xs font-medium truncate">{client.name}</span>
                                                  </Link>
                                                );
                                              })}
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </AccordionContent>
                                  </AccordionItem>
                                </Accordion>
                              </div>
                            );
                          })()}
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>

          {/* Empty state */}
          {items.length === 0 && (
            <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
              <p className="text-sm">No roadmap items available</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
