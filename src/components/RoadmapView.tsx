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
import { RoadmapItem, Client, ZKVM } from '@/lib/track-types';
import { Target, Calendar, Link2, Users } from 'lucide-react';

interface RoadmapViewProps {
  items: RoadmapItem[];
  clients?: Client[];
  zkvms?: ZKVM[];
}

export default function RoadmapView({ items, clients = [], zkvms = [] }: RoadmapViewProps) {
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

    // Sort items within each group by priority
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    Object.keys(groups).forEach(category => {
      groups[category].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    });

    return groups;
  }, [items]);

  // Category display names
  const categoryNames: Record<string, string> = {
    'client-integration': 'Client Integration',
    'real-time-proving': 'Real-Time Proving',
    'economic-security': 'Economic Security',
    'testing-validation': 'Testing & Validation',
  };

  // Priority badge colors
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200 border-red-300 dark:border-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-200 border-orange-300 dark:border-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200 border-yellow-300 dark:border-yellow-800';
      case 'low':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200 border-blue-300 dark:border-blue-800';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-950 dark:text-gray-200 border-gray-300 dark:border-gray-800';
    }
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

  // Get category statistics
  const getCategoryStats = (categoryItems: RoadmapItem[]) => {
    const criticalCount = categoryItems.filter(item => item.priority === 'critical').length;
    const inProgressCount = categoryItems.filter(item => item.status === 'in-progress').length;
    return { criticalCount, inProgressCount };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Strategic Roadmap
        </CardTitle>
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
                {items.filter(i => i.priority === 'critical').length}
              </span> critical priority
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
              const stats = getCategoryStats(categoryItems);
              const categoryName = categoryNames[category] || category;

              return (
                <AccordionItem key={category} value={category}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center justify-between w-full pr-4">
                      <span className="font-semibold">{categoryName}</span>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span>{categoryItems.length} items</span>
                        {stats.criticalCount > 0 && (
                          <span className="text-red-600 dark:text-red-400 font-medium">
                            {stats.criticalCount} critical
                          </span>
                        )}
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
                                className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide ${getPriorityColor(item.priority)}`}
                              >
                                {item.priority}
                              </span>
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
