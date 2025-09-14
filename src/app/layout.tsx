import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClientWrapper } from "@/components/QueryClientWrapper";

export const metadata: Metadata = {
  title: "ZK-EVM Initiative - Scaling Ethereum Without Compromise",
  description: "Introducing ZK-EVMs on L1: A new paradigm to increase Ethereum's throughput while strengthening decentralization through Zero Knowledge proofs.",
  authors: [{ name: "Ethereum Foundation" }],
  openGraph: {
    title: "ZK-EVM Initiative - Scaling Ethereum Without Compromise",
    description: "Introducing ZK-EVMs on L1: A new paradigm to increase Ethereum's throughput while strengthening decentralization through Zero Knowledge proofs.",
    type: "website",
    images: [
      {
        url: "https://lovable.dev/opengraph-image-p98pqg.png",
        width: 1200,
        height: 630,
        alt: "ZK-EVM Initiative",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@lovable_dev",
    images: ["https://lovable.dev/opengraph-image-p98pqg.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
