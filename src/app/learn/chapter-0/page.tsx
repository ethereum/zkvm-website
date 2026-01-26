import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: 'Chapter 0: What is ZK L1 Scaling? - Learn',
};

export default function Chapter0() {
  return (
    <div className="container mx-auto px-4 pb-16">
      <div className="mx-auto max-w-3xl">
        <Breadcrumbs items={[
          { label: 'Learn', href: '/learn' },
          { label: 'Chapter 0' }
        ]} />

        <div className="mt-8 mb-12">
          <div className="mb-4 text-sm font-medium text-muted-foreground">Chapter 0</div>
          <h1 className="mb-6 text-4xl font-bold">What is ZK L1 Scaling?</h1>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="lead">
            Zero-knowledge proofs enable Ethereum to scale while preserving its core properties
            of decentralization and security. This chapter introduces the fundamental concepts
            behind bringing zkEVMs to Layer 1.
          </p>

          <h2>Coming Soon</h2>
          <p>
            Full content for this chapter is being developed. Check back soon for:
          </p>
          <ul>
            <li>The basic concept of ZK proofs on Ethereum L1</li>
            <li>Why Ethereum needs this scaling approach</li>
            <li>High-level benefits and tradeoffs</li>
            <li>How ZK proofs enable stateless verification</li>
          </ul>
        </div>

        <div className="mt-12 flex justify-end">
          <Link href="/learn/chapter-1">
            <Button>
              Next: Provers, Builders, and Validators
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
