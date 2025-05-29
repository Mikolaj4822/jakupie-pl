import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/hooks/use-language";
import { AlertTriangle, ShieldCheck, Lock, Eye, Users, CreditCard } from "lucide-react";

export default function SafetyTips() {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{t("support.safetyTips.title")} - {t("app.name")}</title>
        <meta name="description" content={`${t("support.safetyTips.desc")} ${t("app.name")}`} />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2 text-center">{t("support.safetyTips.title")}</h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">{t("support.safetyTips.desc")}</p>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
            <div className="space-y-8">
              <div className="flex gap-4 items-start">
                <div className="shrink-0 mt-1">
                  <ShieldCheck className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">Weryfikuj kontrahentów</h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    Przed finalizacją transakcji sprawdź opinie o sprzedającym. Możesz również poprosić o dodatkowe zdjęcia produktu lub wideorozmowę, aby zweryfikować stan przedmiotu.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="shrink-0 mt-1">
                  <Lock className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">Bezpieczne płatności</h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    Unikaj przelewów bezpośrednich na nieznane konta. W miarę możliwości korzystaj z bezpiecznych form płatności lub płatności przy odbiorze. Nigdy nie wysyłaj danych karty płatniczej przez niepewne kanały.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="shrink-0 mt-1">
                  <Eye className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">Ostrożność przy odbiorze osobistym</h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    Jeśli decydujesz się na odbiór osobisty, wybieraj miejsca publiczne i dobrze oświetlone. Możesz również wziąć ze sobą zaufaną osobę. Dokładnie sprawdź produkt przed dokonaniem płatności.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="shrink-0 mt-1">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">Chroń swoje dane osobowe</h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    Udostępniaj tylko niezbędne dane kontaktowe. Nie podawaj nadmiarowych informacji osobowych, takich jak numer PESEL, data urodzenia czy dane dokumentów tożsamości.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="shrink-0 mt-1">
                  <CreditCard className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">Uważaj na podejrzane oferty</h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    Jeśli oferta wydaje się zbyt dobra, aby była prawdziwa, prawdopodobnie tak jest. Unikaj ofert z wyjątkowo niskimi cenami lub takich, które wymagają wpłaty zaliczki przed zobaczeniem przedmiotu.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="shrink-0 mt-1">
                  <AlertTriangle className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">Zgłaszaj podejrzane działania</h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    Jeśli zauważysz podejrzane ogłoszenia lub zachowania użytkowników, zgłoś je do zespołu wsparcia JaKupię.pl. Pomożesz tym samym chronić społeczność przed potencjalnymi oszustami.
                  </p>
                </div>
              </div>
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