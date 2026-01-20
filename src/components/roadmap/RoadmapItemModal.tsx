'use client';

import { RoadmapItem } from '@/lib/track-types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Calendar, Link2 } from 'lucide-react';

interface RoadmapItemModalProps {
  item: RoadmapItem;
  isOpen: boolean;
  onClose: () => void;
}

const categoryNames: Record<string, string> = {
  'client-integration': 'Client Integration',
  'real-time-proving': 'Benchmarks',
  'economic-security': 'Economic Security',
  'testing-validation': 'Testing & Validation',
};

const statusColors: Record<string, string> = {
  'complete': 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200',
  'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200',
  'not-started': 'bg-gray-100 text-gray-800 dark:bg-gray-950 dark:text-gray-200',
};

export default function RoadmapItemModal({ item, isOpen, onClose }: RoadmapItemModalProps) {
  const statusColor = statusColors[item.status] || statusColors['not-started'];
  const categoryName = categoryNames[item.category] || item.category;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">{item.title}</DialogTitle>
          <DialogDescription>{categoryName}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Status Badge */}
          <div>
            <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusColor}`}>
              {item.status.replace('-', ' ')}
            </span>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-semibold mb-2">Description</h4>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            {item.targetDate && (
              <div>
                <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                  <Calendar className="h-4 w-4" />
                  <span className="font-medium">Target Date</span>
                </div>
                <p>{item.targetDate}</p>
              </div>
            )}

            {item.dependencies && item.dependencies.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                  <Link2 className="h-4 w-4" />
                  <span className="font-medium">Dependencies</span>
                </div>
                <p>{item.dependencies.length} item{item.dependencies.length !== 1 ? 's' : ''}</p>
              </div>
            )}
          </div>

          {/* Related Clients */}
          {item.relatedClients && item.relatedClients.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold mb-2">Related Clients</h4>
              <div className="flex flex-wrap gap-2">
                {item.relatedClients.map((clientId) => (
                  <span
                    key={clientId}
                    className="inline-block rounded-full bg-muted px-3 py-1 text-xs font-medium"
                  >
                    {clientId}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Related Guest Programs */}
          {item.relatedGuestPrograms && item.relatedGuestPrograms.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold mb-2">Related Guest Programs</h4>
              <div className="flex flex-wrap gap-2">
                {item.relatedGuestPrograms.map((gpId) => (
                  <span
                    key={gpId}
                    className="inline-block rounded-full bg-muted px-3 py-1 text-xs font-medium"
                  >
                    {gpId}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Common Milestones */}
          {item.commonMilestoneIds && item.commonMilestoneIds.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold mb-2">Milestones</h4>
              <div className="space-y-1">
                {item.commonMilestoneIds.map((milestoneId) => (
                  <div
                    key={milestoneId}
                    className="text-sm text-muted-foreground"
                  >
                    • {milestoneId}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dependencies List */}
          {item.dependencies && item.dependencies.length > 0 && (
            <div className="pt-4 border-t">
              <h4 className="text-sm font-semibold mb-2">Depends On</h4>
              <ul className="space-y-1">
                {item.dependencies.map((depId) => (
                  <li key={depId} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="text-primary">→</span>
                    {depId}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
