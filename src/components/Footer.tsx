import Link from 'next/link';
import { Logo } from './Logo';

const footerLinks = [
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact Us' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/terms-of-service', label: 'Terms of Service' },
    { href: '/privacy-policy', label: 'Privacy Policy' },
]

export function Footer() {
  return (
    <footer className="bg-secondary">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <Logo id="footer" />
                <span className="font-bold font-headline text-lg">Resume Warrior</span>
            </div>
          <nav className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-sm font-medium mb-4 md:mb-0">
            {footerLinks.map(({ href, label }) => (
              <Link key={href} href={href} className="text-foreground/80 hover:text-primary transition-colors">
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-foreground/60">
            <p>&copy; {new Date().getFullYear()} Resume Warrior. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
