import { trackData } from '@/data/track-data';
import RoadmapGraph from '@/components/roadmap/RoadmapGraph';

export const metadata = {
  title: 'Roadmap Visualization - zkEVM Initiative',
  description: 'Visual representation of zkEVM roadmap with dependency relationships',
};

export default function RoadmapVisualPage() {
  return (
    <div className="container mx-auto px-4 pb-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-bold">Roadmap Visualization</h1>
          <p className="text-lg text-muted-foreground">
            Interactive view of the zkEVM roadmap showing dependencies and progress across all workstreams.
          </p>
        </div>

        <RoadmapGraph items={trackData.roadmap} />
      </div>
    </div>
  );
}
