'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MinimalHeader() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Learn', href: '/learn' },
    { label: 'Track', href: '/track' },
    { label: 'Clients', href: '/clients' },
    { label: 'zkVMs', href: '/zkvms' },
    { label: 'Blog', href: '/blog' }
  ];

  const isActive = (href: string) => {
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">Ethereum ZK L1</span>
        </Link>

        <nav className="flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive(item.href)
                  ? 'text-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
