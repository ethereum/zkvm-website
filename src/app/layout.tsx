/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import "./globals.css";
import "katex/dist/katex.min.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientWrapper } from "@/components/QueryClientWrapper";

export const metadata: Metadata = {
  title: "zkEVM - Scaling Ethereum Without Compromise",
  description: "Introducing zkEVMs on L1: A new paradigm to increase Ethereum's throughput while strengthening decentralization through Zero Knowledge proofs.",
  authors: [{ name: "Ethereum Foundation" }],
  openGraph: {
    title: "zkEVM - Scaling Ethereum Without Compromise",
    description: "Introducing zkEVMs on L1: A new paradigm to increase Ethereum's throughput while strengthening decentralization through Zero Knowledge proofs.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <QueryClientWrapper>
          <TooltipProvider delayDuration={100}>
            <Toaster />
            <Sonner />
            {children}
          </TooltipProvider>
        </QueryClientWrapper>
      </body>
    </html>
  );
}
