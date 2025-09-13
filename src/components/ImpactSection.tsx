import { BarChart3, Shield, Zap } from "lucide-react";

const ImpactSection = () => {
  const features = [
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Higher Throughput",
      description: "By safely increasing the block gas limit, ZK-EVMs expand network capacity, reducing congestion and making gas fees more stable and affordable."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Stronger Decentralization", 
      description: "Validators only perform lightweight proof verification, lowering hardware requirements. This keeps the barrier to entry low, protecting the diversity of the validator set."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Predictable Finality",
      description: "Proof verification is fast and constant-time, regardless of block complexity. This reduces the risk of missed attestations, making block confirmations more reliable."
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 tracking-tight">
          Why This Matters for Ethereum
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div 
            key={feature.title}
            className="group bg-card border border-border rounded-xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-primary/50"
          >
            <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
              {feature.icon}
            </div>
            
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
              {feature.title}
            </h3>
            
            <p className="font-sans text-gray leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImpactSection;