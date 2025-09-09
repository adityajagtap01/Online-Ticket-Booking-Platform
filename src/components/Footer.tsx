import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const footerLinks = {
    'About Vibeverse': [
      { label: 'About Us', page: 'about' },
      { label: 'Careers', page: 'careers' },
      { label: 'Press', page: 'press' },
      { label: 'Blog', page: 'blog' },
    ],
    'Support': [
      { label: 'Help Center', page: 'help' },
      { label: 'Contact Us', page: 'contact' },
      { label: 'Ticket Support', page: 'ticket-support' },
      { label: 'Refund Policy', page: 'refund' },
    ],
    'Legal': [
      { label: 'Terms & Conditions', page: 'terms' },
      { label: 'Privacy Policy', page: 'privacy' },
      { label: 'Cookie Policy', page: 'cookies' },
      { label: 'Disclaimer', page: 'disclaimer' },
    ],
    'Categories': [
      { label: 'Movies', page: 'movies' },
      { label: 'Sports', page: 'sports' },
      { label: 'Live Streams', page: 'stream' },
      { label: 'Concerts', page: 'concerts' },
    ],
  };

  return (
    <footer className="bg-secondary mt-auto">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">V</span>
              </div>
              <span className="font-bold text-xl text-foreground">Vibeverse</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-xs">
              Experience Movies, Sports & Streams with Vibeverse. Your premier destination for entertainment tickets.
            </p>
            <div className="flex space-x-4">
              <button className="text-muted-foreground hover:text-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </button>
              <button className="text-muted-foreground hover:text-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </button>
              <button className="text-muted-foreground hover:text-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </button>
              <button className="text-muted-foreground hover:text-accent transition-colors">
                <Youtube className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="lg:col-span-1">
              <h4 className="font-semibold text-foreground mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.page}>
                    <button
                      onClick={() => onNavigate(link.page)}
                      className="text-muted-foreground hover:text-accent transition-colors text-sm"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            © 2025 Vibeverse. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <button
              onClick={() => onNavigate('terms')}
              className="text-muted-foreground hover:text-accent transition-colors text-sm"
            >
              Terms
            </button>
            <button
              onClick={() => onNavigate('privacy')}
              className="text-muted-foreground hover:text-accent transition-colors text-sm"
            >
              Privacy
            </button>
            <button
              onClick={() => onNavigate('help')}
              className="text-muted-foreground hover:text-accent transition-colors text-sm"
            >
              Support
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}