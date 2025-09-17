"use client";

const Footer = () => {
  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer>
      <div className="footer-logo">
        <a href="#" className="logo">
          <img 
            src="/logo.png" 
            alt="Ethereum Foundation zkEVM" 
            className="h-12 w-auto"
          />
        </a>
      </div>
      <div className="footer-links">
        <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection("#about"); }}>About</a>
        <a href="#roadmap" onClick={(e) => { e.preventDefault(); scrollToSection("#roadmap"); }}>Roadmap</a>
        <a href="#blog" onClick={(e) => { e.preventDefault(); scrollToSection("#blog"); }}>Blog</a>
        <a href="https://zkevm.fyi" target="_blank" rel="noopener noreferrer">The Book</a>
        <a href="#team" onClick={(e) => { e.preventDefault(); scrollToSection("#team"); }}>Team</a>
      </div>
      <div className="footer-copy">
        &copy; 2025 zkEVM team — Ethereum Foundation. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;