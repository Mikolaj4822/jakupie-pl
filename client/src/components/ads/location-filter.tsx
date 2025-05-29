import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface LocationFilterProps {
  value: string | null;
  onChange: (location: string | null) => void;
  expanded?: boolean;
}

const VOIVODESHIPS = [
  "Dolnośląskie", "Kujawsko-pomorskie", "Lubelskie", "Lubuskie", 
  "Łódzkie", "Małopolskie", "Mazowieckie", "Opolskie", 
  "Podkarpackie", "Podlaskie", "Pomorskie", "Śląskie", 
  "Świętokrzyskie", "Warmińsko-mazurskie", "Wielkopolskie", "Zachodniopomorskie"
];

const POPULAR_CITIES = [
  "Warszawa", "Kraków", "Łódź", "Wrocław", "Poznań", "Gdańsk", 
  "Szczecin", "Bydgoszcz", "Lublin", "Białystok", "Katowice", 
  "Gdynia", "Częstochowa", "Radom", "Sosnowiec", "Toruń", 
  "Kielce", "Rzeszów", "Gliwice", "Zabrze", "Olsztyn", "Bielsko-Biała",
  "Bytom", "Zielona Góra", "Rybnik", "Ruda Śląska", "Opole", "Tychy",
  "Gorzów Wielkopolski", "Elbląg", "Płock", "Dąbrowa Górnicza", "Wałbrzych"
];

export default function LocationFilter({ value, onChange, expanded = false }: LocationFilterProps) {
  const [inputValue, setInputValue] = useState(value || "");
  
  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    onChange(inputValue || null);
  };

  const handleLocationSelect = (location: string) => {
    setInputValue(location);
    onChange(location);
  };

  return (
    <div className="space-y-4">
      <div className="relative border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
        <MapPin 
          size={16} 
          className="absolute left-3 top-3 text-gray-500 dark:text-gray-400" 
        />
        <Input 
          placeholder="Wpisz lokalizację" 
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          className="pl-10 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-gray-800 dark:text-gray-200"
        />
      </div>
      
      <div className="space-y-4">
        <div>
          <Badge 
            variant="secondary"
            className="mb-3 cursor-pointer bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
            onClick={() => handleLocationSelect("Cała Polska")}
          >
            Cała Polska
          </Badge>
          
          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
            Województwa:
          </h4>
          <div className="flex flex-wrap gap-2">
            {VOIVODESHIPS.map(region => (
              <Badge 
                key={region}
                variant="outline" 
                className={`cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  inputValue === region ? 'bg-primary/10 border-primary/30 text-primary dark:bg-primary/20' : ''
                }`}
                onClick={() => handleLocationSelect(region)}
              >
                {region}
              </Badge>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
            Popularne miasta:
          </h4>
          <div className="flex flex-wrap gap-2">
            {POPULAR_CITIES.map(city => (
              <Badge 
                key={city}
                variant="outline" 
                className={`cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  inputValue === city ? 'bg-primary/10 border-primary/30 text-primary dark:bg-primary/20' : ''
                }`}
                onClick={() => handleLocationSelect(city)}
              >
                {city}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}