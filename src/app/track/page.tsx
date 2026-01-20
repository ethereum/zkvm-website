'use client';

import Link from 'next/link';
import { useState } from 'react';
import { trackData } from '@/data/track-data';
import RoadmapView from '@/components/RoadmapView';
import RoadmapGraph from '@/components/roadmap/RoadmapGraph';
import { Network, Cpu, Zap, Shield, CheckCircle, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

// Map icon names to components
const iconMap: Record<string, LucideIcon> = {
  'zap': Zap,
  'network': Network,
  'shield': Shield,
  'check-circle': CheckCircle
};

type ViewType = 'roadmap' | 'client-integration' | 'real-time-proving' | 'economic-security' | 'testing-validation';

export default function TrackPage() {
  const [activeView, setActiveView] = useState<ViewType>('roadmap');

  const sidebarItems = [
    { id: 'roadmap' as ViewType, name: 'Visual Roadmap', icon: Network },
    ...trackData.categories.map(cat => ({
      id: cat.id as ViewType,
      name: cat.name,
      icon: iconMap[cat.icon] || CheckCircle,
      href: `/track/${cat.id}`,
      milestones: cat.milestones,
    })),
  ];

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-52 md:w-60 border-r bg-muted/30 flex-shrink-0 overflow-y-auto">
        <div className="p-3 md:p-4">
          <h2 className="font-semibold text-sm md:text-lg mb-3 md:mb-4">Track Progress</h2>
          <nav className="flex flex-col space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-foreground",
                    isActive
                      ? "bg-muted font-medium"
                      : "hover:bg-muted"
                  )}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick Links */}
          <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t flex flex-col space-y-1">
            <Link
              href="/clients"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-muted transition-colors text-foreground"
            >
              <Network className="h-4 w-4 flex-shrink-0" />
              <span>All Clients</span>
            </Link>
            <Link
              href="/zkvms"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-muted transition-colors text-foreground"
            >
              <Cpu className="h-4 w-4 flex-shrink-0" />
              <span>All zkVMs</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">

        {activeView === 'roadmap' ? (
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
        ) : (
          <div className="p-6">
            {/* Category detail view - redirect to category page */}
            {(() => {
              const category = trackData.categories.find(c => c.id === activeView);
              if (!category) return null;

              return (
                <div className="max-w-4xl">
                  <div className="mb-6">
                    <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
                    <p className="text-muted-foreground">{category.description}</p>
                  </div>

                  <Link
                    href={`/track/${category.id}`}
                    className="inline-flex items-center gap-2 text-primary hover:underline"
                  >
                    View full details →
                  </Link>
                </div>
              );
            })()}
          </div>
        )}
      </main>
    </div>
  );
}
