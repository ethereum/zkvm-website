import Image from "next/image";
import { teamMembers } from "@/data/team";

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
  <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
</svg>
);

const TeamSection = () => {
  return (
    <section id="team" className="section mb-16" style={{background: 'var(--white)'}}>
      <div className="section-title">
        <h2>Who We Are</h2>
        <p>A collaborative effort from researchers and developers dedicated to scaling Ethereum securely.</p>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-8 mt-16">
        {teamMembers.map((member) => (
          <div key={member.name} className="text-center transition-transform duration-300 hover:translate-y-[-5px]">
            <div className="h-[100px] w-[100px] bg-[var(--primary-light)] rounded-full mx-auto mb-4 flex items-center justify-center text-[var(--primary-dark)] text-3xl font-bold">
              {member.image ? (
                <Image
                  src={member.image}
                  alt={member.name}
                  width={200}
                  height={200}
                  className="rounded-full object-cover w-full h-full"
                />
              ) : (
                <span>{member.initials}</span>
              )}
            </div>
            <h4 className="mb-1 text-[1.1rem]">{member.name}</h4>
            <div className="flex justify-center gap-4 mt-3">
              {member.twitter && (
                <a 
                  href={`https://twitter.com/${member.twitter.replace('@', '')}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[var(--gray)] transition-colors duration-300 hover:text-[var(--primary)]"
                >
                  <XIcon />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;