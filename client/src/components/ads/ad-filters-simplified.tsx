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
  GraduationCap,
  Baby,
  Dog,
  Music,
  Book,
  Dumbbell,
  Bike,
  Mountain,
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
  const [categorySpecificSchema, setCategorySpecificSchema] = useState<any>(null);
  const isMobile = useIsMobile();
  
  // Determine category name when category changes
  useEffect(() => {
    if (selectedCategory === null) {
      setSelectedCategoryName(null);
      setCategorySpecificSchema(null);
      return;
    }
    
    const category = categories.find(cat => cat.id === selectedCategory);
    if (category) {
      setSelectedCategoryName(category.name);
      const schema = getFiltersForCategory(category.name);
      setCategorySpecificSchema(schema);
    }
  }, [selectedCategory, categories]);
  
  // Funkcje pomocnicze do generowania elementów filtrów
  const getFilterCategoryItems = (categoryName: string) => {
    try {
      const schema = getFiltersForCategory(categoryName);
      if (schema) {
        return Object.entries(schema.shape).map(([key, value]) => (
          <div key={key} className="mb-2">
            <span className="text-sm font-medium">{key}</span>
          </div>
        ));
      }
    } catch (error) {
      console.error("Error getting category filters:", error);
    }
    return null;
  };
  
  // Update filters state and call parent callback
  const handleFilterChange = (field: keyof FilterOptions, value: any) => {
    const updatedFilters = { ...filters, [field]: value };
    setFilters(updatedFilters);
    if (onFilterChange) {
      onFilterChange(updatedFilters);
    }
  };
  
  // Handler for category-specific filters
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
  
  // Handle price range updates
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
  
  // Reset all filters to default values
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
  
  // Reset specific category filters
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
  
  // Handle sort option change
  const handleSortChange = (value: string) => {
    if (onSortChange) {
      onSortChange(value);
    }
    handleFilterChange('sortBy', value);
  };
  
  // Component for filter section titles
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
          
          {/* Category-specific filters */}
          {selectedCategoryName && (
            <div className="mt-4 p-2">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4 bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                {t("filters.categorySpecific", { category: selectedCategoryName })}
              </h3>
              <div className="flex flex-col md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-3">
                {/* Renderowanie filtrów specyficznych dla danej kategorii */}
                {selectedCategoryName === "Zwierzęta" && (
                  <FilterSection title={t("filters.animals.type")} icon={<Dog size={16} />}>
                    <Select
                      value={filters.categorySpecificFilters?.animalType || "all"}
                      onValueChange={(value) => {
                        handleCategorySpecificFilterChange('animalType', value === "all" ? null : value);
                      }}
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
                )}
                
                {/* Filtry dla Nieruchomości - Powierzchnia */}
                {selectedCategoryName === "Nieruchomości" && (
                  <FilterSection title={t("filters.realestate.area")} icon={<Maximize2 size={16} />}>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="area-min">{t("filters.min")}</Label>
                        <Input
                          id="area-min"
                          type="number"
                          min={0}
                          placeholder={t("filters.realestate.areaMin")}
                          value={filters.categorySpecificFilters?.areaMin || ''}
                          onChange={(e) => handleCategorySpecificFilterChange('areaMin', e.target.value ? Number(e.target.value) : null)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="area-max">{t("filters.max")}</Label>
                        <Input
                          id="area-max"
                          type="number"
                          min={0}
                          placeholder={t("filters.realestate.areaMax")}
                          value={filters.categorySpecificFilters?.areaMax || ''}
                          onChange={(e) => handleCategorySpecificFilterChange('areaMax', e.target.value ? Number(e.target.value) : null)}
                        />
                      </div>
                    </div>
                  </FilterSection>
                )}
                
                {/* Filtry dla Nieruchomości - Liczba pokoi */}
                {selectedCategoryName === "Nieruchomości" && (
                  <FilterSection title={t("filters.realestate.rooms")} icon={<LayoutGrid size={16} />}>
                    <Select
                      value={filters.categorySpecificFilters?.rooms || "all"}
                      onValueChange={(value) => {
                        handleCategorySpecificFilterChange('rooms', value === "all" ? null : value);
                      }}
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
                        <SelectItem value="5+">{t("filters.realestate.rooms5Plus")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </FilterSection>
                )}
                
                {/* Filtry dla Rolnictwo - Typ sprzętu */}
                {selectedCategoryName === "Rolnictwo" && (
                  <FilterSection title={t("filters.agriculture.equipmentType")} icon={<Tractor size={16} />}>
                    <Select
                      value={filters.categorySpecificFilters?.equipmentType || "all"}
                      onValueChange={(value) => {
                        handleCategorySpecificFilterChange('equipmentType', value === "all" ? null : value);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t("filters.agriculture.equipmentTypePlaceholder")} />
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
                )}
                
                {/* Filtry dla Rolnictwo - Marka maszyny */}
                {selectedCategoryName === "Rolnictwo" && (
                  <FilterSection title={t("filters.agriculture.brand")} icon={<Bookmark size={16} />}>
                    <Select
                      value={filters.categorySpecificFilters?.agMachBrand || "all"}
                      onValueChange={(value) => {
                        handleCategorySpecificFilterChange('agMachBrand', value === "all" ? null : value);
                      }}
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
                )}
                
                {/* Filtry dla Motoryzacja - Typ pojazdu */}
                {selectedCategoryName === "Motoryzacja" && (
                  <FilterSection title={t("filters.auto.vehicleType")} icon={<Car size={16} />}>
                    <Select
                      value={filters.categorySpecificFilters?.vehicleType || "all"}
                      onValueChange={(value) => {
                        handleCategorySpecificFilterChange('vehicleType', value === "all" ? null : value);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t("filters.auto.vehicleTypePlaceholder")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t("filters.all")}</SelectItem>
                        <SelectItem value="passenger">{t("filters.auto.passenger")}</SelectItem>
                        <SelectItem value="suv">{t("filters.auto.suv")}</SelectItem>
                        <SelectItem value="van">{t("filters.auto.van")}</SelectItem>
                        <SelectItem value="truck">{t("filters.auto.truck")}</SelectItem>
                        <SelectItem value="motorcycle">{t("filters.auto.motorcycle")}</SelectItem>
                        <SelectItem value="agricultural">{t("filters.auto.agricultural")}</SelectItem>
                        <SelectItem value="construction">{t("filters.auto.construction")}</SelectItem>
                        <SelectItem value="other">{t("filters.auto.other")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </FilterSection>
                )}
                
                {/* Filtry dla Motoryzacja - Marka pojazdu */}
                {selectedCategoryName === "Motoryzacja" && (
                  <FilterSection title={t("filters.auto.brand")} icon={<Bookmark size={16} />}>
                    <Select
                      value={filters.categorySpecificFilters?.vehicleBrand || "all"}
                      onValueChange={(value) => {
                        handleCategorySpecificFilterChange('vehicleBrand', value === "all" ? null : value);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t("filters.auto.brandPlaceholder")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t("filters.all")}</SelectItem>
                        
                        {/* Dynamicznie wyświetlane marki, zależne od typu pojazdu */}
                        {(!filters.categorySpecificFilters?.vehicleType || 
                          filters.categorySpecificFilters?.vehicleType === "all" || 
                          filters.categorySpecificFilters?.vehicleType === "passenger" || 
                          filters.categorySpecificFilters?.vehicleType === "suv" || 
                          filters.categorySpecificFilters?.vehicleType === "van") && (
                          <>
                            <SelectItem value="audi">Audi</SelectItem>
                            <SelectItem value="bmw">BMW</SelectItem>
                            <SelectItem value="citroen">Citroën</SelectItem>
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
                            <SelectItem value="vw">Volkswagen</SelectItem>
                            <SelectItem value="volvo">Volvo</SelectItem>
                          </>
                        )}
                        
                        {filters.categorySpecificFilters?.vehicleType === "motorcycle" && (
                          <>
                            <SelectItem value="bmw">BMW</SelectItem>
                            <SelectItem value="ducati">Ducati</SelectItem>
                            <SelectItem value="harley">Harley-Davidson</SelectItem>
                            <SelectItem value="honda">Honda</SelectItem>
                            <SelectItem value="kawasaki">Kawasaki</SelectItem>
                            <SelectItem value="ktm">KTM</SelectItem>
                            <SelectItem value="suzuki">Suzuki</SelectItem>
                            <SelectItem value="triumph">Triumph</SelectItem>
                            <SelectItem value="yamaha">Yamaha</SelectItem>
                          </>
                        )}
                        
                        {filters.categorySpecificFilters?.vehicleType === "truck" && (
                          <>
                            <SelectItem value="daf">DAF</SelectItem>
                            <SelectItem value="iveco">Iveco</SelectItem>
                            <SelectItem value="man">MAN</SelectItem>
                            <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
                            <SelectItem value="renault">Renault</SelectItem>
                            <SelectItem value="scania">Scania</SelectItem>
                            <SelectItem value="volvo">Volvo</SelectItem>
                          </>
                        )}
                        
                        <SelectItem value="other">{t("filters.auto.otherBrand")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </FilterSection>
                )}
                
                {/* Filtry dla Elektronika - Rodzaj urządzenia */}
                {selectedCategoryName === "Elektronika" && (
                  <FilterSection title={t("filters.electronics.deviceType")} icon={<Smartphone size={16} />}>
                    <Select
                      value={filters.categorySpecificFilters?.deviceType || "all"}
                      onValueChange={(value) => {
                        handleCategorySpecificFilterChange('deviceType', value === "all" ? null : value);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t("filters.electronics.deviceTypePlaceholder")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t("filters.all")}</SelectItem>
                        <SelectItem value="smartphones">{t("filters.electronics.smartphones")}</SelectItem>
                        <SelectItem value="computers">{t("filters.electronics.computers")}</SelectItem>
                        <SelectItem value="laptops">{t("filters.electronics.laptops")}</SelectItem>
                        <SelectItem value="tablets">{t("filters.electronics.tablets")}</SelectItem>
                        <SelectItem value="tv">{t("filters.electronics.tv")}</SelectItem>
                        <SelectItem value="audio">{t("filters.electronics.audio")}</SelectItem>
                        <SelectItem value="cameras">{t("filters.electronics.cameras")}</SelectItem>
                        <SelectItem value="gaming">{t("filters.electronics.gaming")}</SelectItem>
                        <SelectItem value="accessories">{t("filters.electronics.accessories")}</SelectItem>
                        <SelectItem value="wearables">{t("filters.electronics.wearables")}</SelectItem>
                        <SelectItem value="other">{t("filters.electronics.other")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </FilterSection>
                )}
                
                {/* Filtry dla Elektronika - Marka */}
                {selectedCategoryName === "Elektronika" && (
                  <FilterSection title={t("filters.electronics.brand")} icon={<Bookmark size={16} />}>
                    <Select
                      value={filters.categorySpecificFilters?.brand || "all"}
                      onValueChange={(value) => {
                        handleCategorySpecificFilterChange('brand', value === "all" ? null : value);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t("filters.electronics.brandPlaceholder")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t("filters.all")}</SelectItem>
                        
                        {/* Dynamiczne wyświetlanie marek, zależne od rodzaju urządzenia */}
                        {(!filters.categorySpecificFilters?.deviceType || 
                          filters.categorySpecificFilters?.deviceType === "all" ||
                          filters.categorySpecificFilters?.deviceType === "smartphones" || 
                          filters.categorySpecificFilters?.deviceType === "tablets") && (
                          <>
                            <SelectItem value="apple">Apple</SelectItem>
                            <SelectItem value="samsung">Samsung</SelectItem>
                            <SelectItem value="xiaomi">Xiaomi</SelectItem>
                            <SelectItem value="huawei">Huawei</SelectItem>
                            <SelectItem value="google">Google</SelectItem>
                            <SelectItem value="oneplus">OnePlus</SelectItem>
                            <SelectItem value="oppo">OPPO</SelectItem>
                            <SelectItem value="motorola">Motorola</SelectItem>
                            <SelectItem value="nokia">Nokia</SelectItem>
                            <SelectItem value="realme">realme</SelectItem>
                          </>
                        )}
                        
                        {(filters.categorySpecificFilters?.deviceType === "computers" || 
                          filters.categorySpecificFilters?.deviceType === "laptops") && (
                          <>
                            <SelectItem value="acer">Acer</SelectItem>
                            <SelectItem value="apple">Apple</SelectItem>
                            <SelectItem value="asus">ASUS</SelectItem>
                            <SelectItem value="dell">Dell</SelectItem>
                            <SelectItem value="hp">HP</SelectItem>
                            <SelectItem value="lenovo">Lenovo</SelectItem>
                            <SelectItem value="msi">MSI</SelectItem>
                            <SelectItem value="microsoft">Microsoft</SelectItem>
                            <SelectItem value="huawei">Huawei</SelectItem>
                            <SelectItem value="samsung">Samsung</SelectItem>
                          </>
                        )}
                        
                        {filters.categorySpecificFilters?.deviceType === "tv" && (
                          <>
                            <SelectItem value="samsung">Samsung</SelectItem>
                            <SelectItem value="lg">LG</SelectItem>
                            <SelectItem value="sony">Sony</SelectItem>
                            <SelectItem value="philips">Philips</SelectItem>
                            <SelectItem value="panasonic">Panasonic</SelectItem>
                            <SelectItem value="tcl">TCL</SelectItem>
                            <SelectItem value="hisense">Hisense</SelectItem>
                            <SelectItem value="xiaomi">Xiaomi</SelectItem>
                          </>
                        )}
                        
                        {filters.categorySpecificFilters?.deviceType === "audio" && (
                          <>
                            <SelectItem value="sony">Sony</SelectItem>
                            <SelectItem value="bose">Bose</SelectItem>
                            <SelectItem value="jbl">JBL</SelectItem>
                            <SelectItem value="sennheiser">Sennheiser</SelectItem>
                            <SelectItem value="audio-technica">Audio-Technica</SelectItem>
                            <SelectItem value="apple">Apple</SelectItem>
                            <SelectItem value="samsung">Samsung</SelectItem>
                            <SelectItem value="marshall">Marshall</SelectItem>
                            <SelectItem value="denon">Denon</SelectItem>
                            <SelectItem value="yamaha">Yamaha</SelectItem>
                          </>
                        )}
                        
                        {filters.categorySpecificFilters?.deviceType === "cameras" && (
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
                        
                        {filters.categorySpecificFilters?.deviceType === "gaming" && (
                          <>
                            <SelectItem value="sony">Sony</SelectItem>
                            <SelectItem value="microsoft">Microsoft</SelectItem>
                            <SelectItem value="nintendo">Nintendo</SelectItem>
                            <SelectItem value="logitech">Logitech</SelectItem>
                            <SelectItem value="razer">Razer</SelectItem>
                            <SelectItem value="steelseries">SteelSeries</SelectItem>
                            <SelectItem value="hyperx">HyperX</SelectItem>
                          </>
                        )}
                        
                        <SelectItem value="other">{t("filters.electronics.otherBrand")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </FilterSection>
                )}
                
                {/* Filtry dla Dom i Ogród - Typ produktu */}
                {selectedCategoryName === "Dom i Ogród" && (
                  <FilterSection title={t("filters.homeGarden.productType")} icon={<Home size={16} />}>
                    <Select
                      value={filters.categorySpecificFilters?.productType || "all"}
                      onValueChange={(value) => {
                        handleCategorySpecificFilterChange('productType', value === "all" ? null : value);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t("filters.homeGarden.productTypePlaceholder")} />
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
                )}
                
                {/* Filtry dla Moda - Kategoria mody */}
                {selectedCategoryName === "Moda" && (
                  <FilterSection title={t("filters.fashion.category")} icon={<Shirt size={16} />}>
                    <Select
                      value={filters.categorySpecificFilters?.fashionCategory || "all"}
                      onValueChange={(value) => {
                        handleCategorySpecificFilterChange('fashionCategory', value === "all" ? null : value);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t("filters.fashion.categoryPlaceholder")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t("filters.all")}</SelectItem>
                        <SelectItem value="women">{t("filters.fashion.women")}</SelectItem>
                        <SelectItem value="men">{t("filters.fashion.men")}</SelectItem>
                        <SelectItem value="kids">{t("filters.fashion.kids")}</SelectItem>
                        <SelectItem value="shoes">{t("filters.fashion.shoes")}</SelectItem>
                        <SelectItem value="accessories">{t("filters.fashion.accessories")}</SelectItem>
                        <SelectItem value="bags">{t("filters.fashion.bags")}</SelectItem>
                        <SelectItem value="jewelry">{t("filters.fashion.jewelry")}</SelectItem>
                        <SelectItem value="watches">{t("filters.fashion.watches")}</SelectItem>
                        <SelectItem value="sportswear">{t("filters.fashion.sportswear")}</SelectItem>
                        <SelectItem value="vintage">{t("filters.fashion.vintage")}</SelectItem>
                        <SelectItem value="other">{t("filters.fashion.other")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </FilterSection>
                )}
                
                {/* Filtry dla Moda - Rozmiar */}
                {selectedCategoryName === "Moda" && (
                  <FilterSection title={t("filters.fashion.size")} icon={<Maximize2 size={16} />}>
                    <Select
                      value={filters.categorySpecificFilters?.size || "all"}
                      onValueChange={(value) => {
                        handleCategorySpecificFilterChange('size', value === "all" ? null : value);
                      }}
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
                        <SelectItem value="various">{t("filters.fashion.various")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </FilterSection>
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
      )}
    </div>
  );
}