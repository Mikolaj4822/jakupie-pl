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
  Bed,
  Box,
  LayoutGrid,
  Stars,
  Layers,
  Maximize2,
  LayoutList
} from "lucide-react";
import { getFiltersForCategory } from "@/lib/category-filters";

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

interface EnhancedFiltersProps {
  categories: Category[];
  selectedCategory: number | null;
  onCategoryChange: (categoryId: number | null) => void;
  onFilterChange?: (filters: FilterOptions) => void;
  onSortChange?: (sortOption: string) => void;
  currentFilters?: FilterOptions;
}

/**
 * Komponent wyświetlający sekcję filtrów dla konkretnej kategorii
 */
interface FilterSectionProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

function FilterSection({ title, icon, children, className = "" }: FilterSectionProps) {
  return (
    <div className={`mb-4 ${className}`}>
      <div className="flex items-center gap-2 mb-2">
        {icon && <span className="text-indigo-500">{icon}</span>}
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">{title}</h4>
      </div>
      <div className="text-sm">{children}</div>
    </div>
  );
}

export default function EnhancedFilters({
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
}: EnhancedFiltersProps) {
  const { t } = useLanguage();
  const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>(currentFilters);
  const [tempPriceRange, setTempPriceRange] = useState<[number, number]>([
    filters.minPrice || 0, 
    filters.maxPrice || 10000
  ]);
  const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(null);
  const [categorySpecificSchema, setCategorySpecificSchema] = useState<any>(null);
  
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
  
  // Update filters when props change
  useEffect(() => {
    setFilters(currentFilters);
    setTempPriceRange([
      currentFilters.minPrice || 0, 
      currentFilters.maxPrice || 10000
    ]);
  }, [currentFilters]);
  
  // Handle filter changes
  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };
  
  // Handle category-specific filter changes
  const handleCategorySpecificFilterChange = (key: string, value: any) => {
    const categoryFilters = { ...(filters.categorySpecificFilters || {}) };
    
    if (value === null) {
      delete categoryFilters[key];
    } else {
      categoryFilters[key] = value;
    }
    
    const newFilters = { 
      ...filters, 
      categorySpecificFilters: Object.keys(categoryFilters).length > 0 ? categoryFilters : undefined
    };
    
    setFilters(newFilters);
    
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };
  
  // Handle price range slider changes
  const handlePriceRangeChange = (value: number[]) => {
    setTempPriceRange([value[0], value[1]]);
  };
  
  // Apply the price range and update filters
  const applyPriceRange = () => {
    handleFilterChange('minPrice', tempPriceRange[0] > 0 ? tempPriceRange[0] : null);
    handleFilterChange('maxPrice', tempPriceRange[1] < 10000 ? tempPriceRange[1] : null);
  };
  
  // Handle sort option changes
  const handleSortChange = (value: string) => {
    handleFilterChange('sortBy', value);
    
    if (onSortChange) {
      onSortChange(value);
    }
  };
  
  // Clear all filters and reset to defaults
  const clearAllFilters = () => {
    const defaultFilters: FilterOptions = {
      category: selectedCategory,
      minPrice: null,
      maxPrice: null,
      location: null,
      datePosted: null,
      sortBy: "newest"
    };
    
    setFilters(defaultFilters);
    setTempPriceRange([0, 10000]);
    
    if (onFilterChange) {
      onFilterChange(defaultFilters);
    }
    
    if (onSortChange) {
      onSortChange("newest");
    }
  };

  // Check if any filter is applied
  const isAnyFilterApplied = () => {
    return (
      filters.minPrice !== null ||
      filters.maxPrice !== null ||
      filters.location !== null ||
      filters.datePosted !== null ||
      filters.condition !== undefined ||
      (filters.deliveryOptions && filters.deliveryOptions.length > 0) ||
      filters.sellerType !== undefined ||
      (filters.categorySpecificFilters && Object.keys(filters.categorySpecificFilters).length > 0) ||
      filters.sortBy !== "newest"
    );
  };

  // Get color classes for category badges
  const getCategoryBadgeClasses = (category: Category | null, isSelected: boolean) => {
    if (!isSelected) {
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700";
    }
    
    if (!category) {
      return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100 hover:bg-indigo-200 dark:hover:bg-indigo-800";
    }
    
    switch (category.color) {
      case "blue":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 hover:bg-blue-200 dark:hover:bg-blue-800";
      case "green":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 hover:bg-green-200 dark:hover:bg-green-800";
      case "yellow":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100 hover:bg-amber-200 dark:hover:bg-amber-800";
      case "red":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100 hover:bg-red-200 dark:hover:bg-red-800";
      case "purple":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100 hover:bg-purple-200 dark:hover:bg-purple-800";
      default:
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100 hover:bg-indigo-200 dark:hover:bg-indigo-800";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Sliders size={16} className="text-indigo-500" />
          {t("filters.title")}
        </h3>
        <Button
          variant="ghost" 
          size="sm" 
          onClick={clearAllFilters}
          className="text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
          disabled={!isAnyFilterApplied()}
        >
          {t("filters.clearAll")}
        </Button>
      </div>

      {/* Main filters container */}
      <div className="p-4 lg:p-5">
        {/* Categories as badges */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
            <Tag size={16} className="text-indigo-500" />
            {t("filters.categories")}
          </h4>
          <div className="flex flex-wrap gap-2">
            <Badge
              className={`cursor-pointer py-1.5 px-3 ${getCategoryBadgeClasses(null, selectedCategory === null)}`}
              onClick={() => onCategoryChange(null)}
            >
              {t("browse.allCategories")}
            </Badge>
            
            {categories.map((category) => {
              // Get translation for category name
              const categoryKey = `categories.${category.name.toLowerCase()}`;
              const categoryName = t(categoryKey) === categoryKey ? category.name : t(categoryKey);
              const isSelected = selectedCategory === category.id;
              
              return (
                <Badge
                  key={category.id}
                  className={`cursor-pointer py-1.5 px-3 ${getCategoryBadgeClasses(category, isSelected)}`}
                  onClick={() => onCategoryChange(category.id === selectedCategory ? null : category.id)}
                >
                  {categoryName}
                </Badge>
              );
            })}
          </div>
        </div>

        {/* Price Range filter - always visible */}
        <div className="mb-6 border-t border-gray-100 dark:border-gray-800 pt-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
            <Tag size={16} className="text-indigo-500" />
            {t("filters.priceRange")}
          </h4>
          <div className="pb-2">
            <div className="flex justify-between mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span>{tempPriceRange[0]} zł</span>
              <span>{tempPriceRange[1]} zł</span>
            </div>
            <Slider
              value={[tempPriceRange[0], tempPriceRange[1]]}
              min={0}
              max={10000}
              step={100}
              onValueChange={handlePriceRangeChange}
              className="mb-4"
            />
            <div className="flex gap-2">
              <div className="w-1/2">
                <Label htmlFor="min-price" className="text-xs mb-1 block">{t("filters.minPrice")}</Label>
                <Input
                  id="min-price"
                  type="number"
                  placeholder={t("filters.min")}
                  value={tempPriceRange[0]}
                  onChange={(e) => setTempPriceRange([parseInt(e.target.value) || 0, tempPriceRange[1]])}
                  className="w-full"
                />
              </div>
              <div className="w-1/2">
                <Label htmlFor="max-price" className="text-xs mb-1 block">{t("filters.maxPrice")}</Label>
                <Input
                  id="max-price"
                  type="number"
                  placeholder={t("filters.max")}
                  value={tempPriceRange[1]}
                  onChange={(e) => setTempPriceRange([tempPriceRange[0], parseInt(e.target.value) || 10000])}
                  className="w-full"
                />
              </div>
            </div>
            <Button onClick={applyPriceRange} size="sm" className="mt-3 w-full">
              {t("filters.applyPriceFilter")}
            </Button>
          </div>
        </div>

        {/* Quick filters section - most common filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 border-t border-gray-100 dark:border-gray-800 pt-4">
          {/* Condition filter */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              <Tag size={16} className="text-indigo-500" />
              {t("filters.condition")}
            </h4>
            <Select
              value={filters.condition || "all"}
              onValueChange={(value) => handleFilterChange('condition', value === 'all' ? null : value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t("filters.allConditions")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("filters.allConditions")}</SelectItem>
                <SelectItem value="new">{t("filters.new")}</SelectItem>
                <SelectItem value="used">{t("filters.used")}</SelectItem>
                <SelectItem value="damaged">{t("filters.damaged")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Location filter */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              <MapPin size={16} className="text-indigo-500" />
              {t("filters.location")}
            </h4>
            <div className="flex items-center gap-2">
              <Input
                placeholder={t("filters.enterLocation")}
                value={filters.location || ""}
                onChange={(e) => handleFilterChange('location', e.target.value || null)}
                className="flex-1"
              />
            </div>
          </div>

          {/* Sort options */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              <ArrowUpDown size={16} className="text-indigo-500" />
              {t("filters.sortBy")}
            </h4>
            <Select
              value={filters.sortBy || "newest"}
              onValueChange={handleSortChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t("filters.newest")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">{t("filters.newest")}</SelectItem>
                <SelectItem value="oldest">{t("filters.oldest")}</SelectItem>
                <SelectItem value="price_low">{t("filters.priceLowToHigh")}</SelectItem>
                <SelectItem value="price_high">{t("filters.priceHighToLow")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Advanced filters toggle button */}
        <div className="border-t border-gray-100 dark:border-gray-800 pt-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsAdvancedFiltersOpen(!isAdvancedFiltersOpen)}
            className="mb-4 flex items-center gap-2 w-full justify-center"
          >
            {isAdvancedFiltersOpen ? (
              <>
                {t("filters.hideAdvancedFilters")} <ChevronDown size={16} className="transform rotate-180 transition-transform" />
              </>
            ) : (
              <>
                {t("filters.showAdvancedFilters")} <ChevronDown size={16} className="transition-transform" />
              </>
            )}
          </Button>
          
          {/* Advanced filters section */}
          {isAdvancedFiltersOpen && (
            <div className="space-y-6">
              {/* Date Posted filter */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                  <Calendar size={16} className="text-indigo-500" />
                  {t("filters.datePosted")}
                </h4>
                <RadioGroup
                  value={filters.datePosted || "any"}
                  onValueChange={(value) => handleFilterChange('datePosted', value === 'any' ? null : value)}
                  className="grid grid-cols-2 sm:grid-cols-3 gap-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="any" id="date-any" />
                    <Label htmlFor="date-any">{t("filters.anyTime")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="today" id="date-today" />
                    <Label htmlFor="date-today">{t("filters.today")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yesterday" id="date-yesterday" />
                    <Label htmlFor="date-yesterday">{t("filters.yesterday")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="last_week" id="date-last_week" />
                    <Label htmlFor="date-last_week">{t("filters.lastWeek")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="last_month" id="date-last_month" />
                    <Label htmlFor="date-last_month">{t("filters.lastMonth")}</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Delivery Options filter */}
              <div className="border-t border-gray-100 dark:border-gray-800 pt-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                  <Truck size={16} className="text-indigo-500" />
                  {t("filters.deliveryOptions")}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="shipping"
                      checked={filters.deliveryOptions?.includes("shipping") || false}
                      onCheckedChange={(checked) => {
                        const currentOptions = filters.deliveryOptions || [];
                        if (checked) {
                          handleFilterChange('deliveryOptions', [...currentOptions, "shipping"]);
                        } else {
                          handleFilterChange('deliveryOptions', currentOptions.filter(option => option !== "shipping"));
                        }
                      }}
                    />
                    <Label htmlFor="shipping">{t("filters.shipping")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="pickup"
                      checked={filters.deliveryOptions?.includes("pickup") || false}
                      onCheckedChange={(checked) => {
                        const currentOptions = filters.deliveryOptions || [];
                        if (checked) {
                          handleFilterChange('deliveryOptions', [...currentOptions, "pickup"]);
                        } else {
                          handleFilterChange('deliveryOptions', currentOptions.filter(option => option !== "pickup"));
                        }
                      }}
                    />
                    <Label htmlFor="pickup">{t("filters.pickup")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="meeting"
                      checked={filters.deliveryOptions?.includes("meeting") || false}
                      onCheckedChange={(checked) => {
                        const currentOptions = filters.deliveryOptions || [];
                        if (checked) {
                          handleFilterChange('deliveryOptions', [...currentOptions, "meeting"]);
                        } else {
                          handleFilterChange('deliveryOptions', currentOptions.filter(option => option !== "meeting"));
                        }
                      }}
                    />
                    <Label htmlFor="meeting">{t("filters.meeting")}</Label>
                  </div>
                </div>
              </div>

              {/* Seller Type filter */}
              <div className="border-t border-gray-100 dark:border-gray-800 pt-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                  <User size={16} className="text-indigo-500" />
                  {t("filters.sellerType")}
                </h4>
                <RadioGroup
                  value={filters.sellerType || "all"}
                  onValueChange={(value) => handleFilterChange('sellerType', value === 'all' ? null : value)}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="seller-all" />
                    <Label htmlFor="seller-all">{t("filters.allSellers")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="private" id="seller-private" />
                    <Label htmlFor="seller-private">{t("filters.privatePerson")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="business" id="seller-business" />
                    <Label htmlFor="seller-business">{t("filters.business")}</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* CATEGORY-SPECIFIC FILTERS SECTION */}
      {selectedCategoryName && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 lg:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center gap-2">
              {selectedCategoryName === "Motoryzacja" && <Car size={16} className="text-indigo-500" />}
              {selectedCategoryName === "Nieruchomości" && <Home size={16} className="text-indigo-500" />}
              {selectedCategoryName === "Elektronika" && <Smartphone size={16} className="text-indigo-500" />}
              {selectedCategoryName === "Moda" && <ShoppingBag size={16} className="text-indigo-500" />}
              {selectedCategoryName === "Dom i Ogród" && <Sofa size={16} className="text-indigo-500" />}
              {selectedCategoryName === "Rolnictwo" && <Tractor size={16} className="text-indigo-500" />}
              {selectedCategoryName === "Sport i Hobby" && <Dumbbell size={16} className="text-indigo-500" />}
              {selectedCategoryName === "Dla Dzieci" && <Baby size={16} className="text-indigo-500" />}
              {t("filters.categorySpecificFilters")}: <span className="font-semibold">{selectedCategoryName}</span>
            </h3>
          </div>
          
          {/* MOTORYZACJA SPECIFIC FILTERS */}
          {selectedCategoryName === "Motoryzacja" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Brand filter */}
              <FilterSection title={t("filters.brand")} icon={<Car size={16} />}>
                <Select
                  value={filters.categorySpecificFilters?.brand || "all"}
                  onValueChange={(value) => {
                    handleCategorySpecificFilterChange('brand', value === "all" ? null : value);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t("filters.selectBrand")} />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    <SelectItem value="all">{t("filters.all")}</SelectItem>
                    
                    {/* Popularne marki europejskie */}
                    <SelectItem value="alfa_romeo">Alfa Romeo</SelectItem>
                    <SelectItem value="audi">Audi</SelectItem>
                    <SelectItem value="bmw">BMW</SelectItem>
                    <SelectItem value="citroen">Citroën</SelectItem>
                    <SelectItem value="dacia">Dacia</SelectItem>
                    <SelectItem value="fiat">Fiat</SelectItem>
                    <SelectItem value="ford">Ford</SelectItem>
                    <SelectItem value="hyundai">Hyundai</SelectItem>
                    <SelectItem value="kia">Kia</SelectItem>
                    <SelectItem value="mazda">Mazda</SelectItem>
                    <SelectItem value="mercedes_benz">Mercedes-Benz</SelectItem>
                    <SelectItem value="nissan">Nissan</SelectItem>
                    <SelectItem value="opel">Opel</SelectItem>
                    <SelectItem value="peugeot">Peugeot</SelectItem>
                    <SelectItem value="renault">Renault</SelectItem>
                    <SelectItem value="seat">SEAT</SelectItem>
                    <SelectItem value="skoda">Škoda</SelectItem>
                    <SelectItem value="suzuki">Suzuki</SelectItem>
                    <SelectItem value="toyota">Toyota</SelectItem>
                    <SelectItem value="volkswagen">Volkswagen</SelectItem>
                    <SelectItem value="volvo">Volvo</SelectItem>
                    
                    {/* Marki premium */}
                    <SelectItem value="aston_martin">Aston Martin</SelectItem>
                    <SelectItem value="bentley">Bentley</SelectItem>
                    <SelectItem value="ferrari">Ferrari</SelectItem>
                    <SelectItem value="jaguar">Jaguar</SelectItem>
                    <SelectItem value="lamborghini">Lamborghini</SelectItem>
                    <SelectItem value="land_rover">Land Rover</SelectItem>
                    <SelectItem value="lexus">Lexus</SelectItem>
                    <SelectItem value="maserati">Maserati</SelectItem>
                    <SelectItem value="porsche">Porsche</SelectItem>
                    <SelectItem value="rolls_royce">Rolls-Royce</SelectItem>
                    
                    {/* Marki z USA */}
                    <SelectItem value="cadillac">Cadillac</SelectItem>
                    <SelectItem value="chevrolet">Chevrolet</SelectItem>
                    <SelectItem value="chrysler">Chrysler</SelectItem>
                    <SelectItem value="dodge">Dodge</SelectItem>
                    <SelectItem value="jeep">Jeep</SelectItem>
                    <SelectItem value="tesla">Tesla</SelectItem>

                    {/* Marki azjatyckie */}
                    <SelectItem value="honda">Honda</SelectItem>
                    <SelectItem value="infiniti">Infiniti</SelectItem>
                    <SelectItem value="lexus">Lexus</SelectItem>
                    <SelectItem value="mitsubishi">Mitsubishi</SelectItem>
                    <SelectItem value="subaru">Subaru</SelectItem>
                    
                    {/* Marki polskie i inne */}
                    <SelectItem value="polonez">Polonez</SelectItem>
                    <SelectItem value="fso">FSO</SelectItem>
                    <SelectItem value="daewoo">Daewoo</SelectItem>
                    <SelectItem value="saab">Saab</SelectItem>
                    <SelectItem value="smart">Smart</SelectItem>
                    <SelectItem value="mini">Mini</SelectItem>
                    <SelectItem value="other">Inne</SelectItem>
                  </SelectContent>
                </Select>
              </FilterSection>
              
              {/* Model filter - appears after brand selection */}
              {filters.categorySpecificFilters?.brand && (
                <FilterSection title={t("filters.model")} icon={<Tag size={16} />}>
                  <Input 
                    placeholder={t("filters.enterModel")} 
                    value={filters.categorySpecificFilters?.model || ""} 
                    onChange={(e) => handleCategorySpecificFilterChange('model', e.target.value || null)}
                    className="w-full"
                  />
                </FilterSection>
              )}
              
              {/* Year range filter */}
              <FilterSection title={t("filters.productionYear")} icon={<Calendar size={16} />}>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="year-from" className="text-xs mb-1 block">{t("filters.from")}</Label>
                    <Input 
                      id="year-from"
                      placeholder={t("filters.from")} 
                      type="number" 
                      value={filters.categorySpecificFilters?.yearFrom || ""} 
                      onChange={(e) => handleCategorySpecificFilterChange('yearFrom', e.target.value ? parseInt(e.target.value) : null)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label htmlFor="year-to" className="text-xs mb-1 block">{t("filters.to")}</Label>
                    <Input 
                      id="year-to"
                      placeholder={t("filters.to")} 
                      type="number" 
                      value={filters.categorySpecificFilters?.yearTo || ""} 
                      onChange={(e) => handleCategorySpecificFilterChange('yearTo', e.target.value ? parseInt(e.target.value) : null)}
                      className="w-full"
                    />
                  </div>
                </div>
              </FilterSection>
              
              {/* Fuel type filter */}
              <FilterSection title={t("filters.fuelType")} icon={<Tag size={16} />}>
                <Select
                  value={filters.categorySpecificFilters?.fuelType || "all"}
                  onValueChange={(value) => {
                    handleCategorySpecificFilterChange('fuelType', value === "all" ? null : value);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t("filters.selectFuelType")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("filters.all")}</SelectItem>
                    <SelectItem value="petrol">{t("filters.petrol")}</SelectItem>
                    <SelectItem value="diesel">{t("filters.diesel")}</SelectItem>
                    <SelectItem value="electric">{t("filters.electric")}</SelectItem>
                    <SelectItem value="hybrid">{t("filters.hybrid")}</SelectItem>
                    <SelectItem value="hybrid_plug_in">{t("filters.hybridPlugIn")}</SelectItem>
                    <SelectItem value="lpg">{t("filters.lpg")}</SelectItem>
                    <SelectItem value="cng">{t("filters.cng")}</SelectItem>
                    <SelectItem value="hydrogen">{t("filters.hydrogen")}</SelectItem>
                    <SelectItem value="other">{t("filters.other")}</SelectItem>
                  </SelectContent>
                </Select>
              </FilterSection>
              
              {/* Mileage range filter */}
              <FilterSection title={t("filters.mileage")} icon={<Tag size={16} />}>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="mileage-from" className="text-xs mb-1 block">{t("filters.from")}</Label>
                    <Input 
                      id="mileage-from"
                      placeholder={t("filters.from")} 
                      type="number" 
                      value={filters.categorySpecificFilters?.mileageFrom || ""} 
                      onChange={(e) => handleCategorySpecificFilterChange('mileageFrom', e.target.value ? parseInt(e.target.value) : null)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label htmlFor="mileage-to" className="text-xs mb-1 block">{t("filters.to")}</Label>
                    <Input 
                      id="mileage-to"
                      placeholder={t("filters.to")} 
                      type="number" 
                      value={filters.categorySpecificFilters?.mileageTo || ""} 
                      onChange={(e) => handleCategorySpecificFilterChange('mileageTo', e.target.value ? parseInt(e.target.value) : null)}
                      className="w-full"
                    />
                  </div>
                </div>
              </FilterSection>
              
              {/* Engine size filter */}
              <FilterSection title={t("filters.engineSize")} icon={<Tag size={16} />}>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="engine-from" className="text-xs mb-1 block">{t("filters.from")} (cm³)</Label>
                    <Input 
                      id="engine-from"
                      placeholder={t("filters.from")} 
                      type="number" 
                      value={filters.categorySpecificFilters?.engineSizeFrom || ""} 
                      onChange={(e) => handleCategorySpecificFilterChange('engineSizeFrom', e.target.value ? parseInt(e.target.value) : null)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label htmlFor="engine-to" className="text-xs mb-1 block">{t("filters.to")} (cm³)</Label>
                    <Input 
                      id="engine-to"
                      placeholder={t("filters.to")} 
                      type="number" 
                      value={filters.categorySpecificFilters?.engineSizeTo || ""} 
                      onChange={(e) => handleCategorySpecificFilterChange('engineSizeTo', e.target.value ? parseInt(e.target.value) : null)}
                      className="w-full"
                    />
                  </div>
                </div>
              </FilterSection>
              
              {/* Transmission type filter */}
              <FilterSection title={t("filters.transmission")} icon={<Tag size={16} />}>
                <Select
                  value={filters.categorySpecificFilters?.transmission || "all"}
                  onValueChange={(value) => {
                    handleCategorySpecificFilterChange('transmission', value === "all" ? null : value);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t("filters.selectTransmission")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("filters.all")}</SelectItem>
                    <SelectItem value="manual">{t("filters.manual")}</SelectItem>
                    <SelectItem value="automatic">{t("filters.automatic")}</SelectItem>
                    <SelectItem value="semi_automatic">{t("filters.semiAutomatic")}</SelectItem>
                  </SelectContent>
                </Select>
              </FilterSection>

              {/* Body type filter */}
              <FilterSection title={t("filters.bodyType")} icon={<Car size={16} />}>
                <Select
                  value={filters.categorySpecificFilters?.bodyType || "all"}
                  onValueChange={(value) => {
                    handleCategorySpecificFilterChange('bodyType', value === "all" ? null : value);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t("filters.selectBodyType")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("filters.all")}</SelectItem>
                    <SelectItem value="sedan">Sedan</SelectItem>
                    <SelectItem value="combi">Kombi</SelectItem>
                    <SelectItem value="hatchback">Hatchback</SelectItem>
                    <SelectItem value="suv">SUV</SelectItem>
                    <SelectItem value="coupe">Coupe</SelectItem>
                    <SelectItem value="cabriolet">Kabriolet</SelectItem>
                    <SelectItem value="van">Van</SelectItem>
                    <SelectItem value="pickup">Pickup</SelectItem>
                    <SelectItem value="minibus">Minibus</SelectItem>
                    <SelectItem value="other">{t("filters.other")}</SelectItem>
                  </SelectContent>
                </Select>
              </FilterSection>

              {/* Color filter */}
              <FilterSection title={t("filters.color")} icon={<Tag size={16} />}>
                <Select
                  value={filters.categorySpecificFilters?.color || "all"}
                  onValueChange={(value) => {
                    handleCategorySpecificFilterChange('color', value === "all" ? null : value);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t("filters.selectColor")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("filters.all")}</SelectItem>
                    <SelectItem value="black">Czarny</SelectItem>
                    <SelectItem value="white">Biały</SelectItem>
                    <SelectItem value="silver">Srebrny</SelectItem>
                    <SelectItem value="gray">Szary</SelectItem>
                    <SelectItem value="blue">Niebieski</SelectItem>
                    <SelectItem value="red">Czerwony</SelectItem>
                    <SelectItem value="green">Zielony</SelectItem>
                    <SelectItem value="yellow">Żółty</SelectItem>
                    <SelectItem value="brown">Brązowy</SelectItem>
                    <SelectItem value="other">{t("filters.other")}</SelectItem>
                  </SelectContent>
                </Select>
              </FilterSection>

              {/* Additional features */}
              <FilterSection title={t("filters.additionalFeatures")} icon={<Tag size={16} />} className="md:col-span-2">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="accident-free"
                      checked={filters.categorySpecificFilters?.accidentFree || false}
                      onCheckedChange={(checked) => {
                        handleCategorySpecificFilterChange('accidentFree', checked || null);
                      }}
                    />
                    <Label htmlFor="accident-free">Bezwypadkowy</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="first-owner"
                      checked={filters.categorySpecificFilters?.firstOwner || false}
                      onCheckedChange={(checked) => {
                        handleCategorySpecificFilterChange('firstOwner', checked || null);
                      }}
                    />
                    <Label htmlFor="first-owner">Pierwszy właściciel</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="service-history"
                      checked={filters.categorySpecificFilters?.serviceHistory || false}
                      onCheckedChange={(checked) => {
                        handleCategorySpecificFilterChange('serviceHistory', checked || null);
                      }}
                    />
                    <Label htmlFor="service-history">Historia serwisowa</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="vat-invoice"
                      checked={filters.categorySpecificFilters?.vatInvoice || false}
                      onCheckedChange={(checked) => {
                        handleCategorySpecificFilterChange('vatInvoice', checked || null);
                      }}
                    />
                    <Label htmlFor="vat-invoice">Faktura VAT</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="financing"
                      checked={filters.categorySpecificFilters?.financing || false}
                      onCheckedChange={(checked) => {
                        handleCategorySpecificFilterChange('financing', checked || null);
                      }}
                    />
                    <Label htmlFor="financing">Możliwość finansowania</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="imported"
                      checked={filters.categorySpecificFilters?.registeredInPoland === false || false}
                      onCheckedChange={(checked) => {
                        handleCategorySpecificFilterChange('registeredInPoland', checked === true ? false : null);
                      }}
                    />
                    <Label htmlFor="imported">Import</Label>
                  </div>
                </div>
              </FilterSection>
            </div>
          )}
          
          {/* NIERUCHOMOŚCI SPECIFIC FILTERS */}
          {selectedCategoryName === "Nieruchomości" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Rodzaj nieruchomości */}
              <FilterSection title={t("filters.propertyType")} icon={<Home size={16} />}>
                <Select
                  value={filters.categorySpecificFilters?.propertyType || "all"}
                  onValueChange={(value) => {
                    handleCategorySpecificFilterChange('propertyType', value === "all" ? null : value);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t("filters.selectPropertyType")} />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    <SelectItem value="all">{t("filters.all")}</SelectItem>
                    <SelectItem value="mieszkanie">Mieszkanie</SelectItem>
                    <SelectItem value="dom">Dom</SelectItem>
                    <SelectItem value="dzialka">Działka</SelectItem>
                    <SelectItem value="lokal_uzytkowy">Lokal użytkowy</SelectItem>
                    <SelectItem value="pokoj">Pokój</SelectItem>
                    <SelectItem value="garaz">Garaż/Parking</SelectItem>
                    <SelectItem value="biuro">Biuro</SelectItem>
                    <SelectItem value="hala">Hala/Magazyn</SelectItem>
                    <SelectItem value="gospodarstwo">Gospodarstwo</SelectItem>
                    <SelectItem value="kamienica">Kamienica</SelectItem>
                    <SelectItem value="pensjonat">Pensjonat</SelectItem>
                    <SelectItem value="pozostale">Pozostałe</SelectItem>
                  </SelectContent>
                </Select>
              </FilterSection>
              
              {/* Transakcja */}
              <FilterSection title={t("filters.transactionType")} icon={<Tag size={16} />}>
                <Select
                  value={filters.categorySpecificFilters?.transactionType || "all"}
                  onValueChange={(value) => {
                    handleCategorySpecificFilterChange('transactionType', value === "all" ? null : value);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t("filters.selectTransactionType")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("filters.all")}</SelectItem>
                    <SelectItem value="sprzedaz">Sprzedaż</SelectItem>
                    <SelectItem value="wynajem">Wynajem</SelectItem>
                    <SelectItem value="zamiana">Zamiana</SelectItem>
                  </SelectContent>
                </Select>
              </FilterSection>
              
              {/* Powierzchnia */}
              <FilterSection title={t("filters.area")} icon={<Maximize2 size={16} />}>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="area-from" className="text-xs mb-1 block">{t("filters.from")} (m²)</Label>
                    <Input 
                      id="area-from"
                      placeholder={t("filters.from")} 
                      type="number" 
                      value={filters.categorySpecificFilters?.areaFrom || ""} 
                      onChange={(e) => handleCategorySpecificFilterChange('areaFrom', e.target.value ? parseInt(e.target.value) : null)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label htmlFor="area-to" className="text-xs mb-1 block">{t("filters.to")} (m²)</Label>
                    <Input 
                      id="area-to"
                      placeholder={t("filters.to")} 
                      type="number" 
                      value={filters.categorySpecificFilters?.areaTo || ""} 
                      onChange={(e) => handleCategorySpecificFilterChange('areaTo', e.target.value ? parseInt(e.target.value) : null)}
                      className="w-full"
                    />
                  </div>
                </div>
              </FilterSection>
              
              {/* Liczba pokoi */}
              <FilterSection title={t("filters.rooms")} icon={<LayoutGrid size={16} />}>
                <Select
                  value={filters.categorySpecificFilters?.rooms || "all"}
                  onValueChange={(value) => {
                    handleCategorySpecificFilterChange('rooms', value === "all" ? null : value);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t("filters.selectRooms")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("filters.all")}</SelectItem>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="more">Więcej niż 5</SelectItem>
                  </SelectContent>
                </Select>
              </FilterSection>
              
              {/* Udogodnienia - grupa checkboxów */}
              <FilterSection title={t("filters.amenities")} icon={<LayoutList size={16} />} className="md:col-span-2">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="balcony"
                      checked={filters.categorySpecificFilters?.balcony || false}
                      onCheckedChange={(checked) => {
                        handleCategorySpecificFilterChange('balcony', checked || null);
                      }}
                    />
                    <Label htmlFor="balcony">Balkon</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="garage"
                      checked={filters.categorySpecificFilters?.garage || false}
                      onCheckedChange={(checked) => {
                        handleCategorySpecificFilterChange('garage', checked || null);
                      }}
                    />
                    <Label htmlFor="garage">Garaż/miejsce parkingowe</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="lift"
                      checked={filters.categorySpecificFilters?.lift || false}
                      onCheckedChange={(checked) => {
                        handleCategorySpecificFilterChange('lift', checked || null);
                      }}
                    />
                    <Label htmlFor="lift">Winda</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="garden"
                      checked={filters.categorySpecificFilters?.garden || false}
                      onCheckedChange={(checked) => {
                        handleCategorySpecificFilterChange('garden', checked || null);
                      }}
                    />
                    <Label htmlFor="garden">Ogród</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="basement"
                      checked={filters.categorySpecificFilters?.basement || false}
                      onCheckedChange={(checked) => {
                        handleCategorySpecificFilterChange('basement', checked || null);
                      }}
                    />
                    <Label htmlFor="basement">Piwnica</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="furnished"
                      checked={filters.categorySpecificFilters?.furnished || false}
                      onCheckedChange={(checked) => {
                        handleCategorySpecificFilterChange('furnished', checked || null);
                      }}
                    />
                    <Label htmlFor="furnished">Umeblowane</Label>
                  </div>
                </div>
              </FilterSection>
            </div>
          )}
          
          {/* ELEKTRONIKA SPECIFIC FILTERS */}
          {selectedCategoryName === "Elektronika" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Typ elektroniki */}
              <FilterSection title={t("filters.electronicType")} icon={<Smartphone size={16} />}>
                <Select
                  value={filters.categorySpecificFilters?.electronicType || "all"}
                  onValueChange={(value) => {
                    handleCategorySpecificFilterChange('electronicType', value === "all" ? null : value);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t("filters.selectType")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("filters.all")}</SelectItem>
                    <SelectItem value="telefony">Telefony</SelectItem>
                    <SelectItem value="komputery">Komputery</SelectItem>
                    <SelectItem value="laptopy">Laptopy</SelectItem>
                    <SelectItem value="tablety">Tablety</SelectItem>
                    <SelectItem value="telewizory">Telewizory</SelectItem>
                    <SelectItem value="konsole">Konsole</SelectItem>
                    <SelectItem value="audio">Audio</SelectItem>
                    <SelectItem value="fotografia">Fotografia</SelectItem>
                    <SelectItem value="akcesoria">Akcesoria</SelectItem>
                    <SelectItem value="inne">Inne</SelectItem>
                  </SelectContent>
                </Select>
              </FilterSection>
              
              {/* Marka */}
              <FilterSection title={t("filters.brand")} icon={<Tag size={16} />}>
                <Select
                  value={filters.categorySpecificFilters?.brand || "all"}
                  onValueChange={(value) => {
                    handleCategorySpecificFilterChange('brand', value === "all" ? null : value);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t("filters.selectBrand")} />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    <SelectItem value="all">{t("filters.all")}</SelectItem>
                    
                    {/* Smartfony i tablety */}
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="samsung">Samsung</SelectItem>
                    <SelectItem value="xiaomi">Xiaomi</SelectItem>
                    <SelectItem value="huawei">Huawei</SelectItem>
                    <SelectItem value="oppo">OPPO</SelectItem>
                    <SelectItem value="oneplus">OnePlus</SelectItem>
                    <SelectItem value="realme">Realme</SelectItem>
                    <SelectItem value="google">Google</SelectItem>
                    <SelectItem value="nokia">Nokia</SelectItem>
                    <SelectItem value="motorola">Motorola</SelectItem>
                    
                    {/* Komputery i laptopy */}
                    <SelectItem value="dell">Dell</SelectItem>
                    <SelectItem value="hp">HP</SelectItem>
                    <SelectItem value="lenovo">Lenovo</SelectItem>
                    <SelectItem value="asus">Asus</SelectItem>
                    <SelectItem value="acer">Acer</SelectItem>
                    <SelectItem value="msi">MSI</SelectItem>
                    <SelectItem value="microsoft">Microsoft</SelectItem>
                    
                    {/* Telewizory */}
                    <SelectItem value="lg">LG</SelectItem>
                    <SelectItem value="philips">Philips</SelectItem>
                    <SelectItem value="sony">Sony</SelectItem>
                    <SelectItem value="panasonic">Panasonic</SelectItem>
                    <SelectItem value="hisense">Hisense</SelectItem>
                    <SelectItem value="tcl">TCL</SelectItem>
                    
                    {/* Konsole */}
                    <SelectItem value="nintendo">Nintendo</SelectItem>
                    <SelectItem value="playstation">PlayStation</SelectItem>
                    <SelectItem value="xbox">Xbox</SelectItem>
                    
                    {/* Audio */}
                    <SelectItem value="bose">Bose</SelectItem>
                    <SelectItem value="jbl">JBL</SelectItem>
                    <SelectItem value="sennheiser">Sennheiser</SelectItem>
                    <SelectItem value="sonos">Sonos</SelectItem>
                    <SelectItem value="harman_kardon">Harman Kardon</SelectItem>
                    <SelectItem value="denon">Denon</SelectItem>
                    <SelectItem value="yamaha">Yamaha</SelectItem>
                    
                    {/* Foto */}
                    <SelectItem value="canon">Canon</SelectItem>
                    <SelectItem value="nikon">Nikon</SelectItem>
                    <SelectItem value="fujifilm">Fujifilm</SelectItem>
                    <SelectItem value="gopro">GoPro</SelectItem>
                    <SelectItem value="dji">DJI</SelectItem>
                    
                    <SelectItem value="inne">Inne</SelectItem>
                  </SelectContent>
                </Select>
              </FilterSection>
              
              {/* Model */}
              {filters.categorySpecificFilters?.brand && (
                <FilterSection title={t("filters.model")} icon={<Tag size={16} />}>
                  <Input 
                    placeholder={t("filters.enterModel")} 
                    value={filters.categorySpecificFilters?.model || ""} 
                    onChange={(e) => handleCategorySpecificFilterChange('model', e.target.value || null)}
                    className="w-full"
                  />
                </FilterSection>
              )}
              
              {/* Stan techniczny */}
              <FilterSection title={t("filters.technicalCondition")} icon={<Tag size={16} />}>
                <Select
                  value={filters.categorySpecificFilters?.technicalCondition || "all"}
                  onValueChange={(value) => {
                    handleCategorySpecificFilterChange('technicalCondition', value === "all" ? null : value);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t("filters.selectCondition")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("filters.all")}</SelectItem>
                    <SelectItem value="idealny">Idealny</SelectItem>
                    <SelectItem value="bardzo_dobry">Bardzo dobry</SelectItem>
                    <SelectItem value="dobry">Dobry</SelectItem>
                    <SelectItem value="do_naprawy">Do naprawy</SelectItem>
                    <SelectItem value="uszkodzony">Uszkodzony</SelectItem>
                    <SelectItem value="na_czesci">Na części</SelectItem>
                  </SelectContent>
                </Select>
              </FilterSection>
              
              {/* Dodatkowe cechy */}
              <FilterSection title={t("filters.additionalFeatures")} icon={<Tag size={16} />} className="md:col-span-2">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="warranty"
                      checked={filters.categorySpecificFilters?.warranty || false}
                      onCheckedChange={(checked) => {
                        handleCategorySpecificFilterChange('warranty', checked || null);
                      }}
                    />
                    <Label htmlFor="warranty">Gwarancja</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="original_packaging"
                      checked={filters.categorySpecificFilters?.originalPackaging || false}
                      onCheckedChange={(checked) => {
                        handleCategorySpecificFilterChange('originalPackaging', checked || null);
                      }}
                    />
                    <Label htmlFor="original_packaging">Oryginalne opakowanie</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="receipt"
                      checked={filters.categorySpecificFilters?.receipt || false}
                      onCheckedChange={(checked) => {
                        handleCategorySpecificFilterChange('receipt', checked || null);
                      }}
                    />
                    <Label htmlFor="receipt">Paragon/Faktura</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="complete_set"
                      checked={filters.categorySpecificFilters?.completeSet || false}
                      onCheckedChange={(checked) => {
                        handleCategorySpecificFilterChange('completeSet', checked || null);
                      }}
                    />
                    <Label htmlFor="complete_set">Kompletny zestaw</Label>
                  </div>
                </div>
              </FilterSection>
            </div>
          )}
        </div>
      )}
    </div>
  );
}