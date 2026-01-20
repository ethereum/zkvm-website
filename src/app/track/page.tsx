import Link from 'next/link';
import { trackData } from '@/data/track-data';
import CategoryCard from '@/components/CategoryCard';
import RoadmapView from '@/components/RoadmapView';
import { Network, Cpu, ArrowRight, GitBranch } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Track Progress - zkEVM Initiative',
  description: 'Real-time progress tracking across all zkEVM workstreams and milestones',
};

export default function TrackPage() {
  return (
    <div className="container mx-auto px-4 pb-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-4 text-4xl font-bold">Track Progress</h1>
        <p className="mb-8 text-lg text-muted-foreground">
          Real-time tracking of progress across all workstreams, client implementations,
          and measurable milestones.
        </p>

        {/* Quick Navigation to Clients and zkVMs */}
        <div className="mb-12 flex flex-wrap gap-4">
          <Link href="/clients">
            <Button variant="outline" className="group">
              <Network className="mr-2 h-4 w-4" />
              View All Clients
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link href="/zkvms">
            <Button variant="outline" className="group">
              <Cpu className="mr-2 h-4 w-4" />
              View All zkVMs
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link href="/roadmap-visual">
            <Button variant="outline" className="group">
              <GitBranch className="mr-2 h-4 w-4" />
              Visualize Roadmap
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Category Cards Grid */}
        <div className="mb-12 grid gap-6 md:grid-cols-2">
          {trackData.categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

        {/* Strategic Roadmap */}
        <RoadmapView
          items={trackData.roadmap}
          clients={trackData.clients}
          zkvms={trackData.zkvms}
          commonExecutionMilestones={trackData.commonExecutionMilestones}
          commonConsensusMilestones={trackData.commonConsensusMilestones}
        />
      </div>
    </div>
  );
}
