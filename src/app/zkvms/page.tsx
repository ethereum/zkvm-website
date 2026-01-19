import { trackData } from '@/data/track-data';
import ZKVMCard from '@/components/zkvms/ZKVMCard';

export const metadata = {
  title: 'zkVM Implementations - zkEVM Initiative',
  description: 'Zero-knowledge virtual machines for Ethereum block proving',
};

export default function ZKVMsPage() {
  return (
    <div className="container mx-auto px-4 pb-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-4 text-4xl font-bold">zkVM Implementations</h1>
        <p className="mb-12 text-lg text-muted-foreground">
          Zero-knowledge virtual machines powering Ethereum block proving.
          Each zkVM is working toward real-time proving performance and broad client support.
        </p>

        {/* zkVM Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {trackData.zkvms.map((zkvm) => (
            <ZKVMCard key={zkvm.id} zkvm={zkvm} />
          ))}
        </div>
      </div>
    </div>
  );
}
