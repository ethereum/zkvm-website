"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/Logo";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  const navItems = [
    { href: "/track", label: "Track" },
    { href: "/blog", label: "Blog" },
    { href: "/media", label: "Media" },
  ];

  return (
    <header
      className="fixed top-0 w-full backdrop-blur-sm z-[100] border-b shadow-sm"
      style={{
        backgroundColor: isDark ? "rgba(3,7,18,0.95)" : "rgba(255,255,255,0.95)",
        borderColor: isDark ? "rgb(31,41,55)" : "rgb(229,231,235)",
      }}
    >
      <nav className="max-w-[1200px] mx-auto px-4 py-4 flex items-center justify-between">
        <div className="logo flex items-center">
          <Link href="/" className="flex items-center">
            <Logo className="h-9 w-auto" variant="blue" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex items-center gap-4">
          <ul className="flex items-center" style={{gap: '1rem'}}>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors duration-200 font-medium hover:text-[#0C9FDE]"
                  style={{ color: isDark ? "#d1d5db" : "#374151" }}
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
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-[#0C9FDE]"
                style={{ color: isDark ? "#d1d5db" : "#374151" }}
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full h-full z-[200] p-[1.3rem] flex flex-col">
              <SheetHeader className="pb-6">
                <div className="flex justify-center">
                  <Link href="/" className="flex items-center">
                    <Logo className="h-8 w-auto" variant="blue" />
                  </Link>
                </div>
              </SheetHeader>
              <nav className="flex-1 flex items-center justify-center">
                <ul className="flex flex-col w-full" style={{ gap: '1rem' }}>
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block w-full text-center font-medium hover:text-[#0C9FDE] transition-all duration-200 py-3 px-4 rounded-lg"
                        style={{ color: isDark ? "#d1d5db" : "#374151", fontSize: '1.3rem' }}
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
