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
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="logo flex items-center space-x-3">
          <a href="#" className="flex items-center space-x-3">
            <svg viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
              <path d="M125 0L250 62.5V187.5L125 250L0 187.5V62.5L125 0Z" fill="#0F766E"/>
              <path d="M125 225L225 175V75L125 25L25 75V175L125 225Z" stroke="white" strokeWidth="10"/>
            </svg>
            <div className="logo-text text-lg font-semibold text-gray-900">
              Ethereum Foundation <span className="text-teal-600">| zkevm</span>
            </div>
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