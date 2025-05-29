import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/hooks/use-language";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function HelpCenter() {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{t("support.helpCenter.title")} - {t("app.name")}</title>
        <meta name="description" content={`${t("support.helpCenter.desc")} ${t("app.name")}`} />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2 text-center">{t("support.helpCenter.title")}</h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">{t("support.helpCenter.desc")}</p>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-xl font-semibold">
                  {t("how.faq.free.question")}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300">
                  {t("how.faq.free.answer")}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-xl font-semibold">
                  {t("how.faq.legitimate.question")}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300">
                  {t("how.faq.legitimate.answer")}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-xl font-semibold">
                  {t("how.faq.edit.question")}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300">
                  {t("how.faq.edit.answer")}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-xl font-semibold">
                  {t("how.faq.payments.question")}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300">
                  {t("how.faq.payments.answer")}
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-xl font-semibold">
                  Jak mogę stworzyć ogłoszenie kupna?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300">
                  Aby utworzyć ogłoszenie kupna, musisz być zalogowany. Po zalogowaniu kliknij na przycisk "Dodaj ogłoszenie" w menu głównym i wypełnij formularz z opisem tego, czego szukasz, kategorią, budżetem i innymi szczegółami.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-6">
                <AccordionTrigger className="text-xl font-semibold">
                  Jak mogę odpowiedzieć na ogłoszenie kupna?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300">
                  Aby odpowiedzieć na ogłoszenie kupna, przejdź do szczegółów ogłoszenia i kliknij przycisk "Odpowiedz". Wypełnij formularz z opisem oferty i ceną. Musisz być zalogowany, aby odpowiedzieć na ogłoszenie.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          
          <div className="text-center">
            <Link href="/support" className="text-primary hover:underline">
              Powrót do wsparcia
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}