"use client";

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
      description: "We are designing how zkEVMs will integrate into Ethereum's execution and consensus layers. This involves standardizing interfaces and defining the protocol changes for clients to request and verify proofs."
    },
    {
      number: 3,
      title: "Economic Incentives & Security",
      description: "A robust protocol requires sound incentives. We are researching models for prover markets, censorship resistance, and aligning builder and prover incentives to ensure network liveness and security."
    }
  ];

  return (
    <section id="roadmap" className="section" style={{background: 'var(--white)'}}>
      <div className="section-title">
        <h2>Roadmap & Research Areas</h2>
        <p>Bringing zkEVMs to L1 is a multi-faceted effort. Our work is organized into three core workstreams, with parallel progress on client implementations.</p>
      </div>
      <div className="workstream-container">
        {workstreams.map((workstream) => (
          <div key={workstream.number} className="workstream-item">
            <div className="workstream-number">{workstream.number}</div>
            <div className="workstream-content">
              <h3>{workstream.title}</h3>
              <p>{workstream.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RoadmapSection;