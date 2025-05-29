import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Phone, MapPin } from "lucide-react";

export default function Contact() {
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // W prawdziwej implementacji obsługa formularza kontaktowego
    alert("Wiadomość została wysłana. Dziękujemy za kontakt!");
  };

  return (
    <>
      <Helmet>
        <title>{t("support.contact.title")} - {t("app.name")}</title>
        <meta name="description" content={`${t("support.contact.desc")} ${t("app.name")}`} />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2 text-center">{t("support.contact.title")}</h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">{t("support.contact.desc")}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Telefon</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Nasz zespół jest dostępny od poniedziałku do piątku, 9:00 - 17:00.</p>
              <a href="tel:+48123456789" className="text-primary font-semibold">+48 123 456 789</a>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Email</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Odpowiadamy na wszystkie wiadomości w ciągu 24 godzin.</p>
              <a href="mailto:kontakt@jakupie.pl" className="text-primary font-semibold">kontakt@jakupie.pl</a>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Adres</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Odwiedź naszą siedzibę.</p>
              <address className="not-italic text-primary font-semibold">
                ul. Przykładowa 123<br />
                00-000 Warszawa
              </address>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <MessageSquare className="h-6 w-6 mr-2 text-primary" />
              Formularz kontaktowy
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium">
                    Imię i nazwisko
                  </label>
                  <Input 
                    id="name" 
                    placeholder="Wpisz swoje imię i nazwisko" 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Wpisz swój email" 
                    required 
                  />
                </div>
              </div>
              
              <div className="space-y-2 mb-6">
                <label htmlFor="subject" className="block text-sm font-medium">
                  Temat
                </label>
                <Input 
                  id="subject" 
                  placeholder="Wpisz temat wiadomości" 
                  required 
                />
              </div>
              
              <div className="space-y-2 mb-6">
                <label htmlFor="message" className="block text-sm font-medium">
                  Wiadomość
                </label>
                <Textarea 
                  id="message" 
                  placeholder="Opisz szczegółowo swoje pytanie lub problem" 
                  rows={6} 
                  required 
                />
              </div>
              
              <Button type="submit" className="w-full md:w-auto">
                Wyślij wiadomość
              </Button>
            </form>
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