import { useState, useEffect } from "react";
import { Category } from "@shared/schema";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { Checkbox } from "@/components/ui/checkbox";
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="dark:text-white">{t("createAd.form.title")}</FormLabel>
              <FormControl>
                <Input placeholder={t("createAd.form.title.placeholder")} {...field} className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" />
              </FormControl>
              <FormDescription className="dark:text-gray-400">
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
            <FormItem>
              <FormLabel className="dark:text-white">{t("createAd.form.category")}</FormLabel>
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
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-4 dark:text-white flex items-center">
              <span className="bg-red-500 w-2 h-6 rounded mr-2"></span>
              {t("filters.categorySpecific")}
            </h3>
            
            <Accordion type="single" defaultValue="filtry-kategorii" collapsible className="w-full">
              <AccordionItem value="filtry-kategorii">
                <AccordionTrigger className="font-medium text-gray-900 dark:text-white">
                  Pokaż filtry dla tej kategorii
                </AccordionTrigger>
                <AccordionContent>
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
                <AccordionItem value="motoryzacja">
                  <AccordionTrigger className="dark:text-white">
                    {t("filters.vehicleDetails") || "Szczegóły pojazdu"}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
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
                  </AccordionContent>
                </AccordionItem>
              )}
              
              {selectedCategoryId === 3 && ( // Nieruchomości
                <AccordionItem value="nieruchomosci">
                  <AccordionTrigger className="dark:text-white">
                    {t("filters.propertyDetails") || "Szczegóły nieruchomości"}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
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
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
          </div>
        )}

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="dark:text-white">{t("createAd.form.description")}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("createAd.form.description.placeholder")}
                  className="min-h-[200px] dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                  {...field}
                />
              </FormControl>
              <FormDescription className="dark:text-gray-400">
                {t("createAd.form.description.desc")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="budgetRange"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="dark:text-white">{t("createAd.form.budgetRange")}</FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 dark:text-gray-200">zł</span>
                  <Input
                    type="text"
                    placeholder=""
                    className="pl-7 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                    {...field}
                    value={field.value || ""}
                  />
                </div>
              </FormControl>
              <FormDescription className="dark:text-gray-400">
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
              <FormLabel className="dark:text-white">{t("createAd.form.location")}</FormLabel>
              <FormControl>
                <Input placeholder={t("createAd.form.location.placeholder")} {...field} className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" />
              </FormControl>
              <FormDescription className="dark:text-gray-400">
                {t("createAd.form.location.desc")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading} className="bg-slate-700 hover:bg-slate-800">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("createAd.form.submitting")}
              </>
            ) : (
              t("createAd.form.submit")
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
