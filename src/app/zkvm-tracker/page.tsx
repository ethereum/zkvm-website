import { Metadata } from "next";
import ZKEVMTracker from "@/components/ZKEVMTracker";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "zkEVM Mainnet Readiness Tracker - zkEVM Initiative",
  description: "Comprehensive dashboard evaluating zkEVM implementations for mainnet deployment readiness. Track security, code health, and compatibility metrics.",
  openGraph: {
    title: "zkEVM Mainnet Readiness Tracker",
    description: "Comprehensive dashboard evaluating zkEVM implementations for mainnet deployment readiness.",
    type: "website",
  },
};

export default function ZKEVMTrackerPage() {
  return (
    <>
      <Header />
      <ZKEVMTracker />
      <Footer />
    </>
  );
}
