"use client";

import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { zkevmData, clientData } from "@/data/zkevm-tracker";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, CheckCircle, XCircle, Clock, Github } from "lucide-react";
import Image from "next/image";

function ClientFavicon({ website, name }: { website?: string; name: string }) {
  if (!website) {
    return (
      <div className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ backgroundColor: 'var(--accent-blue)', color: 'var(--accent-btn-text)' }}>
        {name.slice(0, 2)}
      </div>
    );
  }
  const domain = new URL(website).hostname;
  return (
    <Image
      src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
      alt={name}
      width={40}
      height={40}
      className="w-10 h-10 rounded-lg flex-shrink-0"
    />
  );
}

function ReadinessCheck({ pass }: { pass: boolean }) {
  return pass ? (
    <CheckCircle className="w-5 h-5 text-green-600" />
  ) : (
    <XCircle className="w-5 h-5 text-red-500" />
  );
}

function ComplianceStatus({ status }: { status?: string }) {
  switch (status) {
    case 'compliant':
      return <Badge className="bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300">Spec Compliant</Badge>;
    case 'in-progress':
      return <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300">In Progress</Badge>;
    default:
      return <Badge className="bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">Not Started</Badge>;
  }
}

const tabs = [
  { id: "zkvm", label: "zkVM Readiness" },
  { id: "clients", label: "Ethereum Clients" },
] as const;

type TabId = typeof tabs[number]["id"];

