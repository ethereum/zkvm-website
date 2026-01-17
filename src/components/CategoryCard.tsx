import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Zap, Network, Shield, CheckCircle, LucideIcon } from 'lucide-react';
import { CategoryData } from '@/lib/track-types';

// Map icon names to components
const iconMap: Record<string, LucideIcon> = {
  'zap': Zap,
  'network': Network,
  'shield': Shield,
  'check-circle': CheckCircle
};

interface CategoryCardProps {
  category: CategoryData;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const Icon = iconMap[category.icon] || CheckCircle;

  // Calculate progress percentage
  const totalMilestones = category.milestones.length;
  const completedMilestones = category.milestones.filter(m => m.status === 'achieved').length;
  const progressPercent = totalMilestones > 0 ? (completedMilestones / totalMilestones) * 100 : 0;

  return (
    <Link href={`/track/${category.id}`}>
      <Card className="group h-full transition-all hover:shadow-lg">
        <CardHeader>
          <div className="mb-2 text-primary">
            <Icon className="h-8 w-8" />
          </div>
          <CardTitle className="flex items-center justify-between">
            {category.name}
            <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
          </CardTitle>
          <CardDescription className="text-base">
            {category.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">
                {completedMilestones}/{totalMilestones} milestones
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="text-xs text-muted-foreground">
              Last updated: {new Date(category.lastUpdated).toLocaleDateString()}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
