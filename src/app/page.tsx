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
        {/* Hero — concise one-pager intro */}
        <section className="relative overflow-hidden py-8 pt-48">
          <div className="max-w-[1200px] mx-auto px-4 z-[2] w-full">
            <div className="text-left max-w-[750px]">
              <h1 className="mb-6 font-black tracking-[-2px] leading-[1.1]" style={{ color: 'var(--accent-blue)' }}>
                <span className="text-[clamp(4.5rem,9vw,7rem)] block font-thin">Scaling Ethereum</span>
                <span className="text-[clamp(2rem,4vw,3rem)] block">Through <span style={{ color: 'var(--accent-orange)' }}>Zero Knowledge Proofs</span></span>
              </h1>
              <p className="font-['Inter',sans-serif] text-[clamp(1rem,2vw,1.2rem)] text-muted-foreground mb-10 leading-[1.7] max-w-[650px]">
                The zkVM team at the Ethereum Foundation is working on shipping scaling of the Ethereum mainnet through zero-knowledge virtual machines (zkVMs).
              </p>
              <div className="flex gap-4 flex-wrap mb-16">
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

              {/* Progress approach — two columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="relative pl-6">
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full" style={{ backgroundColor: 'var(--accent-blue)' }} />
                  <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--accent-blue)' }}>Now</p>
                  <h3 className="text-lg font-bold text-foreground mb-2">Short term</h3>
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
                <div className="relative pl-6">
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full" style={{ backgroundColor: 'var(--accent-orange)' }} />
                  <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--accent-orange)' }}>Next</p>
                  <h3 className="text-lg font-bold text-foreground mb-2">Longer term</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We aim to ship mandatory proofs, enabling full ZK-based scaling of Ethereum L1.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <BlogSection />
        <TeamSection />
      </main>
      <Footer />
    </div>
  );
}
