import { trackData } from '@/data/track-data';
import RoadmapGraph from '@/components/roadmap/RoadmapGraph';

export const metadata = {
  title: 'Roadmap Visualization - zkEVM Initiative',
  description: 'Visual representation of zkEVM roadmap with dependency relationships',
};

export default function RoadmapVisualPage() {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <RoadmapGraph items={trackData.roadmap} />
    </div>
  );
}
