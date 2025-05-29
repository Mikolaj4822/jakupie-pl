import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/hooks/use-language";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();
  const { t } = useLanguage();

  const handleLogout = () => {
    logoutMutation.mutate();
    onClose();
  };

  const handleNavigation = () => {
    onClose();
  };

  const navItems = [
    { name: t("nav.browse"), path: "/browse" },
    { name: t("nav.howItWorks"), path: "/how-it-works" },
    { name: t("nav.support"), path: "/support" },
  ];

  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-white border-t border-gray-200 py-2">
      <div className="container mx-auto px-4">
        <nav className="flex flex-col space-y-4 py-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={handleNavigation}
              className={`text-gray-600 hover:text-primary font-medium py-2 ${
                location === item.path ? "text-primary" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}

          {user ? (
            <>
              <Link
                href="/dashboard"
                onClick={handleNavigation}
                className="text-gray-600 hover:text-primary font-medium py-2"
              >
                <i className="fas fa-tachometer-alt mr-2"></i> {t("nav.dashboard")}
              </Link>
              <button
                onClick={handleLogout}
                className="text-left text-gray-600 hover:text-primary font-medium py-2"
              >
                <i className="fas fa-sign-out-alt mr-2"></i> {t("nav.logout")}
              </button>
              <div className="flex pt-2">
                <Link href="/create-ad" onClick={handleNavigation} className="w-full">
                  <Button className="w-full">
                    <i className="fas fa-plus mr-2"></i> {t("nav.postAd")}
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <div className="flex space-x-4 pt-2">
              <Link href="/auth" onClick={handleNavigation} className="flex-1">
                <Button variant="outline" className="w-full">
                  {t("nav.signIn")}
                </Button>
              </Link>
              <Link href="/auth?tab=register" onClick={handleNavigation} className="flex-1">
                <Button className="w-full">
                  {t("nav.register")}
                </Button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
}
