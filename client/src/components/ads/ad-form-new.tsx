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
                          <Label className="dark:text-white">{t("filters.brand") || "Marka"}</Label>
                          <Select
                            onValueChange={(value) => handleCategoryFilterChange("brand", value)}
                            value={categoryFilters.brand || ""}
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                              <SelectValue placeholder={t("filters.selectBrand") || "Wybierz markę"} />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="apple" className="dark:text-gray-200">Apple</SelectItem>
                              <SelectItem value="samsung" className="dark:text-gray-200">Samsung</SelectItem>
                              <SelectItem value="xiaomi" className="dark:text-gray-200">Xiaomi</SelectItem>
                              <SelectItem value="huawei" className="dark:text-gray-200">Huawei</SelectItem>
                              <SelectItem value="lenovo" className="dark:text-gray-200">Lenovo</SelectItem>
                              <SelectItem value="asus" className="dark:text-gray-200">Asus</SelectItem>
                              <SelectItem value="dell" className="dark:text-gray-200">Dell</SelectItem>
                              <SelectItem value="hp" className="dark:text-gray-200">HP</SelectItem>
                              <SelectItem value="inne" className="dark:text-gray-200">Inne</SelectItem>
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
                              <RadioGroupItem value="new" id="condition-new" />
                              <Label htmlFor="condition-new" className="dark:text-gray-200">
                                {t("filters.condition.new") || "Nowy"}
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
                          </RadioGroup>
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
                    
                    {selectedCategoryId === 8 && ( // Dla Dzieci
                      <div className="space-y-4 border-l-2 border-red-500 pl-4 py-2">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">{t("filters.kids.title") || "Szczegóły dla kategorii Dzieci"}</h4>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.kids.type") || "Typ"}</Label>
                          <Select
                            onValueChange={(value) => handleCategoryFilterChange("type", value)}
                            value={categoryFilters.type || ""}
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                              <SelectValue placeholder={t("filters.selectType") || "Wybierz typ"} />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="toy" className="dark:text-gray-200">Zabawki</SelectItem>
                              <SelectItem value="clothes" className="dark:text-gray-200">Ubrania</SelectItem>
                              <SelectItem value="furniture" className="dark:text-gray-200">Meble</SelectItem>
                              <SelectItem value="stroller" className="dark:text-gray-200">Wózki</SelectItem>
                              <SelectItem value="other" className="dark:text-gray-200">Inne</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label className="dark:text-white">{t("filters.kids.ageGroup") || "Grupa wiekowa"}</Label>
                          <Select
                            onValueChange={(value) => handleCategoryFilterChange("ageGroup", value)}
                            value={categoryFilters.ageGroup || ""}
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                              <SelectValue placeholder={t("filters.all") || "Wszystkie"} />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="0-2" className="dark:text-gray-200">0-2 lata</SelectItem>
                              <SelectItem value="3-5" className="dark:text-gray-200">3-5 lat</SelectItem>
                              <SelectItem value="6-9" className="dark:text-gray-200">6-9 lat</SelectItem>
                              <SelectItem value="10+" className="dark:text-gray-200">10+ lat</SelectItem>
                            </SelectContent>
                          </Select>
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