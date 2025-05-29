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
  // Tworzenie ogłoszenia - sekcje formularza
  "createAd.form.basicInfo": {
    en: "Basic Information",
    pl: "Podstawowe informacje"
  },
  "createAd.form.details": {
    en: "Ad Details",
    pl: "Szczegóły ogłoszenia"
  },
  "filters.categorySpecific": {
    en: "Category Filters",
    pl: "Filtry dla kategorii"
  },
  "filters.homeDetails": {
    en: "Home & Garden Details",
    pl: "Szczegóły produktu - Dom i Ogród"
  },
  "filters.homeCategory": {
    en: "Subcategory",
    pl: "Podkategoria"
  },
  "filters.selectCategory": {
    en: "Select subcategory",
    pl: "Wybierz podkategorię"
  },
  "filters.condition": {
    en: "Condition",
    pl: "Stan"
  },
  "filters.condition.new": {
    en: "New",
    pl: "Nowy"
  },
  "filters.condition.used": {
    en: "Used",
    pl: "Używany"
  },
  "filters.condition.damaged": {
    en: "Damaged",
    pl: "Uszkodzony"
  },
  "filters.material": {
    en: "Material",
    pl: "Materiał"
  },
  "filters.selectMaterial": {
    en: "Select material",
    pl: "Wybierz materiał"
  },
  "filters.color": {
    en: "Color",
    pl: "Kolor"
  },
  "filters.selectColor": {
    en: "Select color",
    pl: "Wybierz kolor"
  },
  
  // Elektronika - filtry
  "filters.electronic.details": {
    en: "Device Details",
    pl: "Szczegóły urządzenia"
  },
  "filters.electronicType": {
    en: "Device Type",
    pl: "Typ urządzenia"
  },
  "filters.storage": {
    en: "Storage",
    pl: "Pamięć"
  },
  "filters.selectStorage": {
    en: "Select storage capacity",
    pl: "Wybierz pojemność pamięci"
  },
  "filters.memory": {
    en: "RAM Memory",
    pl: "Pamięć RAM"
  },
  "filters.selectMemory": {
    en: "Select RAM capacity",
    pl: "Wybierz pojemność pamięci RAM"
  },
  "filters.screenSize": {
    en: "Screen Size",
    pl: "Rozmiar ekranu"
  },
  "filters.selectScreenSize": {
    en: "Select screen size",
    pl: "Wybierz rozmiar ekranu"
  },
  "filters.warranty": {
    en: "Warranty",
    pl: "Gwarancja"
  },
  "filters.selectWarranty": {
    en: "Select warranty period",
    pl: "Wybierz okres gwarancji"
  },
  "filters.condition.like_new": {
    en: "Like New",
    pl: "Jak nowy"
  },
  
  // Filtry dla kategorii Motoryzacja
  "filters.vehicle.details": {
    en: "Vehicle Details",
    pl: "Szczegóły pojazdu"
  },
  "filters.vehicleType": {
    en: "Vehicle Type",
    pl: "Typ pojazdu"
  },
  "filters.productionYear": {
    en: "Production Year",
    pl: "Rok produkcji"
  },
  "filters.mileage": {
    en: "Mileage",
    pl: "Przebieg"
  },
  "filters.fuel": {
    en: "Fuel Type",
    pl: "Rodzaj paliwa"
  },
  "filters.engineCapacity": {
    en: "Engine Capacity",
    pl: "Pojemność silnika"
  },
  "filters.transmission": {
    en: "Transmission",
    pl: "Skrzynia biegów"
  },
  "filters.bodyType": {
    en: "Body Type",
    pl: "Typ nadwozia"
  },
  "filters.drive": {
    en: "Drive",
    pl: "Napęd"
  },
  
  // Filtry dla kategorii Dom i Ogród
  "filters.home.details": {
    en: "Home & Garden Details",
    pl: "Szczegóły - Dom i Ogród"
  },
  "filters.home.category": {
    en: "Subcategory",
    pl: "Podkategoria"
  },
  "filters.style": {
    en: "Style",
    pl: "Styl"
  },
  "filters.selectStyle": {
    en: "Select style",
    pl: "Wybierz styl"
  },
  "filters.brand": {
    en: "Brand",
    pl: "Marka"
  },
  "filters.selectBrand": {
    en: "Select brand",
    pl: "Wybierz markę"
  },
  "filters.size": {
    en: "Size",
    pl: "Rozmiar"
  },
  "filters.selectSize": {
    en: "Select size",
    pl: "Wybierz rozmiar"
  },
  
  // Filtry dla kategorii Moda
  "filters.fashion.details": {
    en: "Fashion Details",
    pl: "Szczegóły - Moda"
  },
  "filters.clothingType": {
    en: "Clothing Type",
    pl: "Rodzaj odzieży"
  },
  "filters.gender": {
    en: "Gender",
    pl: "Płeć"
  },
  "filters.male": {
    en: "Male",
    pl: "Męskie"
  },
  "filters.female": {
    en: "Female",
    pl: "Damskie"
  },
  "filters.unisex": {
    en: "Unisex",
    pl: "Unisex"
  },
  "filters.season": {
    en: "Season",
    pl: "Sezon"
  },
  "filters.spring": {
    en: "Spring",
    pl: "Wiosna"
  },
  "filters.summer": {
    en: "Summer",
    pl: "Lato"
  },
  "filters.autumn": {
    en: "Autumn",
    pl: "Jesień"
  },
  "filters.winter": {
    en: "Winter",
    pl: "Zima"
  },
  "filters.allSeasons": {
    en: "All Seasons",
    pl: "Wszystkie sezony"
  },
  
  // Filtry dla kategorii Usługi
  "filters.service.details": {
    en: "Service Details",
    pl: "Szczegóły usługi"
  },
  "filters.serviceType": {
    en: "Service Type",
    pl: "Rodzaj usługi"
  },
  "filters.services.title": {
    en: "Service Details",
    pl: "Szczegóły usługi"
  },
  "filters.services.category": {
    en: "Service Category",
    pl: "Kategoria usługi"
  },
  "filters.services.experience": {
    en: "Experience",
    pl: "Doświadczenie"
  },
  "filters.selectExperience": {
    en: "Select Experience Level",
    pl: "Wybierz poziom doświadczenia"
  },
  "filters.services.availability": {
    en: "Availability",
    pl: "Dostępność"
  },
  "filters.selectAvailability": {
    en: "Select Availability",
    pl: "Wybierz dostępność"
  },
  "filters.services.location": {
    en: "Service Location",
    pl: "Lokalizacja usługi"
  },
  "filters.services.location.client": {
    en: "At Client's Location",
    pl: "U klienta"
  },
  "filters.services.location.provider": {
    en: "At Provider's Location",
    pl: "U wykonawcy"
  },
  "filters.services.location.online": {
    en: "Online",
    pl: "Online"
  },
  "filters.services.location.both": {
    en: "Both Locations",
    pl: "Obie lokalizacje"
  },
  "filters.services.pricing": {
    en: "Pricing",
    pl: "Wycena"
  },
  "filters.selectPricing": {
    en: "Select Pricing Type",
    pl: "Wybierz rodzaj wyceny"
  },
  "filters.services.additionalOptions": {
    en: "Additional Options",
    pl: "Dodatkowe opcje"
  },
  "filters.services.invoice": {
    en: "Invoice",
    pl: "Faktura"
  },
  "filters.services.insurance": {
    en: "Insurance",
    pl: "Ubezpieczenie"
  },
  "filters.services.guarantee": {
    en: "Guarantee",
    pl: "Gwarancja"
  },
  "filters.services.contract": {
    en: "Contract",
    pl: "Umowa"
  },
  "filters.services.delivery": {
    en: "Delivery",
    pl: "Dostawa"
  },
  "filters.experience": {
    en: "Experience",
    pl: "Doświadczenie"
  },
  "filters.availability": {
    en: "Availability",
    pl: "Dostępność"
  },
  "filters.remote": {
    en: "Remote",
    pl: "Zdalnie"
  },
  "filters.onsite": {
    en: "On-site",
    pl: "Na miejscu"
  },
  "filters.both": {
    en: "Both",
    pl: "Oba"
  },
  "filters.payment": {
    en: "Payment",
    pl: "Płatność"
  },
  "filters.hourly": {
    en: "Hourly",
    pl: "Godzinowa"
  },
  "filters.fixed": {
    en: "Fixed price",
    pl: "Stała cena"
  },
  "filters.negotiable": {
    en: "Negotiable",
    pl: "Do negocjacji"
  },
  
  // Filtry dla kategorii Zwierzęta
  "filters.animal.details": {
    en: "Pet Supplies Details",
    pl: "Szczegóły - Akcesoria dla zwierząt"
  },
  "filters.petType": {
    en: "Pet Type",
    pl: "Rodzaj zwierzęcia"
  },
  "filters.productType": {
    en: "Product Type",
    pl: "Rodzaj produktu"
  },
  "filters.food": {
    en: "Food",
    pl: "Karma"
  },
  "filters.accessories": {
    en: "Accessories",
    pl: "Akcesoria"
  },
  "filters.toys": {
    en: "Toys",
    pl: "Zabawki"
  },
  "filters.care": {
    en: "Care Products",
    pl: "Produkty pielęgnacyjne"
  },
  "filters.age": {
    en: "Age",
    pl: "Wiek"
  },
  "filters.puppy": {
    en: "Puppy/Kitten",
    pl: "Szczeniak/Kociak"
  },
  "filters.adult": {
    en: "Adult",
    pl: "Dorosły"
  },
  "filters.senior": {
    en: "Senior",
    pl: "Senior"
  },
  "filters.allAges": {
    en: "All Ages",
    pl: "Wszystkie grupy wiekowe"
  },
  
  // Filtry dla kategorii Rolnictwo
  "filters.agriculture.details": {
    en: "Agriculture Details",
    pl: "Szczegóły - Rolnictwo"
  },
  "filters.agriculture.category": {
    en: "Agriculture Category",
    pl: "Kategoria rolnicza"
  },
  "filters.agriculture.type": {
    en: "Type",
    pl: "Typ"
  },
  "filters.agriculture.area": {
    en: "Area",
    pl: "Powierzchnia"
  },
  "filters.agriculture.usage": {
    en: "Usage",
    pl: "Przeznaczenie"
  },
  "filters.agriculture.machinery": {
    en: "Machinery",
    pl: "Maszyny rolnicze"
  },
  "filters.agriculture.crops": {
    en: "Crops",
    pl: "Uprawy"
  },
  "filters.agriculture.animals": {
    en: "Animals",
    pl: "Zwierzęta hodowlane"
  },
  "filters.agriculture.organic": {
    en: "Organic",
    pl: "Ekologiczne"
  },
  "filters.agriculture.certificate": {
    en: "Certificates",
    pl: "Certyfikaty"
  },
  
  // Filtry dla kategorii Muzyka i Edukacja
  "filters.music.title": {
    en: "Music & Education Details",
    pl: "Szczegóły - Muzyka i Edukacja"
  },
  "filters.music.category": {
    en: "Category",
    pl: "Kategoria"
  },
  "filters.music.instrument": {
    en: "Instrument Type",
    pl: "Rodzaj instrumentu"
  },
  "filters.music.genre": {
    en: "Music Genre",
    pl: "Gatunek muzyczny"
  },
  "filters.music.format": {
    en: "Format",
    pl: "Format"
  },
  "filters.education.level": {
    en: "Education Level",
    pl: "Poziom edukacji"
  },
  "filters.education.subject": {
    en: "Subject",
    pl: "Przedmiot"
  },
  "filters.education.language": {
    en: "Language",
    pl: "Język"
  },
  "filters.education.format": {
    en: "Format",
    pl: "Format"
  },
  
  // Filtry dla kategorii Sport i Hobby
  "filters.sport.title": {
    en: "Sports & Hobby Details",
    pl: "Szczegóły - Sport i Hobby"
  },
  "filters.sport.category": {
    en: "Category",
    pl: "Kategoria"
  },
  "filters.sport.discipline": {
    en: "Discipline",
    pl: "Dyscyplina"
  },
  "filters.sport.level": {
    en: "Level",
    pl: "Poziom zaawansowania"
  },
  "filters.sport.gender": {
    en: "Gender",
    pl: "Płeć"
  },
  "filters.sport.size": {
    en: "Size",
    pl: "Rozmiar"
  },
  "filters.hobby.type": {
    en: "Hobby Type",
    pl: "Rodzaj hobby"
  },
  
  // Filtry dla kategorii Firma i Przemysł
  "filters.business.title": {
    en: "Business & Industry Details",
    pl: "Szczegóły - Firma i Przemysł"
  },
  "filters.business.category": {
    en: "Category",
    pl: "Kategoria"
  },
  "filters.business.type": {
    en: "Business Type",
    pl: "Rodzaj działalności"
  },
  "filters.business.condition": {
    en: "Condition",
    pl: "Stan"
  },
  "filters.business.usage": {
    en: "Usage",
    pl: "Przeznaczenie"
  },
  
  // Filtry dla kategorii Antyki i Kolekcje
  "filters.antiques.title": {
    en: "Antiques & Collections Details",
    pl: "Szczegóły - Antyki i Kolekcje"
  },
  "filters.antiques.category": {
    en: "Category",
    pl: "Kategoria"
  },
  "filters.antiques.period": {
    en: "Period",
    pl: "Okres pochodzenia"
  },
  "filters.antiques.material": {
    en: "Material",
    pl: "Materiał"
  },
  "filters.antiques.condition": {
    en: "Condition",
    pl: "Stan"
  },
  "filters.collections.type": {
    en: "Collection Type",
    pl: "Rodzaj kolekcji"
  },
  "filters.antiques.authenticity": {
    en: "Authenticity Certificate",
    pl: "Certyfikat autentyczności"
  },
  
  // Filtry dla kategorii Zdrowie i Uroda
  "filters.health.title": {
    en: "Health & Beauty Details",
    pl: "Szczegóły - Zdrowie i Uroda"
  },
  "filters.health.category": {
    en: "Category",
    pl: "Kategoria"
  },
  "filters.health.type": {
    en: "Product Type",
    pl: "Rodzaj produktu"
  },
  "filters.health.gender": {
    en: "Gender",
    pl: "Płeć"
  },
  "filters.health.brand": {
    en: "Brand",
    pl: "Marka"
  },
  "filters.health.natural": {
    en: "Natural Ingredients",
    pl: "Naturalne składniki"
  },
  "filters.health.expiration": {
    en: "Expiration Date",
    pl: "Data ważności"
  },
  
  // Filtry dla kategorii Wypożyczalnia
  "filters.rental.title": {
    en: "Rental Details",
    pl: "Szczegóły - Wypożyczalnia"
  },
  "filters.rental.category": {
    en: "Category",
    pl: "Kategoria"
  },
  "filters.rental.period": {
    en: "Rental Period",
    pl: "Okres wypożyczenia"
  },
  "filters.rental.deposit": {
    en: "Deposit Required",
    pl: "Wymagana kaucja"
  },
  "filters.rental.delivery": {
    en: "Delivery Available",
    pl: "Możliwość dostawy"
  },
  "filters.rental.condition": {
    en: "Condition",
    pl: "Stan"
  },
  
  // Filtry dla kategorii Noclegi
  "filters.accommodation.title": {
    en: "Accommodation Details",
    pl: "Szczegóły - Noclegi"
  },
  "filters.accommodation.type": {
    en: "Accommodation Type",
    pl: "Rodzaj zakwaterowania"
  },
  "filters.accommodation.guests": {
    en: "Number of Guests",
    pl: "Liczba gości"
  },
  "filters.accommodation.rooms": {
    en: "Number of Rooms",
    pl: "Liczba pokoi"
  },
  "filters.accommodation.location": {
    en: "Location",
    pl: "Lokalizacja"
  },
  "filters.accommodation.amenities": {
    en: "Amenities",
    pl: "Udogodnienia"
  },
  "filters.accommodation.availability": {
    en: "Availability",
    pl: "Dostępność"
  },
  
  // Filtry dla kategorii Praca
  "filters.job.title": {
    en: "Job Details",
    pl: "Szczegóły - Praca"
  },
  "filters.job.category": {
    en: "Job Category",
    pl: "Kategoria pracy"
  },
  "filters.job.type": {
    en: "Employment Type",
    pl: "Rodzaj zatrudnienia"
  },
  "filters.job.schedule": {
    en: "Work Schedule",
    pl: "Harmonogram pracy"
  },
  "filters.job.experience": {
    en: "Experience Level",
    pl: "Poziom doświadczenia"
  },
  "filters.job.education": {
    en: "Education Level",
    pl: "Poziom wykształcenia"
  },
  "filters.job.salary": {
    en: "Salary Range",
    pl: "Przedział wynagrodzenia"
  },
  "filters.job.remote": {
    en: "Remote Work",
    pl: "Praca zdalna"
  },
  "filters.job.benefits": {
    en: "Benefits",
    pl: "Benefity"
  },
  
  // Naprawione tłumaczenia dla istniejących kategorii
  "filters.fashion.title": {
    en: "Fashion Details",
    pl: "Szczegóły - Moda"
  },
  "filters.fashion.type": {
    en: "Clothing Type",
    pl: "Rodzaj odzieży"
  },
  "filters.fashion.gender": {
    en: "Gender",
    pl: "Płeć"
  },
  "filters.fashion.gender.female": {
    en: "Female",
    pl: "Damskie"
  },
  "filters.fashion.gender.male": {
    en: "Male",
    pl: "Męskie"
  },
  "filters.fashion.gender.unisex": {
    en: "Unisex",
    pl: "Unisex"
  },
  "filters.fashion.gender.kids": {
    en: "Kids",
    pl: "Dziecięce"
  },
  "filters.fashion.size": {
    en: "Size",
    pl: "Rozmiar"
  },
  "filters.fashion.brand": {
    en: "Brand",
    pl: "Marka"
  },
  "filters.fashion.material": {
    en: "Material",
    pl: "Materiał"
  },
  "filters.fashion.season": {
    en: "Season",
    pl: "Sezon"
  },
  "filters.selectSeason": {
    en: "Select season",
    pl: "Wybierz sezon"
  },
  "filters.fashion.style": {
    en: "Style",
    pl: "Styl"
  },
  "filters.condition.new_no_tag": {
    en: "New without tags",
    pl: "Nowe bez metki"
  },
  "filters.condition.very_good": {
    en: "Very good",
    pl: "Bardzo dobry"
  },
  "filters.condition.good": {
    en: "Good",
    pl: "Dobry"
  },
  "filters.condition.acceptable": {
    en: "Acceptable",
    pl: "Akceptowalny"
  },
  
  // Naprawy dla kategorii Zwierzęta
  "filters.animals.title": {
    en: "Pet Supplies Details",
    pl: "Szczegóły - Akcesoria dla zwierząt"
  },
  "filters.animals.category": {
    en: "Category",
    pl: "Kategoria"
  },
  "filters.animals.petType": {
    en: "Pet Type",
    pl: "Rodzaj zwierzęcia"
  },
  "filters.condition.used_very_good": {
    en: "Used - Very Good",
    pl: "Używany - Bardzo dobry"
  },
  "filters.condition.used_good": {
    en: "Used - Good",
    pl: "Używany - Dobry"
  },
  "filters.condition.used_acceptable": {
    en: "Used - Acceptable",
    pl: "Używany - Akceptowalny"
  },
  "filters.animals.additionalInfo": {
    en: "Additional Information",
    pl: "Informacje dodatkowe"
  },
  "filters.animals.delivery": {
    en: "Delivery Available",
    pl: "Możliwość dostawy"
  },
  "filters.animals.receipt": {
    en: "Receipt Available",
    pl: "Paragon/Faktura"
  },
  "filters.animals.warranty": {
    en: "Warranty",
    pl: "Gwarancja"
  },
  
  // Naprawy dla kategorii Dla Dzieci
  "filters.kids.title": {
    en: "Kids Items Details",
    pl: "Szczegóły - Dla Dzieci"
  },
  "filters.kids.category": {
    en: "Category",
    pl: "Kategoria"
  },
  "filters.kids.gender": {
    en: "Gender",
    pl: "Płeć"
  },
  "filters.kids.gender.boy": {
    en: "Boy",
    pl: "Chłopiec"
  },
  "filters.kids.gender.girl": {
    en: "Girl",
    pl: "Dziewczynka"
  },
  "filters.kids.gender.unisex": {
    en: "Unisex",
    pl: "Unisex"
  },
  "filters.kids.brand": {
    en: "Brand",
    pl: "Marka"
  },
  "filters.selectAgeGroup": {
    en: "Select age group",
    pl: "Wybierz grupę wiekową"
  },

  // Filtry dla kategorii Dzieci
  "filters.kids.condition": {
    en: "Condition",
    pl: "Stan"
  },
  "filters.kids.new": {
    en: "New",
    pl: "Nowe"
  },
  "filters.kids.likeNew": {
    en: "Like New",
    pl: "Jak nowe"
  },
  "filters.kids.good": {
    en: "Good",
    pl: "Dobry"
  },
  "filters.kids.acceptable": {
    en: "Acceptable",
    pl: "Akceptowalny"
  },
  "filters.kids.color": {
    en: "Color",
    pl: "Kolor"
  },
  "filters.kids.additionalInfo": {
    en: "Additional Information",
    pl: "Informacje dodatkowe"
  },
  "filters.kids.original_packaging": {
    en: "Original Packaging",
    pl: "Oryginalne opakowanie"
  },
  "filters.kids.complete_set": {
    en: "Complete Set",
    pl: "Kompletny zestaw"
  },
  "filters.kids.delivery": {
    en: "Delivery Available",
    pl: "Możliwość dostawy"
  },
  "filters.dimensions": {
    en: "Dimensions",
    pl: "Wymiary"
  },
  "filters.dimensions.hint": {
    en: "Enter dimensions in format: width x depth x height",
    pl: "Podaj wymiary w formacie: szerokość x głębokość x wysokość"
  },
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