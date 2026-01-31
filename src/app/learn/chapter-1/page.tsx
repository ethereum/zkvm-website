import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: 'Chapter 1: Provers, Builders, and Validators - Learn',
};

export default function Chapter1() {
  return (
    <div className="container mx-auto px-4 pb-16">
      <div className="mx-auto max-w-3xl">
        <Breadcrumbs items={[
          { label: 'Learn', href: '/learn' },
          { label: 'Chapter 1' }
        ]} />

        <div className="mt-8 mb-12">
          <div className="mb-4 text-sm font-medium text-muted-foreground">Chapter 1</div>
          <h1 className="mb-6 text-4xl font-bold">Provers, Builders, and Validators</h1>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="lead">
            Understanding how provers, builders, and validators interact is key to grasping
            the zkEVM architecture and its integration into Ethereum.
          </p>

          <h2>Coming Soon</h2>
          <p>
            Full content for this chapter is being developed. Topics will include:
          </p>
          <ul>
            <li>How these actors interact in the zkEVM architecture</li>
            <li>The proving flow: block creation → proof generation → verification</li>
            <li>Protocol integration points</li>
            <li>Separation of concerns and responsibilities</li>
          </ul>
        </div>

        <div className="mt-12 flex justify-between">
          <Link href="/learn/chapter-0">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous: What is ZK L1 Scaling?
            </Button>
          </Link>
          <Link href="/learn/chapter-2">
            <Button>
              Next: What ZKEVMs Can&apos;t Do
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
