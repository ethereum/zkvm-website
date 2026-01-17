import Link from 'next/link';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

const chapters = [
  {
    number: 0,
    title: 'What is ZK L1 Scaling?',
    description: 'The basic concept of ZK proofs on Ethereum L1, why Ethereum needs this scaling approach, and high-level benefits and tradeoffs',
    href: '/learn/chapter-0'
  },
  {
    number: 1,
    title: 'Provers, Builders, and Validators',
    description: 'How these actors interact in the zkEVM architecture, the proving flow, and protocol integration points',
    href: '/learn/chapter-1'
  },
  {
    number: 2,
    title: 'What ZKEVMs Can\'t Do',
    description: 'Technical limitations and constraints, performance boundaries, and economic considerations',
    href: '/learn/chapter-2'
  },
  {
    number: 3,
    title: 'The Path to Production',
    description: 'Roadmap overview, key milestones and dependencies, and timeline considerations',
    href: '/learn/chapter-3'
  }
];

export default function LearnPage() {
  return (
    <div className="container mx-auto px-4 pb-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-4 text-4xl font-bold">Learn How It Works</h1>
        <p className="mb-12 text-lg text-muted-foreground">
          A guided introduction to ZK L1 scaling, from foundational concepts to production roadmap.
        </p>

        <div className="space-y-4">
          {chapters.map((chapter) => (
            <Link key={chapter.number} href={chapter.href}>
              <Card className="transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-lg font-bold text-primary">
                      {chapter.number}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="flex items-center justify-between">
                        {chapter.title}
                        <ArrowRight className="h-5 w-5 text-muted-foreground" />
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {chapter.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
