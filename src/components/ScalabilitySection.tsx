const ScalabilitySection = () => {
  return (
    // reverting nuno's changes to fix issue quickly <section id="about" className="section" style={{margin: '0 auto', padding: '2rem 0 0 0'}}>
      <section className="section" style={{padding: '4rem 2rem'}}>
      <div className="section-title" style={{textAlign: 'left', margin: '0 0 4rem 0'}}>
        <h2>The Scalability Challenge</h2>
        <p>A fundamental bottleneck in Ethereum&apos;s scalability is that every validator must re-execute every transaction. Simply increasing the block gas limit would raise hardware requirements for everyone, risking centralization. To scale safely, we need a new approach.</p>
      </div>
      <div className="two-column" style={{backgroundColor: 'white', padding: '2rem', borderBottom: '2px dashed var(--border-color)'}}>
        <div className="text-content">
          <h3 style={{fontSize: '1.5rem', fontWeight: 700}}>The Old Model: N-of-N Execution</h3>
          <p style={{fontFamily: "'Inter', sans-serif", fontSize: '1rem', lineHeight: '1.5rem'}}>Currently, all validators execute all transactions to verify a block&apos;s validity. This redundant computation is secure but creates a ceiling for network throughput. It&apos;s the primary reason gas fees can become prohibitively high during peak demand.</p>
        </div>
        <div className="graphic">
          <svg width="100%" height="100%" viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <style>
              {`
                .old-model-flow {
                  stroke-dasharray: 4;
                  animation: flow 3s linear infinite;
                }
                // .processing-dot {
                //   animation: pulse 1.5s ease-in-out infinite;
                // }
                .label-main { font-family: 'Space Grotesk', sans-serif; font-size: 20px; font-weight: 700; fill: var(--dark); }
                .label-sub { font-family: 'Inter', sans-serif; font-size: 12px; fill: var(--gray); }
                .label-node { font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 600; fill: var(--dark); }
              `}
            </style>
            {/* Central Block */}
            <g>
              <rect x="200" y="150" width="100" height="100" rx="8" fill="var(--primary-light)" stroke="var(--primary)" strokeWidth="2"/>
              <text x="250" y="192" textAnchor="middle" className="label-main">Block</text>
              <text x="250" y="215" textAnchor="middle" className="label-sub">45M Gas</text>
            </g>

            {/* Lines to Validators */}
            <path d="M250 150 L 250 75" stroke="var(--border-color)" strokeWidth="2" className="old-model-flow" />
            <path d="M200 200 L 75 200" stroke="var(--border-color)" strokeWidth="2" className="old-model-flow" />
            <path d="M300 200 L 425 200" stroke="var(--border-color)" strokeWidth="2" className="old-model-flow" />
            <path d="M250 250 L 250 325" stroke="var(--border-color)" strokeWidth="2" className="old-model-flow" />

            {/* Validators */}
            <g transform="translate(250, 50)">
              <circle cx="0" cy="0" r="25" fill="var(--white)" stroke="var(--border-color)" strokeWidth="2"/>
              <text x="0" y="5" textAnchor="middle" className="label-node">V1</text>
              {/* <circle cx="0" cy="0" r="3" fill="var(--primary)" className="processing-dot" style={{animationDelay: '0s'}}/> */}
            </g>
            <g transform="translate(50, 200)">
              <circle cx="0" cy="0" r="25" fill="var(--white)" stroke="var(--border-color)" strokeWidth="2"/>
              <text x="0" y="5" textAnchor="middle" className="label-node">V2</text>
              {/* <circle cx="0" cy="0" r="3" fill="var(--primary)" className="processing-dot" style={{animationDelay: '0.2s'}}/> */}
            </g>
            <g transform="translate(450, 200)">
              <circle cx="0" cy="0" r="25" fill="var(--white)" stroke="var(--border-color)" strokeWidth="2"/>
              <text x="0" y="5" textAnchor="middle" className="label-node">V3</text>
              {/* <circle cx="0" cy="0" r="3" fill="var(--primary)" className="processing-dot" style={{animationDelay: '0.4s'}}/> */}
            </g>
            <g transform="translate(250, 350)">
              <circle cx="0" cy="0" r="25" fill="var(--white)" stroke="var(--border-color)" strokeWidth="2"/>
              <text x="0" y="5" textAnchor="middle" className="label-node">Vn</text>
              {/* <circle cx="0" cy="0" r="3" fill="var(--primary)" className="processing-dot" style={{animationDelay: '0.6s'}}/> */}
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
};

// ZK-EVM Solution Section Component
const ZKEVMSolutionSection = () => {
  return (
    <section className="section" style={{background: '#eefaff', padding: '4rem 2rem'}}>
      <div className="two-column">
        <div className="text-content">
          <h3 style={{fontSize: '1.5rem', fontWeight: 700}}>The ZK-EVM Solution: 1-of-N Model</h3>
          <p style={{fontFamily: "'Inter', sans-serif", fontSize: '1rem', lineHeight: '1.5rem'}}>ZK-EVMs shift this paradigm. Instead of all validators re-executing, a single specialized actor (a prover) executes the block and generates a short, cryptographic proof of its correctness. Verifying this proof is orders of magnitude cheaper than full re-execution, allowing Ethereum to safely raise the gas limit.</p>
        </div>
        <div className="graphic">
          <svg width="100%" height="100%" viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <style>
              {`
                .flow-line {
                  stroke-dasharray: 4;
                  animation: flow 2s linear infinite;
                }
                .flow-line-slow {
                  stroke-dasharray: 4;
                  animation: flow 4s linear infinite;
                }
                .checkmark {
                  stroke: var(--success);
                  stroke-width: 8;
                  stroke-dasharray: 30;
                  stroke-dashoffset: 30;
                  animation: draw-check 0.5s ease-out forwards;
                  animation-delay: 1.5s;
                }
                .label-main { font-family: 'Space Grotesk', sans-serif; font-size: 20px; font-weight: 700; fill: var(--dark); }
                .label-sub { font-family: 'Inter', sans-serif; font-size: 12px; fill: var(--gray); }
                .label-node { font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 600; fill: var(--dark); }
              `}
            </style>
            
            {/* Block Input */}
            <g>
              <rect x="20" y="175" width="80" height="50" rx="4" fill="#E2E8F0"/>
              <text x="60" y="202" textAnchor="middle" className="label-node">Block</text>
            </g>
            
            {/* Arrow to Prover */}
            <path d="M100 200 H 150" stroke="#CBD5E1" strokeWidth="2" className="flow-line-slow" />
            
            {/* Prover */}
            <g>
              <rect x="150" y="150" width="120" height="100" rx="8" fill="var(--primary-light)" stroke="var(--primary)" strokeWidth="2"/>
              <text x="210" y="192" textAnchor="middle" className="label-main">Prover</text>
              <text x="210" y="215" textAnchor="middle" className="label-sub">Executes &amp; Proves</text>
            </g>
            
            {/* Proof Output */}
            <g>
              <path d="M270 200 H 300" stroke="#CBD5E1" strokeWidth="2" className="flow-line"/>
              <rect x="300" y="185" width="20" height="30" rx="2" fill="var(--white)" stroke="var(--slate)" strokeWidth="1.5"/>
              <line x1="305" y1="192" x2="315" y2="192" stroke="var(--slate)" strokeWidth="1.5" />
              <line x1="305" y1="198" x2="315" y2="198" stroke="var(--slate)" strokeWidth="1.5" />
              <line x1="305" y1="204" x2="310" y2="204" stroke="var(--slate)" strokeWidth="1.5" />
              <text x="310" y="180" textAnchor="middle" className="label-sub">ZK Proof</text>
            </g>

            {/* Lines to Validators */}
            <path d="M320 200 C 350 200, 370 100, 400 100" stroke="var(--primary)" strokeWidth="2" strokeOpacity="0.5" className="flow-line"/>
            <path d="M320 200 C 350 200, 370 200, 400 200" stroke="var(--primary)" strokeWidth="2" strokeOpacity="0.5" className="flow-line"/>
            <path d="M320 200 C 350 200, 370 300, 400 300" stroke="var(--primary)" strokeWidth="2" strokeOpacity="0.5" className="flow-line"/>
            
            {/* Validators */}
            <g>
              <circle cx="425" cy="100" r="25" fill="var(--white)" stroke="var(--border-color)" strokeWidth="2"/>
              <text x="425" y="105" textAnchor="middle" className="label-node">V1</text>
              {/* <path className="checkmark" d="M418 100 L 424 106 L 432 96"/> */}
            </g>
            <g>
              <circle cx="425" cy="200" r="25" fill="var(--white)" stroke="var(--border-color)" strokeWidth="2"/>
              <text x="425" y="205" textAnchor="middle" className="label-node">V2</text>
              {/* <path className="checkmark" d="M418 200 L 424 206 L 432 196" style={{animationDelay: '1.6s'}}/> */}
            </g>
            <g>
              <circle cx="425" cy="300" r="25" fill="var(--white)" stroke="var(--border-color)" strokeWidth="2"/>
              <text x="425" y="305" textAnchor="middle" className="label-node">Vn</text>
              {/* <path className="checkmark" d="M418 300 L 424 306 L 432 296" style={{animationDelay: '1.7s'}}/> */}
            </g>
          </svg>
        </div>
      </div>
      <div style={{marginTop: '3rem', textAlign: 'center'}}>
        <div style={{fontFamily: "'Inter', sans-serif", fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--slate)', backgroundColor: 'white', padding: '1.5rem', borderRadius: '6px', border: '2px solid var(--primary)', maxWidth: '700px', margin: '0 auto'}}>
          <h4 style={{color: 'var(--primary)', fontFamily: "'Inter', sans-serif", margin: '0 0 0.5rem 0', fontSize: '1.2rem', fontWeight: 700}}>Our goal is full, uncompromising EVM-equivalence.</h4>
          <p style={{margin: '0', fontSize: '1rem'}}>Often called a &quot;Type 1&quot; ZK-EVM, this ensures zero friction for existing applications, developers, and tooling—no modifications required.</p>
        </div>
      </div>
    </section>
  );
};

export default ScalabilitySection;
export { ZKEVMSolutionSection };