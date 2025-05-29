import { z } from "zod";

type TranslationKey = {
  en: string;
  pl: string;
};

type Translations = {
  [key: string]: TranslationKey;
};

const translationSchema = z.object({
  en: z.string(),
  pl: z.string(),
});

export const translations: Translations = {
  // Wspólne tłumaczenia
  "common.loading": {
    en: "Loading...",
    pl: "Ładowanie..."
  },
  "common.error": {
    en: "An error occurred",
    pl: "Wystąpił błąd"
  },
  "common.retry": {
    en: "Retry",
    pl: "Spróbuj ponownie"
  },
  "common.save": {
    en: "Save",
    pl: "Zapisz"
  },
  "common.cancel": {
    en: "Cancel",
    pl: "Anuluj"
  },
  "common.delete": {
    en: "Delete",
    pl: "Usuń"
  },
  "common.edit": {
    en: "Edit",
    pl: "Edytuj"
  },
  "common.submit": {
    en: "Submit",
    pl: "Wyślij"
  },
  "common.back": {
    en: "Back",
    pl: "Wróć"
  },
  "common.next": {
    en: "Next",
    pl: "Dalej"
  },
  "common.search": {
    en: "Search",
    pl: "Szukaj"
  },
  "common.filter": {
    en: "Filter",
    pl: "Filtruj"
  },
  "common.sort": {
    en: "Sort",
    pl: "Sortuj"
  },
  "common.apply": {
    en: "Apply",
    pl: "Zastosuj"
  },
  "common.clear": {
    en: "Clear",
    pl: "Wyczyść"
  },
  "common.view": {
    en: "View",
    pl: "Zobacz"
  },
  "common.more": {
    en: "More",
    pl: "Więcej"
  },
  "common.less": {
    en: "Less",
    pl: "Mniej"
  },
  "common.show": {
    en: "Show",
    pl: "Pokaż"
  },
  "common.hide": {
    en: "Hide",
    pl: "Ukryj"
  },
  "common.all": {
    en: "All",
    pl: "Wszystkie"
  },
  "common.none": {
    en: "None",
    pl: "Żaden"
  },
  "common.yes": {
    en: "Yes",
    pl: "Tak"
  },
  "common.no": {
    en: "No",
    pl: "Nie"
  },
  "common.success": {
    en: "Success",
    pl: "Sukces"
  },
  "common.failed": {
    en: "Failed",
    pl: "Niepowodzenie"
  },
  "common.notFound": {
    en: "Not found",
    pl: "Nie znaleziono"
  },
  "common.notFoundDesc": {
    en: "The resource you are looking for does not exist",
    pl: "Zasób, którego szukasz, nie istnieje"
  },
  "common.required": {
    en: "Required",
    pl: "Wymagane"
  },
  "common.optional": {
    en: "Optional",
    pl: "Opcjonalne"
  },
  
  // Tłumaczenia dla strony głównej (hero)
  "hero.title": {
    en: "Find exactly what you're looking for",
    pl: "Znajdź dokładnie to, czego szukasz"
  },
  "hero.subtitle": {
    en: "Post what you want to buy, and let sellers come to you",
    pl: "Opublikuj, co chcesz kupić, a sprzedawcy przyjdą do Ciebie"
  },
  "hero.search.prefix": {
    en: "I'm looking for",
    pl: "Szukam"
  },
  "hero.cta.post": {
    en: "Post an ad",
    pl: "Dodaj ogłoszenie"
  },
  "hero.cta.browse": {
    en: "Browse ads",
    pl: "Przeglądaj ogłoszenia"
  },
  "hero.search.placeholders.0": {
    en: "a smartphone",
    pl: "smartfon"
  },
  "hero.search.placeholders.1": {
    en: "a children's bicycle",
    pl: "rower dla dziecka"
  },
  "hero.search.placeholders.2": {
    en: "an apartment",
    pl: "mieszkanie"
  },
  "hero.search.placeholders.3": {
    en: "furniture",
    pl: "meble"
  },
  "hero.search.placeholders.4": {
    en: "a car",
    pl: "samochód"
  },
  "hero.button.browse": {
    en: "Browse Ads",
    pl: "Przeglądaj ogłoszenia"
  },
  
  // Featured section
  "featured.title": {
    en: "Featured Ads",
    pl: "Wyróżnione ogłoszenia"
  },
  "featured.empty": {
    en: "No featured ads yet",
    pl: "Brak wyróżnionych ogłoszeń"
  },
  "featured.empty.cta": {
    en: "Be the first to post an ad",
    pl: "Bądź pierwszym, który doda ogłoszenie"
  },
  "featured.filter": {
    en: "Filter",
    pl: "Filtruj"
  },
  "featured.sort": {
    en: "Sort",
    pl: "Sortuj"
  },
  "featured.seeAll": {
    en: "See all ads",
    pl: "Zobacz wszystkie ogłoszenia"
  },
  
  // CTA section
  "cta.title": {
    en: "Join our community",
    pl: "Dołącz do naszej społeczności"
  },
  "cta.subtitle": {
    en: "Join thousands of satisfied users who found exactly what they needed",
    pl: "Dołącz do tysięcy zadowolonych użytkowników, którzy znaleźli dokładnie to, czego potrzebowali"
  },
  "cta.button": {
    en: "Get started",
    pl: "Rozpocznij"
  },
  
  // Kategorie
  "categories.title": {
    en: "Browse by category",
    pl: "Przeglądaj według kategorii"
  },
  "categories.subtitle": {
    en: "Find exactly what you need",
    pl: "Znajdź dokładnie to, czego potrzebujesz"
  },
  "categories.viewAll": {
    en: "View all categories",
    pl: "Zobacz wszystkie kategorie"
  },
  "categories.elektronika": {
    en: "Electronics",
    pl: "Elektronika"
  },
  "categories.motoryzacja": {
    en: "Automotive",
    pl: "Motoryzacja"
  },
  "categories.nieruchomosci": {
    en: "Real Estate",
    pl: "Nieruchomości"
  },
  "categories.dom_i_ogrod": {
    en: "Home & Garden",
    pl: "Dom i ogród"
  },
  "categories.moda": {
    en: "Fashion",
    pl: "Moda"
  },
  "categories.sport": {
    en: "Sports",
    pl: "Sport"
  },
  "categories.kultura": {
    en: "Culture",
    pl: "Kultura"
  },
  "categories.dziecko": {
    en: "Kids",
    pl: "Dziecko"
  },
  "categories.gry": {
    en: "Games",
    pl: "Gry"
  },
  "categories.zdrowie": {
    en: "Health",
    pl: "Zdrowie"
  },
  "categories.zwierzeta": {
    en: "Animals",
    pl: "Zwierzęta"
  },
  "categories.uslugi": {
    en: "Services",
    pl: "Usługi"
  },
  "categories.biznes": {
    en: "Business",
    pl: "Biznes"
  },
  "categories.edukacja": {
    en: "Education",
    pl: "Edukacja"
  },
  "categories.hobby": {
    en: "Hobbies",
    pl: "Hobby"
  },
  "categories.muzyka": {
    en: "Music",
    pl: "Muzyka"
  },
  "categories.podroze": {
    en: "Travel",
    pl: "Podróże"
  },
  "categories.rolnictwo": {
    en: "Agriculture",
    pl: "Rolnictwo"
  },
  "categories.noclegi": {
    en: "Accommodations",
    pl: "Noclegi"
  },
  "categories.praca": {
    en: "Jobs",
    pl: "Praca"
  },
  
  // Tłumaczenia dla strony pomocy
  "support.title": {
    en: "Support",
    pl: "Wsparcie"
  },
  "support.subtitle": {
    en: "How can we help you?",
    pl: "Jak możemy ci pomóc?"
  },
  "support.contactUs": {
    en: "Contact us",
    pl: "Skontaktuj się z nami"
  },
  "support.faq": {
    en: "FAQ",
    pl: "Często zadawane pytania"
  },
  "support.helpCenter": {
    en: "Help center",
    pl: "Centrum pomocy"
  },
  
  // Tłumaczenia dla formularza kontaktowego
  "contact.title": {
    en: "Contact us",
    pl: "Skontaktuj się z nami"
  },
  "contact.subtitle": {
    en: "We're here to help",
    pl: "Jesteśmy tutaj, aby pomóc"
  },
  "contact.form.name": {
    en: "Full name",
    pl: "Imię i nazwisko"
  },
  "contact.form.email": {
    en: "Email",
    pl: "Email"
  },
  "contact.form.subject": {
    en: "Subject",
    pl: "Temat"
  },
  "contact.form.message": {
    en: "Message",
    pl: "Wiadomość"
  },
  "contact.form.submit": {
    en: "Send message",
    pl: "Wyślij wiadomość"
  },
  
  // How it works section
  "how.title": {
    en: "How it works",
    pl: "Jak to działa"
  },
  "how.subtitle": {
    en: "3 simple steps to find exactly what you need",
    pl: "3 proste kroki, aby znaleźć dokładnie to, czego potrzebujesz"
  },
  "how.step1.title": {
    en: "Post what you want to buy",
    pl: "Opublikuj, co chcesz kupić"
  },
  "how.step1.desc": {
    en: "Describe the item you're looking for and set your budget",
    pl: "Opisz przedmiot, którego szukasz i ustal swój budżet"
  },
  "how.step1.desc.detailed": {
    en: "Tell potential sellers exactly what you're looking for by providing detailed information about the item, including specific features, condition requirements, and your price range.",
    pl: "Powiedz potencjalnym sprzedawcom dokładnie, czego szukasz, podając szczegółowe informacje o przedmiocie, w tym konkretne cechy, wymagania dotyczące stanu i Twój przedział cenowy."
  },
  "how.step2.title": {
    en: "Receive offers from sellers",
    pl: "Otrzymuj oferty od sprzedawców"
  },
  "how.step2.desc": {
    en: "Sellers will contact you with their best offers",
    pl: "Sprzedawcy skontaktują się z Tobą z najlepszymi ofertami"
  },
  "how.step2.desc.detailed": {
    en: "Interested sellers who have what you're looking for will respond to your ad with their offers. You'll receive notifications when new offers arrive.",
    pl: "Zainteresowani sprzedawcy, którzy mają to, czego szukasz, odpowiedzą na Twoje ogłoszenie swoimi ofertami. Otrzymasz powiadomienia, gdy pojawią się nowe oferty."
  },
  "how.step3.title": {
    en: "Choose the best offer and complete the transaction",
    pl: "Wybierz najlepszą ofertę i sfinalizuj transakcję"
  },
  "how.step3.desc": {
    en: "Select the seller with the best offer",
    pl: "Wybierz sprzedawcę z najlepszą ofertą"
  },
  "how.step3.desc.detailed": {
    en: "Compare offers, communicate with sellers, and choose the one that best meets your needs.",
    pl: "Porównaj oferty, komunikuj się ze sprzedawcami i wybierz tę, która najlepiej odpowiada Twoim potrzebom."
  },
  "how.cta": {
    en: "Start buying smarter today",
    pl: "Zacznij kupować mądrzej już dziś"
  },
  
  // Tłumaczenia dla filtrów wyszukiwania
  "browse.searchButton": {
    en: "Search",
    pl: "Szukaj"
  },
  "filters.title": {
    en: "Filters",
    pl: "Filtry"
  },
  "filters.description": {
    en: "Refine your search results",
    pl: "Zawęź wyniki wyszukiwania"
  },
  "filters.categories": {
    en: "Categories",
    pl: "Kategorie"
  },
  "filters.location": {
    en: "Location",
    pl: "Lokalizacja"
  },
  "filters.price": {
    en: "Price",
    pl: "Cena"
  },
  "filters.price.min": {
    en: "Min price",
    pl: "Cena min."
  },
  "filters.price.max": {
    en: "Max price",
    pl: "Cena maks."
  },
  "filters.date": {
    en: "Date posted",
    pl: "Data dodania"
  },
  "filters.date.today": {
    en: "Today",
    pl: "Dzisiaj"
  },
  "filters.date.yesterday": {
    en: "Yesterday",
    pl: "Wczoraj"
  },
  "filters.date.last7days": {
    en: "Last 7 days",
    pl: "Ostatnie 7 dni"
  },
  "filters.date.last30days": {
    en: "Last 30 days",
    pl: "Ostatnie 30 dni"
  },
  "filters.sort.newest": {
    en: "Newest first",
    pl: "Od najnowszych"
  },
  "filters.sort.oldest": {
    en: "Oldest first",
    pl: "Od najstarszych"
  },
  "filters.sort.priceLow": {
    en: "Price: low to high",
    pl: "Cena: od najniższej"
  },
  "filters.sort.priceHigh": {
    en: "Price: high to low",
    pl: "Cena: od najwyższej"
  },
  
  // Tłumaczenia dla panelu dostępności
  "accessibility.title": {
    en: "Accessibility",
    pl: "Dostępność"
  },
  "accessibility.largerText": {
    en: "Larger text",
    pl: "Większy tekst"
  },
  "accessibility.simplifiedInterface": {
    en: "Simplified interface",
    pl: "Uproszczony interfejs"
  },
  "accessibility.highContrast": {
    en: "High contrast",
    pl: "Wysoki kontrast"
  },
  "accessibility.cursor": {
    en: "Larger cursor",
    pl: "Większy kursor"
  },
  "accessibility.reduceAnimations": {
    en: "Reduce animations",
    pl: "Zredukowane animacje"
  },
  
  // Tłumaczenia dla formularza logowania i rejestracji
  "auth.login": {
    en: "Log in",
    pl: "Zaloguj się"
  },
  "auth.register": {
    en: "Register",
    pl: "Zarejestruj się"
  },
  "auth.email": {
    en: "Email",
    pl: "Email"
  },
  "auth.username": {
    en: "Username",
    pl: "Nazwa użytkownika"
  },
  "auth.password": {
    en: "Password",
    pl: "Hasło"
  },
  "auth.confirmPassword": {
    en: "Confirm password",
    pl: "Potwierdź hasło"
  },
  "auth.fullName": {
    en: "Full name",
    pl: "Imię i nazwisko"
  },
  "auth.rememberMe": {
    en: "Remember me",
    pl: "Zapamiętaj mnie"
  },
  "auth.forgotPassword": {
    en: "Forgot password?",
    pl: "Zapomniałeś hasła?"
  },
  "auth.noAccount": {
    en: "Don't have an account?",
    pl: "Nie masz konta?"
  },
  "auth.haveAccount": {
    en: "Already have an account?",
    pl: "Masz już konto?"
  },
  "auth.termsAgree": {
    en: "I agree to the Terms of Service and Privacy Policy",
    pl: "Zgadzam się z Warunkami Korzystania z Usługi i Polityką Prywatności"
  },
  
  // Tłumaczenia dla stopki
  "footer.company": {
    en: "Company",
    pl: "Firma"
  },
  "footer.about": {
    en: "About us",
    pl: "O nas"
  },
  "footer.careers": {
    en: "Careers",
    pl: "Kariera"
  },
  "footer.terms": {
    en: "Terms of service",
    pl: "Warunki korzystania"
  },
  "footer.privacy": {
    en: "Privacy policy",
    pl: "Polityka prywatności"
  },
  "footer.help": {
    en: "Help",
    pl: "Pomoc"
  },
  "footer.help.center": {
    en: "Help center",
    pl: "Centrum pomocy"
  },
  "footer.help.faq": {
    en: "FAQ",
    pl: "FAQ"
  },
  "footer.help.contact": {
    en: "Contact us",
    pl: "Kontakt"
  },
  "footer.legal": {
    en: "Legal",
    pl: "Informacje prawne"
  },
  "footer.legal.terms": {
    en: "Terms of service",
    pl: "Warunki korzystania"
  },
  "footer.legal.privacy": {
    en: "Privacy policy",
    pl: "Polityka prywatności"
  },
  "footer.legal.cookies": {
    en: "Cookie policy",
    pl: "Polityka cookies"
  },
  "footer.legal.rodo": {
    en: "GDPR",
    pl: "RODO"
  },
  "footer.copyright": {
    en: "© 2024 JaKupię.pl. All rights reserved.",
    pl: "© 2024 JaKupię.pl. Wszelkie prawa zastrzeżone."
  },
  
  // Tłumaczenia dla ogloszenia
  "ad.title": {
    en: "Title",
    pl: "Tytuł"
  },
  "ad.description": {
    en: "Description",
    pl: "Opis"
  },
  "ad.category": {
    en: "Category",
    pl: "Kategoria"
  },
  "ad.budget": {
    en: "Budget",
    pl: "Budżet"
  },
  "ad.location": {
    en: "Location",
    pl: "Lokalizacja"
  },
  "ad.contactInfo": {
    en: "Contact information",
    pl: "Informacje kontaktowe"
  },
  "ad.phone": {
    en: "Phone",
    pl: "Telefon"
  },
  "ad.images": {
    en: "Images",
    pl: "Zdjęcia"
  },
  "ad.postedBy": {
    en: "Posted by",
    pl: "Dodane przez"
  },
  "ad.postedOn": {
    en: "Posted on",
    pl: "Dodane dnia"
  },
  "ad.edit": {
    en: "Edit ad",
    pl: "Edytuj ogłoszenie"
  },
  "ad.delete": {
    en: "Delete ad",
    pl: "Usuń ogłoszenie"
  },
  "ad.makeOffer": {
    en: "Make an offer",
    pl: "Złóż ofertę"
  },
  "ad.offers": {
    en: "Offers",
    pl: "Oferty"
  },
  "ad.noOffers": {
    en: "No offers yet",
    pl: "Brak ofert"
  },
  "ad.responses": {
    en: "Responses",
    pl: "Odpowiedzi"
  },
  "ad.noResponses": {
    en: "No responses yet",
    pl: "Brak odpowiedzi"
  },
  "ad.similar": {
    en: "Similar ads",
    pl: "Podobne ogłoszenia"
  },
  "ad.create.title": {
    en: "Create a new ad",
    pl: "Utwórz nowe ogłoszenie"
  },
  "ad.create.subtitle": {
    en: "Tell us what you're looking for",
    pl: "Powiedz nam, czego szukasz"
  },
  "ad.create.success": {
    en: "Ad created successfully",
    pl: "Ogłoszenie utworzone pomyślnie"
  },
  "ad.update.success": {
    en: "Ad updated successfully",
    pl: "Ogłoszenie zaktualizowane pomyślnie"
  },
  "ad.delete.success": {
    en: "Ad deleted successfully",
    pl: "Ogłoszenie usunięte pomyślnie"
  },
  "ad.delete.confirm": {
    en: "Are you sure you want to delete this ad?",
    pl: "Czy na pewno chcesz usunąć to ogłoszenie?"
  },
  
  // Tłumaczenia dla odpowiedzi
  "response.title": {
    en: "Make an offer",
    pl: "Złóż ofertę"
  },
  "response.price": {
    en: "Your price",
    pl: "Twoja cena"
  },
  "response.message": {
    en: "Message",
    pl: "Wiadomość"
  },
  "response.images": {
    en: "Images (optional)",
    pl: "Zdjęcia (opcjonalnie)"
  },
  "response.submit": {
    en: "Submit offer",
    pl: "Wyślij ofertę"
  },
  "response.success": {
    en: "Offer submitted successfully",
    pl: "Oferta wysłana pomyślnie"
  },
  "response.error": {
    en: "Failed to submit offer",
    pl: "Nie udało się wysłać oferty"
  },
  "response.view": {
    en: "View offer",
    pl: "Zobacz ofertę"
  },
  "response.accept": {
    en: "Accept offer",
    pl: "Zaakceptuj ofertę"
  },
  "response.decline": {
    en: "Decline offer",
    pl: "Odrzuć ofertę"
  },
  "response.contact": {
    en: "Contact seller",
    pl: "Skontaktuj się ze sprzedawcą"
  },
  
  // Admin panel
  "admin.title": {
    en: "Admin Panel",
    pl: "Panel Administratora"
  },
  "admin.users": {
    en: "Users",
    pl: "Użytkownicy"
  },
  "admin.ads": {
    en: "Ads",
    pl: "Ogłoszenia"
  },
  "admin.reports": {
    en: "Reports",
    pl: "Zgłoszenia"
  },
  "admin.stats": {
    en: "Statistics",
    pl: "Statystyki"
  },
  "admin.settings": {
    en: "Settings",
    pl: "Ustawienia"
  },
  "admin.userManagement": {
    en: "User Management",
    pl: "Zarządzanie Użytkownikami"
  },
  "admin.adManagement": {
    en: "Ad Management",
    pl: "Zarządzanie Ogłoszeniami"
  },
  "admin.banUser": {
    en: "Ban User",
    pl: "Zablokuj Użytkownika"
  },
  "admin.unbanUser": {
    en: "Unban User",
    pl: "Odblokuj Użytkownika"
  },
  "admin.deleteAd": {
    en: "Delete Ad",
    pl: "Usuń Ogłoszenie"
  },
  "admin.featureAd": {
    en: "Feature Ad",
    pl: "Wyróżnij Ogłoszenie"
  },
  "admin.unfeatureAd": {
    en: "Unfeature Ad",
    pl: "Usuń Wyróżnienie"
  },
  "admin.featureInProgress": {
    en: "Feature in progress",
    pl: "Funkcja w przygotowaniu"
  },
  "admin.user.email": {
    en: "Email",
    pl: "Email"
  },
  "admin.user.username": {
    en: "Username",
    pl: "Nazwa użytkownika"
  },
  "admin.user.name": {
    en: "Name",
    pl: "Imię i nazwisko"
  },
  "admin.user.status": {
    en: "Status",
    pl: "Status"
  },
  "admin.user.actions": {
    en: "Actions",
    pl: "Akcje"
  },
  "admin.user.active": {
    en: "Active",
    pl: "Aktywny"
  },
  "admin.user.banned": {
    en: "Banned",
    pl: "Zablokowany"
  },
  "admin.ad.title": {
    en: "Title",
    pl: "Tytuł"
  },
  "admin.ad.category": {
    en: "Category",
    pl: "Kategoria"
  },
  "admin.ad.user": {
    en: "Posted by",
    pl: "Dodane przez"
  },
  "admin.ad.date": {
    en: "Date",
    pl: "Data"
  },
  "admin.ad.actions": {
    en: "Actions",
    pl: "Akcje"
  },
  "admin.ad.active": {
    en: "Active",
    pl: "Aktywne"
  },
  "admin.ad.featured": {
    en: "Featured",
    pl: "Wyróżnione"
  },
};

export type TranslationSchema = z.infer<typeof translationSchema>;