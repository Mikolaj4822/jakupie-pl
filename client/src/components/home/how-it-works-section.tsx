import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/hooks/use-language";
import { polishLabels } from "@/lib/polish-translations";

interface HowItWorksSectionProps {
  detailed?: boolean;
}

export default function HowItWorksSection({ detailed = false }: HowItWorksSectionProps) {
  const { user } = useAuth();
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-white dark:bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 dark:text-white">{polishLabels.howTitle}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-edit text-primary text-xl"></i>
            </div>
            <h3 className="text-xl font-semibold mb-3 dark:text-white">{t("how.step1.title")}</h3>
            <p className="text-gray-600 dark:text-gray-300">
              {t("how.step1.desc")}
              {detailed && ` ${t("how.step1.desc.detailed")}`}
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-comments text-primary text-xl"></i>
            </div>
            <h3 className="text-xl font-semibold mb-3 dark:text-white">{t("how.step2.title")}</h3>
            <p className="text-gray-600 dark:text-gray-300">
              {t("how.step2.desc")}
              {detailed && ` ${t("how.step2.desc.detailed")}`}
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-handshake text-primary text-xl"></i>
            </div>
            <h3 className="text-xl font-semibold mb-3 dark:text-white">{t("how.step3.title")}</h3>
            <p className="text-gray-600 dark:text-gray-300">
              {t("how.step3.desc")}
              {detailed && ` ${t("how.step3.desc.detailed")}`}
            </p>
          </div>
        </div>
        
        {!detailed && (
          <div className="mt-12 text-center">
            <Link href={user ? "/create-ad" : "/auth?tab=register"}>
              <Button>{t("how.cta")}</Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
