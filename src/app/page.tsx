import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ScalabilitySection, { ZKEVMSolutionSection } from "@/components/ScalabilitySection";
import ImpactSection from "@/components/ImpactSection";
import RoadmapSection from "@/components/RoadmapSection";
import ZKEVMReadiness from "@/components/ZKEVMReadiness";
import ClientStatus from "@/components/ClientStatus";
import BlogSection from "@/components/BlogSection";
import BookSection from "@/components/BookSection";
import TeamSection from "@/components/TeamSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <ScalabilitySection />
        <ZKEVMSolutionSection />
        <ImpactSection />
        <RoadmapSection />
        <ZKEVMReadiness />
        <ClientStatus />
        <BlogSection />
        <BookSection />
        <TeamSection />
        <section id="meetings">
          <div className="section-title">
            <h2>Community & Meetings</h2>
            <p>While we don't have public calls scheduled right now, this is where you'll find recordings and resources from future community meetings and presentations. Stay tuned!</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
