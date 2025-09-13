import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? "header-glass" : "bg-transparent"
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <svg viewBox="0 0 250 250" className="w-6 h-6" fill="none">
                <path d="M125 0L250 62.5V187.5L125 250L0 187.5V62.5L125 0Z" fill="currentColor"/>
                <path d="M125 225L225 175V75L125 25L25 75V175L125 225Z" stroke="white" strokeWidth="10"/>
              </svg>
            </div>
            <div className="font-sans text-lg font-semibold text-foreground">
              Ethereum Foundation <span className="text-gray font-normal">| zkevm</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("about")}
              className="font-sans text-slate hover:text-primary transition-colors duration-200 font-medium"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("roadmap")}
              className="font-sans text-slate hover:text-primary transition-colors duration-200 font-medium"
            >
              Roadmap
            </button>
            <button
              onClick={() => scrollToSection("blog")}
              className="font-sans text-slate hover:text-primary transition-colors duration-200 font-medium"
            >
              Blog
            </button>
            <button
              onClick={() => scrollToSection("book")}
              className="font-sans text-slate hover:text-primary transition-colors duration-200 font-medium"
            >
              The Book
            </button>
            <button
              onClick={() => scrollToSection("team")}
              className="font-sans text-slate hover:text-primary transition-colors duration-200 font-medium"
            >
              Team
            </button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}>
          <div className="py-4 space-y-4 border-t border-border">
            <button
              onClick={() => scrollToSection("about")}
              className="block w-full text-left font-sans text-slate hover:text-primary transition-colors duration-200 font-medium py-2"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("roadmap")}
              className="block w-full text-left font-sans text-slate hover:text-primary transition-colors duration-200 font-medium py-2"
            >
              Roadmap
            </button>
            <button
              onClick={() => scrollToSection("blog")}
              className="block w-full text-left font-sans text-slate hover:text-primary transition-colors duration-200 font-medium py-2"
            >
              Blog
            </button>
            <button
              onClick={() => scrollToSection("book")}
              className="block w-full text-left font-sans text-slate hover:text-primary transition-colors duration-200 font-medium py-2"
            >
              The Book
            </button>
            <button
              onClick={() => scrollToSection("team")}
              className="block w-full text-left font-sans text-slate hover:text-primary transition-colors duration-200 font-medium py-2"
            >
              Team
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;