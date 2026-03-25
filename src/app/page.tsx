import Header from "@/components/Header";
import BlogSection from "@/components/BlogSection";
import TeamSection from "@/components/TeamSection";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero — full height */}
        <section className="relative overflow-hidden min-h-screen flex flex-col justify-center pt-24 pb-16">
          <div className="max-w-[1200px] mx-auto px-4 z-[2] w-full">
            {/* Heading + description + CTA */}
            <div className="text-left max-w-[750px] mb-16">
              <h1 className="mb-6 font-black tracking-[-2px] leading-[1.1]" style={{ color: 'var(--accent-blue)' }}>
                <span className="text-[clamp(4.5rem,9vw,7rem)] block font-thin">Scaling Ethereum</span>
                <span className="text-[clamp(2rem,4vw,3rem)] block">Through <span style={{ color: 'var(--accent-orange)' }}>Zero Knowledge Proofs</span></span>
              </h1>
              <p className="font-['Inter',sans-serif] text-[clamp(1rem,2vw,1.2rem)] text-muted-foreground mb-10 leading-[1.7] max-w-[650px]">
                The zkVM team at the Ethereum Foundation is working on shipping scaling of the Ethereum mainnet through zero-knowledge virtual machines (zkVMs).
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link
                  href="/track"
                  className="btn-accent inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium"
                >
                  Track Progress <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/blog"
                  className="btn-outline-hover inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground rounded-lg font-medium"
                >
                  Read the Blog
                </Link>
              </div>
            </div>

            {/* Timeline — full container width */}
            <div className="relative">
              {/* Timeline line */}
              <div className="hidden sm:block absolute top-[10px] left-0 right-0 h-[2px] bg-border" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Now */}
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-[2px] h-6 flex-shrink-0 z-10 -mt-2" style={{ backgroundColor: 'var(--accent-blue)' }} />
                    <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--accent-blue)' }}>Now</span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Optional Proofs</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Our work focuses around{" "}
                    <a
                      href="https://eips.ethereum.org/EIPS/eip-8025"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--accent-link)] hover:underline inline-flex items-center gap-1"
                    >
                      EIP-8025 <ExternalLink className="w-3 h-3" />
                    </a>
                    {" "}— optional execution proofs for Ethereum blocks.
                  </p>
                </div>

                {/* Later */}
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-[2px] h-6 flex-shrink-0 z-10 -mt-2" style={{ backgroundColor: 'var(--accent-orange)' }} />
                    <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--accent-orange)' }}>Later</span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Mandatory Proofs</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Ship mandatory proofs, enabling full ZK-based scaling of Ethereum L1.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll arrow */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <a href="#blog" className="text-muted-foreground hover:text-foreground transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </a>
          </div>
        </section>

        <BlogSection />
        <TeamSection />
      </main>
      <Footer />
    </div>
  );
}
