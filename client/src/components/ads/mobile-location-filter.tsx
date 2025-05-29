import React from 'react';
import { MapPin } from 'lucide-react';
import { Input } from "@/components/ui/input";

interface MobileLocationFilterProps {
  value: string | null;
  onChange: (location: string | null) => void;
}

export default function MobileLocationFilter({ value, onChange }: MobileLocationFilterProps) {
  const [inputValue, setInputValue] = React.useState(value || "");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue || null);
  };

  return (
    <div className="relative border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
      <MapPin 
        size={16} 
        className="absolute left-3 top-3 text-gray-500 dark:text-gray-400" 
      />
      <Input 
        placeholder="Wpisz lokalizację" 
        value={inputValue}
        onChange={handleInputChange}
        className="pl-10 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-gray-800 dark:text-gray-200"
      />
    </div>
  );
}