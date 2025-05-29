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
  ChevronDown,
  Sliders,
  ArrowUpDown,
  XCircle,
  MapPin,
  Calendar,
  Tag,
  Truck,
  User,
  Car,
  Home,
  Smartphone,
  ShoppingBag,
  Tractor,
  Tv,
  Laptop,
  Headphones,
  Camera,
  Gamepad,
  Shirt,
  ShoppingCart,
  Sofa,
  Flower,
  Hammer,
  Wrench,
  Briefcase,
  Music,
  GraduationCap,
  Gem,
  Clock,
  Stethoscope,
  RotateCw,
  Gift,
  Hotel,
  FolderOpen,
  Baby,
  Dog,
  CircleDollarSign,
  FileSpreadsheet,
  BookOpen,
  Dumbbell,
  Bike,
  Mountain,
  UtensilsCrossed,
  Building,
  Bookmark,
  LandPlot,
  PiggyBank,
  UtensilsCrossed,
  Building,
  Bookmark,
  LayoutGrid,
  Maximize2,
  List,
  Grid,
  SquareAsterisk,
  CircleDollarSign,
  FileSpreadsheet,
  Hand,
  Heart,
  LandPlot,
  Droplet,
  Gauge,
} from "lucide-react";
import { getFiltersForCategory } from "@/lib/category-filters";
import { useIsMobile } from "@/hooks/use-mobile";

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

