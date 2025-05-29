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

export default function CategorySection() {
  const { t } = useLanguage();
  const [visibleCategories, setVisibleCategories] = useState<number>(0);
  const categoryContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [initialScrollLeft, setInitialScrollLeft] = useState(0);
  
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

  // Obsługa przeciągania kategorii (swipe)
  const onMouseDown = (e: React.MouseEvent) => {
    if (!categoryContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - categoryContainerRef.current.offsetLeft);
    setInitialScrollLeft(categoryContainerRef.current.scrollLeft);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !categoryContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - categoryContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    categoryContainerRef.current.scrollLeft = initialScrollLeft - walk;
  };

  const handleScrollLeft = () => {
    if (!categoryContainerRef.current) return;
    categoryContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const handleScrollRight = () => {
    if (!categoryContainerRef.current) return;
    categoryContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
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
              {t("categories.title")}
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
                onClick={handleScrollLeft}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white dark:bg-gray-800 rounded-full shadow-lg p-2 hidden md:flex items-center justify-center"
                aria-label="Przewiń w lewo"
              >
                <ChevronLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleScrollRight}
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
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onMouseMove={onMouseMove}
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
                          {renderCategoryIcon(category.icon)}
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
      return <>
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 22V8a4 4 0 0 1 4-4h4a4 4 0 0 1 0 8H4a4 4 0 0 0 0 8h16" />
      </>;
    case "music":
      return <>
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </>;
    case "wrench":
      return <>
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z" />
      </>;
    default:
      return <>
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z" />
      </>;
  }
}
