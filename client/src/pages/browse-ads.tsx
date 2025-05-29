import React, { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { Ad, Category } from "@shared/schema";
import AdCard from "@/components/ads/ad-card";
import AdFilters, { FilterOptions } from "@/components/ads/ad-filters-enhanced";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Autocomplete } from "@/components/ui/autocomplete";
import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { subDays, startOfDay, parseISO, isAfter } from "date-fns";

export default function BrowseAds() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [currentSearch, setCurrentSearch] = useState("");
  const [sortOption, setSortOption] = useState<string>("newest");
  
  // Get search param and category from URL if available
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    
    // Obsługa parametru wyszukiwania
    const searchParam = params.get('search');
    if (searchParam) {
      setSearchTerm(searchParam);
      setCurrentSearch(searchParam);
    }
    
    // Obsługa parametru kategorii
    const categoryParam = params.get('category');
    if (categoryParam) {
      const categoryId = parseInt(categoryParam);
      setSelectedCategory(categoryId);
      setFilters(prev => ({ ...prev, category: categoryId }));
    }
  }, []);

  const [filters, setFilters] = useState<FilterOptions>({
    category: null,
    minPrice: null,
    maxPrice: null,
    location: null,
    datePosted: null,
    sortBy: "newest"
  });

  // Fetch categories
  const { data: categories, isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  // Build query params for filtering
  const getQueryParams = () => {
    const params = new URLSearchParams();
    
    if (currentSearch) {
      params.append("search", currentSearch);
    }
    
    if (selectedCategory) {
      params.append("categoryId", selectedCategory.toString());
    }
    
    if (filters.minPrice !== null) {
      params.append("minBudget", filters.minPrice.toString());
    }
    
    if (filters.maxPrice !== null) {
      params.append("maxBudget", filters.maxPrice.toString());
    }
    
    if (filters.location) {
      params.append("location", filters.location);
    }
    
    params.append("status", "active");
    
    return params.toString();
  };

  // Fetch ads with filters
  const { 
    data: ads, 
    isLoading: adsLoading, 
    isError,
    refetch 
  } = useQuery<Ad[]>({
    queryKey: [`/api/ads?${getQueryParams()}`],
  });

  // Filter and sort ads client-side for advanced filtering
  const filteredAndSortedAds = useMemo(() => {
    if (!ads) return [];
    
    let filteredAds = [...ads];
    
    // Date filter (client-side)
    if (filters.datePosted) {
      const now = new Date();
      let dateLimit: Date;
      
      switch (filters.datePosted) {
        case 'today':
          dateLimit = startOfDay(now);
          break;
        case 'yesterday':
          dateLimit = startOfDay(subDays(now, 1));
          break;
        case 'lastWeek':
          dateLimit = startOfDay(subDays(now, 7));
          break;
        case 'lastMonth':
          dateLimit = startOfDay(subDays(now, 30));
          break;
        default:
          dateLimit = new Date(0); // beginning of time
      }
      
      filteredAds = filteredAds.filter(ad => {
        const adDate = parseISO(ad.createdAt.toString());
        return isAfter(adDate, dateLimit);
      });
    }
    
    // Sort the results
    switch (filters.sortBy) {
      case 'newest':
        filteredAds.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'oldest':
        filteredAds.sort((a, b) => 
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case 'price_low':
        filteredAds.sort((a, b) => {
          // Ekstrahujemy liczbowe wartości z pola budgetRange lub używamy 0 jako wartości domyślnej
          const getBudgetValue = (budgetRange: string | null): number => {
            if (!budgetRange) return 0;
            // Próba wyciągnięcia pierwszej liczby z zakresu budżetu
            const match = budgetRange.match(/\d+/);
            return match ? parseInt(match[0]) : 0;
          };
          return getBudgetValue(a.budgetRange) - getBudgetValue(b.budgetRange);
        });
        break;
      case 'price_high':
        filteredAds.sort((a, b) => {
          // Ekstrahujemy liczbowe wartości z pola budgetRange lub używamy 0 jako wartości domyślnej
          const getBudgetValue = (budgetRange: string | null): number => {
            if (!budgetRange) return 0;
            // Próba wyciągnięcia pierwszej liczby z zakresu budżetu
            const match = budgetRange.match(/\d+/);
            return match ? parseInt(match[0]) : 0;
          };
          return getBudgetValue(b.budgetRange) - getBudgetValue(a.budgetRange);
        });
        break;
    }
    
    return filteredAds;
  }, [ads, filters]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentSearch(searchTerm);
    refetch();
  };

  const handleCategoryChange = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    setFilters(prev => ({ ...prev, category: categoryId }));
    refetch();
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    // Nie zmieniamy kategorii podczas zmiany filtrów specyficznych
    // Zachowaj aktualną kategorię
    const updatedFilters = {
      ...newFilters,
      category: selectedCategory
    };
    
    setFilters(updatedFilters);
    refetch();
  };

  const handleSortChange = (sortOption: string) => {
    setSortOption(sortOption);
    setFilters(prev => ({ ...prev, sortBy: sortOption }));
  };

  const loading = categoriesLoading || adsLoading;

  return (
    <>
      <Helmet>
        <title>{t("browse.title")} - {t("app.name")}</title>
        <meta name="description" content={t("browse.subtitle")} />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t("browse.title")}</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">{t("browse.subtitle")}</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-8">
          <div className="mb-4">
            <Autocomplete 
              value={searchTerm}
              onChange={setSearchTerm}
              onSearch={(value) => {
                setCurrentSearch(value);
                refetch();
              }}
              placeholder={t("browse.search")}
              className="w-full"
            />
          </div>

          {categories && (
            <AdFilters 
              categories={categories} 
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              onFilterChange={handleFilterChange}
              onSortChange={handleSortChange}
              currentFilters={filters}
            />
          )}
        </div>
        
        {/* Results display */}
        {loading ? (
          <div className="flex justify-center items-center py-20 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : isError ? (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <p className="text-red-500">{t("errors.loading")}</p>
          </div>
        ) : filteredAndSortedAds.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAndSortedAds.map((ad) => (
              <AdCard key={ad.id} ad={ad} categories={categories || []} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">{t("browse.noResults")}</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">{t("browse.noResults.desc")}</p>
          </div>
        )}
      </div>
    </>
  );
}
