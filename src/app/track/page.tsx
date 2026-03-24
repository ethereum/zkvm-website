import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { zkevmData, clientData } from "@/data/zkevm-tracker";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, CheckCircle, XCircle, Clock, Github } from "lucide-react";

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

export default function TrackPage() {
  const executionClients = clientData.filter(c => c.type === 'execution');
  const consensusClients = clientData.filter(c => c.type === 'consensus');

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-[1200px] mx-auto px-4">

          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Track Progress</h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Tracking the readiness of zkVM implementations and Ethereum client integration
              for ZK-based L1 scaling.
            </p>
          </div>

          {/* ZKVM Readiness Table */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-2">zkVM Readiness</h2>
            <p className="text-muted-foreground mb-6">
              zkVMs under active consideration for Ethereum L1 integration. Only implementations
              meeting our{" "}
              <a href="#listing-criteria" className="text-[#0C9FDE] hover:underline">
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

            {/* External Dashboard Link */}
            <div className="mt-4 p-4 bg-muted/50 rounded-lg border border-border">
              <p className="text-sm text-muted-foreground">
                Detailed ISA compliance results are tracked on the{" "}
                <a
                  href="https://eth-act.github.io/zkevm-test-monitor/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0C9FDE] hover:underline inline-flex items-center gap-1"
                >
                  RISC-V Compliance Test Monitor <ExternalLink className="w-3 h-3" />
                </a>
                , which runs nightly against the latest RISC-V Architecture Tests v3.9.1.
              </p>
            </div>
          </section>

          {/* Listing Criteria */}
          <section id="listing-criteria" className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">Inclusion Criteria</h2>
            <p className="text-muted-foreground mb-6">
              To be listed in the zkVM Readiness table, implementations must meet the following
              minimum criteria. This is a curated list — the team evaluates and updates these
              criteria as the project evolves.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
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
                <Card key={criterion.title}>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-2">{criterion.title}</h3>
                    <p className="text-sm text-muted-foreground">{criterion.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Ethereum Clients */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-2">Ethereum Clients</h2>
            <p className="text-muted-foreground mb-6">
              Client teams working towards zkVM integration. High-level status of each client&apos;s
              readiness for ZK-based proving.
            </p>

            {/* Execution Layer */}
            <h3 className="text-xl font-semibold text-foreground mb-4">Execution Layer</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {executionClients.map((client) => (
                <Card key={client.name} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-foreground">{client.name}</h4>
                      <ComplianceStatus status={client.specCompliance} />
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{client.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">{client.language}</Badge>
                      <div className="flex items-center gap-2">
                        <a
                          href={client.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                        {client.links.website && (
                          <a
                            href={client.links.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Consensus Layer */}
            <h3 className="text-xl font-semibold text-foreground mb-4">Consensus Layer</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {consensusClients.map((client) => (
                <Card key={client.name} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-foreground">{client.name}</h4>
                      <ComplianceStatus status={client.specCompliance} />
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{client.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">{client.language}</Badge>
                      <div className="flex items-center gap-2">
                        <a
                          href={client.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                        {client.links.website && (
                          <a
                            href={client.links.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* External Resources */}
          <section className="mb-16">
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
                <Card className="hover:shadow-md transition-shadow h-full">
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
              {/* Placeholder for Ignacio's dashboard when available */}
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
}
