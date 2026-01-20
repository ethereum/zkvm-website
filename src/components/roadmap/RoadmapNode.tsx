'use client';

import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { RoadmapItem } from '@/lib/track-types';
import { Calendar } from 'lucide-react';

interface RoadmapNodeProps {
  data: {
    item: RoadmapItem;
    onClick: () => void;
  };
}

const categoryColors: Record<string, string> = {
  'client-integration': 'border-l-purple-500',
  'real-time-proving': 'border-l-blue-500',
  'economic-security': 'border-l-green-500',
  'testing-validation': 'border-l-yellow-500',
};

const statusColors: Record<string, string> = {
  'complete': 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200',
  'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200',
  'not-started': 'bg-gray-100 text-gray-800 dark:bg-gray-950 dark:text-gray-200',
};

const RoadmapNode = memo(({ data }: RoadmapNodeProps) => {
  const { item, onClick } = data;
  const categoryColor = categoryColors[item.category] || 'border-l-gray-500';
  const statusColor = statusColors[item.status] || statusColors['not-started'];

  return (
    <div
      className={`bg-card border-2 border-l-4 ${categoryColor} rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer w-[280px]`}
      onClick={onClick}
    >
      <Handle type="target" position={Position.Top} className="!bg-primary" />

      <div className="p-3 space-y-2">
        {/* Title */}
        <h3 className="font-semibold text-sm leading-tight line-clamp-2">
          {item.title}
        </h3>

        {/* Status Badge */}
        <div className="flex items-center gap-2">
          <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${statusColor}`}>
            {item.status.replace('-', ' ')}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs text-muted-foreground line-clamp-2">
          {item.description}
        </p>

        {/* Target Date */}
        {item.targetDate && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{item.targetDate}</span>
          </div>
        )}

        {/* Dependency Count */}
        {item.dependencies && item.dependencies.length > 0 && (
          <div className="text-xs text-muted-foreground">
            {item.dependencies.length} {item.dependencies.length === 1 ? 'dependency' : 'dependencies'}
          </div>
        )}
      </div>

      <Handle type="source" position={Position.Bottom} className="!bg-primary" />
    </div>
  );
});

RoadmapNode.displayName = 'RoadmapNode';

export default RoadmapNode;
