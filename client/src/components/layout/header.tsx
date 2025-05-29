import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/hooks/use-language";
import LanguageSwitcher from "@/components/layout/language-switcher";
import ThemeToggle from "@/components/layout/theme-toggle";
import SearchInput from "@/components/ui/search-input";
import MobileMenu from "@/components/layout/mobile-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Lista administratorów systemu
const ADMIN_EMAILS = ["admin@jakupie.pl", "za@za"];

export default function Header() {
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getInitials = (name: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const navItems = [
    { name: t("nav.browse"), path: "/browse" },
    { name: t("nav.howItWorks"), path: "/how-it-works" },
    { name: t("nav.support"), path: "/support" },
  ];

  return (
    <header className={`sticky top-0 z-50 bg-white dark:bg-background ${scrolled ? "shadow-sm" : ""} transition-shadow duration-300`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between py-3">
          {/* Logo */}
          <div className="flex items-center space-x-2 py-2">
            <Link href="/" className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="polish-icon">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span className="ml-2 text-xl logo-text whitespace-nowrap">{t("app.name")}</span>
            </Link>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 mx-8">
            <SearchInput />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center flex-wrap gap-3 lg:gap-4">
            <LanguageSwitcher />
            <ThemeToggle />
            
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-gray-600 hover:text-primary font-medium px-2 py-1 rounded whitespace-nowrap ${
                  location === item.path ? "text-primary" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}

            {user ? (
              <div className="flex items-center gap-4">
                <Link href="/create-ad">
                  <Button className="whitespace-nowrap px-3 py-2 min-h-10">
                    <i className="fas fa-plus mr-2"></i> {t("nav.postAd")}
                  </Button>
                </Link>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer">
                      <AvatarFallback className="bg-primary text-white">
                        {getInitials(user.fullName)}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>{user.fullName}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link href="/dashboard">
                      <DropdownMenuItem className="cursor-pointer">
                        <i className="fas fa-tachometer-alt mr-2"></i> {t("nav.dashboard")}
                      </DropdownMenuItem>
                    </Link>
                    {/* Panel administratora widoczny tylko dla administratorów */}
                    {ADMIN_EMAILS.includes(user.email) && (
                      <Link href="/admin">
                        <DropdownMenuItem className="cursor-pointer">
                          <i className="fas fa-shield-alt mr-2"></i> Panel Administratora
                        </DropdownMenuItem>
                      </Link>
                    )}
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                      <i className="fas fa-sign-out-alt mr-2"></i> {t("nav.logout")}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
                <Link href="/auth">
                  <Button variant="outline">{t("nav.signIn")}</Button>
                </Link>
                <Link href="/auth?tab=register">
                  <Button>
                    {t("nav.postAd")}
                  </Button>
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <button
              className="text-gray-600 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              <i className={`fas ${mobileMenuOpen ? "fa-times" : "fa-bars"} text-2xl`}></i>
            </button>
          </div>
        </div>

        {/* Search Bar (Mobile) */}
        <div className="pb-4 md:hidden">
          <SearchInput />
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  );
}
