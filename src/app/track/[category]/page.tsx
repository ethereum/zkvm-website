import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import { trackData } from '@/data/track-data';
import { zkvmSecurityData } from '@/data/zkvm-security';
import MilestoneChecklist from '@/components/MilestoneChecklist';
import TrackSidebar from '@/components/track/TrackSidebar';
import { ClientProgressCard } from '@/components/track/ClientProgressCard';
import { ZKVMComparisonTable } from '@/components/track/ZKVMComparisonTable';
import ClientCard from '@/components/ClientCard';
import AuditStatus from '@/components/track/AuditStatus';
import DependencyGraph from '@/components/track/DependencyGraph';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { FlaskConical, ChevronRight } from 'lucide-react';

// Dynamic imports for chart components (reduces initial bundle)
const BenchmarkChart = dynamic(() => import('@/components/track/BenchmarkChart'), {
  loading: () => (
    <div className="rounded-lg border p-8 text-center">
      <p className="text-sm text-muted-foreground">Loading performance data...</p>
    </div>
  )
});

const OpcodePricingTable = dynamic(() => import('@/components/track/OpcodePricingTable'), {
  loading: () => (
    <div className="rounded-lg border p-8 text-center">
      <p className="text-sm text-muted-foreground">Loading opcode pricing data...</p>
    </div>
  )
});

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export function generateStaticParams() {
  return trackData.categories.map((category) => ({
    category: category.id,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category: categoryId } = await params;
  const category = trackData.categories.find(c => c.id === categoryId);

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

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categoryId } = await params;
  const category = trackData.categories.find(c => c.id === categoryId);

  if (!category) {
    notFound();
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      <TrackSidebar activeCategory={categoryId} />

      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-8 pb-16">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8">
              <h1 className="mb-4 text-3xl font-bold">{category.name}</h1>
              <p className="text-lg text-muted-foreground">{category.description}</p>
              {category.workstream && (
                <div className="mt-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  Workstream {category.workstream}
                </div>
              )}
            </div>

            <div className="space-y-8">
          {/* Testing & Validation - zkVM Comparison Table at top */}
          {category.id === 'testing-validation' && (
            <ZKVMComparisonTable implementations={zkvmSecurityData} />
          )}

          {/* Monitors section link for testing-validation */}
          {category.id === 'testing-validation' && (
            <div id="monitors" className="space-y-4 scroll-mt-8">
              <h2 className="text-xl font-semibold">Monitors</h2>
              <Link
                href="/track/monitors"
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <FlaskConical className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">RISC-V Compliance Test Monitor</div>
                    <div className="text-sm text-muted-foreground">
                      View automated compliance testing results
                    </div>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            </div>
          )}

          {/* Show milestones for other categories */}
          {category.id !== 'testing-validation' && (
            <MilestoneChecklist milestones={category.milestones} />
          )}

          {/* Tabbed interface for real-time-proving */}
          {category.id === 'real-time-proving' && (category.benchmarks || category.opcodeRepricings) && (
            <Tabs defaultValue="benchmarks" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="benchmarks">Performance Benchmarks</TabsTrigger>
                <TabsTrigger value="repricing">Gas Repricing</TabsTrigger>
              </TabsList>
              <TabsContent value="benchmarks" className="mt-6">
                {category.benchmarks && <BenchmarkChart benchmarks={category.benchmarks} />}
              </TabsContent>
              <TabsContent value="repricing" className="mt-6">
                {category.opcodeRepricings && <OpcodePricingTable repricings={category.opcodeRepricings} />}
              </TabsContent>
            </Tabs>
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

          {/* Client Integration - Client Progress Cards */}
          {category.id === 'client-integration' && trackData.clients && trackData.clients.length > 0 && (
            <div className="space-y-6">
              <div className="border-t pt-8">
                <h2 className="text-2xl font-bold mb-2">Client Integration Progress</h2>
                <p className="text-muted-foreground mb-6">
                  Track milestone completion and zkEVM readiness for each Ethereum client
                </p>

                {/* Execution Clients */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">Execution Layer Clients</h3>
                  <div className="grid gap-6 md:grid-cols-2">
                    {trackData.clients
                      .filter(client => client.type === 'execution')
                      .map(client => (
                        <ClientCard key={client.id} client={client} />
                      ))}
                  </div>
                </div>

                {/* Consensus Clients */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Consensus Layer Clients</h3>
                  <div className="grid gap-6 md:grid-cols-2">
                    {trackData.clients
                      .filter(client => client.type === 'consensus')
                      .map(client => (
                        <ClientCard key={client.id} client={client} />
                      ))}
                  </div>
                </div>
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
      </main>
    </div>
  );
}