export default function TrackPage() {
  const [activeTab, setActiveTab] = useState<TabId>("zkvm");
  const executionClients = clientData.filter(c => c.type === 'execution');
  const consensusClients = clientData.filter(c => c.type === 'consensus');

  return (
    <PageLayout
      title="Track Progress"
      description="Tracking the readiness of zkVM implementations and Ethereum client integration for ZK-based L1 scaling."
    >
      {/* Tabs */}
      <div className="flex gap-1 border-b border-border mb-16">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="px-6 py-4 text-lg font-bold transition-colors duration-300 relative hover:text-[var(--accent-orange)]"
            style={{
              color: activeTab === tab.id ? 'var(--accent-blue)' : undefined,
            }}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span
                className="absolute bottom-0 left-0 right-0 h-[2px]"
                style={{ backgroundColor: 'var(--accent-blue)' }}
              />
            )}
          </button>
        ))}
      </div>

      {/* zkVM Readiness Tab */}
      {activeTab === "zkvm" && (
        <>
          <section className="mb-24">
            <p className="text-muted-foreground mb-8">
              zkVMs under active consideration for Ethereum L1 integration. Only implementations
              meeting our{" "}
              <a href="#listing-criteria" className="text-[var(--accent-link)] hover:underline">
                inclusion criteria
              </a>{" "}
              are listed.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">zkVM</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">Open Source</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">ISA Compliance (RV64)</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">Real-Time Proving</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">Soundcalc Integration</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Links</th>
                  </tr>
                </thead>
                <tbody>
                  {zkevmData.map((zkvm) => {
                    const isRV64 = zkvm.architecture.startsWith('rv64');
                    return (
                      <tr key={zkvm.name} className="border-b border-border hover:bg-muted/30 transition-colors">
                        <td className="py-4 px-4">
                          <div>
                            <span className="font-semibold text-foreground">{zkvm.name}</span>
                            <div className="text-sm text-muted-foreground mt-0.5">
                              {zkvm.architecture}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <div className="flex justify-center">
                            <ReadinessCheck pass={zkvm.openSource} />
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <div className="flex flex-col items-center gap-1">
                            <ReadinessCheck pass={isRV64} />
                            <span className="text-xs text-muted-foreground">
                              {zkvm.testResults.passed}/{zkvm.testResults.total} tests
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <div className="flex justify-center">
                            <Clock className="w-5 h-5 text-orange-500" />
                          </div>
                          <span className="text-xs text-muted-foreground">TBD</span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <div className="flex justify-center">
                            <Clock className="w-5 h-5 text-orange-500" />
                          </div>
                          <span className="text-xs text-muted-foreground">TBD</span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <a
                              href={zkvm.links.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-foreground transition-colors"
                              title="GitHub"
                            >
                              <Github className="w-4 h-4" />
                            </a>
                            <a
                              href={zkvm.links.docs}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-foreground transition-colors"
                              title="Documentation"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-4 bg-muted/50 rounded-lg border border-border">
              <p className="text-sm text-muted-foreground">
                Detailed ISA compliance results are tracked on the{" "}
                <a
                  href="https://eth-act.github.io/zkevm-test-monitor/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent-link)] hover:underline inline-flex items-center gap-1"
                >
                  RISC-V Compliance Test Monitor <ExternalLink className="w-3 h-3" />
                </a>
                , which runs nightly against the latest RISC-V Architecture Tests v3.9.1.
              </p>
            </div>
          </section>

          {/* Inclusion Criteria */}
          <section id="listing-criteria" className="mb-24">
            <h2 className="text-2xl font-bold text-foreground mb-4">Inclusion Criteria</h2>
            <p className="text-muted-foreground mb-8">
              To be listed in the zkVM Readiness table, implementations must meet the following
              minimum criteria. This is a curated list — the team evaluates and updates these
              criteria as the project evolves.
            </p>
            <div className="grid sm:grid-cols-2 gap-x-16 gap-y-12">
              {[
                {
                  title: "Open Source",
                  description: "The zkVM must be released under a permissive open-source license. We link to the license for each listed project.",
                },
                {
                  title: "ISA Compliance (RV64IM minimum)",
                  description: "The zkVM must support the RISC-V 64-bit base integer instruction set with the multiply extension. This is verified via our compliance test suite.",
                },
                {
                  title: "Real-Time Proving",
                  description: "The ability to generate a proof for a full Ethereum block within slot time. Criteria for timing targets will evolve (e.g., P99 latency requirements).",
                },
                {
                  title: "Soundcalc Integration",
                  description: "Integration into the soundcalc framework for standardized verification and interoperability testing.",
                },
              ].map((criterion) => (
                <div key={criterion.title}>
                  <h3 className="text-xl font-bold text-foreground mb-3">{criterion.title}</h3>
                  <p className="text-sm text-muted-foreground">{criterion.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* External Dashboards */}
          <section className="mb-24">
            <h2 className="text-2xl font-bold text-foreground mb-4">External Dashboards</h2>
            <p className="text-muted-foreground mb-6">
              Detailed tracking data is maintained on external dashboards managed by the team.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <a
                href="https://eth-act.github.io/zkevm-test-monitor/"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-foreground">RISC-V Compliance Test Monitor</h3>
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Nightly ISA compliance test results across all zkVM implementations.
                      Tracks pass/fail rates for RISC-V Architecture Tests v3.9.1.
                    </p>
                  </CardContent>
                </Card>
              </a>
            </div>
          </section>
        </>
      )}

      {/* Ethereum Clients Tab */}
      {activeTab === "clients" && (
        <section>
          <p className="text-muted-foreground mb-8">
            Client teams working towards zkVM integration. High-level status of each client&apos;s
            readiness for ZK-based proving.
          </p>

          {/* Execution Layer */}
          <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--accent-blue)' }}>Execution Layer</h3>
          <div className="divide-y divide-border mb-12">
            {executionClients.map((client) => (
              <div key={client.name} className="py-6 px-4 -mx-4 rounded-lg hover:bg-muted/50 transition-colors flex items-start gap-4">
                <ClientFavicon website={client.links.website} name={client.name} />
                <div className="flex-1 min-w-0">
                  <h4 className="text-3xl font-bold text-foreground">{client.name}</h4>
                  <div className="flex items-center gap-2 mt-1 mb-1 flex-wrap">
                    <ComplianceStatus status={client.specCompliance} />
                    <Badge variant="outline" className="text-xs">{client.language}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground max-w-[700px]">{client.description}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 pt-1">
                  <a
                    href={client.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground hover:text-[var(--accent-orange)] transition-colors inline-flex items-center gap-1.5 border border-border rounded-md px-3 py-1.5"
                  >
                    <Github className="w-3.5 h-3.5" /> GitHub
                  </a>
                  {client.links.website && (
                    <a
                      href={client.links.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-muted-foreground hover:text-[var(--accent-orange)] transition-colors inline-flex items-center gap-1.5 border border-border rounded-md px-3 py-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Website
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Consensus Layer */}
          <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--accent-blue)' }}>Consensus Layer</h3>
          <div className="divide-y divide-border">
            {consensusClients.map((client) => (
              <div key={client.name} className="py-6 px-4 -mx-4 rounded-lg hover:bg-muted/50 transition-colors flex items-start gap-4">
                <ClientFavicon website={client.links.website} name={client.name} />
                <div className="flex-1 min-w-0">
                  <h4 className="text-3xl font-bold text-foreground">{client.name}</h4>
                  <div className="flex items-center gap-2 mt-1 mb-1 flex-wrap">
                    <ComplianceStatus status={client.specCompliance} />
                    <Badge variant="outline" className="text-xs">{client.language}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground max-w-[700px]">{client.description}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 pt-1">
                  <a
                    href={client.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground hover:text-[var(--accent-orange)] transition-colors inline-flex items-center gap-1.5 border border-border rounded-md px-3 py-1.5"
                  >
                    <Github className="w-3.5 h-3.5" /> GitHub
                  </a>
                  {client.links.website && (
                    <a
                      href={client.links.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-muted-foreground hover:text-[var(--accent-orange)] transition-colors inline-flex items-center gap-1.5 border border-border rounded-md px-3 py-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Website
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </PageLayout>
  );
}
