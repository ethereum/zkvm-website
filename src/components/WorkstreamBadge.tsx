import { Badge } from '@/components/ui/badge';
import { WorkstreamType } from '@/lib/types';

interface WorkstreamBadgeProps {
  workstream: WorkstreamType;
}

const workstreamConfig: Record<WorkstreamType, { label: string; color: string }> = {
  'real-time-proving': {
    label: 'Real-Time Proving',
    color: 'bg-blue-100 text-blue-800'
  },
  'client-integration': {
    label: 'Client Integration',
    color: 'bg-green-100 text-green-800'
  },
  'economic-security': {
    label: 'Economic & Security',
    color: 'bg-purple-100 text-purple-800'
  },
  'testing-validation': {
    label: 'Testing & Validation',
    color: 'bg-orange-100 text-orange-800'
  }
};

export default function WorkstreamBadge({ workstream }: WorkstreamBadgeProps) {
  const config = workstreamConfig[workstream];

  return (
    <Badge variant="secondary" className={`${config.color} font-medium`}>
      {config.label}
    </Badge>
  );
}
