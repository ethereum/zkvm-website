"use client";

import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="px-4 py-10 sm:py-16 border-t border-border">
      <div className="max-w-[1200px] mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8">
        {/* Logo */}
        <div className="col-span-2 sm:col-span-1">
          <Link href="/" className="inline-flex">
            <Logo className="w-[140px] h-auto" />
          </Link>
        </div>

        {/* Useful Links */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">Useful Links</h4>
          <ul className="space-y-2">
            <li>
              <a href="https://eips.ethereum.org/EIPS/eip-8025" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-[var(--accent-orange)] transition-colors inline-flex items-center gap-1">
                EIP-8025 <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>
              <a href="https://ethereum.foundation" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-[var(--accent-orange)] transition-colors inline-flex items-center gap-1">
                Ethereum Foundation <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>
              <a href="https://eth-act.github.io/zkevm-test-monitor/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-[var(--accent-orange)] transition-colors inline-flex items-center gap-1">
                RISC-V Test Monitor <ExternalLink className="w-3 h-3" />
              </a>
            </li>
          </ul>
        </div>

        {/* GitHub */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">GitHub</h4>
          <ul className="space-y-2">
            <li>
              <a href="https://github.com/ethereum/zkvm-website" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-[var(--accent-orange)] transition-colors inline-flex items-center gap-1">
                zkVM Website <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>
              <a href="https://github.com/ethereum/zkvm-standards" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-[var(--accent-orange)] transition-colors inline-flex items-center gap-1">
                zkVM Standards <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>
              <a href="https://github.com/eth-act/zkevm-test-monitor" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-[var(--accent-orange)] transition-colors inline-flex items-center gap-1">
                Test Monitor <ExternalLink className="w-3 h-3" />
              </a>
            </li>
          </ul>
        </div>

        {/* Site */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">Site</h4>
          <ul className="space-y-2">
            <li><Link href="/track" className="text-sm text-muted-foreground hover:text-[var(--accent-orange)] transition-colors">Track</Link></li>
            <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-[var(--accent-orange)] transition-colors">Blog</Link></li>
            <li><Link href="/media" className="text-sm text-muted-foreground hover:text-[var(--accent-orange)] transition-colors">Media</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
