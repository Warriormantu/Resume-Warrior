'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Logo } from './Logo';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Menu } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/templates', label: 'Resume Templates' },
  { href: '/resume-analyzer', label: 'Resume Analyzer' },
  { href: '/cv-templates', label: 'Cover Letter Generator' },
  { href: '/about', label: 'About' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/contact', label: 'Contact Us' },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Logo id="header" />
          <span className="font-bold font-headline text-lg">Resume Warrior</span>
        </Link>
        <nav className="hidden flex-1 items-center space-x-6 text-sm font-medium md:flex">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'transition-colors hover:text-primary',
                pathname === href ? 'text-primary' : 'text-foreground/60'
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
           <Button asChild className="hidden md:inline-flex">
            <Link href="/templates">Get Started</Link>
          </Button>
           <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                    <Menu className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <div className="p-4">
                    <Link href="/" className="mr-6 flex items-center space-x-2 mb-6" onClick={() => setIsMobileMenuOpen(false)}>
                        <Logo id="mobile-header" />
                        <span className="font-bold font-headline text-lg">Resume Warrior</span>
                    </Link>
                    <nav className="flex flex-col gap-4">
                        {navLinks.map(({ href, label }) => (
                            <Link
                            key={href}
                            href={href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={cn(
                                'transition-colors hover:text-primary text-lg',
                                pathname === href ? 'text-primary' : 'text-foreground/80'
                            )}
                            >
                            {label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </SheetContent>
           </Sheet>
        </div>
      </div>
    </header>
  );
}
