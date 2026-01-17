import { notFound } from 'next/navigation';
import { trackData } from '@/data/track-data';
import Breadcrumbs from '@/components/Breadcrumbs';
import MilestoneChecklist from '@/components/MilestoneChecklist';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export function generateStaticParams() {
  return trackData.categories.map((category) => ({
    category: category.id,
  }));
}

export function generateMetadata({ params }: CategoryPageProps) {
  const category = trackData.categories.find(c => c.id === params.category);

  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `${category.name} - Track Progress`,
    description: category.description,
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = trackData.categories.find(c => c.id === params.category);

  if (!category) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 pb-16">
      <div className="mx-auto max-w-4xl">
        <Breadcrumbs items={[
          { label: 'Track', href: '/track' },
          { label: category.name }
        ]} />

        <div className="mt-8 mb-12">
          <h1 className="mb-4 text-4xl font-bold">{category.name}</h1>
          <p className="text-lg text-muted-foreground">{category.description}</p>
          {category.workstream && (
            <div className="mt-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              Workstream {category.workstream}
            </div>
          )}
        </div>

        <div className="space-y-8">
          <MilestoneChecklist milestones={category.milestones} />

          {/* Placeholder for additional visualizations */}
          <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
            <p className="text-sm">Additional visualizations coming soon</p>
            <p className="mt-2 text-xs">
              Charts, graphs, and detailed metrics will be added here
            </p>
          </div>
        </div>

        <div className="mt-8 text-sm text-muted-foreground">
          Last updated: {new Date(category.lastUpdated).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
