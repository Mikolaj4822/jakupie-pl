import { useState, useEffect } from "react";
import { Category } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/hooks/use-language";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useIsMobile } from "@/hooks/use-mobile";
import LocationFilterHierarchical from "@/components/ads/location-filter-hierarchical";
import MobileLocationFilterHierarchical from "@/components/ads/mobile-location-filter-hierarchical";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  // Common icons
  ChevronDown,
  Sliders,
  ArrowUpDown,
  XCircle,
  MapPin,
  Calendar,
  Tag,
  Truck,
  User,
  CircleDollarSign,
  FileSpreadsheet,
  Clock,
  ShoppingCart,
  
  // Category specific icons
  Car, // Motoryzacja
  Home, // Nieruchomości
  Smartphone, // Elektronika
  ShoppingBag, // Moda
  Tractor, // Rolnictwo
  Sofa, // Dom i Ogród
  Flower, 
  Hammer,
  Baby, // Dla Dzieci
  Dog, // Zwierzęta
  Dumbbell, // Sport i Hobby
  Bike,
  Mountain,
  Circle,
  Activity,
  Anchor, // Wędkarstwo
  Droplets, // Sporty wodne
  Users, // Sporty drużynowe
  Music, // Muzyka i Edukacja
  GraduationCap,
  Briefcase, // Praca & Firma i Przemysł
  Wrench, // Usługi
  Gem, // Antyki i Kolekcje
  Stethoscope, // Zdrowie i Uroda
  RotateCw, // Wypożyczalnia
  Gift, // Oddam za darmo
  Hotel, // Noclegi
  FolderOpen,
  BookOpen,
  Building,
  LandPlot,
  UtensilsCrossed,
  Bookmark,
  Shirt
} from "lucide-react";

export interface FilterOptions {
  category: number | null;
  minPrice: number | null;
  maxPrice: number | null;
  location: string | null;
  datePosted: string | null;
  sortBy: string;
  condition?: string;
  deliveryOptions?: string[];
  sellerType?: string;
  categorySpecificFilters?: Record<string, any>;
}

interface AdFiltersProps {
  categories: Category[];
  selectedCategory: number | null;
  onCategoryChange: (categoryId: number | null) => void;
  onFilterChange?: (filters: FilterOptions) => void;
  onSortChange?: (sortOption: string) => void;
  currentFilters?: FilterOptions;
}

// Komponent sekcji filtrów z animacją rozwijania
function FilterSection({ 
  title, 
  icon, 
  children,
  isOpen = true,
  toggleOpen
}: { 
  title: string; 
  icon: React.ReactNode;
  children: React.ReactNode;
  isOpen?: boolean;
  toggleOpen?: () => void;
}) {
  return (
    <div className="mb-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm p-4">
      <div 
        className="flex items-center gap-2 mb-3 cursor-pointer" 
        onClick={toggleOpen}
      >
        <div className="text-blue-600 dark:text-blue-400">{icon}</div>
        <h3 className="font-medium text-gray-900 dark:text-gray-100 flex-1">{title}</h3>
        {toggleOpen && (
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        )}
      </div>
      {isOpen && <div className="ml-6">{children}</div>}
    </div>
  );
}

