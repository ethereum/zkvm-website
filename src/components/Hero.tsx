"use client";

import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary-dark/30 to-slate/40" />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-slate opacity-90" />
      
      {/* Hero Gradient Overlay */}
      <div className="absolute inset-0 hero-gradient" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
          Scaling Ethereum 
          <br />
          <span className="text-primary-light">Without Compromise</span>
        </h1>
        
        <h2 className="text-lg sm:text-xl lg:text-2xl font-sans text-gray font-normal mb-10 leading-relaxed max-w-3xl mx-auto">
          Introducing ZK-EVMs on L1: A new paradigm to increase Ethereum's throughput while strengthening decentralization through Zero Knowledge proofs.
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg"
            onClick={() => scrollToSection("book")}
            className="bg-primary hover:bg-primary-dark text-white font-sans font-semibold px-8 py-4 rounded-md transition-all duration-300 hover:scale-105 hover:shadow-glow"
          >
            Read the Book
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => scrollToSection("blog")}
            className="border-white/30 text-white hover:bg-white/10 font-sans font-semibold px-8 py-4 rounded-md transition-all duration-300 hover:scale-105 backdrop-blur-sm"
          >
            View Latest Updates
          </Button>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-2 h-2 bg-primary-light rounded-full animate-pulse-slow" />
      <div className="absolute top-3/4 right-20 w-3 h-3 bg-primary-light/60 rounded-full animate-float" />
      <div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-white/40 rounded-full animate-pulse-slow" />
    </section>
  );
};

export default Hero;