"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { href: "#about", label: "About" },
    { href: "#roadmap", label: "Roadmap" },
    { href: "#blog", label: "Blog" },
    { href: "#book", label: "The Book" },
    { href: "#team", label: "Team" },
    { href: "#meetings", label: "Meetings" },
  ];

  return (
    <header className="fixed top-0 w-full bg-white/70 backdrop-blur-sm z-50 border-b border-gray-200 shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="logo flex items-center">
          <a href="#" className="flex items-center">
            <img 
              src="/logo.png" 
              alt="Ethereum Foundation zkEVM" 
              className="h-10 w-auto"
            />
          </a>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href.substring(1));
                }}
                className="text-gray-700 hover:text-teal-600 transition-colors duration-200 font-medium"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-700 hover:text-teal-600">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="text-left">Navigation</SheetTitle>
                <SheetDescription className="text-left">
                  Navigate to different sections of the site
                </SheetDescription>
              </SheetHeader>
              <nav className="mt-8">
                <ul className="flex flex-col space-y-6">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection(item.href.substring(1));
                        }}
                        className="block text-xl font-medium text-gray-700 hover:text-teal-600 transition-colors duration-200 py-3 border-b border-gray-100 last:border-b-0"
                      >
                        {item.label}
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