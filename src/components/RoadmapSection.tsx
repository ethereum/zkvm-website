const RoadmapSection = () => {
  const workstreams = [
    {
      number: 1,
      title: "Real-Time Proving",
      description: "The core challenge is generating a proof for a full Ethereum block within the 12-second slot time. Our work focuses on prover performance, parallelization, and hardware acceleration to meet this latency target."
    },
    {
      number: 2,
      title: "Client & Protocol Integration", 
      description: "We are designing how ZK-EVMs will integrate into Ethereum's execution and consensus layers. This involves standardizing interfaces and defining the protocol changes for clients to request and verify proofs."
    },
    {
      number: 3,
      title: "Economic Incentives & Security",
      description: "A robust protocol requires sound incentives. We are researching models for prover markets, censorship resistance, and aligning builder and prover incentives to ensure network liveness and security."
    }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="roadmap" className="py-24 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 tracking-tight">
            Roadmap & Research Areas
          </h2>
          <p className="text-lg sm:text-xl font-sans text-gray leading-relaxed max-w-4xl mx-auto">
            Bringing ZK-EVMs to L1 is a multi-faceted effort. Our work is organized into three core workstreams, 
            with parallel progress on client implementations.
          </p>
        </div>

        <div className="space-y-8">
          {workstreams.map((workstream, index) => (
            <div 
              key={workstream.number}
              className="flex gap-6 sm:gap-8 p-8 border-b border-border last:border-b-0 group"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                  {workstream.number}
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
                  {workstream.title}
                </h3>
                <p className="font-sans text-slate leading-relaxed mb-4 max-w-4xl">
                  {workstream.description}
                </p>
                <button
                  onClick={() => scrollToSection("book")}
                  className="font-sans text-primary font-semibold hover:text-primary-dark transition-colors duration-200 inline-flex items-center gap-2 group/link"
                >
                  Learn More 
                  <span className="transform group-hover/link:translate-x-1 transition-transform duration-200">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;