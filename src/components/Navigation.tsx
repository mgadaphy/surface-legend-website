import { Button } from "@/components/ui/button";
import { Menu, X, Globe } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

/**
 * Responsive Navigation Component
 * Design System: Craftsmanship Modernism
 * Features: Desktop nav + Mobile hamburger menu with smooth animations
 */

interface NavigationProps {
  currentPage?: string;
}

export function Navigation({ currentPage = "home" }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
  };

  const navLinks = [
    { href: "/about", label: "nav.about" },
    { href: "/services", label: "nav.services" },
    { href: "/products", label: "nav.products" },
    { href: "/academy", label: "nav.academy" },
    { href: "/portfolio", label: "nav.portfolio" },
    { href: "/contact", label: "nav.contact" }
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-muted shadow-sm">
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3">
          <img src="/images/logo.png" alt="Surface Legend" className="h-10 w-auto" />
          <span className="text-lg md:text-xl font-bold text-primary" style={{ fontFamily: "'Playfair Display', serif" }}>
            Surface Legend
          </span>
        </a>

        {/* Desktop Navigation - Large screens */}
        <div className="hidden xl:flex gap-5 text-sm font-medium text-primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`hover:text-accent transition-colors whitespace-nowrap ${currentPage === link.href.slice(1) ? "font-semibold text-accent" : ""
                }`}
            >
              {i18n.exists(link.label) ? i18n.t(link.label) : link.label}
            </a>
          ))}
        </div>

        {/* Desktop Navigation - Medium-large screens */}
        <div className="hidden lg:flex xl:hidden gap-4 text-sm font-medium text-primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`hover:text-accent transition-colors whitespace-nowrap ${currentPage === link.href.slice(1) ? "font-semibold text-accent" : ""
                }`}
            >
              {i18n.exists(link.label) ? i18n.t(link.label) : link.label}
            </a>
          ))}
        </div>

        {/* Desktop WhatsApp Button - Show on lg and above */}
        <div className="hidden lg:flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="font-bold text-primary hover:text-white gap-2"
          >
            <Globe className="w-4 h-4" />
            {i18n.language === 'fr' ? 'EN' : 'FR'}
          </Button>
          <a href="https://wa.me/237679235879" target="_blank" rel="noopener noreferrer">
            <Button className="btn-primary text-sm whitespace-nowrap">WhatsApp</Button>
          </a>
        </div>

        {/* Mobile Menu Button - Show on tablets and below */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden p-2 text-primary hover:bg-secondary rounded-lg transition-colors"
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {
        mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-muted animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="container py-4 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${currentPage === link.href.slice(1)
                    ? "bg-accent text-white"
                    : "text-primary hover:bg-secondary"
                    }`}
                >
                  {i18n.exists(link.label) ? i18n.t(link.label) : link.label}
                </a>
              ))}
              <a href="https://wa.me/237679235879" target="_blank" rel="noopener noreferrer" className="block">
                <Button className="w-full btn-primary text-sm mt-2">WhatsApp</Button>
              </a>
              <Button
                variant="outline"
                className="w-full justify-start gap-2 mt-2"
                onClick={() => {
                  toggleLanguage();
                  closeMobileMenu();
                }}
              >
                <Globe className="w-4 h-4" />
                Switch to {i18n.language === 'fr' ? 'English' : 'Français'}
              </Button>
            </div>
          </div>
        )
      }
    </nav >
  );
}
