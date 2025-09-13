import { Github, Twitter, Linkedin } from "lucide-react";

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "Lead Researcher",
      initials: "SC",
      bio: "Cryptography expert with 10+ years in zero-knowledge proofs"
    },
    {
      name: "Michael Rodriguez", 
      role: "Protocol Engineer",
      initials: "MR",
      bio: "Core Ethereum developer focusing on consensus layer integration"
    },
    {
      name: "Dr. Aisha Patel",
      role: "Performance Engineer", 
      initials: "AP",
      bio: "Specialized in prover optimization and hardware acceleration"
    },
    {
      name: "David Kim",
      role: "Security Researcher",
      initials: "DK", 
      bio: "Formal verification and cryptographic protocol analysis expert"
    },
    {
      name: "Prof. Elena Volkov",
      role: "Economic Researcher",
      initials: "EV",
      bio: "Mechanism design and incentive alignment for decentralized systems"
    },
    {
      name: "James Thompson",
      role: "Client Engineer",
      initials: "JT",
      bio: "Implementation lead for execution layer client integration"
    }
  ];

  return (
    <section id="team" className="py-24 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 tracking-tight">
            Meet Our Team
          </h2>
          <p className="text-lg sm:text-xl font-sans text-gray leading-relaxed max-w-3xl mx-auto">
            A diverse group of researchers, engineers, and cryptographers working to bring ZK-EVMs to Ethereum's Layer 1.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={member.name}
              className="text-center group transition-all duration-300 hover:scale-105"
            >
              <div className="w-24 h-24 bg-primary-light rounded-full flex items-center justify-center text-primary-dark font-bold text-xl mb-4 mx-auto group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                {member.initials}
              </div>
              
              <h4 className="text-lg font-bold text-foreground mb-1">
                {member.name}
              </h4>
              
              <p className="font-sans text-primary font-medium mb-3">
                {member.role}
              </p>
              
              <p className="font-sans text-sm text-gray leading-relaxed mb-4">
                {member.bio}
              </p>
              
              <div className="flex justify-center space-x-3">
                <a href="#" className="text-gray hover:text-primary transition-colors duration-200">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray hover:text-primary transition-colors duration-200">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray hover:text-primary transition-colors duration-200">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;