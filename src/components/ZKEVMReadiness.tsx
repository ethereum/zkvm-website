import { Check, X, Star } from "lucide-react";

const ZKEVMReadiness = () => {
  const zkevms = [
    {
      name: "Kakarot ZK-EVM",
      description: "A Type 1 ZK-EVM written in Cairo, leveraging the Starknet stack for provability.",
      criteria: [
        { name: "Security/riscof Tests", status: "pass" },
        { name: "Code Health", rating: 4 },
        { name: "Open Source", status: "pass" },
        { name: "Supported EL Clients", clients: ["Geth"] }
      ]
    },
    {
      name: "Taiko ZK-EVM", 
      description: "A decentralized, Ethereum-equivalent ZK-Rollup focused on Type-1 compatibility.",
      criteria: [
        { name: "Security/riscof Tests", status: "pass" },
        { name: "Code Health", rating: 5 },
        { name: "Open Source", status: "pass" },
        { name: "Supported EL Clients", clients: ["Geth", "Nethermind"] }
      ]
    },
    {
      name: "Polygon zkEVM",
      description: "A Type 2 ZK-EVM that aims to be EVM-equivalent with some modifications for proving efficiency.",
      criteria: [
        { name: "Security/riscof Tests", status: "pass" },
        { name: "Code Health", rating: 4 },
        { name: "Open Source", status: "pass" },
        { name: "Supported EL Clients", clients: ["Custom"] }
      ]
    }
  ];

  const renderCriteriaValue = (criterion: any) => {
    if (criterion.status) {
      return criterion.status === "pass" ? (
        <Check className="w-6 h-6 text-success" />
      ) : (
        <X className="w-6 h-6 text-destructive" />
      );
    }
    
    if (criterion.rating) {
      return (
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star 
              key={star}
              className={`w-4 h-4 ${star <= criterion.rating ? 'text-primary fill-current' : 'text-border'}`}
            />
          ))}
        </div>
      );
    }
    
    if (criterion.clients) {
      return (
        <div className="flex gap-2 flex-wrap">
          {criterion.clients.map((client: string) => (
            <span 
              key={client}
              className={`px-2 py-1 rounded text-xs font-semibold ${
                client === 'Geth' ? 'bg-blue-100 text-blue-800' :
                client === 'Nethermind' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
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
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-border">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 tracking-tight">
          ZK-EVM Mainnet Readiness
        </h2>
        <p className="text-lg font-sans text-gray leading-relaxed max-w-3xl mx-auto">
          Evaluating core ZK-EVM implementations based on criteria required for a secure and sustainable mainnet deployment.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {zkevms.map((zkevm, index) => (
          <div 
            key={zkevm.name}
            className="bg-card border border-border rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-primary/50"
          >
            <h3 className="text-xl font-bold text-foreground mb-3">
              {zkevm.name}
            </h3>
            <p className="font-sans text-gray text-sm leading-relaxed mb-6">
              {zkevm.description}
            </p>
            
            <div className="space-y-4">
              {zkevm.criteria.map((criterion) => (
                <div 
                  key={criterion.name}
                  className="flex items-center justify-between py-3 border-b border-border last:border-b-0"
                >
                  <span className="font-sans text-sm font-medium text-slate">
                    {criterion.name}
                  </span>
                  <div className="flex-shrink-0">
                    {renderCriteriaValue(criterion)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ZKEVMReadiness;