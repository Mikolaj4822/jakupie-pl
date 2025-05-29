import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/hooks/use-language";

export default function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <i className="fas fa-shopping-basket text-primary text-2xl"></i>
              <span className="text-xl font-bold text-white">{t("app.name")}</span>
            </div>
            <p className="mb-4">{t("footer.description")}</p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-white"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-white">
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link href="/browse" className="hover:text-white">
                  {t("nav.browse")}
                </Link>
              </li>
              <li>
                <Link href="/create-ad" className="hover:text-white">
                  {t("nav.postAd")}
                </Link>
              </li>
              <li>
                <Link href="/browse" className="hover:text-white">
                  {t("categories.title")}
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-white">
                  {t("nav.howItWorks")}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">{t("footer.support")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help-center" className="hover:text-white">
                  {t("footer.helpCenter")}
                </Link>
              </li>
              <li>
                <Link href="/safety-tips" className="hover:text-white">
                  {t("footer.safetyTips")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  {t("footer.contact")}
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white">
                  {t("footer.privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link href="/rodo-policy" className="hover:text-white">
                  {t("footer.rodoPolicy")}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white">
                  {t("footer.terms")}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">{t("footer.stayUpdated")}</h3>
            <p className="mb-4">{t("footer.newsletter")}</p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <Input 
                type="email" 
                placeholder={t("footer.emailPlaceholder")} 
                className="flex-1 rounded-r-none bg-gray-700 border-gray-600 text-white" 
              />
              <Button 
                type="submit" 
                className="rounded-l-none"
              >
                {t("footer.subscribe")}
              </Button>
            </form>
          </div>
        </div>
        
        <div className="pt-8 mt-8 border-t border-gray-700 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} {t("app.name")}. {t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
