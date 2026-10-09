import React, { useState } from 'react';
import { Search, Menu, X, UtensilsCrossed } from 'lucide-react';

interface NavbarProps {
  onSearchClick: () => void;
  onPlanClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSearchClick, onPlanClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Discover', href: '#discover' },
    { label: 'Recipe Collection', href: '#recipes' },
    { label: 'Kitchen Companion', href: '#companion' },
    { label: 'Community', href: '#community' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFF8E9]/95 backdrop-blur-md border-b border-[#68472F]/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#"
            className="flex items-center gap-2.5 text-slate-900 group whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F3C928] rounded-md py-1"
          >
            <span className="w-9 h-9 rounded-full bg-[#F3C928] text-[#25241F] flex items-center justify-center font-bold shadow-xs">
              <UtensilsCrossed className="w-5 h-5 text-[#25241F]" />
            </span>
            <span className="font-serif-display text-2xl font-bold tracking-tight text-[#25241F]">
              HomeCooking <span className="text-[#68472F] font-normal italic">Companion</span>
            </span>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-[#58554D]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="hover:text-[#25241F] transition-colors whitespace-nowrap shrink-0 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#F3C928] hover:after:w-full after:transition-all after:duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={onSearchClick}
              type="button"
              className="flex items-center gap-2.5 px-4 py-2 text-sm font-medium text-[#25241F] bg-[#FAF2E0] border border-[#68472F]/15 rounded-full hover:bg-white hover:border-[#68472F]/30 transition-all shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F3C928] whitespace-nowrap shrink-0"
              aria-label="Search recipes"
            >
              <Search className="w-4 h-4 text-[#68472F]" />
              <span>Search recipes...</span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono text-[#8B877E] bg-white border border-[#68472F]/15 rounded">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onSearchClick}
              type="button"
              className="p-2 text-[#25241F] hover:bg-[#FAF2E0] rounded-full focus-visible:ring-2 focus-visible:ring-[#F3C928]"
              aria-label="Search recipes"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 text-[#25241F] hover:bg-[#FAF2E0] rounded-full focus-visible:ring-2 focus-visible:ring-[#F3C928]"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#68472F]/10 bg-[#FFF8E9] px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-base font-medium text-[#25241F] hover:text-[#68472F] py-2 border-b border-[#68472F]/5"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onPlanClick();
              }}
              type="button"
              className="w-full py-2.5 px-4 bg-[#F3C928] text-[#25241F] font-semibold rounded-lg text-center shadow-xs"
            >
              Open Kitchen Companion
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
