import { Card, CardContent } from "@/components/ui/card";

const ImpactSection = () => {
  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22,7 13.5,15.5 8.5,10.5 2,17"></polyline>
          <polyline points="16,7 22,7 22,13"></polyline>
        </svg>
      ),
      title: "Higher Throughput",
      description: "By safely increasing the block gas limit, zkEVMs expand network capacity, reducing congestion and making gas fees more stable and affordable."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 3l-6 6"></path>
          <path d="M21 3l-6 6"></path>
          <path d="M3 21l6-6"></path>
          <path d="M3 21l6-6"></path>
          <path d="M21 3H9"></path>
          <path d="M21 3v12"></path>
          <path d="M3 21h12"></path>
          <path d="M3 21V9"></path>
        </svg>
      ),
      title: "Stronger Decentralization", 
      description: "Validators only perform lightweight proof verification, lowering hardware requirements. This keeps the barrier to entry low, protecting the diversity of the validator set."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7,10 12,15 17,10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
      ),
      title: "Predictable Finality",
      description: "Proof verification is fast and constant-time, regardless of block complexity. This reduces the risk of missed attestations, making block confirmations more reliable."
    }
  ];

  return (
    <section className="section">
      <div className="section-title">
        <h2>Why This Matters for Ethereum</h2>
      </div>
      <div className="feature-grid">
        {features.map((feature) => (
          <Card key={feature.title} className="feature-card">
            <CardContent className="p-8">
              <div className="feature-icon">
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ImpactSection;