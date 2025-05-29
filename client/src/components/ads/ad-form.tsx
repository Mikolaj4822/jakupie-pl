import { useState } from "react";
import { Category } from "@shared/schema";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, ArrowDown } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent
} from "@/components/ui/card";

interface AdFormProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  categories: Category[];
  isLoading: boolean;
}

export default function AdForm({ form, onSubmit, categories, isLoading }: AdFormProps) {
  const { t } = useLanguage();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    form.getValues("categoryId") || null
  );
  const [showCategoryFilters, setShowCategoryFilters] = useState<boolean>(false);
  const [categoryFilters, setCategoryFilters] = useState<Record<string, any>>({});
  
  // Obsługa zmiany kategorii
  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
    form.setValue("categoryId", categoryId);
    // Pokazujemy filtry po wybraniu kategorii
    setShowCategoryFilters(true);
    // Resetujemy filtry przy zmianie kategorii
    setCategoryFilters({});
  };
  
  // Obsługa zmiany filtra specyficznego dla kategorii
  const handleCategoryFilterChange = (field: string, value: any) => {
    setCategoryFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Przed wysłaniem formularza, dodajemy filtry kategorii do danych
  const handleFormSubmit = (data: any) => {
    // Jeśli mamy jakieś filtry kategorii, dodajemy je do danych
    if (Object.keys(categoryFilters).length > 0) {
      data.categoryFilters = categoryFilters;
    }
    onSubmit(data);
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="bg-white dark:bg-gray-800 p-6 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-4 border-b pb-2 dark:text-white">{t("createAd.form.basicInfo") || "Podstawowe informacje"}</h2>
          
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-gray-800 dark:text-white font-medium">{t("createAd.form.title")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("createAd.form.title.placeholder")} {...field} className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" />
                </FormControl>
                <FormDescription className="text-sm text-gray-500 dark:text-gray-400">
                  {t("createAd.form.title.desc")}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-gray-800 dark:text-white font-medium">{t("createAd.form.category")}</FormLabel>
                <Select
                  onValueChange={(value) => handleCategoryChange(parseInt(value))}
                  defaultValue={field.value ? field.value.toString() : undefined}
                >
                  <FormControl>
                    <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                      <SelectValue placeholder={t("createAd.form.category.placeholder")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id.toString()} className="dark:text-gray-200 dark:focus:bg-gray-700">
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Filtry specyficzne dla kategorii */}
          {selectedCategoryId !== null && selectedCategoryId > 0 && (
            <div className="mb-6">
              <div 
                className="flex items-center justify-between cursor-pointer py-2 px-4 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                onClick={() => setShowCategoryFilters(!showCategoryFilters)}
              >
                <div className="flex items-center">
                  <span className="bg-red-500 w-2 h-6 rounded mr-2"></span>
                  <h3 className="font-medium dark:text-white">{t("filters.categorySpecific") || "Filtry dla kategorii"}</h3>
                </div>
                <ArrowDown className={`h-5 w-5 dark:text-gray-300 transition-transform ${showCategoryFilters ? 'rotate-180' : ''}`} />
              </div>
              
              {showCategoryFilters && (
                <Card className="mt-2 border-gray-200 dark:border-gray-700">
                  <CardContent className="p-4">
                    {selectedCategoryId === 1 && ( // Elektronika
                      <div className="space-y-4 border-l-2 border-red-500 pl-4 py-2">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">{t("filters.deviceDetails") || "Szczegóły urządzenia"}</h4>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.electronicType") || "Typ urządzenia"}</Label>
                          <Select
                            onValueChange={(value) => handleCategoryFilterChange("electronicType", value)}
                            value={categoryFilters.electronicType || ""}
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                              <SelectValue placeholder={t("filters.selectType") || "Wybierz typ urządzenia"} />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700 max-h-[300px]">
                              <SelectItem value="smartphone" className="dark:text-gray-200">Smartfon</SelectItem>
                              <SelectItem value="tablet" className="dark:text-gray-200">Tablet</SelectItem>
                              <SelectItem value="laptop" className="dark:text-gray-200">Laptop</SelectItem>
                              <SelectItem value="pc" className="dark:text-gray-200">Komputer stacjonarny</SelectItem>
                              <SelectItem value="monitor" className="dark:text-gray-200">Monitor</SelectItem>
                              <SelectItem value="tv" className="dark:text-gray-200">Telewizor</SelectItem>
                              <SelectItem value="audio" className="dark:text-gray-200">Sprzęt audio</SelectItem>
                              <SelectItem value="console" className="dark:text-gray-200">Konsola do gier</SelectItem>
                              <SelectItem value="camera" className="dark:text-gray-200">Aparat fotograficzny</SelectItem>
                              <SelectItem value="drone" className="dark:text-gray-200">Dron</SelectItem>
                              <SelectItem value="printer" className="dark:text-gray-200">Drukarka/Skaner</SelectItem>
                              <SelectItem value="wearable" className="dark:text-gray-200">Urządzenie ubieralne (smartwatch)</SelectItem>
                              <SelectItem value="network" className="dark:text-gray-200">Sprzęt sieciowy</SelectItem>
                              <SelectItem value="components" className="dark:text-gray-200">Części komputerowe</SelectItem>
                              <SelectItem value="peripherals" className="dark:text-gray-200">Peryferia komputerowe</SelectItem>
                              <SelectItem value="smart_home" className="dark:text-gray-200">Inteligentny dom</SelectItem>
                              <SelectItem value="other" className="dark:text-gray-200">Inne</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        {categoryFilters.electronicType && (
                          <div>
                            <Label className="dark:text-white">{t("filters.brand") || "Marka"}</Label>
                            <Select
                              onValueChange={(value) => handleCategoryFilterChange("brand", value)}
                              value={categoryFilters.brand || ""}
                            >
                              <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                                <SelectValue placeholder={t("filters.selectBrand") || "Wybierz markę"} />
                              </SelectTrigger>
                              <SelectContent className="dark:bg-gray-800 dark:border-gray-700 max-h-[300px]">
                                {/* Smartfony, tablety i wearable */}
                                {(categoryFilters.electronicType === "smartphone" || 
                                  categoryFilters.electronicType === "tablet" || 
                                  categoryFilters.electronicType === "wearable") && (
                                  <>
                                    <SelectItem value="apple" className="dark:text-gray-200">Apple</SelectItem>
                                    <SelectItem value="samsung" className="dark:text-gray-200">Samsung</SelectItem>
                                    <SelectItem value="xiaomi" className="dark:text-gray-200">Xiaomi</SelectItem>
                                    <SelectItem value="huawei" className="dark:text-gray-200">Huawei</SelectItem>
                                    <SelectItem value="oppo" className="dark:text-gray-200">OPPO</SelectItem>
                                    <SelectItem value="realme" className="dark:text-gray-200">realme</SelectItem>
                                    <SelectItem value="oneplus" className="dark:text-gray-200">OnePlus</SelectItem>
                                    <SelectItem value="google" className="dark:text-gray-200">Google</SelectItem>
                                    <SelectItem value="sony" className="dark:text-gray-200">Sony</SelectItem>
                                    <SelectItem value="motorola" className="dark:text-gray-200">Motorola</SelectItem>
                                    <SelectItem value="nokia" className="dark:text-gray-200">Nokia</SelectItem>
                                    <SelectItem value="garmin" className="dark:text-gray-200">Garmin</SelectItem>
                                    <SelectItem value="fitbit" className="dark:text-gray-200">Fitbit</SelectItem>
                                  </>
                                )}
                                
                                {/* Laptopy i komputery */}
                                {(categoryFilters.electronicType === "laptop" || 
                                  categoryFilters.electronicType === "pc") && (
                                  <>
                                    <SelectItem value="apple" className="dark:text-gray-200">Apple</SelectItem>
                                    <SelectItem value="lenovo" className="dark:text-gray-200">Lenovo</SelectItem>
                                    <SelectItem value="hp" className="dark:text-gray-200">HP</SelectItem>
                                    <SelectItem value="dell" className="dark:text-gray-200">Dell</SelectItem>
                                    <SelectItem value="asus" className="dark:text-gray-200">Asus</SelectItem>
                                    <SelectItem value="acer" className="dark:text-gray-200">Acer</SelectItem>
                                    <SelectItem value="msi" className="dark:text-gray-200">MSI</SelectItem>
                                    <SelectItem value="huawei" className="dark:text-gray-200">Huawei</SelectItem>
                                    <SelectItem value="microsoft" className="dark:text-gray-200">Microsoft</SelectItem>
                                    <SelectItem value="razer" className="dark:text-gray-200">Razer</SelectItem>
                                    <SelectItem value="samsung" className="dark:text-gray-200">Samsung</SelectItem>
                                    <SelectItem value="toshiba" className="dark:text-gray-200">Toshiba</SelectItem>
                                    <SelectItem value="fujitsu" className="dark:text-gray-200">Fujitsu</SelectItem>
                                  </>
                                )}
                                
                                {/* Monitory i TV */}
                                {(categoryFilters.electronicType === "monitor" || 
                                  categoryFilters.electronicType === "tv") && (
                                  <>
                                    <SelectItem value="samsung" className="dark:text-gray-200">Samsung</SelectItem>
                                    <SelectItem value="lg" className="dark:text-gray-200">LG</SelectItem>
                                    <SelectItem value="philips" className="dark:text-gray-200">Philips</SelectItem>
                                    <SelectItem value="sony" className="dark:text-gray-200">Sony</SelectItem>
                                    <SelectItem value="panasonic" className="dark:text-gray-200">Panasonic</SelectItem>
                                    <SelectItem value="benq" className="dark:text-gray-200">BenQ</SelectItem>
                                    <SelectItem value="aoc" className="dark:text-gray-200">AOC</SelectItem>
                                    <SelectItem value="dell" className="dark:text-gray-200">Dell</SelectItem>
                                    <SelectItem value="asus" className="dark:text-gray-200">Asus</SelectItem>
                                    <SelectItem value="acer" className="dark:text-gray-200">Acer</SelectItem>
                                    <SelectItem value="msi" className="dark:text-gray-200">MSI</SelectItem>
                                    <SelectItem value="tcl" className="dark:text-gray-200">TCL</SelectItem>
                                    <SelectItem value="hisense" className="dark:text-gray-200">Hisense</SelectItem>
                                  </>
                                )}
                                
                                <SelectItem value="other" className="dark:text-gray-200">Inna marka</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        
                        {(categoryFilters.electronicType === "smartphone" || 
                          categoryFilters.electronicType === "tablet" || 
                          categoryFilters.electronicType === "laptop") && (
                          <div>
                            <Label className="dark:text-white">{t("filters.memory") || "Pamięć RAM"}</Label>
                            <Select
                              onValueChange={(value) => handleCategoryFilterChange("memory", value)}
                              value={categoryFilters.memory || ""}
                            >
                              <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                                <SelectValue placeholder={t("filters.selectMemory") || "Wybierz ilość pamięci RAM"} />
                              </SelectTrigger>
                              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                <SelectItem value="1" className="dark:text-gray-200">1 GB</SelectItem>
                                <SelectItem value="2" className="dark:text-gray-200">2 GB</SelectItem>
                                <SelectItem value="3" className="dark:text-gray-200">3 GB</SelectItem>
                                <SelectItem value="4" className="dark:text-gray-200">4 GB</SelectItem>
                                <SelectItem value="6" className="dark:text-gray-200">6 GB</SelectItem>
                                <SelectItem value="8" className="dark:text-gray-200">8 GB</SelectItem>
                                <SelectItem value="12" className="dark:text-gray-200">12 GB</SelectItem>
                                <SelectItem value="16" className="dark:text-gray-200">16 GB</SelectItem>
                                <SelectItem value="32" className="dark:text-gray-200">32 GB</SelectItem>
                                <SelectItem value="64" className="dark:text-gray-200">64 GB lub więcej</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        
                        {(categoryFilters.electronicType === "smartphone" || 
                          categoryFilters.electronicType === "tablet" || 
                          categoryFilters.electronicType === "laptop" ||
                          categoryFilters.electronicType === "pc") && (
                          <div>
                            <Label className="dark:text-white">{t("filters.storage") || "Pamięć wewnętrzna"}</Label>
                            <Select
                              onValueChange={(value) => handleCategoryFilterChange("storage", value)}
                              value={categoryFilters.storage || ""}
                            >
                              <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                                <SelectValue placeholder={t("filters.selectStorage") || "Wybierz pojemność"} />
                              </SelectTrigger>
                              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                <SelectItem value="16" className="dark:text-gray-200">16 GB</SelectItem>
                                <SelectItem value="32" className="dark:text-gray-200">32 GB</SelectItem>
                                <SelectItem value="64" className="dark:text-gray-200">64 GB</SelectItem>
                                <SelectItem value="128" className="dark:text-gray-200">128 GB</SelectItem>
                                <SelectItem value="256" className="dark:text-gray-200">256 GB</SelectItem>
                                <SelectItem value="512" className="dark:text-gray-200">512 GB</SelectItem>
                                <SelectItem value="1024" className="dark:text-gray-200">1 TB</SelectItem>
                                <SelectItem value="2048" className="dark:text-gray-200">2 TB</SelectItem>
                                <SelectItem value="4096" className="dark:text-gray-200">4 TB lub więcej</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        
                        {(categoryFilters.electronicType === "monitor" || 
                          categoryFilters.electronicType === "tv") && (
                          <div>
                            <Label className="dark:text-white">{t("filters.screenSize") || "Przekątna ekranu"}</Label>
                            <Select
                              onValueChange={(value) => handleCategoryFilterChange("screenSize", value)}
                              value={categoryFilters.screenSize || ""}
                            >
                              <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                                <SelectValue placeholder={t("filters.selectScreenSize") || "Wybierz rozmiar ekranu"} />
                              </SelectTrigger>
                              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                <SelectItem value="below_24" className="dark:text-gray-200">Poniżej 24 cali</SelectItem>
                                <SelectItem value="24_27" className="dark:text-gray-200">24-27 cali</SelectItem>
                                <SelectItem value="28_32" className="dark:text-gray-200">28-32 cali</SelectItem>
                                <SelectItem value="33_43" className="dark:text-gray-200">33-43 cali</SelectItem>
                                <SelectItem value="44_50" className="dark:text-gray-200">44-50 cali</SelectItem>
                                <SelectItem value="51_55" className="dark:text-gray-200">51-55 cali</SelectItem>
                                <SelectItem value="56_65" className="dark:text-gray-200">56-65 cali</SelectItem>
                                <SelectItem value="above_65" className="dark:text-gray-200">Powyżej 65 cali</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.condition") || "Stan"}</Label>
                          <RadioGroup 
                            onValueChange={(value) => handleCategoryFilterChange("condition", value)}
                            value={categoryFilters.condition || ""}
                            className="mt-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="new" id="condition-new" />
                              <Label htmlFor="condition-new" className="dark:text-gray-200">
                                {t("filters.condition.new") || "Nowy"}
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="like_new" id="condition-like-new" />
                              <Label htmlFor="condition-like-new" className="dark:text-gray-200">
                                {t("filters.condition.like_new") || "Jak nowy"}
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="used" id="condition-used" />
                              <Label htmlFor="condition-used" className="dark:text-gray-200">
                                {t("filters.condition.used") || "Używany"}
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="refurbished" id="condition-refurbished" />
                              <Label htmlFor="condition-refurbished" className="dark:text-gray-200">
                                {t("filters.condition.refurbished") || "Odnowiony"}
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="damaged" id="condition-damaged" />
                              <Label htmlFor="condition-damaged" className="dark:text-gray-200">
                                {t("filters.condition.damaged") || "Uszkodzony"}
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.warranty") || "Gwarancja"}</Label>
                          <Select
                            onValueChange={(value) => handleCategoryFilterChange("warranty", value)}
                            value={categoryFilters.warranty || ""}
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                              <SelectValue placeholder={t("filters.selectWarranty") || "Wybierz gwarancję"} />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="none" className="dark:text-gray-200">Brak gwarancji</SelectItem>
                              <SelectItem value="1_month" className="dark:text-gray-200">1 miesiąc</SelectItem>
                              <SelectItem value="3_months" className="dark:text-gray-200">3 miesiące</SelectItem>
                              <SelectItem value="6_months" className="dark:text-gray-200">6 miesięcy</SelectItem>
                              <SelectItem value="12_months" className="dark:text-gray-200">12 miesięcy</SelectItem>
                              <SelectItem value="24_months" className="dark:text-gray-200">24 miesiące</SelectItem>
                              <SelectItem value="more" className="dark:text-gray-200">Powyżej 24 miesięcy</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.color") || "Kolor"}</Label>
                          <Select
                            onValueChange={(value) => handleCategoryFilterChange("color", value)}
                            value={categoryFilters.color || ""}
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                              <SelectValue placeholder={t("filters.selectColor") || "Wybierz kolor"} />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="black" className="dark:text-gray-200">Czarny</SelectItem>
                              <SelectItem value="white" className="dark:text-gray-200">Biały</SelectItem>
                              <SelectItem value="gray" className="dark:text-gray-200">Szary/Srebrny</SelectItem>
                              <SelectItem value="blue" className="dark:text-gray-200">Niebieski</SelectItem>
                              <SelectItem value="red" className="dark:text-gray-200">Czerwony</SelectItem>
                              <SelectItem value="green" className="dark:text-gray-200">Zielony</SelectItem>
                              <SelectItem value="gold" className="dark:text-gray-200">Złoty</SelectItem>
                              <SelectItem value="rose_gold" className="dark:text-gray-200">Różowe złoto</SelectItem>
                              <SelectItem value="purple" className="dark:text-gray-200">Fioletowy</SelectItem>
                              <SelectItem value="yellow" className="dark:text-gray-200">Żółty</SelectItem>
                              <SelectItem value="other" className="dark:text-gray-200">Inny</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}

                    {selectedCategoryId === 2 && ( // Motoryzacja
                      <div className="space-y-4 border-l-2 border-red-500 pl-4 py-2">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">{t("filters.vehicleDetails") || "Szczegóły pojazdu"}</h4>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.vehicleType") || "Typ pojazdu"}</Label>
                          <Select
                            onValueChange={(value) => handleCategoryFilterChange("vehicleType", value)}
                            value={categoryFilters.vehicleType || ""}
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                              <SelectValue placeholder={t("filters.selectType") || "Wybierz typ"} />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="car" className="dark:text-gray-200">Samochód osobowy</SelectItem>
                              <SelectItem value="motorcycle" className="dark:text-gray-200">Motocykl</SelectItem>
                              <SelectItem value="truck" className="dark:text-gray-200">Ciężarówka</SelectItem>
                              <SelectItem value="other" className="dark:text-gray-200">Inny</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.productionYear") || "Rok produkcji"}</Label>
                          <Input
                            type="number"
                            placeholder="np. 2018"
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                            value={categoryFilters.year || ""}
                            onChange={(e) => handleCategoryFilterChange("year", e.target.value)}
                          />
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.mileage") || "Przebieg (km)"}</Label>
                          <Input
                            type="number"
                            placeholder="np. 150000"
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                            value={categoryFilters.mileage || ""}
                            onChange={(e) => handleCategoryFilterChange("mileage", e.target.value)}
                          />
                        </div>
                      </div>
                    )}
                    
                    {selectedCategoryId === 3 && ( // Nieruchomości
                      <div className="space-y-4 border-l-2 border-red-500 pl-4 py-2">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">{t("filters.propertyDetails") || "Szczegóły nieruchomości"}</h4>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.propertyType") || "Typ nieruchomości"}</Label>
                          <Select
                            onValueChange={(value) => handleCategoryFilterChange("propertyType", value)}
                            value={categoryFilters.propertyType || ""}
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                              <SelectValue placeholder={t("filters.selectType") || "Wybierz typ"} />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="apartment" className="dark:text-gray-200">Mieszkanie</SelectItem>
                              <SelectItem value="house" className="dark:text-gray-200">Dom</SelectItem>
                              <SelectItem value="plot" className="dark:text-gray-200">Działka</SelectItem>
                              <SelectItem value="commercial" className="dark:text-gray-200">Lokal użytkowy</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.area") || "Powierzchnia (m²)"}</Label>
                          <Input
                            type="number"
                            placeholder="np. 50"
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                            value={categoryFilters.area || ""}
                            onChange={(e) => handleCategoryFilterChange("area", e.target.value)}
                          />
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.rooms") || "Liczba pokoi"}</Label>
                          <Select
                            onValueChange={(value) => handleCategoryFilterChange("rooms", value)}
                            value={categoryFilters.rooms || ""}
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                              <SelectValue placeholder={t("filters.selectRooms") || "Wybierz liczbę pokoi"} />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="1" className="dark:text-gray-200">1</SelectItem>
                              <SelectItem value="2" className="dark:text-gray-200">2</SelectItem>
                              <SelectItem value="3" className="dark:text-gray-200">3</SelectItem>
                              <SelectItem value="4+" className="dark:text-gray-200">4+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}
                    
                    {selectedCategoryId === 4 && ( // Dom i Ogród
                      <div className="space-y-4 border-l-2 border-red-500 pl-4 py-2">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">{t("filters.homeDetails") || "Szczegóły produktu - Dom i Ogród"}</h4>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.homeCategory") || "Podkategoria"}</Label>
                          <Select
                            onValueChange={(value) => handleCategoryFilterChange("homeCategory", value)}
                            value={categoryFilters.homeCategory || ""}
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                              <SelectValue placeholder={t("filters.selectCategory") || "Wybierz podkategorię"} />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700 max-h-[300px]">
                              <SelectItem value="meble" className="dark:text-gray-200">Meble</SelectItem>
                              <SelectItem value="dekoracje" className="dark:text-gray-200">Dekoracje</SelectItem>
                              <SelectItem value="oswietlenie" className="dark:text-gray-200">Oświetlenie</SelectItem>
                              <SelectItem value="narzedzia" className="dark:text-gray-200">Narzędzia</SelectItem>
                              <SelectItem value="ogrod" className="dark:text-gray-200">Ogród</SelectItem>
                              <SelectItem value="agd" className="dark:text-gray-200">AGD</SelectItem>
                              <SelectItem value="meble_kuchenne" className="dark:text-gray-200">Meble kuchenne</SelectItem>
                              <SelectItem value="lozka" className="dark:text-gray-200">Łóżka i materace</SelectItem>
                              <SelectItem value="stoly" className="dark:text-gray-200">Stoły i krzesła</SelectItem>
                              <SelectItem value="szafy" className="dark:text-gray-200">Szafy i komody</SelectItem>
                              <SelectItem value="dywany" className="dark:text-gray-200">Dywany i wykładziny</SelectItem>
                              <SelectItem value="wyposazenie_lazienki" className="dark:text-gray-200">Wyposażenie łazienki</SelectItem>
                              <SelectItem value="wyposazenie_kuchni" className="dark:text-gray-200">Wyposażenie kuchni</SelectItem>
                              <SelectItem value="tekstylia" className="dark:text-gray-200">Tekstylia domowe</SelectItem>
                              <SelectItem value="rosliny" className="dark:text-gray-200">Rośliny domowe i ogrodowe</SelectItem>
                              <SelectItem value="ogrzewanie" className="dark:text-gray-200">Ogrzewanie</SelectItem>
                              <SelectItem value="klimatyzacja" className="dark:text-gray-200">Klimatyzacja i wentylacja</SelectItem>
                              <SelectItem value="meble_ogrodowe" className="dark:text-gray-200">Meble ogrodowe</SelectItem>
                              <SelectItem value="narzedzia_ogrodowe" className="dark:text-gray-200">Narzędzia ogrodowe</SelectItem>
                              <SelectItem value="baseny" className="dark:text-gray-200">Baseny i akcesoria</SelectItem>
                              <SelectItem value="grillowanie" className="dark:text-gray-200">Grille i akcesoria</SelectItem>
                              <SelectItem value="inne" className="dark:text-gray-200">Inne</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        {categoryFilters.homeCategory === "meble" && (
                          <div>
                            <Label className="dark:text-white">{t("filters.furniture.type") || "Typ mebla"}</Label>
                            <Select
                              onValueChange={(value) => handleCategoryFilterChange("furnitureType", value)}
                              value={categoryFilters.furnitureType || ""}
                            >
                              <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                                <SelectValue placeholder={t("filters.selectType") || "Wybierz typ mebla"} />
                              </SelectTrigger>
                              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                <SelectItem value="sofa" className="dark:text-gray-200">Sofa/Kanapa</SelectItem>
                                <SelectItem value="fotel" className="dark:text-gray-200">Fotel</SelectItem>
                                <SelectItem value="stol" className="dark:text-gray-200">Stół</SelectItem>
                                <SelectItem value="krzeslo" className="dark:text-gray-200">Krzesło</SelectItem>
                                <SelectItem value="komoda" className="dark:text-gray-200">Komoda</SelectItem>
                                <SelectItem value="szafa" className="dark:text-gray-200">Szafa</SelectItem>
                                <SelectItem value="lozko" className="dark:text-gray-200">Łóżko</SelectItem>
                                <SelectItem value="biurko" className="dark:text-gray-200">Biurko</SelectItem>
                                <SelectItem value="regal" className="dark:text-gray-200">Regał</SelectItem>
                                <SelectItem value="inny" className="dark:text-gray-200">Inny</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        
                        {(categoryFilters.homeCategory === "ogrod" || categoryFilters.homeCategory === "meble_ogrodowe") && (
                          <div>
                            <Label className="dark:text-white">{t("filters.garden.type") || "Typ produktu ogrodowego"}</Label>
                            <Select
                              onValueChange={(value) => handleCategoryFilterChange("gardenType", value)}
                              value={categoryFilters.gardenType || ""}
                            >
                              <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                                <SelectValue placeholder={t("filters.selectType") || "Wybierz typ produktu"} />
                              </SelectTrigger>
                              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                <SelectItem value="meble_wypoczynkowe" className="dark:text-gray-200">Meble wypoczynkowe</SelectItem>
                                <SelectItem value="stoly_krzesla" className="dark:text-gray-200">Stoły i krzesła</SelectItem>
                                <SelectItem value="parasole" className="dark:text-gray-200">Parasole i markizy</SelectItem>
                                <SelectItem value="hustawki" className="dark:text-gray-200">Huśtawki ogrodowe</SelectItem>
                                <SelectItem value="donice" className="dark:text-gray-200">Donice i skrzynie</SelectItem>
                                <SelectItem value="oczka_wodne" className="dark:text-gray-200">Oczka wodne</SelectItem>
                                <SelectItem value="nawadnianie" className="dark:text-gray-200">Systemy nawadniania</SelectItem>
                                <SelectItem value="oswietlenie" className="dark:text-gray-200">Oświetlenie ogrodowe</SelectItem>
                                <SelectItem value="inne" className="dark:text-gray-200">Inne</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.condition") || "Stan"}</Label>
                          <RadioGroup 
                            onValueChange={(value) => handleCategoryFilterChange("condition", value)}
                            value={categoryFilters.condition || ""}
                            className="mt-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="new" id="home-condition-new" />
                              <Label htmlFor="home-condition-new" className="dark:text-gray-200">
                                {t("filters.condition.new") || "Nowy"}
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="like_new" id="home-condition-like-new" />
                              <Label htmlFor="home-condition-like-new" className="dark:text-gray-200">
                                {t("filters.condition.like_new") || "Jak nowy"}
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="used" id="home-condition-used" />
                              <Label htmlFor="home-condition-used" className="dark:text-gray-200">
                                {t("filters.condition.used") || "Używany"}
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="damaged" id="home-condition-damaged" />
                              <Label htmlFor="home-condition-damaged" className="dark:text-gray-200">
                                {t("filters.condition.damaged") || "Uszkodzony"}
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="for_renovation" id="home-condition-renovation" />
                              <Label htmlFor="home-condition-renovation" className="dark:text-gray-200">
                                {t("filters.condition.for_renovation") || "Do renowacji"}
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.material") || "Materiał"}</Label>
                          <Select
                            onValueChange={(value) => handleCategoryFilterChange("material", value)}
                            value={categoryFilters.material || ""}
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                              <SelectValue placeholder={t("filters.selectMaterial") || "Wybierz materiał"} />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="drewno_lite" className="dark:text-gray-200">Drewno lite</SelectItem>
                              <SelectItem value="drewno_fornir" className="dark:text-gray-200">Fornir drewniany</SelectItem>
                              <SelectItem value="plyta_meblowa" className="dark:text-gray-200">Płyta meblowa</SelectItem>
                              <SelectItem value="mdf" className="dark:text-gray-200">MDF</SelectItem>
                              <SelectItem value="szklo" className="dark:text-gray-200">Szkło</SelectItem>
                              <SelectItem value="metal" className="dark:text-gray-200">Metal</SelectItem>
                              <SelectItem value="stal_nierdzewna" className="dark:text-gray-200">Stal nierdzewna</SelectItem>
                              <SelectItem value="aluminium" className="dark:text-gray-200">Aluminium</SelectItem>
                              <SelectItem value="plastik" className="dark:text-gray-200">Plastik</SelectItem>
                              <SelectItem value="skora_naturalna" className="dark:text-gray-200">Skóra naturalna</SelectItem>
                              <SelectItem value="skora_ekologiczna" className="dark:text-gray-200">Skóra ekologiczna</SelectItem>
                              <SelectItem value="tkanina" className="dark:text-gray-200">Tkanina</SelectItem>
                              <SelectItem value="welur" className="dark:text-gray-200">Welur</SelectItem>
                              <SelectItem value="bawelna" className="dark:text-gray-200">Bawełna</SelectItem>
                              <SelectItem value="len" className="dark:text-gray-200">Len</SelectItem>
                              <SelectItem value="rattan" className="dark:text-gray-200">Rattan/Wiklina</SelectItem>
                              <SelectItem value="kamien" className="dark:text-gray-200">Kamień</SelectItem>
                              <SelectItem value="marmur" className="dark:text-gray-200">Marmur</SelectItem>
                              <SelectItem value="granit" className="dark:text-gray-200">Granit</SelectItem>
                              <SelectItem value="beton" className="dark:text-gray-200">Beton</SelectItem>
                              <SelectItem value="ceramika" className="dark:text-gray-200">Ceramika</SelectItem>
                              <SelectItem value="mieszane" className="dark:text-gray-200">Mieszane</SelectItem>
                              <SelectItem value="inne" className="dark:text-gray-200">Inne</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.color") || "Kolor"}</Label>
                          <Select
                            onValueChange={(value) => handleCategoryFilterChange("color", value)}
                            value={categoryFilters.color || ""}
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                              <SelectValue placeholder={t("filters.selectColor") || "Wybierz kolor"} />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="bialy" className="dark:text-gray-200">Biały</SelectItem>
                              <SelectItem value="kremowy" className="dark:text-gray-200">Kremowy/Ecru</SelectItem>
                              <SelectItem value="czarny" className="dark:text-gray-200">Czarny</SelectItem>
                              <SelectItem value="szary" className="dark:text-gray-200">Szary</SelectItem>
                              <SelectItem value="srebrny" className="dark:text-gray-200">Srebrny</SelectItem>
                              <SelectItem value="bezowy" className="dark:text-gray-200">Beżowy</SelectItem>
                              <SelectItem value="brazowy" className="dark:text-gray-200">Brązowy</SelectItem>
                              <SelectItem value="dab" className="dark:text-gray-200">Dąb/Drewno naturalne</SelectItem>
                              <SelectItem value="czerwony" className="dark:text-gray-200">Czerwony</SelectItem>
                              <SelectItem value="bordowy" className="dark:text-gray-200">Bordowy</SelectItem>
                              <SelectItem value="rozowy" className="dark:text-gray-200">Różowy</SelectItem>
                              <SelectItem value="pomaranczowy" className="dark:text-gray-200">Pomarańczowy</SelectItem>
                              <SelectItem value="niebieski" className="dark:text-gray-200">Niebieski</SelectItem>
                              <SelectItem value="granatowy" className="dark:text-gray-200">Granatowy</SelectItem>
                              <SelectItem value="turkusowy" className="dark:text-gray-200">Turkusowy</SelectItem>
                              <SelectItem value="zielony" className="dark:text-gray-200">Zielony</SelectItem>
                              <SelectItem value="oliwkowy" className="dark:text-gray-200">Oliwkowy</SelectItem>
                              <SelectItem value="zolty" className="dark:text-gray-200">Żółty</SelectItem>
                              <SelectItem value="zloty" className="dark:text-gray-200">Złoty</SelectItem>
                              <SelectItem value="fioletowy" className="dark:text-gray-200">Fioletowy</SelectItem>
                              <SelectItem value="wielokolorowy" className="dark:text-gray-200">Wielokolorowy</SelectItem>
                              <SelectItem value="przezroczysty" className="dark:text-gray-200">Przezroczysty</SelectItem>
                              <SelectItem value="inny" className="dark:text-gray-200">Inny</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.dimensions") || "Wymiary"}</Label>
                          <div className="grid grid-cols-3 gap-2 mt-1">
                            <div>
                              <Input
                                type="number"
                                placeholder="Szerokość (cm)"
                                className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                                value={categoryFilters.width || ""}
                                onChange={(e) => handleCategoryFilterChange("width", e.target.value)}
                              />
                            </div>
                            <div>
                              <Input
                                type="number"
                                placeholder="Głębokość (cm)"
                                className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                                value={categoryFilters.depth || ""}
                                onChange={(e) => handleCategoryFilterChange("depth", e.target.value)}
                              />
                            </div>
                            <div>
                              <Input
                                type="number"
                                placeholder="Wysokość (cm)"
                                className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                                value={categoryFilters.height || ""}
                                onChange={(e) => handleCategoryFilterChange("height", e.target.value)}
                              />
                            </div>
                          </div>
                          <FormDescription className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {t("filters.dimensions.hint") || "Podaj wymiary w centymetrach"}
                          </FormDescription>
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.style") || "Styl"}</Label>
                          <Select
                            onValueChange={(value) => handleCategoryFilterChange("style", value)}
                            value={categoryFilters.style || ""}
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                              <SelectValue placeholder={t("filters.selectStyle") || "Wybierz styl"} />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="nowoczesny" className="dark:text-gray-200">Nowoczesny</SelectItem>
                              <SelectItem value="skandynawski" className="dark:text-gray-200">Skandynawski</SelectItem>
                              <SelectItem value="industrialny" className="dark:text-gray-200">Industrialny</SelectItem>
                              <SelectItem value="vintage" className="dark:text-gray-200">Vintage</SelectItem>
                              <SelectItem value="retro" className="dark:text-gray-200">Retro</SelectItem>
                              <SelectItem value="klasyczny" className="dark:text-gray-200">Klasyczny</SelectItem>
                              <SelectItem value="rustyklany" className="dark:text-gray-200">Rustykalny/Wiejski</SelectItem>
                              <SelectItem value="glamour" className="dark:text-gray-200">Glamour</SelectItem>
                              <SelectItem value="loft" className="dark:text-gray-200">Loft</SelectItem>
                              <SelectItem value="minimalistyczny" className="dark:text-gray-200">Minimalistyczny</SelectItem>
                              <SelectItem value="boho" className="dark:text-gray-200">Boho</SelectItem>
                              <SelectItem value="eklektyczny" className="dark:text-gray-200">Eklektyczny</SelectItem>
                              <SelectItem value="art_deco" className="dark:text-gray-200">Art Deco</SelectItem>
                              <SelectItem value="prowansalski" className="dark:text-gray-200">Prowansalski</SelectItem>
                              <SelectItem value="kolonialny" className="dark:text-gray-200">Kolonialny</SelectItem>
                              <SelectItem value="inny" className="dark:text-gray-200">Inny</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.manufacturer") || "Producent"}</Label>
                          <Input
                            type="text"
                            placeholder="np. IKEA, BRW, VOX"
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 mt-1"
                            value={categoryFilters.manufacturer || ""}
                            onChange={(e) => handleCategoryFilterChange("manufacturer", e.target.value)}
                          />
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.age") || "Wiek produktu"}</Label>
                          <Select
                            onValueChange={(value) => handleCategoryFilterChange("age", value)}
                            value={categoryFilters.age || ""}
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                              <SelectValue placeholder={t("filters.selectAge") || "Wybierz wiek"} />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="new" className="dark:text-gray-200">Nowy</SelectItem>
                              <SelectItem value="0_1" className="dark:text-gray-200">Do 1 roku</SelectItem>
                              <SelectItem value="1_3" className="dark:text-gray-200">1-3 lata</SelectItem>
                              <SelectItem value="3_5" className="dark:text-gray-200">3-5 lat</SelectItem>
                              <SelectItem value="5_10" className="dark:text-gray-200">5-10 lat</SelectItem>
                              <SelectItem value="10_plus" className="dark:text-gray-200">Ponad 10 lat</SelectItem>
                              <SelectItem value="antique" className="dark:text-gray-200">Antyk</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}
                    
                    {selectedCategoryId === 5 && ( // Moda
                      <div className="space-y-4 border-l-2 border-red-500 pl-4 py-2">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">{t("filters.fashion.title") || "Szczegóły dla kategorii Moda"}</h4>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.fashion.type") || "Typ odzieży"}</Label>
                          <Select
                            onValueChange={(value) => handleCategoryFilterChange("fashionType", value)}
                            value={categoryFilters.fashionType || ""}
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                              <SelectValue placeholder={t("filters.selectType") || "Wybierz typ"} />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700 max-h-[300px]">
                              <SelectItem value="outer" className="dark:text-gray-200">Odzież wierzchnia</SelectItem>
                              <SelectItem value="tops" className="dark:text-gray-200">Koszulki/Topy/Bluzki</SelectItem>
                              <SelectItem value="shirts" className="dark:text-gray-200">Koszule</SelectItem>
                              <SelectItem value="sweaters" className="dark:text-gray-200">Swetry/Bluzy</SelectItem>
                              <SelectItem value="pants" className="dark:text-gray-200">Spodnie</SelectItem>
                              <SelectItem value="jeans" className="dark:text-gray-200">Jeansy</SelectItem>
                              <SelectItem value="shorts" className="dark:text-gray-200">Szorty</SelectItem>
                              <SelectItem value="skirts" className="dark:text-gray-200">Spódnice</SelectItem>
                              <SelectItem value="dresses" className="dark:text-gray-200">Sukienki</SelectItem>
                              <SelectItem value="suits" className="dark:text-gray-200">Garnitury/Marynarki</SelectItem>
                              <SelectItem value="underwear" className="dark:text-gray-200">Bielizna</SelectItem>
                              <SelectItem value="socks" className="dark:text-gray-200">Skarpety/Rajstopy</SelectItem>
                              <SelectItem value="shoes" className="dark:text-gray-200">Obuwie</SelectItem>
                              <SelectItem value="accessories" className="dark:text-gray-200">Akcesoria</SelectItem>
                              <SelectItem value="bags" className="dark:text-gray-200">Torby/Plecaki</SelectItem>
                              <SelectItem value="jewelry" className="dark:text-gray-200">Biżuteria</SelectItem>
                              <SelectItem value="watches" className="dark:text-gray-200">Zegarki</SelectItem>
                              <SelectItem value="other" className="dark:text-gray-200">Inne</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.fashion.gender") || "Płeć"}</Label>
                          <RadioGroup 
                            onValueChange={(value) => handleCategoryFilterChange("gender", value)}
                            value={categoryFilters.gender || ""}
                            className="mt-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="female" id="gender-female" />
                              <Label htmlFor="gender-female" className="dark:text-gray-200">
                                {t("filters.fashion.gender.female") || "Damskie"}
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="male" id="gender-male" />
                              <Label htmlFor="gender-male" className="dark:text-gray-200">
                                {t("filters.fashion.gender.male") || "Męskie"}
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="unisex" id="gender-unisex" />
                              <Label htmlFor="gender-unisex" className="dark:text-gray-200">
                                {t("filters.fashion.gender.unisex") || "Unisex"}
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="kids" id="gender-kids" />
                              <Label htmlFor="gender-kids" className="dark:text-gray-200">
                                {t("filters.fashion.gender.kids") || "Dziecięce"}
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.fashion.size") || "Rozmiar"}</Label>
                          <Select
                            onValueChange={(value) => handleCategoryFilterChange("size", value)}
                            value={categoryFilters.size || ""}
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                              <SelectValue placeholder={t("filters.selectSize") || "Wybierz rozmiar"} />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              {(categoryFilters.fashionType === "tops" || 
                                categoryFilters.fashionType === "shirts" || 
                                categoryFilters.fashionType === "sweaters" || 
                                categoryFilters.fashionType === "dresses" || 
                                categoryFilters.fashionType === "suits" || 
                                categoryFilters.fashionType === "outer") && (
                                <>
                                  <SelectItem value="XS" className="dark:text-gray-200">XS</SelectItem>
                                  <SelectItem value="S" className="dark:text-gray-200">S</SelectItem>
                                  <SelectItem value="M" className="dark:text-gray-200">M</SelectItem>
                                  <SelectItem value="L" className="dark:text-gray-200">L</SelectItem>
                                  <SelectItem value="XL" className="dark:text-gray-200">XL</SelectItem>
                                  <SelectItem value="XXL" className="dark:text-gray-200">XXL</SelectItem>
                                  <SelectItem value="XXXL" className="dark:text-gray-200">XXXL</SelectItem>
                                </>
                              )}
                              
                              {(categoryFilters.fashionType === "pants" || 
                                categoryFilters.fashionType === "jeans" || 
                                categoryFilters.fashionType === "shorts" || 
                                categoryFilters.fashionType === "skirts") && (
                                <>
                                  <SelectItem value="34" className="dark:text-gray-200">34</SelectItem>
                                  <SelectItem value="36" className="dark:text-gray-200">36</SelectItem>
                                  <SelectItem value="38" className="dark:text-gray-200">38</SelectItem>
                                  <SelectItem value="40" className="dark:text-gray-200">40</SelectItem>
                                  <SelectItem value="42" className="dark:text-gray-200">42</SelectItem>
                                  <SelectItem value="44" className="dark:text-gray-200">44</SelectItem>
                                  <SelectItem value="46" className="dark:text-gray-200">46</SelectItem>
                                  <SelectItem value="48" className="dark:text-gray-200">48</SelectItem>
                                  <SelectItem value="50" className="dark:text-gray-200">50</SelectItem>
                                  <SelectItem value="52" className="dark:text-gray-200">52</SelectItem>
                                </>
                              )}
                              
                              {categoryFilters.fashionType === "shoes" && (
                                <>
                                  <SelectItem value="35" className="dark:text-gray-200">35</SelectItem>
                                  <SelectItem value="36" className="dark:text-gray-200">36</SelectItem>
                                  <SelectItem value="37" className="dark:text-gray-200">37</SelectItem>
                                  <SelectItem value="38" className="dark:text-gray-200">38</SelectItem>
                                  <SelectItem value="39" className="dark:text-gray-200">39</SelectItem>
                                  <SelectItem value="40" className="dark:text-gray-200">40</SelectItem>
                                  <SelectItem value="41" className="dark:text-gray-200">41</SelectItem>
                                  <SelectItem value="42" className="dark:text-gray-200">42</SelectItem>
                                  <SelectItem value="43" className="dark:text-gray-200">43</SelectItem>
                                  <SelectItem value="44" className="dark:text-gray-200">44</SelectItem>
                                  <SelectItem value="45" className="dark:text-gray-200">45</SelectItem>
                                  <SelectItem value="46" className="dark:text-gray-200">46</SelectItem>
                                </>
                              )}
                              
                              <SelectItem value="universal" className="dark:text-gray-200">Rozmiar uniwersalny</SelectItem>
                              <SelectItem value="other" className="dark:text-gray-200">Inny rozmiar</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.fashion.brand") || "Marka"}</Label>
                          <Input
                            type="text"
                            placeholder="np. Zara, H&M, Reserved"
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 mt-1"
                            value={categoryFilters.brand || ""}
                            onChange={(e) => handleCategoryFilterChange("brand", e.target.value)}
                          />
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.color") || "Kolor"}</Label>
                          <Select
                            onValueChange={(value) => handleCategoryFilterChange("color", value)}
                            value={categoryFilters.color || ""}
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                              <SelectValue placeholder={t("filters.selectColor") || "Wybierz kolor"} />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="black" className="dark:text-gray-200">Czarny</SelectItem>
                              <SelectItem value="white" className="dark:text-gray-200">Biały</SelectItem>
                              <SelectItem value="gray" className="dark:text-gray-200">Szary</SelectItem>
                              <SelectItem value="beige" className="dark:text-gray-200">Beżowy</SelectItem>
                              <SelectItem value="brown" className="dark:text-gray-200">Brązowy</SelectItem>
                              <SelectItem value="red" className="dark:text-gray-200">Czerwony</SelectItem>
                              <SelectItem value="burgundy" className="dark:text-gray-200">Bordowy</SelectItem>
                              <SelectItem value="pink" className="dark:text-gray-200">Różowy</SelectItem>
                              <SelectItem value="orange" className="dark:text-gray-200">Pomarańczowy</SelectItem>
                              <SelectItem value="yellow" className="dark:text-gray-200">Żółty</SelectItem>
                              <SelectItem value="green" className="dark:text-gray-200">Zielony</SelectItem>
                              <SelectItem value="blue" className="dark:text-gray-200">Niebieski</SelectItem>
                              <SelectItem value="navy" className="dark:text-gray-200">Granatowy</SelectItem>
                              <SelectItem value="purple" className="dark:text-gray-200">Fioletowy</SelectItem>
                              <SelectItem value="gold" className="dark:text-gray-200">Złoty</SelectItem>
                              <SelectItem value="silver" className="dark:text-gray-200">Srebrny</SelectItem>
                              <SelectItem value="multicolor" className="dark:text-gray-200">Wielokolorowy</SelectItem>
                              <SelectItem value="other" className="dark:text-gray-200">Inny</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.condition") || "Stan"}</Label>
                          <RadioGroup 
                            onValueChange={(value) => handleCategoryFilterChange("condition", value)}
                            value={categoryFilters.condition || ""}
                            className="mt-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="new" id="fashion-condition-new" />
                              <Label htmlFor="fashion-condition-new" className="dark:text-gray-200">
                                {t("filters.condition.new") || "Nowy z metką"}
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="new_no_tag" id="fashion-condition-new-no-tag" />
                              <Label htmlFor="fashion-condition-new-no-tag" className="dark:text-gray-200">
                                {t("filters.condition.new_no_tag") || "Nowy bez metki"}
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="very_good" id="fashion-condition-very-good" />
                              <Label htmlFor="fashion-condition-very-good" className="dark:text-gray-200">
                                {t("filters.condition.very_good") || "Bardzo dobry"}
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="good" id="fashion-condition-good" />
                              <Label htmlFor="fashion-condition-good" className="dark:text-gray-200">
                                {t("filters.condition.good") || "Dobry"}
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="acceptable" id="fashion-condition-acceptable" />
                              <Label htmlFor="fashion-condition-acceptable" className="dark:text-gray-200">
                                {t("filters.condition.acceptable") || "Zadowalający"}
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.fashion.material") || "Materiał"}</Label>
                          <Select
                            onValueChange={(value) => handleCategoryFilterChange("material", value)}
                            value={categoryFilters.material || ""}
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                              <SelectValue placeholder={t("filters.selectMaterial") || "Wybierz materiał"} />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="cotton" className="dark:text-gray-200">Bawełna</SelectItem>
                              <SelectItem value="polyester" className="dark:text-gray-200">Poliester</SelectItem>
                              <SelectItem value="linen" className="dark:text-gray-200">Len</SelectItem>
                              <SelectItem value="silk" className="dark:text-gray-200">Jedwab</SelectItem>
                              <SelectItem value="wool" className="dark:text-gray-200">Wełna</SelectItem>
                              <SelectItem value="leather" className="dark:text-gray-200">Skóra naturalna</SelectItem>
                              <SelectItem value="eco_leather" className="dark:text-gray-200">Ekoskóra</SelectItem>
                              <SelectItem value="denim" className="dark:text-gray-200">Dżins</SelectItem>
                              <SelectItem value="viscose" className="dark:text-gray-200">Wiskoza</SelectItem>
                              <SelectItem value="acrylic" className="dark:text-gray-200">Akryl</SelectItem>
                              <SelectItem value="cashmere" className="dark:text-gray-200">Kaszmir</SelectItem>
                              <SelectItem value="velvet" className="dark:text-gray-200">Aksamit/Welur</SelectItem>
                              <SelectItem value="lycra" className="dark:text-gray-200">Elastan/Lycra</SelectItem>
                              <SelectItem value="nylon" className="dark:text-gray-200">Nylon</SelectItem>
                              <SelectItem value="mixed" className="dark:text-gray-200">Mieszany</SelectItem>
                              <SelectItem value="other" className="dark:text-gray-200">Inny</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.fashion.season") || "Sezon"}</Label>
                          <Select
                            onValueChange={(value) => handleCategoryFilterChange("season", value)}
                            value={categoryFilters.season || ""}
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                              <SelectValue placeholder={t("filters.selectSeason") || "Wybierz sezon"} />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="spring" className="dark:text-gray-200">Wiosna</SelectItem>
                              <SelectItem value="summer" className="dark:text-gray-200">Lato</SelectItem>
                              <SelectItem value="autumn" className="dark:text-gray-200">Jesień</SelectItem>
                              <SelectItem value="winter" className="dark:text-gray-200">Zima</SelectItem>
                              <SelectItem value="universal" className="dark:text-gray-200">Uniwersalny</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.fashion.style") || "Styl"}</Label>
                          <Select
                            onValueChange={(value) => handleCategoryFilterChange("style", value)}
                            value={categoryFilters.style || ""}
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                              <SelectValue placeholder={t("filters.selectStyle") || "Wybierz styl"} />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="casual" className="dark:text-gray-200">Casual</SelectItem>
                              <SelectItem value="elegant" className="dark:text-gray-200">Elegancki</SelectItem>
                              <SelectItem value="sporty" className="dark:text-gray-200">Sportowy</SelectItem>
                              <SelectItem value="business" className="dark:text-gray-200">Biznesowy</SelectItem>
                              <SelectItem value="vintage" className="dark:text-gray-200">Vintage</SelectItem>
                              <SelectItem value="boho" className="dark:text-gray-200">Boho</SelectItem>
                              <SelectItem value="streetwear" className="dark:text-gray-200">Streetwear</SelectItem>
                              <SelectItem value="minimalist" className="dark:text-gray-200">Minimalistyczny</SelectItem>
                              <SelectItem value="retro" className="dark:text-gray-200">Retro</SelectItem>
                              <SelectItem value="romantic" className="dark:text-gray-200">Romantyczny</SelectItem>
                              <SelectItem value="punk" className="dark:text-gray-200">Punk/Rock</SelectItem>
                              <SelectItem value="other" className="dark:text-gray-200">Inny</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}
                    
                    {selectedCategoryId === 6 && ( // Usługi
                      <div className="space-y-4 border-l-2 border-red-500 pl-4 py-2">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">{t("filters.services.title") || "Szczegóły usługi"}</h4>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.services.category") || "Kategoria usługi"}</Label>
                          <Select
                            onValueChange={(value) => handleCategoryFilterChange("serviceCategory", value)}
                            value={categoryFilters.serviceCategory || ""}
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                              <SelectValue placeholder={t("filters.selectCategory") || "Wybierz kategorię"} />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700 max-h-[300px]">
                              <SelectItem value="construction" className="dark:text-gray-200">Budowa i remont</SelectItem>
                              <SelectItem value="repair" className="dark:text-gray-200">Naprawa i serwis</SelectItem>
                              <SelectItem value="transport" className="dark:text-gray-200">Transport</SelectItem>
                              <SelectItem value="moving" className="dark:text-gray-200">Przeprowadzki</SelectItem>
                              <SelectItem value="cleaning" className="dark:text-gray-200">Sprzątanie</SelectItem>
                              <SelectItem value="gardening" className="dark:text-gray-200">Ogrodnictwo</SelectItem>
                              <SelectItem value="beauty" className="dark:text-gray-200">Uroda i pielęgnacja</SelectItem>
                              <SelectItem value="health" className="dark:text-gray-200">Zdrowie</SelectItem>
                              <SelectItem value="education" className="dark:text-gray-200">Edukacja</SelectItem>
                              <SelectItem value="tutoring" className="dark:text-gray-200">Korepetycje</SelectItem>
                              <SelectItem value="legal" className="dark:text-gray-200">Usługi prawne</SelectItem>
                              <SelectItem value="financial" className="dark:text-gray-200">Usługi finansowe</SelectItem>
                              <SelectItem value="it" className="dark:text-gray-200">IT i komputery</SelectItem>
                              <SelectItem value="marketing" className="dark:text-gray-200">Marketing i reklama</SelectItem>
                              <SelectItem value="design" className="dark:text-gray-200">Projektowanie i grafika</SelectItem>
                              <SelectItem value="photography" className="dark:text-gray-200">Fotografia</SelectItem>
                              <SelectItem value="video" className="dark:text-gray-200">Film i wideo</SelectItem>
                              <SelectItem value="translation" className="dark:text-gray-200">Tłumaczenia</SelectItem>
                              <SelectItem value="childcare" className="dark:text-gray-200">Opieka nad dziećmi</SelectItem>
                              <SelectItem value="eldercare" className="dark:text-gray-200">Opieka nad osobami starszymi</SelectItem>
                              <SelectItem value="events" className="dark:text-gray-200">Organizacja imprez</SelectItem>
                              <SelectItem value="travel" className="dark:text-gray-200">Turystyka i podróże</SelectItem>
                              <SelectItem value="automotive" className="dark:text-gray-200">Motoryzacja</SelectItem>
                              <SelectItem value="other" className="dark:text-gray-200">Inne</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        {categoryFilters.serviceCategory && (
                          <div>
                            <Label className="dark:text-white">{t("filters.services.type") || "Typ usługi"}</Label>
                            <Select
                              onValueChange={(value) => handleCategoryFilterChange("serviceType", value)}
                              value={categoryFilters.serviceType || ""}
                            >
                              <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                                <SelectValue placeholder={t("filters.selectType") || "Wybierz typ usługi"} />
                              </SelectTrigger>
                              <SelectContent className="dark:bg-gray-800 dark:border-gray-700 max-h-[300px]">
                                {/* Budowa, remont, naprawa */}
                                {(categoryFilters.serviceCategory === "construction" || 
                                  categoryFilters.serviceCategory === "repair") && (
                                  <>
                                    <SelectItem value="construction" className="dark:text-gray-200">Budowa</SelectItem>
                                    <SelectItem value="renovation" className="dark:text-gray-200">Remont</SelectItem>
                                    <SelectItem value="electrical" className="dark:text-gray-200">Elektryka</SelectItem>
                                    <SelectItem value="plumbing" className="dark:text-gray-200">Hydraulika</SelectItem>
                                    <SelectItem value="carpentry" className="dark:text-gray-200">Stolarstwo</SelectItem>
                                    <SelectItem value="flooring" className="dark:text-gray-200">Podłogi</SelectItem>
                                    <SelectItem value="painting" className="dark:text-gray-200">Malowanie</SelectItem>
                                    <SelectItem value="roofing" className="dark:text-gray-200">Dachy</SelectItem>
                                    <SelectItem value="windows" className="dark:text-gray-200">Okna</SelectItem>
                                    <SelectItem value="doors" className="dark:text-gray-200">Drzwi</SelectItem>
                                    <SelectItem value="tiling" className="dark:text-gray-200">Glazura</SelectItem>
                                    <SelectItem value="plastering" className="dark:text-gray-200">Tynkowanie</SelectItem>
                                    <SelectItem value="masonry" className="dark:text-gray-200">Murarstwo</SelectItem>
                                    <SelectItem value="demolition" className="dark:text-gray-200">Wyburzenia</SelectItem>
                                    <SelectItem value="handyman" className="dark:text-gray-200">Złota rączka</SelectItem>
                                    <SelectItem value="hvac" className="dark:text-gray-200">Klimatyzacja i ogrzewanie</SelectItem>
                                  </>
                                )}
                                
                                {/* Transport */}
                                {(categoryFilters.serviceCategory === "transport" || 
                                  categoryFilters.serviceCategory === "moving") && (
                                  <>
                                    <SelectItem value="delivery" className="dark:text-gray-200">Dostawy</SelectItem>
                                    <SelectItem value="moving" className="dark:text-gray-200">Przeprowadzki</SelectItem>
                                    <SelectItem value="furniture_transport" className="dark:text-gray-200">Transport mebli</SelectItem>
                                    <SelectItem value="courier" className="dark:text-gray-200">Usługi kurierskie</SelectItem>
                                    <SelectItem value="passenger_transport" className="dark:text-gray-200">Transport osób</SelectItem>
                                    <SelectItem value="airport_transfer" className="dark:text-gray-200">Transport na lotnisko</SelectItem>
                                    <SelectItem value="transport_national" className="dark:text-gray-200">Transport krajowy</SelectItem>
                                    <SelectItem value="transport_international" className="dark:text-gray-200">Transport międzynarodowy</SelectItem>
                                    <SelectItem value="heavy_loads" className="dark:text-gray-200">Transport ładunków ciężkich</SelectItem>
                                  </>
                                )}
                                
                                {/* Edukacja */}
                                {(categoryFilters.serviceCategory === "education" || 
                                  categoryFilters.serviceCategory === "tutoring") && (
                                  <>
                                    <SelectItem value="language" className="dark:text-gray-200">Języki obce</SelectItem>
                                    <SelectItem value="math" className="dark:text-gray-200">Matematyka</SelectItem>
                                    <SelectItem value="physics" className="dark:text-gray-200">Fizyka</SelectItem>
                                    <SelectItem value="chemistry" className="dark:text-gray-200">Chemia</SelectItem>
                                    <SelectItem value="biology" className="dark:text-gray-200">Biologia</SelectItem>
                                    <SelectItem value="history" className="dark:text-gray-200">Historia</SelectItem>
                                    <SelectItem value="geography" className="dark:text-gray-200">Geografia</SelectItem>
                                    <SelectItem value="literature" className="dark:text-gray-200">Literatura</SelectItem>
                                    <SelectItem value="computer_science" className="dark:text-gray-200">Informatyka</SelectItem>
                                    <SelectItem value="art" className="dark:text-gray-200">Sztuka</SelectItem>
                                    <SelectItem value="music" className="dark:text-gray-200">Muzyka</SelectItem>
                                    <SelectItem value="sport" className="dark:text-gray-200">Sport</SelectItem>
                                    <SelectItem value="exam_prep" className="dark:text-gray-200">Przygotowanie do egzaminów</SelectItem>
                                  </>
                                )}
                                
                                <SelectItem value="other" className="dark:text-gray-200">Inny typ</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.services.experience") || "Doświadczenie"}</Label>
                          <Select
                            onValueChange={(value) => handleCategoryFilterChange("experience", value)}
                            value={categoryFilters.experience || ""}
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                              <SelectValue placeholder={t("filters.selectExperience") || "Wybierz poziom doświadczenia"} />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="beginner" className="dark:text-gray-200">Początkujący (mniej niż 1 rok)</SelectItem>
                              <SelectItem value="intermediate" className="dark:text-gray-200">Średniozaawansowany (1-3 lata)</SelectItem>
                              <SelectItem value="experienced" className="dark:text-gray-200">Doświadczony (3-5 lat)</SelectItem>
                              <SelectItem value="expert" className="dark:text-gray-200">Ekspert (5+ lat)</SelectItem>
                              <SelectItem value="master" className="dark:text-gray-200">Mistrz w swoim fachu (10+ lat)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.services.availability") || "Dostępność"}</Label>
                          <Select
                            onValueChange={(value) => handleCategoryFilterChange("availability", value)}
                            value={categoryFilters.availability || ""}
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                              <SelectValue placeholder={t("filters.selectAvailability") || "Wybierz dostępność"} />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="immediate" className="dark:text-gray-200">Natychmiastowa</SelectItem>
                              <SelectItem value="this_week" className="dark:text-gray-200">W tym tygodniu</SelectItem>
                              <SelectItem value="next_week" className="dark:text-gray-200">W przyszłym tygodniu</SelectItem>
                              <SelectItem value="this_month" className="dark:text-gray-200">W tym miesiącu</SelectItem>
                              <SelectItem value="flexible" className="dark:text-gray-200">Elastyczna</SelectItem>
                              <SelectItem value="weekends" className="dark:text-gray-200">Tylko weekendy</SelectItem>
                              <SelectItem value="evenings" className="dark:text-gray-200">Tylko wieczorami</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.services.location") || "Miejsce wykonania usługi"}</Label>
                          <RadioGroup 
                            onValueChange={(value) => handleCategoryFilterChange("serviceLocation", value)}
                            value={categoryFilters.serviceLocation || ""}
                            className="mt-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="client" id="location-client" />
                              <Label htmlFor="location-client" className="dark:text-gray-200">
                                {t("filters.services.location.client") || "U klienta"}
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="provider" id="location-provider" />
                              <Label htmlFor="location-provider" className="dark:text-gray-200">
                                {t("filters.services.location.provider") || "U wykonawcy"}
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="online" id="location-online" />
                              <Label htmlFor="location-online" className="dark:text-gray-200">
                                {t("filters.services.location.online") || "Online/Zdalnie"}
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="both" id="location-both" />
                              <Label htmlFor="location-both" className="dark:text-gray-200">
                                {t("filters.services.location.both") || "Różne lokalizacje"}
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.services.pricing") || "Forma rozliczenia"}</Label>
                          <Select
                            onValueChange={(value) => handleCategoryFilterChange("pricing", value)}
                            value={categoryFilters.pricing || ""}
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                              <SelectValue placeholder={t("filters.selectPricing") || "Wybierz formę rozliczenia"} />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="hourly" className="dark:text-gray-200">Stawka godzinowa</SelectItem>
                              <SelectItem value="daily" className="dark:text-gray-200">Stawka dzienna</SelectItem>
                              <SelectItem value="job" className="dark:text-gray-200">Za całość zlecenia</SelectItem>
                              <SelectItem value="monthly" className="dark:text-gray-200">Abonament miesięczny</SelectItem>
                              <SelectItem value="negotiable" className="dark:text-gray-200">Do negocjacji</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.services.additionalOptions") || "Dodatkowe opcje"}</Label>
                          <div className="space-y-2 mt-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="service-invoice" 
                                checked={categoryFilters.invoice === true}
                                onCheckedChange={(checked) => handleCategoryFilterChange("invoice", checked === true)}
                              />
                              <Label htmlFor="service-invoice" className="dark:text-gray-200">
                                {t("filters.services.invoice") || "Możliwość wystawienia faktury"}
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="service-insurance" 
                                checked={categoryFilters.insurance === true}
                                onCheckedChange={(checked) => handleCategoryFilterChange("insurance", checked === true)}
                              />
                              <Label htmlFor="service-insurance" className="dark:text-gray-200">
                                {t("filters.services.insurance") || "Ubezpieczenie"}
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="service-guarantee" 
                                checked={categoryFilters.guarantee === true}
                                onCheckedChange={(checked) => handleCategoryFilterChange("guarantee", checked === true)}
                              />
                              <Label htmlFor="service-guarantee" className="dark:text-gray-200">
                                {t("filters.services.guarantee") || "Gwarancja na wykonane prace"}
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="service-contract" 
                                checked={categoryFilters.contract === true}
                                onCheckedChange={(checked) => handleCategoryFilterChange("contract", checked === true)}
                              />
                              <Label htmlFor="service-contract" className="dark:text-gray-200">
                                {t("filters.services.contract") || "Umowa pisemna"}
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="service-delivery" 
                                checked={categoryFilters.delivery === true}
                                onCheckedChange={(checked) => handleCategoryFilterChange("delivery", checked === true)}
                              />
                              <Label htmlFor="service-delivery" className="dark:text-gray-200">
                                {t("filters.services.delivery") || "Transport/Dostawa"}
                              </Label>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {selectedCategoryId === 7 && ( // Zwierzęta
                      <div className="space-y-4 border-l-2 border-red-500 pl-4 py-2">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">{t("filters.animals.title") || "Szczegóły dla kategorii Zwierzęta"}</h4>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.animals.category") || "Kategoria"}</Label>
                          <Select
                            onValueChange={(value) => handleCategoryFilterChange("animalCategory", value)}
                            value={categoryFilters.animalCategory || ""}
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                              <SelectValue placeholder={t("filters.selectCategory") || "Wybierz kategorię"} />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700 max-h-[300px]">
                              <SelectItem value="accessories" className="dark:text-gray-200">Akcesoria dla zwierząt</SelectItem>
                              <SelectItem value="food" className="dark:text-gray-200">Karma i przysmaki</SelectItem>
                              <SelectItem value="toys" className="dark:text-gray-200">Zabawki</SelectItem>
                              <SelectItem value="cages" className="dark:text-gray-200">Klatki i transportery</SelectItem>
                              <SelectItem value="beds" className="dark:text-gray-200">Legowiska i posłania</SelectItem>
                              <SelectItem value="aquariums" className="dark:text-gray-200">Akwaria i akcesoria</SelectItem>
                              <SelectItem value="terrariums" className="dark:text-gray-200">Terraria</SelectItem>
                              <SelectItem value="hygiene" className="dark:text-gray-200">Higiena i pielęgnacja</SelectItem>
                              <SelectItem value="clothes" className="dark:text-gray-200">Ubrania dla zwierząt</SelectItem>
                              <SelectItem value="medicine" className="dark:text-gray-200">Leki i suplementy</SelectItem>
                              <SelectItem value="training" className="dark:text-gray-200">Akcesoria treningowe</SelectItem>
                              <SelectItem value="collars" className="dark:text-gray-200">Obroże i smycze</SelectItem>
                              <SelectItem value="services" className="dark:text-gray-200">Usługi dla zwierząt</SelectItem>
                              <SelectItem value="other" className="dark:text-gray-200">Inne</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.animals.petType") || "Typ zwierzęcia"}</Label>
                          <Select
                            onValueChange={(value) => handleCategoryFilterChange("petType", value)}
                            value={categoryFilters.petType || ""}
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                              <SelectValue placeholder={t("filters.selectType") || "Wybierz typ zwierzęcia"} />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700 max-h-[300px]">
                              <SelectItem value="dogs" className="dark:text-gray-200">Psy</SelectItem>
                              <SelectItem value="cats" className="dark:text-gray-200">Koty</SelectItem>
                              <SelectItem value="birds" className="dark:text-gray-200">Ptaki</SelectItem>
                              <SelectItem value="fish" className="dark:text-gray-200">Ryby</SelectItem>
                              <SelectItem value="reptiles" className="dark:text-gray-200">Gady</SelectItem>
                              <SelectItem value="amphibians" className="dark:text-gray-200">Płazy</SelectItem>
                              <SelectItem value="rodents" className="dark:text-gray-200">Gryzonie</SelectItem>
                              <SelectItem value="rabbits" className="dark:text-gray-200">Króliki</SelectItem>
                              <SelectItem value="ferrets" className="dark:text-gray-200">Fretki</SelectItem>
                              <SelectItem value="horses" className="dark:text-gray-200">Konie</SelectItem>
                              <SelectItem value="farm" className="dark:text-gray-200">Zwierzęta hodowlane</SelectItem>
                              <SelectItem value="insects" className="dark:text-gray-200">Owady</SelectItem>
                              <SelectItem value="arachnids" className="dark:text-gray-200">Pająki i skorpiony</SelectItem>
                              <SelectItem value="universal" className="dark:text-gray-200">Uniwersalne</SelectItem>
                              <SelectItem value="other" className="dark:text-gray-200">Inne</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        {(categoryFilters.animalCategory === "accessories" || 
                          categoryFilters.animalCategory === "food" || 
                          categoryFilters.animalCategory === "toys") && (
                          <div>
                            <Label className="dark:text-white">{t("filters.animals.brand") || "Marka"}</Label>
                            <Select
                              onValueChange={(value) => handleCategoryFilterChange("brand", value)}
                              value={categoryFilters.brand || ""}
                            >
                              <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                                <SelectValue placeholder={t("filters.selectBrand") || "Wybierz markę"} />
                              </SelectTrigger>
                              <SelectContent className="dark:bg-gray-800 dark:border-gray-700 max-h-[300px]">
                                <SelectItem value="royal_canin" className="dark:text-gray-200">Royal Canin</SelectItem>
                                <SelectItem value="whiskas" className="dark:text-gray-200">Whiskas</SelectItem>
                                <SelectItem value="pedigree" className="dark:text-gray-200">Pedigree</SelectItem>
                                <SelectItem value="purina" className="dark:text-gray-200">Purina</SelectItem>
                                <SelectItem value="felix" className="dark:text-gray-200">Felix</SelectItem>
                                <SelectItem value="sheba" className="dark:text-gray-200">Sheba</SelectItem>
                                <SelectItem value="applaws" className="dark:text-gray-200">Applaws</SelectItem>
                                <SelectItem value="hills" className="dark:text-gray-200">Hill's</SelectItem>
                                <SelectItem value="acana" className="dark:text-gray-200">Acana</SelectItem>
                                <SelectItem value="orijen" className="dark:text-gray-200">Orijen</SelectItem>
                                <SelectItem value="josera" className="dark:text-gray-200">Josera</SelectItem>
                                <SelectItem value="beaphar" className="dark:text-gray-200">Beaphar</SelectItem>
                                <SelectItem value="animonda" className="dark:text-gray-200">Animonda</SelectItem>
                                <SelectItem value="kong" className="dark:text-gray-200">Kong</SelectItem>
                                <SelectItem value="trixie" className="dark:text-gray-200">Trixie</SelectItem>
                                <SelectItem value="zolux" className="dark:text-gray-200">Zolux</SelectItem>
                                <SelectItem value="ferplast" className="dark:text-gray-200">Ferplast</SelectItem>
                                <SelectItem value="tetra" className="dark:text-gray-200">Tetra</SelectItem>
                                <SelectItem value="sera" className="dark:text-gray-200">Sera</SelectItem>
                                <SelectItem value="jbl" className="dark:text-gray-200">JBL</SelectItem>
                                <SelectItem value="fluval" className="dark:text-gray-200">Fluval</SelectItem>
                                <SelectItem value="other" className="dark:text-gray-200">Inna marka</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        
                        {categoryFilters.animalCategory === "food" && (
                          <div>
                            <Label className="dark:text-white">{t("filters.animals.foodType") || "Typ karmy"}</Label>
                            <Select
                              onValueChange={(value) => handleCategoryFilterChange("foodType", value)}
                              value={categoryFilters.foodType || ""}
                            >
                              <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                                <SelectValue placeholder={t("filters.selectType") || "Wybierz typ karmy"} />
                              </SelectTrigger>
                              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                <SelectItem value="dry" className="dark:text-gray-200">Sucha</SelectItem>
                                <SelectItem value="wet" className="dark:text-gray-200">Mokra</SelectItem>
                                <SelectItem value="treats" className="dark:text-gray-200">Przysmaki</SelectItem>
                                <SelectItem value="supplements" className="dark:text-gray-200">Suplementy</SelectItem>
                                <SelectItem value="special_diet" className="dark:text-gray-200">Dieta specjalistyczna</SelectItem>
                                <SelectItem value="puppy_kitten" className="dark:text-gray-200">Dla szczeniąt/kociąt</SelectItem>
                                <SelectItem value="senior" className="dark:text-gray-200">Dla seniorów</SelectItem>
                                <SelectItem value="grain_free" className="dark:text-gray-200">Bezzbożowa</SelectItem>
                                <SelectItem value="hypoallergenic" className="dark:text-gray-200">Hipoalergiczna</SelectItem>
                                <SelectItem value="other" className="dark:text-gray-200">Inny</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.condition") || "Stan"}</Label>
                          <RadioGroup 
                            onValueChange={(value) => handleCategoryFilterChange("condition", value)}
                            value={categoryFilters.condition || ""}
                            className="mt-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="new" id="pet-condition-new" />
                              <Label htmlFor="pet-condition-new" className="dark:text-gray-200">
                                {t("filters.condition.new") || "Nowy"}
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="used_very_good" id="pet-condition-used-very-good" />
                              <Label htmlFor="pet-condition-used-very-good" className="dark:text-gray-200">
                                {t("filters.condition.used_very_good") || "Używany - bardzo dobry"}
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="used_good" id="pet-condition-used-good" />
                              <Label htmlFor="pet-condition-used-good" className="dark:text-gray-200">
                                {t("filters.condition.used_good") || "Używany - dobry"}
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="used_acceptable" id="pet-condition-used-acceptable" />
                              <Label htmlFor="pet-condition-used-acceptable" className="dark:text-gray-200">
                                {t("filters.condition.used_acceptable") || "Używany - zadowalający"}
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>
                        
                        {categoryFilters.animalCategory === "services" && (
                          <div>
                            <Label className="dark:text-white">{t("filters.animals.serviceType") || "Typ usługi"}</Label>
                            <Select
                              onValueChange={(value) => handleCategoryFilterChange("animalServiceType", value)}
                              value={categoryFilters.animalServiceType || ""}
                            >
                              <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                                <SelectValue placeholder={t("filters.selectType") || "Wybierz typ usługi"} />
                              </SelectTrigger>
                              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                <SelectItem value="grooming" className="dark:text-gray-200">Grooming/Pielęgnacja</SelectItem>
                                <SelectItem value="walking" className="dark:text-gray-200">Wyprowadzanie</SelectItem>
                                <SelectItem value="sitting" className="dark:text-gray-200">Opieka nad zwierzętami</SelectItem>
                                <SelectItem value="training" className="dark:text-gray-200">Tresura</SelectItem>
                                <SelectItem value="breeding" className="dark:text-gray-200">Hodowla</SelectItem>
                                <SelectItem value="transport" className="dark:text-gray-200">Transport zwierząt</SelectItem>
                                <SelectItem value="vet" className="dark:text-gray-200">Usługi weterynaryjne</SelectItem>
                                <SelectItem value="hotel" className="dark:text-gray-200">Hotel dla zwierząt</SelectItem>
                                <SelectItem value="cemetery" className="dark:text-gray-200">Cmentarz dla zwierząt</SelectItem>
                                <SelectItem value="other" className="dark:text-gray-200">Inne</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.animals.additionalInfo") || "Informacje dodatkowe"}</Label>
                          <div className="space-y-2 mt-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="animal-delivery" 
                                checked={categoryFilters.delivery === true}
                                onCheckedChange={(checked) => handleCategoryFilterChange("delivery", checked === true)}
                              />
                              <Label htmlFor="animal-delivery" className="dark:text-gray-200">
                                {t("filters.animals.delivery") || "Możliwość dostawy"}
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="animal-receipt" 
                                checked={categoryFilters.receipt === true}
                                onCheckedChange={(checked) => handleCategoryFilterChange("receipt", checked === true)}
                              />
                              <Label htmlFor="animal-receipt" className="dark:text-gray-200">
                                {t("filters.animals.receipt") || "Paragon/Faktura"}
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="animal-warranty" 
                                checked={categoryFilters.warranty === true}
                                onCheckedChange={(checked) => handleCategoryFilterChange("warranty", checked === true)}
                              />
                              <Label htmlFor="animal-warranty" className="dark:text-gray-200">
                                {t("filters.animals.warranty") || "Gwarancja"}
                              </Label>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {selectedCategoryId === 8 && ( // Dla Dzieci
                      <div className="space-y-4 border-l-2 border-red-500 pl-4 py-2">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">{t("filters.kids.title") || "Szczegóły dla kategorii Dzieci"}</h4>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.kids.category") || "Kategoria"}</Label>
                          <Select
                            onValueChange={(value) => handleCategoryFilterChange("kidsCategory", value)}
                            value={categoryFilters.kidsCategory || ""}
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                              <SelectValue placeholder={t("filters.selectCategory") || "Wybierz kategorię"} />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700 max-h-[300px]">
                              <SelectItem value="toys" className="dark:text-gray-200">Zabawki</SelectItem>
                              <SelectItem value="clothes" className="dark:text-gray-200">Ubrania</SelectItem>
                              <SelectItem value="furniture" className="dark:text-gray-200">Meble</SelectItem>
                              <SelectItem value="strollers" className="dark:text-gray-200">Wózki</SelectItem>
                              <SelectItem value="car_seats" className="dark:text-gray-200">Foteliki samochodowe</SelectItem>
                              <SelectItem value="feeding" className="dark:text-gray-200">Karmienie</SelectItem>
                              <SelectItem value="hygiene" className="dark:text-gray-200">Higiena i pielęgnacja</SelectItem>
                              <SelectItem value="baby_gear" className="dark:text-gray-200">Akcesoria niemowlęce</SelectItem>
                              <SelectItem value="books" className="dark:text-gray-200">Książki i edukacja</SelectItem>
                              <SelectItem value="shoes" className="dark:text-gray-200">Obuwie</SelectItem>
                              <SelectItem value="safety" className="dark:text-gray-200">Bezpieczeństwo</SelectItem>
                              <SelectItem value="sports" className="dark:text-gray-200">Sport i rekreacja</SelectItem>
                              <SelectItem value="electronics" className="dark:text-gray-200">Elektronika dla dzieci</SelectItem>
                              <SelectItem value="party" className="dark:text-gray-200">Przyjęcia i uroczystości</SelectItem>
                              <SelectItem value="school" className="dark:text-gray-200">Artykuły szkolne</SelectItem>
                              <SelectItem value="other" className="dark:text-gray-200">Inne</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        {categoryFilters.kidsCategory === "toys" && (
                          <div>
                            <Label className="dark:text-white">{t("filters.kids.toyType") || "Typ zabawki"}</Label>
                            <Select
                              onValueChange={(value) => handleCategoryFilterChange("toyType", value)}
                              value={categoryFilters.toyType || ""}
                            >
                              <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                                <SelectValue placeholder={t("filters.selectType") || "Wybierz typ zabawki"} />
                              </SelectTrigger>
                              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                <SelectItem value="educational" className="dark:text-gray-200">Edukacyjne</SelectItem>
                                <SelectItem value="dolls" className="dark:text-gray-200">Lalki i akcesoria</SelectItem>
                                <SelectItem value="figures" className="dark:text-gray-200">Figurki i postacie</SelectItem>
                                <SelectItem value="cars" className="dark:text-gray-200">Samochody i pojazdy</SelectItem>
                                <SelectItem value="construction" className="dark:text-gray-200">Klocki i konstrukcje</SelectItem>
                                <SelectItem value="creative" className="dark:text-gray-200">Kreatywne i plastyczne</SelectItem>
                                <SelectItem value="plush" className="dark:text-gray-200">Pluszaki</SelectItem>
                                <SelectItem value="board_games" className="dark:text-gray-200">Gry planszowe</SelectItem>
                                <SelectItem value="puzzles" className="dark:text-gray-200">Puzzle</SelectItem>
                                <SelectItem value="outdoor" className="dark:text-gray-200">Zabawki ogrodowe</SelectItem>
                                <SelectItem value="musical" className="dark:text-gray-200">Instrumenty muzyczne</SelectItem>
                                <SelectItem value="role_play" className="dark:text-gray-200">Odgrywanie ról</SelectItem>
                                <SelectItem value="electronic" className="dark:text-gray-200">Elektroniczne</SelectItem>
                                <SelectItem value="other" className="dark:text-gray-200">Inne</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        
                        {categoryFilters.kidsCategory === "clothes" && (
                          <div>
                            <Label className="dark:text-white">{t("filters.kids.clothesType") || "Typ ubrania"}</Label>
                            <Select
                              onValueChange={(value) => handleCategoryFilterChange("clothesType", value)}
                              value={categoryFilters.clothesType || ""}
                            >
                              <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                                <SelectValue placeholder={t("filters.selectType") || "Wybierz typ ubrania"} />
                              </SelectTrigger>
                              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                <SelectItem value="tops" className="dark:text-gray-200">Bluzki i koszulki</SelectItem>
                                <SelectItem value="bottoms" className="dark:text-gray-200">Spodnie i spodenki</SelectItem>
                                <SelectItem value="dresses" className="dark:text-gray-200">Sukienki i spódniczki</SelectItem>
                                <SelectItem value="outerwear" className="dark:text-gray-200">Odzież wierzchnia</SelectItem>
                                <SelectItem value="underwear" className="dark:text-gray-200">Bielizna</SelectItem>
                                <SelectItem value="sleepwear" className="dark:text-gray-200">Piżamy</SelectItem>
                                <SelectItem value="swimwear" className="dark:text-gray-200">Stroje kąpielowe</SelectItem>
                                <SelectItem value="costumes" className="dark:text-gray-200">Stroje i przebrania</SelectItem>
                                <SelectItem value="sets" className="dark:text-gray-200">Komplety</SelectItem>
                                <SelectItem value="accessories" className="dark:text-gray-200">Akcesoria</SelectItem>
                                <SelectItem value="other" className="dark:text-gray-200">Inne</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.kids.ageGroup") || "Grupa wiekowa"}</Label>
                          <Select
                            onValueChange={(value) => handleCategoryFilterChange("ageGroup", value)}
                            value={categoryFilters.ageGroup || ""}
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                              <SelectValue placeholder={t("filters.selectAgeGroup") || "Wybierz grupę wiekową"} />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="0-3m" className="dark:text-gray-200">0-3 miesiące</SelectItem>
                              <SelectItem value="3-6m" className="dark:text-gray-200">3-6 miesięcy</SelectItem>
                              <SelectItem value="6-12m" className="dark:text-gray-200">6-12 miesięcy</SelectItem>
                              <SelectItem value="1-2" className="dark:text-gray-200">1-2 lata</SelectItem>
                              <SelectItem value="2-3" className="dark:text-gray-200">2-3 lata</SelectItem>
                              <SelectItem value="3-4" className="dark:text-gray-200">3-4 lata</SelectItem>
                              <SelectItem value="4-5" className="dark:text-gray-200">4-5 lat</SelectItem>
                              <SelectItem value="5-6" className="dark:text-gray-200">5-6 lat</SelectItem>
                              <SelectItem value="6-7" className="dark:text-gray-200">6-7 lat</SelectItem>
                              <SelectItem value="7-8" className="dark:text-gray-200">7-8 lat</SelectItem>
                              <SelectItem value="8-9" className="dark:text-gray-200">8-9 lat</SelectItem>
                              <SelectItem value="9-10" className="dark:text-gray-200">9-10 lat</SelectItem>
                              <SelectItem value="10-12" className="dark:text-gray-200">10-12 lat</SelectItem>
                              <SelectItem value="12-14" className="dark:text-gray-200">12-14 lat</SelectItem>
                              <SelectItem value="14+" className="dark:text-gray-200">14+ lat</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.kids.gender") || "Płeć"}</Label>
                          <RadioGroup 
                            onValueChange={(value) => handleCategoryFilterChange("gender", value)}
                            value={categoryFilters.gender || ""}
                            className="mt-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="boy" id="gender-boy" />
                              <Label htmlFor="gender-boy" className="dark:text-gray-200">
                                {t("filters.kids.gender.boy") || "Chłopiec"}
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="girl" id="gender-girl" />
                              <Label htmlFor="gender-girl" className="dark:text-gray-200">
                                {t("filters.kids.gender.girl") || "Dziewczynka"}
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="unisex" id="gender-unisex-kids" />
                              <Label htmlFor="gender-unisex-kids" className="dark:text-gray-200">
                                {t("filters.kids.gender.unisex") || "Unisex"}
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.kids.brand") || "Marka"}</Label>
                          <Input
                            type="text"
                            placeholder="np. Fisher-Price, LEGO, Barbie"
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 mt-1"
                            value={categoryFilters.brand || ""}
                            onChange={(e) => handleCategoryFilterChange("brand", e.target.value)}
                          />
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.kids.condition") || "Stan"}</Label>
                          <RadioGroup 
                            onValueChange={(value) => handleCategoryFilterChange("condition", value)}
                            value={categoryFilters.condition || ""}
                            className="mt-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="new" id="kids-condition-new" />
                              <Label htmlFor="kids-condition-new" className="dark:text-gray-200">
                                {t("filters.kids.new") || "Nowe"}
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="likeNew" id="kids-condition-likeNew" />
                              <Label htmlFor="kids-condition-likeNew" className="dark:text-gray-200">
                                {t("filters.kids.likeNew") || "Jak nowe"}
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="good" id="kids-condition-good" />
                              <Label htmlFor="kids-condition-good" className="dark:text-gray-200">
                                {t("filters.kids.good") || "Dobry"}
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="acceptable" id="kids-condition-acceptable" />
                              <Label htmlFor="kids-condition-acceptable" className="dark:text-gray-200">
                                {t("filters.kids.acceptable") || "Akceptowalny"}
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.kids.color") || "Kolor"}</Label>
                          <Select
                            onValueChange={(value) => handleCategoryFilterChange("color", value)}
                            value={categoryFilters.color || ""}
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                              <SelectValue placeholder={t("filters.selectColor") || "Wybierz kolor"} />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="red" className="dark:text-gray-200">Czerwony</SelectItem>
                              <SelectItem value="pink" className="dark:text-gray-200">Różowy</SelectItem>
                              <SelectItem value="blue" className="dark:text-gray-200">Niebieski</SelectItem>
                              <SelectItem value="green" className="dark:text-gray-200">Zielony</SelectItem>
                              <SelectItem value="yellow" className="dark:text-gray-200">Żółty</SelectItem>
                              <SelectItem value="orange" className="dark:text-gray-200">Pomarańczowy</SelectItem>
                              <SelectItem value="purple" className="dark:text-gray-200">Fioletowy</SelectItem>
                              <SelectItem value="white" className="dark:text-gray-200">Biały</SelectItem>
                              <SelectItem value="black" className="dark:text-gray-200">Czarny</SelectItem>
                              <SelectItem value="gray" className="dark:text-gray-200">Szary</SelectItem>
                              <SelectItem value="brown" className="dark:text-gray-200">Brązowy</SelectItem>
                              <SelectItem value="beige" className="dark:text-gray-200">Beżowy</SelectItem>
                              <SelectItem value="multicolor" className="dark:text-gray-200">Wielokolorowy</SelectItem>
                              <SelectItem value="other" className="dark:text-gray-200">Inny</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.kids.additionalInfo") || "Informacje dodatkowe"}</Label>
                          <div className="space-y-2 mt-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="kids-original_packaging" 
                                checked={categoryFilters.originalPackaging === true}
                                onCheckedChange={(checked) => handleCategoryFilterChange("originalPackaging", checked === true)}
                              />
                              <Label htmlFor="kids-original_packaging" className="dark:text-gray-200">
                                {t("filters.kids.original_packaging") || "Oryginalne opakowanie"}
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="kids-complete_set" 
                                checked={categoryFilters.completeSet === true}
                                onCheckedChange={(checked) => handleCategoryFilterChange("completeSet", checked === true)}
                              />
                              <Label htmlFor="kids-complete_set" className="dark:text-gray-200">
                                {t("filters.kids.complete_set") || "Kompletny zestaw"}
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="kids-delivery" 
                                checked={categoryFilters.delivery === true}
                                onCheckedChange={(checked) => handleCategoryFilterChange("delivery", checked === true)}
                              />
                              <Label htmlFor="kids-delivery" className="dark:text-gray-200">
                                {t("filters.kids.delivery") || "Możliwość dostawy"}
                              </Label>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {selectedCategoryId === 9 && ( // Muzyka i Edukacja
                      <div className="space-y-4 border-l-2 border-red-500 pl-4 py-2">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">{t("filters.music.title") || "Szczegóły - Muzyka i Edukacja"}</h4>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.music.category") || "Kategoria"}</Label>
                          <Select
                            onValueChange={(value) => handleCategoryFilterChange("category", value)}
                            value={categoryFilters.category || ""}
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                              <SelectValue placeholder={t("filters.selectCategory") || "Wybierz kategorię"} />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="instruments" className="dark:text-gray-200">Instrumenty muzyczne</SelectItem>
                              <SelectItem value="accessories" className="dark:text-gray-200">Akcesoria muzyczne</SelectItem>
                              <SelectItem value="music_albums" className="dark:text-gray-200">Albumy muzyczne</SelectItem>
                              <SelectItem value="vinyl" className="dark:text-gray-200">Płyty winylowe</SelectItem>
                              <SelectItem value="books" className="dark:text-gray-200">Książki edukacyjne</SelectItem>
                              <SelectItem value="textbooks" className="dark:text-gray-200">Podręczniki</SelectItem>
                              <SelectItem value="courses" className="dark:text-gray-200">Kursy i szkolenia</SelectItem>
                              <SelectItem value="language_learning" className="dark:text-gray-200">Nauka języków</SelectItem>
                              <SelectItem value="school_supplies" className="dark:text-gray-200">Artykuły szkolne</SelectItem>
                              <SelectItem value="teaching_aids" className="dark:text-gray-200">Pomoce dydaktyczne</SelectItem>
                              <SelectItem value="sheet_music" className="dark:text-gray-200">Nuty</SelectItem>
                              <SelectItem value="other" className="dark:text-gray-200">Inne</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        {categoryFilters.category === 'instruments' && (
                          <>
                            <div>
                              <Label className="dark:text-white">{t("filters.music.instrument") || "Rodzaj instrumentu"}</Label>
                              <Select
                                onValueChange={(value) => handleCategoryFilterChange("instrumentType", value)}
                                value={categoryFilters.instrumentType || ""}
                              >
                                <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                                  <SelectValue placeholder={t("filters.selectType") || "Wybierz rodzaj instrumentu"} />
                                </SelectTrigger>
                                <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                  <SelectItem value="guitar" className="dark:text-gray-200">Gitara</SelectItem>
                                  <SelectItem value="acoustic_guitar" className="dark:text-gray-200">Gitara akustyczna</SelectItem>
                                  <SelectItem value="electric_guitar" className="dark:text-gray-200">Gitara elektryczna</SelectItem>
                                  <SelectItem value="bass" className="dark:text-gray-200">Gitara basowa</SelectItem>
                                  <SelectItem value="keyboard" className="dark:text-gray-200">Keyboard</SelectItem>
                                  <SelectItem value="piano" className="dark:text-gray-200">Pianino/Fortepian</SelectItem>
                                  <SelectItem value="synthesizer" className="dark:text-gray-200">Syntezator</SelectItem>
                                  <SelectItem value="drums" className="dark:text-gray-200">Perkusja</SelectItem>
                                  <SelectItem value="electronic_drums" className="dark:text-gray-200">Perkusja elektroniczna</SelectItem>
                                  <SelectItem value="violin" className="dark:text-gray-200">Skrzypce</SelectItem>
                                  <SelectItem value="saxophone" className="dark:text-gray-200">Saksofon</SelectItem>
                                  <SelectItem value="trumpet" className="dark:text-gray-200">Trąbka</SelectItem>
                                  <SelectItem value="flute" className="dark:text-gray-200">Flet</SelectItem>
                                  <SelectItem value="harmonica" className="dark:text-gray-200">Harmonijka</SelectItem>
                                  <SelectItem value="accordion" className="dark:text-gray-200">Akordeon</SelectItem>
                                  <SelectItem value="cello" className="dark:text-gray-200">Wiolonczela</SelectItem>
                                  <SelectItem value="clarinet" className="dark:text-gray-200">Klarnet</SelectItem>
                                  <SelectItem value="trombone" className="dark:text-gray-200">Puzon</SelectItem>
                                  <SelectItem value="ukulele" className="dark:text-gray-200">Ukulele</SelectItem>
                                  <SelectItem value="percussion" className="dark:text-gray-200">Instrumenty perkusyjne</SelectItem>
                                  <SelectItem value="folk" className="dark:text-gray-200">Instrumenty ludowe</SelectItem>
                                  <SelectItem value="other" className="dark:text-gray-200">Inny</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div>
                              <Label className="dark:text-white">Marka</Label>
                              <Input
                                type="text"
                                placeholder="np. Yamaha, Fender, Gibson, Roland"
                                className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 mt-1"
                                value={categoryFilters.brand || ""}
                                onChange={(e) => handleCategoryFilterChange("brand", e.target.value)}
                              />
                            </div>
                            
                            <div>
                              <Label className="dark:text-white">Przeznaczenie</Label>
                              <Select
                                onValueChange={(value) => handleCategoryFilterChange("purpose", value)}
                                value={categoryFilters.purpose || ""}
                              >
                                <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                                  <SelectValue placeholder="Wybierz przeznaczenie" />
                                </SelectTrigger>
                                <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                  <SelectItem value="beginner" className="dark:text-gray-200">Dla początkujących</SelectItem>
                                  <SelectItem value="intermediate" className="dark:text-gray-200">Dla średniozaawansowanych</SelectItem>
                                  <SelectItem value="professional" className="dark:text-gray-200">Profesjonalne</SelectItem>
                                  <SelectItem value="children" className="dark:text-gray-200">Dla dzieci</SelectItem>
                                  <SelectItem value="teaching" className="dark:text-gray-200">Do nauki</SelectItem>
                                  <SelectItem value="stage" className="dark:text-gray-200">Sceniczne</SelectItem>
                                  <SelectItem value="studio" className="dark:text-gray-200">Studyjne</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </>
                        )}
                        
                        {categoryFilters.category === 'accessories' && (
                          <div>
                            <Label className="dark:text-white">Rodzaj akcesoriów</Label>
                            <Select
                              onValueChange={(value) => handleCategoryFilterChange("accessoryType", value)}
                              value={categoryFilters.accessoryType || ""}
                            >
                              <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                                <SelectValue placeholder="Wybierz rodzaj akcesoriów" />
                              </SelectTrigger>
                              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                <SelectItem value="strings" className="dark:text-gray-200">Struny</SelectItem>
                                <SelectItem value="picks" className="dark:text-gray-200">Kostki</SelectItem>
                                <SelectItem value="pedals" className="dark:text-gray-200">Pedały/Efekty</SelectItem>
                                <SelectItem value="amplifiers" className="dark:text-gray-200">Wzmacniacze</SelectItem>
                                <SelectItem value="cases" className="dark:text-gray-200">Futerały/Pokrowce</SelectItem>
                                <SelectItem value="stands" className="dark:text-gray-200">Statywy</SelectItem>
                                <SelectItem value="mouthpieces" className="dark:text-gray-200">Ustniki</SelectItem>
                                <SelectItem value="reeds" className="dark:text-gray-200">Stroiki</SelectItem>
                                <SelectItem value="cables" className="dark:text-gray-200">Kable</SelectItem>
                                <SelectItem value="headphones" className="dark:text-gray-200">Słuchawki</SelectItem>
                                <SelectItem value="microphones" className="dark:text-gray-200">Mikrofony</SelectItem>
                                <SelectItem value="mixers" className="dark:text-gray-200">Miksery</SelectItem>
                                <SelectItem value="other" className="dark:text-gray-200">Inne</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        
                        {(categoryFilters.category === 'music_albums' || categoryFilters.category === 'vinyl') && (
                          <>
                            <div>
                              <Label className="dark:text-white">{t("filters.music.genre") || "Gatunek muzyczny"}</Label>
                              <Select
                                onValueChange={(value) => handleCategoryFilterChange("genre", value)}
                                value={categoryFilters.genre || ""}
                              >
                                <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                                  <SelectValue placeholder={t("filters.selectGenre") || "Wybierz gatunek"} />
                                </SelectTrigger>
                                <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                  <SelectItem value="rock" className="dark:text-gray-200">Rock</SelectItem>
                                  <SelectItem value="pop" className="dark:text-gray-200">Pop</SelectItem>
                                  <SelectItem value="jazz" className="dark:text-gray-200">Jazz</SelectItem>
                                  <SelectItem value="classical" className="dark:text-gray-200">Klasyczna</SelectItem>
                                  <SelectItem value="electronic" className="dark:text-gray-200">Elektroniczna</SelectItem>
                                  <SelectItem value="hip_hop" className="dark:text-gray-200">Hip-Hop</SelectItem>
                                  <SelectItem value="metal" className="dark:text-gray-200">Metal</SelectItem>
                                  <SelectItem value="reggae" className="dark:text-gray-200">Reggae</SelectItem>
                                  <SelectItem value="folk" className="dark:text-gray-200">Folk</SelectItem>
                                  <SelectItem value="country" className="dark:text-gray-200">Country</SelectItem>
                                  <SelectItem value="blues" className="dark:text-gray-200">Blues</SelectItem>
                                  <SelectItem value="soul" className="dark:text-gray-200">Soul</SelectItem>
                                  <SelectItem value="rnb" className="dark:text-gray-200">R&B</SelectItem>
                                  <SelectItem value="funk" className="dark:text-gray-200">Funk</SelectItem>
                                  <SelectItem value="disco" className="dark:text-gray-200">Disco</SelectItem>
                                  <SelectItem value="techno" className="dark:text-gray-200">Techno</SelectItem>
                                  <SelectItem value="house" className="dark:text-gray-200">House</SelectItem>
                                  <SelectItem value="trance" className="dark:text-gray-200">Trance</SelectItem>
                                  <SelectItem value="alternative" className="dark:text-gray-200">Alternatywa</SelectItem>
                                  <SelectItem value="indie" className="dark:text-gray-200">Indie</SelectItem>
                                  <SelectItem value="punk" className="dark:text-gray-200">Punk</SelectItem>
                                  <SelectItem value="soundtrack" className="dark:text-gray-200">Soundtrack</SelectItem>
                                  <SelectItem value="religious" className="dark:text-gray-200">Religijna</SelectItem>
                                  <SelectItem value="world" className="dark:text-gray-200">World Music</SelectItem>
                                  <SelectItem value="polish" className="dark:text-gray-200">Polska muzyka</SelectItem>
                                  <SelectItem value="other" className="dark:text-gray-200">Inny</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div>
                              <Label className="dark:text-white">Wykonawca</Label>
                              <Input
                                type="text"
                                placeholder="np. The Beatles, Michael Jackson, Chopin"
                                className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 mt-1"
                                value={categoryFilters.artist || ""}
                                onChange={(e) => handleCategoryFilterChange("artist", e.target.value)}
                              />
                            </div>
                            
                            <div>
                              <Label className="dark:text-white">Rok wydania</Label>
                              <Input
                                type="text"
                                placeholder="np. 1990"
                                className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 mt-1"
                                value={categoryFilters.releaseYear || ""}
                                onChange={(e) => handleCategoryFilterChange("releaseYear", e.target.value)}
                              />
                            </div>
                            
                            {categoryFilters.category === 'vinyl' && (
                              <div>
                                <Label className="dark:text-white">Prędkość odtwarzania</Label>
                                <Select
                                  onValueChange={(value) => handleCategoryFilterChange("playbackSpeed", value)}
                                  value={categoryFilters.playbackSpeed || ""}
                                >
                                  <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                                    <SelectValue placeholder="Wybierz prędkość" />
                                  </SelectTrigger>
                                  <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                    <SelectItem value="33" className="dark:text-gray-200">33 1/3 RPM</SelectItem>
                                    <SelectItem value="45" className="dark:text-gray-200">45 RPM</SelectItem>
                                    <SelectItem value="78" className="dark:text-gray-200">78 RPM</SelectItem>
                                    <SelectItem value="other" className="dark:text-gray-200">Inna</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            )}
                          </>
                        )}
                        
                        {(categoryFilters.category === 'books' || categoryFilters.category === 'textbooks') && (
                          <>
                            <div>
                              <Label className="dark:text-white">{t("filters.education.subject") || "Przedmiot"}</Label>
                              <Select
                                onValueChange={(value) => handleCategoryFilterChange("subject", value)}
                                value={categoryFilters.subject || ""}
                              >
                                <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                                  <SelectValue placeholder={t("filters.selectSubject") || "Wybierz przedmiot"} />
                                </SelectTrigger>
                                <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                  <SelectItem value="math" className="dark:text-gray-200">Matematyka</SelectItem>
                                  <SelectItem value="physics" className="dark:text-gray-200">Fizyka</SelectItem>
                                  <SelectItem value="chemistry" className="dark:text-gray-200">Chemia</SelectItem>
                                  <SelectItem value="biology" className="dark:text-gray-200">Biologia</SelectItem>
                                  <SelectItem value="geography" className="dark:text-gray-200">Geografia</SelectItem>
                                  <SelectItem value="history" className="dark:text-gray-200">Historia</SelectItem>
                                  <SelectItem value="literature" className="dark:text-gray-200">Literatura</SelectItem>
                                  <SelectItem value="language" className="dark:text-gray-200">Języki obce</SelectItem>
                                  <SelectItem value="art" className="dark:text-gray-200">Sztuka</SelectItem>
                                  <SelectItem value="music" className="dark:text-gray-200">Muzyka</SelectItem>
                                  <SelectItem value="computer_science" className="dark:text-gray-200">Informatyka</SelectItem>
                                  <SelectItem value="economics" className="dark:text-gray-200">Ekonomia</SelectItem>
                                  <SelectItem value="law" className="dark:text-gray-200">Prawo</SelectItem>
                                  <SelectItem value="medicine" className="dark:text-gray-200">Medycyna</SelectItem>
                                  <SelectItem value="engineering" className="dark:text-gray-200">Inżynieria</SelectItem>
                                  <SelectItem value="psychology" className="dark:text-gray-200">Psychologia</SelectItem>
                                  <SelectItem value="sociology" className="dark:text-gray-200">Socjologia</SelectItem>
                                  <SelectItem value="philosophy" className="dark:text-gray-200">Filozofia</SelectItem>
                                  <SelectItem value="religion" className="dark:text-gray-200">Religia</SelectItem>
                                  <SelectItem value="other" className="dark:text-gray-200">Inny</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            {categoryFilters.category === 'textbooks' && (
                              <div>
                                <Label className="dark:text-white">Poziom edukacji</Label>
                                <Select
                                  onValueChange={(value) => handleCategoryFilterChange("educationLevel", value)}
                                  value={categoryFilters.educationLevel || ""}
                                >
                                  <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                                    <SelectValue placeholder="Wybierz poziom" />
                                  </SelectTrigger>
                                  <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                    <SelectItem value="primary_1_3" className="dark:text-gray-200">Szkoła podstawowa (klasy 1-3)</SelectItem>
                                    <SelectItem value="primary_4_6" className="dark:text-gray-200">Szkoła podstawowa (klasy 4-6)</SelectItem>
                                    <SelectItem value="primary_7_8" className="dark:text-gray-200">Szkoła podstawowa (klasy 7-8)</SelectItem>
                                    <SelectItem value="secondary" className="dark:text-gray-200">Szkoła średnia</SelectItem>
                                    <SelectItem value="technical" className="dark:text-gray-200">Szkoła techniczna</SelectItem>
                                    <SelectItem value="vocational" className="dark:text-gray-200">Szkoła zawodowa</SelectItem>
                                    <SelectItem value="college" className="dark:text-gray-200">Studia licencjackie/inżynierskie</SelectItem>
                                    <SelectItem value="master" className="dark:text-gray-200">Studia magisterskie</SelectItem>
                                    <SelectItem value="phd" className="dark:text-gray-200">Studia doktoranckie</SelectItem>
                                    <SelectItem value="professional" className="dark:text-gray-200">Kursy zawodowe</SelectItem>
                                    <SelectItem value="other" className="dark:text-gray-200">Inny</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            )}
                            
                            <div>
                              <Label className="dark:text-white">Autor</Label>
                              <Input
                                type="text"
                                placeholder="np. Adam Mickiewicz, Stephen Hawking"
                                className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 mt-1"
                                value={categoryFilters.author || ""}
                                onChange={(e) => handleCategoryFilterChange("author", e.target.value)}
                              />
                            </div>
                            
                            <div>
                              <Label className="dark:text-white">Wydawnictwo</Label>
                              <Input
                                type="text"
                                placeholder="np. PWN, WSiP, Helion"
                                className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 mt-1"
                                value={categoryFilters.publisher || ""}
                                onChange={(e) => handleCategoryFilterChange("publisher", e.target.value)}
                              />
                            </div>
                          </>
                        )}
                        
                        {categoryFilters.category === 'language_learning' && (
                          <>
                            <div>
                              <Label className="dark:text-white">{t("filters.education.language") || "Język"}</Label>
                              <Select
                                onValueChange={(value) => handleCategoryFilterChange("language", value)}
                                value={categoryFilters.language || ""}
                              >
                                <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                                  <SelectValue placeholder={t("filters.selectLanguage") || "Wybierz język"} />
                                </SelectTrigger>
                                <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                  <SelectItem value="english" className="dark:text-gray-200">Angielski</SelectItem>
                                  <SelectItem value="german" className="dark:text-gray-200">Niemiecki</SelectItem>
                                  <SelectItem value="french" className="dark:text-gray-200">Francuski</SelectItem>
                                  <SelectItem value="spanish" className="dark:text-gray-200">Hiszpański</SelectItem>
                                  <SelectItem value="italian" className="dark:text-gray-200">Włoski</SelectItem>
                                  <SelectItem value="russian" className="dark:text-gray-200">Rosyjski</SelectItem>
                                  <SelectItem value="portuguese" className="dark:text-gray-200">Portugalski</SelectItem>
                                  <SelectItem value="chinese" className="dark:text-gray-200">Chiński</SelectItem>
                                  <SelectItem value="japanese" className="dark:text-gray-200">Japoński</SelectItem>
                                  <SelectItem value="arabic" className="dark:text-gray-200">Arabski</SelectItem>
                                  <SelectItem value="turkish" className="dark:text-gray-200">Turecki</SelectItem>
                                  <SelectItem value="norwegian" className="dark:text-gray-200">Norweski</SelectItem>
                                  <SelectItem value="swedish" className="dark:text-gray-200">Szwedzki</SelectItem>
                                  <SelectItem value="dutch" className="dark:text-gray-200">Holenderski</SelectItem>
                                  <SelectItem value="czech" className="dark:text-gray-200">Czeski</SelectItem>
                                  <SelectItem value="slovak" className="dark:text-gray-200">Słowacki</SelectItem>
                                  <SelectItem value="ukrainian" className="dark:text-gray-200">Ukraiński</SelectItem>
                                  <SelectItem value="hungarian" className="dark:text-gray-200">Węgierski</SelectItem>
                                  <SelectItem value="romanian" className="dark:text-gray-200">Rumuński</SelectItem>
                                  <SelectItem value="greek" className="dark:text-gray-200">Grecki</SelectItem>
                                  <SelectItem value="other" className="dark:text-gray-200">Inny</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div>
                              <Label className="dark:text-white">Poziom zaawansowania</Label>
                              <Select
                                onValueChange={(value) => handleCategoryFilterChange("languageLevel", value)}
                                value={categoryFilters.languageLevel || ""}
                              >
                                <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                                  <SelectValue placeholder="Wybierz poziom" />
                                </SelectTrigger>
                                <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                  <SelectItem value="a0" className="dark:text-gray-200">A0 (Początkujący)</SelectItem>
                                  <SelectItem value="a1" className="dark:text-gray-200">A1 (Początkujący)</SelectItem>
                                  <SelectItem value="a2" className="dark:text-gray-200">A2 (Podstawowy)</SelectItem>
                                  <SelectItem value="b1" className="dark:text-gray-200">B1 (Średniozaawansowany)</SelectItem>
                                  <SelectItem value="b2" className="dark:text-gray-200">B2 (Wyższy średniozaawansowany)</SelectItem>
                                  <SelectItem value="c1" className="dark:text-gray-200">C1 (Zaawansowany)</SelectItem>
                                  <SelectItem value="c2" className="dark:text-gray-200">C2 (Biegły)</SelectItem>
                                  <SelectItem value="all" className="dark:text-gray-200">Wszystkie poziomy</SelectItem>
                                  <SelectItem value="other" className="dark:text-gray-200">Inny</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </>
                        )}
                        
                        {categoryFilters.category === 'courses' && (
                          <div>
                            <Label className="dark:text-white">Rodzaj kursu</Label>
                            <Select
                              onValueChange={(value) => handleCategoryFilterChange("courseType", value)}
                              value={categoryFilters.courseType || ""}
                            >
                              <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                                <SelectValue placeholder="Wybierz rodzaj kursu" />
                              </SelectTrigger>
                              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                <SelectItem value="language" className="dark:text-gray-200">Językowy</SelectItem>
                                <SelectItem value="it" className="dark:text-gray-200">IT/Programowanie</SelectItem>
                                <SelectItem value="business" className="dark:text-gray-200">Biznesowy</SelectItem>
                                <SelectItem value="professional" className="dark:text-gray-200">Zawodowy</SelectItem>
                                <SelectItem value="art" className="dark:text-gray-200">Artystyczny</SelectItem>
                                <SelectItem value="music" className="dark:text-gray-200">Muzyczny</SelectItem>
                                <SelectItem value="cooking" className="dark:text-gray-200">Kulinarny</SelectItem>
                                <SelectItem value="sport" className="dark:text-gray-200">Sportowy</SelectItem>
                                <SelectItem value="hobby" className="dark:text-gray-200">Hobbystyczny</SelectItem>
                                <SelectItem value="other" className="dark:text-gray-200">Inny</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.education.format") || "Format"}</Label>
                          <Select
                            onValueChange={(value) => handleCategoryFilterChange("format", value)}
                            value={categoryFilters.format || ""}
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                              <SelectValue placeholder={t("filters.selectFormat") || "Wybierz format"} />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="book" className="dark:text-gray-200">Książka</SelectItem>
                              <SelectItem value="ebook" className="dark:text-gray-200">E-book</SelectItem>
                              <SelectItem value="audiobook" className="dark:text-gray-200">Audiobook</SelectItem>
                              <SelectItem value="cd" className="dark:text-gray-200">CD</SelectItem>
                              <SelectItem value="vinyl" className="dark:text-gray-200">Płyta winylowa</SelectItem>
                              <SelectItem value="dvd" className="dark:text-gray-200">DVD</SelectItem>
                              <SelectItem value="online_course" className="dark:text-gray-200">Kurs online</SelectItem>
                              <SelectItem value="video_course" className="dark:text-gray-200">Kurs wideo</SelectItem>
                              <SelectItem value="workshops" className="dark:text-gray-200">Warsztaty</SelectItem>
                              <SelectItem value="private_lessons" className="dark:text-gray-200">Lekcje indywidualne</SelectItem>
                              <SelectItem value="group_classes" className="dark:text-gray-200">Zajęcia grupowe</SelectItem>
                              <SelectItem value="software" className="dark:text-gray-200">Oprogramowanie edukacyjne</SelectItem>
                              <SelectItem value="other" className="dark:text-gray-200">Inny</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">Stan</Label>
                          <RadioGroup 
                            onValueChange={(value) => handleCategoryFilterChange("condition", value)}
                            value={categoryFilters.condition || ""}
                            className="mt-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="new" id="music-condition-new" />
                              <Label htmlFor="music-condition-new" className="dark:text-gray-200">
                                Nowy
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="very_good" id="music-condition-very_good" />
                              <Label htmlFor="music-condition-very_good" className="dark:text-gray-200">
                                Bardzo dobry
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="good" id="music-condition-good" />
                              <Label htmlFor="music-condition-good" className="dark:text-gray-200">
                                Dobry
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="acceptable" id="music-condition-acceptable" />
                              <Label htmlFor="music-condition-acceptable" className="dark:text-gray-200">
                                Akceptowalny
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">Informacje dodatkowe</Label>
                          <div className="space-y-2 mt-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="music-original_packaging" 
                                checked={categoryFilters.originalPackaging === true}
                                onCheckedChange={(checked) => handleCategoryFilterChange("originalPackaging", checked === true)}
                              />
                              <Label htmlFor="music-original_packaging" className="dark:text-gray-200">
                                Oryginalne opakowanie
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="music-complete_set" 
                                checked={categoryFilters.completeSet === true}
                                onCheckedChange={(checked) => handleCategoryFilterChange("completeSet", checked === true)}
                              />
                              <Label htmlFor="music-complete_set" className="dark:text-gray-200">
                                Kompletny zestaw
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="music-certificate" 
                                checked={categoryFilters.certificate === true}
                                onCheckedChange={(checked) => handleCategoryFilterChange("certificate", checked === true)}
                              />
                              <Label htmlFor="music-certificate" className="dark:text-gray-200">
                                Certyfikat/Licencja
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="music-receipt" 
                                checked={categoryFilters.receipt === true}
                                onCheckedChange={(checked) => handleCategoryFilterChange("receipt", checked === true)}
                              />
                              <Label htmlFor="music-receipt" className="dark:text-gray-200">
                                Paragon/Faktura
                              </Label>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {selectedCategoryId === 10 && ( // Sport i Hobby
                      <div className="space-y-4 border-l-2 border-red-500 pl-4 py-2">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">{t("filters.sport.title") || "Szczegóły - Sport i Hobby"}</h4>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.sport.category") || "Kategoria"}</Label>
                          <Select
                            onValueChange={(value) => handleCategoryFilterChange("category", value)}
                            value={categoryFilters.category || ""}
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                              <SelectValue placeholder={t("filters.selectCategory") || "Wybierz kategorię"} />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="fitness" className="dark:text-gray-200">Fitness i siłownia</SelectItem>
                              <SelectItem value="team_sports" className="dark:text-gray-200">Sporty zespołowe</SelectItem>
                              <SelectItem value="winter_sports" className="dark:text-gray-200">Sporty zimowe</SelectItem>
                              <SelectItem value="water_sports" className="dark:text-gray-200">Sporty wodne</SelectItem>
                              <SelectItem value="cycling" className="dark:text-gray-200">Kolarstwo</SelectItem>
                              <SelectItem value="running" className="dark:text-gray-200">Bieganie</SelectItem>
                              <SelectItem value="martial_arts" className="dark:text-gray-200">Sztuki walki</SelectItem>
                              <SelectItem value="tourism" className="dark:text-gray-200">Turystyka</SelectItem>
                              <SelectItem value="fishing" className="dark:text-gray-200">Wędkarstwo</SelectItem>
                              <SelectItem value="hunting" className="dark:text-gray-200">Myślistwo</SelectItem>
                              <SelectItem value="camping" className="dark:text-gray-200">Camping</SelectItem>
                              <SelectItem value="books_and_magazines" className="dark:text-gray-200">Książki i czasopisma</SelectItem>
                              <SelectItem value="board_games" className="dark:text-gray-200">Gry planszowe</SelectItem>
                              <SelectItem value="collections" className="dark:text-gray-200">Kolekcje</SelectItem>
                              <SelectItem value="art" className="dark:text-gray-200">Sztuka i rękodzieło</SelectItem>
                              <SelectItem value="other" className="dark:text-gray-200">Inne</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        {categoryFilters.category === 'fitness' && (
                          <div>
                            <Label className="dark:text-white">Rodzaj sprzętu</Label>
                            <Select
                              onValueChange={(value) => handleCategoryFilterChange("equipmentType", value)}
                              value={categoryFilters.equipmentType || ""}
                            >
                              <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                                <SelectValue placeholder="Wybierz rodzaj sprzętu" />
                              </SelectTrigger>
                              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                <SelectItem value="cardio" className="dark:text-gray-200">Sprzęt cardio</SelectItem>
                                <SelectItem value="weights" className="dark:text-gray-200">Ciężary/Hantle</SelectItem>
                                <SelectItem value="machines" className="dark:text-gray-200">Maszyny treningowe</SelectItem>
                                <SelectItem value="accessories" className="dark:text-gray-200">Akcesoria fitness</SelectItem>
                                <SelectItem value="clothing" className="dark:text-gray-200">Odzież sportowa</SelectItem>
                                <SelectItem value="supplements" className="dark:text-gray-200">Suplementy</SelectItem>
                                <SelectItem value="yoga" className="dark:text-gray-200">Joga/Pilates</SelectItem>
                                <SelectItem value="other" className="dark:text-gray-200">Inne</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        
                        {categoryFilters.category === 'team_sports' && (
                          <>
                            <div>
                              <Label className="dark:text-white">{t("filters.sport.discipline") || "Dyscyplina"}</Label>
                              <Select
                                onValueChange={(value) => handleCategoryFilterChange("discipline", value)}
                                value={categoryFilters.discipline || ""}
                              >
                                <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                                  <SelectValue placeholder={t("filters.selectDiscipline") || "Wybierz dyscyplinę"} />
                                </SelectTrigger>
                                <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                  <SelectItem value="football" className="dark:text-gray-200">Piłka nożna</SelectItem>
                                  <SelectItem value="volleyball" className="dark:text-gray-200">Siatkówka</SelectItem>
                                  <SelectItem value="basketball" className="dark:text-gray-200">Koszykówka</SelectItem>
                                  <SelectItem value="handball" className="dark:text-gray-200">Piłka ręczna</SelectItem>
                                  <SelectItem value="tennis" className="dark:text-gray-200">Tenis</SelectItem>
                                  <SelectItem value="badminton" className="dark:text-gray-200">Badminton</SelectItem>
                                  <SelectItem value="hockey" className="dark:text-gray-200">Hokej</SelectItem>
                                  <SelectItem value="baseball" className="dark:text-gray-200">Baseball</SelectItem>
                                  <SelectItem value="rugby" className="dark:text-gray-200">Rugby</SelectItem>
                                  <SelectItem value="american_football" className="dark:text-gray-200">Futbol amerykański</SelectItem>
                                  <SelectItem value="table_tennis" className="dark:text-gray-200">Tenis stołowy</SelectItem>
                                  <SelectItem value="other" className="dark:text-gray-200">Inna</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div>
                              <Label className="dark:text-white">Rodzaj produktu</Label>
                              <Select
                                onValueChange={(value) => handleCategoryFilterChange("productType", value)}
                                value={categoryFilters.productType || ""}
                              >
                                <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                                  <SelectValue placeholder="Wybierz rodzaj produktu" />
                                </SelectTrigger>
                                <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                  <SelectItem value="ball" className="dark:text-gray-200">Piłka</SelectItem>
                                  <SelectItem value="clothing" className="dark:text-gray-200">Odzież sportowa</SelectItem>
                                  <SelectItem value="footwear" className="dark:text-gray-200">Obuwie</SelectItem>
                                  <SelectItem value="accessories" className="dark:text-gray-200">Akcesoria</SelectItem>
                                  <SelectItem value="protective_gear" className="dark:text-gray-200">Sprzęt ochronny</SelectItem>
                                  <SelectItem value="equipment" className="dark:text-gray-200">Sprzęt sportowy</SelectItem>
                                  <SelectItem value="other" className="dark:text-gray-200">Inne</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </>
                        )}
                        
                        {categoryFilters.category === 'winter_sports' && (
                          <div>
                            <Label className="dark:text-white">Rodzaj sportu zimowego</Label>
                            <Select
                              onValueChange={(value) => handleCategoryFilterChange("winterSportType", value)}
                              value={categoryFilters.winterSportType || ""}
                            >
                              <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                                <SelectValue placeholder="Wybierz rodzaj sportu" />
                              </SelectTrigger>
                              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                <SelectItem value="skiing" className="dark:text-gray-200">Narciarstwo</SelectItem>
                                <SelectItem value="snowboarding" className="dark:text-gray-200">Snowboard</SelectItem>
                                <SelectItem value="ice_skating" className="dark:text-gray-200">Łyżwiarstwo</SelectItem>
                                <SelectItem value="hockey" className="dark:text-gray-200">Hokej</SelectItem>
                                <SelectItem value="sledding" className="dark:text-gray-200">Sanki</SelectItem>
                                <SelectItem value="other" className="dark:text-gray-200">Inne</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        
                        {categoryFilters.category === 'water_sports' && (
                          <div>
                            <Label className="dark:text-white">Rodzaj sportu wodnego</Label>
                            <Select
                              onValueChange={(value) => handleCategoryFilterChange("waterSportType", value)}
                              value={categoryFilters.waterSportType || ""}
                            >
                              <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                                <SelectValue placeholder="Wybierz rodzaj sportu" />
                              </SelectTrigger>
                              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                <SelectItem value="swimming" className="dark:text-gray-200">Pływanie</SelectItem>
                                <SelectItem value="surfing" className="dark:text-gray-200">Surfing</SelectItem>
                                <SelectItem value="windsurfing" className="dark:text-gray-200">Windsurfing</SelectItem>
                                <SelectItem value="kitesurfing" className="dark:text-gray-200">Kitesurfing</SelectItem>
                                <SelectItem value="sailing" className="dark:text-gray-200">Żeglarstwo</SelectItem>
                                <SelectItem value="canoeing" className="dark:text-gray-200">Kajakarstwo</SelectItem>
                                <SelectItem value="diving" className="dark:text-gray-200">Nurkowanie</SelectItem>
                                <SelectItem value="other" className="dark:text-gray-200">Inne</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        
                        {categoryFilters.category === 'cycling' && (
                          <>
                            <div>
                              <Label className="dark:text-white">Rodzaj roweru</Label>
                              <Select
                                onValueChange={(value) => handleCategoryFilterChange("bikeType", value)}
                                value={categoryFilters.bikeType || ""}
                              >
                                <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                                  <SelectValue placeholder="Wybierz rodzaj roweru" />
                                </SelectTrigger>
                                <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                  <SelectItem value="road" className="dark:text-gray-200">Szosowy</SelectItem>
                                  <SelectItem value="mountain" className="dark:text-gray-200">Górski</SelectItem>
                                  <SelectItem value="city" className="dark:text-gray-200">Miejski</SelectItem>
                                  <SelectItem value="trekking" className="dark:text-gray-200">Trekkingowy</SelectItem>
                                  <SelectItem value="electric" className="dark:text-gray-200">Elektryczny</SelectItem>
                                  <SelectItem value="kids" className="dark:text-gray-200">Dziecięcy</SelectItem>
                                  <SelectItem value="bmx" className="dark:text-gray-200">BMX</SelectItem>
                                  <SelectItem value="other" className="dark:text-gray-200">Inny</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div>
                              <Label className="dark:text-white">Marka</Label>
                              <Input
                                type="text"
                                placeholder="np. Kross, Giant, Specialized, Trek"
                                className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 mt-1"
                                value={categoryFilters.brand || ""}
                                onChange={(e) => handleCategoryFilterChange("brand", e.target.value)}
                              />
                            </div>
                            
                            <div>
                              <Label className="dark:text-white">Rozmiar ramy</Label>
                              <Select
                                onValueChange={(value) => handleCategoryFilterChange("frameSize", value)}
                                value={categoryFilters.frameSize || ""}
                              >
                                <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                                  <SelectValue placeholder="Wybierz rozmiar ramy" />
                                </SelectTrigger>
                                <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                  <SelectItem value="xs" className="dark:text-gray-200">XS</SelectItem>
                                  <SelectItem value="s" className="dark:text-gray-200">S</SelectItem>
                                  <SelectItem value="m" className="dark:text-gray-200">M</SelectItem>
                                  <SelectItem value="l" className="dark:text-gray-200">L</SelectItem>
                                  <SelectItem value="xl" className="dark:text-gray-200">XL</SelectItem>
                                  <SelectItem value="xxl" className="dark:text-gray-200">XXL</SelectItem>
                                  <SelectItem value="14" className="dark:text-gray-200">14"</SelectItem>
                                  <SelectItem value="16" className="dark:text-gray-200">16"</SelectItem>
                                  <SelectItem value="18" className="dark:text-gray-200">18"</SelectItem>
                                  <SelectItem value="20" className="dark:text-gray-200">20"</SelectItem>
                                  <SelectItem value="22" className="dark:text-gray-200">22"</SelectItem>
                                  <SelectItem value="24" className="dark:text-gray-200">24"</SelectItem>
                                  <SelectItem value="26" className="dark:text-gray-200">26"</SelectItem>
                                  <SelectItem value="28" className="dark:text-gray-200">28"</SelectItem>
                                  <SelectItem value="29" className="dark:text-gray-200">29"</SelectItem>
                                  <SelectItem value="other" className="dark:text-gray-200">Inny</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </>
                        )}
                        
                        {categoryFilters.category === 'fishing' && (
                          <>
                            <div>
                              <Label className="dark:text-white">Rodzaj sprzętu wędkarskiego</Label>
                              <Select
                                onValueChange={(value) => handleCategoryFilterChange("fishingEquipmentType", value)}
                                value={categoryFilters.fishingEquipmentType || ""}
                              >
                                <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                                  <SelectValue placeholder="Wybierz rodzaj sprzętu" />
                                </SelectTrigger>
                                <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                  <SelectItem value="rods" className="dark:text-gray-200">Wędki</SelectItem>
                                  <SelectItem value="reels" className="dark:text-gray-200">Kołowrotki</SelectItem>
                                  <SelectItem value="lures" className="dark:text-gray-200">Przynęty</SelectItem>
                                  <SelectItem value="hooks" className="dark:text-gray-200">Haczyki</SelectItem>
                                  <SelectItem value="lines" className="dark:text-gray-200">Żyłki/Plecionki</SelectItem>
                                  <SelectItem value="clothing" className="dark:text-gray-200">Odzież wędkarska</SelectItem>
                                  <SelectItem value="accessories" className="dark:text-gray-200">Akcesoria</SelectItem>
                                  <SelectItem value="other" className="dark:text-gray-200">Inne</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div>
                              <Label className="dark:text-white">Typ wędkarstwa</Label>
                              <Select
                                onValueChange={(value) => handleCategoryFilterChange("fishingType", value)}
                                value={categoryFilters.fishingType || ""}
                              >
                                <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                                  <SelectValue placeholder="Wybierz typ wędkarstwa" />
                                </SelectTrigger>
                                <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                  <SelectItem value="spinning" className="dark:text-gray-200">Spinning</SelectItem>
                                  <SelectItem value="float" className="dark:text-gray-200">Spławikowe</SelectItem>
                                  <SelectItem value="ground" className="dark:text-gray-200">Gruntowe</SelectItem>
                                  <SelectItem value="feeder" className="dark:text-gray-200">Feeder</SelectItem>
                                  <SelectItem value="fly" className="dark:text-gray-200">Muchowe</SelectItem>
                                  <SelectItem value="sea" className="dark:text-gray-200">Morskie</SelectItem>
                                  <SelectItem value="ice" className="dark:text-gray-200">Podlodowe</SelectItem>
                                  <SelectItem value="other" className="dark:text-gray-200">Inne</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </>
                        )}
                        
                        {categoryFilters.category === 'board_games' && (
                          <>
                            <div>
                              <Label className="dark:text-white">Rodzaj gry</Label>
                              <Select
                                onValueChange={(value) => handleCategoryFilterChange("gameType", value)}
                                value={categoryFilters.gameType || ""}
                              >
                                <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                                  <SelectValue placeholder="Wybierz rodzaj gry" />
                                </SelectTrigger>
                                <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                  <SelectItem value="strategy" className="dark:text-gray-200">Strategiczna</SelectItem>
                                  <SelectItem value="family" className="dark:text-gray-200">Rodzinna</SelectItem>
                                  <SelectItem value="card" className="dark:text-gray-200">Karciana</SelectItem>
                                  <SelectItem value="dice" className="dark:text-gray-200">Kościana</SelectItem>
                                  <SelectItem value="economic" className="dark:text-gray-200">Ekonomiczna</SelectItem>
                                  <SelectItem value="adventure" className="dark:text-gray-200">Przygodowa</SelectItem>
                                  <SelectItem value="cooperative" className="dark:text-gray-200">Kooperacyjna</SelectItem>
                                  <SelectItem value="party" className="dark:text-gray-200">Imprezowa</SelectItem>
                                  <SelectItem value="logic" className="dark:text-gray-200">Logiczna</SelectItem>
                                  <SelectItem value="miniatures" className="dark:text-gray-200">Figurkowa</SelectItem>
                                  <SelectItem value="rpg" className="dark:text-gray-200">RPG</SelectItem>
                                  <SelectItem value="other" className="dark:text-gray-200">Inna</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div>
                              <Label className="dark:text-white">Liczba graczy</Label>
                              <Select
                                onValueChange={(value) => handleCategoryFilterChange("playerCount", value)}
                                value={categoryFilters.playerCount || ""}
                              >
                                <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                                  <SelectValue placeholder="Wybierz liczbę graczy" />
                                </SelectTrigger>
                                <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                  <SelectItem value="1" className="dark:text-gray-200">1 gracz</SelectItem>
                                  <SelectItem value="2" className="dark:text-gray-200">2 graczy</SelectItem>
                                  <SelectItem value="2-4" className="dark:text-gray-200">2-4 graczy</SelectItem>
                                  <SelectItem value="3-5" className="dark:text-gray-200">3-5 graczy</SelectItem>
                                  <SelectItem value="4-6" className="dark:text-gray-200">4-6 graczy</SelectItem>
                                  <SelectItem value="6+" className="dark:text-gray-200">6+ graczy</SelectItem>
                                  <SelectItem value="other" className="dark:text-gray-200">Inna liczba</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div>
                              <Label className="dark:text-white">Wiek graczy</Label>
                              <Select
                                onValueChange={(value) => handleCategoryFilterChange("playerAge", value)}
                                value={categoryFilters.playerAge || ""}
                              >
                                <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                                  <SelectValue placeholder="Wybierz wiek graczy" />
                                </SelectTrigger>
                                <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                  <SelectItem value="3+" className="dark:text-gray-200">3+</SelectItem>
                                  <SelectItem value="6+" className="dark:text-gray-200">6+</SelectItem>
                                  <SelectItem value="8+" className="dark:text-gray-200">8+</SelectItem>
                                  <SelectItem value="10+" className="dark:text-gray-200">10+</SelectItem>
                                  <SelectItem value="12+" className="dark:text-gray-200">12+</SelectItem>
                                  <SelectItem value="14+" className="dark:text-gray-200">14+</SelectItem>
                                  <SelectItem value="16+" className="dark:text-gray-200">16+</SelectItem>
                                  <SelectItem value="18+" className="dark:text-gray-200">18+</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </>
                        )}
                        
                        {categoryFilters.category === 'collections' && (
                          <div>
                            <Label className="dark:text-white">Rodzaj kolekcji</Label>
                            <Select
                              onValueChange={(value) => handleCategoryFilterChange("collectionType", value)}
                              value={categoryFilters.collectionType || ""}
                            >
                              <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                                <SelectValue placeholder="Wybierz rodzaj kolekcji" />
                              </SelectTrigger>
                              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                <SelectItem value="stamps" className="dark:text-gray-200">Znaczki</SelectItem>
                                <SelectItem value="coins" className="dark:text-gray-200">Monety</SelectItem>
                                <SelectItem value="cards" className="dark:text-gray-200">Karty kolekcjonerskie</SelectItem>
                                <SelectItem value="figures" className="dark:text-gray-200">Figurki</SelectItem>
                                <SelectItem value="comics" className="dark:text-gray-200">Komiksy</SelectItem>
                                <SelectItem value="toys" className="dark:text-gray-200">Zabawki kolekcjonerskie</SelectItem>
                                <SelectItem value="vinyl" className="dark:text-gray-200">Płyty winylowe</SelectItem>
                                <SelectItem value="alcohol" className="dark:text-gray-200">Alkohole</SelectItem>
                                <SelectItem value="minerals" className="dark:text-gray-200">Minerały</SelectItem>
                                <SelectItem value="other" className="dark:text-gray-200">Inne</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.sport.level") || "Poziom zaawansowania"}</Label>
                          <Select
                            onValueChange={(value) => handleCategoryFilterChange("level", value)}
                            value={categoryFilters.level || ""}
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                              <SelectValue placeholder={t("filters.selectLevel") || "Wybierz poziom"} />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="beginner" className="dark:text-gray-200">Początkujący</SelectItem>
                              <SelectItem value="intermediate" className="dark:text-gray-200">Średniozaawansowany</SelectItem>
                              <SelectItem value="advanced" className="dark:text-gray-200">Zaawansowany</SelectItem>
                              <SelectItem value="professional" className="dark:text-gray-200">Profesjonalny</SelectItem>
                              <SelectItem value="all" className="dark:text-gray-200">Dla wszystkich</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        {categoryFilters.category && ["fitness", "team_sports", "winter_sports", "water_sports", "cycling", "running", "martial_arts"].includes(categoryFilters.category) && (
                          <>
                            <div>
                              <Label className="dark:text-white">{t("filters.sport.gender") || "Płeć"}</Label>
                              <RadioGroup 
                                onValueChange={(value) => handleCategoryFilterChange("gender", value)}
                                value={categoryFilters.gender || ""}
                                className="mt-2"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="male" id="sport-gender-male" />
                                  <Label htmlFor="sport-gender-male" className="dark:text-gray-200">
                                    Męskie
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="female" id="sport-gender-female" />
                                  <Label htmlFor="sport-gender-female" className="dark:text-gray-200">
                                    Damskie
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="unisex" id="sport-gender-unisex" />
                                  <Label htmlFor="sport-gender-unisex" className="dark:text-gray-200">
                                    Unisex
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="kids" id="sport-gender-kids" />
                                  <Label htmlFor="sport-gender-kids" className="dark:text-gray-200">
                                    Dziecięce
                                  </Label>
                                </div>
                              </RadioGroup>
                            </div>
                            
                            <div>
                              <Label className="dark:text-white">{t("filters.sport.size") || "Rozmiar"}</Label>
                              <Select
                                onValueChange={(value) => handleCategoryFilterChange("size", value)}
                                value={categoryFilters.size || ""}
                              >
                                <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                                  <SelectValue placeholder={t("filters.selectSize") || "Wybierz rozmiar"} />
                                </SelectTrigger>
                                <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                  <SelectItem value="xs" className="dark:text-gray-200">XS</SelectItem>
                                  <SelectItem value="s" className="dark:text-gray-200">S</SelectItem>
                                  <SelectItem value="m" className="dark:text-gray-200">M</SelectItem>
                                  <SelectItem value="l" className="dark:text-gray-200">L</SelectItem>
                                  <SelectItem value="xl" className="dark:text-gray-200">XL</SelectItem>
                                  <SelectItem value="xxl" className="dark:text-gray-200">XXL</SelectItem>
                                  <SelectItem value="36" className="dark:text-gray-200">36</SelectItem>
                                  <SelectItem value="37" className="dark:text-gray-200">37</SelectItem>
                                  <SelectItem value="38" className="dark:text-gray-200">38</SelectItem>
                                  <SelectItem value="39" className="dark:text-gray-200">39</SelectItem>
                                  <SelectItem value="40" className="dark:text-gray-200">40</SelectItem>
                                  <SelectItem value="41" className="dark:text-gray-200">41</SelectItem>
                                  <SelectItem value="42" className="dark:text-gray-200">42</SelectItem>
                                  <SelectItem value="43" className="dark:text-gray-200">43</SelectItem>
                                  <SelectItem value="44" className="dark:text-gray-200">44</SelectItem>
                                  <SelectItem value="45" className="dark:text-gray-200">45</SelectItem>
                                  <SelectItem value="46" className="dark:text-gray-200">46</SelectItem>
                                  <SelectItem value="universal" className="dark:text-gray-200">Uniwersalny</SelectItem>
                                  <SelectItem value="other" className="dark:text-gray-200">Inny</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </>
                        )}
                        
                        <div>
                          <Label className="dark:text-white">Marka</Label>
                          <Input
                            type="text"
                            placeholder="np. Nike, Adidas, Wilson, Head"
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 mt-1"
                            value={categoryFilters.brand || ""}
                            onChange={(e) => handleCategoryFilterChange("brand", e.target.value)}
                          />
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">Stan</Label>
                          <RadioGroup 
                            onValueChange={(value) => handleCategoryFilterChange("condition", value)}
                            value={categoryFilters.condition || ""}
                            className="mt-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="new" id="sport-condition-new" />
                              <Label htmlFor="sport-condition-new" className="dark:text-gray-200">
                                Nowy
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="very_good" id="sport-condition-very_good" />
                              <Label htmlFor="sport-condition-very_good" className="dark:text-gray-200">
                                Bardzo dobry
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="good" id="sport-condition-good" />
                              <Label htmlFor="sport-condition-good" className="dark:text-gray-200">
                                Dobry
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="acceptable" id="sport-condition-acceptable" />
                              <Label htmlFor="sport-condition-acceptable" className="dark:text-gray-200">
                                Akceptowalny
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">Informacje dodatkowe</Label>
                          <div className="space-y-2 mt-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="sport-original_packaging" 
                                checked={categoryFilters.originalPackaging === true}
                                onCheckedChange={(checked) => handleCategoryFilterChange("originalPackaging", checked === true)}
                              />
                              <Label htmlFor="sport-original_packaging" className="dark:text-gray-200">
                                Oryginalne opakowanie
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="sport-complete_set" 
                                checked={categoryFilters.completeSet === true}
                                onCheckedChange={(checked) => handleCategoryFilterChange("completeSet", checked === true)}
                              />
                              <Label htmlFor="sport-complete_set" className="dark:text-gray-200">
                                Kompletny zestaw
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="sport-warranty" 
                                checked={categoryFilters.warranty === true}
                                onCheckedChange={(checked) => handleCategoryFilterChange("warranty", checked === true)}
                              />
                              <Label htmlFor="sport-warranty" className="dark:text-gray-200">
                                Gwarancja
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="sport-receipt" 
                                checked={categoryFilters.receipt === true}
                                onCheckedChange={(checked) => handleCategoryFilterChange("receipt", checked === true)}
                              />
                              <Label htmlFor="sport-receipt" className="dark:text-gray-200">
                                Paragon/Faktura
                              </Label>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {selectedCategoryId === 11 && ( // Firma i Przemysł
                      <div className="space-y-4 border-l-2 border-red-500 pl-4 py-2">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">{t("filters.business.title") || "Szczegóły - Firma i Przemysł"}</h4>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.business.category") || "Kategoria"}</Label>
                          <Select
                            onValueChange={(value) => handleCategoryFilterChange("category", value)}
                            value={categoryFilters.category || ""}
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                              <SelectValue placeholder={t("filters.selectCategory") || "Wybierz kategorię"} />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="machinery" className="dark:text-gray-200">Maszyny i urządzenia</SelectItem>
                              <SelectItem value="tools" className="dark:text-gray-200">Narzędzia</SelectItem>
                              <SelectItem value="materials" className="dark:text-gray-200">Materiały</SelectItem>
                              <SelectItem value="production_lines" className="dark:text-gray-200">Linie produkcyjne</SelectItem>
                              <SelectItem value="safety_equipment" className="dark:text-gray-200">Sprzęt BHP</SelectItem>
                              <SelectItem value="office" className="dark:text-gray-200">Wyposażenie biurowe</SelectItem>
                              <SelectItem value="gastronomy" className="dark:text-gray-200">Gastronomia</SelectItem>
                              <SelectItem value="retail" className="dark:text-gray-200">Handel detaliczny</SelectItem>
                              <SelectItem value="furniture" className="dark:text-gray-200">Meble dla firm</SelectItem>
                              <SelectItem value="packaging" className="dark:text-gray-200">Opakowania</SelectItem>
                              <SelectItem value="warehouse" className="dark:text-gray-200">Magazynowanie</SelectItem>
                              <SelectItem value="agriculture" className="dark:text-gray-200">Rolnictwo przemysłowe</SelectItem>
                              <SelectItem value="cleaning" className="dark:text-gray-200">Sprzęt czyszczący</SelectItem>
                              <SelectItem value="medical" className="dark:text-gray-200">Sprzęt medyczny</SelectItem>
                              <SelectItem value="it_equipment" className="dark:text-gray-200">Sprzęt IT</SelectItem>
                              <SelectItem value="services" className="dark:text-gray-200">Usługi dla firm</SelectItem>
                              <SelectItem value="printing" className="dark:text-gray-200">Poligrafia i druk</SelectItem>
                              <SelectItem value="other" className="dark:text-gray-200">Inne</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        {categoryFilters.category === 'machinery' && (
                          <div>
                            <Label className="dark:text-white">Rodzaj maszyn</Label>
                            <Select
                              onValueChange={(value) => handleCategoryFilterChange("machineryType", value)}
                              value={categoryFilters.machineryType || ""}
                            >
                              <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                                <SelectValue placeholder="Wybierz rodzaj maszyn" />
                              </SelectTrigger>
                              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                <SelectItem value="manufacturing" className="dark:text-gray-200">Produkcyjne</SelectItem>
                                <SelectItem value="construction" className="dark:text-gray-200">Budowlane</SelectItem>
                                <SelectItem value="agricultural" className="dark:text-gray-200">Rolnicze</SelectItem>
                                <SelectItem value="warehouse" className="dark:text-gray-200">Magazynowe</SelectItem>
                                <SelectItem value="food" className="dark:text-gray-200">Spożywcze</SelectItem>
                                <SelectItem value="packaging" className="dark:text-gray-200">Pakujące</SelectItem>
                                <SelectItem value="printing" className="dark:text-gray-200">Drukarskie</SelectItem>
                                <SelectItem value="woodworking" className="dark:text-gray-200">Do obróbki drewna</SelectItem>
                                <SelectItem value="metalworking" className="dark:text-gray-200">Do obróbki metalu</SelectItem>
                                <SelectItem value="textile" className="dark:text-gray-200">Włókiennicze</SelectItem>
                                <SelectItem value="cnc" className="dark:text-gray-200">CNC</SelectItem>
                                <SelectItem value="other" className="dark:text-gray-200">Inne</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        
                        {categoryFilters.category === 'tools' && (
                          <div>
                            <Label className="dark:text-white">Rodzaj narzędzi</Label>
                            <Select
                              onValueChange={(value) => handleCategoryFilterChange("toolType", value)}
                              value={categoryFilters.toolType || ""}
                            >
                              <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                                <SelectValue placeholder="Wybierz rodzaj narzędzi" />
                              </SelectTrigger>
                              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                <SelectItem value="hand_tools" className="dark:text-gray-200">Ręczne</SelectItem>
                                <SelectItem value="power_tools" className="dark:text-gray-200">Elektryczne</SelectItem>
                                <SelectItem value="pneumatic" className="dark:text-gray-200">Pneumatyczne</SelectItem>
                                <SelectItem value="hydraulic" className="dark:text-gray-200">Hydrauliczne</SelectItem>
                                <SelectItem value="measuring" className="dark:text-gray-200">Pomiarowe</SelectItem>
                                <SelectItem value="cutting" className="dark:text-gray-200">Tnące</SelectItem>
                                <SelectItem value="welding" className="dark:text-gray-200">Spawalnicze</SelectItem>
                                <SelectItem value="woodworking" className="dark:text-gray-200">Stolarskie</SelectItem>
                                <SelectItem value="garden" className="dark:text-gray-200">Ogrodnicze</SelectItem>
                                <SelectItem value="construction" className="dark:text-gray-200">Budowlane</SelectItem>
                                <SelectItem value="other" className="dark:text-gray-200">Inne</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        
                        {categoryFilters.category === 'materials' && (
                          <div>
                            <Label className="dark:text-white">Rodzaj materiałów</Label>
                            <Select
                              onValueChange={(value) => handleCategoryFilterChange("materialType", value)}
                              value={categoryFilters.materialType || ""}
                            >
                              <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                                <SelectValue placeholder="Wybierz rodzaj materiałów" />
                              </SelectTrigger>
                              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                <SelectItem value="metal" className="dark:text-gray-200">Metalowe</SelectItem>
                                <SelectItem value="wood" className="dark:text-gray-200">Drewniane</SelectItem>
                                <SelectItem value="plastic" className="dark:text-gray-200">Plastikowe</SelectItem>
                                <SelectItem value="glass" className="dark:text-gray-200">Szklane</SelectItem>
                                <SelectItem value="fabric" className="dark:text-gray-200">Tkaniny</SelectItem>
                                <SelectItem value="rubber" className="dark:text-gray-200">Gumowe</SelectItem>
                                <SelectItem value="stone" className="dark:text-gray-200">Kamienne</SelectItem>
                                <SelectItem value="construction" className="dark:text-gray-200">Budowlane</SelectItem>
                                <SelectItem value="paper" className="dark:text-gray-200">Papiernicze</SelectItem>
                                <SelectItem value="electronic" className="dark:text-gray-200">Elektroniczne</SelectItem>
                                <SelectItem value="chemical" className="dark:text-gray-200">Chemiczne</SelectItem>
                                <SelectItem value="other" className="dark:text-gray-200">Inne</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        
                        {categoryFilters.category === 'gastronomy' && (
                          <div>
                            <Label className="dark:text-white">Rodzaj sprzętu gastronomicznego</Label>
                            <Select
                              onValueChange={(value) => handleCategoryFilterChange("gastronomyEquipmentType", value)}
                              value={categoryFilters.gastronomyEquipmentType || ""}
                            >
                              <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                                <SelectValue placeholder="Wybierz rodzaj sprzętu" />
                              </SelectTrigger>
                              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                <SelectItem value="cooking" className="dark:text-gray-200">Urządzenia grzewcze</SelectItem>
                                <SelectItem value="refrigeration" className="dark:text-gray-200">Urządzenia chłodnicze</SelectItem>
                                <SelectItem value="prep" className="dark:text-gray-200">Sprzęt do przygotowania</SelectItem>
                                <SelectItem value="servingware" className="dark:text-gray-200">Sprzęt do serwowania</SelectItem>
                                <SelectItem value="tableware" className="dark:text-gray-200">Zastawa stołowa</SelectItem>
                                <SelectItem value="smallwares" className="dark:text-gray-200">Drobny sprzęt</SelectItem>
                                <SelectItem value="furniture" className="dark:text-gray-200">Meble gastronomiczne</SelectItem>
                                <SelectItem value="bakery" className="dark:text-gray-200">Wyposażenie piekarni</SelectItem>
                                <SelectItem value="bar" className="dark:text-gray-200">Wyposażenie baru</SelectItem>
                                <SelectItem value="coffee" className="dark:text-gray-200">Sprzęt do kawy</SelectItem>
                                <SelectItem value="vending" className="dark:text-gray-200">Automaty vendingowe</SelectItem>
                                <SelectItem value="other" className="dark:text-gray-200">Inne</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        
                        {categoryFilters.category === 'medical' && (
                          <div>
                            <Label className="dark:text-white">Rodzaj sprzętu medycznego</Label>
                            <Select
                              onValueChange={(value) => handleCategoryFilterChange("medicalEquipmentType", value)}
                              value={categoryFilters.medicalEquipmentType || ""}
                            >
                              <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                                <SelectValue placeholder="Wybierz rodzaj sprzętu" />
                              </SelectTrigger>
                              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                <SelectItem value="diagnostic" className="dark:text-gray-200">Diagnostyczny</SelectItem>
                                <SelectItem value="surgical" className="dark:text-gray-200">Chirurgiczny</SelectItem>
                                <SelectItem value="monitoring" className="dark:text-gray-200">Monitorujący</SelectItem>
                                <SelectItem value="treatment" className="dark:text-gray-200">Terapeutyczny</SelectItem>
                                <SelectItem value="laboratory" className="dark:text-gray-200">Laboratoryjny</SelectItem>
                                <SelectItem value="dental" className="dark:text-gray-200">Stomatologiczny</SelectItem>
                                <SelectItem value="rehabilitation" className="dark:text-gray-200">Rehabilitacyjny</SelectItem>
                                <SelectItem value="other" className="dark:text-gray-200">Inny</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.business.type") || "Rodzaj działalności"}</Label>
                          <Select
                            onValueChange={(value) => handleCategoryFilterChange("businessType", value)}
                            value={categoryFilters.businessType || ""}
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                              <SelectValue placeholder={t("filters.selectType") || "Wybierz rodzaj"} />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="production" className="dark:text-gray-200">Produkcja</SelectItem>
                              <SelectItem value="services" className="dark:text-gray-200">Usługi</SelectItem>
                              <SelectItem value="trade" className="dark:text-gray-200">Handel</SelectItem>
                              <SelectItem value="construction" className="dark:text-gray-200">Budownictwo</SelectItem>
                              <SelectItem value="transport" className="dark:text-gray-200">Transport</SelectItem>
                              <SelectItem value="food_service" className="dark:text-gray-200">Gastronomia</SelectItem>
                              <SelectItem value="logistics" className="dark:text-gray-200">Logistyka</SelectItem>
                              <SelectItem value="health_care" className="dark:text-gray-200">Ochrona zdrowia</SelectItem>
                              <SelectItem value="it" className="dark:text-gray-200">IT</SelectItem>
                              <SelectItem value="education" className="dark:text-gray-200">Edukacja</SelectItem>
                              <SelectItem value="manufacturing" className="dark:text-gray-200">Wytwórstwo</SelectItem>
                              <SelectItem value="other" className="dark:text-gray-200">Inne</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.business.usage") || "Przeznaczenie"}</Label>
                          <Select
                            onValueChange={(value) => handleCategoryFilterChange("usage", value)}
                            value={categoryFilters.usage || ""}
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                              <SelectValue placeholder={t("filters.selectUsage") || "Wybierz przeznaczenie"} />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="professional" className="dark:text-gray-200">Profesjonalne</SelectItem>
                              <SelectItem value="industrial" className="dark:text-gray-200">Przemysłowe</SelectItem>
                              <SelectItem value="commercial" className="dark:text-gray-200">Komercyjne</SelectItem>
                              <SelectItem value="home" className="dark:text-gray-200">Domowe</SelectItem>
                              <SelectItem value="craft" className="dark:text-gray-200">Rzemieślnicze</SelectItem>
                              <SelectItem value="educational" className="dark:text-gray-200">Edukacyjne</SelectItem>
                              <SelectItem value="scientific" className="dark:text-gray-200">Naukowe</SelectItem>
                              <SelectItem value="other" className="dark:text-gray-200">Inne</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">Marka/Producent</Label>
                          <Input
                            type="text"
                            placeholder="np. Bosch, Makita, Siemens, Hilti"
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 mt-1"
                            value={categoryFilters.brand || ""}
                            onChange={(e) => handleCategoryFilterChange("brand", e.target.value)}
                          />
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">Rok produkcji</Label>
                          <Input
                            type="text"
                            placeholder="np. 2020"
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 mt-1"
                            value={categoryFilters.productionYear || ""}
                            onChange={(e) => handleCategoryFilterChange("productionYear", e.target.value)}
                          />
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.business.condition") || "Stan"}</Label>
                          <RadioGroup 
                            onValueChange={(value) => handleCategoryFilterChange("condition", value)}
                            value={categoryFilters.condition || ""}
                            className="mt-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="new" id="business-condition-new" />
                              <Label htmlFor="business-condition-new" className="dark:text-gray-200">
                                Nowy
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="used" id="business-condition-used" />
                              <Label htmlFor="business-condition-used" className="dark:text-gray-200">
                                Używany
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="refurbished" id="business-condition-refurbished" />
                              <Label htmlFor="business-condition-refurbished" className="dark:text-gray-200">
                                Odnowiony
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="damaged" id="business-condition-damaged" />
                              <Label htmlFor="business-condition-damaged" className="dark:text-gray-200">
                                Uszkodzony
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">Informacje dodatkowe</Label>
                          <div className="space-y-2 mt-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="business-warranty" 
                                checked={categoryFilters.warranty === true}
                                onCheckedChange={(checked) => handleCategoryFilterChange("warranty", checked === true)}
                              />
                              <Label htmlFor="business-warranty" className="dark:text-gray-200">
                                Gwarancja
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="business-invoice" 
                                checked={categoryFilters.invoice === true}
                                onCheckedChange={(checked) => handleCategoryFilterChange("invoice", checked === true)}
                              />
                              <Label htmlFor="business-invoice" className="dark:text-gray-200">
                                Faktura VAT
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="business-leasing" 
                                checked={categoryFilters.leasing === true}
                                onCheckedChange={(checked) => handleCategoryFilterChange("leasing", checked === true)}
                              />
                              <Label htmlFor="business-leasing" className="dark:text-gray-200">
                                Możliwość leasingu
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="business-training" 
                                checked={categoryFilters.training === true}
                                onCheckedChange={(checked) => handleCategoryFilterChange("training", checked === true)}
                              />
                              <Label htmlFor="business-training" className="dark:text-gray-200">
                                Szkolenie w cenie
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="business-servicing" 
                                checked={categoryFilters.servicing === true}
                                onCheckedChange={(checked) => handleCategoryFilterChange("servicing", checked === true)}
                              />
                              <Label htmlFor="business-servicing" className="dark:text-gray-200">
                                Serwis w cenie
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="business-delivery" 
                                checked={categoryFilters.delivery === true}
                                onCheckedChange={(checked) => handleCategoryFilterChange("delivery", checked === true)}
                              />
                              <Label htmlFor="business-delivery" className="dark:text-gray-200">
                                Transport/Dostawa
                              </Label>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {selectedCategoryId === 12 && ( // Antyki i Kolekcje
                      <div className="space-y-4 border-l-2 border-red-500 pl-4 py-2">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">{t("filters.antiques.title") || "Szczegóły - Antyki i Kolekcje"}</h4>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.antiques.category") || "Kategoria"}</Label>
                          <Select
                            onValueChange={(value) => handleCategoryFilterChange("category", value)}
                            value={categoryFilters.category || ""}
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                              <SelectValue placeholder={t("filters.selectCategory") || "Wybierz kategorię"} />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="furniture" className="dark:text-gray-200">Meble</SelectItem>
                              <SelectItem value="paintings" className="dark:text-gray-200">Obrazy</SelectItem>
                              <SelectItem value="sculptures" className="dark:text-gray-200">Rzeźby</SelectItem>
                              <SelectItem value="coins" className="dark:text-gray-200">Monety</SelectItem>
                              <SelectItem value="banknotes" className="dark:text-gray-200">Banknoty</SelectItem>
                              <SelectItem value="stamps" className="dark:text-gray-200">Znaczki</SelectItem>
                              <SelectItem value="cards" className="dark:text-gray-200">Karty kolekcjonerskie</SelectItem>
                              <SelectItem value="militaria" className="dark:text-gray-200">Militaria</SelectItem>
                              <SelectItem value="books" className="dark:text-gray-200">Stare książki</SelectItem>
                              <SelectItem value="maps" className="dark:text-gray-200">Mapy i atlasy</SelectItem>
                              <SelectItem value="posters" className="dark:text-gray-200">Plakaty</SelectItem>
                              <SelectItem value="postcards" className="dark:text-gray-200">Pocztówki</SelectItem>
                              <SelectItem value="photographs" className="dark:text-gray-200">Fotografie</SelectItem>
                              <SelectItem value="vinyl" className="dark:text-gray-200">Płyty winylowe</SelectItem>
                              <SelectItem value="watches" className="dark:text-gray-200">Zegarki</SelectItem>
                              <SelectItem value="jewelry" className="dark:text-gray-200">Biżuteria</SelectItem>
                              <SelectItem value="toys" className="dark:text-gray-200">Zabawki</SelectItem>
                              <SelectItem value="porcelain" className="dark:text-gray-200">Porcelana</SelectItem>
                              <SelectItem value="glass" className="dark:text-gray-200">Szkło</SelectItem>
                              <SelectItem value="silver" className="dark:text-gray-200">Wyroby ze srebra</SelectItem>
                              <SelectItem value="religious" className="dark:text-gray-200">Dewocjonalia</SelectItem>
                              <SelectItem value="advertising" className="dark:text-gray-200">Reklamy</SelectItem>
                              <SelectItem value="electronics" className="dark:text-gray-200">Elektronika</SelectItem>
                              <SelectItem value="other" className="dark:text-gray-200">Inne</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        {categoryFilters.category === 'coins' && (
                          <>
                            <div>
                              <Label className="dark:text-white">Rodzaj monet</Label>
                              <Select
                                onValueChange={(value) => handleCategoryFilterChange("coinType", value)}
                                value={categoryFilters.coinType || ""}
                              >
                                <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                                  <SelectValue placeholder="Wybierz rodzaj monet" />
                                </SelectTrigger>
                                <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                  <SelectItem value="ancient" className="dark:text-gray-200">Starożytne</SelectItem>
                                  <SelectItem value="medieval" className="dark:text-gray-200">Średniowieczne</SelectItem>
                                  <SelectItem value="polish_coins" className="dark:text-gray-200">Polskie</SelectItem>
                                  <SelectItem value="world_coins" className="dark:text-gray-200">Zagraniczne</SelectItem>
                                  <SelectItem value="commemorative" className="dark:text-gray-200">Okolicznościowe</SelectItem>
                                  <SelectItem value="bullion" className="dark:text-gray-200">Bulionowe</SelectItem>
                                  <SelectItem value="other" className="dark:text-gray-200">Inne</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div>
                              <Label className="dark:text-white">Metal</Label>
                              <Select
                                onValueChange={(value) => handleCategoryFilterChange("coinMetal", value)}
                                value={categoryFilters.coinMetal || ""}
                              >
                                <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                                  <SelectValue placeholder="Wybierz metal" />
                                </SelectTrigger>
                                <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                  <SelectItem value="gold" className="dark:text-gray-200">Złoto</SelectItem>
                                  <SelectItem value="silver" className="dark:text-gray-200">Srebro</SelectItem>
                                  <SelectItem value="copper" className="dark:text-gray-200">Miedź</SelectItem>
                                  <SelectItem value="brass" className="dark:text-gray-200">Mosiądz</SelectItem>
                                  <SelectItem value="bronze" className="dark:text-gray-200">Brąz</SelectItem>
                                  <SelectItem value="nickel" className="dark:text-gray-200">Nikiel</SelectItem>
                                  <SelectItem value="bimetal" className="dark:text-gray-200">Bilon (bimetaliczny)</SelectItem>
                                  <SelectItem value="other" className="dark:text-gray-200">Inny</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </>
                        )}
                        
                        {categoryFilters.category === 'stamps' && (
                          <div>
                            <Label className="dark:text-white">Rodzaj znaczków</Label>
                            <Select
                              onValueChange={(value) => handleCategoryFilterChange("stampType", value)}
                              value={categoryFilters.stampType || ""}
                            >
                              <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                                <SelectValue placeholder="Wybierz rodzaj znaczków" />
                              </SelectTrigger>
                              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                <SelectItem value="polish" className="dark:text-gray-200">Polskie</SelectItem>
                                <SelectItem value="world" className="dark:text-gray-200">Zagraniczne</SelectItem>
                                <SelectItem value="commemorative" className="dark:text-gray-200">Okolicznościowe</SelectItem>
                                <SelectItem value="thematic" className="dark:text-gray-200">Tematyczne</SelectItem>
                                <SelectItem value="first_day" className="dark:text-gray-200">Koperty pierwszego dnia</SelectItem>
                                <SelectItem value="blocks" className="dark:text-gray-200">Bloki</SelectItem>
                                <SelectItem value="albums" className="dark:text-gray-200">Albumy</SelectItem>
                                <SelectItem value="other" className="dark:text-gray-200">Inne</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        
                        {categoryFilters.category === 'militaria' && (
                          <div>
                            <Label className="dark:text-white">Rodzaj militariów</Label>
                            <Select
                              onValueChange={(value) => handleCategoryFilterChange("militariaType", value)}
                              value={categoryFilters.militariaType || ""}
                            >
                              <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                                <SelectValue placeholder="Wybierz rodzaj militariów" />
                              </SelectTrigger>
                              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                <SelectItem value="medals" className="dark:text-gray-200">Medale i odznaczenia</SelectItem>
                                <SelectItem value="uniforms" className="dark:text-gray-200">Mundury i elementy umundurowania</SelectItem>
                                <SelectItem value="equipment" className="dark:text-gray-200">Wyposażenie wojskowe</SelectItem>
                                <SelectItem value="helmets" className="dark:text-gray-200">Hełmy</SelectItem>
                                <SelectItem value="documents" className="dark:text-gray-200">Dokumenty</SelectItem>
                                <SelectItem value="books" className="dark:text-gray-200">Książki o tematyce wojskowej</SelectItem>
                                <SelectItem value="photos" className="dark:text-gray-200">Fotografie</SelectItem>
                                <SelectItem value="replicas" className="dark:text-gray-200">Repliki</SelectItem>
                                <SelectItem value="other" className="dark:text-gray-200">Inne</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        
                        {categoryFilters.category === 'books' && (
                          <>
                            <div>
                              <Label className="dark:text-white">Tematyka</Label>
                              <Select
                                onValueChange={(value) => handleCategoryFilterChange("bookTopic", value)}
                                value={categoryFilters.bookTopic || ""}
                              >
                                <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                                  <SelectValue placeholder="Wybierz tematykę" />
                                </SelectTrigger>
                                <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                  <SelectItem value="literature" className="dark:text-gray-200">Literatura piękna</SelectItem>
                                  <SelectItem value="history" className="dark:text-gray-200">Historia</SelectItem>
                                  <SelectItem value="art" className="dark:text-gray-200">Sztuka</SelectItem>
                                  <SelectItem value="religion" className="dark:text-gray-200">Religia</SelectItem>
                                  <SelectItem value="science" className="dark:text-gray-200">Nauka</SelectItem>
                                  <SelectItem value="philosophy" className="dark:text-gray-200">Filozofia</SelectItem>
                                  <SelectItem value="maps" className="dark:text-gray-200">Mapy i atlasy</SelectItem>
                                  <SelectItem value="children" className="dark:text-gray-200">Literatura dziecięca</SelectItem>
                                  <SelectItem value="other" className="dark:text-gray-200">Inna</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div>
                              <Label className="dark:text-white">Język</Label>
                              <Select
                                onValueChange={(value) => handleCategoryFilterChange("bookLanguage", value)}
                                value={categoryFilters.bookLanguage || ""}
                              >
                                <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                                  <SelectValue placeholder="Wybierz język" />
                                </SelectTrigger>
                                <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                  <SelectItem value="polish" className="dark:text-gray-200">Polski</SelectItem>
                                  <SelectItem value="english" className="dark:text-gray-200">Angielski</SelectItem>
                                  <SelectItem value="german" className="dark:text-gray-200">Niemiecki</SelectItem>
                                  <SelectItem value="french" className="dark:text-gray-200">Francuski</SelectItem>
                                  <SelectItem value="latin" className="dark:text-gray-200">Łacina</SelectItem>
                                  <SelectItem value="russian" className="dark:text-gray-200">Rosyjski</SelectItem>
                                  <SelectItem value="other" className="dark:text-gray-200">Inny</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </>
                        )}
                        
                        {categoryFilters.category === 'furniture' && (
                          <div>
                            <Label className="dark:text-white">Rodzaj mebla</Label>
                            <Select
                              onValueChange={(value) => handleCategoryFilterChange("furnitureType", value)}
                              value={categoryFilters.furnitureType || ""}
                            >
                              <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                                <SelectValue placeholder="Wybierz rodzaj mebla" />
                              </SelectTrigger>
                              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                <SelectItem value="chairs" className="dark:text-gray-200">Krzesła, fotele</SelectItem>
                                <SelectItem value="tables" className="dark:text-gray-200">Stoły, stoliki</SelectItem>
                                <SelectItem value="cabinets" className="dark:text-gray-200">Szafy, komody</SelectItem>
                                <SelectItem value="chests" className="dark:text-gray-200">Skrzynie, kufry</SelectItem>
                                <SelectItem value="beds" className="dark:text-gray-200">Łóżka</SelectItem>
                                <SelectItem value="desks" className="dark:text-gray-200">Biurka</SelectItem>
                                <SelectItem value="mirrors" className="dark:text-gray-200">Lustra</SelectItem>
                                <SelectItem value="clocks" className="dark:text-gray-200">Zegary stojące</SelectItem>
                                <SelectItem value="other" className="dark:text-gray-200">Inne</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.antiques.period") || "Okres pochodzenia"}</Label>
                          <Select
                            onValueChange={(value) => handleCategoryFilterChange("period", value)}
                            value={categoryFilters.period || ""}
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                              <SelectValue placeholder={t("filters.selectPeriod") || "Wybierz okres"} />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="ancient" className="dark:text-gray-200">Starożytność</SelectItem>
                              <SelectItem value="medieval" className="dark:text-gray-200">Średniowiecze</SelectItem>
                              <SelectItem value="renaissance" className="dark:text-gray-200">Renesans</SelectItem>
                              <SelectItem value="baroque" className="dark:text-gray-200">Barok</SelectItem>
                              <SelectItem value="classicism" className="dark:text-gray-200">Klasycyzm</SelectItem>
                              <SelectItem value="before_1800" className="dark:text-gray-200">Przed 1800</SelectItem>
                              <SelectItem value="1800_1850" className="dark:text-gray-200">1800-1850</SelectItem>
                              <SelectItem value="1850_1900" className="dark:text-gray-200">1850-1900</SelectItem>
                              <SelectItem value="art_nouveau" className="dark:text-gray-200">Secesja</SelectItem>
                              <SelectItem value="art_deco" className="dark:text-gray-200">Art Deco</SelectItem>
                              <SelectItem value="1900_1950" className="dark:text-gray-200">1900-1950</SelectItem>
                              <SelectItem value="modernism" className="dark:text-gray-200">Modernizm</SelectItem>
                              <SelectItem value="after_1950" className="dark:text-gray-200">Po 1950</SelectItem>
                              <SelectItem value="unknown" className="dark:text-gray-200">Nieznany</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">Kraj/Region pochodzenia</Label>
                          <Select
                            onValueChange={(value) => handleCategoryFilterChange("originCountry", value)}
                            value={categoryFilters.originCountry || ""}
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                              <SelectValue placeholder="Wybierz kraj/region" />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="poland" className="dark:text-gray-200">Polska</SelectItem>
                              <SelectItem value="germany" className="dark:text-gray-200">Niemcy</SelectItem>
                              <SelectItem value="france" className="dark:text-gray-200">Francja</SelectItem>
                              <SelectItem value="uk" className="dark:text-gray-200">Wielka Brytania</SelectItem>
                              <SelectItem value="italy" className="dark:text-gray-200">Włochy</SelectItem>
                              <SelectItem value="netherlands" className="dark:text-gray-200">Holandia</SelectItem>
                              <SelectItem value="belgium" className="dark:text-gray-200">Belgia</SelectItem>
                              <SelectItem value="russia" className="dark:text-gray-200">Rosja</SelectItem>
                              <SelectItem value="austria" className="dark:text-gray-200">Austria</SelectItem>
                              <SelectItem value="china" className="dark:text-gray-200">Chiny</SelectItem>
                              <SelectItem value="japan" className="dark:text-gray-200">Japonia</SelectItem>
                              <SelectItem value="usa" className="dark:text-gray-200">USA</SelectItem>
                              <SelectItem value="other_europe" className="dark:text-gray-200">Inna Europa</SelectItem>
                              <SelectItem value="other_asia" className="dark:text-gray-200">Inna Azja</SelectItem>
                              <SelectItem value="other" className="dark:text-gray-200">Inny</SelectItem>
                              <SelectItem value="unknown" className="dark:text-gray-200">Nieznany</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.antiques.material") || "Materiał"}</Label>
                          <Select
                            onValueChange={(value) => handleCategoryFilterChange("material", value)}
                            value={categoryFilters.material || ""}
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                              <SelectValue placeholder={t("filters.selectMaterial") || "Wybierz materiał"} />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="wood" className="dark:text-gray-200">Drewno</SelectItem>
                              <SelectItem value="oak" className="dark:text-gray-200">Dąb</SelectItem>
                              <SelectItem value="walnut" className="dark:text-gray-200">Orzech</SelectItem>
                              <SelectItem value="mahogany" className="dark:text-gray-200">Mahoń</SelectItem>
                              <SelectItem value="metal" className="dark:text-gray-200">Metal</SelectItem>
                              <SelectItem value="gold" className="dark:text-gray-200">Złoto</SelectItem>
                              <SelectItem value="silver" className="dark:text-gray-200">Srebro</SelectItem>
                              <SelectItem value="bronze" className="dark:text-gray-200">Brąz</SelectItem>
                              <SelectItem value="copper" className="dark:text-gray-200">Miedź</SelectItem>
                              <SelectItem value="brass" className="dark:text-gray-200">Mosiądz</SelectItem>
                              <SelectItem value="porcelain" className="dark:text-gray-200">Porcelana</SelectItem>
                              <SelectItem value="ceramic" className="dark:text-gray-200">Ceramika</SelectItem>
                              <SelectItem value="glass" className="dark:text-gray-200">Szkło</SelectItem>
                              <SelectItem value="crystal" className="dark:text-gray-200">Kryształ</SelectItem>
                              <SelectItem value="paper" className="dark:text-gray-200">Papier</SelectItem>
                              <SelectItem value="textile" className="dark:text-gray-200">Tkanina</SelectItem>
                              <SelectItem value="leather" className="dark:text-gray-200">Skóra</SelectItem>
                              <SelectItem value="stone" className="dark:text-gray-200">Kamień</SelectItem>
                              <SelectItem value="marble" className="dark:text-gray-200">Marmur</SelectItem>
                              <SelectItem value="bone" className="dark:text-gray-200">Kość</SelectItem>
                              <SelectItem value="ivory" className="dark:text-gray-200">Kość słoniowa (legalny antyk)</SelectItem>
                              <SelectItem value="mixed" className="dark:text-gray-200">Mieszany</SelectItem>
                              <SelectItem value="other" className="dark:text-gray-200">Inny</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.antiques.condition") || "Stan"}</Label>
                          <RadioGroup 
                            onValueChange={(value) => handleCategoryFilterChange("condition", value)}
                            value={categoryFilters.condition || ""}
                            className="mt-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="mint" id="antiques-condition-mint" />
                              <Label htmlFor="antiques-condition-mint" className="dark:text-gray-200">
                                Idealny (Mint)
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="excellent" id="antiques-condition-excellent" />
                              <Label htmlFor="antiques-condition-excellent" className="dark:text-gray-200">
                                Doskonały
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="very_good" id="antiques-condition-very_good" />
                              <Label htmlFor="antiques-condition-very_good" className="dark:text-gray-200">
                                Bardzo dobry
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="good" id="antiques-condition-good" />
                              <Label htmlFor="antiques-condition-good" className="dark:text-gray-200">
                                Dobry
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="fair" id="antiques-condition-fair" />
                              <Label htmlFor="antiques-condition-fair" className="dark:text-gray-200">
                                Dostateczny
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="poor" id="antiques-condition-poor" />
                              <Label htmlFor="antiques-condition-poor" className="dark:text-gray-200">
                                Słaby
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="for_restoration" id="antiques-condition-for_restoration" />
                              <Label htmlFor="antiques-condition-for_restoration" className="dark:text-gray-200">
                                Do renowacji
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">Informacje dodatkowe</Label>
                          <div className="space-y-2 mt-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="antiques-authenticity" 
                                checked={categoryFilters.authenticityDocument === true}
                                onCheckedChange={(checked) => handleCategoryFilterChange("authenticityDocument", checked === true)}
                              />
                              <Label htmlFor="antiques-authenticity" className="dark:text-gray-200">
                                Posiadam certyfikat autentyczności
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="antiques-expert_opinion" 
                                checked={categoryFilters.expertOpinion === true}
                                onCheckedChange={(checked) => handleCategoryFilterChange("expertOpinion", checked === true)}
                              />
                              <Label htmlFor="antiques-expert_opinion" className="dark:text-gray-200">
                                Posiadam opinię eksperta
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="antiques-original" 
                                checked={categoryFilters.original === true}
                                onCheckedChange={(checked) => handleCategoryFilterChange("original", checked === true)}
                              />
                              <Label htmlFor="antiques-original" className="dark:text-gray-200">
                                Oryginał (nie kopia/replika)
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="antiques-provenance" 
                                checked={categoryFilters.provenance === true}
                                onCheckedChange={(checked) => handleCategoryFilterChange("provenance", checked === true)}
                              />
                              <Label htmlFor="antiques-provenance" className="dark:text-gray-200">
                                Znana proweniencja
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="antiques-signed" 
                                checked={categoryFilters.signed === true}
                                onCheckedChange={(checked) => handleCategoryFilterChange("signed", checked === true)}
                              />
                              <Label htmlFor="antiques-signed" className="dark:text-gray-200">
                                Sygnowany/Podpisany
                              </Label>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {selectedCategoryId === 13 && ( // Zdrowie i Uroda
                      <div className="space-y-4 border-l-2 border-red-500 pl-4 py-2">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">{t("filters.health.title") || "Szczegóły - Zdrowie i Uroda"}</h4>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.health.category") || "Kategoria"}</Label>
                          <Select
                            onValueChange={(value) => handleCategoryFilterChange("category", value)}
                            value={categoryFilters.category || ""}
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                              <SelectValue placeholder={t("filters.selectCategory") || "Wybierz kategorię"} />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="cosmetics" className="dark:text-gray-200">Kosmetyki</SelectItem>
                              <SelectItem value="perfumes" className="dark:text-gray-200">Perfumy</SelectItem>
                              <SelectItem value="makeup" className="dark:text-gray-200">Makijaż</SelectItem>
                              <SelectItem value="hair_care" className="dark:text-gray-200">Pielęgnacja włosów</SelectItem>
                              <SelectItem value="skin_care" className="dark:text-gray-200">Pielęgnacja skóry</SelectItem>
                              <SelectItem value="nails" className="dark:text-gray-200">Pielęgnacja paznokci</SelectItem>
                              <SelectItem value="bath_body" className="dark:text-gray-200">Kąpiel i ciało</SelectItem>
                              <SelectItem value="oral_care" className="dark:text-gray-200">Higiena jamy ustnej</SelectItem>
                              <SelectItem value="supplements" className="dark:text-gray-200">Suplementy diety</SelectItem>
                              <SelectItem value="medical_equipment" className="dark:text-gray-200">Sprzęt medyczny</SelectItem>
                              <SelectItem value="spa" className="dark:text-gray-200">Produkty do spa</SelectItem>
                              <SelectItem value="aromatherapy" className="dark:text-gray-200">Aromaterapia</SelectItem>
                              <SelectItem value="beauty_tools" className="dark:text-gray-200">Narzędzia kosmetyczne</SelectItem>
                              <SelectItem value="wellness" className="dark:text-gray-200">Wellness i relaks</SelectItem>
                              <SelectItem value="other" className="dark:text-gray-200">Inne</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        {categoryFilters.category === 'makeup' && (
                          <div>
                            <Label className="dark:text-white">Rodzaj kosmetyku do makijażu</Label>
                            <Select
                              onValueChange={(value) => handleCategoryFilterChange("makeupType", value)}
                              value={categoryFilters.makeupType || ""}
                            >
                              <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                                <SelectValue placeholder="Wybierz rodzaj kosmetyku" />
                              </SelectTrigger>
                              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                <SelectItem value="foundation" className="dark:text-gray-200">Podkład</SelectItem>
                                <SelectItem value="concealer" className="dark:text-gray-200">Korektor</SelectItem>
                                <SelectItem value="powder" className="dark:text-gray-200">Puder</SelectItem>
                                <SelectItem value="blush" className="dark:text-gray-200">Róż</SelectItem>
                                <SelectItem value="bronzer" className="dark:text-gray-200">Bronzer</SelectItem>
                                <SelectItem value="highlighter" className="dark:text-gray-200">Rozświetlacz</SelectItem>
                                <SelectItem value="primer" className="dark:text-gray-200">Baza pod makijaż</SelectItem>
                                <SelectItem value="eyeshadow" className="dark:text-gray-200">Cienie do powiek</SelectItem>
                                <SelectItem value="eyeliner" className="dark:text-gray-200">Eyeliner</SelectItem>
                                <SelectItem value="mascara" className="dark:text-gray-200">Tusz do rzęs</SelectItem>
                                <SelectItem value="eyebrow" className="dark:text-gray-200">Produkty do brwi</SelectItem>
                                <SelectItem value="lipstick" className="dark:text-gray-200">Szminka</SelectItem>
                                <SelectItem value="lip_gloss" className="dark:text-gray-200">Błyszczyk</SelectItem>
                                <SelectItem value="lip_liner" className="dark:text-gray-200">Konturówka do ust</SelectItem>
                                <SelectItem value="makeup_set" className="dark:text-gray-200">Zestaw do makijażu</SelectItem>
                                <SelectItem value="other" className="dark:text-gray-200">Inny</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        
                        {categoryFilters.category === 'skin_care' && (
                          <div>
                            <Label className="dark:text-white">Rodzaj kosmetyku do pielęgnacji skóry</Label>
                            <Select
                              onValueChange={(value) => handleCategoryFilterChange("skinCareType", value)}
                              value={categoryFilters.skinCareType || ""}
                            >
                              <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                                <SelectValue placeholder="Wybierz rodzaj kosmetyku" />
                              </SelectTrigger>
                              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                <SelectItem value="cleanser" className="dark:text-gray-200">Płyn do mycia twarzy</SelectItem>
                                <SelectItem value="toner" className="dark:text-gray-200">Tonik</SelectItem>
                                <SelectItem value="serum" className="dark:text-gray-200">Serum</SelectItem>
                                <SelectItem value="moisturizer" className="dark:text-gray-200">Krem nawilżający</SelectItem>
                                <SelectItem value="face_oil" className="dark:text-gray-200">Olejek do twarzy</SelectItem>
                                <SelectItem value="eye_cream" className="dark:text-gray-200">Krem pod oczy</SelectItem>
                                <SelectItem value="mask" className="dark:text-gray-200">Maska</SelectItem>
                                <SelectItem value="exfoliator" className="dark:text-gray-200">Peeling</SelectItem>
                                <SelectItem value="face_mist" className="dark:text-gray-200">Mgiełka do twarzy</SelectItem>
                                <SelectItem value="sunscreen" className="dark:text-gray-200">Krem z filtrem UV</SelectItem>
                                <SelectItem value="acne_treatment" className="dark:text-gray-200">Produkty przeciwtrądzikowe</SelectItem>
                                <SelectItem value="anti_aging" className="dark:text-gray-200">Produkty przeciwzmarszczkowe</SelectItem>
                                <SelectItem value="skin_care_set" className="dark:text-gray-200">Zestaw do pielęgnacji</SelectItem>
                                <SelectItem value="other" className="dark:text-gray-200">Inny</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        
                        {categoryFilters.category === 'hair_care' && (
                          <div>
                            <Label className="dark:text-white">Rodzaj kosmetyku do włosów</Label>
                            <Select
                              onValueChange={(value) => handleCategoryFilterChange("hairCareType", value)}
                              value={categoryFilters.hairCareType || ""}
                            >
                              <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                                <SelectValue placeholder="Wybierz rodzaj kosmetyku" />
                              </SelectTrigger>
                              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                <SelectItem value="shampoo" className="dark:text-gray-200">Szampon</SelectItem>
                                <SelectItem value="conditioner" className="dark:text-gray-200">Odżywka</SelectItem>
                                <SelectItem value="mask" className="dark:text-gray-200">Maska</SelectItem>
                                <SelectItem value="oil" className="dark:text-gray-200">Olejek</SelectItem>
                                <SelectItem value="serum" className="dark:text-gray-200">Serum</SelectItem>
                                <SelectItem value="styling" className="dark:text-gray-200">Stylizacja</SelectItem>
                                <SelectItem value="coloring" className="dark:text-gray-200">Koloryzacja</SelectItem>
                                <SelectItem value="treatment" className="dark:text-gray-200">Kuracja</SelectItem>
                                <SelectItem value="hair_care_set" className="dark:text-gray-200">Zestaw do pielęgnacji</SelectItem>
                                <SelectItem value="other" className="dark:text-gray-200">Inny</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        
                        {categoryFilters.category === 'perfumes' && (
                          <>
                            <div>
                              <Label className="dark:text-white">Rodzaj zapachu</Label>
                              <Select
                                onValueChange={(value) => handleCategoryFilterChange("fragranceType", value)}
                                value={categoryFilters.fragranceType || ""}
                              >
                                <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                                  <SelectValue placeholder="Wybierz rodzaj zapachu" />
                                </SelectTrigger>
                                <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                  <SelectItem value="eau_de_parfum" className="dark:text-gray-200">Eau de Parfum</SelectItem>
                                  <SelectItem value="eau_de_toilette" className="dark:text-gray-200">Eau de Toilette</SelectItem>
                                  <SelectItem value="eau_de_cologne" className="dark:text-gray-200">Eau de Cologne</SelectItem>
                                  <SelectItem value="perfume_oil" className="dark:text-gray-200">Olejek perfumowany</SelectItem>
                                  <SelectItem value="body_mist" className="dark:text-gray-200">Mgiełka do ciała</SelectItem>
                                  <SelectItem value="perfume_set" className="dark:text-gray-200">Zestaw perfum</SelectItem>
                                  <SelectItem value="other" className="dark:text-gray-200">Inny</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div>
                              <Label className="dark:text-white">Rodzina zapachowa</Label>
                              <Select
                                onValueChange={(value) => handleCategoryFilterChange("fragranceFamily", value)}
                                value={categoryFilters.fragranceFamily || ""}
                              >
                                <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                                  <SelectValue placeholder="Wybierz rodzinę zapachową" />
                                </SelectTrigger>
                                <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                  <SelectItem value="floral" className="dark:text-gray-200">Kwiatowa</SelectItem>
                                  <SelectItem value="oriental" className="dark:text-gray-200">Orientalna</SelectItem>
                                  <SelectItem value="woody" className="dark:text-gray-200">Drzewna</SelectItem>
                                  <SelectItem value="fresh" className="dark:text-gray-200">Świeża</SelectItem>
                                  <SelectItem value="fruity" className="dark:text-gray-200">Owocowa</SelectItem>
                                  <SelectItem value="gourmand" className="dark:text-gray-200">Gourmand</SelectItem>
                                  <SelectItem value="citrus" className="dark:text-gray-200">Cytrusowa</SelectItem>
                                  <SelectItem value="aromatic" className="dark:text-gray-200">Aromatyczna</SelectItem>
                                  <SelectItem value="fougere" className="dark:text-gray-200">Fougère</SelectItem>
                                  <SelectItem value="chypre" className="dark:text-gray-200">Szyprowa</SelectItem>
                                  <SelectItem value="other" className="dark:text-gray-200">Inna</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </>
                        )}
                        
                        {categoryFilters.category === 'medical_equipment' && (
                          <div>
                            <Label className="dark:text-white">Rodzaj sprzętu medycznego</Label>
                            <Select
                              onValueChange={(value) => handleCategoryFilterChange("medicalEquipmentType", value)}
                              value={categoryFilters.medicalEquipmentType || ""}
                            >
                              <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                                <SelectValue placeholder="Wybierz rodzaj sprzętu" />
                              </SelectTrigger>
                              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                <SelectItem value="blood_pressure" className="dark:text-gray-200">Ciśnieniomierz</SelectItem>
                                <SelectItem value="thermometer" className="dark:text-gray-200">Termometr</SelectItem>
                                <SelectItem value="glucometer" className="dark:text-gray-200">Glukometr</SelectItem>
                                <SelectItem value="pulse_oximeter" className="dark:text-gray-200">Pulsoksymetr</SelectItem>
                                <SelectItem value="inhalator" className="dark:text-gray-200">Inhalator</SelectItem>
                                <SelectItem value="massage" className="dark:text-gray-200">Sprzęt do masażu</SelectItem>
                                <SelectItem value="rehabilitation" className="dark:text-gray-200">Sprzęt rehabilitacyjny</SelectItem>
                                <SelectItem value="orthopedic" className="dark:text-gray-200">Sprzęt ortopedyczny</SelectItem>
                                <SelectItem value="first_aid" className="dark:text-gray-200">Pierwsza pomoc</SelectItem>
                                <SelectItem value="other" className="dark:text-gray-200">Inny</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.health.gender") || "Płeć"}</Label>
                          <RadioGroup 
                            onValueChange={(value) => handleCategoryFilterChange("gender", value)}
                            value={categoryFilters.gender || ""}
                            className="mt-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="female" id="health-gender-female" />
                              <Label htmlFor="health-gender-female" className="dark:text-gray-200">
                                Damskie
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="male" id="health-gender-male" />
                              <Label htmlFor="health-gender-male" className="dark:text-gray-200">
                                Męskie
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="unisex" id="health-gender-unisex" />
                              <Label htmlFor="health-gender-unisex" className="dark:text-gray-200">
                                Unisex
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="kids" id="health-gender-kids" />
                              <Label htmlFor="health-gender-kids" className="dark:text-gray-200">
                                Dla dzieci
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">Typ skóry</Label>
                          <Select
                            onValueChange={(value) => handleCategoryFilterChange("skinType", value)}
                            value={categoryFilters.skinType || ""}
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                              <SelectValue placeholder="Wybierz typ skóry" />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="normal" className="dark:text-gray-200">Normalna</SelectItem>
                              <SelectItem value="dry" className="dark:text-gray-200">Sucha</SelectItem>
                              <SelectItem value="oily" className="dark:text-gray-200">Tłusta</SelectItem>
                              <SelectItem value="combination" className="dark:text-gray-200">Mieszana</SelectItem>
                              <SelectItem value="sensitive" className="dark:text-gray-200">Wrażliwa</SelectItem>
                              <SelectItem value="acne_prone" className="dark:text-gray-200">Trądzikowa</SelectItem>
                              <SelectItem value="mature" className="dark:text-gray-200">Dojrzała</SelectItem>
                              <SelectItem value="all" className="dark:text-gray-200">Każdy typ skóry</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.health.brand") || "Marka"}</Label>
                          <Input
                            type="text"
                            placeholder="np. L'Oreal, Nivea, Vichy"
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 mt-1"
                            value={categoryFilters.brand || ""}
                            onChange={(e) => handleCategoryFilterChange("brand", e.target.value)}
                          />
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.health.expiration") || "Data ważności"}</Label>
                          <Input
                            type="text"
                            placeholder="np. 12/2025"
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 mt-1"
                            value={categoryFilters.expirationDate || ""}
                            onChange={(e) => handleCategoryFilterChange("expirationDate", e.target.value)}
                          />
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">Stan</Label>
                          <RadioGroup 
                            onValueChange={(value) => handleCategoryFilterChange("condition", value)}
                            value={categoryFilters.condition || ""}
                            className="mt-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="new" id="health-condition-new" />
                              <Label htmlFor="health-condition-new" className="dark:text-gray-200">
                                Nowy
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="new_open" id="health-condition-new_open" />
                              <Label htmlFor="health-condition-new_open" className="dark:text-gray-200">
                                Nowy, otwarte opakowanie
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="used" id="health-condition-used" />
                              <Label htmlFor="health-condition-used" className="dark:text-gray-200">
                                Używany
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">Informacje dodatkowe</Label>
                          <div className="space-y-2 mt-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="health-natural" 
                                checked={categoryFilters.naturalIngredients === true}
                                onCheckedChange={(checked) => handleCategoryFilterChange("naturalIngredients", checked === true)}
                              />
                              <Label htmlFor="health-natural" className="dark:text-gray-200">
                                Naturalne składniki
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="health-vegan" 
                                checked={categoryFilters.vegan === true}
                                onCheckedChange={(checked) => handleCategoryFilterChange("vegan", checked === true)}
                              />
                              <Label htmlFor="health-vegan" className="dark:text-gray-200">
                                Wegańskie
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="health-cruelty_free" 
                                checked={categoryFilters.crueltyFree === true}
                                onCheckedChange={(checked) => handleCategoryFilterChange("crueltyFree", checked === true)}
                              />
                              <Label htmlFor="health-cruelty_free" className="dark:text-gray-200">
                                Nietestowane na zwierzętach
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="health-hypoallergenic" 
                                checked={categoryFilters.hypoallergenic === true}
                                onCheckedChange={(checked) => handleCategoryFilterChange("hypoallergenic", checked === true)}
                              />
                              <Label htmlFor="health-hypoallergenic" className="dark:text-gray-200">
                                Hipoalergiczne
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="health-organic" 
                                checked={categoryFilters.organic === true}
                                onCheckedChange={(checked) => handleCategoryFilterChange("organic", checked === true)}
                              />
                              <Label htmlFor="health-organic" className="dark:text-gray-200">
                                Organiczne
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="health-paraben_free" 
                                checked={categoryFilters.parabenFree === true}
                                onCheckedChange={(checked) => handleCategoryFilterChange("parabenFree", checked === true)}
                              />
                              <Label htmlFor="health-paraben_free" className="dark:text-gray-200">
                                Bez parabenów
                              </Label>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {selectedCategoryId === 14 && ( // Wypożyczalnia
                      <div className="space-y-4 border-l-2 border-red-500 pl-4 py-2">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">{t("filters.rental.title") || "Szczegóły - Wypożyczalnia"}</h4>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.rental.category") || "Kategoria"}</Label>
                          <Select
                            onValueChange={(value) => handleCategoryFilterChange("category", value)}
                            value={categoryFilters.category || ""}
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                              <SelectValue placeholder={t("filters.selectCategory") || "Wybierz kategorię"} />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="tools" className="dark:text-gray-200">Narzędzia</SelectItem>
                              <SelectItem value="cars" className="dark:text-gray-200">Samochody</SelectItem>
                              <SelectItem value="party" className="dark:text-gray-200">Imprezy i eventy</SelectItem>
                              <SelectItem value="electronics" className="dark:text-gray-200">Elektronika</SelectItem>
                              <SelectItem value="sports" className="dark:text-gray-200">Sprzęt sportowy</SelectItem>
                              <SelectItem value="clothing" className="dark:text-gray-200">Odzież</SelectItem>
                              <SelectItem value="construction" className="dark:text-gray-200">Sprzęt budowlany</SelectItem>
                              <SelectItem value="photography" className="dark:text-gray-200">Sprzęt fotograficzny</SelectItem>
                              <SelectItem value="music" className="dark:text-gray-200">Instrumenty muzyczne</SelectItem>
                              <SelectItem value="games" className="dark:text-gray-200">Gry i zabawki</SelectItem>
                              <SelectItem value="other" className="dark:text-gray-200">Inne</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.rental.period") || "Okres wypożyczenia"}</Label>
                          <Select
                            onValueChange={(value) => handleCategoryFilterChange("rentalPeriod", value)}
                            value={categoryFilters.rentalPeriod || ""}
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                              <SelectValue placeholder={t("filters.selectPeriod") || "Wybierz okres"} />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="hour" className="dark:text-gray-200">Godzinowy</SelectItem>
                              <SelectItem value="day" className="dark:text-gray-200">Dzienny</SelectItem>
                              <SelectItem value="weekend" className="dark:text-gray-200">Weekendowy</SelectItem>
                              <SelectItem value="week" className="dark:text-gray-200">Tygodniowy</SelectItem>
                              <SelectItem value="month" className="dark:text-gray-200">Miesięczny</SelectItem>
                              <SelectItem value="negotiable" className="dark:text-gray-200">Do negocjacji</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.rental.condition") || "Stan"}</Label>
                          <RadioGroup 
                            onValueChange={(value) => handleCategoryFilterChange("condition", value)}
                            value={categoryFilters.condition || ""}
                            className="mt-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="new" id="rental-condition-new" />
                              <Label htmlFor="rental-condition-new" className="dark:text-gray-200">
                                Nowy
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="very_good" id="rental-condition-very_good" />
                              <Label htmlFor="rental-condition-very_good" className="dark:text-gray-200">
                                Bardzo dobry
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="good" id="rental-condition-good" />
                              <Label htmlFor="rental-condition-good" className="dark:text-gray-200">
                                Dobry
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="acceptable" id="rental-condition-acceptable" />
                              <Label htmlFor="rental-condition-acceptable" className="dark:text-gray-200">
                                Akceptowalny
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">Dodatkowe informacje</Label>
                          <div className="space-y-2 mt-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="rental-deposit" 
                                checked={categoryFilters.deposit === true}
                                onCheckedChange={(checked) => handleCategoryFilterChange("deposit", checked === true)}
                              />
                              <Label htmlFor="rental-deposit" className="dark:text-gray-200">
                                {t("filters.rental.deposit") || "Wymagana kaucja"}
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="rental-delivery" 
                                checked={categoryFilters.delivery === true}
                                onCheckedChange={(checked) => handleCategoryFilterChange("delivery", checked === true)}
                              />
                              <Label htmlFor="rental-delivery" className="dark:text-gray-200">
                                {t("filters.rental.delivery") || "Możliwość dostawy"}
                              </Label>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {selectedCategoryId === 15 && ( // Noclegi
                      <div className="space-y-4 border-l-2 border-red-500 pl-4 py-2">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">{t("filters.accommodation.title") || "Szczegóły - Noclegi"}</h4>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.accommodation.type") || "Rodzaj zakwaterowania"}</Label>
                          <Select
                            onValueChange={(value) => handleCategoryFilterChange("accommodationType", value)}
                            value={categoryFilters.accommodationType || ""}
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                              <SelectValue placeholder={t("filters.selectType") || "Wybierz rodzaj"} />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="hotel" className="dark:text-gray-200">Hotel</SelectItem>
                              <SelectItem value="hostel" className="dark:text-gray-200">Hostel</SelectItem>
                              <SelectItem value="apartment" className="dark:text-gray-200">Apartament</SelectItem>
                              <SelectItem value="room" className="dark:text-gray-200">Pokój</SelectItem>
                              <SelectItem value="house" className="dark:text-gray-200">Dom</SelectItem>
                              <SelectItem value="cottage" className="dark:text-gray-200">Domek</SelectItem>
                              <SelectItem value="camping" className="dark:text-gray-200">Camping</SelectItem>
                              <SelectItem value="other" className="dark:text-gray-200">Inne</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.accommodation.guests") || "Liczba gości"}</Label>
                          <Select
                            onValueChange={(value) => handleCategoryFilterChange("guests", value)}
                            value={categoryFilters.guests || ""}
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                              <SelectValue placeholder={t("filters.selectGuests") || "Wybierz liczbę gości"} />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="1" className="dark:text-gray-200">1 osoba</SelectItem>
                              <SelectItem value="2" className="dark:text-gray-200">2 osoby</SelectItem>
                              <SelectItem value="3" className="dark:text-gray-200">3 osoby</SelectItem>
                              <SelectItem value="4" className="dark:text-gray-200">4 osoby</SelectItem>
                              <SelectItem value="5" className="dark:text-gray-200">5 osób</SelectItem>
                              <SelectItem value="6" className="dark:text-gray-200">6 osób</SelectItem>
                              <SelectItem value="7" className="dark:text-gray-200">7 osób</SelectItem>
                              <SelectItem value="8" className="dark:text-gray-200">8 osób</SelectItem>
                              <SelectItem value="9" className="dark:text-gray-200">9 osób</SelectItem>
                              <SelectItem value="10+" className="dark:text-gray-200">10+ osób</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.accommodation.rooms") || "Liczba pokoi"}</Label>
                          <Select
                            onValueChange={(value) => handleCategoryFilterChange("rooms", value)}
                            value={categoryFilters.rooms || ""}
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                              <SelectValue placeholder={t("filters.selectRooms") || "Wybierz liczbę pokoi"} />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="1" className="dark:text-gray-200">1 pokój</SelectItem>
                              <SelectItem value="2" className="dark:text-gray-200">2 pokoje</SelectItem>
                              <SelectItem value="3" className="dark:text-gray-200">3 pokoje</SelectItem>
                              <SelectItem value="4" className="dark:text-gray-200">4 pokoje</SelectItem>
                              <SelectItem value="5+" className="dark:text-gray-200">5+ pokoi</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.accommodation.amenities") || "Udogodnienia"}</Label>
                          <div className="space-y-2 mt-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="accommodation-wifi" 
                                checked={categoryFilters.wifi === true}
                                onCheckedChange={(checked) => handleCategoryFilterChange("wifi", checked === true)}
                              />
                              <Label htmlFor="accommodation-wifi" className="dark:text-gray-200">
                                Wi-Fi
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="accommodation-parking" 
                                checked={categoryFilters.parking === true}
                                onCheckedChange={(checked) => handleCategoryFilterChange("parking", checked === true)}
                              />
                              <Label htmlFor="accommodation-parking" className="dark:text-gray-200">
                                Parking
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="accommodation-tv" 
                                checked={categoryFilters.tv === true}
                                onCheckedChange={(checked) => handleCategoryFilterChange("tv", checked === true)}
                              />
                              <Label htmlFor="accommodation-tv" className="dark:text-gray-200">
                                TV
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="accommodation-kitchen" 
                                checked={categoryFilters.kitchen === true}
                                onCheckedChange={(checked) => handleCategoryFilterChange("kitchen", checked === true)}
                              />
                              <Label htmlFor="accommodation-kitchen" className="dark:text-gray-200">
                                Kuchnia
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="accommodation-airConditioning" 
                                checked={categoryFilters.airConditioning === true}
                                onCheckedChange={(checked) => handleCategoryFilterChange("airConditioning", checked === true)}
                              />
                              <Label htmlFor="accommodation-airConditioning" className="dark:text-gray-200">
                                Klimatyzacja
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="accommodation-pets" 
                                checked={categoryFilters.petsAllowed === true}
                                onCheckedChange={(checked) => handleCategoryFilterChange("petsAllowed", checked === true)}
                              />
                              <Label htmlFor="accommodation-pets" className="dark:text-gray-200">
                                Zwierzęta dozwolone
                              </Label>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.accommodation.availability") || "Dostępność"}</Label>
                          <Input
                            type="text"
                            placeholder="np. 15.06.2025 - 30.06.2025"
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 mt-1"
                            value={categoryFilters.availability || ""}
                            onChange={(e) => handleCategoryFilterChange("availability", e.target.value)}
                          />
                        </div>
                      </div>
                    )}
                    
                    {selectedCategoryId === 16 && ( // Praca
                      <div className="space-y-4 border-l-2 border-red-500 pl-4 py-2">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">{t("filters.job.title") || "Szczegóły - Praca"}</h4>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.job.category") || "Kategoria pracy"}</Label>
                          <Select
                            onValueChange={(value) => handleCategoryFilterChange("jobCategory", value)}
                            value={categoryFilters.jobCategory || ""}
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                              <SelectValue placeholder={t("filters.selectCategory") || "Wybierz kategorię"} />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="it" className="dark:text-gray-200">IT</SelectItem>
                              <SelectItem value="office" className="dark:text-gray-200">Biuro i administracja</SelectItem>
                              <SelectItem value="sales" className="dark:text-gray-200">Sprzedaż</SelectItem>
                              <SelectItem value="customer_service" className="dark:text-gray-200">Obsługa klienta</SelectItem>
                              <SelectItem value="finances" className="dark:text-gray-200">Finanse i bankowość</SelectItem>
                              <SelectItem value="engineering" className="dark:text-gray-200">Inżynieria</SelectItem>
                              <SelectItem value="production" className="dark:text-gray-200">Produkcja</SelectItem>
                              <SelectItem value="logistics" className="dark:text-gray-200">Transport i logistyka</SelectItem>
                              <SelectItem value="construction" className="dark:text-gray-200">Budownictwo</SelectItem>
                              <SelectItem value="medical" className="dark:text-gray-200">Służba zdrowia</SelectItem>
                              <SelectItem value="education" className="dark:text-gray-200">Edukacja</SelectItem>
                              <SelectItem value="gastronomy" className="dark:text-gray-200">Gastronomia</SelectItem>
                              <SelectItem value="tourism" className="dark:text-gray-200">Turystyka i hotelarstwo</SelectItem>
                              <SelectItem value="beauty" className="dark:text-gray-200">Uroda i fitness</SelectItem>
                              <SelectItem value="marketing" className="dark:text-gray-200">Marketing</SelectItem>
                              <SelectItem value="hr" className="dark:text-gray-200">HR</SelectItem>
                              <SelectItem value="agriculture" className="dark:text-gray-200">Rolnictwo</SelectItem>
                              <SelectItem value="other" className="dark:text-gray-200">Inne</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.job.type") || "Rodzaj zatrudnienia"}</Label>
                          <Select
                            onValueChange={(value) => handleCategoryFilterChange("employmentType", value)}
                            value={categoryFilters.employmentType || ""}
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                              <SelectValue placeholder={t("filters.selectType") || "Wybierz rodzaj"} />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="full_time" className="dark:text-gray-200">Pełny etat</SelectItem>
                              <SelectItem value="part_time" className="dark:text-gray-200">Część etatu</SelectItem>
                              <SelectItem value="contract" className="dark:text-gray-200">Umowa zlecenie</SelectItem>
                              <SelectItem value="b2b" className="dark:text-gray-200">B2B</SelectItem>
                              <SelectItem value="internship" className="dark:text-gray-200">Staż/Praktyka</SelectItem>
                              <SelectItem value="seasonal" className="dark:text-gray-200">Praca sezonowa</SelectItem>
                              <SelectItem value="replacement" className="dark:text-gray-200">Zastępstwo</SelectItem>
                              <SelectItem value="other" className="dark:text-gray-200">Inne</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.job.schedule") || "Harmonogram pracy"}</Label>
                          <Select
                            onValueChange={(value) => handleCategoryFilterChange("workSchedule", value)}
                            value={categoryFilters.workSchedule || ""}
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                              <SelectValue placeholder={t("filters.selectSchedule") || "Wybierz harmonogram"} />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="flexible" className="dark:text-gray-200">Elastyczny</SelectItem>
                              <SelectItem value="shifts" className="dark:text-gray-200">Zmianowy</SelectItem>
                              <SelectItem value="fixed" className="dark:text-gray-200">Stały</SelectItem>
                              <SelectItem value="weekends" className="dark:text-gray-200">Weekendy</SelectItem>
                              <SelectItem value="evenings" className="dark:text-gray-200">Wieczory</SelectItem>
                              <SelectItem value="nights" className="dark:text-gray-200">Noce</SelectItem>
                              <SelectItem value="other" className="dark:text-gray-200">Inny</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.job.experience") || "Poziom doświadczenia"}</Label>
                          <Select
                            onValueChange={(value) => handleCategoryFilterChange("experienceLevel", value)}
                            value={categoryFilters.experienceLevel || ""}
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                              <SelectValue placeholder={t("filters.selectExperience") || "Wybierz poziom doświadczenia"} />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="intern" className="dark:text-gray-200">Praktykant/Stażysta</SelectItem>
                              <SelectItem value="junior" className="dark:text-gray-200">Junior</SelectItem>
                              <SelectItem value="mid" className="dark:text-gray-200">Specjalista</SelectItem>
                              <SelectItem value="senior" className="dark:text-gray-200">Senior</SelectItem>
                              <SelectItem value="manager" className="dark:text-gray-200">Kierownik</SelectItem>
                              <SelectItem value="director" className="dark:text-gray-200">Dyrektor</SelectItem>
                              <SelectItem value="entry" className="dark:text-gray-200">Bez doświadczenia</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.job.education") || "Poziom wykształcenia"}</Label>
                          <Select
                            onValueChange={(value) => handleCategoryFilterChange("educationLevel", value)}
                            value={categoryFilters.educationLevel || ""}
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                              <SelectValue placeholder={t("filters.selectEducation") || "Wybierz poziom wykształcenia"} />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="primary" className="dark:text-gray-200">Podstawowe</SelectItem>
                              <SelectItem value="secondary" className="dark:text-gray-200">Średnie</SelectItem>
                              <SelectItem value="vocational" className="dark:text-gray-200">Zawodowe</SelectItem>
                              <SelectItem value="bachelor" className="dark:text-gray-200">Licencjat/Inżynier</SelectItem>
                              <SelectItem value="master" className="dark:text-gray-200">Magister</SelectItem>
                              <SelectItem value="phd" className="dark:text-gray-200">Doktorat</SelectItem>
                              <SelectItem value="none" className="dark:text-gray-200">Bez wymagań</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.job.salary") || "Przedział wynagrodzenia"}</Label>
                          <Input
                            type="text"
                            placeholder="np. 5000-7000 PLN brutto/mies."
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 mt-1"
                            value={categoryFilters.salaryRange || ""}
                            onChange={(e) => handleCategoryFilterChange("salaryRange", e.target.value)}
                          />
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">Dodatkowe informacje</Label>
                          <div className="space-y-2 mt-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="job-remote" 
                                checked={categoryFilters.remote === true}
                                onCheckedChange={(checked) => handleCategoryFilterChange("remote", checked === true)}
                              />
                              <Label htmlFor="job-remote" className="dark:text-gray-200">
                                {t("filters.job.remote") || "Praca zdalna"}
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="job-benefits-medical" 
                                checked={categoryFilters.medicalBenefits === true}
                                onCheckedChange={(checked) => handleCategoryFilterChange("medicalBenefits", checked === true)}
                              />
                              <Label htmlFor="job-benefits-medical" className="dark:text-gray-200">
                                Opieka medyczna
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="job-benefits-sports" 
                                checked={categoryFilters.sportsBenefits === true}
                                onCheckedChange={(checked) => handleCategoryFilterChange("sportsBenefits", checked === true)}
                              />
                              <Label htmlFor="job-benefits-sports" className="dark:text-gray-200">
                                Karta sportowa
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="job-benefits-training" 
                                checked={categoryFilters.trainingBenefits === true}
                                onCheckedChange={(checked) => handleCategoryFilterChange("trainingBenefits", checked === true)}
                              />
                              <Label htmlFor="job-benefits-training" className="dark:text-gray-200">
                                Szkolenia i rozwój
                              </Label>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-4 border-b pb-2 dark:text-white">{t("createAd.form.details") || "Szczegóły ogłoszenia"}</h2>
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-gray-800 dark:text-white font-medium">{t("createAd.form.description")}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t("createAd.form.description.placeholder")}
                    className="min-h-[200px] dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-sm text-gray-500 dark:text-gray-400">
                  {t("createAd.form.description.desc")}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="budgetRange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-800 dark:text-white font-medium">{t("createAd.form.budgetRange")}</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="np. 500-1000 zł" 
                      {...field} 
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" 
                    />
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500 dark:text-gray-400">
                    {t("createAd.form.budgetRange.desc")}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-800 dark:text-white font-medium">{t("createAd.form.location")}</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={t("createAd.form.location.placeholder")} 
                      {...field} 
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" 
                    />
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500 dark:text-gray-400">
                    {t("createAd.form.location.desc")}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <Button 
            type="submit" 
            className="w-full md:w-auto min-w-[200px] bg-red-600 hover:bg-red-700 text-white px-8 py-2 text-lg" 
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                {t("common.loading")}
              </div>
            ) : (
              t("createAd.form.submit")
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}