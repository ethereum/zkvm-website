import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import { trackData } from '@/data/track-data';
import Breadcrumbs from '@/components/Breadcrumbs';
import MilestoneChecklist from '@/components/MilestoneChecklist';
import { ClientProgressCard } from '@/components/track/ClientProgressCard';
import { ZKVMComparisonTable } from '@/components/track/ZKVMComparisonTable';
import AuditStatus from '@/components/track/AuditStatus';
import DependencyGraph from '@/components/track/DependencyGraph';

// Dynamic imports for chart components (reduces initial bundle)
const BenchmarkChart = dynamic(() => import('@/components/track/BenchmarkChart'), {
  loading: () => (
    <div className="rounded-lg border p-8 text-center">
      <p className="text-sm text-muted-foreground">Loading performance data...</p>
    </div>
  )
});

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export function generateStaticParams() {
  return trackData.categories.map((category) => ({
    category: category.id,
  }));
}

export function generateMetadata({ params }: CategoryPageProps) {
  const category = trackData.categories.find(c => c.id === params.category);

  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `${category.name} - Track Progress`,
    description: category.description,
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = trackData.categories.find(c => c.id === params.category);

  if (!category) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 pb-16">
      <div className="mx-auto max-w-4xl">
        <Breadcrumbs items={[
          { label: 'Track', href: '/track' },
          { label: category.name }
        ]} />

        <div className="mt-8 mb-12">
          <h1 className="mb-4 text-4xl font-bold">{category.name}</h1>
          <p className="text-lg text-muted-foreground">{category.description}</p>
          {category.workstream && (
            <div className="mt-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              Workstream {category.workstream}
            </div>
          )}
        </div>

        <div className="space-y-8">
          <MilestoneChecklist milestones={category.milestones} />

          {/* Benchmarks for real-time-proving */}
          {category.id === 'real-time-proving' && category.benchmarks && (
            <BenchmarkChart benchmarks={category.benchmarks} />
          )}

          {/* Dependency graph for client-integration */}
          {category.id === 'client-integration' && category.dependencyGraph && (
            <DependencyGraph graph={category.dependencyGraph} />
          )}

          {/* Client Integration - Ethereum Clients */}
          {category.id === 'client-integration' && category.clients && (
            <div className="space-y-6">
              <div className="border-t pt-8">
                <h2 className="text-2xl font-bold mb-2">Ethereum Clients</h2>
                <p className="text-muted-foreground mb-6">
                  Tracking readiness of execution and consensus clients for zkEVM integration
                </p>

                {/* Execution Clients */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Execution Clients</h3>
                  <div className="space-y-3">
                    {category.clients
                      .filter(client => client.type === 'execution')
                      .map(client => (
                        <ClientProgressCard key={client.name} client={client} />
                      ))}
                  </div>
                </div>

                {/* Consensus Clients */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Consensus Clients</h3>
                  <div className="space-y-3">
                    {category.clients
                      .filter(client => client.type === 'consensus')
                      .map(client => (
                        <ClientProgressCard key={client.name} client={client} />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Testing & Validation - zkVM Implementations */}
          {category.id === 'testing-validation' && category.zkvmImplementations && (
            <div className="space-y-6">
              <div className="border-t pt-8">
                <h2 className="text-2xl font-bold mb-2">zkVM Implementations</h2>
                <p className="text-muted-foreground mb-6">
                  Comparison of zero-knowledge virtual machine implementations and their test results
                </p>
                <ZKVMComparisonTable implementations={category.zkvmImplementations} />
              </div>
            </div>
          )}

          {/* Audit status for economic-security */}
          {category.id === 'economic-security' && (
            <AuditStatus
              audits={category.audits}
              researchPapers={category.researchPapers}
            />
          )}

          {/* Placeholder for other categories */}
          {category.id !== 'client-integration' &&
           category.id !== 'testing-validation' &&
           category.id !== 'real-time-proving' &&
           category.id !== 'economic-security' && (
            <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
              <p className="text-sm">Additional visualizations coming soon</p>
              <p className="mt-2 text-xs">
                Charts, graphs, and detailed metrics will be added here
              </p>
            </div>
          )}
        </div>

        <div className="mt-8 text-sm text-muted-foreground">
          Last updated: {new Date(category.lastUpdated).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
