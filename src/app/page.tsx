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
        <section className="relative min-h-[70vh] flex items-center overflow-hidden py-8 pt-24">
          <div className="max-w-[1200px] mx-auto px-4 z-[2] w-full">
            <div className="text-left max-w-[750px]">
              <h1 className="mb-6 font-black tracking-[-2px] leading-[1.1]" style={{ color: 'var(--accent-blue)' }}>
                <span className="text-[clamp(3.5rem,7vw,5.5rem)] block">Scaling Ethereum</span>
                <span className="text-[clamp(2rem,4vw,3rem)] block">Through Zero Knowledge Proofs</span>
              </h1>
              <p className="font-['Inter',sans-serif] text-[clamp(1rem,2vw,1.2rem)] text-muted-foreground mb-6 leading-[1.7] max-w-[650px]">
                The zkVM team at the Ethereum Foundation is working on shipping scaling of the Ethereum mainnet through zero-knowledge virtual machines (zkVMs).
              </p>
              <div className="space-y-4 mb-10">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-blue)] mt-2.5 flex-shrink-0" />
                  <p className="text-foreground text-base">
                    <strong>Short term:</strong> Our work focuses around{" "}
                    <a
                      href="https://eips.ethereum.org/EIPS/eip-8025"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--accent-blue)] hover:underline inline-flex items-center gap-1"
                    >
                      EIP-8025 <ExternalLink className="w-3 h-3" />
                    </a>
                    {" "}— optional execution proofs for Ethereum blocks.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-blue)] mt-2.5 flex-shrink-0" />
                  <p className="text-foreground text-base">
                    <strong>Longer term:</strong> We aim to ship mandatory proofs, enabling full ZK-based scaling of Ethereum L1.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 flex-wrap">
                <Link
                  href="/track"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg transition-colors font-medium"
                  style={{ backgroundColor: 'var(--accent-blue)', color: 'var(--accent-btn-text)' }}
                >
                  Track Progress <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground rounded-lg hover:bg-muted transition-colors font-medium"
                >
                  Read the Blog
                </Link>
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
