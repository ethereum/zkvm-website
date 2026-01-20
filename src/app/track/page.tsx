import { trackData } from '@/data/track-data';
import RoadmapView from '@/components/RoadmapView';
import RoadmapGraph from '@/components/roadmap/RoadmapGraph';
import TrackSidebar from '@/components/track/TrackSidebar';

export default function TrackPage() {
  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      <TrackSidebar />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="h-full flex flex-col">
          {/* Roadmap visualization */}
          <div className="flex-1 min-h-[500px]">
            <RoadmapGraph items={trackData.roadmap} />
          </div>

          {/* Strategic Roadmap text view */}
          <div className="p-6 border-t">
            <RoadmapView
              items={trackData.roadmap}
              clients={trackData.clients}
              zkvms={trackData.zkvms}
              commonExecutionMilestones={trackData.commonExecutionMilestones}
              commonConsensusMilestones={trackData.commonConsensusMilestones}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
