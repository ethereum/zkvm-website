import Link from 'next/link';
import { ArrowRight, BookOpen, Activity, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const navigationCards = [
  {
    title: 'Learn How It Works',
    description: 'Comprehensive educational content explaining ZK L1 scaling, prover architecture, and technical foundations',
    href: '/learn',
    icon: BookOpen,
    iconColor: 'text-blue-600'
  },
  {
    title: 'Track Progress',
    description: 'Real-time progress tracking across all workstreams, client implementations, and measurable milestones',
    href: '/track',
    icon: Activity,
    iconColor: 'text-green-600'
  },
  {
    title: 'Read Blog',
    description: 'Technical deep-dives, research updates, and insights from the zkEVM development community',
    href: '/blog',
    icon: FileText,
    iconColor: 'text-purple-600'
  }
];

export default function NavigationCards() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {navigationCards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.href} className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardHeader>
              <div className={`mb-2 transition-transform duration-300 group-hover:scale-110 ${card.iconColor}`}>
                <Icon className="h-8 w-8" />
              </div>
              <CardTitle className="text-xl">{card.title}</CardTitle>
              <CardDescription className="text-base">
                {card.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={card.href}>
                <Button variant="ghost" className="group-hover:bg-accent transition-colors duration-300">
                  Explore
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
