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
    }
  ];

  const renderCriteriaValue = (criterion: any) => {
    if (criterion.status) {
      return criterion.status === "pass" ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="icon-pass">
          <path d="M20 6 9 17l-5-5"/>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="icon-fail">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      );
    }
    
    if (criterion.rating) {
      return (
        <div className="tooltip-container">
          <span className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className={star <= criterion.rating ? '' : 'muted'}>★</span>
            ))}
          </span>
          <div className="tooltip">
            <p><strong>This score reflects overall code quality based on the following criteria:</strong></p>
            <ul>
              <li><strong>Readability:</strong> Based on static analysis, linter scores, and style guide adherence.</li>
              <li><strong>Documentation:</strong> Based on code comment coverage and the quality of developer guides.</li>
              <li><strong>Maintainability:</strong> Based on test coverage percentage and code complexity metrics.</li>
            </ul>
          </div>
        </div>
      );
    }
    
    if (criterion.clients) {
      return (
        <div className="client-tags">
          {criterion.clients.map((client: string) => (
            <span 
              key={client}
              className={`client-tag ${
                client === 'Geth' ? 'tag-geth' :
                client === 'Nethermind' ? 'tag-nethermind' :
                'tag-custom'
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
    <section id="zkevm-readiness" style={{paddingTop: '4rem', marginTop: '4rem', borderTop: '1px solid var(--border-color)'}}>
      <div className="section-title">
        <h2 style={{fontSize: '2.5rem'}}>ZK-EVM Mainnet Readiness</h2>
        <p>Evaluating core ZK-EVM implementations based on criteria required for a secure and sustainable mainnet deployment.</p>
      </div>
      <div className="zkevm-grid">
        {zkevms.map((zkevm, index) => (
          <div key={zkevm.name} className="zkevm-card">
            <h3>{zkevm.name}</h3>
            <p className="description">{zkevm.description}</p>
            <ul className="criteria-list">
              {zkevm.criteria.map((criterion) => (
                <li key={criterion.name} className="criteria-item">
                  <span className="name">{criterion.name}</span>
                  <div className="value">
                    {renderCriteriaValue(criterion)}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ZKEVMReadiness;