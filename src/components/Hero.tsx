"use client";

import { Button } from '@/components/ui/button';

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative mt-20 min-h-[90vh] flex items-center justify-center bg-[var(--dark)] overflow-hidden px-[5%] py-8 before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[radial-gradient(circle,rgba(15,118,110,0.2),transparent_70%)] before:opacity-60">
      <div className="text-center z-[2] max-w-[900px]">
        <h1 className="text-[clamp(3rem,6vw,5rem)] mb-4 text-white font-black tracking-[-2px] leading-[1.1]">
          Scaling Ethereum Without Compromise
        </h1>
        <h2 className="font-['Inter',sans-serif] text-[clamp(1.1rem,2.5vw,1.25rem)] text-[var(--gray)] mb-10 font-normal leading-[1.6] max-w-[650px] mx-auto">
          Introducing ZK-EVMs on L1: A new paradigm to increase Ethereum&apos;s throughput while strengthening decentralization.
        </h2>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button 
            variant="primary-legacy" 
            size="legacy"
            onClick={(e) => { e.preventDefault(); scrollToSection("book"); }}
          >
            Read the Book
          </Button>
          <Button 
            variant="secondary-legacy" 
            size="legacy"
            onClick={(e) => { e.preventDefault(); scrollToSection("blog"); }}
          >
            View Latest Updates
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;