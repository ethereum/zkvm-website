const ClientStatus = () => {
  const executionClients = [
    { name: "Geth", status: "In Development", progress: 65, color: "bg-blue-600" },
    { name: "Nethermind", status: "Testing", progress: 80, color: "bg-primary" },
    { name: "Besu", status: "Planning", progress: 25, color: "bg-yellow-600" }
  ];

  const consensusClients = [
    { name: "Lighthouse", status: "In Development", progress: 55, color: "bg-blue-600" },
    { name: "Prysm", status: "Testing", progress: 75, color: "bg-primary" },
    { name: "Teku", status: "Planning", progress: 30, color: "bg-yellow-600" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Testing":
        return "bg-primary-light text-primary-dark";
      case "In Development":
        return "bg-blue-100 text-blue-800";
      case "Planning":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="bg-card border border-border rounded-xl p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Client Implementation Status
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Execution Layer Clients */}
          <div>
            <h4 className="text-xl font-bold text-foreground mb-6 pb-4 border-b border-border">
              Execution Layer (EL) Clients
            </h4>
            <div className="space-y-6">
              {executionClients.map((client) => (
                <div key={client.name} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-sans font-medium text-slate">
                      {client.name}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${getStatusColor(client.status)}`}>
                      {client.status}
                    </span>
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
            <h4 className="text-xl font-bold text-foreground mb-6 pb-4 border-b border-border">
              Consensus Layer (CL) Clients
            </h4>
            <div className="space-y-6">
              {consensusClients.map((client) => (
                <div key={client.name} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-sans font-medium text-slate">
                      {client.name}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${getStatusColor(client.status)}`}>
                      {client.status}
                    </span>
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
      </div>
    </section>
  );
};

export default ClientStatus;