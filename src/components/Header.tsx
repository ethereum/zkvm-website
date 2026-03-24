"use client";

import { Menu } from "lucide-react";
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
import { ThemeToggle } from "@/components/ThemeToggle";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/track", label: "Track" },
    { href: "/blog", label: "Blog" },
    { href: "/media", label: "Media" },
  ];

  return (
    <header className="fixed top-0 w-full bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm z-[100] border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <nav className="max-w-[1200px] mx-auto px-4 py-4 flex items-center justify-between">
        <div className="logo flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.svg"
              alt="Ethereum Foundation zkEVM"
              width={120}
              height={120}
              className="h-10 w-auto dark:brightness-200"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex items-center gap-4">
          <ul className="flex items-center" style={{gap: '1rem'}}>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-[#0C9FDE] dark:hover:text-[#0C9FDE] transition-colors duration-200 font-medium"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>

        {/* Mobile Navigation */}
        <div className="sm:hidden flex items-center gap-2">
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-700 dark:text-gray-300 hover:text-[#0C9FDE]">
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
                      className="h-8 w-auto dark:brightness-200"
                    />
                  </Link>
                </div>
              </SheetHeader>
              <nav className="flex-1 flex items-center justify-center">
                <ul className="flex flex-col w-full" style={{ gap: '1rem' }}>
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block w-full text-center font-medium text-gray-700 dark:text-gray-300 hover:text-[#0C9FDE] hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 py-3 px-4 rounded-lg"
                        style={{ fontSize: '1.3rem' }}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
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
