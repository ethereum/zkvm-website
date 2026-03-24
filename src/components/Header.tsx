"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
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
  const textColor = isDark ? "#0a1628" : "#ffffff";

  const navItems = [
    { href: "/track", label: "Track" },
    { href: "/blog", label: "Blog" },
    { href: "/media", label: "Media" },
  ];

  return (
    <header
      className="fixed top-0 w-full backdrop-blur-md z-[100] border-b shadow-sm"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--accent-blue) 97%, transparent)',
        borderColor: isDark ? "rgba(10,22,40,0.2)" : "rgba(255,255,255,0.2)",
      }}
    >
      <nav className="max-w-[1200px] mx-auto px-4 py-4 flex items-center justify-between">
        <div className="logo flex items-center">
          <Link href="/" className="flex items-center">
            <Logo className="h-9 w-auto" variant="header" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex items-center gap-4">
          <ul className="flex items-center" style={{ gap: '1rem' }}>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-opacity duration-200 font-medium hover:opacity-70"
                  style={{ color: textColor }}
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
                className="hover:opacity-70"
                style={{ color: textColor }}
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
                        className="block w-full text-center font-medium text-foreground hover:text-[var(--accent-link)] transition-all duration-200 py-3 px-4 rounded-lg"
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
