import Link from 'next/link';
import { trackData } from '@/data/track-data';
import { Network, Cpu, Zap, Shield, CheckCircle, LucideIcon } from 'lucide-react';

// Map icon names to components
const iconMap: Record<string, LucideIcon> = {
  'zap': Zap,
  'network': Network,
  'shield': Shield,
  'check-circle': CheckCircle
};

interface TrackSidebarProps {
  activeCategory?: string;
}

export default function TrackSidebar({ activeCategory }: TrackSidebarProps) {
  const sidebarItems = trackData.categories.map(cat => ({
    id: cat.id,
    name: cat.name,
    icon: iconMap[cat.icon] || CheckCircle,
    href: `/track/${cat.id}`,
  }));

  return (
    <aside className="w-52 md:w-60 border-r bg-muted/30 flex-shrink-0 overflow-y-auto">
      <div className="p-3 md:p-4">
        <Link href="/track" className="block">
          <h2 className="font-semibold text-sm md:text-lg mb-3 md:mb-4 hover:text-primary transition-colors">
            Track Progress
          </h2>
        </Link>
        <div className="flex flex-col space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeCategory === item.id;

            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-start gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-foreground text-left ${
                  isActive ? 'bg-muted font-medium' : 'hover:bg-muted'
                }`}
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
  );
}
