const ScalabilitySection = () => {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 tracking-tight">
          The Scalability Challenge
        </h2>
        <p className="text-lg sm:text-xl font-sans text-gray leading-relaxed max-w-4xl mx-auto">
          A fundamental bottleneck in Ethereum's scalability is that every validator must re-execute every transaction. 
          Simply increasing the block gas limit would raise hardware requirements for everyone, risking centralization. 
          To scale safely, we need a new approach.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="order-2 lg:order-1">
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
            The Old Model: N-of-N Execution
          </h3>
          <p className="text-lg font-sans text-slate leading-relaxed mb-6">
            Currently, all validators execute all transactions to verify a block's validity. 
            This redundant computation is secure but creates a ceiling for network throughput. 
            It's the primary reason gas fees can become prohibitively high during peak demand.
          </p>
          <div className="bg-muted/50 border border-border rounded-lg p-6">
            <p className="text-sm font-sans text-muted-foreground italic">
              Every validator processes every transaction → Limited scalability
            </p>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="bg-card border border-border rounded-lg p-8 h-96 flex items-center justify-center">
            <svg width="100%" height="100%" viewBox="0 0 400 300" className="max-w-md">
              {/* Central Block */}
              <g>
                <rect x="150" y="125" width="100" height="50" rx="6" fill="hsl(var(--primary-light))" stroke="hsl(var(--primary))" strokeWidth="2"/>
                <text x="200" y="145" textAnchor="middle" className="fill-primary font-sans text-sm font-semibold">Block</text>
                <text x="200" y="160" textAnchor="middle" className="fill-gray font-sans text-xs">30M Gas</text>
              </g>

              {/* Validator Nodes */}
              {[
                { x: 200, y: 50, label: "V1" },
                { x: 75, y: 150, label: "V2" },
                { x: 325, y: 150, label: "V3" },
                { x: 200, y: 250, label: "Vn" }
              ].map((validator, i) => (
                <g key={validator.label}>
                  <circle cx={validator.x} cy={validator.y} r="20" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="2"/>
                  <text x={validator.x} y={validator.y + 5} textAnchor="middle" className="fill-foreground font-sans text-sm font-semibold">
                    {validator.label}
                  </text>
                  <circle cx={validator.x} cy={validator.y} r="3" fill="hsl(var(--primary))" className="animate-pulse-slow" style={{ animationDelay: `${i * 0.2}s` }}/>
                  
                  {/* Connection Lines */}
                  <line 
                    x1="200" 
                    y1="150" 
                    x2={validator.x} 
                    y2={validator.y} 
                    stroke="hsl(var(--border))" 
                    strokeWidth="2" 
                    strokeDasharray="4,4"
                    className="animate-pulse-slow"
                  />
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>

      {/* ZK-EVM Solution */}
      <div className="mt-24 bg-card border border-border rounded-xl p-8 sm:p-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="bg-card border border-border rounded-lg p-8 h-96 flex items-center justify-center">
              <svg width="100%" height="100%" viewBox="0 0 400 300" className="max-w-md">
                {/* Block Input */}
                <g>
                  <rect x="20" y="125" width="60" height="40" rx="4" fill="hsl(var(--muted))"/>
                  <text x="50" y="148" textAnchor="middle" className="fill-slate font-sans text-sm">Block</text>
                </g>
                
                {/* Arrow */}
                <line x1="80" y1="145" x2="120" y2="145" stroke="hsl(var(--border))" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                
                {/* Prover */}
                <g>
                  <rect x="120" y="100" width="100" height="90" rx="8" fill="hsl(var(--primary-light))" stroke="hsl(var(--primary))" strokeWidth="2"/>
                  <text x="170" y="135" textAnchor="middle" className="fill-primary font-sans text-sm font-bold">Prover</text>
                  <text x="170" y="150" textAnchor="middle" className="fill-gray font-sans text-xs">Executes &amp; Proves</text>
                </g>
                
                {/* Proof Output */}
                <g>
                  <line x1="220" y1="145" x2="260" y2="145" stroke="hsl(var(--border))" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  <rect x="260" y="130" width="20" height="30" rx="2" fill="hsl(var(--card))" stroke="hsl(var(--slate))" strokeWidth="1"/>
                  <text x="270" y="120" textAnchor="middle" className="fill-gray font-sans text-xs">ZK Proof</text>
                </g>

                {/* Validators */}
                {[
                  { x: 325, y: 75 },
                  { x: 325, y: 145 },
                  { x: 325, y: 215 }
                ].map((pos, i) => (
                  <g key={i}>
                    <circle cx={pos.x} cy={pos.y} r="18" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="2"/>
                    <text x={pos.x} y={pos.y + 4} textAnchor="middle" className="fill-foreground font-sans text-sm">V{i+1}</text>
                    
                    {/* Connection Lines */}
                    <path 
                      d={`M280 145 Q 300 145, 307 ${pos.y}`}
                      stroke="hsl(var(--primary))" 
                      strokeWidth="2" 
                      fill="none"
                      opacity="0.7"
                    />
                    
                    {/* Checkmark */}
                    <g className="animate-draw" style={{ animationDelay: `${1.5 + i * 0.1}s` }}>
                      <path d={`M${pos.x-6} ${pos.y} L ${pos.x-2} ${pos.y+4} L ${pos.x+6} ${pos.y-4}`} stroke="hsl(var(--success))" strokeWidth="3" fill="none"/>
                    </g>
                  </g>
                ))}
                
                {/* Arrow marker definition */}
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="hsl(var(--border))" />
                  </marker>
                </defs>
              </svg>
            </div>
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
              The ZK-EVM Solution: 1-of-N Model
            </h3>
            <p className="text-lg font-sans text-slate leading-relaxed mb-6">
              ZK-EVMs shift this paradigm. Instead of all validators re-executing, a single specialized actor (a prover) 
              executes the block and generates a short, cryptographic proof of its correctness. Verifying this proof is 
              orders of magnitude cheaper than full re-execution, allowing Ethereum to safely raise the gas limit.
            </p>
            <div className="bg-primary-light/50 border border-primary/20 rounded-lg p-6">
              <p className="font-sans text-slate leading-relaxed">
                <strong className="text-foreground font-bold">Our goal is full, uncompromising EVM-equivalence.</strong> Often called a "Type 1" ZK-EVM, 
                this ensures zero friction for existing applications, developers, and tooling—no modifications required.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScalabilitySection;