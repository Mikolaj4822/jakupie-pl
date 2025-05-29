import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Ad, Category } from "@shared/schema";
import { Loader2, ChevronLeft, ChevronRight, Filter, ArrowUpDown, ArrowRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdCard from "@/components/ads/ad-card";
import { useLanguage } from "@/hooks/use-language";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Profesjonalny komponent dla sliderów - podobny do tego na Allegro
const AdCarousel = ({ ads, categories }: { ads: Ad[], categories: Category[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  const itemsPerView = isMobile ? 1 : (ads.length < 3 ? ads.length : 3);
  const totalSets = Math.max(1, Math.ceil(ads.length / itemsPerView));
  
  const goToNext = () => {
    if (currentIndex < totalSets - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Loop back to the beginning for better UX
      setDirection(1);
      setCurrentIndex(0);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    } else {
      // Loop to the end for better UX
      setDirection(-1);
      setCurrentIndex(totalSets - 1);
    }
  };

  // Automatyczne przesuwanie karuzeli co 5 sekund
  useEffect(() => {
    const timer = setTimeout(() => {
      goToNext();
    }, 5000);
    
    return () => {
      clearTimeout(timer);
    };
  }, [currentIndex]);

  // Indykatory nawigacji (kropki)
  const Indicators = () => (
    <div className="flex justify-center mt-4 space-x-2">
      {Array.from({ length: totalSets }).map((_, idx) => (
        <button
          key={`indicator-${idx}`}
          onClick={() => {
            setDirection(idx > currentIndex ? 1 : -1);
            setCurrentIndex(idx);
          }}
          className={cn(
            "w-2 h-2 rounded-full transition-all duration-300",
            idx === currentIndex 
              ? "bg-red-500 w-4" 
              : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
          )}
          aria-label={`Przejdź do zestawu ${idx + 1}`}
        />
      ))}
    </div>
  );

  const startIdx = currentIndex * itemsPerView;
  const visibleAds = ads.slice(startIdx, startIdx + itemsPerView);

  return (
    <div className="relative">
      <div 
        ref={carouselRef}
        className="overflow-hidden"
      >
        <AnimatePresence initial={false} mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ 
              opacity: 0, 
              x: direction > 0 ? 300 : -300 
            }}
            animate={{ 
              opacity: 1, 
              x: 0,
              transition: { 
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }
            }}
            exit={{ 
              opacity: 0, 
              x: direction > 0 ? -300 : 300,
              transition: { 
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {visibleAds.map((ad) => (
              <motion.div
                key={ad.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -5 }}
              >
                <AdCard ad={ad} categories={categories} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Przyciski nawigacji - widoczne tylko gdy są potrzebne */}
      {totalSets > 1 && (
        <>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 shadow-md rounded-full p-2 z-10 flex items-center justify-center"
            aria-label="Poprzednie ogłoszenia"
          >
            <ChevronLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white dark:bg-gray-800 shadow-md rounded-full p-2 z-10 flex items-center justify-center"
            aria-label="Następne ogłoszenia"
          >
            <ChevronRight className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          </motion.button>
        </>
      )}
      
      {totalSets > 1 && <Indicators />}
    </div>
  );
};

export default function FeaturedAdsSection() {
  const [showFilter, setShowFilter] = useState(false);
  const { t } = useLanguage();

  // Fetch featured (active) ads
  const { data: ads, isLoading: adsLoading, isError: adsError } = useQuery<Ad[]>({
    queryKey: ["/api/ads?status=active"],
  });

  // Fetch categories for display
  const { data: categories, isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const isLoading = adsLoading || categoriesLoading;

  // Animowane elementy ładowania szkieletowego - bardziej profesjonalne UI
  const SkeletonLoader = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md">
          <div className="animate-pulse">
            <div className="h-48 bg-gray-200 dark:bg-gray-700" />
            <div className="p-4">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2" />
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded mt-4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-center mb-10"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">
            Wyróżnione ogłoszenia
            <span className="block text-sm font-normal text-gray-500 dark:text-gray-400 mt-1">
              Najnowsze ogłoszenia na JaKupię.pl
            </span>
          </h2>
          <div className="flex space-x-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="outline" 
                onClick={() => setShowFilter(!showFilter)}
                className="flex items-center"
              >
                <Filter className="h-4 w-4 mr-2" /> Filtruj
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="outline" className="flex items-center">
                <ArrowUpDown className="h-4 w-4 mr-2" /> Sortuj
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Obszar z ogłoszeniami */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {isLoading ? (
            <SkeletonLoader />
          ) : adsError || !ads ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-10 text-center shadow-md"
            >
              <p className="text-red-500 font-medium">{t("errors.loading")}</p>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Spróbuj odświeżyć stronę</p>
            </motion.div>
          ) : ads.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-10 text-center shadow-md"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Brak wyróżnionych ogłoszeń</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2 mb-6">Bądź pierwszym, który doda ogłoszenie</p>
              <Link href="/create-ad">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-red-600 hover:bg-red-700">
                    <Plus className="h-4 w-4 mr-2" /> Dodaj ogłoszenie
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          ) : (
            <AdCarousel ads={ads} categories={categories || []} />
          )}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link href="/browse">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" className="inline-flex items-center font-medium px-6 py-3 border-2">
                {t("featured.seeAll")}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
