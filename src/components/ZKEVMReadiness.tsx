import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { zkevmData } from "@/data/zkevm-tracker";
import { Badge } from "@/components/ui/badge";
import { ZKEVMData } from "@/lib/types";

const ZKEVMReadiness = () => {
  // Show only top 2 Testing ZKVMs on homepage (curated subset)
  const featuredZKVMs = zkevmData
    .filter(zkvm => zkvm.status === 'Testing')
    .sort((a, b) => b.testResults.percentage - a.testResults.percentage) // Sort by test percentage descending
    .slice(0, 2); // Show only top 2 highest scoring ZKVMs

  const renderCriteriaValue = (zkvm: ZKEVMData, criterionName: string) => {
    switch (criterionName) {
      case "Test Results":
        return (
          <div className="flex items-center gap-3">
            <span className="font-medium text-green-600">
              {zkvm.testResults.passed}/{zkvm.testResults.total}
            </span>
            <span className="text-sm text-gray-500">
              ({zkvm.testResults.percentage.toFixed(1)}%)
            </span>
            {zkvm.securityTests && (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="icon-pass">
                <path d="M20 6 9 17l-5-5"/>
              </svg>
            )}
          </div>
        );
      case "Open Source":
        return zkvm.openSource ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="icon-pass">
            <path d="M20 6 9 17l-5-5"/>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="icon-fail">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        );
      case "Supported Clients":
        return (
          <div className="flex flex-wrap gap-2">
            {zkvm.supportedClients.length > 0 ? (
              zkvm.supportedClients.map((client) => (
                <Badge key={client.name} variant="secondary" className={`${client.color} font-medium whitespace-nowrap`}>
                  {client.name}
                </Badge>
              ))
            ) : (
              <Badge variant="secondary" className="bg-red-100 text-red-800 font-medium whitespace-nowrap">
                None
              </Badge>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="zkevm-readiness" className="section" style={{paddingTop: '10rem', borderTop: '1px solid var(--border-color)'}}>
      <div className="section-title">
        <h2 style={{fontSize: '2.5rem', fontWeight: 700}}>zkEVM Mainnet Readiness</h2>
        <p>Evaluating core zkEVM implementations based on criteria required for a secure and sustainable mainnet deployment.</p>
      </div>
      <div className="zkevm-grid">
        {featuredZKVMs.map((zkvm) => (
          <Card key={zkvm.name} className="zkevm-card">
            <CardContent className="p-8">
              <div className="mb-4">
                <h3>{zkvm.name}</h3>
                <Badge variant="secondary" className="bg-orange-100 text-orange-800 font-medium mt-2">
                  Testing
                </Badge>
              </div>
              <ul className="criteria-list">
                <li className="criteria-item">
                  <span className="name">Test Results</span>
                  <div className="value">
                    {renderCriteriaValue(zkvm, "Test Results")}
                  </div>
                </li>
                <li className="criteria-item">
                  <span className="name">Open Source</span>
                  <div className="value">
                    {renderCriteriaValue(zkvm, "Open Source")}
                  </div>
                </li>
                <li className="criteria-item">
                  <span className="name">Supported Clients</span>
                  <div className="value">
                    {renderCriteriaValue(zkvm, "Supported Clients")}
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link href="/zkvm-tracker">
          <Button size="legacy" variant="book-primary" className="group">
            View Full Tracker
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default ZKEVMReadiness;