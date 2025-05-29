import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/hooks/use-language";
import { Loader2, ArrowRight, Search, PlusCircle, ShoppingCart } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Komponenty animacji tła
const BackgroundAnimations = () => {
  // Bardziej widoczne, atrakcyjne kolory dla animacji
  const circles = [
    { size: 180, x: "10%", y: "20%", duration: 20, delay: 0, color: "rgba(255, 255, 255, 0.15)", scale: [0.8, 1.1, 0.9, 1] },
    { size: 120, x: "70%", y: "15%", duration: 25, delay: 2, color: "rgba(255, 220, 220, 0.12)", scale: [1, 1.2, 0.95, 1] },
    { size: 200, x: "80%", y: "60%", duration: 28, delay: 1, color: "rgba(255, 200, 200, 0.15)", scale: [0.9, 1.15, 0.85, 1] },
    { size: 150, x: "20%", y: "70%", duration: 22, delay: 3, color: "rgba(255, 255, 255, 0.1)", scale: [1.1, 0.85, 1.05, 1] },
    { size: 100, x: "50%", y: "30%", duration: 18, delay: 0.5, color: "rgba(255, 230, 230, 0.18)", scale: [0.95, 1.1, 0.9, 1] },
    { size: 80, x: "30%", y: "25%", duration: 24, delay: 1.5, color: "rgba(255, 255, 255, 0.14)", scale: [1, 1.15, 0.9, 1] },
    { size: 160, x: "75%", y: "40%", duration: 26, delay: 2.5, color: "rgba(255, 210, 210, 0.12)", scale: [0.85, 1.1, 0.95, 1] },
    { size: 130, x: "40%", y: "65%", duration: 23, delay: 3.5, color: "rgba(255, 245, 245, 0.16)", scale: [1.05, 0.9, 1.1, 1] },
    { size: 190, x: "15%", y: "45%", duration: 27, delay: 1.2, color: "rgba(255, 235, 235, 0.13)", scale: [0.9, 1.2, 0.95, 1] },
    { size: 110, x: "60%", y: "80%", duration: 29, delay: 0.7, color: "rgba(255, 255, 255, 0.12)", scale: [1, 0.85, 1.15, 1] },
    { size: 140, x: "25%", y: "10%", duration: 21, delay: 2.2, color: "rgba(255, 220, 220, 0.14)", scale: [0.95, 1.1, 0.85, 1] },
    { size: 95, x: "5%", y: "30%", duration: 25, delay: 0.2, color: "rgba(255, 230, 230, 0.15)", scale: [1.1, 0.9, 1.05, 1] },
    { size: 120, x: "90%", y: "25%", duration: 19, delay: 1.6, color: "rgba(255, 255, 255, 0.13)", scale: [0.8, 1.15, 0.95, 1] },
  ];

  return (
    <>
      {circles.map((circle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full backdrop-blur-md"
          style={{
            width: circle.size,
            height: circle.size,
            backgroundColor: circle.color,
            top: circle.y,
            left: circle.x,
            boxShadow: "0 0 40px 5px rgba(255, 255, 255, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.1)"
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: circle.scale,
            opacity: [0.5, 0.8, 0.6, 0.7],
            x: [0, 30, -30, 0],
            y: [0, -40, 20, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            delay: circle.delay,
            duration: circle.duration, 
            repeat: Infinity, 
            repeatType: "mirror",
            ease: "easeInOut" 
          }}
        />
      ))}
    </>
  );
};

export default function HeroSection() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [, navigate] = useLocation();
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Fetch suggestions when search term changes
  const {
    data: suggestions = [],
    isLoading: suggestionsLoading
  } = useQuery({
    queryKey: ["/api/search/suggestions", searchQuery],
    queryFn: async () => {
      if (!searchQuery || searchQuery.length < 2) {
        return [];
      }
      const response = await fetch(`/api/search/suggestions?q=${encodeURIComponent(searchQuery)}`);
      return await response.json();
    },
    enabled: searchQuery.length >= 2,
  });

  // Click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        suggestionRef.current && 
        !suggestionRef.current.contains(e.target as Node) &&
        inputRef.current && 
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  const searchTexts = [
    "laptopa",
    "telefonu",
    "rower",
    "meble",
    "samochód",
    "sprzęt AGD"
  ];

  // Efekt dla animowanej zmiany tekstu
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % searchTexts.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[80vh] overflow-hidden bg-[#e43b44] dark:bg-[#1a1b26]">
      {/* Jednolite czerwone tło - polski akcent, bardziej stonowany (z obsługą ciemnego motywu) */}
      
      {/* Dodatkowy element tła dla ciemnego motywu */}
      <div className="hidden dark:block absolute inset-0 bg-gradient-to-b from-[#1e1f2e]/80 to-[#1a1b26]/95"></div>
      
      {/* Animowane elementy tła */}
      <BackgroundAnimations />
      
      {/* Główna zawartość */}
      <div className="container relative z-10 mx-auto px-4 py-24 md:py-32 flex flex-col items-center justify-center h-full">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center max-w-4xl mx-auto px-4 text-white mb-6 leading-tight"
        >
          Znajdź dokładnie to, czego szukasz
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="text-xl md:text-2xl text-center max-w-2xl mx-auto mb-10 text-white/90 font-medium"
        >
          Opublikuj, co chcesz kupić, a sprzedawcy przyjdą do Ciebie
        </motion.p>
        
        {/* Wyszukiwarka jak na zdjęciu */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full max-w-xl mx-auto mb-16"
        >
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              navigate(`/browse?search=${encodeURIComponent(searchQuery)}`);
            }}
            className="relative flex rounded-lg overflow-hidden shadow-xl"
          >
            <div className="flex items-center flex-grow bg-white">
              <div className="text-gray-400 ml-4 mr-2">
                <Search size={20} />
              </div>
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value.length >= 2) {
                    setShowSuggestions(true);
                  } else {
                    setShowSuggestions(false);
                  }
                }}
                onFocus={() => {
                  if (searchQuery.length >= 2) {
                    setShowSuggestions(true);
                  }
                }}
                placeholder={`Szukam ${searchTexts[currentTextIndex]}`}
                className="flex-1 border-none py-3 px-2 text-base focus:outline-none focus:ring-0 placeholder-gray-400 h-14"
              />
              <motion.button
                whileHover={{ backgroundColor: "#c01538" }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="bg-[#d81e47] dark:bg-[#232537] text-white w-14 h-14 flex items-center justify-center transition-colors"
                aria-label="Szukaj"
              >
                <ArrowRight size={20} />
              </motion.button>
            </div>
            
            {/* Suggestions dropdown */}
            {showSuggestions && searchQuery.length >= 2 && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                ref={suggestionRef}
                className="absolute z-10 top-full mt-2 max-h-60 w-full overflow-auto rounded-md bg-white/10 backdrop-blur-md py-1 text-base shadow-lg ring-1 ring-white/20 focus:outline-none"
              >
                {suggestionsLoading ? (
                  <div className="flex items-center justify-center py-3 text-gray-200 space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>{t("common.loading")}</span>
                  </div>
                ) : suggestions.length === 0 ? (
                  <div className="px-4 py-3 text-gray-300">
                    {t("browse.noSuggestions")}
                  </div>
                ) : (
                  <div>
                    {suggestions.map((suggestion: string, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                        onClick={() => {
                          setSearchQuery(suggestion);
                          setShowSuggestions(false);
                          navigate(`/browse?search=${encodeURIComponent(suggestion)}`);
                        }}
                        className="cursor-pointer select-none px-4 py-2 hover:bg-white/20 text-white"
                      >
                        {suggestion}
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </form>
        </motion.div>
        
        {/* Dwa boxy zgodne ze stylem na obrazku */}
        <div className="flex flex-col sm:flex-row gap-8 w-full max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex-1"
          >
            <Link href={user ? "/create-ad" : "/auth?tab=register"} className="block w-full">
              <motion.div 
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                className="w-full p-8 bg-white dark:bg-slate-800 rounded-lg shadow-md text-center transition-all"
              >
                <div className="flex justify-center mb-6">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center"
                  >
                    <PlusCircle size={24} className="text-red-500 dark:text-red-400" />
                  </motion.div>
                </div>
                <h3 className="text-gray-800 dark:text-white text-lg font-medium mb-2">Dodaj ogłoszenie</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Powiedz nam, czego potrzebujesz</p>
              </motion.div>
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex-1"
          >
            <Link href="/browse" className="block w-full">
              <motion.div 
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                className="w-full p-8 bg-white dark:bg-slate-800 rounded-lg shadow-md text-center transition-all"
              >
                <div className="flex justify-center mb-6">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center"
                  >
                    <Search size={24} className="text-red-500 dark:text-red-400" />
                  </motion.div>
                </div>
                <h3 className="text-gray-800 dark:text-white text-lg font-medium mb-2">Przeglądaj ogłoszenia</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Znajdź to, czego inni potrzebują</p>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