export default function AdFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  onFilterChange,
  onSortChange,
  currentFilters = {
    category: null,
    minPrice: null,
    maxPrice: null,
    location: null,
    datePosted: null,
    sortBy: "newest"
  }
}: AdFiltersProps) {
  const { t } = useLanguage();
  const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>(currentFilters);
  const [tempPriceRange, setTempPriceRange] = useState<[number, number]>([
    filters.minPrice || 0, 
    filters.maxPrice || 10000
  ]);
  const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    price: true,
    location: true,
    datePosted: true,
    delivery: true,
    sellerType: true
  });
  const isMobile = useIsMobile();

  // Określenie nazwy kategorii gdy zmienia się wybrana kategoria
  useEffect(() => {
    if (selectedCategory === null) {
      setSelectedCategoryName(null);
      return;
    }
    
    const category = categories.find(cat => cat.id === selectedCategory);
    if (category) {
      setSelectedCategoryName(category.name);
    }
  }, [selectedCategory, categories]);
  
  // Aktualizacja stanu filtrów i wywołanie funkcji zwrotnej rodzica
  const handleFilterChange = (field: keyof FilterOptions, value: any) => {
    const updatedFilters = { ...filters, [field]: value };
    setFilters(updatedFilters);
    if (onFilterChange) {
      onFilterChange(updatedFilters);
    }
  };
  
  // Obsługa filtrów specyficznych dla kategorii
  const handleCategorySpecificFilterChange = (field: string, value: any) => {
    const currentCategoryFilters = filters.categorySpecificFilters || {};
    const updatedCategoryFilters = {
      ...currentCategoryFilters,
      [field]: value
    };
    
    const updatedFilters = {
      ...filters,
      categorySpecificFilters: updatedCategoryFilters
    };
    
    setFilters(updatedFilters);
    if (onFilterChange) {
      onFilterChange(updatedFilters);
    }
  };
  
  // Obsługa zmian zakresu cen
  const handlePriceRangeChange = () => {
    const [min, max] = tempPriceRange;
    const updatedFilters = {
      ...filters,
      minPrice: min || null,
      maxPrice: max || null
    };
    setFilters(updatedFilters);
    if (onFilterChange) {
      onFilterChange(updatedFilters);
    }
  };
  
  // Obsługa zmian sortowania
  const handleSortChange = (value: string) => {
    setFilters(prev => ({ ...prev, sortBy: value }));
    if (onSortChange) {
      onSortChange(value);
    }
  };
  
  // Obsługa zmiany opcji dostawy
  const handleDeliveryOptionChange = (option: string, isChecked: boolean) => {
    const currentOptions = filters.deliveryOptions || [];
    let newOptions: string[];
    
    if (isChecked) {
      newOptions = [...currentOptions, option];
    } else {
      newOptions = currentOptions.filter(opt => opt !== option);
    }
    
    handleFilterChange('deliveryOptions', newOptions.length > 0 ? newOptions : undefined);
  };
  
  // Resetowanie wszystkich filtrów
  const handleResetFilters = () => {
    const resetFilters = {
      category: selectedCategory,
      minPrice: null,
      maxPrice: null,
      location: null,
      datePosted: null,
      sortBy: "newest",
      condition: undefined,
      deliveryOptions: undefined,
      sellerType: undefined,
      categorySpecificFilters: undefined
    };
    
    setFilters(resetFilters);
    setTempPriceRange([0, 10000]);
    if (onFilterChange) {
      onFilterChange(resetFilters);
    }
  };
  
  // Resetowanie filtrów specyficznych dla kategorii
  const handleResetCategoryFilters = () => {
    const updatedFilters = {
      ...filters,
      categorySpecificFilters: undefined
    };
    
    setFilters(updatedFilters);
    if (onFilterChange) {
      onFilterChange(updatedFilters);
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  return (
    <div className="bg-card border border-border shadow-sm p-4 rounded-lg">
      {/* Tytuł sekcji filtrów */}
      <div className="mb-4 border-b border-border pb-3">
        <h2 className="text-xl font-semibold text-foreground mb-1">
          {t("filters.title")}
        </h2>
        <p className="text-sm text-muted-foreground">
          {t("filters.description")}
        </p>
      </div>
      
      {/* Kategorie */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3 px-1">
          <ShoppingCart className="h-5 w-5 text-primary" />
          <h3 className="font-medium text-foreground">{t("filters.categories")}</h3>
        </div>
        <div className="flex flex-wrap gap-2 ml-2">
          <Badge
            variant={selectedCategory === null ? "default" : "outline"}
            className="cursor-pointer px-3 py-1 text-sm hover:bg-primary/90"
            onClick={() => onCategoryChange(null)}
          >
            {t("categories.all")}
          </Badge>
          
          {categories.map((category) => (
            <Badge
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className="cursor-pointer px-3 py-1 text-sm hover:bg-primary/90"
              onClick={() => onCategoryChange(category.id)}
            >
              {category.name}
            </Badge>
          ))}
        </div>
      </div>
      
      {/* Przycisk filtry zaawansowane */}
      <div className="mb-4">
        <Button
          variant="outline"
          onClick={() => setIsAdvancedFiltersOpen(!isAdvancedFiltersOpen)}
          className="w-full flex justify-between items-center"
        >
          <div className="flex items-center">
            <Sliders className="mr-2 h-4 w-4" />
            {t("filters.advancedFilters")}
          </div>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              isAdvancedFiltersOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </div>
      
      {/* Filtry zaawansowane - pokazywane po kliknięciu */}
      {isAdvancedFiltersOpen && (
        <div className="mt-4">
          {/* Sortowanie */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <ArrowUpDown className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <h3 className="font-medium text-gray-900 dark:text-gray-100">{t("filters.sort.title")}</h3>
            </div>
            <Select 
              value={filters.sortBy} 
              onValueChange={handleSortChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t("filters.sort.placeholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">{t("filters.sort.newest")}</SelectItem>
                <SelectItem value="oldest">{t("filters.sort.oldest")}</SelectItem>
                <SelectItem value="price_asc">{t("filters.sort.priceAsc")}</SelectItem>
                <SelectItem value="price_desc">{t("filters.sort.priceDesc")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Layout dla filtrów */}
          <div className={isMobile ? "space-y-4" : "grid grid-cols-1 md:grid-cols-2 gap-4"}>
            <div className="space-y-4">
              {/* Cena */}
              <FilterSection 
                title={t("filters.price.title")} 
                icon={<Tag size={16} />}
                isOpen={expandedSections.price}
                toggleOpen={() => toggleSection('price')}
              >
                <div className="space-y-6">
                  <Slider
                    min={0}
                    max={10000}
                    step={100}
                    value={tempPriceRange}
                    onValueChange={(values) => setTempPriceRange(values as [number, number])}
                    onValueCommit={handlePriceRangeChange}
                  />
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <Label htmlFor="price-min">{t("filters.price.min")}</Label>
                      <Input
                        id="price-min"
                        type="number"
                        min={0}
                        value={tempPriceRange[0] || ''}
                        onChange={(e) => {
                          const newValue = e.target.value ? parseInt(e.target.value) : 0;
                          setTempPriceRange([newValue, tempPriceRange[1]]);
                        }}
                        onBlur={handlePriceRangeChange}
                      />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="price-max">{t("filters.price.max")}</Label>
                      <Input
                        id="price-max"
                        type="number"
                        min={0}
                        value={tempPriceRange[1] || ''}
                        onChange={(e) => {
                          const newValue = e.target.value ? parseInt(e.target.value) : 0;
                          setTempPriceRange([tempPriceRange[0], newValue]);
                        }}
                        onBlur={handlePriceRangeChange}
                      />
                    </div>
                  </div>
                </div>
              </FilterSection>
              
              {/* Lokalizacja */}
              <FilterSection 
                title={t("filters.location.title")} 
                icon={<MapPin size={16} />}
                isOpen={expandedSections.location}
                toggleOpen={() => toggleSection('location')}
              >
                {isMobile ? (
                  <MobileLocationFilterHierarchical
                    value={filters.location}
                    onChange={(value) => handleFilterChange('location', value)}
                  />
                ) : (
                  <LocationFilterHierarchical
                    value={filters.location}
                    onChange={(value) => handleFilterChange('location', value)}
                  />
                )}
              </FilterSection>
              
              {/* Data dodania */}
              <FilterSection 
                title={t("filters.datePosted.title")} 
                icon={<Calendar size={16} />}
                isOpen={expandedSections.datePosted}
                toggleOpen={() => toggleSection('datePosted')}
              >
                <RadioGroup
                  value={filters.datePosted || "any"}
                  onValueChange={(value) => handleFilterChange('datePosted', value === 'any' ? null : value)}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="any" id="date-any" />
                    <Label htmlFor="date-any">{t("filters.datePosted.any")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="today" id="date-today" />
                    <Label htmlFor="date-today">{t("filters.datePosted.today")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3days" id="date-3days" />
                    <Label htmlFor="date-3days">{t("filters.datePosted.3days")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="week" id="date-week" />
                    <Label htmlFor="date-week">{t("filters.datePosted.week")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="month" id="date-month" />
                    <Label htmlFor="date-month">{t("filters.datePosted.month")}</Label>
                  </div>
                </RadioGroup>
              </FilterSection>
            </div>
            
            <div className="space-y-4">
              {/* Opcje dostawy */}
              <FilterSection 
                title={t("filters.delivery.title")} 
                icon={<Truck size={16} />}
                isOpen={expandedSections.delivery}
                toggleOpen={() => toggleSection('delivery')}
              >
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="delivery-pickup" 
                      checked={(filters.deliveryOptions || []).includes("pickup")}
                      onCheckedChange={(checked) => 
                        handleDeliveryOptionChange("pickup", checked as boolean)
                      }
                    />
                    <div className="space-y-1">
                      <Label 
                        htmlFor="delivery-pickup" 
                        className="font-medium"
                      >
                        {t("filters.delivery.pickup")}
                      </Label>
                      <p className="text-sm text-gray-500">
                        {t("filters.delivery.pickupDesc")}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="delivery-courier" 
                      checked={(filters.deliveryOptions || []).includes("courier")}
                      onCheckedChange={(checked) => 
                        handleDeliveryOptionChange("courier", checked as boolean)
                      }
                    />
                    <div className="space-y-1">
                      <Label 
                        htmlFor="delivery-courier" 
                        className="font-medium"
                      >
                        {t("filters.delivery.courier")}
                      </Label>
                      <p className="text-sm text-gray-500">
                        {t("filters.delivery.courierDesc")}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="delivery-inperson" 
                      checked={(filters.deliveryOptions || []).includes("inperson")}
                      onCheckedChange={(checked) => 
                        handleDeliveryOptionChange("inperson", checked as boolean)
                      }
                    />
                    <div className="space-y-1">
                      <Label 
                        htmlFor="delivery-inperson" 
                        className="font-medium"
                      >
                        {t("filters.delivery.inperson")}
                      </Label>
                      <p className="text-sm text-gray-500">
                        {t("filters.delivery.inpersonDesc")}
                      </p>
                    </div>
                  </div>
                </div>
              </FilterSection>
              
              {/* Typ sprzedawcy */}
              <FilterSection 
                title={t("filters.sellerType.title")} 
                icon={<User size={16} />}
                isOpen={expandedSections.sellerType}
                toggleOpen={() => toggleSection('sellerType')}
              >
                <RadioGroup
                  value={filters.sellerType || "any"}
                  onValueChange={(value) => handleFilterChange('sellerType', value === 'any' ? undefined : value)}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="any" id="seller-any" />
                    <Label htmlFor="seller-any">{t("filters.sellerType.any")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="private" id="seller-private" />
                    <Label htmlFor="seller-private">{t("filters.sellerType.private")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="business" id="seller-business" />
                    <Label htmlFor="seller-business">{t("filters.sellerType.business")}</Label>
                  </div>
                </RadioGroup>
              </FilterSection>
            </div>
          </div>
        </div>
      )}
      
      {/* Filtry specyficzne dla kategorii */}
      {selectedCategoryName && (
        <div className="mt-4 p-2">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4 bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
            {t("filters.categorySpecific")}
          </h3>
          
          <div className={isMobile ? "space-y-4" : "grid grid-cols-1 md:grid-cols-2 gap-4"}>
            {/* Filtry dla Motoryzacja */}
            {selectedCategoryName === "Motoryzacja" && (
              <>
                <FilterSection title="Typ pojazdu" icon={<Car size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.carType || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('carType', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Wybierz typ pojazdu" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Wszystkie</SelectItem>
                      <SelectItem value="cars">Samochody osobowe</SelectItem>
                      <SelectItem value="motorcycles">Motocykle</SelectItem>
                      <SelectItem value="trucks">Samochody ciężarowe</SelectItem>
                      <SelectItem value="heavy_trucks">Samochody ciężarowe (powyżej 3.5t)</SelectItem>
                      <SelectItem value="trucks_tractors">Ciągniki siodłowe</SelectItem>
                      <SelectItem value="special">Pojazdy specjalne</SelectItem>
                      <SelectItem value="agricultural">Maszyny rolnicze</SelectItem>
                      <SelectItem value="construction">Maszyny budowlane</SelectItem>
                      <SelectItem value="trailers">Przyczepy</SelectItem>
                      <SelectItem value="caravans">Przyczepy kempingowe</SelectItem>
                      <SelectItem value="buses">Autobusy</SelectItem>
                      <SelectItem value="vans">Dostawcze</SelectItem>
                      <SelectItem value="parts">Części samochodowe</SelectItem>
                      <SelectItem value="accessories">Akcesoria</SelectItem>
                      <SelectItem value="wheels">Opony i felgi</SelectItem>
                      <SelectItem value="other">Inne</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>
                
                <FilterSection title="Marka" icon={<Bookmark size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.carBrand || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('carBrand', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Wybierz markę" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Wszystkie</SelectItem>
                      {/* Dynamiczne marki w zależności od typu pojazdu */}
                      {(['all', 'cars'].includes(filters.categorySpecificFilters?.carType || 'all')) && (
                        <>
                          <SelectItem value="toyota">Toyota</SelectItem>
                          <SelectItem value="volkswagen">Volkswagen</SelectItem>
                          <SelectItem value="bmw">BMW</SelectItem>
                          <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
                          <SelectItem value="audi">Audi</SelectItem>
                          <SelectItem value="ford">Ford</SelectItem>
                          <SelectItem value="honda">Honda</SelectItem>
                          <SelectItem value="hyundai">Hyundai</SelectItem>
                          <SelectItem value="kia">Kia</SelectItem>
                          <SelectItem value="mazda">Mazda</SelectItem>
                          <SelectItem value="nissan">Nissan</SelectItem>
                          <SelectItem value="renault">Renault</SelectItem>
                          <SelectItem value="skoda">Škoda</SelectItem>
                          <SelectItem value="volvo">Volvo</SelectItem>
                          <SelectItem value="fiat">Fiat</SelectItem>
                          <SelectItem value="opel">Opel</SelectItem>
                          <SelectItem value="seat">Seat</SelectItem>
                          <SelectItem value="citroen">Citroën</SelectItem>
                          <SelectItem value="peugeot">Peugeot</SelectItem>
                        </>
                      )}
                      
                      {/* Marki dla ciężarówek i dostawczych */}
                      {(['trucks', 'heavy_trucks', 'trucks_tractors', 'vans'].includes(filters.categorySpecificFilters?.carType || '')) && (
                        <>
                          <SelectItem value="man">MAN</SelectItem>
                          <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
                          <SelectItem value="scania">Scania</SelectItem>
                          <SelectItem value="volvo">Volvo</SelectItem>
                          <SelectItem value="daf">DAF</SelectItem>
                          <SelectItem value="iveco">IVECO</SelectItem>
                          <SelectItem value="renault">Renault</SelectItem>
                          <SelectItem value="ford">Ford</SelectItem>
                          <SelectItem value="volkswagen">Volkswagen</SelectItem>
                          <SelectItem value="fiat">Fiat</SelectItem>
                          <SelectItem value="peugeot">Peugeot</SelectItem>
                          <SelectItem value="citroen">Citroën</SelectItem>
                          <SelectItem value="mitsubishi">Mitsubishi</SelectItem>
                          <SelectItem value="isuzu">Isuzu</SelectItem>
                          <SelectItem value="nissan">Nissan</SelectItem>
                          <SelectItem value="toyota">Toyota</SelectItem>
                        </>
                      )}
                      
                      {/* Marki dla motocykli */}
                      {(['motorcycles'].includes(filters.categorySpecificFilters?.carType || '')) && (
                        <>
                          <SelectItem value="honda">Honda</SelectItem>
                          <SelectItem value="yamaha">Yamaha</SelectItem>
                          <SelectItem value="suzuki">Suzuki</SelectItem>
                          <SelectItem value="kawasaki">Kawasaki</SelectItem>
                          <SelectItem value="bmw">BMW</SelectItem>
                          <SelectItem value="harley_davidson">Harley-Davidson</SelectItem>
                          <SelectItem value="ducati">Ducati</SelectItem>
                          <SelectItem value="ktm">KTM</SelectItem>
                          <SelectItem value="triumph">Triumph</SelectItem>
                          <SelectItem value="aprilia">Aprilia</SelectItem>
                          <SelectItem value="kymco">Kymco</SelectItem>
                          <SelectItem value="piaggio">Piaggio</SelectItem>
                        </>
                      )}
                      
                      {/* Marki dla maszyn rolniczych */}
                      {(['agricultural'].includes(filters.categorySpecificFilters?.carType || '')) && (
                        <>
                          <SelectItem value="john_deere">John Deere</SelectItem>
                          <SelectItem value="fendt">Fendt</SelectItem>
                          <SelectItem value="case">Case IH</SelectItem>
                          <SelectItem value="new_holland">New Holland</SelectItem>
                          <SelectItem value="claas">Claas</SelectItem>
                          <SelectItem value="deutz_fahr">Deutz-Fahr</SelectItem>
                          <SelectItem value="massey_ferguson">Massey Ferguson</SelectItem>
                          <SelectItem value="valtra">Valtra</SelectItem>
                          <SelectItem value="steyr">Steyr</SelectItem>
                          <SelectItem value="ursus">Ursus</SelectItem>
                          <SelectItem value="zetor">Zetor</SelectItem>
                        </>
                      )}
                      
                      {/* Marki dla maszyn budowlanych */}
                      {(['construction'].includes(filters.categorySpecificFilters?.carType || '')) && (
                        <>
                          <SelectItem value="caterpillar">Caterpillar</SelectItem>
                          <SelectItem value="komatsu">Komatsu</SelectItem>
                          <SelectItem value="jcb">JCB</SelectItem>
                          <SelectItem value="liebherr">Liebherr</SelectItem>
                          <SelectItem value="bobcat">Bobcat</SelectItem>
                          <SelectItem value="volvo">Volvo</SelectItem>
                          <SelectItem value="hitachi">Hitachi</SelectItem>
                          <SelectItem value="case">Case</SelectItem>
                          <SelectItem value="doosan">Doosan</SelectItem>
                          <SelectItem value="manitou">Manitou</SelectItem>
                        </>
                      )}
                      
                      <SelectItem value="other">Inne</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>
                
                <FilterSection title="Zakres roczników" icon={<Clock size={16} />}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="year-min">Od roku</Label>
                      <Select
                        value={filters.categorySpecificFilters?.yearMin || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('yearMin', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz rok" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="2025">2025</SelectItem>
                          <SelectItem value="2024">2024</SelectItem>
                          <SelectItem value="2023">2023</SelectItem>
                          <SelectItem value="2022">2022</SelectItem>
                          <SelectItem value="2021">2021</SelectItem>
                          <SelectItem value="2020">2020</SelectItem>
                          <SelectItem value="2019">2019</SelectItem>
                          <SelectItem value="2018">2018</SelectItem>
                          <SelectItem value="2017">2017</SelectItem>
                          <SelectItem value="2016">2016</SelectItem>
                          <SelectItem value="2015">2015</SelectItem>
                          <SelectItem value="2010">2010</SelectItem>
                          <SelectItem value="2005">2005</SelectItem>
                          <SelectItem value="2000">2000</SelectItem>
                          <SelectItem value="1995">1995</SelectItem>
                          <SelectItem value="1990">1990</SelectItem>
                          <SelectItem value="1980">1980</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="year-max">Do roku</Label>
                      <Select
                        value={filters.categorySpecificFilters?.yearMax || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('yearMax', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz rok" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="2025">2025</SelectItem>
                          <SelectItem value="2024">2024</SelectItem>
                          <SelectItem value="2023">2023</SelectItem>
                          <SelectItem value="2022">2022</SelectItem>
                          <SelectItem value="2021">2021</SelectItem>
                          <SelectItem value="2020">2020</SelectItem>
                          <SelectItem value="2019">2019</SelectItem>
                          <SelectItem value="2018">2018</SelectItem>
                          <SelectItem value="2017">2017</SelectItem>
                          <SelectItem value="2016">2016</SelectItem>
                          <SelectItem value="2015">2015</SelectItem>
                          <SelectItem value="2010">2010</SelectItem>
                          <SelectItem value="2005">2005</SelectItem>
                          <SelectItem value="2000">2000</SelectItem>
                          <SelectItem value="1995">1995</SelectItem>
                          <SelectItem value="1990">1990</SelectItem>
                          <SelectItem value="1980">1980</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </FilterSection>
                
                <FilterSection title="Przebieg" icon={<CircleDollarSign size={16} />}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="mileage-min">Min przebieg</Label>
                      <Input
                        id="mileage-min"
                        type="number"
                        min={0}
                        value={filters.categorySpecificFilters?.mileageMin || ''}
                        onChange={(e) => handleCategorySpecificFilterChange('mileageMin', e.target.value ? parseInt(e.target.value) : null)}
                        placeholder="0 km"
                      />
                    </div>
                    <div>
                      <Label htmlFor="mileage-max">Max przebieg</Label>
                      <Input
                        id="mileage-max"
                        type="number"
                        min={0}
                        value={filters.categorySpecificFilters?.mileageMax || ''}
                        onChange={(e) => handleCategorySpecificFilterChange('mileageMax', e.target.value ? parseInt(e.target.value) : null)}
                        placeholder="500 000 km"
                      />
                    </div>
                  </div>
                </FilterSection>
                
                <FilterSection title="Rodzaj paliwa" icon={<FileSpreadsheet size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.fuelType || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('fuelType', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Wybierz rodzaj paliwa" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Wszystkie</SelectItem>
                      <SelectItem value="petrol">Benzyna</SelectItem>
                      <SelectItem value="diesel">Diesel</SelectItem>
                      <SelectItem value="electric">Elektryczny</SelectItem>
                      <SelectItem value="hybrid">Hybryda</SelectItem>
                      <SelectItem value="lpg">LPG</SelectItem>
                      <SelectItem value="cng">CNG</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>
                
                <FilterSection title="Stan" icon={<Car size={16} />}>
                  <RadioGroup
                    value={filters.categorySpecificFilters?.condition || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('condition', value === 'all' ? null : value)}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="condition-all" />
                      <Label htmlFor="condition-all">Wszystkie</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="new" id="condition-new" />
                      <Label htmlFor="condition-new">Nowy</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="used" id="condition-used" />
                      <Label htmlFor="condition-used">Używany</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="damaged" id="condition-damaged" />
                      <Label htmlFor="condition-damaged">Uszkodzony</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="parts" id="condition-parts" />
                      <Label htmlFor="condition-parts">Części</Label>
                    </div>
                  </RadioGroup>
                </FilterSection>
                
                <FilterSection title="Pojemność silnika" icon={<CircleDollarSign size={16} />}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="engine-min">Od</Label>
                      <Input
                        id="engine-min"
                        type="number"
                        min={0}
                        step={0.1}
                        value={filters.categorySpecificFilters?.engineSizeMin || ''}
                        onChange={(e) => handleCategorySpecificFilterChange('engineSizeMin', e.target.value ? parseFloat(e.target.value) : null)}
                        placeholder="0.0 L"
                      />
                    </div>
                    <div>
                      <Label htmlFor="engine-max">Do</Label>
                      <Input
                        id="engine-max"
                        type="number"
                        min={0}
                        step={0.1}
                        value={filters.categorySpecificFilters?.engineSizeMax || ''}
                        onChange={(e) => handleCategorySpecificFilterChange('engineSizeMax', e.target.value ? parseFloat(e.target.value) : null)}
                        placeholder="6.0 L"
                      />
                    </div>
                  </div>
                </FilterSection>
                
                <FilterSection title="Moc silnika" icon={<CircleDollarSign size={16} />}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="power-min">Od</Label>
                      <Input
                        id="power-min"
                        type="number"
                        min={0}
                        value={filters.categorySpecificFilters?.powerMin || ''}
                        onChange={(e) => handleCategorySpecificFilterChange('powerMin', e.target.value ? parseInt(e.target.value) : null)}
                        placeholder="0 KM"
                      />
                    </div>
                    <div>
                      <Label htmlFor="power-max">Do</Label>
                      <Input
                        id="power-max"
                        type="number"
                        min={0}
                        value={filters.categorySpecificFilters?.powerMax || ''}
                        onChange={(e) => handleCategorySpecificFilterChange('powerMax', e.target.value ? parseInt(e.target.value) : null)}
                        placeholder="500 KM"
                      />
                    </div>
                  </div>
                </FilterSection>
                
                <FilterSection title="Skrzynia biegów" icon={<FileSpreadsheet size={16} />}>
                  <RadioGroup
                    value={filters.categorySpecificFilters?.transmission || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('transmission', value === 'all' ? null : value)}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="transmission-all" />
                      <Label htmlFor="transmission-all">Wszystkie</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="manual" id="transmission-manual" />
                      <Label htmlFor="transmission-manual">Manualna</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="automatic" id="transmission-automatic" />
                      <Label htmlFor="transmission-automatic">Automatyczna</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="semi" id="transmission-semi" />
                      <Label htmlFor="transmission-semi">Półautomatyczna</Label>
                    </div>
                  </RadioGroup>
                </FilterSection>
                
                <FilterSection title="Napęd" icon={<FileSpreadsheet size={16} />}>
                  <RadioGroup
                    value={filters.categorySpecificFilters?.drive || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('drive', value === 'all' ? null : value)}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="drive-all" />
                      <Label htmlFor="drive-all">Wszystkie</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fwd" id="drive-fwd" />
                      <Label htmlFor="drive-fwd">Przedni (FWD)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="rwd" id="drive-rwd" />
                      <Label htmlFor="drive-rwd">Tylny (RWD)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="awd" id="drive-awd" />
                      <Label htmlFor="drive-awd">Na wszystkie koła (AWD/4x4)</Label>
                    </div>
                  </RadioGroup>
                </FilterSection>
              </>
            )}
            
            {/* Filtry dla Dom i Ogród */}
            {selectedCategoryName === "Dom i Ogród" && (
              <>
                <FilterSection title="Kategoria" icon={<Sofa size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.homeType || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('homeType', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Wybierz kategorię" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Wszystkie</SelectItem>
                      <SelectItem value="furniture">Meble</SelectItem>
                      <SelectItem value="garden">Ogród</SelectItem>
                      <SelectItem value="construction">Materiały budowlane</SelectItem>
                      <SelectItem value="lighting">Oświetlenie</SelectItem>
                      <SelectItem value="kitchenware">Wyposażenie kuchni</SelectItem>
                      <SelectItem value="bathroom">Wyposażenie łazienki</SelectItem>
                      <SelectItem value="decor">Dekoracje</SelectItem>
                      <SelectItem value="textiles">Tekstylia</SelectItem>
                      <SelectItem value="tools">Narzędzia</SelectItem>
                      <SelectItem value="plants">Rośliny</SelectItem>
                      <SelectItem value="other">Inne</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>
                
                <FilterSection title="Stan" icon={<CircleDollarSign size={16} />}>
                  <RadioGroup
                    value={filters.categorySpecificFilters?.homeCondition || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('homeCondition', value === 'all' ? null : value)}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="home-condition-all" />
                      <Label htmlFor="home-condition-all">Wszystkie</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="new" id="home-condition-new" />
                      <Label htmlFor="home-condition-new">Nowe</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="used" id="home-condition-used" />
                      <Label htmlFor="home-condition-used">Używane</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="refurbished" id="home-condition-refurbished" />
                      <Label htmlFor="home-condition-refurbished">Odnowione</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="damaged" id="home-condition-damaged" />
                      <Label htmlFor="home-condition-damaged">Uszkodzone</Label>
                    </div>
                  </RadioGroup>
                </FilterSection>

                <FilterSection title="Materiał" icon={<FileSpreadsheet size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.material || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('material', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Wybierz materiał" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Wszystkie</SelectItem>
                      <SelectItem value="wood">Drewno</SelectItem>
                      <SelectItem value="metal">Metal</SelectItem>
                      <SelectItem value="plastic">Plastik</SelectItem>
                      <SelectItem value="glass">Szkło</SelectItem>
                      <SelectItem value="fabric">Tkanina</SelectItem>
                      <SelectItem value="leather">Skóra</SelectItem>
                      <SelectItem value="ceramic">Ceramika</SelectItem>
                      <SelectItem value="stone">Kamień</SelectItem>
                      <SelectItem value="composite">Materiał kompozytowy</SelectItem>
                      <SelectItem value="other">Inny</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>
                
                <FilterSection title="Styl" icon={<Sofa size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.style || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('style', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Wybierz styl" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Wszystkie</SelectItem>
                      <SelectItem value="modern">Nowoczesny</SelectItem>
                      <SelectItem value="classic">Klasyczny</SelectItem>
                      <SelectItem value="scandinavian">Skandynawski</SelectItem>
                      <SelectItem value="industrial">Industrialny</SelectItem>
                      <SelectItem value="rustic">Rustykalny</SelectItem>
                      <SelectItem value="vintage">Vintage</SelectItem>
                      <SelectItem value="minimalist">Minimalistyczny</SelectItem>
                      <SelectItem value="other">Inny</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>
                
                <FilterSection title="Zastosowanie" icon={<Home size={16} />}>
                  <RadioGroup
                    value={filters.categorySpecificFilters?.use || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('use', value === 'all' ? null : value)}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="use-all" />
                      <Label htmlFor="use-all">Wszystkie</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="indoor" id="use-indoor" />
                      <Label htmlFor="use-indoor">Wewnętrzne</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="outdoor" id="use-outdoor" />
                      <Label htmlFor="use-outdoor">Zewnętrzne</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="universal" id="use-universal" />
                      <Label htmlFor="use-universal">Uniwersalne</Label>
                    </div>
                  </RadioGroup>
                </FilterSection>
                
                {/* Filtry dla roślin */}
                {filters.categorySpecificFilters?.homeType === 'plants' && (
                  <>
                    <FilterSection title="Rodzaj rośliny" icon={<Flower size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.plantType || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('plantType', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz rodzaj" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="artificial">Sztuczne</SelectItem>
                          <SelectItem value="dried">Suszone</SelectItem>
                          <SelectItem value="stabilized">Stabilizowane</SelectItem>
                          <SelectItem value="decorative">Dekoracje roślinne</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>

                    {/* Filtry dla sztucznych roślin */}
                    {filters.categorySpecificFilters?.plantType === 'artificial' && (
                      <>
                        <FilterSection title="Materiał wykonania" icon={<FileSpreadsheet size={16} />}>
                          <Select
                            value={filters.categorySpecificFilters?.plantMaterial || "all"}
                            onValueChange={(value) => handleCategorySpecificFilterChange('plantMaterial', value === "all" ? null : value)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Wybierz materiał" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Wszystkie</SelectItem>
                              <SelectItem value="plastic">Plastik</SelectItem>
                              <SelectItem value="silk">Tkanina/Jedwab</SelectItem>
                              <SelectItem value="paper">Papier</SelectItem>
                              <SelectItem value="foam">Pianka</SelectItem>
                              <SelectItem value="stone">Kamień</SelectItem>
                              <SelectItem value="ceramic">Ceramika</SelectItem>
                              <SelectItem value="metal">Metal</SelectItem>
                              <SelectItem value="wood">Drewno</SelectItem>
                              <SelectItem value="mixed">Mieszane materiały</SelectItem>
                            </SelectContent>
                          </Select>
                        </FilterSection>

                        <FilterSection title="Wysokość" icon={<Flower size={16} />}>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="height-min">Min (cm)</Label>
                              <Input
                                id="height-min"
                                type="number"
                                min={0}
                                value={filters.categorySpecificFilters?.heightMin || ''}
                                onChange={(e) => handleCategorySpecificFilterChange('heightMin', e.target.value ? parseInt(e.target.value) : null)}
                                placeholder="0"
                              />
                            </div>
                            <div>
                              <Label htmlFor="height-max">Max (cm)</Label>
                              <Input
                                id="height-max"
                                type="number"
                                min={0}
                                value={filters.categorySpecificFilters?.heightMax || ''}
                                onChange={(e) => handleCategorySpecificFilterChange('heightMax', e.target.value ? parseInt(e.target.value) : null)}
                                placeholder="200"
                              />
                            </div>
                          </div>
                        </FilterSection>

                        <FilterSection title="Cechy" icon={<FileSpreadsheet size={16} />}>
                          <div className="space-y-3">
                            <div className="flex items-start space-x-2">
                              <Checkbox 
                                id="plant-feature-pot" 
                                checked={(filters.categorySpecificFilters?.plantFeatures || []).includes("pot")}
                                onCheckedChange={(checked) => {
                                  const currentFeatures = filters.categorySpecificFilters?.plantFeatures || [];
                                  let newFeatures: string[];
                                  
                                  if (checked) {
                                    newFeatures = [...currentFeatures, "pot"];
                                  } else {
                                    newFeatures = currentFeatures.filter((a: string) => a !== "pot");
                                  }
                                  
                                  handleCategorySpecificFilterChange('plantFeatures', newFeatures.length > 0 ? newFeatures : undefined);
                                }}
                              />
                              <Label className="font-medium" htmlFor="plant-feature-pot">Z doniczką</Label>
                            </div>
                            
                            <div className="flex items-start space-x-2">
                              <Checkbox 
                                id="plant-feature-lighted" 
                                checked={(filters.categorySpecificFilters?.plantFeatures || []).includes("lighted")}
                                onCheckedChange={(checked) => {
                                  const currentFeatures = filters.categorySpecificFilters?.plantFeatures || [];
                                  let newFeatures: string[];
                                  
                                  if (checked) {
                                    newFeatures = [...currentFeatures, "lighted"];
                                  } else {
                                    newFeatures = currentFeatures.filter((a: string) => a !== "lighted");
                                  }
                                  
                                  handleCategorySpecificFilterChange('plantFeatures', newFeatures.length > 0 ? newFeatures : undefined);
                                }}
                              />
                              <Label className="font-medium" htmlFor="plant-feature-lighted">Z oświetleniem</Label>
                            </div>

                            <div className="flex items-start space-x-2">
                              <Checkbox 
                                id="plant-feature-uv-resistant" 
                                checked={(filters.categorySpecificFilters?.plantFeatures || []).includes("uv-resistant")}
                                onCheckedChange={(checked) => {
                                  const currentFeatures = filters.categorySpecificFilters?.plantFeatures || [];
                                  let newFeatures: string[];
                                  
                                  if (checked) {
                                    newFeatures = [...currentFeatures, "uv-resistant"];
                                  } else {
                                    newFeatures = currentFeatures.filter((a: string) => a !== "uv-resistant");
                                  }
                                  
                                  handleCategorySpecificFilterChange('plantFeatures', newFeatures.length > 0 ? newFeatures : undefined);
                                }}
                              />
                              <Label className="font-medium" htmlFor="plant-feature-uv-resistant">Odporna na UV</Label>
                            </div>
                          </div>
                        </FilterSection>
                      </>
                    )}
                  </>
                )}
              </>
            )}
            
            {/* Filtry dla Moda */}
            {selectedCategoryName === "Moda" && (
              <>
                <FilterSection title="Kategoria" icon={<Shirt size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.fashionType || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('fashionType', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Wybierz kategorię" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Wszystkie</SelectItem>
                      <SelectItem value="clothing">Odzież</SelectItem>
                      <SelectItem value="shoes">Obuwie</SelectItem>
                      <SelectItem value="accessories">Akcesoria</SelectItem>
                      <SelectItem value="bags">Torby</SelectItem>
                      <SelectItem value="jewelry">Biżuteria</SelectItem>
                      <SelectItem value="watches">Zegarki</SelectItem>
                      <SelectItem value="cosmetics">Kosmetyki</SelectItem>
                      <SelectItem value="perfumes">Perfumy</SelectItem>
                      <SelectItem value="other">Inne</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>
                
                <FilterSection title="Dla kogo" icon={<User size={16} />}>
                  <RadioGroup
                    value={filters.categorySpecificFilters?.gender || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('gender', value === 'all' ? null : value)}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="gender-all" />
                      <Label htmlFor="gender-all">Wszystkie</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="women" id="gender-women" />
                      <Label htmlFor="gender-women">Damskie</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="men" id="gender-men" />
                      <Label htmlFor="gender-men">Męskie</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="children" id="gender-children" />
                      <Label htmlFor="gender-children">Dziecięce</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="unisex" id="gender-unisex" />
                      <Label htmlFor="gender-unisex">Unisex</Label>
                    </div>
                  </RadioGroup>
                </FilterSection>
                
                <FilterSection title="Rozmiar" icon={<Shirt size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.size || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('size', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Wybierz rozmiar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Wszystkie</SelectItem>
                      <SelectItem value="xs">XS</SelectItem>
                      <SelectItem value="s">S</SelectItem>
                      <SelectItem value="m">M</SelectItem>
                      <SelectItem value="l">L</SelectItem>
                      <SelectItem value="xl">XL</SelectItem>
                      <SelectItem value="xxl">XXL</SelectItem>
                      <SelectItem value="xxxl">3XL</SelectItem>
                      <SelectItem value="4xl">4XL</SelectItem>
                      <SelectItem value="5xl">5XL</SelectItem>
                      <SelectItem value="other">Inny</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>
                
                <FilterSection title="Rozmiar obuwia" icon={<Shirt size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.shoeSize || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('shoeSize', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Wybierz rozmiar obuwia" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Wszystkie</SelectItem>
                      <SelectItem value="35">35</SelectItem>
                      <SelectItem value="36">36</SelectItem>
                      <SelectItem value="37">37</SelectItem>
                      <SelectItem value="38">38</SelectItem>
                      <SelectItem value="39">39</SelectItem>
                      <SelectItem value="40">40</SelectItem>
                      <SelectItem value="41">41</SelectItem>
                      <SelectItem value="42">42</SelectItem>
                      <SelectItem value="43">43</SelectItem>
                      <SelectItem value="44">44</SelectItem>
                      <SelectItem value="45">45</SelectItem>
                      <SelectItem value="46">46</SelectItem>
                      <SelectItem value="47">47</SelectItem>
                      <SelectItem value="48">48</SelectItem>
                      <SelectItem value="other">Inny</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>
                
                <FilterSection title="Stan" icon={<CircleDollarSign size={16} />}>
                  <RadioGroup
                    value={filters.categorySpecificFilters?.fashionCondition || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('fashionCondition', value === 'all' ? null : value)}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="fashion-condition-all" />
                      <Label htmlFor="fashion-condition-all">Wszystkie</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="new" id="fashion-condition-new" />
                      <Label htmlFor="fashion-condition-new">Nowe</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="newWithTags" id="fashion-condition-new-tags" />
                      <Label htmlFor="fashion-condition-new-tags">Nowe z metkami</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="veryGood" id="fashion-condition-very-good" />
                      <Label htmlFor="fashion-condition-very-good">Bardzo dobry</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="good" id="fashion-condition-good" />
                      <Label htmlFor="fashion-condition-good">Dobry</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="acceptable" id="fashion-condition-acceptable" />
                      <Label htmlFor="fashion-condition-acceptable">Zadowalający</Label>
                    </div>
                  </RadioGroup>
                </FilterSection>
                
                <FilterSection title="Marka" icon={<Bookmark size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.fashionBrand || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('fashionBrand', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Wybierz markę" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Wszystkie</SelectItem>
                      <SelectItem value="adidas">Adidas</SelectItem>
                      <SelectItem value="nike">Nike</SelectItem>
                      <SelectItem value="puma">Puma</SelectItem>
                      <SelectItem value="reebok">Reebok</SelectItem>
                      <SelectItem value="new_balance">New Balance</SelectItem>
                      <SelectItem value="levis">Levi's</SelectItem>
                      <SelectItem value="wrangler">Wrangler</SelectItem>
                      <SelectItem value="tommy_hilfiger">Tommy Hilfiger</SelectItem>
                      <SelectItem value="calvin_klein">Calvin Klein</SelectItem>
                      <SelectItem value="gucci">Gucci</SelectItem>
                      <SelectItem value="armani">Armani</SelectItem>
                      <SelectItem value="hugo_boss">Hugo Boss</SelectItem>
                      <SelectItem value="zara">Zara</SelectItem>
                      <SelectItem value="hm">H&M</SelectItem>
                      <SelectItem value="reserved">Reserved</SelectItem>
                      <SelectItem value="other">Inna</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>
                
                <FilterSection title="Kolor" icon={<FileSpreadsheet size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.color || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('color', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Wybierz kolor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Wszystkie</SelectItem>
                      <SelectItem value="black">Czarny</SelectItem>
                      <SelectItem value="white">Biały</SelectItem>
                      <SelectItem value="gray">Szary</SelectItem>
                      <SelectItem value="red">Czerwony</SelectItem>
                      <SelectItem value="blue">Niebieski</SelectItem>
                      <SelectItem value="green">Zielony</SelectItem>
                      <SelectItem value="yellow">Żółty</SelectItem>
                      <SelectItem value="brown">Brązowy</SelectItem>
                      <SelectItem value="pink">Różowy</SelectItem>
                      <SelectItem value="purple">Fioletowy</SelectItem>
                      <SelectItem value="orange">Pomarańczowy</SelectItem>
                      <SelectItem value="multicolor">Wielokolorowy</SelectItem>
                      <SelectItem value="other">Inny</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>
                
                <FilterSection title="Materiał" icon={<FileSpreadsheet size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.material || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('material', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Wybierz materiał" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Wszystkie</SelectItem>
                      <SelectItem value="cotton">Bawełna</SelectItem>
                      <SelectItem value="polyester">Poliester</SelectItem>
                      <SelectItem value="wool">Wełna</SelectItem>
                      <SelectItem value="leather">Skóra</SelectItem>
                      <SelectItem value="silk">Jedwab</SelectItem>
                      <SelectItem value="denim">Denim/Jeans</SelectItem>
                      <SelectItem value="linen">Len</SelectItem>
                      <SelectItem value="suede">Zamsz</SelectItem>
                      <SelectItem value="synthetic">Materiały syntetyczne</SelectItem>
                      <SelectItem value="mixed">Mieszanka materiałów</SelectItem>
                      <SelectItem value="other">Inny</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>
              </>
            )}

            {/* Filtry dla Elektronika */}
            {selectedCategoryName === "Elektronika" && (
              <>
                <FilterSection title="Typ urządzenia" icon={<Smartphone size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.deviceType || "all"}
                    onValueChange={(value) => {
                      // Resetuj filtry specyficzne dla urządzenia przy zmianie typu
                      const updatedFilters = { ...filters.categorySpecificFilters };
                      // Usuń filtry, które nie są uniwersalne
                      delete updatedFilters.ram;
                      delete updatedFilters.storage;
                      delete updatedFilters.os;
                      delete updatedFilters.resolution;
                      delete updatedFilters.processorType;
                      delete updatedFilters.graphicsCard;
                      delete updatedFilters.displayType;
                      delete updatedFilters.refreshRate;
                      delete updatedFilters.cameraResolution;
                      delete updatedFilters.batteryCapacity;
                      delete updatedFilters.screenSize;
                      
                      // Ustaw nowy typ urządzenia
                      handleCategorySpecificFilterChange('deviceType', value === "all" ? null : value);
                      
                      // Ustaw zaktualizowane filtry
                      setFilters(prev => ({
                        ...prev,
                        categorySpecificFilters: {
                          ...updatedFilters,
                          deviceType: value === "all" ? null : value
                        }
                      }));
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Wybierz typ urządzenia" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Wszystkie</SelectItem>
                      <SelectItem value="smartphones">Smartfony</SelectItem>
                      <SelectItem value="laptops">Laptopy</SelectItem>
                      <SelectItem value="tablets">Tablety</SelectItem>
                      <SelectItem value="desktops">Komputery stacjonarne</SelectItem>
                      <SelectItem value="tvs">Telewizory</SelectItem>
                      <SelectItem value="monitors">Monitory</SelectItem>
                      <SelectItem value="audio">Sprzęt audio</SelectItem>
                      <SelectItem value="cameras">Aparaty/Kamery</SelectItem>
                      <SelectItem value="gaming">Konsole i gry</SelectItem>
                      <SelectItem value="network">Sprzęt sieciowy</SelectItem>
                      <SelectItem value="printers">Drukarki i skanery</SelectItem>
                      <SelectItem value="components">Podzespoły komputerowe</SelectItem>
                      <SelectItem value="processors">Procesory</SelectItem>
                      <SelectItem value="graphics_cards">Karty graficzne</SelectItem>
                      <SelectItem value="storage_drives">Dyski</SelectItem>
                      <SelectItem value="memory">Pamięć RAM</SelectItem>
                      <SelectItem value="accessories">Akcesoria</SelectItem>
                      <SelectItem value="smartwatches">Smartwatche</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>
                
                <FilterSection title="Marka" icon={<Bookmark size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.brand || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('brand', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Wybierz markę" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Wszystkie</SelectItem>
                      {/* Dynamiczne marki w zależności od typu urządzenia */}
                      {(['all', 'smartphones', 'tablets'].includes(filters.categorySpecificFilters?.deviceType || 'all')) && (
                        <>
                          <SelectItem value="apple">Apple</SelectItem>
                          <SelectItem value="samsung">Samsung</SelectItem>
                          <SelectItem value="xiaomi">Xiaomi</SelectItem>
                          <SelectItem value="huawei">Huawei</SelectItem>
                          <SelectItem value="motorola">Motorola</SelectItem>
                          <SelectItem value="google">Google</SelectItem>
                          <SelectItem value="oppo">OPPO</SelectItem>
                          <SelectItem value="realme">realme</SelectItem>
                          <SelectItem value="vivo">vivo</SelectItem>
                          <SelectItem value="nokia">Nokia</SelectItem>
                        </>
                      )}
                      
                      {(['all', 'laptops', 'desktops', 'components', 'processors', 'graphics_cards', 'memory'].includes(filters.categorySpecificFilters?.deviceType || 'all')) && (
                        <>
                          <SelectItem value="lenovo">Lenovo</SelectItem>
                          <SelectItem value="hp">HP</SelectItem>
                          <SelectItem value="dell">Dell</SelectItem>
                          <SelectItem value="asus">ASUS</SelectItem>
                          <SelectItem value="acer">Acer</SelectItem>
                          <SelectItem value="msi">MSI</SelectItem>
                          <SelectItem value="apple">Apple</SelectItem>
                          <SelectItem value="huawei">Huawei</SelectItem>
                          <SelectItem value="microsoft">Microsoft</SelectItem>
                          <SelectItem value="gigabyte">Gigabyte</SelectItem>
                          <SelectItem value="intel">Intel</SelectItem>
                          <SelectItem value="amd">AMD</SelectItem>
                          <SelectItem value="nvidia">NVIDIA</SelectItem>
                        </>
                      )}
                      
                      {(['all', 'tvs', 'monitors'].includes(filters.categorySpecificFilters?.deviceType || 'all')) && (
                        <>
                          <SelectItem value="samsung">Samsung</SelectItem>
                          <SelectItem value="lg">LG</SelectItem>
                          <SelectItem value="sony">Sony</SelectItem>
                          <SelectItem value="philips">Philips</SelectItem>
                          <SelectItem value="panasonic">Panasonic</SelectItem>
                          <SelectItem value="hisense">Hisense</SelectItem>
                          <SelectItem value="tcl">TCL</SelectItem>
                          <SelectItem value="toshiba">Toshiba</SelectItem>
                          <SelectItem value="dell">Dell</SelectItem>
                          <SelectItem value="asus">ASUS</SelectItem>
                          <SelectItem value="acer">Acer</SelectItem>
                          <SelectItem value="msi">MSI</SelectItem>
                          <SelectItem value="aoc">AOC</SelectItem>
                          <SelectItem value="benq">BenQ</SelectItem>
                        </>
                      )}
                      
                      {(['all', 'audio'].includes(filters.categorySpecificFilters?.deviceType || 'all')) && (
                        <>
                          <SelectItem value="sony">Sony</SelectItem>
                          <SelectItem value="bose">Bose</SelectItem>
                          <SelectItem value="jbl">JBL</SelectItem>
                          <SelectItem value="sennheiser">Sennheiser</SelectItem>
                          <SelectItem value="audio-technica">Audio-Technica</SelectItem>
                          <SelectItem value="samsung">Samsung</SelectItem>
                          <SelectItem value="apple">Apple</SelectItem>
                          <SelectItem value="lg">LG</SelectItem>
                          <SelectItem value="yamaha">Yamaha</SelectItem>
                          <SelectItem value="denon">Denon</SelectItem>
                          <SelectItem value="pioneer">Pioneer</SelectItem>
                        </>
                      )}
                      
                      {(['all', 'cameras'].includes(filters.categorySpecificFilters?.deviceType || 'all')) && (
                        <>
                          <SelectItem value="canon">Canon</SelectItem>
                          <SelectItem value="nikon">Nikon</SelectItem>
                          <SelectItem value="sony">Sony</SelectItem>
                          <SelectItem value="fujifilm">Fujifilm</SelectItem>
                          <SelectItem value="panasonic">Panasonic</SelectItem>
                          <SelectItem value="olympus">Olympus</SelectItem>
                          <SelectItem value="gopro">GoPro</SelectItem>
                          <SelectItem value="dji">DJI</SelectItem>
                        </>
                      )}
                      
                      <SelectItem value="other">Inne</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>
                
                <FilterSection title="Stan" icon={<CircleDollarSign size={16} />}>
                  <RadioGroup
                    value={filters.categorySpecificFilters?.elCondition || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('elCondition', value === 'all' ? null : value)}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="el-condition-all" />
                      <Label htmlFor="el-condition-all">Wszystkie</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="new" id="el-condition-new" />
                      <Label htmlFor="el-condition-new">Nowy</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="used" id="el-condition-used" />
                      <Label htmlFor="el-condition-used">Używany</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="damaged" id="el-condition-damaged" />
                      <Label htmlFor="el-condition-damaged">Uszkodzony</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="refurbished" id="el-condition-refurbished" />
                      <Label htmlFor="el-condition-refurbished">Odnowiony</Label>
                    </div>
                  </RadioGroup>
                </FilterSection>
                
                <FilterSection title="Gwarancja" icon={<FileSpreadsheet size={16} />}>
                  <RadioGroup
                    value={filters.categorySpecificFilters?.warranty || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('warranty', value === 'all' ? null : value)}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="warranty-all" />
                      <Label htmlFor="warranty-all">Wszystkie</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="warranty-yes" />
                      <Label htmlFor="warranty-yes">Z gwarancją</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="warranty-no" />
                      <Label htmlFor="warranty-no">Bez gwarancji</Label>
                    </div>
                  </RadioGroup>
                </FilterSection>
                
                {/* Filtry specyficzne dla typu urządzenia */}
                {/* Smartfony */}
                {(['smartphones'].includes(filters.categorySpecificFilters?.deviceType || '')) && (
                  <>
                    <FilterSection title="Pamięć RAM" icon={<FileSpreadsheet size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.ram || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('ram', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz ilość RAM" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="1gb">1 GB</SelectItem>
                          <SelectItem value="2gb">2 GB</SelectItem>
                          <SelectItem value="3gb">3 GB</SelectItem>
                          <SelectItem value="4gb">4 GB</SelectItem>
                          <SelectItem value="6gb">6 GB</SelectItem>
                          <SelectItem value="8gb">8 GB</SelectItem>
                          <SelectItem value="12gb">12 GB</SelectItem>
                          <SelectItem value="16gb">16 GB</SelectItem>
                          <SelectItem value="more">Więcej</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>
                    
                    <FilterSection title="Pamięć wewnętrzna" icon={<FileSpreadsheet size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.storage || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('storage', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz rozmiar pamięci" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="16gb">16 GB</SelectItem>
                          <SelectItem value="32gb">32 GB</SelectItem>
                          <SelectItem value="64gb">64 GB</SelectItem>
                          <SelectItem value="128gb">128 GB</SelectItem>
                          <SelectItem value="256gb">256 GB</SelectItem>
                          <SelectItem value="512gb">512 GB</SelectItem>
                          <SelectItem value="1tb">1 TB</SelectItem>
                          <SelectItem value="more">Więcej</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>
                    
                    <FilterSection title="System operacyjny" icon={<FileSpreadsheet size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.os || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('os', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz system" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="android">Android</SelectItem>
                          <SelectItem value="ios">iOS</SelectItem>
                          <SelectItem value="other">Inny</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>
                    
                    <FilterSection title="Przekątna ekranu" icon={<Smartphone size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.screenSize || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('screenSize', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz przekątną" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="below5">Poniżej 5"</SelectItem>
                          <SelectItem value="5to5_5">5" - 5.5"</SelectItem>
                          <SelectItem value="5_5to6">5.5" - 6"</SelectItem>
                          <SelectItem value="6to6_5">6" - 6.5"</SelectItem>
                          <SelectItem value="6_5to7">6.5" - 7"</SelectItem>
                          <SelectItem value="above7">Powyżej 7"</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>
                    
                    <FilterSection title="Aparat" icon={<FileSpreadsheet size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.cameraResolution || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('cameraResolution', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Rozdzielczość aparatu" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="upto12mp">Do 12 MP</SelectItem>
                          <SelectItem value="12to20mp">12 - 20 MP</SelectItem>
                          <SelectItem value="20to50mp">20 - 50 MP</SelectItem>
                          <SelectItem value="50to100mp">50 - 100 MP</SelectItem>
                          <SelectItem value="above100mp">Powyżej 100 MP</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>

                    <FilterSection title="Bateria" icon={<FileSpreadsheet size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.batteryCapacity || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('batteryCapacity', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pojemność baterii" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="below3000">Poniżej 3000 mAh</SelectItem>
                          <SelectItem value="3000to4000">3000 - 4000 mAh</SelectItem>
                          <SelectItem value="4000to5000">4000 - 5000 mAh</SelectItem>
                          <SelectItem value="above5000">Powyżej 5000 mAh</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>

                    <FilterSection title="Czytnik linii papilarnych" icon={<FileSpreadsheet size={16} />}>
                      <RadioGroup
                        value={filters.categorySpecificFilters?.fingerprint || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('fingerprint', value === 'all' ? null : value)}
                        className="space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="all" id="fingerprint-all" />
                          <Label htmlFor="fingerprint-all">Wszystkie</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="fingerprint-yes" />
                          <Label htmlFor="fingerprint-yes">Z czytnikiem</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="fingerprint-no" />
                          <Label htmlFor="fingerprint-no">Bez czytnika</Label>
                        </div>
                      </RadioGroup>
                    </FilterSection>
                  </>
                )}

                {/* Tablety */}
                {(['tablets'].includes(filters.categorySpecificFilters?.deviceType || '')) && (
                  <>
                    <FilterSection title="Pamięć RAM" icon={<FileSpreadsheet size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.ram || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('ram', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz ilość RAM" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="2gb">2 GB</SelectItem>
                          <SelectItem value="3gb">3 GB</SelectItem>
                          <SelectItem value="4gb">4 GB</SelectItem>
                          <SelectItem value="6gb">6 GB</SelectItem>
                          <SelectItem value="8gb">8 GB</SelectItem>
                          <SelectItem value="12gb">12 GB</SelectItem>
                          <SelectItem value="16gb">16 GB</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>
                    
                    <FilterSection title="Pamięć wewnętrzna" icon={<FileSpreadsheet size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.storage || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('storage', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz rozmiar pamięci" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="16gb">16 GB</SelectItem>
                          <SelectItem value="32gb">32 GB</SelectItem>
                          <SelectItem value="64gb">64 GB</SelectItem>
                          <SelectItem value="128gb">128 GB</SelectItem>
                          <SelectItem value="256gb">256 GB</SelectItem>
                          <SelectItem value="512gb">512 GB</SelectItem>
                          <SelectItem value="1tb">1 TB</SelectItem>
                          <SelectItem value="more">Więcej</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>
                    
                    <FilterSection title="System operacyjny" icon={<FileSpreadsheet size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.os || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('os', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz system" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="android">Android</SelectItem>
                          <SelectItem value="ios">iPadOS</SelectItem>
                          <SelectItem value="windows">Windows</SelectItem>
                          <SelectItem value="other">Inny</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>
                    
                    <FilterSection title="Przekątna ekranu" icon={<Smartphone size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.screenSize || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('screenSize', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz przekątną" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="7to8">7" - 8"</SelectItem>
                          <SelectItem value="8to9">8" - 9"</SelectItem>
                          <SelectItem value="9to10">9" - 10"</SelectItem>
                          <SelectItem value="10to11">10" - 11"</SelectItem>
                          <SelectItem value="11to12">11" - 12"</SelectItem>
                          <SelectItem value="12to13">12" - 13"</SelectItem>
                          <SelectItem value="above13">Powyżej 13"</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>
                    
                    <FilterSection title="Łączność" icon={<FileSpreadsheet size={16} />}>
                      <RadioGroup
                        value={filters.categorySpecificFilters?.connectivity || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('connectivity', value === 'all' ? null : value)}
                        className="space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="all" id="connectivity-all" />
                          <Label htmlFor="connectivity-all">Wszystkie</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="wifi" id="connectivity-wifi" />
                          <Label htmlFor="connectivity-wifi">Tylko Wi-Fi</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="wifi_lte" id="connectivity-wifi-lte" />
                          <Label htmlFor="connectivity-wifi-lte">Wi-Fi + LTE/5G</Label>
                        </div>
                      </RadioGroup>
                    </FilterSection>
                  </>
                )}

                {/* Smartwatche */}
                {(['smartwatches'].includes(filters.categorySpecificFilters?.deviceType || '')) && (
                  <>
                    <FilterSection title="System operacyjny" icon={<FileSpreadsheet size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.os || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('os', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz system" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="watchos">watchOS</SelectItem>
                          <SelectItem value="wearos">Wear OS</SelectItem>
                          <SelectItem value="tizen">Tizen</SelectItem>
                          <SelectItem value="huawei">HarmonyOS</SelectItem>
                          <SelectItem value="proprietary">Własny system</SelectItem>
                          <SelectItem value="other">Inny</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>
                    
                    <FilterSection title="Przekątna ekranu" icon={<Smartphone size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.screenSize || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('screenSize', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz przekątną" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="below1_5">Poniżej 1.5"</SelectItem>
                          <SelectItem value="1_5to1_7">1.5" - 1.7"</SelectItem>
                          <SelectItem value="1_7to2">1.7" - 2.0"</SelectItem>
                          <SelectItem value="above2">Powyżej 2.0"</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>

                    <FilterSection title="Kształt koperty" icon={<FileSpreadsheet size={16} />}>
                      <RadioGroup
                        value={filters.categorySpecificFilters?.watchShape || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('watchShape', value === 'all' ? null : value)}
                        className="space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="all" id="shape-all" />
                          <Label htmlFor="shape-all">Wszystkie</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="round" id="shape-round" />
                          <Label htmlFor="shape-round">Okrągła</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="square" id="shape-square" />
                          <Label htmlFor="shape-square">Kwadratowa</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="rectangular" id="shape-rectangular" />
                          <Label htmlFor="shape-rectangular">Prostokątna</Label>
                        </div>
                      </RadioGroup>
                    </FilterSection>

                    <FilterSection title="Materiał paska" icon={<FileSpreadsheet size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.strapMaterial || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('strapMaterial', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz materiał" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="silicone">Silikon</SelectItem>
                          <SelectItem value="leather">Skóra</SelectItem>
                          <SelectItem value="metal">Metal</SelectItem>
                          <SelectItem value="fabric">Tkanina</SelectItem>
                          <SelectItem value="other">Inny</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>

                    <FilterSection title="Funkcje" icon={<FileSpreadsheet size={16} />}>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-2">
                          <Checkbox 
                            id="feature-heartrate" 
                            checked={(filters.categorySpecificFilters?.features || []).includes("heartrate")}
                            onCheckedChange={(checked) => {
                              const currentFeatures = filters.categorySpecificFilters?.features || [];
                              let newFeatures: string[];
                              
                              if (checked) {
                                newFeatures = [...currentFeatures, "heartrate"];
                              } else {
                                newFeatures = currentFeatures.filter((a: string) => a !== "heartrate");
                              }
                              
                              handleCategorySpecificFilterChange('features', newFeatures.length > 0 ? newFeatures : undefined);
                            }}
                          />
                          <Label className="font-medium" htmlFor="feature-heartrate">Pulsometr</Label>
                        </div>
                        
                        <div className="flex items-start space-x-2">
                          <Checkbox 
                            id="feature-gps" 
                            checked={(filters.categorySpecificFilters?.features || []).includes("gps")}
                            onCheckedChange={(checked) => {
                              const currentFeatures = filters.categorySpecificFilters?.features || [];
                              let newFeatures: string[];
                              
                              if (checked) {
                                newFeatures = [...currentFeatures, "gps"];
                              } else {
                                newFeatures = currentFeatures.filter((a: string) => a !== "gps");
                              }
                              
                              handleCategorySpecificFilterChange('features', newFeatures.length > 0 ? newFeatures : undefined);
                            }}
                          />
                          <Label className="font-medium" htmlFor="feature-gps">GPS</Label>
                        </div>
                        
                        <div className="flex items-start space-x-2">
                          <Checkbox 
                            id="feature-nfc" 
                            checked={(filters.categorySpecificFilters?.features || []).includes("nfc")}
                            onCheckedChange={(checked) => {
                              const currentFeatures = filters.categorySpecificFilters?.features || [];
                              let newFeatures: string[];
                              
                              if (checked) {
                                newFeatures = [...currentFeatures, "nfc"];
                              } else {
                                newFeatures = currentFeatures.filter((a: string) => a !== "nfc");
                              }
                              
                              handleCategorySpecificFilterChange('features', newFeatures.length > 0 ? newFeatures : undefined);
                            }}
                          />
                          <Label className="font-medium" htmlFor="feature-nfc">NFC (płatności)</Label>
                        </div>
                        
                        <div className="flex items-start space-x-2">
                          <Checkbox 
                            id="feature-waterproof" 
                            checked={(filters.categorySpecificFilters?.features || []).includes("waterproof")}
                            onCheckedChange={(checked) => {
                              const currentFeatures = filters.categorySpecificFilters?.features || [];
                              let newFeatures: string[];
                              
                              if (checked) {
                                newFeatures = [...currentFeatures, "waterproof"];
                              } else {
                                newFeatures = currentFeatures.filter((a: string) => a !== "waterproof");
                              }
                              
                              handleCategorySpecificFilterChange('features', newFeatures.length > 0 ? newFeatures : undefined);
                            }}
                          />
                          <Label className="font-medium" htmlFor="feature-waterproof">Wodoodporność</Label>
                        </div>
                      </div>
                    </FilterSection>
                  </>
                )}
                
                {(['laptops', 'desktops'].includes(filters.categorySpecificFilters?.deviceType || '')) && (
                  <>
                    <FilterSection title="Procesor" icon={<FileSpreadsheet size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.processorType || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('processorType', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz procesor" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="intel_i3">Intel Core i3</SelectItem>
                          <SelectItem value="intel_i5">Intel Core i5</SelectItem>
                          <SelectItem value="intel_i7">Intel Core i7</SelectItem>
                          <SelectItem value="intel_i9">Intel Core i9</SelectItem>
                          <SelectItem value="amd_ryzen3">AMD Ryzen 3</SelectItem>
                          <SelectItem value="amd_ryzen5">AMD Ryzen 5</SelectItem>
                          <SelectItem value="amd_ryzen7">AMD Ryzen 7</SelectItem>
                          <SelectItem value="amd_ryzen9">AMD Ryzen 9</SelectItem>
                          <SelectItem value="apple_m1">Apple M1</SelectItem>
                          <SelectItem value="apple_m2">Apple M2</SelectItem>
                          <SelectItem value="apple_m3">Apple M3</SelectItem>
                          <SelectItem value="other">Inny</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>
                    
                    <FilterSection title="Pamięć RAM" icon={<FileSpreadsheet size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.ram || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('ram', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz ilość RAM" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="4gb">4 GB</SelectItem>
                          <SelectItem value="8gb">8 GB</SelectItem>
                          <SelectItem value="16gb">16 GB</SelectItem>
                          <SelectItem value="32gb">32 GB</SelectItem>
                          <SelectItem value="64gb">64 GB</SelectItem>
                          <SelectItem value="128gb">128 GB</SelectItem>
                          <SelectItem value="more">Więcej</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>
                    
                    <FilterSection title="Dysk" icon={<FileSpreadsheet size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.storage || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('storage', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz rozmiar dysku" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="128gb">128 GB</SelectItem>
                          <SelectItem value="256gb">256 GB</SelectItem>
                          <SelectItem value="512gb">512 GB</SelectItem>
                          <SelectItem value="1tb">1 TB</SelectItem>
                          <SelectItem value="2tb">2 TB</SelectItem>
                          <SelectItem value="more">Więcej</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>
                    
                    <FilterSection title="Karta graficzna" icon={<FileSpreadsheet size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.graphicsCard || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('graphicsCard', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz kartę graficzną" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="integrated">Zintegrowana</SelectItem>
                          <SelectItem value="nvidia_gtx">NVIDIA GeForce GTX</SelectItem>
                          <SelectItem value="nvidia_rtx">NVIDIA GeForce RTX</SelectItem>
                          <SelectItem value="amd_radeon">AMD Radeon</SelectItem>
                          <SelectItem value="apple">Apple</SelectItem>
                          <SelectItem value="other">Inna</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>
                    
                    <FilterSection title="System operacyjny" icon={<FileSpreadsheet size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.os || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('os', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz system" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="windows">Windows</SelectItem>
                          <SelectItem value="macos">macOS</SelectItem>
                          <SelectItem value="linux">Linux</SelectItem>
                          <SelectItem value="chrome_os">Chrome OS</SelectItem>
                          <SelectItem value="other">Inny</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>
                  </>
                )}
                
                {(['tvs', 'monitors'].includes(filters.categorySpecificFilters?.deviceType || '')) && (
                  <>
                    <FilterSection title="Przekątna ekranu" icon={<FileSpreadsheet size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.screenSize || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('screenSize', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz przekątną" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="below22">Poniżej 22"</SelectItem>
                          <SelectItem value="22to24">22" - 24"</SelectItem>
                          <SelectItem value="24to27">24" - 27"</SelectItem>
                          <SelectItem value="27to32">27" - 32"</SelectItem>
                          <SelectItem value="32to40">32" - 40"</SelectItem>
                          <SelectItem value="40to50">40" - 50"</SelectItem>
                          <SelectItem value="50to60">50" - 60"</SelectItem>
                          <SelectItem value="60to70">60" - 70"</SelectItem>
                          <SelectItem value="above70">Powyżej 70"</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>
                    
                    <FilterSection title="Rozdzielczość" icon={<FileSpreadsheet size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.resolution || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('resolution', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz rozdzielczość" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="hd">HD (1280x720)</SelectItem>
                          <SelectItem value="fullhd">Full HD (1920x1080)</SelectItem>
                          <SelectItem value="2k">2K (2560x1440)</SelectItem>
                          <SelectItem value="4k">4K (3840x2160)</SelectItem>
                          <SelectItem value="8k">8K (7680x4320)</SelectItem>
                          <SelectItem value="other">Inna</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>
                    
                    <FilterSection title="Częstotliwość odświeżania" icon={<Clock size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.refreshRate || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('refreshRate', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz odświeżanie" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="60">60 Hz</SelectItem>
                          <SelectItem value="75">75 Hz</SelectItem>
                          <SelectItem value="100">100 Hz</SelectItem>
                          <SelectItem value="120">120 Hz</SelectItem>
                          <SelectItem value="144">144 Hz</SelectItem>
                          <SelectItem value="165">165 Hz</SelectItem>
                          <SelectItem value="240">240 Hz</SelectItem>
                          <SelectItem value="above240">Powyżej 240 Hz</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>
                    
                    <FilterSection title="Typ matrycy" icon={<FileSpreadsheet size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.displayType || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('displayType', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz typ matrycy" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="ips">IPS</SelectItem>
                          <SelectItem value="va">VA</SelectItem>
                          <SelectItem value="tn">TN</SelectItem>
                          <SelectItem value="oled">OLED</SelectItem>
                          <SelectItem value="qled">QLED</SelectItem>
                          <SelectItem value="microled">MicroLED</SelectItem>
                          <SelectItem value="miniledlcd">Mini LED LCD</SelectItem>
                          <SelectItem value="other">Inna</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>
                  </>
                )}
                
                {/* Filtry dla podzespołów komputerowych */}
                {['processors'].includes(filters.categorySpecificFilters?.deviceType || '') && (
                  <>
                    <FilterSection title="Seria procesora" icon={<FileSpreadsheet size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.processorSeries || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('processorSeries', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz serię" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="intel_core">Intel Core</SelectItem>
                          <SelectItem value="intel_xeon">Intel Xeon</SelectItem>
                          <SelectItem value="intel_pentium">Intel Pentium</SelectItem>
                          <SelectItem value="intel_celeron">Intel Celeron</SelectItem>
                          <SelectItem value="amd_ryzen">AMD Ryzen</SelectItem>
                          <SelectItem value="amd_threadripper">AMD Threadripper</SelectItem>
                          <SelectItem value="amd_athlon">AMD Athlon</SelectItem>
                          <SelectItem value="other">Inna</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>
                    
                    <FilterSection title="Liczba rdzeni" icon={<FileSpreadsheet size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.cores || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('cores', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz liczbę rdzeni" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="2">2-rdzeniowy</SelectItem>
                          <SelectItem value="4">4-rdzeniowy</SelectItem>
                          <SelectItem value="6">6-rdzeniowy</SelectItem>
                          <SelectItem value="8">8-rdzeniowy</SelectItem>
                          <SelectItem value="10">10-rdzeniowy</SelectItem>
                          <SelectItem value="12">12-rdzeniowy</SelectItem>
                          <SelectItem value="16">16-rdzeniowy</SelectItem>
                          <SelectItem value="more">Więcej rdzeni</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>
                  </>
                )}
                
                {['graphics_cards'].includes(filters.categorySpecificFilters?.deviceType || '') && (
                  <>
                    <FilterSection title="Chipset" icon={<FileSpreadsheet size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.gpuChipset || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('gpuChipset', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz chipset" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="nvidia_rtx4090">NVIDIA RTX 4090</SelectItem>
                          <SelectItem value="nvidia_rtx4080">NVIDIA RTX 4080</SelectItem>
                          <SelectItem value="nvidia_rtx4070">NVIDIA RTX 4070</SelectItem>
                          <SelectItem value="nvidia_rtx4060">NVIDIA RTX 4060</SelectItem>
                          <SelectItem value="nvidia_rtx3090">NVIDIA RTX 3090</SelectItem>
                          <SelectItem value="nvidia_rtx3080">NVIDIA RTX 3080</SelectItem>
                          <SelectItem value="nvidia_rtx3070">NVIDIA RTX 3070</SelectItem>
                          <SelectItem value="nvidia_rtx3060">NVIDIA RTX 3060</SelectItem>
                          <SelectItem value="amd_rx7900">AMD RX 7900</SelectItem>
                          <SelectItem value="amd_rx7800">AMD RX 7800</SelectItem>
                          <SelectItem value="amd_rx7700">AMD RX 7700</SelectItem>
                          <SelectItem value="amd_rx7600">AMD RX 7600</SelectItem>
                          <SelectItem value="amd_rx6900">AMD RX 6900</SelectItem>
                          <SelectItem value="amd_rx6800">AMD RX 6800</SelectItem>
                          <SelectItem value="amd_rx6700">AMD RX 6700</SelectItem>
                          <SelectItem value="amd_rx6600">AMD RX 6600</SelectItem>
                          <SelectItem value="other">Inny</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>
                    
                    <FilterSection title="Pamięć VRAM" icon={<FileSpreadsheet size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.vram || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('vram', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz pamięć VRAM" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="4gb">4 GB</SelectItem>
                          <SelectItem value="6gb">6 GB</SelectItem>
                          <SelectItem value="8gb">8 GB</SelectItem>
                          <SelectItem value="10gb">10 GB</SelectItem>
                          <SelectItem value="12gb">12 GB</SelectItem>
                          <SelectItem value="16gb">16 GB</SelectItem>
                          <SelectItem value="24gb">24 GB</SelectItem>
                          <SelectItem value="more">Więcej</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>
                  </>
                )}
              </>
            )}
            
            {/* Pozostałe kategorie zostaną podobnie zaimplementowane... */}
            
            {/* Filtry dla Nieruchomości */}
            {selectedCategoryName === "Nieruchomości" && (
              <>
                <FilterSection title="Rodzaj nieruchomości" icon={<Home size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.propertyType || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('propertyType', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Wybierz rodzaj nieruchomości" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Wszystkie</SelectItem>
                      <SelectItem value="apartment">Mieszkanie</SelectItem>
                      <SelectItem value="house">Dom</SelectItem>
                      <SelectItem value="land">Działka</SelectItem>
                      <SelectItem value="commercial">Lokal użytkowy</SelectItem>
                      <SelectItem value="garage">Garaż</SelectItem>
                      <SelectItem value="room">Pokój</SelectItem>
                      <SelectItem value="office">Biuro</SelectItem>
                      <SelectItem value="warehouse">Magazyn</SelectItem>
                      <SelectItem value="other">Inne</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>
                
                <FilterSection title="Typ oferty" icon={<Building size={16} />}>
                  <RadioGroup
                    value={filters.categorySpecificFilters?.offerType || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('offerType', value === 'all' ? null : value)}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="offer-all" />
                      <Label htmlFor="offer-all">Wszystkie</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sale" id="offer-sale" />
                      <Label htmlFor="offer-sale">Sprzedaż</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="rent" id="offer-rent" />
                      <Label htmlFor="offer-rent">Wynajem</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="exchange" id="offer-exchange" />
                      <Label htmlFor="offer-exchange">Zamiana</Label>
                    </div>
                  </RadioGroup>
                </FilterSection>
                
                <FilterSection title="Powierzchnia" icon={<LandPlot size={16} />}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="area-min">Od</Label>
                      <Input
                        id="area-min"
                        type="number"
                        min={0}
                        value={filters.categorySpecificFilters?.areaMin || ''}
                        onChange={(e) => handleCategorySpecificFilterChange('areaMin', e.target.value ? parseInt(e.target.value) : null)}
                        placeholder="0 m²"
                      />
                    </div>
                    <div>
                      <Label htmlFor="area-max">Do</Label>
                      <Input
                        id="area-max"
                        type="number"
                        min={0}
                        value={filters.categorySpecificFilters?.areaMax || ''}
                        onChange={(e) => handleCategorySpecificFilterChange('areaMax', e.target.value ? parseInt(e.target.value) : null)}
                        placeholder="1000 m²"
                      />
                    </div>
                  </div>
                </FilterSection>
                
                <FilterSection title="Liczba pokoi" icon={<Home size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.rooms || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('rooms', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Wybierz liczbę pokoi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Wszystkie</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="6">6</SelectItem>
                      <SelectItem value="7+">7 i więcej</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>
                
                <FilterSection title="Piętro" icon={<Building size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.floor || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('floor', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Wybierz piętro" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Wszystkie</SelectItem>
                      <SelectItem value="basement">Suterena</SelectItem>
                      <SelectItem value="ground">Parter</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="6">6</SelectItem>
                      <SelectItem value="7">7</SelectItem>
                      <SelectItem value="8">8</SelectItem>
                      <SelectItem value="9">9</SelectItem>
                      <SelectItem value="10+">10+</SelectItem>
                      <SelectItem value="attic">Poddasze</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>
                
                <FilterSection title="Liczba łazienek" icon={<CircleDollarSign size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.bathrooms || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('bathrooms', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Wybierz liczbę łazienek" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Wszystkie</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4+">4 i więcej</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>
                
                <FilterSection title="Materiał budynku" icon={<FileSpreadsheet size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.buildingMaterial || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('buildingMaterial', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Wybierz materiał" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Wszystkie</SelectItem>
                      <SelectItem value="brick">Cegła</SelectItem>
                      <SelectItem value="concrete">Wielka płyta</SelectItem>
                      <SelectItem value="wood">Drewno</SelectItem>
                      <SelectItem value="cement">Pustak/Beton komórkowy</SelectItem>
                      <SelectItem value="mixed">Mieszany</SelectItem>
                      <SelectItem value="other">Inny</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>
                
                <FilterSection title="Rok budowy" icon={<Clock size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.buildYear || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('buildYear', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Wybierz rok budowy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Wszystkie</SelectItem>
                      <SelectItem value="2020_2025">2020-2025</SelectItem>
                      <SelectItem value="2010_2019">2010-2019</SelectItem>
                      <SelectItem value="2000_2009">2000-2009</SelectItem>
                      <SelectItem value="1990_1999">1990-1999</SelectItem>
                      <SelectItem value="1980_1989">1980-1989</SelectItem>
                      <SelectItem value="1970_1979">1970-1979</SelectItem>
                      <SelectItem value="1960_1969">1960-1969</SelectItem>
                      <SelectItem value="1950_1959">1950-1959</SelectItem>
                      <SelectItem value="before_1950">Przed 1950</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>
                
                <FilterSection title="Stan wykończenia" icon={<Home size={16} />}>
                  <RadioGroup
                    value={filters.categorySpecificFilters?.finishState || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('finishState', value === 'all' ? null : value)}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="finish-all" />
                      <Label htmlFor="finish-all">Wszystkie</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ready" id="finish-ready" />
                      <Label htmlFor="finish-ready">Do wprowadzenia</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="for_renovation" id="finish-renovation" />
                      <Label htmlFor="finish-renovation">Do remontu</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="for_finish" id="finish-finish" />
                      <Label htmlFor="finish-finish">Do wykończenia</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="under_construction" id="finish-construction" />
                      <Label htmlFor="finish-construction">W budowie</Label>
                    </div>
                  </RadioGroup>
                </FilterSection>
                
                <FilterSection title="Udogodnienia" icon={<FileSpreadsheet size={16} />}>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="amenity-parking" 
                        checked={(filters.categorySpecificFilters?.amenities || []).includes("parking")}
                        onCheckedChange={(checked) => {
                          const currentAmenities = filters.categorySpecificFilters?.amenities || [];
                          let newAmenities: string[];
                          
                          if (checked) {
                            newAmenities = [...currentAmenities, "parking"];
                          } else {
                            newAmenities = currentAmenities.filter((a: string) => a !== "parking");
                          }
                          
                          handleCategorySpecificFilterChange('amenities', newAmenities.length > 0 ? newAmenities : undefined);
                        }}
                      />
                      <Label className="font-medium" htmlFor="amenity-parking">Parking/Garaż</Label>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="amenity-balcony" 
                        checked={(filters.categorySpecificFilters?.amenities || []).includes("balcony")}
                        onCheckedChange={(checked) => {
                          const currentAmenities = filters.categorySpecificFilters?.amenities || [];
                          let newAmenities: string[];
                          
                          if (checked) {
                            newAmenities = [...currentAmenities, "balcony"];
                          } else {
                            newAmenities = currentAmenities.filter((a: string) => a !== "balcony");
                          }
                          
                          handleCategorySpecificFilterChange('amenities', newAmenities.length > 0 ? newAmenities : undefined);
                        }}
                      />
                      <Label className="font-medium" htmlFor="amenity-balcony">Balkon/Taras</Label>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="amenity-elevator" 
                        checked={(filters.categorySpecificFilters?.amenities || []).includes("elevator")}
                        onCheckedChange={(checked) => {
                          const currentAmenities = filters.categorySpecificFilters?.amenities || [];
                          let newAmenities: string[];
                          
                          if (checked) {
                            newAmenities = [...currentAmenities, "elevator"];
                          } else {
                            newAmenities = currentAmenities.filter((a: string) => a !== "elevator");
                          }
                          
                          handleCategorySpecificFilterChange('amenities', newAmenities.length > 0 ? newAmenities : undefined);
                        }}
                      />
                      <Label className="font-medium" htmlFor="amenity-elevator">Winda</Label>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="amenity-garden" 
                        checked={(filters.categorySpecificFilters?.amenities || []).includes("garden")}
                        onCheckedChange={(checked) => {
                          const currentAmenities = filters.categorySpecificFilters?.amenities || [];
                          let newAmenities: string[];
                          
                          if (checked) {
                            newAmenities = [...currentAmenities, "garden"];
                          } else {
                            newAmenities = currentAmenities.filter((a: string) => a !== "garden");
                          }
                          
                          handleCategorySpecificFilterChange('amenities', newAmenities.length > 0 ? newAmenities : undefined);
                        }}
                      />
                      <Label className="font-medium" htmlFor="amenity-garden">Ogród</Label>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="amenity-security" 
                        checked={(filters.categorySpecificFilters?.amenities || []).includes("security")}
                        onCheckedChange={(checked) => {
                          const currentAmenities = filters.categorySpecificFilters?.amenities || [];
                          let newAmenities: string[];
                          
                          if (checked) {
                            newAmenities = [...currentAmenities, "security"];
                          } else {
                            newAmenities = currentAmenities.filter((a: string) => a !== "security");
                          }
                          
                          handleCategorySpecificFilterChange('amenities', newAmenities.length > 0 ? newAmenities : undefined);
                        }}
                      />
                      <Label className="font-medium" htmlFor="amenity-security">Ochrona/Monitoring</Label>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="amenity-furnished" 
                        checked={(filters.categorySpecificFilters?.amenities || []).includes("furnished")}
                        onCheckedChange={(checked) => {
                          const currentAmenities = filters.categorySpecificFilters?.amenities || [];
                          let newAmenities: string[];
                          
                          if (checked) {
                            newAmenities = [...currentAmenities, "furnished"];
                          } else {
                            newAmenities = currentAmenities.filter((a: string) => a !== "furnished");
                          }
                          
                          handleCategorySpecificFilterChange('amenities', newAmenities.length > 0 ? newAmenities : undefined);
                        }}
                      />
                      <Label className="font-medium" htmlFor="amenity-furnished">Umeblowane</Label>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="amenity-aircondition" 
                        checked={(filters.categorySpecificFilters?.amenities || []).includes("aircondition")}
                        onCheckedChange={(checked) => {
                          const currentAmenities = filters.categorySpecificFilters?.amenities || [];
                          let newAmenities: string[];
                          
                          if (checked) {
                            newAmenities = [...currentAmenities, "aircondition"];
                          } else {
                            newAmenities = currentAmenities.filter((a: string) => a !== "aircondition");
                          }
                          
                          handleCategorySpecificFilterChange('amenities', newAmenities.length > 0 ? newAmenities : undefined);
                        }}
                      />
                      <Label className="font-medium" htmlFor="amenity-aircondition">Klimatyzacja</Label>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="amenity-pets" 
                        checked={(filters.categorySpecificFilters?.amenities || []).includes("pets")}
                        onCheckedChange={(checked) => {
                          const currentAmenities = filters.categorySpecificFilters?.amenities || [];
                          let newAmenities: string[];
                          
                          if (checked) {
                            newAmenities = [...currentAmenities, "pets"];
                          } else {
                            newAmenities = currentAmenities.filter((a: string) => a !== "pets");
                          }
                          
                          handleCategorySpecificFilterChange('amenities', newAmenities.length > 0 ? newAmenities : undefined);
                        }}
                      />
                      <Label className="font-medium" htmlFor="amenity-pets">Przyjazne zwierzętom</Label>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="amenity-basement" 
                        checked={(filters.categorySpecificFilters?.amenities || []).includes("basement")}
                        onCheckedChange={(checked) => {
                          const currentAmenities = filters.categorySpecificFilters?.amenities || [];
                          let newAmenities: string[];
                          
                          if (checked) {
                            newAmenities = [...currentAmenities, "basement"];
                          } else {
                            newAmenities = currentAmenities.filter((a: string) => a !== "basement");
                          }
                          
                          handleCategorySpecificFilterChange('amenities', newAmenities.length > 0 ? newAmenities : undefined);
                        }}
                      />
                      <Label className="font-medium" htmlFor="amenity-basement">Piwnica/Komórka lokatorska</Label>
                    </div>
                  </div>
                </FilterSection>
              </>
            )}
            
            {/* Filtry dla Zwierzęta */}
            {selectedCategoryName === "Zwierzęta" && (
              <>
                <FilterSection title={t("filters.animals.type")} icon={<Dog size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.animalType || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('animalType', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("filters.animals.typePlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("filters.all")}</SelectItem>
                      <SelectItem value="dogs">{t("filters.animals.dogs")}</SelectItem>
                      <SelectItem value="cats">{t("filters.animals.cats")}</SelectItem>
                      <SelectItem value="birds">{t("filters.animals.birds")}</SelectItem>
                      <SelectItem value="fish">{t("filters.animals.fish")}</SelectItem>
                      <SelectItem value="rodents">{t("filters.animals.rodents")}</SelectItem>
                      <SelectItem value="reptiles">{t("filters.animals.reptiles")}</SelectItem>
                      <SelectItem value="farm">{t("filters.animals.farm")}</SelectItem>
                      <SelectItem value="accessories">{t("filters.animals.accessories")}</SelectItem>
                      <SelectItem value="food">{t("filters.animals.food")}</SelectItem>
                      <SelectItem value="other">{t("filters.animals.other")}</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>
                
                <FilterSection title={t("filters.animals.purpose")} icon={<FileSpreadsheet size={16} />}>
                  <RadioGroup
                    value={filters.categorySpecificFilters?.purpose || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('purpose', value === 'all' ? null : value)}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="purpose-all" />
                      <Label htmlFor="purpose-all">{t("filters.all")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="for_sale" id="purpose-for-sale" />
                      <Label htmlFor="purpose-for-sale">{t("filters.animals.forSale")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="for_adoption" id="purpose-for-adoption" />
                      <Label htmlFor="purpose-for-adoption">{t("filters.animals.forAdoption")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="breeding" id="purpose-breeding" />
                      <Label htmlFor="purpose-breeding">{t("filters.animals.forBreeding")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="lost_found" id="purpose-lost-found" />
                      <Label htmlFor="purpose-lost-found">{t("filters.animals.lostFound")}</Label>
                    </div>
                  </RadioGroup>
                </FilterSection>
              </>
            )}

            {/* Filtry dla Sport i Hobby */}
            {selectedCategoryName === "Sport i Hobby" && (
              <>
                <FilterSection title={"Kategoria"} icon={<Dumbbell size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.sportsType || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('sportsType', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={"Wybierz kategorię"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Wszystkie</SelectItem>
                      <SelectItem value="fitness">Fitness i siłownia</SelectItem>
                      <SelectItem value="bicycles">Rowery</SelectItem>
                      <SelectItem value="winter_sports">Sporty zimowe</SelectItem>
                      <SelectItem value="water_sports">Sporty wodne</SelectItem>
                      <SelectItem value="team_sports">Sporty drużynowe</SelectItem>
                      <SelectItem value="fishing">Wędkarstwo</SelectItem>
                      <SelectItem value="hunting">Myślistwo</SelectItem>
                      <SelectItem value="camping">Turystyka i camping</SelectItem>
                      <SelectItem value="running">Bieganie</SelectItem>
                      <SelectItem value="martial_arts">Sporty walki</SelectItem>
                      <SelectItem value="hobby">Hobby i kolekcjonerstwo</SelectItem>
                      <SelectItem value="music">Instrumenty muzyczne</SelectItem>
                      <SelectItem value="games">Gry planszowe</SelectItem>
                      <SelectItem value="other">Inne</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>
                
                <FilterSection title={"Stan"} icon={<CircleDollarSign size={16} />}>
                  <RadioGroup
                    value={filters.categorySpecificFilters?.itemCondition || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('itemCondition', value === 'all' ? null : value)}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="sport-condition-all" />
                      <Label htmlFor="sport-condition-all">Wszystkie</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="new" id="sport-condition-new" />
                      <Label htmlFor="sport-condition-new">Nowy</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="likeNew" id="sport-condition-like-new" />
                      <Label htmlFor="sport-condition-like-new">Jak nowy</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="good" id="sport-condition-good" />
                      <Label htmlFor="sport-condition-good">Dobry</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="used" id="sport-condition-used" />
                      <Label htmlFor="sport-condition-used">Używany</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="damaged" id="sport-condition-damaged" />
                      <Label htmlFor="sport-condition-damaged">Uszkodzony</Label>
                    </div>
                  </RadioGroup>
                </FilterSection>

                {/* Filtry dla podkategorii Fitness i siłownia */}
                {(['fitness'].includes(filters.categorySpecificFilters?.sportsType || '')) && (
                  <>
                    <FilterSection title="Typ sprzętu" icon={<Dumbbell size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.fitnessEquipmentType || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('fitnessEquipmentType', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz typ sprzętu" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="treadmills">Bieżnie</SelectItem>
                          <SelectItem value="ellipticals">Orbitreki</SelectItem>
                          <SelectItem value="exercise_bikes">Rowery stacjonarne</SelectItem>
                          <SelectItem value="weights">Ciężary i hantle</SelectItem>
                          <SelectItem value="benches">Ławki treningowe</SelectItem>
                          <SelectItem value="multigyms">Atlasy</SelectItem>
                          <SelectItem value="accessories">Akcesoria treningowe</SelectItem>
                          <SelectItem value="clothing">Odzież sportowa</SelectItem>
                          <SelectItem value="supplements">Suplementy</SelectItem>
                          <SelectItem value="other">Inne</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>

                    <FilterSection title="Marka" icon={<Bookmark size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.fitnessBrand || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('fitnessBrand', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz markę" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="kettler">Kettler</SelectItem>
                          <SelectItem value="marbo">Marbo Sport</SelectItem>
                          <SelectItem value="york">York</SelectItem>
                          <SelectItem value="hammer">Hammer</SelectItem>
                          <SelectItem value="christopeit">Christopeit</SelectItem>
                          <SelectItem value="hms">HMS</SelectItem>
                          <SelectItem value="insportline">InSportLine</SelectItem>
                          <SelectItem value="olimp">Olimp</SelectItem>
                          <SelectItem value="adidas">Adidas</SelectItem>
                          <SelectItem value="nike">Nike</SelectItem>
                          <SelectItem value="reebok">Reebok</SelectItem>
                          <SelectItem value="puma">Puma</SelectItem>
                          <SelectItem value="other">Inna</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>

                    <FilterSection title="Waga" icon={<FileSpreadsheet size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.weight || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('weight', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz wagę" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="upto5kg">do 5 kg</SelectItem>
                          <SelectItem value="5to10kg">5-10 kg</SelectItem>
                          <SelectItem value="10to20kg">10-20 kg</SelectItem>
                          <SelectItem value="20to50kg">20-50 kg</SelectItem>
                          <SelectItem value="above50kg">powyżej 50 kg</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>

                    <FilterSection title="Cechy" icon={<FileSpreadsheet size={16} />}>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-2">
                          <Checkbox 
                            id="fitness-feature-foldable" 
                            checked={(filters.categorySpecificFilters?.features || []).includes("foldable")}
                            onCheckedChange={(checked) => {
                              const currentFeatures = filters.categorySpecificFilters?.features || [];
                              let newFeatures: string[];
                              
                              if (checked) {
                                newFeatures = [...currentFeatures, "foldable"];
                              } else {
                                newFeatures = currentFeatures.filter((a: string) => a !== "foldable");
                              }
                              
                              handleCategorySpecificFilterChange('features', newFeatures.length > 0 ? newFeatures : undefined);
                            }}
                          />
                          <Label className="font-medium" htmlFor="fitness-feature-foldable">Składany</Label>
                        </div>
                        
                        <div className="flex items-start space-x-2">
                          <Checkbox 
                            id="fitness-feature-pulse" 
                            checked={(filters.categorySpecificFilters?.features || []).includes("pulse")}
                            onCheckedChange={(checked) => {
                              const currentFeatures = filters.categorySpecificFilters?.features || [];
                              let newFeatures: string[];
                              
                              if (checked) {
                                newFeatures = [...currentFeatures, "pulse"];
                              } else {
                                newFeatures = currentFeatures.filter((a: string) => a !== "pulse");
                              }
                              
                              handleCategorySpecificFilterChange('features', newFeatures.length > 0 ? newFeatures : undefined);
                            }}
                          />
                          <Label className="font-medium" htmlFor="fitness-feature-pulse">Pomiar pulsu</Label>
                        </div>
                        
                        <div className="flex items-start space-x-2">
                          <Checkbox 
                            id="fitness-feature-app" 
                            checked={(filters.categorySpecificFilters?.features || []).includes("app")}
                            onCheckedChange={(checked) => {
                              const currentFeatures = filters.categorySpecificFilters?.features || [];
                              let newFeatures: string[];
                              
                              if (checked) {
                                newFeatures = [...currentFeatures, "app"];
                              } else {
                                newFeatures = currentFeatures.filter((a: string) => a !== "app");
                              }
                              
                              handleCategorySpecificFilterChange('features', newFeatures.length > 0 ? newFeatures : undefined);
                            }}
                          />
                          <Label className="font-medium" htmlFor="fitness-feature-app">Aplikacja mobilna</Label>
                        </div>
                        
                        <div className="flex items-start space-x-2">
                          <Checkbox 
                            id="fitness-feature-incline" 
                            checked={(filters.categorySpecificFilters?.features || []).includes("incline")}
                            onCheckedChange={(checked) => {
                              const currentFeatures = filters.categorySpecificFilters?.features || [];
                              let newFeatures: string[];
                              
                              if (checked) {
                                newFeatures = [...currentFeatures, "incline"];
                              } else {
                                newFeatures = currentFeatures.filter((a: string) => a !== "incline");
                              }
                              
                              handleCategorySpecificFilterChange('features', newFeatures.length > 0 ? newFeatures : undefined);
                            }}
                          />
                          <Label className="font-medium" htmlFor="fitness-feature-incline">Regulacja nachylenia</Label>
                        </div>
                      </div>
                    </FilterSection>
                  </>
                )}

                {/* Filtry dla podkategorii Sporty zimowe */}
                {(['winter_sports'].includes(filters.categorySpecificFilters?.sportsType || '')) && (
                  <>
                    <FilterSection title="Typ sprzętu" icon={<Mountain size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.winterSportType || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('winterSportType', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz typ sprzętu" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="ski">Narty</SelectItem>
                          <SelectItem value="ski_boots">Buty narciarskie</SelectItem>
                          <SelectItem value="ski_poles">Kijki narciarskie</SelectItem>
                          <SelectItem value="ski_helmets">Kaski narciarskie</SelectItem>
                          <SelectItem value="ski_goggles">Gogle narciarskie</SelectItem>
                          <SelectItem value="snowboard">Snowboard</SelectItem>
                          <SelectItem value="snowboard_boots">Buty snowboardowe</SelectItem>
                          <SelectItem value="snow_clothing">Odzież zimowa</SelectItem>
                          <SelectItem value="ice_skates">Łyżwy</SelectItem>
                          <SelectItem value="sleds">Sanki</SelectItem>
                          <SelectItem value="other">Inne</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>

                    <FilterSection title="Marka" icon={<Bookmark size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.winterSportsBrand || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('winterSportsBrand', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz markę" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="atomic">Atomic</SelectItem>
                          <SelectItem value="salomon">Salomon</SelectItem>
                          <SelectItem value="rossignol">Rossignol</SelectItem>
                          <SelectItem value="head">Head</SelectItem>
                          <SelectItem value="fischer">Fischer</SelectItem>
                          <SelectItem value="nordica">Nordica</SelectItem>
                          <SelectItem value="blizzard">Blizzard</SelectItem>
                          <SelectItem value="burton">Burton</SelectItem>
                          <SelectItem value="k2">K2</SelectItem>
                          <SelectItem value="volkl">Völkl</SelectItem>
                          <SelectItem value="dynastar">Dynastar</SelectItem>
                          <SelectItem value="elan">Elan</SelectItem>
                          <SelectItem value="lange">Lange</SelectItem>
                          <SelectItem value="other">Inna</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>

                    <FilterSection title="Długość" icon={<FileSpreadsheet size={16} />}>
                      <div className="space-y-4 pt-2">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <Input
                              type="number"
                              placeholder="Min (cm)"
                              value={filters.categorySpecificFilters?.minSkiLength || ''}
                              onChange={(e) => handleCategorySpecificFilterChange('minSkiLength', e.target.value === '' ? null : Number(e.target.value))}
                            />
                          </div>
                          <div>
                            <Input
                              type="number"
                              placeholder="Max (cm)"
                              value={filters.categorySpecificFilters?.maxSkiLength || ''}
                              onChange={(e) => handleCategorySpecificFilterChange('maxSkiLength', e.target.value === '' ? null : Number(e.target.value))}
                            />
                          </div>
                        </div>
                      </div>
                    </FilterSection>

                    <FilterSection title="Poziom zaawansowania" icon={<Activity size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.skillLevel || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('skillLevel', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz poziom" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="beginner">Początkujący</SelectItem>
                          <SelectItem value="intermediate">Średniozaawansowany</SelectItem>
                          <SelectItem value="advanced">Zaawansowany</SelectItem>
                          <SelectItem value="expert">Expert</SelectItem>
                          <SelectItem value="professional">Profesjonalny</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>
                  </>
                )}

                {/* Filtry dla podkategorii Wędkarstwo */}
                {(['fishing'].includes(filters.categorySpecificFilters?.sportsType || '')) && (
                  <>
                    <FilterSection title="Typ sprzętu" icon={<Anchor size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.fishingEquipmentType || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('fishingEquipmentType', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz typ sprzętu" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="rods">Wędki</SelectItem>
                          <SelectItem value="reels">Kołowrotki</SelectItem>
                          <SelectItem value="lures">Przynęty</SelectItem>
                          <SelectItem value="lines">Żyłki/Plecionki</SelectItem>
                          <SelectItem value="hooks">Haczyki</SelectItem>
                          <SelectItem value="floats">Spławiki</SelectItem>
                          <SelectItem value="feeders">Koszyki zanętowe</SelectItem>
                          <SelectItem value="nets">Podbieraki</SelectItem>
                          <SelectItem value="chairs">Krzesła/Stanowiska</SelectItem>
                          <SelectItem value="boxes">Skrzynki/Pudełka</SelectItem>
                          <SelectItem value="clothing">Odzież wędkarska</SelectItem>
                          <SelectItem value="accessories">Akcesoria</SelectItem>
                          <SelectItem value="other">Inne</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>

                    <FilterSection title="Marka" icon={<Bookmark size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.fishingBrand || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('fishingBrand', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz markę" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="shimano">Shimano</SelectItem>
                          <SelectItem value="daiwa">Daiwa</SelectItem>
                          <SelectItem value="jaxon">Jaxon</SelectItem>
                          <SelectItem value="mikado">Mikado</SelectItem>
                          <SelectItem value="robinson">Robinson</SelectItem>
                          <SelectItem value="konger">Konger</SelectItem>
                          <SelectItem value="dragon">Dragon</SelectItem>
                          <SelectItem value="okuma">Okuma</SelectItem>
                          <SelectItem value="spro">Spro</SelectItem>
                          <SelectItem value="penn">Penn</SelectItem>
                          <SelectItem value="rapala">Rapala</SelectItem>
                          <SelectItem value="zebco">Zebco</SelectItem>
                          <SelectItem value="other">Inna</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>

                    <FilterSection title="Długość wędki" icon={<FileSpreadsheet size={16} />}>
                      <div className="space-y-4 pt-2">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <Input
                              type="number"
                              placeholder="Min (m)"
                              value={filters.categorySpecificFilters?.minRodLength || ''}
                              onChange={(e) => handleCategorySpecificFilterChange('minRodLength', e.target.value === '' ? null : Number(e.target.value))}
                            />
                          </div>
                          <div>
                            <Input
                              type="number"
                              placeholder="Max (m)"
                              value={filters.categorySpecificFilters?.maxRodLength || ''}
                              onChange={(e) => handleCategorySpecificFilterChange('maxRodLength', e.target.value === '' ? null : Number(e.target.value))}
                            />
                          </div>
                        </div>
                      </div>
                    </FilterSection>

                    <FilterSection title="Metoda połowu" icon={<FileSpreadsheet size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.fishingMethod || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('fishingMethod', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz metodę" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="spinning">Spinning</SelectItem>
                          <SelectItem value="float">Spławikowa</SelectItem>
                          <SelectItem value="ground">Gruntowa</SelectItem>
                          <SelectItem value="feeder">Feeder</SelectItem>
                          <SelectItem value="fly">Muchowa</SelectItem>
                          <SelectItem value="sea">Morska</SelectItem>
                          <SelectItem value="ice">Podlodowa</SelectItem>
                          <SelectItem value="carp">Karpiowa</SelectItem>
                          <SelectItem value="other">Inna</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>
                  </>
                )}

                {/* Filtry dla podkategorii Sporty wodne */}
                {(['water_sports'].includes(filters.categorySpecificFilters?.sportsType || '')) && (
                  <>
                    <FilterSection title="Typ sprzętu" icon={<Droplets size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.waterSportsType || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('waterSportsType', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz typ sprzętu" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="surfing">Surfing</SelectItem>
                          <SelectItem value="kitesurfing">Kitesurfing</SelectItem>
                          <SelectItem value="windsurfing">Windsurfing</SelectItem>
                          <SelectItem value="wakeboarding">Wakeboarding</SelectItem>
                          <SelectItem value="waterskiing">Narty wodne</SelectItem>
                          <SelectItem value="paddleboarding">SUP (Paddleboarding)</SelectItem>
                          <SelectItem value="kayaking">Kajaki</SelectItem>
                          <SelectItem value="canoeing">Canoe</SelectItem>
                          <SelectItem value="diving">Nurkowanie</SelectItem>
                          <SelectItem value="sailing">Żeglarstwo</SelectItem>
                          <SelectItem value="rafting">Rafting</SelectItem>
                          <SelectItem value="accessories">Akcesoria</SelectItem>
                          <SelectItem value="other">Inne</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>

                    <FilterSection title="Marka" icon={<Bookmark size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.waterSportsBrand || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('waterSportsBrand', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz markę" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="oneill">O'Neill</SelectItem>
                          <SelectItem value="rip_curl">Rip Curl</SelectItem>
                          <SelectItem value="billabong">Billabong</SelectItem>
                          <SelectItem value="quiksilver">Quiksilver</SelectItem>
                          <SelectItem value="neilpryde">NeilPryde</SelectItem>
                          <SelectItem value="north">North</SelectItem>
                          <SelectItem value="starboard">Starboard</SelectItem>
                          <SelectItem value="cabrinha">Cabrinha</SelectItem>
                          <SelectItem value="dakine">Dakine</SelectItem>
                          <SelectItem value="hobie">Hobie</SelectItem>
                          <SelectItem value="perception">Perception</SelectItem>
                          <SelectItem value="mistral">Mistral</SelectItem>
                          <SelectItem value="redpaddle">Red Paddle</SelectItem>
                          <SelectItem value="other">Inna</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>

                    <FilterSection title="Poziom zaawansowania" icon={<Activity size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.waterSportsSkillLevel || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('waterSportsSkillLevel', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz poziom" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="beginner">Początkujący</SelectItem>
                          <SelectItem value="intermediate">Średniozaawansowany</SelectItem>
                          <SelectItem value="advanced">Zaawansowany</SelectItem>
                          <SelectItem value="expert">Expert</SelectItem>
                          <SelectItem value="professional">Profesjonalny</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>
                  </>
                )}

                {/* Filtry dla podkategorii Sporty drużynowe */}
                {(['team_sports'].includes(filters.categorySpecificFilters?.sportsType || '')) && (
                  <>
                    <FilterSection title="Dyscyplina" icon={<Users size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.teamSportType || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('teamSportType', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz dyscyplinę" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="football">Piłka nożna</SelectItem>
                          <SelectItem value="volleyball">Siatkówka</SelectItem>
                          <SelectItem value="basketball">Koszykówka</SelectItem>
                          <SelectItem value="handball">Piłka ręczna</SelectItem>
                          <SelectItem value="rugby">Rugby</SelectItem>
                          <SelectItem value="hockey">Hokej</SelectItem>
                          <SelectItem value="american_football">Futbol amerykański</SelectItem>
                          <SelectItem value="baseball">Baseball</SelectItem>
                          <SelectItem value="cricket">Krykiet</SelectItem>
                          <SelectItem value="other">Inne</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>

                    <FilterSection title="Typ produktu" icon={<FileSpreadsheet size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.teamSportProductType || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('teamSportProductType', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz typ produktu" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="balls">Piłki</SelectItem>
                          <SelectItem value="clothing">Odzież sportowa</SelectItem>
                          <SelectItem value="shoes">Obuwie sportowe</SelectItem>
                          <SelectItem value="protection">Ochraniacze</SelectItem>
                          <SelectItem value="accessories">Akcesoria</SelectItem>
                          <SelectItem value="training">Sprzęt treningowy</SelectItem>
                          <SelectItem value="goals">Bramki</SelectItem>
                          <SelectItem value="nets">Siatki</SelectItem>
                          <SelectItem value="other">Inne</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>

                    <FilterSection title="Marka" icon={<Bookmark size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.teamSportBrand || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('teamSportBrand', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz markę" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="nike">Nike</SelectItem>
                          <SelectItem value="adidas">Adidas</SelectItem>
                          <SelectItem value="puma">Puma</SelectItem>
                          <SelectItem value="reebok">Reebok</SelectItem>
                          <SelectItem value="under_armour">Under Armour</SelectItem>
                          <SelectItem value="asics">Asics</SelectItem>
                          <SelectItem value="mizuno">Mizuno</SelectItem>
                          <SelectItem value="wilson">Wilson</SelectItem>
                          <SelectItem value="spalding">Spalding</SelectItem>
                          <SelectItem value="mikasa">Mikasa</SelectItem>
                          <SelectItem value="hummel">Hummel</SelectItem>
                          <SelectItem value="select">Select</SelectItem>
                          <SelectItem value="other">Inna</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>
                  </>
                )}

                {/* Filtry dla podkategorii Rowery */}
                {(['bicycles'].includes(filters.categorySpecificFilters?.sportsType || '')) && (
                  <>
                    <FilterSection title="Typ roweru" icon={<Bike size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.bikeType || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('bikeType', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz typ roweru" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="mountain">Górski (MTB)</SelectItem>
                          <SelectItem value="road">Szosowy</SelectItem>
                          <SelectItem value="city">Miejski</SelectItem>
                          <SelectItem value="trekking">Trekkingowy</SelectItem>
                          <SelectItem value="electric">Elektryczny</SelectItem>
                          <SelectItem value="gravel">Gravel</SelectItem>
                          <SelectItem value="cross">Cross</SelectItem>
                          <SelectItem value="bmx">BMX</SelectItem>
                          <SelectItem value="kids">Dziecięcy</SelectItem>
                          <SelectItem value="folding">Składany</SelectItem>
                          <SelectItem value="parts">Części i akcesoria</SelectItem>
                          <SelectItem value="other">Inny</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>
                    
                    <FilterSection title="Marka" icon={<Bookmark size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.bikeBrand || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('bikeBrand', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz markę" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="kross">Kross</SelectItem>
                          <SelectItem value="giant">Giant</SelectItem>
                          <SelectItem value="trek">Trek</SelectItem>
                          <SelectItem value="specialized">Specialized</SelectItem>
                          <SelectItem value="scott">Scott</SelectItem>
                          <SelectItem value="cannondale">Cannondale</SelectItem>
                          <SelectItem value="merida">Merida</SelectItem>
                          <SelectItem value="cube">Cube</SelectItem>
                          <SelectItem value="romet">Romet</SelectItem>
                          <SelectItem value="orbea">Orbea</SelectItem>
                          <SelectItem value="kellys">Kellys</SelectItem>
                          <SelectItem value="btwin">B'Twin/Decathlon</SelectItem>
                          <SelectItem value="unibike">Unibike</SelectItem>
                          <SelectItem value="gt">GT</SelectItem>
                          <SelectItem value="other">Inna</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>

                    <FilterSection title="Rozmiar ramy" icon={<FileSpreadsheet size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.frameSize || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('frameSize', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz rozmiar ramy" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="xs">XS (13-14")</SelectItem>
                          <SelectItem value="s">S (15-16")</SelectItem>
                          <SelectItem value="m">M (17-18")</SelectItem>
                          <SelectItem value="l">L (19-20")</SelectItem>
                          <SelectItem value="xl">XL (21-22")</SelectItem>
                          <SelectItem value="xxl">XXL (23" i więcej)</SelectItem>
                          <SelectItem value="kids">Dziecięcy</SelectItem>
                          <SelectItem value="na">Nie dotyczy</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>

                    <FilterSection title="Materiał ramy" icon={<FileSpreadsheet size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.frameMaterial || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('frameMaterial', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz materiał ramy" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="aluminum">Aluminium</SelectItem>
                          <SelectItem value="carbon">Karbon</SelectItem>
                          <SelectItem value="steel">Stal</SelectItem>
                          <SelectItem value="titanium">Tytan</SelectItem>
                          <SelectItem value="other">Inny</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>
                    
                    <FilterSection title="Rozmiar kół" icon={<FileSpreadsheet size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.wheelSize || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('wheelSize', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz rozmiar kół" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="16">16"</SelectItem>
                          <SelectItem value="20">20"</SelectItem>
                          <SelectItem value="24">24"</SelectItem>
                          <SelectItem value="26">26"</SelectItem>
                          <SelectItem value="27.5">27.5"</SelectItem>
                          <SelectItem value="28">28"</SelectItem>
                          <SelectItem value="29">29"</SelectItem>
                          <SelectItem value="650b">650B</SelectItem>
                          <SelectItem value="700c">700C</SelectItem>
                          <SelectItem value="other">Inny</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>
                    
                    <FilterSection title="Napęd" icon={<FileSpreadsheet size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.transmission || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('transmission', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz napęd" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="shimano">Shimano</SelectItem>
                          <SelectItem value="sram">SRAM</SelectItem>
                          <SelectItem value="campagnolo">Campagnolo</SelectItem>
                          <SelectItem value="singlespeed">Jednobiegowy</SelectItem>
                          <SelectItem value="internal">Przekładnia wewnętrzna</SelectItem>
                          <SelectItem value="other">Inny</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>
                    
                    <FilterSection title="Przerzutki" icon={<FileSpreadsheet size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.gears || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('gears', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Liczba przerzutek" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="1">1 bieg</SelectItem>
                          <SelectItem value="3">3 biegi</SelectItem>
                          <SelectItem value="6">6 biegów</SelectItem>
                          <SelectItem value="7">7 biegów</SelectItem>
                          <SelectItem value="8">8 biegów</SelectItem>
                          <SelectItem value="9">9 biegów</SelectItem>
                          <SelectItem value="10">10 biegów</SelectItem>
                          <SelectItem value="11">11 biegów</SelectItem>
                          <SelectItem value="12">12 biegów</SelectItem>
                          <SelectItem value="other">Inna liczba</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>
                    
                    <FilterSection title="Hamulce" icon={<FileSpreadsheet size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.brakes || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('brakes', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Typ hamulców" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="v-brake">V-brake</SelectItem>
                          <SelectItem value="cantilever">Cantilever</SelectItem>
                          <SelectItem value="hydraulic">Hydrauliczne tarczowe</SelectItem>
                          <SelectItem value="mechanical">Mechaniczne tarczowe</SelectItem>
                          <SelectItem value="roller">Rolkowe</SelectItem>
                          <SelectItem value="other">Inne</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>
                  </>
                )}

                {/* Filtry dla podkategorii Sporty zimowe */}
                {(['winter_sports'].includes(filters.categorySpecificFilters?.sportsType || '')) && (
                  <>
                    <FilterSection title="Kategoria" icon={<Mountain size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.winterSportType || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('winterSportType', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz kategorię" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="skis">Narty</SelectItem>
                          <SelectItem value="ski_boots">Buty narciarskie</SelectItem>
                          <SelectItem value="ski_poles">Kijki narciarskie</SelectItem>
                          <SelectItem value="snowboard">Snowboard</SelectItem>
                          <SelectItem value="snowboard_boots">Buty snowboardowe</SelectItem>
                          <SelectItem value="sleds">Sanki</SelectItem>
                          <SelectItem value="ice_skates">Łyżwy</SelectItem>
                          <SelectItem value="helmets">Kaski</SelectItem>
                          <SelectItem value="goggles">Gogle</SelectItem>
                          <SelectItem value="clothing">Odzież zimowa</SelectItem>
                          <SelectItem value="accessories">Akcesoria</SelectItem>
                          <SelectItem value="other">Inne</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>

                    <FilterSection title="Poziom zaawansowania" icon={<FileSpreadsheet size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.skillLevel || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('skillLevel', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz poziom" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="beginner">Początkujący</SelectItem>
                          <SelectItem value="intermediate">Średniozaawansowany</SelectItem>
                          <SelectItem value="advanced">Zaawansowany</SelectItem>
                          <SelectItem value="expert">Ekspert</SelectItem>
                          <SelectItem value="professional">Profesjonalny</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>
                  </>
                )}

                {/* Filtry dla podkategorii Muzyka */}
                {(['music'].includes(filters.categorySpecificFilters?.sportsType || '')) && (
                  <>
                    <FilterSection title="Typ instrumentu" icon={<Music size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.instrumentType || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('instrumentType', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz typ instrumentu" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="guitar_acoustic">Gitara akustyczna</SelectItem>
                          <SelectItem value="guitar_electric">Gitara elektryczna</SelectItem>
                          <SelectItem value="guitar_classical">Gitara klasyczna</SelectItem>
                          <SelectItem value="guitar_bass">Gitara basowa</SelectItem>
                          <SelectItem value="keyboard">Keyboard</SelectItem>
                          <SelectItem value="piano">Pianino/Fortepian</SelectItem>
                          <SelectItem value="drums">Perkusja</SelectItem>
                          <SelectItem value="violin">Skrzypce</SelectItem>
                          <SelectItem value="brass">Instrumenty dęte</SelectItem>
                          <SelectItem value="dj">Sprzęt DJ</SelectItem>
                          <SelectItem value="accessories">Akcesoria muzyczne</SelectItem>
                          <SelectItem value="other">Inny</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>
                  </>
                )}

                {/* Filtry dla podkategorii Gry planszowe */}
                {(['games'].includes(filters.categorySpecificFilters?.sportsType || '')) && (
                  <>
                    <FilterSection title="Typ gry" icon={<FileSpreadsheet size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.gameType || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('gameType', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz typ gry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="board">Planszowe</SelectItem>
                          <SelectItem value="card">Karciane</SelectItem>
                          <SelectItem value="rpg">RPG</SelectItem>
                          <SelectItem value="strategy">Strategiczne</SelectItem>
                          <SelectItem value="family">Rodzinne</SelectItem>
                          <SelectItem value="party">Imprezowe</SelectItem>
                          <SelectItem value="puzzle">Puzzle</SelectItem>
                          <SelectItem value="other">Inne</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>

                    <FilterSection title="Liczba graczy" icon={<User size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.playerCount || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('playerCount', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz liczbę graczy" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="one">Jednoosobowe</SelectItem>
                          <SelectItem value="two">2 osoby</SelectItem>
                          <SelectItem value="2to4">2-4 osoby</SelectItem>
                          <SelectItem value="4to6">4-6 osób</SelectItem>
                          <SelectItem value="above6">6+ osób</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>
                  </>
                )}
              </>
            )}

            {/* Filtry dla Dla Dzieci */}
            {selectedCategoryName === "Dla Dzieci" && (
              <>
                <FilterSection title={t("filters.kids.type")} icon={<Baby size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.kidsType || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('kidsType', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("filters.kids.typePlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("filters.all")}</SelectItem>
                      <SelectItem value="clothing">{t("filters.kids.clothing")}</SelectItem>
                      <SelectItem value="toys">{t("filters.kids.toys")}</SelectItem>
                      <SelectItem value="strollers">{t("filters.kids.strollers")}</SelectItem>
                      <SelectItem value="furniture">{t("filters.kids.furniture")}</SelectItem>
                      <SelectItem value="safety">{t("filters.kids.safety")}</SelectItem>
                      <SelectItem value="feeding">{t("filters.kids.feeding")}</SelectItem>
                      <SelectItem value="education">{t("filters.kids.education")}</SelectItem>
                      <SelectItem value="other">{t("filters.kids.other")}</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>
                
                <FilterSection title={t("filters.kids.ageGroup")} icon={<Clock size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.kidsAgeGroup || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('kidsAgeGroup', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("filters.kids.ageGroupPlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("filters.all")}</SelectItem>
                      <SelectItem value="newborn">{t("filters.kids.newborn")}</SelectItem>
                      <SelectItem value="infant">{t("filters.kids.infant")}</SelectItem>
                      <SelectItem value="toddler">{t("filters.kids.toddler")}</SelectItem>
                      <SelectItem value="preschool">{t("filters.kids.preschool")}</SelectItem>
                      <SelectItem value="school">{t("filters.kids.school")}</SelectItem>
                      <SelectItem value="teen">{t("filters.kids.teen")}</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>
                
                <FilterSection title={t("filters.kids.condition")} icon={<CircleDollarSign size={16} />}>
                  <RadioGroup
                    value={filters.categorySpecificFilters?.kidsCondition || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('kidsCondition', value === 'all' ? null : value)}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="kids-condition-all" />
                      <Label htmlFor="kids-condition-all">{t("filters.all")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="new" id="kids-condition-new" />
                      <Label htmlFor="kids-condition-new">{t("filters.kids.new")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="likeNew" id="kids-condition-like-new" />
                      <Label htmlFor="kids-condition-like-new">{t("filters.kids.likeNew")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="good" id="kids-condition-good" />
                      <Label htmlFor="kids-condition-good">{t("filters.kids.good")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="acceptable" id="kids-condition-acceptable" />
                      <Label htmlFor="kids-condition-acceptable">{t("filters.kids.acceptable")}</Label>
                    </div>
                  </RadioGroup>
                </FilterSection>
              </>
            )}

            {/* Filtry dla Akcesoria dla Zwierząt */}
            {selectedCategoryName === "Zwierzęta" && (
              <>
                <FilterSection title="Kategoria" icon={<Dog size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.petAccessoryType || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('petAccessoryType', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Wybierz kategorię" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Wszystkie</SelectItem>
                      <SelectItem value="food">Karma i przysmaki</SelectItem>
                      <SelectItem value="toys">Zabawki</SelectItem>
                      <SelectItem value="beds">Legowiska i transportery</SelectItem>
                      <SelectItem value="clothes">Ubrania i akcesoria</SelectItem>
                      <SelectItem value="grooming">Pielęgnacja</SelectItem>
                      <SelectItem value="training">Szkolenie</SelectItem>
                      <SelectItem value="bowls">Miski i podajniki</SelectItem>
                      <SelectItem value="aquarium">Akwarystyka</SelectItem>
                      <SelectItem value="terrarium">Terrarystyka</SelectItem>
                      <SelectItem value="cages">Klatki i wybiegi</SelectItem>
                      <SelectItem value="other">Inne</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>

                <FilterSection title="Dla zwierzęcia" icon={<Dog size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.forPetType || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('forPetType', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Wybierz zwierzę" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Wszystkie</SelectItem>
                      <SelectItem value="dogs">Psy</SelectItem>
                      <SelectItem value="cats">Koty</SelectItem>
                      <SelectItem value="birds">Ptaki</SelectItem>
                      <SelectItem value="fish">Ryby</SelectItem>
                      <SelectItem value="rodents">Gryzonie</SelectItem>
                      <SelectItem value="reptiles">Gady</SelectItem>
                      <SelectItem value="amphibians">Płazy</SelectItem>
                      <SelectItem value="insects">Owady</SelectItem>
                      <SelectItem value="farm">Zwierzęta gospodarskie</SelectItem>
                      <SelectItem value="other">Inne</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>

                <FilterSection title="Stan" icon={<CircleDollarSign size={16} />}>
                  <RadioGroup
                    value={filters.categorySpecificFilters?.condition || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('condition', value === 'all' ? null : value)}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="pet-accessory-condition-all" />
                      <Label htmlFor="pet-accessory-condition-all">Wszystkie</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="new" id="pet-accessory-condition-new" />
                      <Label htmlFor="pet-accessory-condition-new">Nowe</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="used" id="pet-accessory-condition-used" />
                      <Label htmlFor="pet-accessory-condition-used">Używane</Label>
                    </div>
                  </RadioGroup>
                </FilterSection>

                <FilterSection title="Marka" icon={<Bookmark size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.brand || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('brand', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Wybierz markę" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Wszystkie</SelectItem>
                      <SelectItem value="royal_canin">Royal Canin</SelectItem>
                      <SelectItem value="purina">Purina</SelectItem>
                      <SelectItem value="pedigree">Pedigree</SelectItem>
                      <SelectItem value="whiskas">Whiskas</SelectItem>
                      <SelectItem value="acana">Acana</SelectItem>
                      <SelectItem value="hills">Hill's</SelectItem>
                      <SelectItem value="trixie">Trixie</SelectItem>
                      <SelectItem value="kong">Kong</SelectItem>
                      <SelectItem value="zolux">Zolux</SelectItem>
                      <SelectItem value="ferplast">Ferplast</SelectItem>
                      <SelectItem value="sera">Sera</SelectItem>
                      <SelectItem value="tetra">Tetra</SelectItem>
                      <SelectItem value="other">Inne</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>

                {/* Filtry dla karmy i przysmaków */}
                {filters.categorySpecificFilters?.petAccessoryType === 'food' && (
                  <>
                    <FilterSection title="Rodzaj karmy" icon={<UtensilsCrossed size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.foodType || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('foodType', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz rodzaj" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="dry">Sucha</SelectItem>
                          <SelectItem value="wet">Mokra</SelectItem>
                          <SelectItem value="treats">Przysmaki</SelectItem>
                          <SelectItem value="supplements">Suplementy</SelectItem>
                          <SelectItem value="special">Karmy specjalistyczne</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>
                    
                    <FilterSection title="Cechy" icon={<FileSpreadsheet size={16} />}>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-2">
                          <Checkbox 
                            id="food-feature-grain-free" 
                            checked={(filters.categorySpecificFilters?.foodFeatures || []).includes("grain-free")}
                            onCheckedChange={(checked) => {
                              const currentFeatures = filters.categorySpecificFilters?.foodFeatures || [];
                              let newFeatures: string[];
                              
                              if (checked) {
                                newFeatures = [...currentFeatures, "grain-free"];
                              } else {
                                newFeatures = currentFeatures.filter((a: string) => a !== "grain-free");
                              }
                              
                              handleCategorySpecificFilterChange('foodFeatures', newFeatures.length > 0 ? newFeatures : undefined);
                            }}
                          />
                          <Label className="font-medium" htmlFor="food-feature-grain-free">Bezzbożowa</Label>
                        </div>
                        
                        <div className="flex items-start space-x-2">
                          <Checkbox 
                            id="food-feature-hypoallergenic" 
                            checked={(filters.categorySpecificFilters?.foodFeatures || []).includes("hypoallergenic")}
                            onCheckedChange={(checked) => {
                              const currentFeatures = filters.categorySpecificFilters?.foodFeatures || [];
                              let newFeatures: string[];
                              
                              if (checked) {
                                newFeatures = [...currentFeatures, "hypoallergenic"];
                              } else {
                                newFeatures = currentFeatures.filter((a: string) => a !== "hypoallergenic");
                              }
                              
                              handleCategorySpecificFilterChange('foodFeatures', newFeatures.length > 0 ? newFeatures : undefined);
                            }}
                          />
                          <Label className="font-medium" htmlFor="food-feature-hypoallergenic">Hipoalergiczna</Label>
                        </div>
                        
                        <div className="flex items-start space-x-2">
                          <Checkbox 
                            id="food-feature-natural" 
                            checked={(filters.categorySpecificFilters?.foodFeatures || []).includes("natural")}
                            onCheckedChange={(checked) => {
                              const currentFeatures = filters.categorySpecificFilters?.foodFeatures || [];
                              let newFeatures: string[];
                              
                              if (checked) {
                                newFeatures = [...currentFeatures, "natural"];
                              } else {
                                newFeatures = currentFeatures.filter((a: string) => a !== "natural");
                              }
                              
                              handleCategorySpecificFilterChange('foodFeatures', newFeatures.length > 0 ? newFeatures : undefined);
                            }}
                          />
                          <Label className="font-medium" htmlFor="food-feature-natural">Naturalna</Label>
                        </div>
                      </div>
                    </FilterSection>
                  </>
                )}
                
                {/* Filtry dla akwarystyki */}
                {filters.categorySpecificFilters?.petAccessoryType === 'aquarium' && (
                  <>
                    <FilterSection title="Rodzaj produktu" icon={<Droplets size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.aquariumProductType || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('aquariumProductType', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz rodzaj" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="aquariums">Akwaria</SelectItem>
                          <SelectItem value="filters">Filtry</SelectItem>
                          <SelectItem value="heaters">Grzałki</SelectItem>
                          <SelectItem value="lighting">Oświetlenie</SelectItem>
                          <SelectItem value="substrates">Podłoża</SelectItem>
                          <SelectItem value="decorations">Dekoracje</SelectItem>
                          <SelectItem value="plants">Rośliny</SelectItem>
                          <SelectItem value="chemistry">Chemia do wody</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>
                  </>
                )}
              </>
            )}

            {/* Filtry dla Zdrowie i Uroda */}
            {selectedCategoryName === "Zdrowie i Uroda" && (
              <>
                <FilterSection title="Kategoria" icon={<Stethoscope size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.healthCategory || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('healthCategory', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Wybierz kategorię" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Wszystkie</SelectItem>
                      <SelectItem value="cosmetics">Kosmetyki</SelectItem>
                      <SelectItem value="perfumes">Perfumy i zapachy</SelectItem>
                      <SelectItem value="makeup">Makijaż</SelectItem>
                      <SelectItem value="hair">Pielęgnacja włosów</SelectItem>
                      <SelectItem value="face">Pielęgnacja twarzy</SelectItem>
                      <SelectItem value="body">Pielęgnacja ciała</SelectItem>
                      <SelectItem value="nails">Manicure i pedicure</SelectItem>
                      <SelectItem value="supplements">Suplementy diety</SelectItem>
                      <SelectItem value="equipment">Sprzęt medyczny</SelectItem>
                      <SelectItem value="massage">Masaż i relaks</SelectItem>
                      <SelectItem value="devices">Urządzenia kosmetyczne</SelectItem>
                      <SelectItem value="other">Inne</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>

                <FilterSection title="Stan" icon={<CircleDollarSign size={16} />}>
                  <RadioGroup
                    value={filters.categorySpecificFilters?.condition || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('condition', value === 'all' ? null : value)}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="health-condition-all" />
                      <Label htmlFor="health-condition-all">Wszystkie</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="new" id="health-condition-new" />
                      <Label htmlFor="health-condition-new">Nowe</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="open" id="health-condition-open" />
                      <Label htmlFor="health-condition-open">Otwarte (nieużywane)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="used" id="health-condition-used" />
                      <Label htmlFor="health-condition-used">Używane</Label>
                    </div>
                  </RadioGroup>
                </FilterSection>

                {/* Filtry dla kosmetyków */}
                {filters.categorySpecificFilters?.healthCategory === 'cosmetics' && (
                  <>
                    <FilterSection title="Rodzaj kosmetyku" icon={<FileSpreadsheet size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.cosmeticType || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('cosmeticType', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz rodzaj" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="cream">Kremy</SelectItem>
                          <SelectItem value="serum">Serum</SelectItem>
                          <SelectItem value="cleanser">Środki oczyszczające</SelectItem>
                          <SelectItem value="mask">Maseczki</SelectItem>
                          <SelectItem value="scrub">Peelingi</SelectItem>
                          <SelectItem value="oil">Olejki</SelectItem>
                          <SelectItem value="lotion">Balsamy i mleczka</SelectItem>
                          <SelectItem value="other">Inne</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>

                    <FilterSection title="Cechy" icon={<FileSpreadsheet size={16} />}>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-2">
                          <Checkbox 
                            id="cosmetic-feature-natural" 
                            checked={(filters.categorySpecificFilters?.cosmeticFeatures || []).includes("natural")}
                            onCheckedChange={(checked) => {
                              const currentFeatures = filters.categorySpecificFilters?.cosmeticFeatures || [];
                              let newFeatures: string[];
                              
                              if (checked) {
                                newFeatures = [...currentFeatures, "natural"];
                              } else {
                                newFeatures = currentFeatures.filter((a: string) => a !== "natural");
                              }
                              
                              handleCategorySpecificFilterChange('cosmeticFeatures', newFeatures.length > 0 ? newFeatures : undefined);
                            }}
                          />
                          <Label className="font-medium" htmlFor="cosmetic-feature-natural">Naturalne</Label>
                        </div>
                        
                        <div className="flex items-start space-x-2">
                          <Checkbox 
                            id="cosmetic-feature-vegan" 
                            checked={(filters.categorySpecificFilters?.cosmeticFeatures || []).includes("vegan")}
                            onCheckedChange={(checked) => {
                              const currentFeatures = filters.categorySpecificFilters?.cosmeticFeatures || [];
                              let newFeatures: string[];
                              
                              if (checked) {
                                newFeatures = [...currentFeatures, "vegan"];
                              } else {
                                newFeatures = currentFeatures.filter((a: string) => a !== "vegan");
                              }
                              
                              handleCategorySpecificFilterChange('cosmeticFeatures', newFeatures.length > 0 ? newFeatures : undefined);
                            }}
                          />
                          <Label className="font-medium" htmlFor="cosmetic-feature-vegan">Wegańskie</Label>
                        </div>
                        
                        <div className="flex items-start space-x-2">
                          <Checkbox 
                            id="cosmetic-feature-hypoallergenic" 
                            checked={(filters.categorySpecificFilters?.cosmeticFeatures || []).includes("hypoallergenic")}
                            onCheckedChange={(checked) => {
                              const currentFeatures = filters.categorySpecificFilters?.cosmeticFeatures || [];
                              let newFeatures: string[];
                              
                              if (checked) {
                                newFeatures = [...currentFeatures, "hypoallergenic"];
                              } else {
                                newFeatures = currentFeatures.filter((a: string) => a !== "hypoallergenic");
                              }
                              
                              handleCategorySpecificFilterChange('cosmeticFeatures', newFeatures.length > 0 ? newFeatures : undefined);
                            }}
                          />
                          <Label className="font-medium" htmlFor="cosmetic-feature-hypoallergenic">Hipoalergiczne</Label>
                        </div>
                      </div>
                    </FilterSection>
                  </>
                )}

                {/* Filtry dla perfum */}
                {filters.categorySpecificFilters?.healthCategory === 'perfumes' && (
                  <>
                    <FilterSection title="Rodzaj zapachu" icon={<FileSpreadsheet size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.fragranceType || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('fragranceType', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz rodzaj" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="perfume">Perfumy</SelectItem>
                          <SelectItem value="eau_de_parfum">Woda perfumowana</SelectItem>
                          <SelectItem value="eau_de_toilette">Woda toaletowa</SelectItem>
                          <SelectItem value="eau_de_cologne">Woda kolońska</SelectItem>
                          <SelectItem value="body_mist">Mgiełka do ciała</SelectItem>
                          <SelectItem value="other">Inne</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>

                    <FilterSection title="Dla" icon={<FileSpreadsheet size={16} />}>
                      <RadioGroup
                        value={filters.categorySpecificFilters?.fragranceFor || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('fragranceFor', value === 'all' ? null : value)}
                        className="space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="all" id="fragrance-for-all" />
                          <Label htmlFor="fragrance-for-all">Wszystkie</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="women" id="fragrance-for-women" />
                          <Label htmlFor="fragrance-for-women">Dla kobiet</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="men" id="fragrance-for-men" />
                          <Label htmlFor="fragrance-for-men">Dla mężczyzn</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="unisex" id="fragrance-for-unisex" />
                          <Label htmlFor="fragrance-for-unisex">Unisex</Label>
                        </div>
                      </RadioGroup>
                    </FilterSection>
                  </>
                )}

                {/* Filtry dla urządzeń kosmetycznych */}
                {filters.categorySpecificFilters?.healthCategory === 'devices' && (
                  <>
                    <FilterSection title="Rodzaj urządzenia" icon={<FileSpreadsheet size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.deviceType || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('deviceType', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz rodzaj" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="hair_removal">Depilatory</SelectItem>
                          <SelectItem value="facial_cleansing">Szczoteczki do twarzy</SelectItem>
                          <SelectItem value="hair_styling">Urządzenia do stylizacji włosów</SelectItem>
                          <SelectItem value="facial_sauna">Sauny do twarzy</SelectItem>
                          <SelectItem value="massagers">Masażery</SelectItem>
                          <SelectItem value="light_therapy">Urządzenia do światłoterapii</SelectItem>
                          <SelectItem value="other">Inne</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>
                  </>
                )}
              </>
            )}

            {/* Filtry dla Muzyka i Edukacja */}
            {selectedCategoryName === "Muzyka i Edukacja" && (
              <>
                <FilterSection title="Kategoria" icon={<Music size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.musicEduCategory || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('musicEduCategory', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Wybierz kategorię" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Wszystkie</SelectItem>
                      <SelectItem value="instruments">Instrumenty muzyczne</SelectItem>
                      <SelectItem value="equipment">Sprzęt muzyczny</SelectItem>
                      <SelectItem value="accessories">Akcesoria muzyczne</SelectItem>
                      <SelectItem value="books">Książki</SelectItem>
                      <SelectItem value="textbooks">Podręczniki</SelectItem>
                      <SelectItem value="courses">Kursy i szkolenia</SelectItem>
                      <SelectItem value="teaching_materials">Materiały dydaktyczne</SelectItem>
                      <SelectItem value="software">Oprogramowanie edukacyjne</SelectItem>
                      <SelectItem value="other">Inne</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>

                <FilterSection title="Stan" icon={<CircleDollarSign size={16} />}>
                  <RadioGroup
                    value={filters.categorySpecificFilters?.condition || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('condition', value === 'all' ? null : value)}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="music-edu-condition-all" />
                      <Label htmlFor="music-edu-condition-all">Wszystkie</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="new" id="music-edu-condition-new" />
                      <Label htmlFor="music-edu-condition-new">Nowe</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="likeNew" id="music-edu-condition-like-new" />
                      <Label htmlFor="music-edu-condition-like-new">Jak nowe</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="used" id="music-edu-condition-used" />
                      <Label htmlFor="music-edu-condition-used">Używane</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="damaged" id="music-edu-condition-damaged" />
                      <Label htmlFor="music-edu-condition-damaged">Uszkodzone</Label>
                    </div>
                  </RadioGroup>
                </FilterSection>

                {/* Filtry dla instrumentów muzycznych */}
                {filters.categorySpecificFilters?.musicEduCategory === 'instruments' && (
                  <>
                    <FilterSection title="Rodzaj instrumentu" icon={<Music size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.instrumentType || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('instrumentType', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz rodzaj" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="guitars">Gitary</SelectItem>
                          <SelectItem value="pianos">Pianina i fortepiany</SelectItem>
                          <SelectItem value="keyboards">Keyboardy i syntezatory</SelectItem>
                          <SelectItem value="drums">Perkusja i instrumenty perkusyjne</SelectItem>
                          <SelectItem value="wind">Instrumenty dęte</SelectItem>
                          <SelectItem value="strings">Instrumenty smyczkowe</SelectItem>
                          <SelectItem value="traditional">Instrumenty ludowe i etniczne</SelectItem>
                          <SelectItem value="dj">Sprzęt DJ</SelectItem>
                          <SelectItem value="other">Inne</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>
                  </>
                )}

                {/* Filtry dla książek */}
                {filters.categorySpecificFilters?.musicEduCategory === 'books' && (
                  <>
                    <FilterSection title="Rodzaj książki" icon={<BookOpen size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.bookType || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('bookType', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz rodzaj" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="fiction">Literatura piękna</SelectItem>
                          <SelectItem value="nonfiction">Literatura faktu</SelectItem>
                          <SelectItem value="academic">Akademickie</SelectItem>
                          <SelectItem value="children">Dla dzieci</SelectItem>
                          <SelectItem value="dictionaries">Słowniki i encyklopedie</SelectItem>
                          <SelectItem value="foreign">Obcojęzyczne</SelectItem>
                          <SelectItem value="comics">Komiksy</SelectItem>
                          <SelectItem value="other">Inne</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>
                  </>
                )}
              </>
            )}

            {/* Filtry dla Praca */}
            {selectedCategoryName === "Praca" && (
              <>
                <FilterSection title="Rodzaj oferty" icon={<Briefcase size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.jobType || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('jobType', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Wybierz rodzaj" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Wszystkie</SelectItem>
                      <SelectItem value="full_time">Pełny etat</SelectItem>
                      <SelectItem value="part_time">Niepełny etat</SelectItem>
                      <SelectItem value="contract">Umowa zlecenie/o dzieło</SelectItem>
                      <SelectItem value="internship">Staż/praktyka</SelectItem>
                      <SelectItem value="seasonal">Praca sezonowa</SelectItem>
                      <SelectItem value="volunteering">Wolontariat</SelectItem>
                      <SelectItem value="other">Inne</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>

                <FilterSection title="Branża" icon={<Briefcase size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.jobIndustry || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('jobIndustry', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Wybierz branżę" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Wszystkie</SelectItem>
                      <SelectItem value="it">IT / Programowanie</SelectItem>
                      <SelectItem value="sales">Sprzedaż</SelectItem>
                      <SelectItem value="customer_service">Obsługa klienta</SelectItem>
                      <SelectItem value="office">Administracja biurowa</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="finance">Finanse / Księgowość</SelectItem>
                      <SelectItem value="engineering">Inżynieria</SelectItem>
                      <SelectItem value="transport">Transport</SelectItem>
                      <SelectItem value="construction">Budownictwo</SelectItem>
                      <SelectItem value="production">Produkcja</SelectItem>
                      <SelectItem value="gastronomy">Gastronomia</SelectItem>
                      <SelectItem value="education">Edukacja</SelectItem>
                      <SelectItem value="health">Zdrowie / Medycyna</SelectItem>
                      <SelectItem value="beauty">Uroda</SelectItem>
                      <SelectItem value="other">Inne</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>

                <FilterSection title="Tryb pracy" icon={<FileSpreadsheet size={16} />}>
                  <RadioGroup
                    value={filters.categorySpecificFilters?.workMode || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('workMode', value === 'all' ? null : value)}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="work-mode-all" />
                      <Label htmlFor="work-mode-all">Wszystkie</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="office" id="work-mode-office" />
                      <Label htmlFor="work-mode-office">Stacjonarna</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="remote" id="work-mode-remote" />
                      <Label htmlFor="work-mode-remote">Zdalna</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="hybrid" id="work-mode-hybrid" />
                      <Label htmlFor="work-mode-hybrid">Hybrydowa</Label>
                    </div>
                  </RadioGroup>
                </FilterSection>

                <FilterSection title="Wynagrodzenie" icon={<CircleDollarSign size={16} />}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="salary-min">Min (PLN)</Label>
                      <Input
                        id="salary-min"
                        type="number"
                        min={0}
                        value={filters.categorySpecificFilters?.salaryMin || ''}
                        onChange={(e) => handleCategorySpecificFilterChange('salaryMin', e.target.value ? parseInt(e.target.value) : null)}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="salary-max">Max (PLN)</Label>
                      <Input
                        id="salary-max"
                        type="number"
                        min={0}
                        value={filters.categorySpecificFilters?.salaryMax || ''}
                        onChange={(e) => handleCategorySpecificFilterChange('salaryMax', e.target.value ? parseInt(e.target.value) : null)}
                        placeholder="50000"
                      />
                    </div>
                  </div>
                </FilterSection>
              </>
            )}

            {/* Filtry dla Antyki i Kolekcje */}
            {selectedCategoryName === "Antyki i Kolekcje" && (
              <>
                <FilterSection title="Rodzaj" icon={<Gem size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.antiquesType || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('antiquesType', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Wybierz rodzaj" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Wszystkie</SelectItem>
                      <SelectItem value="coins">Monety</SelectItem>
                      <SelectItem value="stamps">Znaczki</SelectItem>
                      <SelectItem value="art">Sztuka i obrazy</SelectItem>
                      <SelectItem value="furniture">Meble</SelectItem>
                      <SelectItem value="watches">Zegarki</SelectItem>
                      <SelectItem value="jewelry">Biżuteria</SelectItem>
                      <SelectItem value="toys">Zabawki</SelectItem>
                      <SelectItem value="militaria">Militaria</SelectItem>
                      <SelectItem value="books">Książki i mapy</SelectItem>
                      <SelectItem value="porcelain">Porcelana i ceramika</SelectItem>
                      <SelectItem value="vinyl">Płyty winylowe</SelectItem>
                      <SelectItem value="cameras">Aparaty fotograficzne</SelectItem>
                      <SelectItem value="postcards">Pocztówki</SelectItem>
                      <SelectItem value="comics">Komiksy</SelectItem>
                      <SelectItem value="other">Inne</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>

                <FilterSection title="Okres" icon={<Clock size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.period || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('period', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Wybierz okres" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Wszystkie</SelectItem>
                      <SelectItem value="prehistoric">Prehistoryczne</SelectItem>
                      <SelectItem value="ancient">Starożytne</SelectItem>
                      <SelectItem value="medieval">Średniowieczne</SelectItem>
                      <SelectItem value="renaissance">Renesans</SelectItem>
                      <SelectItem value="baroque">Barok</SelectItem>
                      <SelectItem value="19th_century">XIX wiek</SelectItem>
                      <SelectItem value="art_nouveau">Secesja</SelectItem>
                      <SelectItem value="art_deco">Art Deco</SelectItem>
                      <SelectItem value="modernist">Modernizm</SelectItem>
                      <SelectItem value="mid_century">Mid-century</SelectItem>
                      <SelectItem value="contemporary">Współczesne</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>

                <FilterSection title="Stan" icon={<CircleDollarSign size={16} />}>
                  <RadioGroup
                    value={filters.categorySpecificFilters?.condition || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('condition', value === 'all' ? null : value)}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="antiques-condition-all" />
                      <Label htmlFor="antiques-condition-all">Wszystkie</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="perfect" id="antiques-condition-perfect" />
                      <Label htmlFor="antiques-condition-perfect">Idealny</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="very_good" id="antiques-condition-very-good" />
                      <Label htmlFor="antiques-condition-very-good">Bardzo dobry</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="good" id="antiques-condition-good" />
                      <Label htmlFor="antiques-condition-good">Dobry</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fair" id="antiques-condition-fair" />
                      <Label htmlFor="antiques-condition-fair">Przeciętny</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="poor" id="antiques-condition-poor" />
                      <Label htmlFor="antiques-condition-poor">Słaby</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="restoration" id="antiques-condition-restoration" />
                      <Label htmlFor="antiques-condition-restoration">Wymaga renowacji</Label>
                    </div>
                  </RadioGroup>
                </FilterSection>

                {/* Filtry dla monet */}
                {filters.categorySpecificFilters?.antiquesType === 'coins' && (
                  <>
                    <FilterSection title="Metal" icon={<FileSpreadsheet size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.coinMetal || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('coinMetal', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz metal" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="gold">Złoto</SelectItem>
                          <SelectItem value="silver">Srebro</SelectItem>
                          <SelectItem value="copper">Miedź</SelectItem>
                          <SelectItem value="bronze">Brąz</SelectItem>
                          <SelectItem value="nickel">Nikiel</SelectItem>
                          <SelectItem value="bimetallic">Bimetale</SelectItem>
                          <SelectItem value="other">Inne</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>

                    <FilterSection title="Pochodzenie" icon={<FileSpreadsheet size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.coinOrigin || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('coinOrigin', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz pochodzenie" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="poland">Polska</SelectItem>
                          <SelectItem value="europe">Europa</SelectItem>
                          <SelectItem value="asia">Azja</SelectItem>
                          <SelectItem value="america">Ameryka</SelectItem>
                          <SelectItem value="africa">Afryka</SelectItem>
                          <SelectItem value="australia">Australia i Oceania</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>
                  </>
                )}

                {/* Filtry dla sztuki */}
                {filters.categorySpecificFilters?.antiquesType === 'art' && (
                  <>
                    <FilterSection title="Technika" icon={<FileSpreadsheet size={16} />}>
                      <Select
                        value={filters.categorySpecificFilters?.artTechnique || "all"}
                        onValueChange={(value) => handleCategorySpecificFilterChange('artTechnique', value === "all" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz technikę" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie</SelectItem>
                          <SelectItem value="oil">Olej</SelectItem>
                          <SelectItem value="acrylic">Akryl</SelectItem>
                          <SelectItem value="watercolor">Akwarela</SelectItem>
                          <SelectItem value="pastel">Pastel</SelectItem>
                          <SelectItem value="drawing">Rysunek</SelectItem>
                          <SelectItem value="graphics">Grafika</SelectItem>
                          <SelectItem value="mixed">Technika mieszana</SelectItem>
                          <SelectItem value="sculpture">Rzeźba</SelectItem>
                          <SelectItem value="other">Inna</SelectItem>
                        </SelectContent>
                      </Select>
                    </FilterSection>
                  </>
                )}
              </>
            )}

            {/* Filtry dla Wypożyczalnia */}
            {selectedCategoryName === "Wypożyczalnia" && (
              <>
                <FilterSection title="Kategoria" icon={<RotateCw size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.rentalCategory || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('rentalCategory', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Wybierz kategorię" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Wszystkie</SelectItem>
                      <SelectItem value="tools">Narzędzia</SelectItem>
                      <SelectItem value="garden">Sprzęt ogrodniczy</SelectItem>
                      <SelectItem value="construction">Sprzęt budowlany</SelectItem>
                      <SelectItem value="cars">Samochody</SelectItem>
                      <SelectItem value="bikes">Rowery</SelectItem>
                      <SelectItem value="motorcycles">Motocykle</SelectItem>
                      <SelectItem value="campers">Kampery i przyczepy</SelectItem>
                      <SelectItem value="boats">Łodzie i skutery wodne</SelectItem>
                      <SelectItem value="sport">Sprzęt sportowy</SelectItem>
                      <SelectItem value="events">Wyposażenie eventowe</SelectItem>
                      <SelectItem value="games">Gry i konsole</SelectItem>
                      <SelectItem value="electronics">Elektronika</SelectItem>
                      <SelectItem value="clothing">Odzież</SelectItem>
                      <SelectItem value="other">Inne</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>

                <FilterSection title="Okres wynajmu" icon={<Calendar size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.rentalPeriod || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('rentalPeriod', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Wybierz okres" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Wszystkie</SelectItem>
                      <SelectItem value="hour">Godzinowy</SelectItem>
                      <SelectItem value="day">Dobowy</SelectItem>
                      <SelectItem value="weekend">Weekendowy</SelectItem>
                      <SelectItem value="week">Tygodniowy</SelectItem>
                      <SelectItem value="month">Miesięczny</SelectItem>
                      <SelectItem value="other">Inny</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>

                <FilterSection title="Cechy" icon={<FileSpreadsheet size={16} />}>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="rental-feature-delivery" 
                        checked={(filters.categorySpecificFilters?.rentalFeatures || []).includes("delivery")}
                        onCheckedChange={(checked) => {
                          const currentFeatures = filters.categorySpecificFilters?.rentalFeatures || [];
                          let newFeatures: string[];
                          
                          if (checked) {
                            newFeatures = [...currentFeatures, "delivery"];
                          } else {
                            newFeatures = currentFeatures.filter((a: string) => a !== "delivery");
                          }
                          
                          handleCategorySpecificFilterChange('rentalFeatures', newFeatures.length > 0 ? newFeatures : undefined);
                        }}
                      />
                      <Label className="font-medium" htmlFor="rental-feature-delivery">Z dostawą</Label>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="rental-feature-pickup" 
                        checked={(filters.categorySpecificFilters?.rentalFeatures || []).includes("pickup")}
                        onCheckedChange={(checked) => {
                          const currentFeatures = filters.categorySpecificFilters?.rentalFeatures || [];
                          let newFeatures: string[];
                          
                          if (checked) {
                            newFeatures = [...currentFeatures, "pickup"];
                          } else {
                            newFeatures = currentFeatures.filter((a: string) => a !== "pickup");
                          }
                          
                          handleCategorySpecificFilterChange('rentalFeatures', newFeatures.length > 0 ? newFeatures : undefined);
                        }}
                      />
                      <Label className="font-medium" htmlFor="rental-feature-pickup">Z odbiorem</Label>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="rental-feature-insurance" 
                        checked={(filters.categorySpecificFilters?.rentalFeatures || []).includes("insurance")}
                        onCheckedChange={(checked) => {
                          const currentFeatures = filters.categorySpecificFilters?.rentalFeatures || [];
                          let newFeatures: string[];
                          
                          if (checked) {
                            newFeatures = [...currentFeatures, "insurance"];
                          } else {
                            newFeatures = currentFeatures.filter((a: string) => a !== "insurance");
                          }
                          
                          handleCategorySpecificFilterChange('rentalFeatures', newFeatures.length > 0 ? newFeatures : undefined);
                        }}
                      />
                      <Label className="font-medium" htmlFor="rental-feature-insurance">Z ubezpieczeniem</Label>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="rental-feature-deposit" 
                        checked={(filters.categorySpecificFilters?.rentalFeatures || []).includes("noDeposit")}
                        onCheckedChange={(checked) => {
                          const currentFeatures = filters.categorySpecificFilters?.rentalFeatures || [];
                          let newFeatures: string[];
                          
                          if (checked) {
                            newFeatures = [...currentFeatures, "noDeposit"];
                          } else {
                            newFeatures = currentFeatures.filter((a: string) => a !== "noDeposit");
                          }
                          
                          handleCategorySpecificFilterChange('rentalFeatures', newFeatures.length > 0 ? newFeatures : undefined);
                        }}
                      />
                      <Label className="font-medium" htmlFor="rental-feature-deposit">Bez kaucji</Label>
                    </div>
                  </div>
                </FilterSection>
              </>
            )}

            {/* Filtry dla Noclegi */}
            {selectedCategoryName === "Noclegi" && (
              <>
                <FilterSection title="Rodzaj zakwaterowania" icon={<Hotel size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.accommodationType || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('accommodationType', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Wybierz rodzaj" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Wszystkie</SelectItem>
                      <SelectItem value="apartment">Apartament</SelectItem>
                      <SelectItem value="house">Dom</SelectItem>
                      <SelectItem value="room">Pokój</SelectItem>
                      <SelectItem value="hotel">Hotel</SelectItem>
                      <SelectItem value="hostel">Hostel</SelectItem>
                      <SelectItem value="guest_house">Pensjonat</SelectItem>
                      <SelectItem value="cottage">Domek letniskowy</SelectItem>
                      <SelectItem value="camping">Camping</SelectItem>
                      <SelectItem value="agritourism">Agroturystyka</SelectItem>
                      <SelectItem value="other">Inne</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>

                <FilterSection title="Liczba gości" icon={<User size={16} />}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="guests-min">Min</Label>
                      <Input
                        id="guests-min"
                        type="number"
                        min={1}
                        value={filters.categorySpecificFilters?.guestsMin || ''}
                        onChange={(e) => handleCategorySpecificFilterChange('guestsMin', e.target.value ? parseInt(e.target.value) : null)}
                        placeholder="1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="guests-max">Max</Label>
                      <Input
                        id="guests-max"
                        type="number"
                        min={1}
                        value={filters.categorySpecificFilters?.guestsMax || ''}
                        onChange={(e) => handleCategorySpecificFilterChange('guestsMax', e.target.value ? parseInt(e.target.value) : null)}
                        placeholder="10"
                      />
                    </div>
                  </div>
                </FilterSection>

                <FilterSection title="Lokalizacja" icon={<MapPin size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.accommodationLocation || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('accommodationLocation', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Wybierz lokalizację" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Wszystkie</SelectItem>
                      <SelectItem value="mountains">Góry</SelectItem>
                      <SelectItem value="sea">Morze</SelectItem>
                      <SelectItem value="lake">Jezioro</SelectItem>
                      <SelectItem value="forest">Las</SelectItem>
                      <SelectItem value="city">Miasto</SelectItem>
                      <SelectItem value="countryside">Wieś</SelectItem>
                      <SelectItem value="other">Inna</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>

                <FilterSection title="Udogodnienia" icon={<FileSpreadsheet size={16} />}>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="accommodation-feature-wifi" 
                        checked={(filters.categorySpecificFilters?.accommodationFeatures || []).includes("wifi")}
                        onCheckedChange={(checked) => {
                          const currentFeatures = filters.categorySpecificFilters?.accommodationFeatures || [];
                          let newFeatures: string[];
                          
                          if (checked) {
                            newFeatures = [...currentFeatures, "wifi"];
                          } else {
                            newFeatures = currentFeatures.filter((a: string) => a !== "wifi");
                          }
                          
                          handleCategorySpecificFilterChange('accommodationFeatures', newFeatures.length > 0 ? newFeatures : undefined);
                        }}
                      />
                      <Label className="font-medium" htmlFor="accommodation-feature-wifi">Wi-Fi</Label>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="accommodation-feature-parking" 
                        checked={(filters.categorySpecificFilters?.accommodationFeatures || []).includes("parking")}
                        onCheckedChange={(checked) => {
                          const currentFeatures = filters.categorySpecificFilters?.accommodationFeatures || [];
                          let newFeatures: string[];
                          
                          if (checked) {
                            newFeatures = [...currentFeatures, "parking"];
                          } else {
                            newFeatures = currentFeatures.filter((a: string) => a !== "parking");
                          }
                          
                          handleCategorySpecificFilterChange('accommodationFeatures', newFeatures.length > 0 ? newFeatures : undefined);
                        }}
                      />
                      <Label className="font-medium" htmlFor="accommodation-feature-parking">Parking</Label>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="accommodation-feature-kitchen" 
                        checked={(filters.categorySpecificFilters?.accommodationFeatures || []).includes("kitchen")}
                        onCheckedChange={(checked) => {
                          const currentFeatures = filters.categorySpecificFilters?.accommodationFeatures || [];
                          let newFeatures: string[];
                          
                          if (checked) {
                            newFeatures = [...currentFeatures, "kitchen"];
                          } else {
                            newFeatures = currentFeatures.filter((a: string) => a !== "kitchen");
                          }
                          
                          handleCategorySpecificFilterChange('accommodationFeatures', newFeatures.length > 0 ? newFeatures : undefined);
                        }}
                      />
                      <Label className="font-medium" htmlFor="accommodation-feature-kitchen">Kuchnia</Label>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="accommodation-feature-breakfast" 
                        checked={(filters.categorySpecificFilters?.accommodationFeatures || []).includes("breakfast")}
                        onCheckedChange={(checked) => {
                          const currentFeatures = filters.categorySpecificFilters?.accommodationFeatures || [];
                          let newFeatures: string[];
                          
                          if (checked) {
                            newFeatures = [...currentFeatures, "breakfast"];
                          } else {
                            newFeatures = currentFeatures.filter((a: string) => a !== "breakfast");
                          }
                          
                          handleCategorySpecificFilterChange('accommodationFeatures', newFeatures.length > 0 ? newFeatures : undefined);
                        }}
                      />
                      <Label className="font-medium" htmlFor="accommodation-feature-breakfast">Śniadanie</Label>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="accommodation-feature-ac" 
                        checked={(filters.categorySpecificFilters?.accommodationFeatures || []).includes("ac")}
                        onCheckedChange={(checked) => {
                          const currentFeatures = filters.categorySpecificFilters?.accommodationFeatures || [];
                          let newFeatures: string[];
                          
                          if (checked) {
                            newFeatures = [...currentFeatures, "ac"];
                          } else {
                            newFeatures = currentFeatures.filter((a: string) => a !== "ac");
                          }
                          
                          handleCategorySpecificFilterChange('accommodationFeatures', newFeatures.length > 0 ? newFeatures : undefined);
                        }}
                      />
                      <Label className="font-medium" htmlFor="accommodation-feature-ac">Klimatyzacja</Label>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="accommodation-feature-pets" 
                        checked={(filters.categorySpecificFilters?.accommodationFeatures || []).includes("pets")}
                        onCheckedChange={(checked) => {
                          const currentFeatures = filters.categorySpecificFilters?.accommodationFeatures || [];
                          let newFeatures: string[];
                          
                          if (checked) {
                            newFeatures = [...currentFeatures, "pets"];
                          } else {
                            newFeatures = currentFeatures.filter((a: string) => a !== "pets");
                          }
                          
                          handleCategorySpecificFilterChange('accommodationFeatures', newFeatures.length > 0 ? newFeatures : undefined);
                        }}
                      />
                      <Label className="font-medium" htmlFor="accommodation-feature-pets">Zwierzęta mile widziane</Label>
                    </div>
                  </div>
                </FilterSection>
              </>
            )}

            {/* Filtry dla Firma i Przemysł */}
            {selectedCategoryName === "Firma i Przemysł" && (
              <>
                <FilterSection title="Kategoria" icon={<Briefcase size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.businessCategory || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('businessCategory', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Wybierz kategorię" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Wszystkie</SelectItem>
                      <SelectItem value="equipment">Maszyny i urządzenia</SelectItem>
                      <SelectItem value="materials">Materiały i surowce</SelectItem>
                      <SelectItem value="office">Wyposażenie biura</SelectItem>
                      <SelectItem value="retail">Wyposażenie sklepu</SelectItem>
                      <SelectItem value="gastronomy">Gastronomia</SelectItem>
                      <SelectItem value="storage">Magazynowanie</SelectItem>
                      <SelectItem value="packaging">Opakowania</SelectItem>
                      <SelectItem value="services">Usługi dla firm</SelectItem>
                      <SelectItem value="other">Inne</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>

                <FilterSection title="Stan" icon={<CircleDollarSign size={16} />}>
                  <RadioGroup
                    value={filters.categorySpecificFilters?.condition || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('condition', value === 'all' ? null : value)}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="business-condition-all" />
                      <Label htmlFor="business-condition-all">Wszystkie</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="new" id="business-condition-new" />
                      <Label htmlFor="business-condition-new">Nowe</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="used" id="business-condition-used" />
                      <Label htmlFor="business-condition-used">Używane</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="refurbished" id="business-condition-refurbished" />
                      <Label htmlFor="business-condition-refurbished">Odnowione</Label>
                    </div>
                  </RadioGroup>
                </FilterSection>
              </>
            )}
          </div>
          
          <div className="mt-4 flex justify-end">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleResetCategoryFilters}
              className="text-sm"
            >
              <XCircle className="mr-2 h-4 w-4" />
              {t("filters.resetCategoryFilters")}
            </Button>
          </div>
        </div>
      )}
      
      {/* Przycisk resetowania */}
      <div className="mt-6 flex justify-center">
        <Button 
          variant="outline" 
          onClick={handleResetFilters} 
          className="w-full max-w-xs"
        >
          <XCircle className="mr-2 h-4 w-4" />
          {t("filters.resetAll")}
        </Button>
      </div>
    </div>
  );
}