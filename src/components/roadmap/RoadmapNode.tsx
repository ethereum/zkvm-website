'use client';

import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { RoadmapItem } from '@/lib/track-types';

interface RoadmapNodeProps {
  data: {
    item: RoadmapItem;
    onClick: () => void;
    direction?: 'LR' | 'TB';
  };
}

const statusBorderColors: Record<string, string> = {
  'complete': 'border-green-500',
  'in-progress': 'border-blue-500',
  'not-started': 'border-gray-400',
};

const RoadmapNode = memo(({ data }: RoadmapNodeProps) => {
  const { item, onClick, direction = 'LR' } = data;
  const statusBorder = statusBorderColors[item.status] || statusBorderColors['not-started'];

  // Handle positions based on layout direction
  const targetPosition = direction === 'TB' ? Position.Top : Position.Left;
  const sourcePosition = direction === 'TB' ? Position.Bottom : Position.Right;

  return (
    <div
      className={`bg-background border-3 rounded shadow-sm hover:shadow-md transition-all cursor-pointer w-[180px] ${statusBorder}`}
      style={{ borderWidth: '3px', zIndex: 10 }}
      onClick={onClick}
    >
      <Handle type="target" position={targetPosition} className="!bg-primary" />

      <div className="px-2 py-1.5">
        <span className="font-medium text-xs leading-tight block">
          {item.title}
        </span>
      </div>

      <Handle type="source" position={sourcePosition} className="!bg-primary" />
    </div>
  );
});

RoadmapNode.displayName = 'RoadmapNode';

export default RoadmapNode;
