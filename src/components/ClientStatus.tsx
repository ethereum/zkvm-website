const ClientStatus = () => {

  const executionClients = [
    { 
      name: "Geth", 
      status: "In Development", 
      completedMilestones: 2, 
      totalMilestones: 4,
      progress: 50, 
      color: "bg-orange-600" 
    },
    { 
      name: "Nethermind", 
      status: "In Development", 
      completedMilestones: 2, 
      totalMilestones: 4,
      progress: 50, 
      color: "bg-orange-600" 
    },
    { 
      name: "Besu", 
      status: "Planning", 
      completedMilestones: 1, 
      totalMilestones: 4,
      progress: 25, 
      color: "bg-blue-600" 
    },
    { 
      name: "Reth", 
      status: "Spec Compliant", 
      completedMilestones: 4, 
      totalMilestones: 4,
      progress: 100, 
      color: "bg-green-600" 
    },
    { 
      name: "Ethrex", 
      status: "Spec Compliant", 
      completedMilestones: 4, 
      totalMilestones: 4,
      progress: 100, 
      color: "bg-green-600" 
    }
  ];

  const consensusClients = [
    { 
      name: "Lighthouse", 
      status: "In Development", 
      completedMilestones: 2, 
      totalMilestones: 4,
      progress: 50, 
      color: "bg-orange-600" 
    },
    { 
      name: "Teku", 
      status: "In Development", 
      completedMilestones: 1, 
      totalMilestones: 4,
      progress: 25, 
      color: "bg-blue-600" 
    },
    { 
      name: "Prysm", 
      status: "Not Started", 
      completedMilestones: 0, 
      totalMilestones: 4,
      progress: 0, 
      color: "bg-gray-600" 
    },
    { 
      name: "Nimbus", 
      status: "Not Started", 
      completedMilestones: 0, 
      totalMilestones: 4,
      progress: 0, 
      color: "bg-gray-600" 
    },
    { 
      name: "Lodestar", 
      status: "Not Started", 
      completedMilestones: 0, 
      totalMilestones: 4,
      progress: 0, 
      color: "bg-gray-600" 
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Not Started":
        return "bg-gray-100 text-gray-800";
      case "Planning":
        return "bg-blue-100 text-blue-800";
      case "In Development":
        return "bg-orange-100 text-orange-800";
      case "Testing":
        return "bg-yellow-100 text-yellow-800";
      case "Spec Compliant":
        return "bg-green-100 text-green-800";
      case "Deprecated":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="bg-card border border-border rounded-xl p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Ethereum Client Readiness for zkVM Integration
          </h3>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
            General readiness status of Ethereum clients for ZKVM integration. 
            Individual zkVM-specific client readiness is shown in the zkVM Tracker.
          </p>
          <p className="text-sm text-muted-foreground">
            Progress is measured against specific milestones for each client type
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Execution Layer Clients */}
          <div>
            <h4 className="text-xl font-bold text-foreground mb-4 pb-4 border-b border-border">
              Execution Layer Clients
            </h4>
            <div className="space-y-6">
              {executionClients.map((client) => (
                <div key={client.name} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-sans font-medium text-slate">
                      {client.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {client.completedMilestones}/{client.totalMilestones}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${getStatusColor(client.status)}`}>
                        {client.status}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${client.color}`}
                      style={{ width: `${client.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Consensus Layer Clients */}
          <div>
            <h4 className="text-xl font-bold text-foreground mb-4 pb-4 border-b border-border">
              Consensus Layer Clients
            </h4>
            <div className="space-y-6">
              {consensusClients.map((client) => (
                <div key={client.name} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-sans font-medium text-slate">
                      {client.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {client.completedMilestones}/{client.totalMilestones}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${getStatusColor(client.status)}`}>
                        {client.status}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${client.color}`}
                      style={{ width: `${client.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-8 text-center">
          Note: This information is based on public sources and community contributions. For the most accurate and up-to-date status, please refer to the official project repositories.
        </p>
      </div>
    </section>
  );
};

export default ClientStatus;
