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
          <svg viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M125 0L250 62.5V187.5L125 250L0 187.5V62.5L125 0Z" fill="#0F766E"/>
            <path d="M125 225L225 175V75L125 25L25 75V175L125 225Z" stroke="#334155" strokeWidth="10"/>
          </svg>
          <div className="logo-text">Ethereum Foundation <span>| zkevm</span></div>
        </a>
      </div>
      <div className="footer-links">
        <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection("#about"); }}>About</a>
        <a href="#roadmap" onClick={(e) => { e.preventDefault(); scrollToSection("#roadmap"); }}>Roadmap</a>
        <a href="#blog" onClick={(e) => { e.preventDefault(); scrollToSection("#blog"); }}>Blog</a>
        <a href="https://zkevm.fyi" target="_blank" rel="noopener noreferrer">The Book</a>
        <a href="#team" onClick={(e) => { e.preventDefault(); scrollToSection("#team"); }}>Team</a>
      </div>
      <div className="footer-socials">
        <a href="#" title="GitHub"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.95 6.44 7.17C9.94 18.55 9 19 9 20v3"></path></svg></a>
        <a href="#" title="Twitter"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg></a>
        <a href="#" title="Telegram"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><path d="M22 2L15 22L11 13L2 9L22 2z"/></svg></a>
      </div>
      <div className="footer-copy">
        &copy; 2025 ZK-EVM Initiative. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;