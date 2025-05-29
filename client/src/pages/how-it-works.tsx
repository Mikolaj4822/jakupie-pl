import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import HowItWorksSection from "@/components/home/how-it-works-section";
import CtaSection from "@/components/home/cta-section";
import { useLanguage } from "@/hooks/use-language";

export default function HowItWorks() {
  const { t } = useLanguage();
  
  return (
    <>
      <Helmet>
        <title>{t("how.title")} - {t("app.name")}</title>
        <meta name="description" content={t("how.subtitle")} />
      </Helmet>
      
      <div className="bg-gradient-to-r from-slate-700 to-slate-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">{t("how.title")}</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            {t("how.subtitle")}
          </p>
        </div>
      </div>
      
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">{t("how.why")}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-coins text-slate-700"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">{t("how.better_prices.title")}</h3>
                <p className="text-gray-600">
                  {t("how.better_prices.desc")}
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-clock text-slate-700"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">{t("how.save_time.title")}</h3>
                <p className="text-gray-600">
                  {t("how.save_time.desc")}
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-bullseye text-slate-700"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">{t("how.find_exact.title")}</h3>
                <p className="text-gray-600">
                  {t("how.find_exact.desc")}
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-shield-alt text-slate-700"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">{t("how.control.title")}</h3>
                <p className="text-gray-600">
                  {t("how.control.desc")}
                </p>
              </div>
            </div>
          </section>
          
          <HowItWorksSection detailed />
          
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">{t("how.faq.title")}</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">{t("how.faq.free.question")}</h3>
                <p className="text-gray-600">
                  {t("how.faq.free.answer")}
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">{t("how.faq.legitimate.question")}</h3>
                <p className="text-gray-600">
                  {t("how.faq.legitimate.answer")}
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">{t("how.faq.edit.question")}</h3>
                <p className="text-gray-600">
                  {t("how.faq.edit.answer")}
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">{t("how.faq.payments.question")}</h3>
                <p className="text-gray-600">
                  {t("how.faq.payments.answer")}
                </p>
              </div>
            </div>
          </section>
          
          <div className="text-center">
            <Link href="/create-ad">
              <Button size="lg" className="bg-slate-700 hover:bg-slate-800">
                <i className="fas fa-plus mr-2"></i> {t("how.post_first")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <CtaSection />
    </>
  );
}
