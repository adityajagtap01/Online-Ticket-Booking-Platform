import React, { useState } from 'react';
import { Menu, X, Search, User } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

interface NavigationProps {
  currentPage?: string;
  onNavigate: (page: string) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'movies', label: 'Movies' },
    { id: 'sports', label: 'Sports' },
    { id: 'stream', label: 'Stream' },
  ];

  const NavLinks = () => (
    <>
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
            currentPage === item.id
              ? 'bg-primary text-primary-foreground'
              : 'text-foreground hover:bg-accent hover:text-accent-foreground'
          }`}
        >
          {item.label}
        </button>
      ))}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">V</span>
            </div>
            <span className="font-bold text-xl text-foreground">Vibeverse</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLinks />
          </div>

          {/* Search and Auth Buttons */}
          <div className="flex items-center space-x-2">
            {/* Search */}
            <div className="hidden sm:flex items-center">
              {isSearchOpen ? (
                <div className="flex items-center space-x-2">
                  <Input 
                    placeholder="Search movies, sports, events..."
                    className="w-64"
                    autoFocus
                  />
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onNavigate('login')}
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Login
              </Button>
              <Button 
                size="sm"
                onClick={() => onNavigate('signup')}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Signup
              </Button>
            </div>

            {/* Profile (hidden by default, shown when logged in) */}
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onNavigate('profile')}
              className={`hidden ${currentPage === 'profile' ? 'bg-accent' : ''}`}
            >
              <User className="h-4 w-4" />
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col space-y-4 mt-8">
                  <div className="pb-4 border-b">
                    <Input 
                      placeholder="Search..."
                      className="w-full"
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <NavLinks />
                  </div>
                  <div className="pt-4 border-t space-y-2">
                    <button
                      onClick={() => onNavigate('login')}
                      className="w-full px-4 py-2 rounded-lg border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => onNavigate('signup')}
                      className="w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      Signup
                    </button>
                    <button
                      onClick={() => onNavigate('profile')}
                      className="w-full text-left px-4 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors hidden"
                    >
                      Profile
                    </button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}