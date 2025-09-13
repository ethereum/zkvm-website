import { Github, Twitter, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const footerLinks = [
    { name: "About", href: "#about" },
    { name: "Roadmap", href: "#roadmap" },
    { name: "Blog", href: "#blog" },
    { name: "The Book", href: "#book" },
    { name: "Team", href: "#team" },
    { name: "Contact", href: "#" }
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="bg-gradient-to-br from-primary via-primary-dark to-slate text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Logo and Brand */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
              <svg viewBox="0 0 250 250" className="w-6 h-6 text-primary" fill="none">
                <path d="M125 0L250 62.5V187.5L125 250L0 187.5V62.5L125 0Z" fill="currentColor"/>
                <path d="M125 225L225 175V75L125 25L25 75V175L125 225Z" stroke="white" strokeWidth="10"/>
              </svg>
            </div>
            <div className="font-sans text-lg font-semibold">
              Ethereum Foundation <span className="text-white/70 font-normal">| zkevm</span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          {footerLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className="font-sans text-white/80 hover:text-white transition-colors duration-200 font-medium"
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-8">
          <a href="#" className="text-white/70 hover:text-white transition-colors duration-200">
            <Github className="w-6 h-6" />
          </a>
          <a href="#" className="text-white/70 hover:text-white transition-colors duration-200">
            <Twitter className="w-6 h-6" />
          </a>
          <a href="#" className="text-white/70 hover:text-white transition-colors duration-200">
            <Linkedin className="w-6 h-6" />
          </a>
          <a href="#" className="text-white/70 hover:text-white transition-colors duration-200">
            <Mail className="w-6 h-6" />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center pt-8 border-t border-white/20">
          <p className="font-sans text-sm text-white/70">
            © 2024 Ethereum Foundation. Building the future of scalable blockchain infrastructure.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;