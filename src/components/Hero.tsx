"use client";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Scaling Ethereum Without Compromise</h1>
        <h2>Introducing ZK-EVMs on L1: A new paradigm to increase Ethereum's throughput while strengthening decentralization.</h2>
        <div className="cta-buttons">
          <a href="#book" className="btn btn-primary" onClick={(e) => { e.preventDefault(); scrollToSection("book"); }}>
            Read the Book
          </a>
          <a href="#blog" className="btn btn-secondary" onClick={(e) => { e.preventDefault(); scrollToSection("blog"); }}>
            View Latest Updates
          </a>
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