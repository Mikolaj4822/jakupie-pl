import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/hooks/use-language";

export default function RODOPolicy() {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>Regulamin RODO - {t("app.name")}</title>
        <meta name="description" content={`Regulamin RODO serwisu ${t("app.name")}. Dowiedz się jak chronimy Twoje dane osobowe zgodnie z RODO.`} />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2 text-center">Regulamin RODO</h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">Ochrona danych osobowych w serwisie JaKupię.pl</p>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300">
                Ostatnia aktualizacja: 16 maja 2025
              </p>
              
              <h2>1. Administratorem Twoich danych osobowych</h2>
              <p>
                Administratorem Twoich danych osobowych jest JaKupię.pl sp. z o.o. z siedzibą w Warszawie, ul. Przykładowa 123, 00-001 Warszawa, wpisana do rejestru przedsiębiorców Krajowego Rejestru Sądowego pod numerem KRS 0000000000, NIP 0000000000, REGON 000000000 ("Administrator").
              </p>

              <h2>2. Inspektor Ochrony Danych</h2>
              <p>
                Administrator wyznaczył Inspektora Ochrony Danych, z którym możesz się skontaktować w sprawach związanych z ochroną danych osobowych pod adresem e-mail: iod@jakupie.pl lub pisemnie na adres siedziby Administratora.
              </p>

              <h2>3. Podstawa prawna i cel przetwarzania danych osobowych</h2>
              <p>
                Twoje dane osobowe są przetwarzane zgodnie z przepisami Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (ogólne rozporządzenie o ochronie danych) ("RODO").
              </p>
              <p>
                Przetwarzamy Twoje dane osobowe w następujących celach:
              </p>
              <ul>
                <li>Realizacja umowy o świadczenie usług drogą elektroniczną (art. 6 ust. 1 lit. b RODO);</li>
                <li>Obsługa procesu rejestracji na Stronie i zarządzanie Twoim kontem (art. 6 ust. 1 lit. b RODO);</li>
                <li>Obsługa procesu składania i realizacji Twoich ogłoszeń (art. 6 ust. 1 lit. b RODO);</li>
                <li>Obsługa zapytań i reklamacji (art. 6 ust. 1 lit. b RODO);</li>
                <li>Marketing bezpośredni naszych produktów i usług (art. 6 ust. 1 lit. f RODO);</li>
                <li>Analiza zachowań użytkowników na Stronie w celu jej optymalizacji i poprawy (art. 6 ust. 1 lit. f RODO);</li>
                <li>Ustalenie, dochodzenie lub obrona przed roszczeniami (art. 6 ust. 1 lit. f RODO).</li>
              </ul>

              <h2>4. Kategorie przetwarzanych danych osobowych</h2>
              <p>
                Przetwarzamy następujące kategorie Twoich danych osobowych:
              </p>
              <ul>
                <li>Dane identyfikacyjne (imię, nazwisko, nazwa użytkownika);</li>
                <li>Dane kontaktowe (adres e-mail, numer telefonu, adres korespondencyjny);</li>
                <li>Dane o lokalizacji (miasto, region, kod pocztowy);</li>
                <li>Dane o preferencjach i zainteresowaniach (kategorie ogłoszeń);</li>
                <li>Dane o aktywności na Stronie (historia ogłoszeń, wyszukiwań, odsłon);</li>
                <li>Dane techniczne (adres IP, informacje o urządzeniu i przeglądarce).</li>
              </ul>

              <h2>5. Odbiorcy danych osobowych</h2>
              <p>
                Twoje dane osobowe mogą być przekazywane następującym kategoriom odbiorców:
              </p>
              <ul>
                <li>Podmiotom świadczącym usługi na rzecz Administratora, takim jak dostawcy usług IT, hostingowych, płatniczych, marketingowych, księgowych, prawnych;</li>
                <li>Organom państwowym lub innym podmiotom uprawnionym na podstawie przepisów prawa;</li>
                <li>Innym użytkownikom Strony w zakresie niezbędnym do realizacji usług (np. dane kontaktowe w ogłoszeniach).</li>
              </ul>

              <h2>6. Okres przechowywania danych osobowych</h2>
              <p>
                Twoje dane osobowe będą przechowywane przez następujące okresy:
              </p>
              <ul>
                <li>Dane związane z kontem użytkownika - przez okres posiadania konta oraz przez okres 3 lat po jego usunięciu;</li>
                <li>Dane związane z ogłoszeniami - przez okres aktywności ogłoszenia oraz przez okres 3 lat po jego wygaśnięciu lub usunięciu;</li>
                <li>Dane niezbędne do celów podatkowych i księgowych - przez okres wymagany przepisami prawa;</li>
                <li>Dane przetwarzane na podstawie prawnie uzasadnionego interesu Administratora - do czasu zgłoszenia skutecznego sprzeciwu.</li>
              </ul>

              <h2>7. Prawa osób, których dane dotyczą</h2>
              <p>
                W związku z przetwarzaniem Twoich danych osobowych przysługują Ci następujące prawa:
              </p>
              <ul>
                <li>Prawo dostępu do swoich danych oraz otrzymania ich kopii;</li>
                <li>Prawo do sprostowania (poprawiania) swoich danych;</li>
                <li>Prawo do usunięcia danych ("prawo do bycia zapomnianym");</li>
                <li>Prawo do ograniczenia przetwarzania danych;</li>
                <li>Prawo do przenoszenia danych;</li>
                <li>Prawo wniesienia sprzeciwu wobec przetwarzania danych;</li>
                <li>Prawo do cofnięcia zgody w dowolnym momencie (jeżeli przetwarzanie odbywa się na podstawie zgody);</li>
                <li>Prawo wniesienia skargi do organu nadzorczego (Prezes Urzędu Ochrony Danych Osobowych).</li>
              </ul>
              <p>
                Aby skorzystać z powyższych praw, skontaktuj się z nami lub z naszym Inspektorem Ochrony Danych.
              </p>

              <h2>8. Informacja o wymogu podania danych</h2>
              <p>
                Podanie przez Ciebie danych osobowych jest dobrowolne, ale niezbędne do korzystania z funkcjonalności naszej Strony. Niepodanie danych oznaczonych jako obowiązkowe uniemożliwi Ci rejestrację konta lub zamieszczenie ogłoszenia.
              </p>

              <h2>9. Zautomatyzowane podejmowanie decyzji i profilowanie</h2>
              <p>
                Twoje dane osobowe nie będą podlegać zautomatyzowanemu podejmowaniu decyzji, w tym profilowaniu, które wywołuje wobec Ciebie skutki prawne lub w podobny sposób istotnie na Ciebie wpływa.
              </p>

              <h2>10. Przekazywanie danych do państw trzecich</h2>
              <p>
                Twoje dane osobowe mogą być przekazywane do państw trzecich (tj. państw spoza Europejskiego Obszaru Gospodarczego) w związku z korzystaniem przez Administratora z usług dostawców narzędzi IT. Przekazanie danych odbywa się na podstawie standardowych klauzul umownych zatwierdzonych przez Komisję Europejską lub innych adekwatnych zabezpieczeń przewidzianych przez RODO.
              </p>

              <h2>11. Bezpieczeństwo danych osobowych</h2>
              <p>
                Administrator stosuje odpowiednie środki techniczne i organizacyjne, aby zapewnić bezpieczeństwo Twoich danych osobowych, w szczególności uniemożliwiające dostęp do nich osobom trzecim lub ich przetwarzanie z naruszeniem przepisów prawa.
              </p>

              <h2>12. Zmiany regulaminu RODO</h2>
              <p>
                Administrator zastrzega sobie prawo do zmiany niniejszego regulaminu. Zmiany będą publikowane na Stronie. W przypadku istotnych zmian, Administrator poinformuje Cię o nich za pośrednictwem poczty elektronicznej lub poprzez odpowiednie powiadomienie na Stronie.
              </p>

              <h2>13. Kontakt</h2>
              <p>
                Jeśli masz jakiekolwiek pytania dotyczące przetwarzania Twoich danych osobowych lub chcesz skorzystać z przysługujących Ci praw, skontaktuj się z nami:
              </p>
              <p>
                <strong>JaKupię.pl sp. z o.o.</strong><br />
                ul. Przykładowa 123<br />
                00-001 Warszawa<br />
                e-mail: kontakt@jakupie.pl<br />
                tel.: +48 123 456 789
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <Link href="/privacy-policy" className="text-primary hover:underline mr-4">
              Polityka prywatności
            </Link>
            <Link href="/support" className="text-primary hover:underline">
              Powrót do wsparcia
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}