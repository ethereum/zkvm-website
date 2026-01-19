import { trackData } from '@/data/track-data';
import ClientCard from '@/components/ClientCard';

export const metadata = {
  title: 'Ethereum Clients - zkEVM Initiative',
  description: 'Track progress of Ethereum execution and consensus clients integrating zkEVM capabilities',
};

export default function ClientsPage() {
  const executionClients = trackData.clients.filter(c => c.type === 'execution');
  const consensusClients = trackData.clients.filter(c => c.type === 'consensus');

  return (
    <div className="container mx-auto px-4 pb-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-4 text-4xl font-bold">Ethereum Clients</h1>
        <p className="mb-12 text-lg text-muted-foreground">
          Tracking progress of Ethereum clients integrating witness generation and zkEVM proving capabilities.
          Both execution layer (EL) and consensus layer (CL) clients need updates to support zkEVM integration.
        </p>

        {/* Execution Clients */}
        {executionClients.length > 0 && (
          <div className="mb-12">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Execution Layer Clients</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Execution clients handle transaction processing and state management. They need to generate execution witnesses for zkVM proving.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {executionClients.map((client) => (
                <ClientCard key={client.id} client={client} />
              ))}
            </div>
          </div>
        )}

        {/* Consensus Clients */}
        {consensusClients.length > 0 && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Consensus Layer Clients</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Consensus clients manage block proposals and attestations. They need to verify zkEVM proofs and integrate with ePBS.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {consensusClients.map((client) => (
                <ClientCard key={client.id} client={client} />
              ))}
            </div>
          </div>
        )}

        {trackData.clients.length === 0 && (
          <div className="rounded-lg border border-dashed p-12 text-center text-muted-foreground">
            <p className="text-sm">No clients available</p>
          </div>
        )}
      </div>
    </div>
  );
}
