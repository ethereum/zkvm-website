"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { SparklesCore } from "@/components/ui/sparkles";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-[var(--dark)] overflow-hidden py-8 pt-24 before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[radial-gradient(circle,rgba(15,118,110,0.2),transparent_70%)] before:opacity-60">
        <div className="w-full absolute inset-0 h-screen">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.1}
            maxSize={0.7}
            particleDensity={500}
            className="w-full h-full"
            particleColor="#95addf"
          />
      </div>
      <div className="max-w-[1200px] mx-auto px-4 z-[2] w-full">
        <div className="text-left max-w-[900px]">
          <h1 className="text-[clamp(3rem,6vw,5rem)] mb-4 text-white font-black tracking-[-2px] leading-[1.1]">
            Scaling Ethereum Without Compromise
          </h1>
          <h2 className="font-['Inter',sans-serif] text-[clamp(1.1rem,2.5vw,1.25rem)] text-white mb-10 font-normal leading-[1.6] max-w-[650px]">
            Introducing zkEVMs on L1: A new paradigm to increase Ethereum&apos;s throughput while strengthening decentralization.
          </h2>
          <div className="flex gap-4 flex-wrap">
            <Button
              variant="primary-legacy"
              size="legacy"
              asChild
            >
              <Link href="/blog">
                Follow the Latest Updates
              </Link>
            </Button>
            <Button
              variant="secondary-legacy"
              size="legacy"
              onClick={(e) => { e.preventDefault(); window.location.href = '/zkvm-tracker'; }}
              className="bg-white text-[var(--dark)] hover:bg-gray-200"
            >
              View the zkEVM Tracker
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
