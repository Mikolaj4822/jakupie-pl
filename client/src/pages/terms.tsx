import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/hooks/use-language";

export default function Terms() {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{t("support.terms.title")} - {t("app.name")}</title>
        <meta name="description" content={`${t("support.terms.desc")} ${t("app.name")}`} />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2 text-center">{t("support.terms.title")}</h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">{t("support.terms.desc")}</p>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300">
                Ostatnia aktualizacja: 15 maja 2025
              </p>
              
              <h2>1. Akceptacja warunków</h2>
              <p>
                Witamy na JaKupię.pl. Niniejsze Warunki korzystania z usługi określają zasady i przepisy dotyczące korzystania ze strony internetowej JaKupię.pl.
              </p>
              <p>
                Uzyskując dostęp do tej strony, zakładamy, że akceptujesz te warunki. Nie kontynuuj korzystania z JaKupię.pl, jeśli nie zgadzasz się na przyjęcie wszystkich warunków określonych na tej stronie.
              </p>

              <h2>2. Definicje</h2>
              <p>
                Następujące definicje mają zastosowanie do niniejszych Warunków korzystania z usługi:
              </p>
              <ul>
                <li><strong>"JaKupię.pl"</strong> odnosi się do naszej strony internetowej, działającej pod domeną jakupie.pl;</li>
                <li><strong>"Ty"</strong> odnosi się do użytkownika lub przeglądającego naszą stronę internetową;</li>
                <li><strong>"Kupujący"</strong> odnosi się do użytkownika, który zamieszcza ogłoszenie dotyczące produktu, który chce zakupić;</li>
                <li><strong>"Sprzedający"</strong> odnosi się do użytkownika, który odpowiada na ogłoszenie kupna.</li>
              </ul>

              <h2>3. Usługi</h2>
              <p>
                JaKupię.pl to platforma umożliwiająca:
              </p>
              <ul>
                <li>Kupującym - publikowanie ogłoszeń dotyczących produktów, które chcą kupić;</li>
                <li>Sprzedającym - przeglądanie tych ogłoszeń i kontaktowanie się z potencjalnymi kupującymi.</li>
              </ul>

              <h2>4. Konto Użytkownika</h2>
              <p>
                Aby korzystać z niektórych funkcji naszej Strony, możesz zostać poproszony o utworzenie konta. Jesteś odpowiedzialny za utrzymanie poufności swojego konta i hasła oraz za ograniczenie dostępu do swojego komputera, a także przyjmujesz odpowiedzialność za wszystkie działania, które odbywają się na Twoim koncie lub przy użyciu Twojego hasła.
              </p>

              <h2>5. Ogłoszenia</h2>
              <p>
                Kupujący są odpowiedzialni za treść swoich ogłoszeń, w tym za dokładność opisu, uczciwość intencji i zgodność z prawem. Zabrania się publikowania ogłoszeń dotyczących towarów lub usług, które są nielegalne lub naruszają nasze zasady.
              </p>

              <h2>6. Interakcje między Użytkownikami</h2>
              <p>
                JaKupię.pl nie jest stroną w transakcjach między Kupującymi a Sprzedającymi. Wszelkie umowy są zawierane bezpośrednio między tymi stronami. Zalecamy zachowanie ostrożności przy zawieraniu transakcji i sprawdzenie wiarygodności drugiej strony przed dokonaniem płatności.
              </p>

              <h2>7. Prawa własności intelektualnej</h2>
              <p>
                O ile nie zaznaczono inaczej, JaKupię.pl i/lub jego licencjodawcy są właścicielami praw własności intelektualnej do wszystkich materiałów na JaKupię.pl. Wszystkie prawa własności intelektualnej są zastrzeżone.
              </p>

              <h2>8. Ograniczenia</h2>
              <p>
                Użytkownicy nie mogą:
              </p>
              <ul>
                <li>Publikować materiałów, które są szkodliwe, obraźliwe, nieprzyzwoite lub naruszają prywatność innych osób;</li>
                <li>Używać JaKupię.pl w sposób, który może spowodować, że strona zostanie uszkodzona, wyłączona, przeciążona lub naruszona;</li>
                <li>Używać robotów, pająków lub innych urządzeń automatycznych do uzyskiwania dostępu do JaKupię.pl.</li>
              </ul>

              <h2>9. Ograniczenie odpowiedzialności</h2>
              <p>
                W żadnym wypadku JaKupię.pl, jego dyrektorzy, pracownicy, partnerzy, agenci, dostawcy lub podmioty stowarzyszone nie będą odpowiedzialni za jakiekolwiek pośrednie, przypadkowe, specjalne, wynikowe lub karne szkody.
              </p>

              <h2>10. Zakończenie dostępu</h2>
              <p>
                Możemy wypowiedzieć lub zawiesić dostęp do naszej Usługi natychmiast, bez wcześniejszego powiadomienia lub odpowiedzialności, z jakiegokolwiek powodu, w tym bez ograniczeń, jeśli naruszysz niniejsze Warunki.
              </p>

              <h2>11. Zmiany warunków</h2>
              <p>
                Zastrzegamy sobie prawo, według własnego uznania, do modyfikowania lub zastępowania tych Warunków w dowolnym momencie. Ważne zmiany zostaną ogłoszone z 30-dniowym wyprzedzeniem.
              </p>

              <h2>12. Prawo właściwe</h2>
              <p>
                Niniejsze Warunki podlegają i są interpretowane zgodnie z prawem polskim, a korzystanie z naszej Usługi podlega wyłącznie jurysdykcji tego kraju.
              </p>

              <h2>13. Kontakt</h2>
              <p>
                Jeśli masz jakiekolwiek pytania dotyczące niniejszych Warunków, skontaktuj się z nami: kontakt@jakupie.pl
              </p>
            </div>
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