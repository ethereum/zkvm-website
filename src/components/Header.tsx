"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
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
    { href: "#roadmap", label: "Roadmap" },
    { href: "#book", label: "The Book" },
    { href: "#team", label: "Team" },
    { href: "/zkvm-tracker", label: "ZK-EVM Tracker" },
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
        <ul className="hidden lg:flex items-center space-x-2">
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
            <SheetContent side="right" className="w-[280px] sm:w-[320px]">
              <SheetHeader className="pb-6">
                <SheetTitle className="text-left text-lg font-semibold">Menu</SheetTitle>
                <SheetDescription className="text-left text-sm text-gray-500">
                  Navigate to different sections
                </SheetDescription>
              </SheetHeader>
              <nav className="mt-2">
                <ul className="flex flex-col space-y-1">
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
                        className="block text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 transition-all duration-200 py-3 px-4 rounded-lg"
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