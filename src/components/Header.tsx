"use client";

import { Menu, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { href: "/#roadmap", label: "Roadmap" },
    { href: "/#team", label: "Team" },
    { href: "/zkvm-tracker", label: "zkEVM Tracker" },
    { href: "#book", label: "The Book", isExternal: true },
  ];

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-[100] border-b border-gray-200 shadow-sm">
      <nav className="max-w-[1200px] mx-auto px-4 py-4 flex items-center justify-between">
        <div className="logo flex items-center">
          <Link href="/" className="flex items-center">
            <Image 
              src="/logo.svg" 
              alt="Ethereum Foundation zkEVM" 
              width={120}
              height={120}
              className="h-10 w-auto"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden sm:flex items-center" style={{gap: '1rem'}}>
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => {
                  if (item.href.startsWith('#')) {
                    e.preventDefault();
                    scrollToSection(item.href.substring(1));
                  }
                  // For external links (like /zkvm-tracker), let the default behavior handle it
                }}
                className="text-gray-700 hover:text-[#0C9FDE] transition-colors duration-200 font-medium inline-flex items-center gap-1"
              >
                {item.label}
                {item.isExternal && <ExternalLink className="w-3 h-3" />}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Navigation */}
        <div className="sm:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-700 hover:text-[#0C9FDE]">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full h-full z-[200] p-[1.3rem] flex flex-col">
              <SheetHeader className="pb-6">
                <div className="flex justify-center">
                  <Link href="/" className="flex items-center">
                    <Image 
                      src="/logo.svg" 
                      alt="Ethereum Foundation zkEVM" 
                      width={120}
                      height={120}
                      className="h-8 w-auto"
                    />
                  </Link>
                </div>
              </SheetHeader>
              <nav className="flex-1 flex items-center justify-center">
                <ul className="flex flex-col w-full" style={{ gap: '1rem' }}>
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        onClick={(e) => {
                          if (item.href.startsWith('#')) {
                            e.preventDefault();
                            scrollToSection(item.href.substring(1));
                          }
                          // For external links (like /zkvm-tracker), let the default behavior handle it
                        }}
                        className="block w-full text-center font-medium text-gray-700 hover:text-[#0C9FDE] hover:bg-gray-50 transition-all duration-200 py-3 px-4 rounded-lg inline-flex items-center justify-center gap-1"
                        style={{ fontSize: '1.3rem' }}
                      >
                        {item.label}
                        {item.isExternal && <ExternalLink className="w-3 h-3" />}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Header;
