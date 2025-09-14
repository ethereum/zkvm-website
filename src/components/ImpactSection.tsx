import { Card, CardContent } from "@/components/ui/card";

const ImpactSection = () => {
  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="20" x2="12" y2="10"></line>
          <line x1="18" y1="20" x2="18" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="16"></line>
        </svg>
      ),
      title: "Higher Throughput",
      description: "By safely increasing the block gas limit, ZK-EVMs expand network capacity, reducing congestion and making gas fees more stable and affordable."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      ),
      title: "Stronger Decentralization", 
      description: "Validators only perform lightweight proof verification, lowering hardware requirements. This keeps the barrier to entry low, protecting the diversity of the validator set."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
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