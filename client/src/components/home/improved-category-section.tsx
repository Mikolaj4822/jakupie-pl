import { useQuery } from "@tanstack/react-query";
import { Category } from "@shared/schema";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/hooks/use-language";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Define a type that can be either a Category from the API or our default category
type DisplayCategory = Category | {
  id?: number;
  name: string;
  icon: string;
  color: string;
};

export default function ImprovedCategorySection() {
  const { t } = useLanguage();
  const [visibleCategories, setVisibleCategories] = useState<number>(0);
  const categoryContainerRef = useRef<HTMLDivElement>(null);
  
  const { data: categories, isLoading, isError } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  // Default categories to show while loading
  const defaultCategories: DisplayCategory[] = [
    { name: "Electronics", icon: "cpu", color: "indigo" },
    { name: "Clothing", icon: "shopping-bag", color: "blue" },
    { name: "Furniture", icon: "sofa", color: "green" },
    { name: "Vehicles", icon: "car", color: "yellow" },
    { name: "Health", icon: "paw-print", color: "red" },
    { name: "Sports", icon: "trophy", color: "purple" },
    { name: "Hobby", icon: "music", color: "pink" },
    { name: "Services", icon: "wrench", color: "orange" },
  ];

  // Sprawdź, ile kategorii możemy wyświetlić w jednym rzędzie
  useEffect(() => {
    const updateVisibleCategories = () => {
      const width = window.innerWidth;
      if (width < 640) setVisibleCategories(2); // mobile
      else if (width < 768) setVisibleCategories(3); // tablet
      else if (width < 1024) setVisibleCategories(4); // small desktop
      else setVisibleCategories(6); // large desktop
    };

    updateVisibleCategories();
    window.addEventListener('resize', updateVisibleCategories);
    return () => window.removeEventListener('resize', updateVisibleCategories);
  }, []);

  // Funkcje do obsługi nawigacji
  const scrollLeft = () => {
    if (categoryContainerRef.current) {
      categoryContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (categoryContainerRef.current) {
      categoryContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  // Animowane elementy ładowania szkieletowego
  const SkeletonLoader = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow"
        >
          <div className="animate-pulse">
            <Skeleton className="h-16 w-16 rounded-full mx-auto mb-4" />
            <Skeleton className="h-5 w-24 mx-auto" />
          </div>
        </motion.div>
      ))}
    </div>
  );

  // Get translated category name
  const getCategoryTranslation = (name: string) => {
    const key = `categories.${name.toLowerCase()}`;
    // Check if we have a translation for this category, otherwise return original name
    return t(key) === key ? name : t(key);
  };

  // Render loading state
  if (isLoading) {
    return (
      <section className="py-16 bg-white dark:bg-background">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h2 className="text-3xl font-bold mb-2 text-center text-gray-900 dark:text-white">
              Przeglądaj według kategorii
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-center max-w-2xl mx-auto">
              Przeglądaj ogłoszenia według kategorii
            </p>
          </motion.div>
          <SkeletonLoader />
        </div>
      </section>
    );
  }

  // Show error state
  if (isError || !categories) {
    return (
      <section className="py-16 bg-white dark:bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">{t("categories.title")}</h2>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center max-w-lg mx-auto shadow-md"
          >
            <p className="text-red-500 font-medium">Nie udało się załadować kategorii</p>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Spróbuj odświeżyć stronę</p>
          </motion.div>
        </div>
      </section>
    );
  }

  // Use the fetched categories or fall back to defaults
  const displayCategories = categories.length > 0 ? categories : defaultCategories;
  
  // Liczba widocznych elementów i potrzeba strzałek nawigacyjnych
  const totalCategories = displayCategories.length;
  const needsNavigation = totalCategories > visibleCategories;

  return (
    <section className="py-16 bg-white dark:bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="text-3xl font-bold mb-2 text-center text-gray-900 dark:text-white">
            {t("categories.title")}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-center max-w-2xl mx-auto">
            Przeglądaj ogłoszenia według kategorii
          </p>
        </motion.div>

        <div className="relative">
          {needsNavigation && (
            <>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white dark:bg-gray-800 rounded-full shadow-lg p-2 hidden md:flex items-center justify-center"
                aria-label="Przewiń w lewo"
              >
                <ChevronLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={scrollRight}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white dark:bg-gray-800 rounded-full shadow-lg p-2 hidden md:flex items-center justify-center"
                aria-label="Przewiń w prawo"
              >
                <ChevronRight className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </motion.button>
            </>
          )}
          
          <div 
            ref={categoryContainerRef}
            className={cn(
              "overflow-x-auto pb-4 scrollbar-hide",
              needsNavigation ? "md:overflow-hidden" : ""
            )}
          >
            <div className={cn(
              "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4",
              needsNavigation ? "md:flex md:space-x-4" : ""
            )}>
              {displayCategories.map((category, index) => (
                <motion.div
                  key={category.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className={needsNavigation ? "flex-shrink-0 md:w-[180px]" : ""}
                >
                  <Link href={`/browse?category=${category.id || index + 1}`}>
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition-all cursor-pointer h-full flex flex-col items-center justify-center border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-5 bg-gradient-to-br 
                        ${getCategoryGradient(category.color)}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                          {
                            (() => {
                              const nameLower = category.name.toLowerCase();
                              if (nameLower.includes("elektron")) return renderCategoryIcon("cpu");
                              if (nameLower.includes("motoryz")) return renderCategoryIcon("car");
                              if (nameLower.includes("dom") || nameLower.includes("ogród")) return renderCategoryIcon("sofa");
                              if (nameLower.includes("nieruchom")) return renderCategoryIcon("building");
                              if (nameLower.includes("mod")) return renderCategoryIcon("shirt");
                              if (nameLower.includes("zwierz")) return renderCategoryIcon("paw-print");
                              if (nameLower.includes("zdrow") || nameLower.includes("urod")) return renderCategoryIcon("heart-pulse");
                              if (nameLower.includes("sport") || nameLower.includes("hobb")) return renderCategoryIcon("dumbbell");
                              if (nameLower.includes("firma") || nameLower.includes("przemys")) return renderCategoryIcon("factory");
                              if (nameLower.includes("anty") || nameLower.includes("kolek")) return renderCategoryIcon("landmark");
                              if (nameLower.includes("usług")) return renderCategoryIcon("tool");
                              if (nameLower.includes("wypożycz")) return renderCategoryIcon("timer");
                              if (nameLower.includes("oddam") || nameLower.includes("darm")) return renderCategoryIcon("gift");
                              if (nameLower.includes("nocleg")) return renderCategoryIcon("bed");
                              if (nameLower.includes("dziec")) return renderCategoryIcon("baby");
                              if (nameLower.includes("rolnic")) return renderCategoryIcon("wheat");
                              if (nameLower.includes("prac")) return renderCategoryIcon("briefcase");
                              if (nameLower.includes("muzyk") || nameLower.includes("eduka")) return renderCategoryIcon("music");
                              return renderCategoryIcon(category.icon);
                            })()
                          }
                        </svg>
                      </div>
                      <h3 className="font-medium text-gray-800 dark:text-gray-200 text-lg">
                        {getCategoryTranslation(category.name)}
                      </h3>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 text-center"
        >
          <Link href="/browse">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center text-red-600 dark:text-red-400 font-medium hover:text-red-700 dark:hover:text-red-300 transition-colors"
            >
              {t("categories.viewAll")} <ArrowRight className="ml-2 h-4 w-4" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// Helper do wybierania gradientu koloru
function getCategoryGradient(color: string): string {
  const gradients: Record<string, string> = {
    'indigo': 'from-indigo-500 to-indigo-600 text-white',
    'blue': 'from-blue-500 to-blue-600 text-white',
    'green': 'from-green-500 to-green-600 text-white',
    'yellow': 'from-amber-500 to-amber-600 text-white',
    'red': 'from-red-500 to-red-600 text-white',
    'purple': 'from-purple-500 to-purple-600 text-white',
    'pink': 'from-pink-500 to-pink-600 text-white',
    'orange': 'from-orange-500 to-orange-600 text-white',
  };
  
  return gradients[color] || 'from-gray-500 to-gray-600 text-white';
}

// Helper do renderowania ikon kategorii
function renderCategoryIcon(icon: string): JSX.Element {
  switch (icon) {
    case "cpu":
      return <>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <path d="M15 2v2" /><path d="M15 20v2" />
        <path d="M2 15h2" /><path d="M20 15h2" />
        <path d="M9 2v2" /><path d="M9 20v2" />
        <path d="M2 9h2" /><path d="M20 9h2" />
      </>;
    case "car":
      return <>
        <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2" />
        <circle cx="6.5" cy="16.5" r="2.5" />
        <circle cx="16.5" cy="16.5" r="2.5" />
      </>;
    case "sofa":
      return <>
        <path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3" />
        <path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0Z" />
      </>;
    case "shopping-bag":
    case "shirt":
      return <>
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </>;
    case "paw-print":
      return <>
        <circle cx="11" cy="4" r="2" />
        <circle cx="18" cy="8" r="2" />
        <circle cx="4" cy="8" r="2" />
        <circle cx="7.5" cy="13" r="2" />
        <circle cx="14.5" cy="13" r="2" />
        <path d="M11 14a5 5 0 0 0-3.5 5.5 3.5 3.5 0 0 0 7 0A5 5 0 0 0 11 14Z" />
      </>;
    case "trophy":
    case "dumbbell":
      return <>
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 22V8a4 4 0 0 1 4-4h4a4 4 0 0 1 0 8H4a4 4 0 0 0 0 8h16" />
      </>;
    case "music":
    case "music-4":
      return <>
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </>;
    case "wrench":
    case "tool":
      return <>
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z" />
      </>;
    case "building":
      return <>
        <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
        <path d="M9 22v-4h6v4" />
        <path d="M8 6h.01" />
        <path d="M16 6h.01" />
        <path d="M8 10h.01" />
        <path d="M16 10h.01" />
        <path d="M8 14h.01" />
        <path d="M16 14h.01" />
      </>;
    case "wheat":
      return <>
        <path d="M2 22 16 8" />
        <path d="M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" />
        <path d="M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" />
        <path d="M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" />
        <path d="M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z" />
        <path d="M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z" />
        <path d="M15.47 13.47 17 15l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z" />
        <path d="M19.47 9.47 21 11l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L13 11l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z" />
      </>;
    case "baby":
      return <>
        <path d="M9 12h.01" />
        <path d="M15 12h.01" />
        <path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5" />
        <path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1" />
      </>;
    case "factory":
      return <>
        <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
        <path d="M17 18h1" />
        <path d="M12 18h1" />
        <path d="M7 18h1" />
      </>;
    case "landmark":
      return <>
        <line x1="3" x2="21" y1="22" y2="22" />
        <line x1="6" x2="6" y1="18" y2="11" />
        <line x1="10" x2="10" y1="18" y2="11" />
        <line x1="14" x2="14" y1="18" y2="11" />
        <line x1="18" x2="18" y1="18" y2="11" />
        <polygon points="12 2 20 7 4 7" />
      </>;
    case "heart-pulse":
      return <>
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        <path d="M3.22 12H9.5l.5-1 2 4 .5-1h6.78" />
      </>;
    case "timer":
      return <>
        <line x1="10" x2="14" y1="2" y2="2" />
        <line x1="12" x2="15" y1="14" y2="11" />
        <circle cx="12" cy="14" r="8" />
      </>;
    case "gift":
      return <>
        <polyline points="20 12 20 22 4 22 4 12" />
        <rect width="20" height="5" x="2" y="7" />
        <line x1="12" x2="12" y1="22" y2="7" />
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
      </>;
    case "bed":
      return <>
        <path d="M2 4v16" />
        <path d="M22 4v16" />
        <path d="M2 8h20" />
        <path d="M2 16h20" />
        <path d="M12 4v4" />
        <path d="M12 12v4" />
        <path d="M12 20v-4" />
        <path d="M6 8v4" />
        <path d="M6 16v4" />
        <path d="M18 8v4" />
        <path d="M18 16v4" />
      </>;
    case "briefcase":
      return <>
        <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </>;
    default:
      // Domyślna ikona dla nieznanego typu
      return <>
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z" />
      </>;
  }
}

// Funkcja do renderowania ikon kategorii na podstawie nazwy
function renderCategoryIconByName(name: string, icon: string): JSX.Element {
  const svgProps = {
    xmlns: "http://www.w3.org/2000/svg",
    width: "28",
    height: "28",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "text-white"
  };

  // Mapowanie nazw kategorii na odpowiednie ikony
  let iconPath: JSX.Element;
  const nameLower = name.toLowerCase();

  if (nameLower.includes("elektron")) {
    iconPath = (
      <g>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <path d="M15 2v2" /><path d="M15 20v2" />
        <path d="M2 15h2" /><path d="M20 15h2" />
        <path d="M9 2v2" /><path d="M9 20v2" />
        <path d="M2 9h2" /><path d="M20 9h2" />
      </g>
    );
  } else if (nameLower.includes("motoryz")) {
    iconPath = (
      <g>
        <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2" />
        <circle cx="6.5" cy="16.5" r="2.5" />
        <circle cx="16.5" cy="16.5" r="2.5" />
      </g>
    );
  } else if (nameLower.includes("dom") || nameLower.includes("ogród")) {
    iconPath = (
      <g>
        <path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3" />
        <path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0Z" />
      </g>
    );
  } else if (nameLower.includes("nieruchom")) {
    iconPath = (
      <g>
        <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
        <path d="M9 22v-4h6v4" />
        <path d="M8 6h.01" />
        <path d="M16 6h.01" />
        <path d="M8 10h.01" />
        <path d="M16 10h.01" />
        <path d="M8 14h.01" />
        <path d="M16 14h.01" />
      </g>
    );
  } else if (nameLower.includes("mod")) {
    iconPath = (
      <g>
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </g>
    );
  } else if (nameLower.includes("zwierz")) {
    iconPath = (
      <g>
        <circle cx="11" cy="4" r="2" />
        <circle cx="18" cy="8" r="2" />
        <circle cx="4" cy="8" r="2" />
        <circle cx="7.5" cy="13" r="2" />
        <circle cx="14.5" cy="13" r="2" />
        <path d="M11 14a5 5 0 0 0-3.5 5.5 3.5 3.5 0 0 0 7 0A5 5 0 0 0 11 14Z" />
      </g>
    );
  } else if (nameLower.includes("zdrow") || nameLower.includes("urod")) {
    iconPath = (
      <g>
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        <path d="M3.22 12H9.5l.5-1 2 4 .5-1h6.78" />
      </g>
    );
  } else if (nameLower.includes("sport") || nameLower.includes("hobb")) {
    iconPath = (
      <g>
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 22V8a4 4 0 0 1 4-4h4a4 4 0 0 1 0 8H4a4 4 0 0 0 0 8h16" />
      </g>
    );
  } else if (nameLower.includes("firma") || nameLower.includes("przemys")) {
    iconPath = (
      <g>
        <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
        <path d="M17 18h1" />
        <path d="M12 18h1" />
        <path d="M7 18h1" />
      </g>
    );
  } else if (nameLower.includes("anty") || nameLower.includes("kolek")) {
    iconPath = (
      <g>
        <line x1="3" x2="21" y1="22" y2="22" />
        <line x1="6" x2="6" y1="18" y2="11" />
        <line x1="10" x2="10" y1="18" y2="11" />
        <line x1="14" x2="14" y1="18" y2="11" />
        <line x1="18" x2="18" y1="18" y2="11" />
        <polygon points="12 2 20 7 4 7" />
      </g>
    );
  } else if (nameLower.includes("usług")) {
    iconPath = (
      <g>
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z" />
      </g>
    );
  } else if (nameLower.includes("wypożycz")) {
    iconPath = (
      <g>
        <line x1="10" x2="14" y1="2" y2="2" />
        <line x1="12" x2="15" y1="14" y2="11" />
        <circle cx="12" cy="14" r="8" />
      </g>
    );
  } else if (nameLower.includes("oddam") || nameLower.includes("darm")) {
    iconPath = (
      <g>
        <polyline points="20 12 20 22 4 22 4 12" />
        <rect width="20" height="5" x="2" y="7" />
        <line x1="12" x2="12" y1="22" y2="7" />
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
      </g>
    );
  } else if (nameLower.includes("nocleg")) {
    iconPath = (
      <g>
        <path d="M2 4v16" />
        <path d="M22 4v16" />
        <path d="M2 8h20" />
        <path d="M2 16h20" />
        <path d="M12 4v4" />
        <path d="M12 12v4" />
        <path d="M12 20v-4" />
        <path d="M6 8v4" />
        <path d="M6 16v4" />
        <path d="M18 8v4" />
        <path d="M18 16v4" />
      </g>
    );
  } else if (nameLower.includes("dziec")) {
    iconPath = (
      <g>
        <path d="M9 12h.01" />
        <path d="M15 12h.01" />
        <path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5" />
        <path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1" />
      </g>
    );
  } else if (nameLower.includes("rolnic")) {
    iconPath = (
      <g>
        <path d="M2 22 16 8" />
        <path d="M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" />
        <path d="M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" />
        <path d="M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" />
        <path d="M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z" />
      </g>
    );
  } else if (nameLower.includes("prac")) {
    iconPath = (
      <g>
        <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </g>
    );
  } else if (nameLower.includes("muzyk") || nameLower.includes("eduka")) {
    iconPath = (
      <g>
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </g>
    );
  } else {
    // Jeśli nie znaleziono dopasowania, użyj ikony z parametru funkcji
    return <svg {...svgProps}>{renderCategoryIcon(icon)}</svg>;
  }

  return <svg {...svgProps}>{iconPath}</svg>;
}