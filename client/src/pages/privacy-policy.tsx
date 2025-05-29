import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/hooks/use-language";

export default function PrivacyPolicy() {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{t("support.privacy.title")} - {t("app.name")}</title>
        <meta name="description" content={`${t("support.privacy.desc")} ${t("app.name")}`} />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2 text-center">{t("support.privacy.title")}</h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">{t("support.privacy.desc")}</p>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300">
                Ostatnia aktualizacja: 15 maja 2025
              </p>
              
              <h2>1. Wprowadzenie</h2>
              <p>
                JaKupię.pl ("my", "nas", "nasza") szanuje Twoją prywatność i zobowiązuje się do jej ochrony poprzez przestrzeganie niniejszej Polityki Prywatności.
              </p>
              <p>
                Niniejsza Polityka Prywatności opisuje rodzaje informacji, które możemy gromadzić od Ciebie lub które możesz nam dostarczyć podczas korzystania z naszej strony internetowej JaKupię.pl (naszej "Strony") oraz wszystkie powiązane z nią aplikacje, oraz nasze praktyki w zakresie gromadzenia, wykorzystywania, ochrony i ujawniania tych informacji.
              </p>

              <h2>2. Informacje, które gromadzimy</h2>
              <p>
                Możemy zbierać różne rodzaje informacji od użytkowników naszej Strony, w tym informacje:
              </p>
              <ul>
                <li>Które umożliwiają identyfikację, takie jak imię i nazwisko, adres e-mail, numer telefonu, adres pocztowy lub inne dane kontaktowe ("dane osobowe");</li>
                <li>Które są wykorzystywane do celów rozliczeniowych, jeśli dokonujesz zakupu lub rejestrujesz się dla usług premium;</li>
                <li>O Twoich połączeniach internetowych, używanym sprzęcie, z którego uzyskujesz dostęp do naszej Strony i dane dotyczące użytkowania;</li>
                <li>Które nie pozwalają na bezpośrednią identyfikację, ale mogą zostać wykorzystane do celów analitycznych, takie jak wzorce użytkowania i preferencje.</li>
              </ul>

              <h2>3. Jak wykorzystujemy Twoje informacje</h2>
              <p>
                Możemy wykorzystywać informacje, które gromadzimy o Tobie lub które nam przekazujesz, w tym wszelkie dane osobowe:
              </p>
              <ul>
                <li>Do prezentowania naszej Strony i jej treści w sposób odpowiedni dla Ciebie;</li>
                <li>Do świadczenia usług, o które prosisz;</li>
                <li>Do wypełnienia naszych zobowiązań wynikających z umów zawartych między Tobą a nami;</li>
                <li>Do powiadamiania Cię o zmianach na naszej Stronie lub produktach i usługach, które oferujemy;</li>
                <li>Do umożliwienia uczestnictwa w interaktywnych funkcjach naszej Strony;</li>
                <li>W dowolny inny sposób, który opiszemy podczas zbierania informacji;</li>
                <li>Do dowolnych innych celów za Twoją zgodą.</li>
              </ul>

              <h2>4. Udostępnianie Twoich informacji</h2>
              <p>
                Możemy ujawniać zagregowane informacje o naszych użytkownikach oraz informacje, które nie identyfikują żadnego użytkownika, bez ograniczeń. Możemy udostępniać Twoje dane osobowe:
              </p>
              <ul>
                <li>Naszym spółkom zależnym i powiązanym;</li>
                <li>Wykonawcom, usługodawcom i innym stronom trzecim, których wykorzystujemy do wspierania naszej działalności;</li>
                <li>Nabywcy lub jego następcom prawnymi w przypadku fuzji, sprzedaży aktywów spółki, finansowania lub przejęcia całości lub części naszej firmy;</li>
                <li>Aby spełnić cel, dla którego je dostarczyłeś;</li>
                <li>Do celów określonych w niniejszej Polityce Prywatności;</li>
                <li>Z Twoją zgodą.</li>
              </ul>

              <h2>5. Wybory dotyczące wykorzystania i ujawniania Twoich informacji</h2>
              <p>
                Zapewniamy Ci możliwość wyboru dotyczącego wykorzystania i ujawniania przez nas Twoich danych osobowych:
              </p>
              <ul>
                <li>Możesz zrezygnować z otrzymywania od nas wiadomości e-mail, postępując zgodnie z instrukcjami rezygnacji, które znajdują się w każdej wiadomości e-mail;</li>
                <li>Możesz poprosić o usunięcie swoich danych osobowych z naszej bazy danych, kontaktując się z nami;</li>
                <li>Możesz zrezygnować z używania plików cookie lub podobnych technologii, dostosowując ustawienia swojej przeglądarki.</li>
              </ul>

              <h2>6. Dostęp do swoich informacji i ich aktualizacja</h2>
              <p>
                Możesz przeglądać i aktualizować swoje dane osobowe, logując się na swoje konto i przeglądając swój profil lub dane konta. Możesz również skontaktować się z nami, aby poprosić o dostęp, poprawienie lub usunięcie wszelkich danych osobowych, które nam dostarczyłeś.
              </p>

              <h2>7. Bezpieczeństwo danych</h2>
              <p>
                Wdrożyliśmy odpowiednie środki mające na celu zapewnienie bezpieczeństwa Twoich danych osobowych. Jednakże, metody transmisji elektronicznej i przechowywania danych nie są w 100% bezpieczne. Dlatego nie możemy zapewnić absolutnego bezpieczeństwa jakichkolwiek informacji, które nam przekazujesz.
              </p>

              <h2>8. Zmiany w naszej Polityce Prywatności</h2>
              <p>
                Możemy aktualizować naszą Politykę Prywatności od czasu do czasu. Jeśli dokonamy istotnych zmian w sposobie, w jaki traktujemy dane osobowe naszych użytkowników, powiadomimy Cię poprzez umieszczenie powiadomienia na naszej stronie internetowej lub bezpośrednio wysyłając Ci powiadomienie.
              </p>

              <h2>9. Kontakt</h2>
              <p>
                Jeśli masz jakiekolwiek pytania dotyczące niniejszej Polityki Prywatności, skontaktuj się z nami: kontakt@jakupie.pl
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