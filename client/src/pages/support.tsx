import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/hooks/use-language";

export default function Support() {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{t("support.title")} - {t("app.name")}</title>
        <meta name="description" content={`${t("support.title")} ${t("app.name")}`} />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">{t("support.title")}</h1>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
            <div className="space-y-6">
              <Link href="/help-center">
                <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200 cursor-pointer">
                  <h2 className="text-2xl font-semibold mb-2">{t("support.helpCenter.title")}</h2>
                  <p className="text-gray-600 dark:text-gray-300">{t("support.helpCenter.desc")}</p>
                </div>
              </Link>
              
              <Link href="/safety-tips">
                <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200 cursor-pointer">
                  <h2 className="text-2xl font-semibold mb-2">{t("support.safetyTips.title")}</h2>
                  <p className="text-gray-600 dark:text-gray-300">{t("support.safetyTips.desc")}</p>
                </div>
              </Link>
              
              <Link href="/contact">
                <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200 cursor-pointer">
                  <h2 className="text-2xl font-semibold mb-2">{t("support.contact.title")}</h2>
                  <p className="text-gray-600 dark:text-gray-300">{t("support.contact.desc")}</p>
                </div>
              </Link>
              
              <Link href="/privacy-policy">
                <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200 cursor-pointer">
                  <h2 className="text-2xl font-semibold mb-2">{t("support.privacy.title")}</h2>
                  <p className="text-gray-600 dark:text-gray-300">{t("support.privacy.desc")}</p>
                </div>
              </Link>
              
              <Link href="/terms">
                <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200 cursor-pointer">
                  <h2 className="text-2xl font-semibold mb-2">{t("support.terms.title")}</h2>
                  <p className="text-gray-600 dark:text-gray-300">{t("support.terms.desc")}</p>
                </div>
              </Link>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-lg mb-4">{t("support.needHelp")}</p>
            <Link href="/contact" className="inline-block bg-primary text-white py-3 px-6 rounded-md hover:bg-primary-dark transition duration-200">
              {t("support.contactSupport")}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}