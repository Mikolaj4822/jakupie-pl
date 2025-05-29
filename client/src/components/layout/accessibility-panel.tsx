import React, { useState, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/hooks/use-language';
import { 
  Accessibility, 
  Type, 
  ZoomIn, 
  Contrast,
  EyeOff,
  MousePointerClick
} from 'lucide-react';

// Hook dla ustawień dostępności
function useAccessibilitySettings() {
  // Domyślne wartości
  const defaultSettings = {
    fontSize: 100, // procentowy rozmiar czcionki (100% = normalna)
    simplifiedInterface: false, // uproszczony interfejs
    animations: true, // włączone animacje
    cursorSize: 100, // rozmiar kursora
    // Usunięto kontrast, ponieważ powodował problemy
  };

  // Odczyt zapisanych ustawień z localStorage
  const loadSettings = () => {
    try {
      const saved = localStorage.getItem('accessibilitySettings');
      return saved ? JSON.parse(saved) : defaultSettings;
    } catch (e) {
      console.error('Błąd odczytu ustawień dostępności:', e);
      return defaultSettings;
    }
  };

  const [settings, setSettings] = useState(defaultSettings);

  // Inicjalizacja ustawień przy pierwszym załadowaniu
  useEffect(() => {
    setSettings(loadSettings());
  }, []);

  // Aktualizacja ustawień i zapisanie do localStorage
  const updateSettings = (newSettings: Partial<typeof defaultSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    localStorage.setItem('accessibilitySettings', JSON.stringify(updatedSettings));
    applyAccessibilitySettings(updatedSettings);
  };

  // Zastosowanie ustawień do dokumentu
  const applyAccessibilitySettings = (currentSettings: typeof defaultSettings) => {
    // Rozmiar czcionki
    document.documentElement.style.fontSize = `${currentSettings.fontSize}%`;
    
    // Usunięto kod do obsługi kontrastu, ponieważ powodował problemy
    
    // Animacje
    if (!currentSettings.animations) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }
    
    // Uproszczony interfejs
    if (currentSettings.simplifiedInterface) {
      document.documentElement.classList.add('simplified-ui');
    } else {
      document.documentElement.classList.remove('simplified-ui');
    }
    
    // Rozmiar kursora
    const customCursorStyle = document.getElementById('custom-cursor-style') || 
                            document.createElement('style');
    customCursorStyle.id = 'custom-cursor-style';
    
    if (currentSettings.cursorSize > 100) {
      const scale = currentSettings.cursorSize / 100;
      customCursorStyle.textContent = `
        * {
          cursor: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='${24 * scale}' height='${24 * scale}' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2'><path d='m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z'/></svg>") 0 0, auto !important;
        }
        a, button, input, select, [role="button"] {
          cursor: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='${24 * scale}' height='${24 * scale}' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2'><path d='M6 9l6 6 6-6'/></svg>") 0 0, pointer !important;
        }
      `;
      if (!document.head.contains(customCursorStyle)) {
        document.head.appendChild(customCursorStyle);
      }
    } else {
      customCursorStyle.textContent = '';
    }
  };

  // Zastosuj ustawienia przy każdej zmianie
  useEffect(() => {
    applyAccessibilitySettings(settings);
  }, [settings]);

  return { 
    settings, 
    updateSettings, 
    resetSettings: () => updateSettings(defaultSettings) 
  };
}

const AccessibilityPanel = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const { settings, updateSettings, resetSettings } = useAccessibilitySettings();

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full w-16 h-16 bg-primary text-white hover:bg-primary/90 shadow-lg border-2 border-white/20"
          aria-label={t("accessibility.toggle") || "Ustawienia dostępności"}
        >
          <Accessibility className="h-8 w-8" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" side="left">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">{t("accessibility.title") || "Dostępność"}</h3>
            <Button variant="ghost" size="sm" onClick={resetSettings}>
              {t("accessibility.reset") || "Reset"}
            </Button>
          </div>
          
          <div className="space-y-4">
            {/* Rozmiar czcionki */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Type className="h-4 w-4" />
                <Label>{t("accessibility.fontSize") || "Rozmiar czcionki"}</Label>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm">A</span>
                <Slider
                  value={[settings.fontSize]}
                  min={75}
                  max={150}
                  step={5}
                  onValueChange={(value) => updateSettings({ fontSize: value[0] })}
                  className="flex-1"
                />
                <span className="text-lg font-bold">A</span>
              </div>
              <div className="mt-1 text-xs text-blue-500 font-medium">{settings.fontSize}%</div>
            </div>
            
            {/* Rozmiar kursora */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MousePointerClick className="h-4 w-4" />
                <Label>{t("accessibility.cursorSize") || "Rozmiar kursora"}</Label>
              </div>
              <div className="flex items-center gap-4">
                <ZoomIn className="h-4 w-4" />
                <Slider
                  value={[settings.cursorSize]}
                  min={100}
                  max={200}
                  step={10}
                  onValueChange={(value) => updateSettings({ cursorSize: value[0] })}
                  className="flex-1"
                />
                <ZoomIn className="h-6 w-6" />
              </div>
              <span className="text-xs text-gray-500">{settings.cursorSize}%</span>
            </div>
            
            {/* Usunięto opcję wysokiego kontrastu, ponieważ powodowała problemy */}
            
            {/* Ograniczone animacje */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <EyeOff className="h-4 w-4" />
                <Label htmlFor="reduced-motion">{t("accessibility.animations") || "Animacje"}</Label>
              </div>
              <Switch
                id="reduced-motion"
                checked={settings.animations}
                onCheckedChange={(checked) => updateSettings({ animations: checked })}
              />
            </div>
            
            {/* Uproszczony interfejs */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Contrast className="h-4 w-4" />
                <Label htmlFor="simplified-ui">{t("accessibility.simplified") || "Uproszczony interfejs"}</Label>
              </div>
              <Switch
                id="simplified-ui"
                checked={settings.simplifiedInterface}
                onCheckedChange={(checked) => updateSettings({ simplifiedInterface: checked })}
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AccessibilityPanel;