import React, { useState, useEffect, useRef, forwardRef } from "react";
import { X, Search, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/hooks/use-language";
import { cn } from "@/lib/utils";
import { Input } from "./input";
import { Button } from "./button";

// Simple debounce hook implementation inline to avoid module import issues
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

interface AutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  minLength?: number;
}

export function Autocomplete({
  value,
  onChange,
  onSearch,
  placeholder = "Search...",
  className,
  inputClassName,
  minLength = 2
}: AutocompleteProps) {
  const { t } = useLanguage();
  const inputRef = useRef<HTMLInputElement>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [cursor, setCursor] = useState(-1);
  const debouncedSearchTerm = useDebounce(value, 300);
  const suggestionRef = useRef<HTMLUListElement>(null);

  // Fetch suggestions when search term changes and meets min length
  const {
    data: suggestions = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ["/api/search/suggestions", debouncedSearchTerm],
    queryFn: async () => {
      if (!debouncedSearchTerm || debouncedSearchTerm.length < minLength) {
        return [];
      }
      const response = await fetch(`/api/search/suggestions?q=${encodeURIComponent(debouncedSearchTerm)}`);
      return await response.json();
    },
    enabled: debouncedSearchTerm.length >= minLength,
  });

  // Clear input handler
  const handleClear = () => {
    onChange("");
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(value);
    setShowSuggestions(false);
  };

  // Show suggestions when input is focused
  const handleFocus = () => {
    if (value.length >= minLength) {
      setShowSuggestions(true);
    }
  };

  // Click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        inputRef.current && 
        !inputRef.current.contains(e.target as Node) &&
        suggestionRef.current && 
        !suggestionRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Down arrow
    if (e.key === "ArrowDown") {
      if (suggestions.length > 0) {
        setCursor(prev => (prev < suggestions.length - 1 ? prev + 1 : prev));
      }
      e.preventDefault();
    }
    // Up arrow
    else if (e.key === "ArrowUp") {
      setCursor(prev => (prev > 0 ? prev - 1 : 0));
      e.preventDefault();
    }
    // Enter key
    else if (e.key === "Enter" && cursor >= 0 && suggestions[cursor]) {
      onChange(suggestions[cursor]);
      setShowSuggestions(false);
      setCursor(-1);
      e.preventDefault();
    }
    // Escape key
    else if (e.key === "Escape") {
      setShowSuggestions(false);
      setCursor(-1);
    }
  };

  // Click handler for suggestion
  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    setShowSuggestions(false);
    setCursor(-1);
    onSearch(suggestion);
  };

  // Reset cursor when suggestions change
  useEffect(() => {
    setCursor(-1);
  }, [suggestions]);

  return (
    <div className={cn("relative w-full", className)}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex w-full items-center">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-primary dark:text-primary-foreground" />
          <Input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              if (e.target.value.length >= minLength) {
                setShowSuggestions(true);
              } else {
                setShowSuggestions(false);
              }
            }}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={cn(
              "pl-10 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100",
              "focus:ring-2 focus:ring-primary/20 focus:border-primary",
              inputClassName
            )}
          />
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Button type="submit" className="absolute right-0 sm:static sm:mt-2 hidden sm:block dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white">
          {t("browse.searchButton")}
        </Button>
      </form>

      {/* Suggestions dropdown */}
      {showSuggestions && (
        <ul
          ref={suggestionRef}
          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white dark:bg-gray-800 py-2 text-base shadow-xl border-2 border-primary/20 focus:outline-none sm:text-sm"
        >
          {isLoading ? (
            <li className="flex items-center justify-center py-3 text-gray-500 dark:text-gray-400">
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              {t("common.loading")}
            </li>
          ) : error ? (
            <li className="px-4 py-3 text-red-500 dark:text-red-400">
              {t("errors.loading")}
            </li>
          ) : suggestions.length === 0 ? (
            <li className="px-4 py-3 text-gray-600 dark:text-gray-300 font-medium">
              {t("browse.noSuggestions")}
            </li>
          ) : (
            suggestions.map((suggestion: string, index: number) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className={cn(
                  "cursor-pointer select-none px-4 py-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 font-medium",
                  cursor === index ? "bg-blue-50 dark:bg-blue-900/20" : ""
                )}
              >
                {suggestion}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}