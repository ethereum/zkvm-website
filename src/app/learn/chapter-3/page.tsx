import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: 'Chapter 3: The Path to Production - Learn',
};

export default function Chapter3() {
  return (
    <div className="container mx-auto px-4 pb-16">
      <div className="mx-auto max-w-3xl">
        <Breadcrumbs items={[
          { label: 'Learn', href: '/learn' },
          { label: 'Chapter 3' }
        ]} />

        <div className="mt-8 mb-12">
          <div className="mb-4 text-sm font-medium text-muted-foreground">Chapter 3</div>
          <h1 className="mb-6 text-4xl font-bold">The Path to Production</h1>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="lead">
            Bringing zkEVMs to production on Ethereum L1 requires coordinated progress across
            multiple workstreams. This chapter outlines the roadmap and key milestones.
          </p>

          <h2>Coming Soon</h2>
          <p>
            Full content for this chapter is being developed. Topics will include:
          </p>
          <ul>
            <li>Roadmap overview across all workstreams</li>
            <li>Key milestones and dependencies</li>
            <li>Testing and validation requirements</li>
            <li>Deployment considerations</li>
          </ul>

          <div className="not-prose mt-8 rounded-lg bg-muted p-6">
            <p className="text-sm font-medium mb-2">Want more detail?</p>
            <p className="text-sm text-muted-foreground mb-4">
              See the Track section for real-time progress across all workstreams.
            </p>
            <Link href="/track">
              <Button variant="secondary">View Progress Tracker</Button>
            </Link>
          </div>
        </div>

        <div className="mt-12 flex justify-start">
          <Link href="/learn/chapter-2">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous: What ZKEVMs Can&apos;t Do
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
