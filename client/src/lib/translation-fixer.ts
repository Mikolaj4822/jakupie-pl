// Plik pomocniczy do naprawy tłumaczeń na stronie JaKupię.pl
// Zawiera kompletny zestaw przetłumaczonych tekstów dla polskiego interfejsu

// Dodatkowa funkcja pomocnicza do obsługi dosłownych kluczy tłumaczeń
export function getExactTranslation(key: string): string | undefined {
  // Zwraca dokładne tłumaczenie dla widocznych kluczy tłumaczeń na stronie
  const exactTranslations: Record<string, string> = {
    'footer.emailPlaceholder': 'Twój adres email',
    'adCard.manage': 'Zarządzaj',
    'filters.sort.title': 'Sortowanie',
    'filters.price.title': 'Cena',
    'filters.location.title': 'Lokalizacja',
    'filters.delivery.title': 'Opcje dostawy',
    'filters.delivery.pickup': 'Odbiór osobisty',
    'filters.delivery.pickupDesc': 'Możliwość odebrania osobiście',
    'filters.delivery.courier': 'Przesyłka kurierska',
    'filters.delivery.courierDesc': 'Wysyłka za pośrednictwem kuriera',
    'filters.delivery.inperson': 'Dostawa osobista',
    'filters.delivery.inpersonDesc': 'Sprzedawca dostarcza osobiście',
    'filters.sellerType.title': 'Typ sprzedawcy',
    'filters.sellerType.any': 'Dowolny',
    'filters.sellerType.private': 'Osoba prywatna',
    'filters.sellerType.business': 'Firma/Przedsiębiorstwo',
    'filters.datePosted.title': 'Data dodania',
    'filters.datePosted.any': 'Dowolna',
    'filters.datePosted.today': 'Dzisiaj',
    'filters.datePosted.3days': 'Ostatnie 3 dni',
    'filters.datePosted.week': 'Ostatni tydzień',
    'filters.datePosted.month': 'Ostatni miesiąc',
    'filters.categorySpecific': 'Filtry dla kategorii',
    'filters.propertyDetails': 'Szczegóły nieruchomości',
    'filters.deviceDetails': 'Szczegóły urządzenia',
    'filters.vehicleDetails': 'Szczegóły pojazdu',
    'filters.itemDetails': 'Szczegóły przedmiotu',
    'filters.propertyType': 'Typ nieruchomości',
    'filters.selectType': 'Wybierz typ',
    'filters.area': 'Powierzchnia (m²)',
    'filters.rooms': 'Liczba pokoi',
    'filters.selectRooms': 'Wybierz liczbę pokoi',
    'filters.brand': 'Marka',
    'filters.selectBrand': 'Wybierz markę',
    'filters.condition': 'Stan',
    'filters.condition.new': 'Nowy',
    'filters.condition.used': 'Używany',
    'filters.condition.refurbished': 'Odnowiony',
    'filters.vehicleType': 'Typ pojazdu',
    'filters.productionYear': 'Rok produkcji',
    'filters.mileage': 'Przebieg (km)',
    'filters.deviceType': 'Typ urządzenia',
    'filters.fuelType': 'Rodzaj paliwa',
    'filters.selectFuelType': 'Wybierz rodzaj paliwa',
    'filters.propertyCondition': 'Stan nieruchomości',
    'filters.propertyCondition.new': 'Nowy/Deweloperski',
    'filters.propertyCondition.renovated': 'Po remoncie',
    'filters.propertyCondition.good': 'Dobry',
    'filters.propertyCondition.forRenovation': 'Do remontu',
    'filters.brandPlaceholder': 'Wpisz markę',
    'auth.signIn': 'Zaloguj się',
    'auth.signInDescription': 'Zaloguj się na swoje konto',
    'auth.usernameOrEmail': 'Nazwa użytkownika lub email',
    'auth.enterUsernameOrEmail': 'Wprowadź nazwę użytkownika lub email',
    'auth.enterPassword': 'Wprowadź hasło',
    'auth.createAccount': 'Utwórz konto',
    'auth.createAccountDescription': 'Zarejestruj się, aby rozpocząć',
    'auth.enterFullName': 'Wprowadź imię i nazwisko',
    'auth.chooseUsername': 'Wybierz nazwę użytkownika',
    'auth.enterEmail': 'Wprowadź adres email',
    'auth.createPassword': 'Utwórz hasło',
    'auth.confirmYourPassword': 'Potwierdź hasło',
    'auth.passwordRequirements': 'Hasło musi mieć co najmniej 6 znaków',
    'auth.alreadyHaveAccount': 'Masz już konto?',
    'nav.home': 'Strona główna',
    'dashboard.title': 'Panel użytkownika',
    'dashboard.tabs.myAds': 'Moje ogłoszenia',
    'dashboard.tabs.myResponses': 'Moje odpowiedzi',
    'footer.subscribe': 'Zapisz się'
  };

  return exactTranslations[key];
}

