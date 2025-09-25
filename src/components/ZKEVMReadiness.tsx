import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const ZKEVMReadiness = () => {
  const zkevms = [
    {
      name: "Kakarot ZK-EVM",
      description: "A Type 1 ZK-EVM written in Cairo, leveraging the Starknet stack for provability.",
      criteria: [
        { name: "Security/riscof Tests", status: "pass" },
        { name: "Open Source", status: "pass" },
        { name: "Supported EL Clients", clients: ["Geth"] }
      ]
    },
    {
      name: "Taiko ZK-EVM", 
      description: "A decentralized, Ethereum-equivalent ZK-Rollup focused on Type-1 compatibility.",
      criteria: [
        { name: "Security/riscof Tests", status: "pass" },
        { name: "Open Source", status: "pass" },
        { name: "Supported EL Clients", clients: ["Geth", "Nethermind"] }
      ]
    }
  ];

  const renderCriteriaValue = (criterion: { status?: string; clients?: string[] }) => {
    if (criterion.status) {
      return criterion.status === "pass" ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="icon-pass">
          <path d="M20 6 9 17l-5-5"/>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="icon-fail">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      );
    }
    
    if (criterion.clients) {
      return (
        <div className="client-tags">
          {criterion.clients.map((client: string) => (
            <span 
              key={client}
              className={`client-tag ${
                client === 'Geth' ? 'tag-geth' :
                client === 'Nethermind' ? 'tag-nethermind' :
                'tag-custom'
              }`}
            >
              {client}
            </span>
          ))}
        </div>
      );
    }
  };

  return (
    <section id="zkevm-readiness" className="section" style={{paddingTop: '10rem', borderTop: '1px solid var(--border-color)'}}>
      <div className="section-title">
        <h2 style={{fontSize: '2.5rem', fontWeight: 700}}>ZK-EVM Mainnet Readiness</h2>
        <p>Evaluating core ZK-EVM implementations based on criteria required for a secure and sustainable mainnet deployment.</p>
      </div>
      <div className="zkevm-grid">
        {zkevms.map((zkevm) => (
          <Card key={zkevm.name} className="zkevm-card">
            <CardContent className="p-8">
              <h3>{zkevm.name}</h3>
              <p className="description">{zkevm.description}</p>
              <ul className="criteria-list">
                {zkevm.criteria.map((criterion) => (
                  <li key={criterion.name} className="criteria-item">
                    <span className="name">{criterion.name}</span>
                    <div className="value">
                      {renderCriteriaValue(criterion)}
                    </div>
                  </li>
                ))}
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