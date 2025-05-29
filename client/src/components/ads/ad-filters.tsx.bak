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
  Tractor
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
  
  // Get color based on category
  const getCategoryColor = (color: string = "indigo", selected: boolean = false) => {
    const colors: Record<string, { bg: string; text: string }> = {
      indigo: { bg: selected ? "bg-indigo-500" : "bg-indigo-100", text: selected ? "text-white" : "text-indigo-800" },
      blue: { bg: selected ? "bg-blue-500" : "bg-blue-100", text: selected ? "text-white" : "text-blue-800" },
      green: { bg: selected ? "bg-green-500" : "bg-green-100", text: selected ? "text-white" : "text-green-800" },
      yellow: { bg: selected ? "bg-yellow-500" : "bg-yellow-100", text: selected ? "text-white" : "text-yellow-800" },
      red: { bg: selected ? "bg-red-500" : "bg-red-100", text: selected ? "text-white" : "text-red-800" },
      purple: { bg: selected ? "bg-purple-500" : "bg-purple-100", text: selected ? "text-white" : "text-purple-800" },
    };
    
    const colorObj = colors[color] || colors.indigo;
    return `${colorObj.bg} ${colorObj.text}`;
  };

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    if (key === 'category') {
      onCategoryChange(value);
    }
    
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const handleSortChange = (value: string) => {
    if (onSortChange) {
      onSortChange(value);
    }
    setFilters({ ...filters, sortBy: value });
  };

  const handlePriceRangeChange = (values: number[]) => {
    setTempPriceRange([values[0], values[1]]);
  };

  const applyPriceRange = () => {
    handleFilterChange('minPrice', tempPriceRange[0]);
    handleFilterChange('maxPrice', tempPriceRange[1]);
  };

  const clearAllFilters = () => {
    const defaultFilters = {
      category: null,
      minPrice: null,
      maxPrice: null,
      location: null,
      datePosted: null,
      sortBy: "newest"
    };
    
    setFilters(defaultFilters);
    setTempPriceRange([0, 10000]);
    onCategoryChange(null);
    
    if (onFilterChange) {
      onFilterChange(defaultFilters);
    }
    
    if (onSortChange) {
      onSortChange("newest");
    }
  };

  const isAnyFilterApplied = () => {
    return (
      filters.category !== null ||
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

  return (
    <div className="space-y-4">
      {/* Categories as badges */}
      <div className="flex flex-wrap gap-2">
        <Badge
          variant="outline"
          className={`cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
            selectedCategory === null ? "bg-gray-200 dark:bg-gray-600 dark:text-white" : "dark:bg-gray-800 dark:text-gray-200"
          }`}
          onClick={() => onCategoryChange(null)}
        >
          {t("browse.allCategories")}
        </Badge>
        
        {categories.map((category) => {
          // Get translation for category name
          const categoryKey = `categories.${category.name.toLowerCase()}`;
          const categoryName = t(categoryKey) === categoryKey ? category.name : t(categoryKey);
          
          return (
            <Badge
              key={category.id}
              className={`cursor-pointer ${getCategoryColor(
                category.color,
                selectedCategory === category.id
              )}`}
              onClick={() => onCategoryChange(category.id === selectedCategory ? null : category.id)}
            >
              {categoryName}
            </Badge>
          );
        })}
      </div>

      {/* Filters and Sort Controls */}
      <div className="flex flex-wrap justify-between items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className="gap-2 dark:text-gray-300 dark:border-gray-600"
            onClick={() => setIsAdvancedFiltersOpen(!isAdvancedFiltersOpen)}
          >
            <Sliders size={16} />
            {t("browse.filters")}
            <ChevronDown size={16} className={`transition-transform ${isAdvancedFiltersOpen ? 'rotate-180' : ''}`} />
          </Button>
          
          {isAnyFilterApplied() && (
            <Button 
              variant="ghost" 
              size="sm"
              className="text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 gap-1"
              onClick={clearAllFilters}
            >
              <XCircle size={14} />
              {t("browse.clearFilters")}
            </Button>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <ArrowUpDown size={16} className="text-gray-500 dark:text-gray-400" />
          <Select
            value={filters.sortBy}
            onValueChange={handleSortChange}
          >
            <SelectTrigger className="h-9 w-[180px] dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
              <SelectValue placeholder={t("browse.sort")} />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
              <SelectItem value="newest" className="dark:text-gray-200">{t("browse.sort.newest")}</SelectItem>
              <SelectItem value="oldest" className="dark:text-gray-200">{t("browse.sort.oldest")}</SelectItem>
              <SelectItem value="priceAsc" className="dark:text-gray-200">{t("browse.sort.priceAsc")}</SelectItem>
              <SelectItem value="priceDesc" className="dark:text-gray-200">{t("browse.sort.priceDesc")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Advanced Filters */}
      {isAdvancedFiltersOpen && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
            
            {/* Left column - Basic filters */}
            <div className="border-r border-gray-200 dark:border-gray-700">
              {/* Price Range Filter */}
              <div className="border-b border-gray-200 dark:border-gray-700 p-4">
                <div className="flex justify-between items-center cursor-pointer mb-3" 
                     onClick={() => document.getElementById("price-accordion")?.click()}>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200">Przedział cenowy</h3>
                  <ChevronDown size={16} className="text-gray-500" />
                </div>
                <Accordion type="single" collapsible defaultValue="price" className="w-full">
                  <AccordionItem value="price" className="border-none">
                    <AccordionTrigger id="price-accordion" className="hidden">Przedział cenowy</AccordionTrigger>
                    <AccordionContent className="pt-0">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500 dark:text-gray-400">zł {tempPriceRange[0]}</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">zł {tempPriceRange[1]}</span>
                        </div>
                        <Slider
                          value={tempPriceRange}
                          min={0}
                          max={10000}
                          step={100}
                          onValueChange={handlePriceRangeChange}
                          className="py-4"
                        />
                        <div className="flex gap-2">
                          <div className="flex-1">
                            <div className="relative">
                              <span className="absolute left-3 top-2.5 text-gray-500 dark:text-gray-400">zł</span>
                              <Input 
                                id="minPrice"
                                type="number" 
                                value={tempPriceRange[0]}
                                onChange={(e) => setTempPriceRange([Number(e.target.value), tempPriceRange[1]])}
                                className="pl-7 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                                placeholder="od"
                              />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="relative">
                              <span className="absolute left-3 top-2.5 text-gray-500 dark:text-gray-400">zł</span>
                              <Input 
                                id="maxPrice"
                                type="number" 
                                value={tempPriceRange[1]}
                                onChange={(e) => setTempPriceRange([tempPriceRange[0], Number(e.target.value)])}
                                className="pl-7 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                                placeholder="do"
                              />
                            </div>
                          </div>
                        </div>
                        <Button size="sm" onClick={applyPriceRange} className="w-full">
                          Pokaż ogłoszenia
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              
              {/* Location Filter */}
              <div className="border-b border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center gap-2 cursor-pointer mb-3"
                     onClick={() => document.getElementById("location-accordion")?.click()}>
                  <MapPin size={16} className="text-primary" />
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200">Lokalizacja</h3>
                  <div className="ml-auto">
                    <ChevronDown size={16} className="text-gray-500" />
                  </div>
                </div>
                <Accordion type="single" collapsible defaultValue="location" className="w-full">
                  <AccordionItem value="location" className="border-none">
                    <AccordionTrigger id="location-accordion" className="hidden">Lokalizacja</AccordionTrigger>
                    <AccordionContent className="pt-0">
                      <div className="space-y-4">
                        <div className="relative border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
                          <MapPin size={16} className="absolute left-3 top-3 text-gray-500 dark:text-gray-400" />
                          <Input 
                            placeholder="Wpisz lokalizację" 
                            value={filters.location || ''}
                            onChange={(e) => handleFilterChange('location', e.target.value || null)}
                            className="pl-10 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-gray-700 dark:text-gray-200"
                          />
                        </div>
                        
                        <div className="space-y-3">
                          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-2">Województwa:</h4>
                          <div className="flex flex-wrap gap-2">
                            {[
                              "Dolnośląskie", "Kujawsko-pomorskie", "Lubelskie", "Lubuskie", 
                              "Łódzkie", "Małopolskie", "Mazowieckie", "Opolskie", 
                              "Podkarpackie", "Podlaskie", "Pomorskie", "Śląskie", 
                              "Świętokrzyskie", "Warmińsko-mazurskie", "Wielkopolskie", "Zachodniopomorskie",
                              "Cała Polska"
                            ].map(region => (
                              <Badge 
                                key={region}
                                variant="outline" 
                                className="cursor-pointer hover:bg-primary-50 hover:text-primary-600 dark:hover:bg-gray-700"
                                onClick={() => handleFilterChange('location', region)}
                              >
                                {region}
                              </Badge>
                            ))}
                          </div>
                          
                          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-3">Popularne miasta:</h4>
                          <div className="flex flex-wrap gap-2">
                            {[
                              "Warszawa", "Kraków", "Łódź", "Wrocław", "Poznań", "Gdańsk", 
                              "Szczecin", "Bydgoszcz", "Lublin", "Białystok", "Katowice", 
                              "Gdynia", "Częstochowa", "Radom", "Sosnowiec", "Toruń", 
                              "Kielce", "Rzeszów", "Gliwice", "Zabrze", "Olsztyn", "Bielsko-Biała",
                              "Bytom", "Zielona Góra", "Rybnik", "Ruda Śląska", "Opole", "Tychy",
                              "Gorzów Wielkopolski", "Elbląg", "Płock", "Dąbrowa Górnicza", "Wałbrzych"
                            ].map(city => (
                              <Badge 
                                key={city}
                                variant="outline" 
                                className="cursor-pointer hover:bg-primary-50 hover:text-primary-600 dark:hover:bg-gray-700"
                                onClick={() => handleFilterChange('location', city)}
                              >
                                {city}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
  
              {/* Data publikacji */}
              <div className="border-b border-gray-200 dark:border-gray-700 p-4">
                <div className="flex justify-between items-center cursor-pointer mb-3"
                     onClick={() => document.getElementById("date-accordion")?.click()}>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200">Data publikacji</h3>
                  <ChevronDown size={16} className="text-gray-500" />
                </div>
                <Accordion type="single" collapsible defaultValue="date" className="w-full">
                  <AccordionItem value="date" className="border-none">
                    <AccordionTrigger id="date-accordion" className="hidden">Data publikacji</AccordionTrigger>
                    <AccordionContent className="pt-0">
                      <RadioGroup
                        value={filters.datePosted || "all"}
                        onValueChange={(value) => handleFilterChange('datePosted', value === 'all' ? null : value)}
                        className="space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="all" id="date-all" />
                          <Label htmlFor="date-all">Wszystkie</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="today" id="date-today" />
                          <Label htmlFor="date-today">Dzisiaj</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yesterday" id="date-yesterday" />
                          <Label htmlFor="date-yesterday">Wczoraj</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="lastWeek" id="date-lastWeek" />
                          <Label htmlFor="date-lastWeek">Ostatnie 7 dni</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="lastMonth" id="date-lastMonth" />
                          <Label htmlFor="date-lastMonth">Ostatnie 30 dni</Label>
                        </div>
                      </RadioGroup>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              
              {/* Stan */}
              <div className="border-b border-gray-200 dark:border-gray-700 p-4">
                <div className="flex justify-between items-center cursor-pointer mb-3"
                     onClick={() => document.getElementById("condition-accordion")?.click()}>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200">Stan</h3>
                  <ChevronDown size={16} className="text-gray-500" />
                </div>
                <Accordion type="single" collapsible defaultValue="condition" className="w-full">
                  <AccordionItem value="condition" className="border-none">
                    <AccordionTrigger id="condition-accordion" className="hidden">Stan</AccordionTrigger>
                    <AccordionContent className="pt-0">
                      <RadioGroup
                        value={filters.condition || "all"}
                        onValueChange={(value) => handleFilterChange('condition', value === 'all' ? null : value)}
                        className="space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="all" id="condition-all" />
                          <Label htmlFor="condition-all" className="dark:text-gray-200">
                            Wszystkie
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="new" id="condition-new" />
                          <Label htmlFor="condition-new" className="dark:text-gray-200">
                            Nowy
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="used" id="condition-used" />
                          <Label htmlFor="condition-used" className="dark:text-gray-200">
                            Używany
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="damaged" id="condition-damaged" />
                          <Label htmlFor="condition-damaged" className="dark:text-gray-200">
                            Uszkodzony
                          </Label>
                        </div>
                      </RadioGroup>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              
              {/* Delivery Options Filter */}
            <AccordionItem value="delivery" className="border-b-0">
              <AccordionTrigger className="py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:no-underline">
                {t("browse.filters.delivery")}
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="delivery-shipping" 
                      checked={filters.deliveryOptions?.includes("shipping")} 
                      onCheckedChange={(checked) => {
                        const newDeliveryOptions = [...(filters.deliveryOptions || [])];
                        if (checked) {
                          newDeliveryOptions.push("shipping");
                        } else {
                          const index = newDeliveryOptions.indexOf("shipping");
                          if (index > -1) newDeliveryOptions.splice(index, 1);
                        }
                        handleFilterChange('deliveryOptions', newDeliveryOptions);
                      }}
                    />
                    <Label htmlFor="delivery-shipping" className="dark:text-gray-200">
                      Wysyłka
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="delivery-pickup" 
                      checked={filters.deliveryOptions?.includes("pickup")} 
                      onCheckedChange={(checked) => {
                        const newDeliveryOptions = [...(filters.deliveryOptions || [])];
                        if (checked) {
                          newDeliveryOptions.push("pickup");
                        } else {
                          const index = newDeliveryOptions.indexOf("pickup");
                          if (index > -1) newDeliveryOptions.splice(index, 1);
                        }
                        handleFilterChange('deliveryOptions', newDeliveryOptions);
                      }}
                    />
                    <Label htmlFor="delivery-pickup" className="dark:text-gray-200">
                      Odbiór osobisty
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="delivery-meeting" 
                      checked={filters.deliveryOptions?.includes("meeting")} 
                      onCheckedChange={(checked) => {
                        const newDeliveryOptions = [...(filters.deliveryOptions || [])];
                        if (checked) {
                          newDeliveryOptions.push("meeting");
                        } else {
                          const index = newDeliveryOptions.indexOf("meeting");
                          if (index > -1) newDeliveryOptions.splice(index, 1);
                        }
                        handleFilterChange('deliveryOptions', newDeliveryOptions);
                      }}
                    />
                    <Label htmlFor="delivery-meeting" className="dark:text-gray-200">
                      Spotkanie ze sprzedającym
                    </Label>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            {/* Category Specific Filters */}
            {selectedCategoryName && categorySpecificSchema && (
              <AccordionItem value="categorySpecific" className="border-b-0">
                <AccordionTrigger className="py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:no-underline">
                  {t("browse.filters.category")} - {selectedCategoryName}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    {selectedCategoryName === "Motoryzacja" && (
                      <>
                        <div className="space-y-2">
                          <Label className="text-sm text-gray-700 dark:text-gray-300">Marka</Label>
                          <Select
                            value={filters.categorySpecificFilters?.brand || ""}
                            onValueChange={(value) => 
                              handleFilterChange('categorySpecificFilters', { 
                                ...(filters.categorySpecificFilters || {}), 
                                brand: value 
                              })
                            }
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                              <SelectValue placeholder="Wybierz markę" />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="audi" className="dark:text-gray-200">Audi</SelectItem>
                              <SelectItem value="bmw" className="dark:text-gray-200">BMW</SelectItem>
                              <SelectItem value="ford" className="dark:text-gray-200">Ford</SelectItem>
                              <SelectItem value="mercedes" className="dark:text-gray-200">Mercedes</SelectItem>
                              <SelectItem value="toyota" className="dark:text-gray-200">Toyota</SelectItem>
                              <SelectItem value="volkswagen" className="dark:text-gray-200">Volkswagen</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label className="text-sm text-gray-700 dark:text-gray-300">Rodzaj paliwa</Label>
                          <Select
                            value={filters.categorySpecificFilters?.fuelType || ""}
                            onValueChange={(value) => 
                              handleFilterChange('categorySpecificFilters', { 
                                ...(filters.categorySpecificFilters || {}), 
                                fuelType: value 
                              })
                            }
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                              <SelectValue placeholder="Wybierz rodzaj paliwa" />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="petrol" className="dark:text-gray-200">Benzyna</SelectItem>
                              <SelectItem value="diesel" className="dark:text-gray-200">Diesel</SelectItem>
                              <SelectItem value="electric" className="dark:text-gray-200">Elektryczny</SelectItem>
                              <SelectItem value="hybrid" className="dark:text-gray-200">Hybryda</SelectItem>
                              <SelectItem value="lpg" className="dark:text-gray-200">LPG</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    )}
                    
                    {selectedCategoryName === "Nieruchomości" && (
                      <>
                        <div className="space-y-2">
                          <Label className="text-sm text-gray-700 dark:text-gray-300">Rodzaj nieruchomości</Label>
                          <Select
                            value={filters.categorySpecificFilters?.type || ""}
                            onValueChange={(value) => 
                              handleFilterChange('categorySpecificFilters', { 
                                ...(filters.categorySpecificFilters || {}), 
                                type: value 
                              })
                            }
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                              <SelectValue placeholder="Wybierz rodzaj nieruchomości" />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="apartment" className="dark:text-gray-200">Mieszkanie</SelectItem>
                              <SelectItem value="house" className="dark:text-gray-200">Dom</SelectItem>
                              <SelectItem value="room" className="dark:text-gray-200">Pokój</SelectItem>
                              <SelectItem value="plot" className="dark:text-gray-200">Działka</SelectItem>
                              <SelectItem value="garage" className="dark:text-gray-200">Garaż</SelectItem>
                              <SelectItem value="commercial" className="dark:text-gray-200">Lokal użytkowy</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label className="text-sm text-gray-700 dark:text-gray-300">Liczba pokoi</Label>
                          <Select
                            value={filters.categorySpecificFilters?.rooms?.toString() || ""}
                            onValueChange={(value) => 
                              handleFilterChange('categorySpecificFilters', { 
                                ...(filters.categorySpecificFilters || {}), 
                                rooms: parseInt(value) 
                              })
                            }
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                              <SelectValue placeholder="Wybierz liczbę pokoi" />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="1" className="dark:text-gray-200">1</SelectItem>
                              <SelectItem value="2" className="dark:text-gray-200">2</SelectItem>
                              <SelectItem value="3" className="dark:text-gray-200">3</SelectItem>
                              <SelectItem value="4" className="dark:text-gray-200">4</SelectItem>
                              <SelectItem value="5" className="dark:text-gray-200">5+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    )}
                    
                    {selectedCategoryName === "Elektronika" && (
                      <>
                        <div className="space-y-2">
                          <Label className="text-sm text-gray-700 dark:text-gray-300">Kategoria</Label>
                          <Select
                            value={filters.categorySpecificFilters?.category || ""}
                            onValueChange={(value) => 
                              handleFilterChange('categorySpecificFilters', { 
                                ...(filters.categorySpecificFilters || {}), 
                                category: value 
                              })
                            }
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                              <SelectValue placeholder="Wybierz kategorię" />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="smartphones" className="dark:text-gray-200">Smartfony</SelectItem>
                              <SelectItem value="computers" className="dark:text-gray-200">Komputery</SelectItem>
                              <SelectItem value="laptops" className="dark:text-gray-200">Laptopy</SelectItem>
                              <SelectItem value="tablets" className="dark:text-gray-200">Tablety</SelectItem>
                              <SelectItem value="tv" className="dark:text-gray-200">Telewizory</SelectItem>
                              <SelectItem value="audio" className="dark:text-gray-200">Audio</SelectItem>
                              <SelectItem value="gaming" className="dark:text-gray-200">Gaming</SelectItem>
                              <SelectItem value="accessories" className="dark:text-gray-200">Akcesoria</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label className="text-sm text-gray-700 dark:text-gray-300">Marka</Label>
                          <Select
                            value={filters.categorySpecificFilters?.brand || ""}
                            onValueChange={(value) => 
                              handleFilterChange('categorySpecificFilters', { 
                                ...(filters.categorySpecificFilters || {}), 
                                brand: value 
                              })
                            }
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                              <SelectValue placeholder="Wybierz markę" />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="apple" className="dark:text-gray-200">Apple</SelectItem>
                              <SelectItem value="samsung" className="dark:text-gray-200">Samsung</SelectItem>
                              <SelectItem value="xiaomi" className="dark:text-gray-200">Xiaomi</SelectItem>
                              <SelectItem value="huawei" className="dark:text-gray-200">Huawei</SelectItem>
                              <SelectItem value="sony" className="dark:text-gray-200">Sony</SelectItem>
                              <SelectItem value="lg" className="dark:text-gray-200">LG</SelectItem>
                              <SelectItem value="other" className="dark:text-gray-200">Inna</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        </div>
      )}
    </div>
  );
}
