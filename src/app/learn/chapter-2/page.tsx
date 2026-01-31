import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: 'Chapter 2: What ZKEVMs Can&apos;t Do - Learn',
};

export default function Chapter2() {
  return (
    <div className="container mx-auto px-4 pb-16">
      <div className="mx-auto max-w-3xl">
        <Breadcrumbs items={[
          { label: 'Learn', href: '/learn' },
          { label: 'Chapter 2' }
        ]} />

        <div className="mt-8 mb-12">
          <div className="mb-4 text-sm font-medium text-muted-foreground">Chapter 2</div>
          <h1 className="mb-6 text-4xl font-bold">What ZKEVMs Can&apos;t Do</h1>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="lead">
            Every technology has constraints. Understanding the limitations of zkEVMs is
            as important as understanding their capabilities.
          </p>

          <h2>Coming Soon</h2>
          <p>
            Full content for this chapter is being developed. Topics will include:
          </p>
          <ul>
            <li>Technical limitations and constraints</li>
            <li>Performance boundaries (latency, throughput)</li>
            <li>Economic and security considerations</li>
            <li>Tradeoffs and design choices</li>
          </ul>
        </div>

        <div className="mt-12 flex justify-between">
          <Link href="/learn/chapter-1">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous: Provers, Builders, and Validators
            </Button>
          </Link>
          <Link href="/learn/chapter-3">
            <Button>
              Next: The Path to Production
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
