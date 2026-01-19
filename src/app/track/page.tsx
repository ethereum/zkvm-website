import { trackData } from '@/data/track-data';
import CategoryCard from '@/components/CategoryCard';
import RoadmapView from '@/components/RoadmapView';

export const metadata = {
  title: 'Track Progress - zkEVM Initiative',
  description: 'Real-time progress tracking across all zkEVM workstreams and milestones',
};

export default function TrackPage() {
  return (
    <div className="container mx-auto px-4 pb-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-4 text-4xl font-bold">Track Progress</h1>
        <p className="mb-12 text-lg text-muted-foreground">
          Real-time tracking of progress across all workstreams, client implementations,
          and measurable milestones.
        </p>

        {/* Category Cards Grid */}
        <div className="mb-12 grid gap-6 md:grid-cols-2">
          {trackData.categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

        {/* Strategic Roadmap */}
        <RoadmapView items={trackData.roadmap} clients={trackData.clients} zkvms={trackData.zkvms} />
      </div>
    </div>
  );
}