export const polishTexts: Record<string, string> = {
  // Uwierzytelnianie
  'auth.pageTitle': 'Zaloguj się lub zarejestruj',
  'auth.metaDescription': 'Zaloguj się lub utwórz konto na JaKupię.pl, aby zacząć publikować ogłoszenia kupna i otrzymywać oferty od sprzedawców',
  'auth.register': 'Zarejestruj się',
  'auth.password': 'Hasło',
  'auth.username': 'Nazwa użytkownika',
  'auth.email': 'Email',
  'auth.fullName': 'Imię i nazwisko',
  'auth.confirmPassword': 'Potwierdź hasło',
  'auth.signingIn': 'Logowanie...',
  'auth.creatingAccount': 'Tworzenie konta...',
  'auth.noAccount': 'Nie masz jeszcze konta?',
  'auth.validation.usernameRequired': 'Nazwa użytkownika jest wymagana',
  'auth.validation.passwordRequired': 'Hasło jest wymagane',
  'auth.validation.confirmPasswordRequired': 'Potwierdzenie hasła jest wymagane',
  'auth.validation.passwordsDoNotMatch': 'Hasła nie są identyczne',
  'auth.heroTitle': 'Witaj w JaKupię.pl',
  'auth.heroDescription': 'Twoje miejsce, gdzie znajdziesz dokładnie to, czego szukasz',
  
  // Wspólne elementy
  'app.name': 'JaKupię.pl',
  'app.tagline': 'Znajdź dokładnie to, czego szukasz',
  'app.metaDescription': 'JaKupię.pl to odwrócona platforma e-commerce, gdzie kupujący publikują ogłoszenia, a sprzedawcy odpowiadają z ofertami',
  
  // Nawigacja
  'nav.dashboard': 'Panel użytkownika',
  'nav.browse': 'Przeglądaj',
  'nav.howItWorks': 'Jak to działa',
  'nav.support': 'Wsparcie',
  'nav.postAd': 'Dodaj ogłoszenie',
  'nav.logout': 'Wyloguj się',
  'nav.searchPlaceholder': 'Czego szukasz?',
  'nav.home': 'Strona główna',
  'nav.signIn': 'Zaloguj się',
  'nav.register': 'Zarejestruj się',
  'browse.search': 'Szukaj',
  
  // Hero sekcja
  'hero.title': 'Znajdź dokładnie to, czego szukasz',
  'hero.subtitle': 'Opublikuj, co chcesz kupić, a sprzedawcy przyjdą do Ciebie',
  'hero.search.prefix': 'Szukam',
  'hero.cta.post': 'Dodaj ogłoszenie',
  'hero.cta.browse': 'Przeglądaj ogłoszenia',
  
  // Wyróżnione ogłoszenia
  'featured.title': 'Wyróżnione ogłoszenia',
  'featured.filter': 'Filtruj',
  'featured.sort': 'Sortuj',
  'featured.seeAll': 'Zobacz wszystkie',
  'featured.empty': 'Brak wyróżnionych ogłoszeń',
  'featured.empty.cta': 'Bądź pierwszym, który doda ogłoszenie',
  
  // Kategorie
  'categories.title': 'Przeglądaj według kategorii',
  'categories.subtitle': 'Znajdź dokładnie to, czego potrzebujesz',
  'categories.viewAll': 'Zobacz wszystkie kategorie',
  'categories.all': 'Wszystkie kategorie',
  
  // CTA sekcja
  'cta.title': 'Dołącz do naszej społeczności',
  'cta.subtitle': 'Dołącz do tysięcy zadowolonych użytkowników, którzy znaleźli dokładnie to, czego potrzebowali',
  'cta.button': 'Rozpocznij',
  
  // Jak to działa
  'how.title': 'Jak to działa',
  'how.subtitle': '3 proste kroki, aby znaleźć dokładnie to, czego potrzebujesz',
  'how.step1.title': 'Opublikuj, co chcesz kupić',
  'how.step1.desc': 'Opisz przedmiot, którego szukasz i ustal swój budżet',
  'how.step2.title': 'Otrzymuj oferty od sprzedawców',
  'how.step2.desc': 'Sprzedawcy skontaktują się z Tobą z najlepszymi ofertami',
  'how.step3.title': 'Wybierz najlepszą ofertę i sfinalizuj transakcję',
  'how.step3.desc': 'Wybierz sprzedawcę z najlepszą ofertą',
  'how.cta': 'Zacznij kupować mądrzej już dziś',
  'how.why': 'Dlaczego warto korzystać z JaKupię.pl',
  'how.better_prices.title': 'Lepsze ceny',
  'how.better_prices.desc': 'Sprzedawcy konkurują o Twoją uwagę, oferując najlepsze ceny',
  'how.save_time.title': 'Oszczędzaj czas',
  'how.save_time.desc': 'Nie musisz przeglądać setek ofert, by znaleźć to, czego szukasz',
  'how.find_exact.title': 'Znajdź dokładnie to, czego szukasz',
  'how.find_exact.desc': 'Opisz szczegółowo, czego potrzebujesz, a sprzedawcy dopasują swoje oferty',
  'how.control.title': 'Pełna kontrola',
  'how.control.desc': 'To Ty decydujesz, którą ofertę przyjąć i za jaką cenę',
  'how.post_first': 'Dodaj swoje pierwsze ogłoszenie',
  'how.faq.title': 'Często zadawane pytania',
  'how.faq.free.question': 'Czy korzystanie z JaKupię.pl jest bezpłatne?',
  'how.faq.free.answer': 'Tak, korzystanie z podstawowych funkcji JaKupię.pl jest całkowicie bezpłatne zarówno dla kupujących, jak i sprzedających.',
  'how.faq.legitimate.question': 'Jak sprawdzić wiarygodność sprzedawcy?',
  'how.faq.legitimate.answer': 'Każdy użytkownik JaKupię.pl posiada profil z ocenami i opiniami od innych użytkowników. Sprawdź historię ocen sprzedawcy przed finalizacją transakcji.',
  'how.faq.edit.question': 'Czy mogę edytować moje ogłoszenie po jego opublikowaniu?',
  'how.faq.edit.answer': 'Tak, możesz edytować swoje ogłoszenie w dowolnym momencie. Wszystkie zmiany będą natychmiast widoczne dla innych użytkowników.',
  'how.faq.payments.question': 'Jak działają płatności na JaKupię.pl?',
  'how.faq.payments.answer': 'JaKupię.pl nie obsługuje płatności bezpośrednio. Po znalezieniu odpowiedniej oferty, kontaktujesz się ze sprzedawcą i ustalacie między sobą preferowaną metodę płatności i dostawy.',
  
  // Przeglądanie ogłoszeń
  'browse.title': 'Przeglądaj ogłoszenia',
  'browse.subtitle': 'Znajdź ogłoszenia, na które możesz odpowiedzieć',
  'browse.searchButton': 'Szukaj',
  'browse.noResults': 'Brak wyników',
  'browse.noResults.desc': 'Spróbuj zmienić kryteria wyszukiwania',
  'browse.searchPlaceholder': 'Czego szukasz?',
  
  // Filtry
  'filters.title': 'Filtry',
  'filters.description': 'Zawęź wyniki wyszukiwania',
  'filters.categories': 'Kategorie',
  'filters.location': 'Lokalizacja',
  'filters.price': 'Cena',
  'filters.price.min': 'Cena min.',
  'filters.price.max': 'Cena maks.',
  'filters.date': 'Data dodania',
  'filters.date.today': 'Dzisiaj',
  'filters.date.yesterday': 'Wczoraj',
  'filters.date.last7days': 'Ostatnie 7 dni',
  'filters.date.last30days': 'Ostatnie 30 dni',
  'filters.sort.newest': 'Od najnowszych',
  'filters.sort.oldest': 'Od najstarszych',
  'filters.sort.priceLow': 'Cena: od najniższej',
  'filters.sort.priceHigh': 'Cena: od najwyższej',
  'filters.advancedFilters': 'Filtry zaawansowane',
  'filters.resetAll': 'Resetuj wszystkie filtry',
  'filters.sort.title': 'Sortowanie',
  'filters.price.title': 'Cena',
  'filters.location.title': 'Lokalizacja',
  'filters.delivery.title': 'Opcje dostawy',
  'filters.delivery.pickup': 'Odbiór osobisty',
  'filters.delivery.pickupDesc': 'Możliwość odebrania osobiście',
  'filters.delivery.courier': 'Przesyłka kurierska',
  'filters.delivery.courierDesc': 'Wysyłka za pośrednictwem kuriera',
  'filters.delivery.inperson': 'Dostawa osobista',
  'filters.delivery.inpersonDesc': 'Sprzedawca dostarcza osobiście',
  'filters.sellerType.title': 'Typ sprzedawcy',
  'filters.sellerType.any': 'Dowolny',
  'filters.sellerType.private': 'Osoba prywatna',
  'filters.sellerType.business': 'Firma/Przedsiębiorstwo',
  'filters.datePosted.title': 'Data dodania',
  'filters.datePosted.any': 'Dowolna',
  'filters.datePosted.today': 'Dzisiaj',
  'filters.datePosted.3days': 'Ostatnie 3 dni',
  'filters.datePosted.week': 'Ostatni tydzień',
  'filters.datePosted.month': 'Ostatni miesiąc',
  'filters.categorySpecific': 'Filtry dla kategorii',
  
  // Filtry dla kategorii zwierząt
  'filters.animals.type': 'Typ',
  'filters.animals.purpose': 'Przeznaczenie',
  'filters.all': 'Wszystkie',
  'filters.animals.forSale': 'Na sprzedaż',
  'filters.animals.forAdoption': 'Do adopcji',
  'filters.animals.forBreeding': 'Do hodowli',
  'filters.animals.lostFound': 'Zgubione/Znalezione',
  
  // Filtry dla kategorii dzieci
  'filters.kids.type': 'Typ',
  'filters.kids.ageGroup': 'Grupa wiekowa',
  'filters.kids.condition': 'Stan',
  'filters.kids.new': 'Nowe',
  'filters.kids.likeNew': 'Jak nowe',
  'filters.kids.good': 'Dobry',
  'filters.kids.acceptable': 'Akceptowalny',
  'filters.resetCategoryFilters': 'Resetuj filtry kategorii',
  
  // Tworzenie ogłoszenia
  'createAd.title': 'Utwórz nowe ogłoszenie',
  'createAd.description': 'Powiedz sprzedawcom, czego szukasz',
  'createAd.form.title': 'Tytuł ogłoszenia',
  'createAd.form.title.placeholder': 'Np. "Szukam smartfona Samsung Galaxy S21"',
  'createAd.form.title.desc': 'Krótki, jasny tytuł opisujący, czego szukasz',
  'createAd.form.category': 'Kategoria',
  'createAd.form.category.placeholder': 'Wybierz kategorię',
  'createAd.form.description': 'Opis',
  'createAd.form.description.placeholder': 'Opisz dokładnie, czego szukasz, podając szczegóły, takie jak: model, stan, kolor, itp.',
  'createAd.form.description.desc': 'Im dokładniejszy opis, tym lepsze otrzymasz oferty',
  'createAd.form.budgetRange': 'Przedział cenowy (zł)',
  'createAd.form.budgetRange.desc': 'Podaj orientacyjny budżet, by otrzymać odpowiednie oferty',
  'createAd.form.location': 'Lokalizacja',
  'createAd.form.location.placeholder': 'Np. "Warszawa" lub "cała Polska"',
  'createAd.form.location.desc': 'Lokalizacja, w której chcesz dokonać zakupu',
  'createAd.form.submit': 'Opublikuj ogłoszenie',
  
  // Panel użytkownika
  'dashboard.title': 'Panel użytkownika',
  'dashboard.subtitle': 'Zarządzaj swoimi ogłoszeniami i odpowiedziami',
  'dashboard.tabs.myAds': 'Moje ogłoszenia',
  'dashboard.tabs.myResponses': 'Moje odpowiedzi',
  'dashboard.response.message': 'Wiadomość',
  'dashboard.response.price': 'Cena',
  'dashboard.response.adStatus': 'Status ogłoszenia',
  'dashboard.response.viewAd': 'Zobacz ogłoszenie',
  'dashboard.response.date': 'Data',
  
  // Oceny użytkownika
  'user_ratings': 'Oceny użytkownika',
  'as_buyer': 'jako kupujący',
  'as_seller': 'jako sprzedawca',
  'all_ratings': 'wszystkie oceny',
  'no_seller_ratings': 'brak ocen jako sprzedawca',
  
  // Wsparcie
  'support.title': 'Wsparcie',
  'support.subtitle': 'Jak możemy Ci pomóc?',
  'support.helpCenter.title': 'Centrum pomocy',
  'support.helpCenter.desc': 'Znajdź odpowiedzi na najczęściej zadawane pytania',
  'support.safetyTips.title': 'Porady bezpieczeństwa',
  'support.safetyTips.desc': 'Jak bezpiecznie korzystać z JaKupię.pl',
  'support.contact.title': 'Kontakt',
  'support.contact.desc': 'Skontaktuj się z naszym zespołem wsparcia',
  'support.privacy.title': 'Polityka prywatności',
  'support.privacy.desc': 'Jak dbamy o Twoje dane',
  'support.terms.title': 'Warunki korzystania',
  'support.terms.desc': 'Zasady korzystania z JaKupię.pl',
  'support.needHelp': 'Potrzebujesz pomocy?',
  'support.contactSupport': 'Skontaktuj się z nami',
  
  // Stopka
  'footer.quickLinks': 'Szybkie linki',
  'footer.support': 'Wsparcie',
  'footer.stayUpdated': 'Bądź na bieżąco',
  'footer.description': 'Odwrócona platforma e-commerce, gdzie kupujący publikują ogłoszenia, a sprzedawcy odpowiadają z ofertami',
  'footer.newsletter': 'Newsletter',
  'footer.subscribe': 'Zapisz się',
  'footer.email.placeholder': 'Twój adres email',
  'footer.helpCenter': 'Centrum pomocy',
  'footer.safetyTips': 'Porady bezpieczeństwa',
  'footer.contact': 'Kontakt',
  'footer.privacyPolicy': 'Polityka prywatności',
  'footer.rodoPolicy': 'Polityka RODO',
  
  // Błędy
  'errors.loading': 'Wystąpił błąd podczas ładowania danych',
  'errors.tryAgain': 'Spróbuj ponownie'
};