// Komponent sekcji filtrów
function FilterSection({ 
  title, 
  icon, 
  children
}: { 
  title: string; 
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="text-blue-600 dark:text-blue-400">{icon}</div>
        <h3 className="font-medium text-gray-900 dark:text-gray-100">{title}</h3>
      </div>
      <div className="ml-6">{children}</div>
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
  
  // Resetowanie wszystkich filtrów do wartości domyślnych
  const handleResetFilters = () => {
    const resetFilters = {
      ...currentFilters,
      minPrice: null,
      maxPrice: null,
      location: null,
      datePosted: null,
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
    const resetFilters = {
      ...filters,
      categorySpecificFilters: undefined
    };
    setFilters(resetFilters);
    if (onFilterChange) {
      onFilterChange(resetFilters);
    }
  };
  
  // Obsługa zmiany opcji sortowania
  const handleSortChange = (value: string) => {
    if (onSortChange) {
      onSortChange(value);
    }
    handleFilterChange('sortBy', value);
  };
  
  return (
    <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4">
      {/* Filtry kategorii - zawsze widoczne */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          {t("filters.categories")}
        </h2>
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={selectedCategory === null ? "default" : "outline"}
            className="cursor-pointer px-3 py-1 text-sm"
            onClick={() => onCategoryChange(null)}
          >
            {t("categories.all")}
          </Badge>
          
          {categories.map((category) => (
            <Badge
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className="cursor-pointer px-3 py-1 text-sm"
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
              <FilterSection title={t("filters.price.title")} icon={<Tag size={16} />}>
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
              <FilterSection title={t("filters.location.title")} icon={<MapPin size={16} />}>
                <Input
                  placeholder={t("filters.location.placeholder")}
                  value={filters.location || ''}
                  onChange={(e) => handleFilterChange('location', e.target.value || null)}
                />
              </FilterSection>
              
              {/* Data dodania */}
              <FilterSection title={t("filters.datePosted.title")} icon={<Calendar size={16} />}>
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
              {/* Stan */}
              <FilterSection title={t("filters.condition.title")} icon={<CircleDollarSign size={16} />}>
                <RadioGroup
                  value={filters.condition || "any"}
                  onValueChange={(value) => handleFilterChange('condition', value === 'any' ? undefined : value)}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="any" id="condition-any" />
                    <Label htmlFor="condition-any">{t("filters.condition.any")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="new" id="condition-new" />
                    <Label htmlFor="condition-new">{t("filters.condition.new")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="used" id="condition-used" />
                    <Label htmlFor="condition-used">{t("filters.condition.used")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="damaged" id="condition-damaged" />
                    <Label htmlFor="condition-damaged">{t("filters.condition.damaged")}</Label>
                  </div>
                </RadioGroup>
              </FilterSection>
              
              {/* Opcje dostawy */}
              <FilterSection title={t("filters.delivery.title")} icon={<Truck size={16} />}>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="delivery-shipping" 
                      checked={filters.deliveryOptions?.includes('shipping')}
                      onCheckedChange={(checked) => {
                        const current = filters.deliveryOptions || [];
                        const updated = checked 
                          ? [...current, 'shipping'] 
                          : current.filter(option => option !== 'shipping');
                        handleFilterChange('deliveryOptions', updated);
                      }} 
                    />
                    <Label htmlFor="delivery-shipping">{t("filters.delivery.shipping")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="delivery-personal" 
                      checked={filters.deliveryOptions?.includes('personal')}
                      onCheckedChange={(checked) => {
                        const current = filters.deliveryOptions || [];
                        const updated = checked 
                          ? [...current, 'personal'] 
                          : current.filter(option => option !== 'personal');
                        handleFilterChange('deliveryOptions', updated);
                      }} 
                    />
                    <Label htmlFor="delivery-personal">{t("filters.delivery.personal")}</Label>
                  </div>
                </div>
              </FilterSection>
              
              {/* Typ sprzedającego */}
              <FilterSection title={t("filters.sellerType.title")} icon={<User size={16} />}>
                <RadioGroup
                  value={filters.sellerType || "all"}
                  onValueChange={(value) => handleFilterChange('sellerType', value === 'all' ? null : value)}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="seller-all" />
                    <Label htmlFor="seller-all">{t("filters.sellerType.all")}</Label>
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
      )}
      
      {/* Filtry specyficzne dla kategorii */}
      {selectedCategoryName && (
        <div className="mt-4 p-2">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4 bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
            {t("filters.categorySpecific")}
          </h3>
          
          <div className="flex flex-col md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-3">
            {/* Filtry dla Zwierzęta */}
            {selectedCategoryName === "Zwierzęta" && (
              <>
                <FilterSection title={t("filters.animals.type")} icon={<Dog size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.type || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('type', value === "all" ? null : value)}
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
                      <SelectItem value="reptiles">{t("filters.animals.reptiles")}</SelectItem>
                      <SelectItem value="small_mammals">{t("filters.animals.smallMammals")}</SelectItem>
                      <SelectItem value="farm_animals">{t("filters.animals.farmAnimals")}</SelectItem>
                      <SelectItem value="exotic">{t("filters.animals.exotic")}</SelectItem>
                      <SelectItem value="insects">{t("filters.animals.insects")}</SelectItem>
                      <SelectItem value="accessories">{t("filters.animals.accessories")}</SelectItem>
                      <SelectItem value="food">{t("filters.animals.food")}</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>
                
                <FilterSection title={t("filters.animals.age")} icon={<Calendar size={16} />}>
                  <RadioGroup
                    value={filters.categorySpecificFilters?.age || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('age', value === 'all' ? null : value)}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="animal-age-all" />
                      <Label htmlFor="animal-age-all">{t("filters.all")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="baby" id="animal-age-baby" />
                      <Label htmlFor="animal-age-baby">{t("filters.animals.ageBaby")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="young" id="animal-age-young" />
                      <Label htmlFor="animal-age-young">{t("filters.animals.ageYoung")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="adult" id="animal-age-adult" />
                      <Label htmlFor="animal-age-adult">{t("filters.animals.ageAdult")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="senior" id="animal-age-senior" />
                      <Label htmlFor="animal-age-senior">{t("filters.animals.ageSenior")}</Label>
                    </div>
                  </RadioGroup>
                </FilterSection>
                
                <FilterSection title={t("filters.animals.purpose")} icon={<Heart size={16} />}>
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
            
            {/* Filtry dla Nieruchomości */}
            {selectedCategoryName === "Nieruchomości" && (
              <>
                <FilterSection title={t("filters.realestate.type")} icon={<Home size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.type || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('type', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("filters.realestate.typePlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("filters.all")}</SelectItem>
                      <SelectItem value="apartment">{t("filters.realestate.apartment")}</SelectItem>
                      <SelectItem value="house">{t("filters.realestate.house")}</SelectItem>
                      <SelectItem value="land">{t("filters.realestate.land")}</SelectItem>
                      <SelectItem value="commercial">{t("filters.realestate.commercial")}</SelectItem>
                      <SelectItem value="garage">{t("filters.realestate.garage")}</SelectItem>
                      <SelectItem value="room">{t("filters.realestate.room")}</SelectItem>
                      <SelectItem value="office">{t("filters.realestate.office")}</SelectItem>
                      <SelectItem value="hall">{t("filters.realestate.hall")}</SelectItem>
                      <SelectItem value="vacation">{t("filters.realestate.vacation")}</SelectItem>
                      <SelectItem value="agricultural">{t("filters.realestate.agricultural")}</SelectItem>
                      <SelectItem value="investment">{t("filters.realestate.investment")}</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>
                
                <FilterSection title={t("filters.realestate.surface")} icon={<Maximize2 size={16} />}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="area-min">{t("filters.min")}</Label>
                      <Input
                        id="area-min"
                        type="number"
                        min={0}
                        placeholder={t("filters.realestate.surfaceMin")}
                        value={filters.categorySpecificFilters?.surfaceMin || ''}
                        onChange={(e) => handleCategorySpecificFilterChange('surfaceMin', e.target.value ? Number(e.target.value) : null)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="area-max">{t("filters.max")}</Label>
                      <Input
                        id="area-max"
                        type="number"
                        min={0}
                        placeholder={t("filters.realestate.surfaceMax")}
                        value={filters.categorySpecificFilters?.surfaceMax || ''}
                        onChange={(e) => handleCategorySpecificFilterChange('surfaceMax', e.target.value ? Number(e.target.value) : null)}
                      />
                    </div>
                  </div>
                </FilterSection>
                
                <FilterSection title={t("filters.realestate.rooms")} icon={<LayoutGrid size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.rooms || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('rooms', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("filters.realestate.roomsPlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("filters.all")}</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5+">5+</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>
                
                <FilterSection title={t("filters.realestate.floor")} icon={<LandPlot size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.floor || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('floor', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("filters.realestate.floorPlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("filters.all")}</SelectItem>
                      <SelectItem value="basement">{t("filters.realestate.basement")}</SelectItem>
                      <SelectItem value="ground">{t("filters.realestate.groundFloor")}</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5+">{t("filters.realestate.floor5Plus")}</SelectItem>
                      <SelectItem value="attic">{t("filters.realestate.attic")}</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>
                
                <FilterSection title={t("filters.realestate.marketType")} icon={<Building size={16} />}>
                  <RadioGroup
                    value={filters.categorySpecificFilters?.marketType || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('marketType', value === 'all' ? null : value)}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="market-type-all" />
                      <Label htmlFor="market-type-all">{t("filters.all")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="primary" id="market-type-primary" />
                      <Label htmlFor="market-type-primary">{t("filters.realestate.primary")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="secondary" id="market-type-secondary" />
                      <Label htmlFor="market-type-secondary">{t("filters.realestate.secondary")}</Label>
                    </div>
                  </RadioGroup>
                </FilterSection>
              </>
            )}
            
            {/* Filtry dla Dom i Ogród */}
            {selectedCategoryName === "Dom i Ogród" && (
              <>
                <FilterSection title={t("filters.homeGarden.type")} icon={<Sofa size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.homeType || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('homeType', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("filters.homeGarden.typePlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("filters.all")}</SelectItem>
                      <SelectItem value="furniture">{t("filters.homeGarden.furniture")}</SelectItem>
                      <SelectItem value="appliances">{t("filters.homeGarden.appliances")}</SelectItem>
                      <SelectItem value="garden">{t("filters.homeGarden.garden")}</SelectItem>
                      <SelectItem value="tools">{t("filters.homeGarden.tools")}</SelectItem>
                      <SelectItem value="decoration">{t("filters.homeGarden.decoration")}</SelectItem>
                      <SelectItem value="kitchen">{t("filters.homeGarden.kitchen")}</SelectItem>
                      <SelectItem value="bathroom">{t("filters.homeGarden.bathroom")}</SelectItem>
                      <SelectItem value="lighting">{t("filters.homeGarden.lighting")}</SelectItem>
                      <SelectItem value="textiles">{t("filters.homeGarden.textiles")}</SelectItem>
                      <SelectItem value="storage">{t("filters.homeGarden.storage")}</SelectItem>
                      <SelectItem value="other">{t("filters.homeGarden.other")}</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>

                <FilterSection title={t("filters.homeGarden.condition")} icon={<CircleDollarSign size={16} />}>
                  <RadioGroup
                    value={filters.categorySpecificFilters?.homeCondition || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('homeCondition', value === 'all' ? null : value)}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="home-condition-all" />
                      <Label htmlFor="home-condition-all">{t("filters.all")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="new" id="home-condition-new" />
                      <Label htmlFor="home-condition-new">{t("filters.homeGarden.new")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="used" id="home-condition-used" />
                      <Label htmlFor="home-condition-used">{t("filters.homeGarden.used")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="refurbished" id="home-condition-refurbished" />
                      <Label htmlFor="home-condition-refurbished">{t("filters.homeGarden.refurbished")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="damaged" id="home-condition-damaged" />
                      <Label htmlFor="home-condition-damaged">{t("filters.homeGarden.damaged")}</Label>
                    </div>
                  </RadioGroup>
                </FilterSection>

                <FilterSection title={t("filters.homeGarden.material")} icon={<FileSpreadsheet size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.material || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('material', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("filters.homeGarden.materialPlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("filters.all")}</SelectItem>
                      <SelectItem value="wood">{t("filters.homeGarden.wood")}</SelectItem>
                      <SelectItem value="metal">{t("filters.homeGarden.metal")}</SelectItem>
                      <SelectItem value="plastic">{t("filters.homeGarden.plastic")}</SelectItem>
                      <SelectItem value="glass">{t("filters.homeGarden.glass")}</SelectItem>
                      <SelectItem value="fabric">{t("filters.homeGarden.fabric")}</SelectItem>
                      <SelectItem value="leather">{t("filters.homeGarden.leather")}</SelectItem>
                      <SelectItem value="ceramic">{t("filters.homeGarden.ceramic")}</SelectItem>
                      <SelectItem value="stone">{t("filters.homeGarden.stone")}</SelectItem>
                      <SelectItem value="composite">{t("filters.homeGarden.composite")}</SelectItem>
                      <SelectItem value="other">{t("filters.homeGarden.otherMaterial")}</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>
              </>
            )}
            
            {/* Filtry dla Moda */}
            {selectedCategoryName === "Moda" && (
              <>
                <FilterSection title={t("filters.fashion.type")} icon={<Shirt size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.fashionType || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('fashionType', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("filters.fashion.typePlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("filters.all")}</SelectItem>
                      <SelectItem value="clothing">{t("filters.fashion.clothing")}</SelectItem>
                      <SelectItem value="shoes">{t("filters.fashion.shoes")}</SelectItem>
                      <SelectItem value="accessories">{t("filters.fashion.accessories")}</SelectItem>
                      <SelectItem value="bags">{t("filters.fashion.bags")}</SelectItem>
                      <SelectItem value="jewelry">{t("filters.fashion.jewelry")}</SelectItem>
                      <SelectItem value="watches">{t("filters.fashion.watches")}</SelectItem>
                      <SelectItem value="cosmetics">{t("filters.fashion.cosmetics")}</SelectItem>
                      <SelectItem value="perfumes">{t("filters.fashion.perfumes")}</SelectItem>
                      <SelectItem value="other">{t("filters.fashion.other")}</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>
                
                <FilterSection title={t("filters.fashion.gender")} icon={<User size={16} />}>
                  <RadioGroup
                    value={filters.categorySpecificFilters?.gender || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('gender', value === 'all' ? null : value)}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="gender-all" />
                      <Label htmlFor="gender-all">{t("filters.all")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="women" id="gender-women" />
                      <Label htmlFor="gender-women">{t("filters.fashion.women")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="men" id="gender-men" />
                      <Label htmlFor="gender-men">{t("filters.fashion.men")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="children" id="gender-children" />
                      <Label htmlFor="gender-children">{t("filters.fashion.children")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="unisex" id="gender-unisex" />
                      <Label htmlFor="gender-unisex">{t("filters.fashion.unisex")}</Label>
                    </div>
                  </RadioGroup>
                </FilterSection>
                
                <FilterSection title={t("filters.fashion.size")} icon={<Maximize2 size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.size || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('size', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("filters.fashion.sizePlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("filters.all")}</SelectItem>
                      <SelectItem value="xs">XS</SelectItem>
                      <SelectItem value="s">S</SelectItem>
                      <SelectItem value="m">M</SelectItem>
                      <SelectItem value="l">L</SelectItem>
                      <SelectItem value="xl">XL</SelectItem>
                      <SelectItem value="xxl">XXL</SelectItem>
                      <SelectItem value="one_size">{t("filters.fashion.oneSize")}</SelectItem>
                      <SelectItem value="various">{t("filters.fashion.various")}</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>
                
                <FilterSection title={t("filters.fashion.condition")} icon={<CircleDollarSign size={16} />}>
                  <RadioGroup
                    value={filters.categorySpecificFilters?.fashionCondition || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('fashionCondition', value === 'all' ? null : value)}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="fashion-condition-all" />
                      <Label htmlFor="fashion-condition-all">{t("filters.all")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="new" id="fashion-condition-new" />
                      <Label htmlFor="fashion-condition-new">{t("filters.fashion.new")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="like_new" id="fashion-condition-like-new" />
                      <Label htmlFor="fashion-condition-like-new">{t("filters.fashion.likeNew")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="good" id="fashion-condition-good" />
                      <Label htmlFor="fashion-condition-good">{t("filters.fashion.good")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="used" id="fashion-condition-used" />
                      <Label htmlFor="fashion-condition-used">{t("filters.fashion.used")}</Label>
                    </div>
                  </RadioGroup>
                </FilterSection>
              </>
            )}
              
            {/* Filtry dla Motoryzacja */}
            {selectedCategoryName === "Motoryzacja" && (
              <>
                <FilterSection title={t("filters.auto.vehicleType")} icon={<Car size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.vehicleType || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('vehicleType', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("filters.auto.vehicleTypePlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("filters.all")}</SelectItem>
                      <SelectItem value="cars">{t("filters.auto.cars")}</SelectItem>
                      <SelectItem value="motorcycles">{t("filters.auto.motorcycles")}</SelectItem>
                      <SelectItem value="trucks">{t("filters.auto.trucks")}</SelectItem>
                      <SelectItem value="buses">{t("filters.auto.buses")}</SelectItem>
                      <SelectItem value="vans">{t("filters.auto.vans")}</SelectItem>
                      <SelectItem value="agricultural">{t("filters.auto.agricultural")}</SelectItem>
                      <SelectItem value="construction">{t("filters.auto.construction")}</SelectItem>
                      <SelectItem value="trailers">{t("filters.auto.trailers")}</SelectItem>
                      <SelectItem value="parts">{t("filters.auto.parts")}</SelectItem>
                      <SelectItem value="accessories">{t("filters.auto.accessories")}</SelectItem>
                      <SelectItem value="other">{t("filters.auto.other")}</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>
                
                <FilterSection title={t("filters.auto.brand")} icon={<Bookmark size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.carBrand || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('carBrand', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("filters.auto.brandPlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("filters.all")}</SelectItem>
                      <SelectItem value="audi">Audi</SelectItem>
                      <SelectItem value="bmw">BMW</SelectItem>
                      <SelectItem value="citroen">Citroën</SelectItem>
                      <SelectItem value="dacia">Dacia</SelectItem>
                      <SelectItem value="fiat">Fiat</SelectItem>
                      <SelectItem value="ford">Ford</SelectItem>
                      <SelectItem value="honda">Honda</SelectItem>
                      <SelectItem value="hyundai">Hyundai</SelectItem>
                      <SelectItem value="kia">Kia</SelectItem>
                      <SelectItem value="mazda">Mazda</SelectItem>
                      <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
                      <SelectItem value="nissan">Nissan</SelectItem>
                      <SelectItem value="opel">Opel</SelectItem>
                      <SelectItem value="peugeot">Peugeot</SelectItem>
                      <SelectItem value="renault">Renault</SelectItem>
                      <SelectItem value="seat">Seat</SelectItem>
                      <SelectItem value="skoda">Škoda</SelectItem>
                      <SelectItem value="toyota">Toyota</SelectItem>
                      <SelectItem value="volkswagen">Volkswagen</SelectItem>
                      <SelectItem value="volvo">Volvo</SelectItem>
                      <SelectItem value="other">{t("filters.auto.otherBrand")}</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>
                
                <FilterSection title={t("filters.auto.year")} icon={<Calendar size={16} />}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="year-min">{t("filters.min")}</Label>
                      <Input
                        id="year-min"
                        type="number"
                        min={1900}
                        max={2025}
                        placeholder={t("filters.auto.yearMin")}
                        value={filters.categorySpecificFilters?.yearMin || ''}
                        onChange={(e) => handleCategorySpecificFilterChange('yearMin', e.target.value ? Number(e.target.value) : null)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="year-max">{t("filters.max")}</Label>
                      <Input
                        id="year-max"
                        type="number"
                        min={1900}
                        max={2025}
                        placeholder={t("filters.auto.yearMax")}
                        value={filters.categorySpecificFilters?.yearMax || ''}
                        onChange={(e) => handleCategorySpecificFilterChange('yearMax', e.target.value ? Number(e.target.value) : null)}
                      />
                    </div>
                  </div>
                </FilterSection>
                
                <FilterSection title={t("filters.auto.fuel")} icon={<Droplet size={16} />}>
                  <RadioGroup
                    value={filters.categorySpecificFilters?.fuel || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('fuel', value === 'all' ? null : value)}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="fuel-all" />
                      <Label htmlFor="fuel-all">{t("filters.all")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="petrol" id="fuel-petrol" />
                      <Label htmlFor="fuel-petrol">{t("filters.auto.petrol")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="diesel" id="fuel-diesel" />
                      <Label htmlFor="fuel-diesel">{t("filters.auto.diesel")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="electric" id="fuel-electric" />
                      <Label htmlFor="fuel-electric">{t("filters.auto.electric")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="hybrid" id="fuel-hybrid" />
                      <Label htmlFor="fuel-hybrid">{t("filters.auto.hybrid")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="lpg" id="fuel-lpg" />
                      <Label htmlFor="fuel-lpg">{t("filters.auto.lpg")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="fuel-other" />
                      <Label htmlFor="fuel-other">{t("filters.auto.otherFuel")}</Label>
                    </div>
                  </RadioGroup>
                </FilterSection>
                
                <FilterSection title={t("filters.auto.mileage")} icon={<Gauge size={16} />}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="mileage-min">{t("filters.min")}</Label>
                      <Input
                        id="mileage-min"
                        type="number"
                        min={0}
                        placeholder={t("filters.auto.mileageMin")}
                        value={filters.categorySpecificFilters?.mileageMin || ''}
                        onChange={(e) => handleCategorySpecificFilterChange('mileageMin', e.target.value ? Number(e.target.value) : null)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="mileage-max">{t("filters.max")}</Label>
                      <Input
                        id="mileage-max"
                        type="number"
                        min={0}
                        placeholder={t("filters.auto.mileageMax")}
                        value={filters.categorySpecificFilters?.mileageMax || ''}
                        onChange={(e) => handleCategorySpecificFilterChange('mileageMax', e.target.value ? Number(e.target.value) : null)}
                      />
                    </div>
                  </div>
                </FilterSection>
              </>
            )}
            
            {/* Filtry dla Rolnictwo */}
            {selectedCategoryName === "Rolnictwo" && (
              <>
                <FilterSection title={t("filters.agriculture.type")} icon={<Tractor size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.type || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('type', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("filters.agriculture.typePlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("filters.all")}</SelectItem>
                      <SelectItem value="tractors">{t("filters.agriculture.tractors")}</SelectItem>
                      <SelectItem value="combines">{t("filters.agriculture.combines")}</SelectItem>
                      <SelectItem value="seeders">{t("filters.agriculture.seeders")}</SelectItem>
                      <SelectItem value="plows">{t("filters.agriculture.plows")}</SelectItem>
                      <SelectItem value="harvesters">{t("filters.agriculture.harvesters")}</SelectItem>
                      <SelectItem value="sprayers">{t("filters.agriculture.sprayers")}</SelectItem>
                      <SelectItem value="livestock">{t("filters.agriculture.livestock")}</SelectItem>
                      <SelectItem value="accessories">{t("filters.agriculture.accessories")}</SelectItem>
                      <SelectItem value="parts">{t("filters.agriculture.parts")}</SelectItem>
                      <SelectItem value="tools">{t("filters.agriculture.tools")}</SelectItem>
                      <SelectItem value="irrigation">{t("filters.agriculture.irrigation")}</SelectItem>
                      <SelectItem value="other">{t("filters.agriculture.other")}</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>
                
                <FilterSection title={t("filters.agriculture.brand")} icon={<Bookmark size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.brand || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('brand', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("filters.agriculture.brandPlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("filters.all")}</SelectItem>
                      <SelectItem value="john_deere">John Deere</SelectItem>
                      <SelectItem value="new_holland">New Holland</SelectItem>
                      <SelectItem value="case">Case IH</SelectItem>
                      <SelectItem value="claas">Claas</SelectItem>
                      <SelectItem value="fendt">Fendt</SelectItem>
                      <SelectItem value="massey_ferguson">Massey Ferguson</SelectItem>
                      <SelectItem value="ursus">Ursus</SelectItem>
                      <SelectItem value="zetor">Zetor</SelectItem>
                      <SelectItem value="deutz_fahr">Deutz-Fahr</SelectItem>
                      <SelectItem value="kubota">Kubota</SelectItem>
                      <SelectItem value="valtra">Valtra</SelectItem>
                      <SelectItem value="pronar">Pronar</SelectItem>
                      <SelectItem value="other">{t("filters.agriculture.otherBrand")}</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>
                
                <FilterSection title={t("filters.agriculture.condition")} icon={<CircleDollarSign size={16} />}>
                  <RadioGroup
                    value={filters.categorySpecificFilters?.condition || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('condition', value === 'all' ? null : value)}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="agricultural-condition-all" />
                      <Label htmlFor="agricultural-condition-all">{t("filters.all")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="new" id="agricultural-condition-new" />
                      <Label htmlFor="agricultural-condition-new">{t("filters.agriculture.new")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="used" id="agricultural-condition-used" />
                      <Label htmlFor="agricultural-condition-used">{t("filters.agriculture.used")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="refurbished" id="agricultural-condition-refurbished" />
                      <Label htmlFor="agricultural-condition-refurbished">{t("filters.agriculture.refurbished")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="forParts" id="agricultural-condition-for-parts" />
                      <Label htmlFor="agricultural-condition-for-parts">{t("filters.agriculture.forParts")}</Label>
                    </div>
                  </RadioGroup>
                </FilterSection>
                
                <FilterSection title={t("filters.agriculture.year")} icon={<Calendar size={16} />}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="ag-year-min">{t("filters.min")}</Label>
                      <Input
                        id="ag-year-min"
                        type="number"
                        min={1900}
                        max={2025}
                        placeholder={t("filters.agriculture.yearMin")}
                        value={filters.categorySpecificFilters?.yearMin || ''}
                        onChange={(e) => handleCategorySpecificFilterChange('yearMin', e.target.value ? Number(e.target.value) : null)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="ag-year-max">{t("filters.max")}</Label>
                      <Input
                        id="ag-year-max"
                        type="number"
                        min={1900}
                        max={2025}
                        placeholder={t("filters.agriculture.yearMax")}
                        value={filters.categorySpecificFilters?.yearMax || ''}
                        onChange={(e) => handleCategorySpecificFilterChange('yearMax', e.target.value ? Number(e.target.value) : null)}
                      />
                    </div>
                  </div>
                </FilterSection>
              </>
            )}
            
            {/* Filtry dla Muzyka i Edukacja */}
            {selectedCategoryName === "Muzyka i Edukacja" && (
              <>
                <FilterSection title={t("filters.music.type")} icon={<Music size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.musicType || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('musicType', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("filters.music.typePlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("filters.all")}</SelectItem>
                      <SelectItem value="instruments">{t("filters.music.instruments")}</SelectItem>
                      <SelectItem value="books">{t("filters.music.books")}</SelectItem>
                      <SelectItem value="courses">{t("filters.music.courses")}</SelectItem>
                      <SelectItem value="lessons">{t("filters.music.lessons")}</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>
                
                <FilterSection title={t("filters.music.educationLevel")} icon={<GraduationCap size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.educationLevel || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('educationLevel', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("filters.music.educationLevelPlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("filters.all")}</SelectItem>
                      <SelectItem value="primary">{t("filters.music.primary")}</SelectItem>
                      <SelectItem value="secondary">{t("filters.music.secondary")}</SelectItem>
                      <SelectItem value="higher">{t("filters.music.higher")}</SelectItem>
                      <SelectItem value="professional">{t("filters.music.professional")}</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>
              </>
            )}
            
            {/* Filtry dla Firma i Przemysł */}
            {selectedCategoryName === "Firma i Przemysł" && (
              <>
                <FilterSection title={t("filters.industry.type")} icon={<Briefcase size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.industryType || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('industryType', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("filters.industry.typePlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("filters.all")}</SelectItem>
                      <SelectItem value="machines">{t("filters.industry.machines")}</SelectItem>
                      <SelectItem value="equipment">{t("filters.industry.equipment")}</SelectItem>
                      <SelectItem value="tools">{t("filters.industry.tools")}</SelectItem>
                      <SelectItem value="office">{t("filters.industry.office")}</SelectItem>
                      <SelectItem value="gastronomy">{t("filters.industry.gastronomy")}</SelectItem>
                      <SelectItem value="production">{t("filters.industry.production")}</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>
              </>
            )}
            
            {/* Filtry dla Antyki i Kolekcje */}
            {selectedCategoryName === "Antyki i Kolekcje" && (
              <>
                <FilterSection title={t("filters.antiques.type")} icon={<Gem size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.antiquesType || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('antiquesType', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("filters.antiques.typePlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("filters.all")}</SelectItem>
                      <SelectItem value="furniture">{t("filters.antiques.furniture")}</SelectItem>
                      <SelectItem value="art">{t("filters.antiques.art")}</SelectItem>
                      <SelectItem value="coins">{t("filters.antiques.coins")}</SelectItem>
                      <SelectItem value="stamps">{t("filters.antiques.stamps")}</SelectItem>
                      <SelectItem value="collectibles">{t("filters.antiques.collectibles")}</SelectItem>
                      <SelectItem value="militaria">{t("filters.antiques.militaria")}</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>
                
                <FilterSection title={t("filters.antiques.age")} icon={<Clock size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.antiquesAge || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('antiquesAge', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("filters.antiques.agePlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("filters.all")}</SelectItem>
                      <SelectItem value="before1950">{t("filters.antiques.before1950")}</SelectItem>
                      <SelectItem value="1950to1980">{t("filters.antiques.1950to1980")}</SelectItem>
                      <SelectItem value="after1980">{t("filters.antiques.after1980")}</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>
              </>
            )}
            
            {/* Filtry dla Zdrowie i Uroda */}
            {selectedCategoryName === "Zdrowie i Uroda" && (
              <>
                <FilterSection title={t("filters.health.type")} icon={<Stethoscope size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.healthType || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('healthType', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("filters.health.typePlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("filters.all")}</SelectItem>
                      <SelectItem value="cosmetics">{t("filters.health.cosmetics")}</SelectItem>
                      <SelectItem value="perfumes">{t("filters.health.perfumes")}</SelectItem>
                      <SelectItem value="equipment">{t("filters.health.equipment")}</SelectItem>
                      <SelectItem value="supplements">{t("filters.health.supplements")}</SelectItem>
                      <SelectItem value="services">{t("filters.health.services")}</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>
              </>
            )}
            
            {/* Filtry dla Wypożyczalnia */}
            {selectedCategoryName === "Wypożyczalnia" && (
              <>
                <FilterSection title={t("filters.rental.type")} icon={<RotateCw size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.rentalType || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('rentalType', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("filters.rental.typePlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("filters.all")}</SelectItem>
                      <SelectItem value="tools">{t("filters.rental.tools")}</SelectItem>
                      <SelectItem value="vehicles">{t("filters.rental.vehicles")}</SelectItem>
                      <SelectItem value="equipment">{t("filters.rental.equipment")}</SelectItem>
                      <SelectItem value="costumes">{t("filters.rental.costumes")}</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>
                
                <FilterSection title={t("filters.rental.duration")} icon={<Clock size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.rentalDuration || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('rentalDuration', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("filters.rental.durationPlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("filters.all")}</SelectItem>
                      <SelectItem value="hourly">{t("filters.rental.hourly")}</SelectItem>
                      <SelectItem value="daily">{t("filters.rental.daily")}</SelectItem>
                      <SelectItem value="weekly">{t("filters.rental.weekly")}</SelectItem>
                      <SelectItem value="monthly">{t("filters.rental.monthly")}</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>
              </>
            )}
            
            {/* Filtry dla Oddam za darmo */}
            {selectedCategoryName === "Oddam za darmo" && (
              <>
                <FilterSection title={t("filters.free.type")} icon={<Gift size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.freeType || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('freeType', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("filters.free.typePlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("filters.all")}</SelectItem>
                      <SelectItem value="furniture">{t("filters.free.furniture")}</SelectItem>
                      <SelectItem value="electronics">{t("filters.free.electronics")}</SelectItem>
                      <SelectItem value="clothes">{t("filters.free.clothes")}</SelectItem>
                      <SelectItem value="forKids">{t("filters.free.forKids")}</SelectItem>
                      <SelectItem value="other">{t("filters.free.other")}</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>
              </>
            )}
            
            {/* Filtry dla Usługi */}
            {selectedCategoryName === "Usługi" && (
              <>
                <FilterSection title={t("filters.services.type")} icon={<Wrench size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.servicesType || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('servicesType', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("filters.services.typePlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("filters.all")}</SelectItem>
                      <SelectItem value="construction">{t("filters.services.construction")}</SelectItem>
                      <SelectItem value="transport">{t("filters.services.transport")}</SelectItem>
                      <SelectItem value="cleaning">{t("filters.services.cleaning")}</SelectItem>
                      <SelectItem value="beauty">{t("filters.services.beauty")}</SelectItem>
                      <SelectItem value="repair">{t("filters.services.repair")}</SelectItem>
                      <SelectItem value="education">{t("filters.services.education")}</SelectItem>
                      <SelectItem value="it">{t("filters.services.it")}</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>
              </>
            )}
            
            {/* Filtry dla Noclegi */}
            {selectedCategoryName === "Noclegi" && (
              <>
                <FilterSection title={t("filters.accommodation.type")} icon={<Hotel size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.accommodationType || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('accommodationType', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("filters.accommodation.typePlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("filters.all")}</SelectItem>
                      <SelectItem value="hotel">{t("filters.accommodation.hotel")}</SelectItem>
                      <SelectItem value="apartment">{t("filters.accommodation.apartment")}</SelectItem>
                      <SelectItem value="house">{t("filters.accommodation.house")}</SelectItem>
                      <SelectItem value="room">{t("filters.accommodation.room")}</SelectItem>
                      <SelectItem value="hostel">{t("filters.accommodation.hostel")}</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>
                
                <FilterSection title={t("filters.accommodation.duration")} icon={<Clock size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.accommodationDuration || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('accommodationDuration', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("filters.accommodation.durationPlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("filters.all")}</SelectItem>
                      <SelectItem value="daily">{t("filters.accommodation.daily")}</SelectItem>
                      <SelectItem value="weekly">{t("filters.accommodation.weekly")}</SelectItem>
                      <SelectItem value="monthly">{t("filters.accommodation.monthly")}</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>
              </>
            )}
            
            {/* Filtry dla Praca */}
            {selectedCategoryName === "Praca" && (
              <>
                <FilterSection title={t("filters.job.type")} icon={<Briefcase size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.jobType || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('jobType', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("filters.job.typePlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("filters.all")}</SelectItem>
                      <SelectItem value="fullTime">{t("filters.job.fullTime")}</SelectItem>
                      <SelectItem value="partTime">{t("filters.job.partTime")}</SelectItem>
                      <SelectItem value="contract">{t("filters.job.contract")}</SelectItem>
                      <SelectItem value="internship">{t("filters.job.internship")}</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>
                
                <FilterSection title={t("filters.job.category")} icon={<FolderOpen size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.jobCategory || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('jobCategory', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("filters.job.categoryPlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("filters.all")}</SelectItem>
                      <SelectItem value="it">{t("filters.job.it")}</SelectItem>
                      <SelectItem value="office">{t("filters.job.office")}</SelectItem>
                      <SelectItem value="physical">{t("filters.job.physical")}</SelectItem>
                      <SelectItem value="sales">{t("filters.job.sales")}</SelectItem>
                      <SelectItem value="gastronomy">{t("filters.job.gastronomy")}</SelectItem>
                      <SelectItem value="remote">{t("filters.job.remote")}</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>
              </>
            )}
            
            {/* Filtry dla Sport i Hobby */}
            {selectedCategoryName === "Sport i Hobby" && (
              <>
                <FilterSection title={t("filters.sport.type")} icon={<Dumbbell size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.sportType || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('sportType', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("filters.sport.typePlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("filters.all")}</SelectItem>
                      <SelectItem value="fitness">{t("filters.sport.fitness")}</SelectItem>
                      <SelectItem value="winter_sports">{t("filters.sport.winterSports")}</SelectItem>
                      <SelectItem value="water_sports">{t("filters.sport.waterSports")}</SelectItem>
                      <SelectItem value="cycling">{t("filters.sport.cycling")}</SelectItem>
                      <SelectItem value="team_sports">{t("filters.sport.teamSports")}</SelectItem>
                      <SelectItem value="outdoor">{t("filters.sport.outdoor")}</SelectItem>
                      <SelectItem value="extreme">{t("filters.sport.extreme")}</SelectItem>
                      <SelectItem value="fishing">{t("filters.sport.fishing")}</SelectItem>
                      <SelectItem value="camping">{t("filters.sport.camping")}</SelectItem>
                      <SelectItem value="collectibles">{t("filters.sport.collectibles")}</SelectItem>
                      <SelectItem value="music">{t("filters.sport.music")}</SelectItem>
                      <SelectItem value="art">{t("filters.sport.art")}</SelectItem>
                      <SelectItem value="games">{t("filters.sport.games")}</SelectItem>
                      <SelectItem value="books">{t("filters.sport.books")}</SelectItem>
                      <SelectItem value="other">{t("filters.sport.other")}</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>
                
                <FilterSection title={t("filters.sport.condition")} icon={<CircleDollarSign size={16} />}>
                  <RadioGroup
                    value={filters.categorySpecificFilters?.sportCondition || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('sportCondition', value === 'all' ? null : value)}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="sport-condition-all" />
                      <Label htmlFor="sport-condition-all">{t("filters.all")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="new" id="sport-condition-new" />
                      <Label htmlFor="sport-condition-new">{t("filters.sport.new")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="like_new" id="sport-condition-like-new" />
                      <Label htmlFor="sport-condition-like-new">{t("filters.sport.likeNew")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="good" id="sport-condition-good" />
                      <Label htmlFor="sport-condition-good">{t("filters.sport.good")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="used" id="sport-condition-used" />
                      <Label htmlFor="sport-condition-used">{t("filters.sport.used")}</Label>
                    </div>
                  </RadioGroup>
                </FilterSection>
                
                <FilterSection title={t("filters.sport.brand")} icon={<Bookmark size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.sportBrand || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('sportBrand', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("filters.sport.brandPlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("filters.all")}</SelectItem>
                      <SelectItem value="nike">Nike</SelectItem>
                      <SelectItem value="adidas">Adidas</SelectItem>
                      <SelectItem value="puma">Puma</SelectItem>
                      <SelectItem value="reebok">Reebok</SelectItem>
                      <SelectItem value="under_armour">Under Armour</SelectItem>
                      <SelectItem value="asics">Asics</SelectItem>
                      <SelectItem value="salomon">Salomon</SelectItem>
                      <SelectItem value="specialized">Specialized</SelectItem>
                      <SelectItem value="trek">Trek</SelectItem>
                      <SelectItem value="giant">Giant</SelectItem>
                      <SelectItem value="head">Head</SelectItem>
                      <SelectItem value="wilson">Wilson</SelectItem>
                      <SelectItem value="other">{t("filters.sport.otherBrand")}</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>
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
                      <SelectItem value="clothes">{t("filters.kids.clothes")}</SelectItem>
                      <SelectItem value="shoes">{t("filters.kids.shoes")}</SelectItem>
                      <SelectItem value="toys">{t("filters.kids.toys")}</SelectItem>
                      <SelectItem value="strollers">{t("filters.kids.strollers")}</SelectItem>
                      <SelectItem value="car_seats">{t("filters.kids.carSeats")}</SelectItem>
                      <SelectItem value="furniture">{t("filters.kids.furniture")}</SelectItem>
                      <SelectItem value="feeding">{t("filters.kids.feeding")}</SelectItem>
                      <SelectItem value="school">{t("filters.kids.school")}</SelectItem>
                      <SelectItem value="books">{t("filters.kids.books")}</SelectItem>
                      <SelectItem value="other">{t("filters.kids.other")}</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>
                
                <FilterSection title={t("filters.kids.age")} icon={<Calendar size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.kidsAge || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('kidsAge', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("filters.kids.agePlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("filters.all")}</SelectItem>
                      <SelectItem value="newborn">{t("filters.kids.newborn")}</SelectItem>
                      <SelectItem value="0_2">{t("filters.kids.age02")}</SelectItem>
                      <SelectItem value="3_5">{t("filters.kids.age35")}</SelectItem>
                      <SelectItem value="6_8">{t("filters.kids.age68")}</SelectItem>
                      <SelectItem value="9_12">{t("filters.kids.age912")}</SelectItem>
                      <SelectItem value="13_16">{t("filters.kids.age1316")}</SelectItem>
                      <SelectItem value="various">{t("filters.kids.ageVarious")}</SelectItem>
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
                      <RadioGroupItem value="like_new" id="kids-condition-like-new" />
                      <Label htmlFor="kids-condition-like-new">{t("filters.kids.likeNew")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="good" id="kids-condition-good" />
                      <Label htmlFor="kids-condition-good">{t("filters.kids.good")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="used" id="kids-condition-used" />
                      <Label htmlFor="kids-condition-used">{t("filters.kids.used")}</Label>
                    </div>
                  </RadioGroup>
                </FilterSection>
              </>
            )}
            
            {/* Filtry dla Elektronika */}
            {selectedCategoryName === "Elektronika" && (
              <>
                <FilterSection title={t("filters.electronics.deviceType")} icon={<Smartphone size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.deviceType || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('deviceType', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("filters.electronics.deviceTypePlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("filters.all")}</SelectItem>
                      <SelectItem value="smartphones">{t("filters.electronics.smartphones")}</SelectItem>
                      <SelectItem value="laptops">{t("filters.electronics.laptops")}</SelectItem>
                      <SelectItem value="tablets">{t("filters.electronics.tablets")}</SelectItem>
                      <SelectItem value="computers">{t("filters.electronics.computers")}</SelectItem>
                      <SelectItem value="monitors">{t("filters.electronics.monitors")}</SelectItem>
                      <SelectItem value="tv">{t("filters.electronics.tv")}</SelectItem>
                      <SelectItem value="audio">{t("filters.electronics.audio")}</SelectItem>
                      <SelectItem value="cameras">{t("filters.electronics.cameras")}</SelectItem>
                      <SelectItem value="gaming">{t("filters.electronics.gaming")}</SelectItem>
                      <SelectItem value="smartwatches">{t("filters.electronics.smartwatches")}</SelectItem>
                      <SelectItem value="network">{t("filters.electronics.network")}</SelectItem>
                      <SelectItem value="printers">{t("filters.electronics.printers")}</SelectItem>
                      <SelectItem value="accessories">{t("filters.electronics.accessories")}</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>
                
                <FilterSection title={t("filters.electronics.brand")} icon={<Bookmark size={16} />}>
                  <Select
                    value={filters.categorySpecificFilters?.brand || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('brand', value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("filters.electronics.brandPlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("filters.all")}</SelectItem>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="samsung">Samsung</SelectItem>
                      <SelectItem value="xiaomi">Xiaomi</SelectItem>
                      <SelectItem value="huawei">Huawei</SelectItem>
                      <SelectItem value="lenovo">Lenovo</SelectItem>
                      <SelectItem value="hp">HP</SelectItem>
                      <SelectItem value="dell">Dell</SelectItem>
                      <SelectItem value="asus">ASUS</SelectItem>
                      <SelectItem value="acer">Acer</SelectItem>
                      <SelectItem value="msi">MSI</SelectItem>
                      <SelectItem value="sony">Sony</SelectItem>
                      <SelectItem value="lg">LG</SelectItem>
                      <SelectItem value="philips">Philips</SelectItem>
                      <SelectItem value="bose">Bose</SelectItem>
                      <SelectItem value="canon">Canon</SelectItem>
                      <SelectItem value="nikon">Nikon</SelectItem>
                      <SelectItem value="logitech">Logitech</SelectItem>
                      <SelectItem value="other">{t("filters.other")}</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>
                
                <FilterSection title={t("filters.electronics.condition")} icon={<CircleDollarSign size={16} />}>
                  <RadioGroup
                    value={filters.categorySpecificFilters?.elCondition || "all"}
                    onValueChange={(value) => handleCategorySpecificFilterChange('elCondition', value === 'all' ? null : value)}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="el-condition-all" />
                      <Label htmlFor="el-condition-all">{t("filters.all")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="new" id="el-condition-new" />
                      <Label htmlFor="el-condition-new">{t("filters.electronics.new")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="used" id="el-condition-used" />
                      <Label htmlFor="el-condition-used">{t("filters.electronics.used")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="damaged" id="el-condition-damaged" />
                      <Label htmlFor="el-condition-damaged">{t("filters.electronics.damaged")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="refurbished" id="el-condition-refurbished" />
                      <Label htmlFor="el-condition-refurbished">{t("filters.electronics.refurbished")}</Label>
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
    </div>
  );
}