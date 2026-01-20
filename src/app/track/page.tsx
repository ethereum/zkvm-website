import Link from 'next/link';
import { trackData } from '@/data/track-data';
import RoadmapView from '@/components/RoadmapView';
import RoadmapGraph from '@/components/roadmap/RoadmapGraph';
import { Network, Cpu, Zap, Shield, CheckCircle, LucideIcon } from 'lucide-react';

// Map icon names to components
const iconMap: Record<string, LucideIcon> = {
  'zap': Zap,
  'network': Network,
  'shield': Shield,
  'check-circle': CheckCircle
};

export default function TrackPage() {
  const sidebarItems = trackData.categories.map(cat => ({
    id: cat.id,
    name: cat.name,
    icon: iconMap[cat.icon] || CheckCircle,
    href: `/track/${cat.id}`,
  }));

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-52 md:w-60 border-r bg-muted/30 flex-shrink-0 overflow-y-auto">
        <div className="p-3 md:p-4">
          <h2 className="font-semibold text-sm md:text-lg mb-3 md:mb-4">Track Progress</h2>
          <div className="flex flex-col space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className="flex items-start gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-foreground text-left hover:bg-muted"
                >
                  <Icon className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}

            {/* Divider */}
            <div className="border-t my-3" />

            <Link
              href="/clients"
              className="flex items-start gap-3 px-3 py-2 rounded-lg text-sm hover:bg-muted transition-colors text-foreground text-left"
            >
              <Network className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <span>All Clients</span>
            </Link>
            <Link
              href="/zkvms"
              className="flex items-start gap-3 px-3 py-2 rounded-lg text-sm hover:bg-muted transition-colors text-foreground text-left"
            >
              <Cpu className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <span>All zkVMs</span>
            </Link>
          </div>
        </div>
      </aside>

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
