import { z } from "zod";

// Typy filtrów dla poszczególnych kategorii

// Standardowy filtr występujący w wielu kategoriach
export const commonFilterSchema = z.object({
  condition: z.enum(["new", "used", "damaged"]).optional(),
  deliveryOptions: z.array(z.enum(["shipping", "pickup", "meeting"])).optional(),
  sellerType: z.enum(["private", "business"]).optional(),
});

// Filtry dla kategorii Motoryzacja
export const motoryzacjaFilterSchema = z.object({
  ...commonFilterSchema.shape,
  
  // Podstawowe informacje o pojeździe
  brand: z.enum([
    // Samochody osobowe
    "alfa_romeo", "audi", "bmw", "chevrolet", "chrysler", "citroen", "dacia", "daewoo", "dodge",
    "fiat", "ford", "honda", "hyundai", "jaguar", "jeep", "kia", "land_rover", "lexus", "mazda",
    "mercedes_benz", "mini", "mitsubishi", "nissan", "opel", "peugeot", "porsche", "renault",
    "saab", "seat", "skoda", "smart", "subaru", "suzuki", "toyota", "volkswagen", "volvo",
    
    // Samochody premium
    "aston_martin", "bentley", "bugatti", "ferrari", "lamborghini", "maserati", "mclaren", "rolls_royce",
    
    // Marki polskie
    "polonez", "fso", "warszawa", "syrena", "nysa", "żuk", "tarpan", "lublin", "honker",
    
    // Motocykle
    "aprilia", "bmw_moto", "ducati", "harley_davidson", "honda", "kawasaki", "ktm", "suzuki", 
    "triumph", "yamaha", "junak", "romet", "wsm", "wfm", "shl", "zipp", "barton", "kymco",
    
    // Inne
    "other"
  ]).optional(),
  model: z.string().optional(),
  generation: z.string().optional(),
  yearFrom: z.number().optional(),
  yearTo: z.number().optional(),
  mileageFrom: z.number().optional(),
  mileageTo: z.number().optional(),
  
  // Cechy techniczne
  fuelType: z.enum([
    "petrol", "diesel", "electric", "hybrid", "hybrid_plug_in", 
    "lpg", "cng", "hydrogen", "other"
  ]).optional(),
  engineSizeFrom: z.number().optional(),
  engineSizeTo: z.number().optional(),
  horsePower: z.number().optional(),
  transmission: z.enum(["manual", "automatic", "semi_automatic"]).optional(),
  bodyType: z.enum([
    "sedan", "combi", "hatchback", "suv", "coupe", "cabriolet", 
    "van", "pickup", "minibus", "other"
  ]).optional(),
  driveType: z.enum(["fwd", "rwd", "awd", "4x4"]).optional(),
  
  // Stan i pochodzenie pojazdu
  color: z.string().optional(),
  accidentFree: z.boolean().optional(),
  firstOwner: z.boolean().optional(),
  registeredInPoland: z.boolean().optional(),
  importCountry: z.string().optional(),
  vinAvailable: z.boolean().optional(),
  serviceHistory: z.boolean().optional(),
  
  // Wyposażenie
  airConditioning: z.enum(["manual", "automatic", "none"]).optional(),
  heatedSeats: z.boolean().optional(),
  parkingSensors: z.enum(["front", "rear", "both", "none"]).optional(),
  parkingCamera: z.boolean().optional(),
  navigation: z.boolean().optional(),
  sunroof: z.boolean().optional(),
  keylessEntry: z.boolean().optional(),
  startStop: z.boolean().optional(),
  bluetooth: z.boolean().optional(),
  leatherInterior: z.boolean().optional(),
  
  // Finansowanie
  leasing: z.boolean().optional(),
  financing: z.boolean().optional(),
  vatInvoice: z.boolean().optional(),
  vatMargin: z.boolean().optional(),
});

// Filtry dla kategorii Nieruchomości
export const nieruchomosciFilterSchema = z.object({
  ...commonFilterSchema.shape,
  
  // Podstawowe informacje
  type: z.enum([
    "apartment", "house", "room", "plot", "garage", "commercial", 
    "storage", "industrial", "agricultural", "recreational", "other"
  ]).optional(),
  offerType: z.enum(["sale", "rent", "exchange"]).optional(),
  areaFrom: z.number().optional(),
  areaTo: z.number().optional(),
  pricePerM2From: z.number().optional(),
  pricePerM2To: z.number().optional(),
  
  // Deweloperzy i agencje nieruchomości
  brand: z.enum([
    // Ogólnopolskie agencje nieruchomości
    "freedom_nieruchomosci", "metrohouse", "tecnocasa", "otodom", "nieruchomosci_online", "emmerson",
    "pks_nieruchomosci", "remax", "morizon", "nportal", "krn", "nowodworski_estates", "homebroker",
    "północ_nieruchomości", "rentier", "złoty_klucz", "ataner", "bayhaus", "expert_nieruchomości",
    
    // Deweloperzy
    "atal", "dom_development", "robyg", "echo_investment", "murapol", "archicom", "develia", 
    "victoriadom", "matexi", "unidevelopment", "bouygues_immobilier", "ghelamco", "polnord", 
    "invest_komfort", "cordia", "marvipol", "okam", "ronson", "warbud", "dantex", "yareal", 
    
    // Inne
    "other"
  ]).optional(),
  
  // Cechy nieruchomości
  rooms: z.number().optional(),
  bedroomCount: z.number().optional(),
  bathroomCount: z.number().optional(),
  floor: z.number().optional(),
  totalFloors: z.number().optional(),
  buildingType: z.enum([
    "block", "tenement", "detached", "semi_detached", "apartment", 
    "loft", "studio", "row_house", "residence", "other"
  ]).optional(),
  buildYear: z.number().optional(),
  constructionStatus: z.enum([
    "ready", "in_progress", "to_renovation", "shell", "for_finishing", "other"
  ]).optional(),
  
  // Media i wyposażenie
  heatingType: z.enum([
    "municipal", "gas", "electric", "coal", "wood", "heat_pump", 
    "solar", "geothermal", "oil", "other"
  ]).optional(),
  furnished: z.boolean().optional(),
  airConditioning: z.boolean().optional(),
  internet: z.boolean().optional(),
  cableTV: z.boolean().optional(),
  homeAutomation: z.boolean().optional(),
  
  // Przestrzeń zewnętrzna i dodatkowe
  balcony: z.boolean().optional(),
  terrace: z.boolean().optional(),
  garden: z.boolean().optional(),
  garage: z.boolean().optional(),
  parkingSpaces: z.number().optional(),
  elevator: z.boolean().optional(),
  storageRoom: z.boolean().optional(),
  basement: z.boolean().optional(),
  securitySystem: z.boolean().optional(),
  
  // Otoczenie
  distanceToCenter: z.number().optional(),
  distanceToSchool: z.number().optional(),
  distanceToPublicTransport: z.number().optional(),
  distanceToShops: z.number().optional(),
  quietArea: z.boolean().optional(),
  
  // Informacje prawne
  ownership: z.enum(["full", "cooperative", "usufruct", "other"]).optional(),
  mortgage: z.boolean().optional(),
  noCommission: z.boolean().optional(),
  virtualTour: z.boolean().optional(),
});

// Filtry dla kategorii Elektronika
export const elektronikaFilterSchema = z.object({
  ...commonFilterSchema.shape,
  
  // Podstawowe informacje
  category: z.enum([
    "smartphones", "computers", "laptops", "tablets", "tvs", "monitors",
    "audio", "headphones", "cameras", "gaming", "consoles", "pc_components",
    "networking", "printers", "smart_home", "wearables", "accessories", "other"
  ]).optional(),
  
  // Marki
  brand: z.enum([
    // Marki telefonów i tabletów
    "apple", "samsung", "xiaomi", "huawei", "oppo", "vivo", "realme", "oneplus", "google", "motorola",
    "sony", "nokia", "asus", "honor", "lenovo", "lg", "alcatel", "blackberry", "nothing",
    
    // Marki komputerów i laptopów
    "dell", "hp", "acer", "msi", "toshiba", "razer", "microsoft", "fujitsu", "alienware", 
    "hyperbook", "dream_machines", "chuwi", "huawei", "mediacom", "kruger&matz",
    
    // Marki TV
    "lg", "samsung", "sony", "panasonic", "philips", "tcl", "hisense", "sharp", "toshiba", 
    "thomson", "xiaomi", "skyworth", "metz", "hitachi", "loewe", "grundig", "jvc",
    
    // Marki audio
    "bose", "sonos", "jbl", "harman_kardon", "sony", "sennheiser", "audio_technica", "denon", "pioneer",
    "yamaha", "marshall", "bang_olufsen", "bowers_wilkins", "klipsch", "polk", "skullcandy", "jabra",
    
    // Marki aparatów
    "canon", "nikon", "sony", "fujifilm", "olympus", "panasonic", "leica", "pentax", "hasselblad",
    "gopro", "dji", "insta360", "ricoh", "sigma", "tamron",
    
    // Marki konsol
    "sony", "microsoft", "nintendo", "valve", "atari", "sega",
    
    // Komponenty komputerowe
    "intel", "amd", "nvidia", "asus", "gigabyte", "msi", "asrock", "evga", "corsair", "g.skill",
    "kingston", "crucial", "western_digital", "seagate", "samsung", "thermaltake", "cooler_master",
    "nzxt", "be_quiet", "seasonic", "fractal_design", "silverstone", "xfx", "zotac", "gainward",
    "palit", "pny", "sapphire", "biostar", "powercolor",
    
    // Smart home
    "google", "amazon", "apple", "philips_hue", "ring", "nest", "arlo", "ecobee", "tp_link", "wyze",
    "eufy", "logitech", "yale", "august", "schlage", "ikea", "netatmo", "tuya", "smart_things",
    
    // Inne
    "other"
  ]).optional(),
  
  model: z.string().optional(),
  yearFrom: z.number().optional(),
  yearTo: z.number().optional(),
  priceFrom: z.number().optional(),
  priceTo: z.number().optional(),
  
  // Specyfikacje - smartfony i tablety
  screenSize: z.number().optional(),
  screenSizeFrom: z.number().optional(),
  screenSizeTo: z.number().optional(),
  screenType: z.enum(["lcd", "oled", "amoled", "retina", "ips", "other"]).optional(),
  resolution: z.enum([
    "hd", "hd_plus", "full_hd", "full_hd_plus", "2k", "qhd", "qhd_plus", "wqhd", 
    "uwqhd", "4k", "5k", "8k", "other"
  ]).optional(),
  
  processorType: z.enum([
    // Procesory mobilne
    "apple_a_series", "snapdragon", "exynos", "mediatek", "kirin", "helio", "dimensity",
    
    // Procesory PC
    "intel_core_i3", "intel_core_i5", "intel_core_i7", "intel_core_i9", 
    "intel_pentium", "intel_celeron", "intel_xeon",
    "amd_ryzen_3", "amd_ryzen_5", "amd_ryzen_7", "amd_ryzen_9", 
    "amd_athlon", "amd_threadripper", "amd_epyc", 
    
    // Inne
    "other"
  ]).optional(),
  processorSpeed: z.number().optional(),
  processorCores: z.number().optional(),
  
  // Pamięć i przechowywanie
  ram: z.number().optional(),
  ramType: z.enum(["ddr3", "ddr4", "ddr5", "lpddr4", "lpddr4x", "lpddr5", "other"]).optional(),
  storageSize: z.number().optional(),
  storageType: z.enum(["hdd", "ssd", "nvme", "emmc", "ufs", "flash", "hybrid", "other"]).optional(),
  expandableStorage: z.boolean().optional(),
  
  // System operacyjny
  os: z.enum([
    "android", "ios", "ipados", "windows_10", "windows_11", "macos", "linux", "chrome_os", 
    "fire_os", "ubuntu", "debian", "fedora", "other"
  ]).optional(),
  osVersion: z.string().optional(),
  
  // Aparaty i kamery (smartfony, tablety, aparaty)
  mainCameraMP: z.number().optional(),
  frontCameraMP: z.number().optional(),
  cameraFeatures: z.array(z.enum([
    "optical_image_stabilization", "night_mode", "portrait_mode", "slow_motion",
    "time_lapse", "hdr", "panorama", "4k_video", "8k_video", "macro", "wide_angle",
    "telephoto", "dual_camera", "triple_camera", "quad_camera", "other"
  ])).optional(),
  
  // Specyfikacje TV i monitorów
  refreshRate: z.enum(["60hz", "75hz", "90hz", "120hz", "144hz", "165hz", "240hz", "other"]).optional(),
  hdr: z.boolean().optional(),
  hdrType: z.enum(["hdr10", "hdr10_plus", "dolby_vision", "hlg", "other"]).optional(),
  smartTv: z.boolean().optional(),
  tvOS: z.enum(["android_tv", "webos", "tizen", "roku", "fire_tv", "google_tv", "other"]).optional(),
  
  // Specyfikacje audio
  audioType: z.enum([
    "headphones", "earbuds", "speakers", "soundbars", "amplifiers", "receivers", 
    "turntables", "microphones", "other"
  ]).optional(),
  headphoneType: z.enum(["over_ear", "on_ear", "in_ear", "true_wireless", "other"]).optional(),
  wirelessTechnology: z.enum(["bluetooth", "wifi", "ir", "rf", "nfc", "other"]).optional(),
  
  // Komponenty komputerowe
  componentType: z.enum([
    "cpu", "gpu", "motherboard", "ram", "storage", "psu", "case", "cooling", 
    "sound_card", "network_card", "other"
  ]).optional(),
  cpuSocket: z.enum([
    "lga1700", "lga1200", "lga1151", "am4", "am5", "tr4", "strx4", "other"
  ]).optional(),
  gpuChipset: z.enum([
    "nvidia_rtx_4000", "nvidia_rtx_3000", "nvidia_rtx_2000", "nvidia_gtx_1000",
    "amd_rx_7000", "amd_rx_6000", "amd_rx_5000", "intel_arc", "other"
  ]).optional(),
  motherboardFormat: z.enum(["atx", "micro_atx", "mini_itx", "e_atx", "other"]).optional(),
  
  // Konsole i gaming
  consoleType: z.enum([
    "playstation_5", "playstation_4", "xbox_series_x", "xbox_series_s", "xbox_one", 
    "nintendo_switch", "nintendo_switch_lite", "steam_deck", "other"
  ]).optional(),
  
  // Łączność
  network: z.enum(["wifi", "bluetooth", "5g", "4g", "3g", "ethernet", "other"]).optional(),
  wifiVersion: z.enum(["wifi_4", "wifi_5", "wifi_6", "wifi_6e", "wifi_7", "other"]).optional(),
  bluetoothVersion: z.enum(["5.3", "5.2", "5.1", "5.0", "4.2", "4.1", "4.0", "other"]).optional(),
  usbType: z.enum(["usb_a", "usb_c", "usb_micro", "lightning", "thunderbolt", "other"]).optional(),
  
  // Akumulator i zasilanie
  batteryCapacity: z.number().optional(),
  batteryLife: z.number().optional(),
  fastCharging: z.boolean().optional(),
  wirelessCharging: z.boolean().optional(),
  
  // Funkcje i cechy dodatkowe
  waterproof: z.boolean().optional(),
  touchscreen: z.boolean().optional(),
  fingerprint: z.boolean().optional(),
  faceRecognition: z.boolean().optional(),
  stylus: z.boolean().optional(),
  keyboard: z.boolean().optional(),
  rgb: z.boolean().optional(),
  
  // Informacje o sprzedaży
  warranty: z.boolean().optional(),
  warrantyMonths: z.number().optional(),
  receipt: z.boolean().optional(),
  originalPackaging: z.boolean().optional(),
  accessories: z.boolean().optional(),
});

// Filtry dla kategorii Moda
export const modaFilterSchema = z.object({
  ...commonFilterSchema.shape,
  
  // Podstawowe informacje
  category: z.enum([
    "clothing", "shoes", "accessories", "bags", "jewelry", "watches", 
    "sports_clothing", "vintage", "designer", "kids_clothing", "other"
  ]).optional(),
  
  priceFrom: z.number().optional(),
  priceTo: z.number().optional(),
  
  // Marki
  brand: z.enum([
    // Popularne marki odzieżowe
    "adidas", "nike", "puma", "reebok", "new_balance", "under_armour", "asics",
    "tommy_hilfiger", "calvin_klein", "ralph_lauren", "lacoste", "guess", "levis",
    "wrangler", "lee", "hm", "zara", "mango", "reserved", "cropp", "house", "mohito",
    "pull_bear", "bershka", "stradivarius", "uniqlo", "gap", "massimo_dutti", "ccc",
    "deichmann", "ecco", "geox", "clarks", "vagabond", "birkenstock", "converse", "vans",
    
    // Marki luksusowe
    "gucci", "louis_vuitton", "prada", "versace", "armani", "burberry", "dior", "hermes",
    "chanel", "balenciaga", "fendi", "givenchy", "valentino", "dolce_gabbana", "michael_kors", 
    "hugo_boss", "kenzo", "montblanc", "rolex", "omega", "longines", "tissot", "seiko",
    "ray_ban", "oakley", "swarovski", "pandora", "apart",
    
    // Marki sportowe
    "the_north_face", "columbia", "patagonia", "salomon", "jack_wolfskin", 
    "timberland", "dc", "element", "volcom", "quiksilver", "roxy", "billabong", 
    "champion", "fila", "kappa", "ellesse", "carhartt", "supreme", "vans", "converse",
    
    // Inne
    "other"
  ]).optional(),
  
  // Kategorie ubrań
  clothingType: z.enum([
    // Odzież wierzchnia
    "t_shirts", "shirts", "blouses", "polo_shirts", "sweaters", "hoodies", "sweatshirts",
    "cardigans", "jackets", "coats", "vests", "blazers", "suits",
    
    // Spodnie i dolne części garderoby
    "pants", "jeans", "shorts", "skirts", "leggings", "joggers", "chinos", 
    
    // Sukienki i kombinezony
    "dresses", "evening_dresses", "casual_dresses", "jumpsuits", "overalls",
    
    // Bielizna i stroje kąpielowe
    "underwear", "socks", "swimwear", "bikinis", "swim_trunks", "sleepwear", "lingerie",
    
    // Akcesoria
    "scarves", "gloves", "hats", "caps", "belts", "ties", "bow_ties", "suspenders",
    
    // Biżuteria
    "necklaces", "earrings", "bracelets", "rings", "watches", "broaches", "cufflinks",
    
    // Torby i bagaż
    "backpacks", "handbags", "messenger_bags", "clutches", "wallets", "suitcases", "travel_bags",
    
    // Obuwie
    "sneakers", "boots", "heels", "flats", "sandals", "loafers", "oxford_shoes", "flip_flops", 
    "slippers", "espadrilles", "mules", "platforms", "wedges",
    
    // Inne
    "costumes", "uniforms", "special_occasion", "other"
  ]).optional(),
  
  // Cechy produktów
  gender: z.enum(["men", "women", "unisex", "boys", "girls", "baby"]).optional(),
  
  size: z.enum([
    // Rozmiary ogólne
    "xs", "s", "m", "l", "xl", "xxl", "xxxl", "4xl", "5xl", "6xl", "one_size",
    
    // Rozmiary numeryczne odzieży
    "30", "32", "34", "36", "38", "40", "42", "44", "46", "48", "50", "52", "54", "56", "58", "60",
    
    // Rozmiary butów
    "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50",
    
    // Rozmiary dziecięce
    "56cm", "62cm", "68cm", "74cm", "80cm", "86cm", "92cm", "98cm", "104cm", "110cm", 
    "116cm", "122cm", "128cm", "134cm", "140cm", "146cm", "152cm", "158cm", "164cm", "170cm",
    
    // Biżuteria
    "ring_size_9", "ring_size_10", "ring_size_11", "ring_size_12", "ring_size_13", 
    "ring_size_14", "ring_size_15", "ring_size_16", "ring_size_17", "ring_size_18", 
    "ring_size_19", "ring_size_20", "ring_size_21", "ring_size_22", "ring_size_23", 
    "ring_size_24", "ring_size_25", "ring_size_26", "ring_size_27", "watch_mm_28", 
    "watch_mm_30", "watch_mm_32", "watch_mm_34", "watch_mm_36", "watch_mm_38", 
    "watch_mm_40", "watch_mm_42", "watch_mm_44", "watch_mm_46",
    
    // Inne
    "other"
  ]).optional(),
  
  // Materiały i kolor
  material: z.enum([
    "cotton", "polyester", "wool", "leather", "silk", "linen", "denim", "suede", 
    "velvet", "satin", "nylon", "spandex", "cashmere", "fur", "down", "fleece", 
    "synthetic", "mesh", "canvas", "corduroy", "tweed", "viscose", "elastane", "other"
  ]).optional(),
  
  color: z.enum([
    "black", "white", "grey", "red", "blue", "navy_blue", "green", "yellow", "pink",
    "purple", "orange", "brown", "beige", "gold", "silver", "multicolor", "other"
  ]).optional(),
  
  pattern: z.enum([
    "solid", "striped", "plaid", "checkered", "floral", "polka_dot", "animal_print",
    "geometric", "camouflage", "graphic", "tie_dye", "paisley", "other"
  ]).optional(),
  
  // Sezon i styl
  season: z.enum(["spring", "summer", "fall", "winter", "all_season"]).optional(),
  
  style: z.enum([
    "casual", "formal", "business", "elegant", "sporty", "vintage", "boho", "punk", 
    "street", "ethnic", "classic", "minimalist", "preppy", "glamour", "military", "other"
  ]).optional(),
  
  // Specyficzne cechy
  sleeve: z.enum(["short", "long", "sleeveless", "three_quarter", "other"]).optional(),
  neckline: z.enum([
    "crew", "v_neck", "turtleneck", "mock_neck", "off_shoulder", "boat_neck", 
    "square_neck", "halter", "sweetheart", "asymmetric", "button_down", "other"
  ]).optional(),
  heel: z.enum(["flat", "low", "medium", "high", "platform", "wedge", "block", "stiletto", "other"]).optional(),
  fit: z.enum(["skinny", "slim", "regular", "relaxed", "loose", "oversized", "other"]).optional(),
  
  // Dodatkowe informacje
  authentic: z.boolean().optional(),
  limited: z.boolean().optional(),
  handmade: z.boolean().optional(),
  ethical: z.boolean().optional(),
  vegan: z.boolean().optional(),
  sustainable: z.boolean().optional(),
  waterproof: z.boolean().optional(),
  receipt: z.boolean().optional(),
  tags: z.boolean().optional(),
  box: z.boolean().optional(),
});

// Filtry dla kategorii Dom i Ogród
export const domOgrodFilterSchema = z.object({
  ...commonFilterSchema.shape,
  
  // Podstawowe informacje
  category: z.enum([
    "furniture", "garden", "kitchen", "bathroom", "decor", "lighting", 
    "textiles", "tools", "home_appliances", "storage", "cleaning", 
    "heating", "floor_wall", "plants", "garden_furniture", "bbq", 
    "garden_tools", "garden_decor", "garden_tech", "pets_supplies", "other"
  ]).optional(),
  
  priceFrom: z.number().optional(),
  priceTo: z.number().optional(),
  
  // Podkategorie mebli
  furnitureType: z.enum([
    // Meble do salonu
    "sofas", "armchairs", "coffee_tables", "tv_stands", "bookcases", "shelving",
    
    // Meble do jadalni
    "dining_tables", "dining_chairs", "bar_stools", "sideboards", "buffets",
    
    // Meble do sypialni
    "beds", "mattresses", "wardrobes", "dressers", "nightstands", "vanities",
    
    // Meble biurowe
    "desks", "office_chairs", "filing_cabinets", "bookcases", 
    
    // Meble do przechowywania
    "cabinets", "chests", "storage_boxes", "wall_units", "shoe_racks",
    
    // Meble kuchenne
    "kitchen_units", "kitchen_islands", "kitchen_trolleys", "dining_sets",
    
    // Meble ogrodowe
    "garden_tables", "garden_chairs", "garden_benches", "hammocks", "sun_loungers",
    
    // Inne
    "children_furniture", "antique_furniture", "custom_furniture", "other"
  ]).optional(),
  
  // Podkategorie narzędzi
  toolType: z.enum([
    // Narzędzia ręczne
    "hand_tools", "wrenches", "screwdrivers", "hammers", "pliers", "saws", "files", "chisels",
    
    // Elektronarzędzia
    "power_tools", "drills", "saws", "sanders", "grinders", "heat_guns", "nail_guns",
    
    // Narzędzia ogrodowe
    "garden_tools", "lawnmowers", "trimmers", "hedge_cutters", "leaf_blowers", "pruners",
    
    // Sprzęt budowlany
    "construction_equipment", "ladders", "scaffolding", "mixers", "wheelbarrows",
    
    // Maszyny
    "machines", "pressure_washers", "generators", "welders", "air_compressors",
    
    // Inne
    "tool_accessories", "tool_storage", "measuring_tools", "safety_equipment", "other"
  ]).optional(),
  
  // Podkategorie sprzętu AGD
  applianceType: z.enum([
    // Duże AGD
    "refrigerators", "freezers", "washing_machines", "dryers", "dishwashers", "stoves",
    "ovens", "cooktops", "range_hoods", "microwaves", "wine_coolers",
    
    // Małe AGD
    "coffee_makers", "kettles", "toasters", "blenders", "food_processors", "mixers",
    "juicers", "grills", "waffle_makers", "slow_cookers", "bread_makers", "fryers",
    "vacuum_cleaners", "irons", "humidifiers", "dehumidifiers", "heaters", "fans",
    "air_conditioners", "water_heaters", "other"
  ]).optional(),
  
  // Marki
  brand: z.enum([
    // Meble
    "ikea", "agata_meble", "black_red_white", "vox", "jysk", "castorama", "leroy_merlin", 
    "kler", "bodzio", "meble_wójcik", "swarzędz", "forte", "mebin", "vinotti", "wajnert",
    
    // Sprzęt RTV/AGD
    "bosch", "siemens", "electrolux", "aeg", "samsung", "lg", "whirlpool", "beko", "liebherr",
    "miele", "philips", "tefal", "krups", "zelmer", "dyson", "karcher", "gorenje", "amica",
    "candy", "haier", "panasonic", "sharp", "toshiba", "delonghi", "smeg", "russell_hobbs",
    
    // Narzędzia
    "makita", "dewalt", "stanley", "black_decker", "metabo", "milwaukee", "ryobi",
    "skil", "hitachi", "einhell", "stihl", "husqvarna", "gardena", "fiskars", "worx",
    
    // Inne
    "villeroy_boch", "wedgwood", "wmf", "fissler", "zwilling", "sagaform", "zara_home", 
    "h&m_home", "alessi", "joseph_joseph", "other"
  ]).optional(),
  
  // Materiały i wykończenie
  material: z.enum([
    // Drewno
    "oak", "pine", "walnut", "beech", "birch", "mahogany", "cherry", "bamboo", "plywood", "mdf",
    
    // Metale
    "steel", "aluminum", "iron", "brass", "copper", "stainless_steel", "chrome",
    
    // Tkaniny i skóry
    "fabric", "leather", "suede", "velvet", "linen", "cotton", "wool", "silk", "polyester",
    
    // Inne materiały
    "glass", "plastic", "acrylic", "marble", "granite", "stone", "ceramic", "porcelain",
    "concrete", "rattan", "wicker", "cork", "composite", "laminate", "vinyl", "other"
  ]).optional(),
  
  color: z.enum([
    "white", "black", "grey", "silver", "brown", "beige", "cream", "yellow", "orange",
    "red", "pink", "purple", "blue", "navy", "green", "turquoise", "multicolor", "natural", 
    "wood", "metallic", "transparent", "other"
  ]).optional(),
  
  // Styl i cechy
  style: z.enum([
    "modern", "contemporary", "traditional", "classic", "rustic", "country", "industrial",
    "scandinavian", "minimalist", "vintage", "retro", "art_deco", "bohemian", "coastal",
    "shabby_chic", "mid_century", "baroque", "oriental", "eclectic", "other"
  ]).optional(),
  
  // Rozmiary i wymiary
  width: z.number().optional(),
  widthFrom: z.number().optional(),
  widthTo: z.number().optional(),
  
  height: z.number().optional(),
  heightFrom: z.number().optional(),
  heightTo: z.number().optional(),
  
  depth: z.number().optional(),
  depthFrom: z.number().optional(),
  depthTo: z.number().optional(),
  
  // Specyfikacje techniczne
  powerSource: z.enum(["electric", "battery", "fuel", "gas", "manual", "solar", "other"]).optional(),
  powerWattage: z.number().optional(),
  voltage: z.number().optional(),
  energyClass: z.enum(["a+++", "a++", "a+", "a", "b", "c", "d", "e", "f", "g", "unknown"]).optional(),
  
  // Cechy dodatkowe
  waterproof: z.boolean().optional(),
  stainResistant: z.boolean().optional(),
  scratchResistant: z.boolean().optional(),
  foldable: z.boolean().optional(),
  adjustable: z.boolean().optional(),
  extendable: z.boolean().optional(),
  cordless: z.boolean().optional(),
  smart: z.boolean().optional(),
  
  // Informacje o sprzedaży
  assembly: z.boolean().optional(),
  assemblyRequired: z.boolean().optional(),
  warranty: z.boolean().optional(),
  warrantyMonths: z.number().optional(),
  setQuantity: z.number().optional(),
  instructions: z.boolean().optional(),
  boxed: z.boolean().optional(),
});

// Filtry dla kategorii Rolnictwo
export const rolnictwoFilterSchema = z.object({
  ...commonFilterSchema.shape,
  
  // Kategorie
  category: z.enum([
    "tractors", "harvesters", "attachments", "livestock", "seeds",
    "fertilizers", "tools", "other"
  ]).optional(),
  
  // Informacje o maszynach
  brand: z.enum([
    // Traktory i maszyny rolnicze
    "john_deere", "new_holland", "case_ih", "claas", "fendt", "massey_ferguson", "deutz_fahr", 
    "zetor", "ursus", "kubota", "valtra", "jcb", "steyr", "same", "pronar", "farmtrac", "lamborghini",
    "mtz_belarus", "landini", "antonio_carraro", "iseki", "tym", "kioti", "mccormick", "arbos",
    "solis", "branson", "yanmar", "versatile", "goldoni", "mahindra", "hattat", "challenger",
    
    // Kombajny
    "claas", "john_deere", "new_holland", "case_ih", "fendt", "massey_ferguson", "deutz_fahr", "bizon",
    "laverda", "rostselmash", "sampo", "vassalli", "fortschritt", "gomselmash", "dominoni", "geringhoff",
    
    // Ciągniki i maszyny specjalistyczne
    "manitou", "merlo", "bobcat", "caterpillar", "komatsu", "hitachi", "volvo_construction", 
    "liebherr", "doosan", "kramer", "weidemann", "avant", "schäffer", "thaler", "dieci",
    
    // Opryskiwacze i maszyny do ochrony roślin
    "amazone", "berthoud", "hardi", "krukowiak", "lemken", "rau", "kuhn", "tecnoma", "unia", "agrio",
    "horsch", "kverneland", "agromehanika", "jar_met", "agromasz", "pilmet", "agrola",
    
    // Sprzęt do uprawy
    "kuhn", "lemken", "kverneland", "unia", "horsch", "amazone", "pöttinger", "väderstad", 
    "grimme", "köckerling", "akpil", "agro_masz", "bomet", "expom", "mandam", "unimed",
    
    // Siewniki i rozsiewacze
    "amazone", "kuhn", "rauch", "kverneland", "lemken", "gaspardo", "sulky", "väderstad", 
    "horsch", "agro_masz", "unia", "jar_met", "akpil", "monosem", "kongskilde", "maschio",
    
    // Prasy i sprzęt do zbioru
    "krone", "claas", "john_deere", "new_holland", "case_ih", "massey_ferguson", "welger", 
    "sipma", "metal_fach", "pronar", "fendt", "kuhn", "mchale", "vicon", "pöttinger", "fella",
    
    // Przyczepy rolnicze
    "pronar", "metal_fach", "wielton", "metaltech", "zaslaw", "fliegl", "krampe", "joskin", 
    "krone", "hawe", "cynkomet", "meprozet", "stalmot", "mirosławiec", "mzuri", "inter_tech",
    
    // Ładowacze czołowe i osprzęt
    "metal_fach", "inter_tech", "hydrometal", "quicke", "mailleux", "stoll", "metal_technik",
    "alö", "hauer", "hydramet", "baselier", "lely", "rabe", "strautmann", "euroram", "trac_lift",
    
    // Inne
    "other"
  ]).optional(),
  model: z.string().optional(),
  yearFrom: z.number().optional(),
  yearTo: z.number().optional(),
  hoursFrom: z.number().optional(),
  hoursTo: z.number().optional(),
  power: z.number().optional(),
});

// Filtry dla kategorii Sport i Hobby
export const sportHobbyFilterSchema = z.object({
  ...commonFilterSchema.shape,
  
  // Kategorie
  category: z.enum([
    // Kategorie sportowe
    "team_sports", "individual_sports", "water_sports", "winter_sports", "extreme_sports", 
    "combat_sports", "fitness", "running", "cycling", "golf", "fishing", "hunting",
    // Kategorie hobby i rekreacji
    "outdoor", "camping", "hiking", "tourism", "music", "arts_crafts", "collecting", "games",
    "books", "photography", "model_making", "diy", "other"
  ]).optional(),
  
  // Podkategorie sportowe szczegółowe
  sportSubcategory: z.enum([
    // Sporty zespołowe
    "football", "soccer", "basketball", "volleyball", "handball", "rugby", "hockey", "baseball",
    "cricket", "lacrosse", "ultimate_frisbee", "water_polo", "floorball", "netball",
    
    // Sporty indywidualne
    "athletics", "swimming", "tennis", "badminton", "squash", "table_tennis", "golf", 
    "bowling", "archery", "darts", "billiards", "pool", "snooker", 
    
    // Sporty wodne
    "swimming_pool", "open_water", "diving", "sailing", "kayaking", "rafting", "surfing", 
    "windsurfing", "kitesurfing", "wakeboarding", "water_skiing", "paddleboarding",
    
    // Sporty zimowe
    "skiing", "snowboarding", "ice_skating", "ice_hockey", "sledding", "ski_touring", 
    "ski_jumping", "biathlon", "snowshoeing", "ice_climbing",
    
    // Sztuki walki i sporty siłowe
    "boxing", "mma", "bjj", "karate", "judo", "taekwondo", "wrestling", "kickboxing", 
    "muay_thai", "aikido", "fencing", "bodybuilding", "weightlifting", "powerlifting", "crossfit",
    
    // Sporty wytrzymałościowe
    "running", "marathon", "trail_running", "triathlon", "cycling", "mountain_biking", "road_cycling", 
    "gravel_cycling", "bmx", "mtb", "enduro", "downhill", 
    
    // Sporty ekstremalne
    "skateboarding", "rollerblading", "climbing", "bouldering", "parkour", "skydiving", 
    "paragliding", "bungee_jumping", "motorsports", "off_roading", "motocross", "rally",
    
    // Fitness i wellness
    "fitness_training", "yoga", "pilates", "zumba", "aerobics", "hiit", "personal_training",
    "meditation", "stretching", "calisthenics", "gym", "gymnastics",
    
    // Aktywności na świeżym powietrzu
    "hiking", "trekking", "camping", "backpacking", "rock_climbing", "mountaineering", 
    "orienteering", "geocaching", "fishing", "hunting", "birdwatching", "horseback_riding",
    
    // Inne
    "other_sports"
  ]).optional(),
  
  // Podkategorie hobby szczegółowe
  hobbySubcategory: z.enum([
    // Gry i rozrywka
    "board_games", "card_games", "video_games", "puzzles", "rpg", "miniature_games", 
    "war_games", "tabletop_games", "collectible_card_games", "chess", "bridge", "go",
    
    // Kolekcjonerstwo
    "stamps", "coins", "postcards", "figurines", "models", "toys", "cards", "comics", 
    "books", "art", "vinyl_records", "antiques", "watches", "rocks_minerals", "fossils",
    
    // Sztuka i rękodzieło
    "painting", "drawing", "sculpture", "ceramics", "pottery", "woodworking", "knitting", 
    "sewing", "quilting", "embroidery", "jewelry_making", "origami", "scrapbooking",
    
    // Muzyka i taniec
    "instruments", "singing", "djing", "composition", "dancing", "ballet", "ballroom", 
    "hip_hop", "folk_dance", "latin_dance", "performance",
    
    // Fotografia i wideo
    "photography", "landscape_photography", "portrait_photography", "wildlife_photography", 
    "macro_photography", "street_photography", "night_photography", "videography", "film_making",
    
    // Literatura i pisarstwo
    "reading", "writing", "poetry", "novel_writing", "screenwriting", "blogging", "journalism",
    
    // Modelarstwo i DIY
    "model_building", "scale_models", "rc_models", "trains", "cars", "ships", "aircraft", 
    "dioramas", "diy_electronics", "robotics", "home_improvement", "furniture_restoration",
    
    // Outdoor i turystyka
    "hiking_gear", "camping_equipment", "backpacks", "tents", "sleeping_bags", "cooking_gear", 
    "climbing_equipment", "hiking_shoes", "outdoor_clothing", "binoculars", "compasses", "maps",
    
    // Inne
    "other_hobbies"
  ]).optional(),
  
  // Informacje o sprzęcie
  brand: z.enum([
    // Sprzęt sportowy - ogólne
    "nike", "adidas", "reebok", "puma", "under_armour", "new_balance", "asics", "columbia",
    "the_north_face", "salomon", "head", "wilson", "speedo", "arena", "decathlon", "kettler",
    "mizuno", "umbro", "fila", "diadora", "lotto", "kappa", "ellesse", "spalding", "hummel",
    "macron", "joma", "erima", "jako", "craft", "4f", "saucony", "brooks", "hoka", "ona", 
    "kelme", "penalty", "mikasa", "molten", "select", "kempa", "uhlsport", "lonsdale", "everlast",
    
    // Sporty zimowe - narty i snowboard
    "atomic", "rossignol", "fischer", "salomon", "head", "blizzard", "k2", "volkl", "elan", "nordica",
    "burton", "nitro", "lib_tech", "ride", "drake", "flow", "rome", "capita", "gnu", "never_summer",
    "arbor", "jones", "bataleon", "dc", "stepchild", "roxy", "armada", "faction", "dynastar",
    "4frnt", "line", "dalbello", "lange", "tecnica", "full_tilt", "deeluxe", "northwave", "vans", 
    "thirty_two", "union", "drake", "bent_metal", "now", "spark_rd", "karakoram", "tyrolia",
    "marker", "look", "dynafit", "black_diamond", "scott", "poc", "smith", "oakley", "giro",
    
    // Rowery i sprzęt rowerowy
    "specialized", "trek", "cannondale", "giant", "merida", "kross", "cube", "scott", "kellys", 
    "ktm", "orbea", "bianchi", "unibike", "romet", "author", "ghost", "fuji", "marin", "cervelo",
    "focus", "gt", "look", "pinarello", "colnago", "ridley", "lapierre", "santa_cruz", "transition",
    "canyon", "rose", "ns_bikes", "norco", "rocky_mountain", "devinci", "yeti", "commencal",
    "liv", "felt", "haibike", "wheeler", "mondraker", "rondo", "ibis", "nukeproof", "evil", "pole",
    "muc_off", "shimano", "sram", "campagnolo", "continental", "schwalbe", "maxxis", "michelin",
    "bontrager", "mavic", "dt_swiss", "zipp", "rodi", "fulcrum", "ritchey", "selle_italia", "fizik",
    "brooks", "crankbrothers", "thule", "topeak", "elite", "tacx", "garmin", "wahoo", "cateye",
    
    // Sprzęt wędkarski
    "shimano", "daiwa", "mitchell", "okuma", "robinson", "dragon", "berkley", "mikado", "jaxon",
    "maver", "sunset", "cormoran", "spro", "trabucco", "penn", "rapala", "savage_gear", "abu_garcia",
    "dam", "balzer", "konger", "prologic", "fox", "korda", "sensas", "browning", "colmic", "tubertini",
    "gamakatsu", "owner", "guru", "preston", "dynamite_baits", "starbaits", "rod_hutchinson",
    "nash", "anaconda", "madcat", "salmo", "ryobi", "grauvell", "mepps", "blue_fox", "lucky_craft",
    "strike_pro", "yo_zuri", "westin", "savagear", "deps", "megabass", "jackson", "illex", "duel",
    
    // Instrumenty muzyczne
    "yamaha", "fender", "gibson", "ibanez", "epiphone", "korg", "roland", "casio", "tama", 
    "pearl", "zildjian", "sabian", "meinl", "shure", "sennheiser", "audio_technica", "behringer",
    "marshall", "vox", "prs", "esp", "schecter", "charvel", "jackson", "gretsch", "martin", "taylor",
    "washburn", "cort", "harley_benton", "sigma", "takamine", "ovation", "lag", "alhambra", "admira",
    "hohner", "stagg", "soundsation", "thomann", "mapex", "sonor", "premier", "dw", "ludwig", "gretsch",
    "paiste", "ufip", "istanbul", "evans", "remo", "aquarian", "vic_firth", "promark", "vater",
    "alesis", "nord", "moog", "arturia", "native_instruments", "elektron", "novation", "presonus",
    "focusrite", "m_audio", "steinberg", "universal_audio", "rode", "akg", "neumann", "beyerdynamic",
    "mackie", "jbl", "krk", "yamaha", "genelec", "adam", "focal", "dynaudio", "tannoy", "eve_audio",
    
    // Książki i wydawnictwa
    "znak", "rebis", "albatros", "prószyński", "czarna_owca", "zysk", "mag", "insignis", "agora", 
    "helion", "onepress", "sonia_draga", "amber", "muza", "hachette", "babaryba", "egmont", "nasza_księgarnia",
    "pwn", "pearson", "cambridge", "oxford", "publicat", "media_rodzina", "świat_książki", "literatura",
    "wydawnictwo_literackie", "marginesy", "sic", "wielka_litera", "wsip", "nowa_era", "operon", "macmillan",
    "penguin", "random_house", "harpercollins", "bloomsbury", "vintage", "faber", "macmillan", "springer",
    "wiley", "elsevier", "o_reilly", "packt", "manning", "apress", "scholastic", "usborne", "dk", "wordsworth",
    
    // Gry i kolekcjonerstwo
    "hasbro", "mattel", "ravensburger", "trefl", "rebel", "portal_games", "phalanx", "2_pionki", "egmont", 
    "mg", "black_monk", "galakta", "lacerta", "lucky_duck", "foxgames", "bard", "games_workshop", "kopplinger",
    "monopoly", "scrabble", "jenga", "uno", "dobble", "dixit", "carcassonne", "catan", "arkham_horror",
    "ticket_to_ride", "splendor", "pandemic", "terraforming_mars", "gloomhaven", "dungeons_dragons",
    "magic_the_gathering", "pokemon", "yu_gi_oh", "warhammer", "star_wars", "marvel", "dc_comics",
    "lego", "playmobil", "funko_pop", "hot_wheels", "matchbox", "carrera", "siku", "scalextric",
    
    // Sprzęt turystyczny i outdoor
    "petzl", "black_diamond", "mammut", "camp", "deuter", "osprey", "gregory", "lowe_alpine", "thule",
    "vaude", "highlander", "outwell", "easy_camp", "coleman", "trangia", "primus", "msr", "jetboil",
    "vango", "hannah", "husky", "yate", "fjord_nansen", "nordisk", "robens", "salewa", "ferrino",
    "jack_wolfskin", "marmot", "patagonia", "haglofs", "nortec", "lafuma", "helly_hansen", "regatta",
    "berghaus", "montane", "rab", "karrimor", "camelbak", "klean_kanteen", "nalgene", "platypus",
    
    // Inne
    "other"
  ]).optional(),
  ageGroup: z.enum(["kids", "teens", "adults", "seniors", "all"]).optional(),
  gender: z.enum(["male", "female", "unisex"]).optional(),
  skill: z.enum(["beginner", "intermediate", "advanced", "professional", "competition"]).optional(),
  
  // Rozmiary
  size: z.enum([
    // Odzież
    "xs", "s", "m", "l", "xl", "xxl", "xxxl", "other", "one_size",
    // Buty
    "eu36", "eu37", "eu38", "eu39", "eu40", "eu41", "eu42", "eu43", "eu44", "eu45", "eu46", "eu47", "eu48",
    "uk3", "uk4", "uk5", "uk6", "uk7", "uk8", "uk9", "uk10", "uk11", "uk12", "uk13",
    "us4", "us5", "us6", "us7", "us8", "us9", "us10", "us11", "us12", "us13", "us14"
  ]).optional(),
  
  // Parametry techniczne
  specifications: z.object({
    // Parametry ogólne
    weight: z.number().optional(),
    length: z.number().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
    capacity: z.number().optional(),
    
    // Parametry rowerowe
    wheelSize: z.enum([
      "12", "14", "16", "18", "20", "24", "26", "27.5", "29", "650b", "650c", "700c"
    ]).optional(),
    frameSize: z.enum([
      "xs", "s", "m", "l", "xl", "xxl", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22"
    ]).optional(),
    frameType: z.enum([
      "road", "mtb", "hybrid", "city", "trekking", "gravel", "bmx", "kids", "folding", "electric"
    ]).optional(),
    
    // Parametry narciarskie i snowboardowe
    skiLength: z.number().optional(),
    poleLength: z.number().optional(),
    boardLength: z.number().optional(),
    flex: z.enum(["soft", "medium", "stiff"]).optional(),
    camber: z.enum(["regular", "reverse", "flat", "hybrid", "rocker"]).optional(),
    
    // Parametry wędkarskie
    rodLength: z.number().optional(),
    castingWeight: z.string().optional(),
    rodPower: z.enum(["ultralight", "light", "medium", "heavy", "extra_heavy"]).optional(),
    rodAction: z.enum(["slow", "medium", "fast", "extra_fast"]).optional(),
    reelType: z.enum(["spinning", "baitcasting", "inertial", "fly", "multiplier"]).optional(),
    
    // Parametry dla sprzętu outdoorowego
    waterproof: z.boolean().optional(),
    waterproofRating: z.number().optional(),
    breathability: z.number().optional(),
    insulation: z.enum(["down", "synthetic", "fleece", "wool", "none"]).optional(),
    insulationWeight: z.number().optional(),
    temperatureRating: z.enum([
      "summer", "3_season", "winter", "extreme"
    ]).optional(),
    
    // Parametry dla sprzętu fitness
    resistance: z.enum(["light", "medium", "heavy", "variable"]).optional(),
    maxWeight: z.number().optional(),
    foldable: z.boolean().optional(),
    
    // Parametry dla gier
    playerCount: z.string().optional(),
    playingTime: z.string().optional(),
    complexity: z.enum(["easy", "medium", "hard", "expert"]).optional(),
    
    // Elektronika sportowa
    batteryLife: z.number().optional(),
    waterResistance: z.enum(["none", "splash", "water_resistant", "waterproof"]).optional(),
    gps: z.boolean().optional(),
    heartRateMonitor: z.boolean().optional(),
    bluetoothConnectivity: z.boolean().optional(),
  }).optional(),
  
  // Cechy i informacje o produkcie
  features: z.array(z.enum([
    // Cechy sprzętu sportowego
    "lightweight", "durable", "waterproof", "breathable", "moisture_wicking", "quick_dry",
    "uv_protection", "thermal", "windproof", "reflective", "adjustable", "foldable", "portable",
    "noise_reducing", "shock_absorbing", "anti_slip", "anti_bacterial", "ergonomic", "rechargeable",
    
    // Cechy techniki
    "wireless", "bluetooth", "gps_enabled", "heart_rate_monitoring", "step_counting",
    "sleep_tracking", "calorie_tracking", "distance_tracking", "altitude_tracking",
    "speed_tracking", "cadence_tracking", "power_meter", "app_compatible", "data_transfer",
    
    // Cechy dodatkowe
    "professional", "competition_grade", "training", "recreational", "beginner_friendly",
    "limited_edition", "team_edition", "signed", "commemorative"
  ])).optional(),
  
  // Stan i używanie
  condition: z.enum([
    "new", "as_new", "excellent", "very_good", "good", "acceptable", 
    "for_repair", "for_parts", "refurbished"
  ]).optional(),
  
  // Informacje o używaniu
  usageLevel: z.enum([
    "never_used", "barely_used", "lightly_used", "moderately_used", "heavily_used", 
    "competition_used", "display_only", "training_use", "recreational_use"
  ]).optional(),
  
  // Informacje handlowe
  warranty: z.boolean().optional(),
  warrantyMonths: z.number().optional(),
  originalPackaging: z.boolean().optional(),
  documentation: z.boolean().optional(),
  accessories: z.boolean().optional(),
  
  // Czasowe
  year: z.number().optional(),
  yearFrom: z.number().optional(),
  yearTo: z.number().optional(),
  season: z.enum(["spring", "summer", "autumn", "winter", "all_year"]).optional(),
  
  // Typy odbioru
  shipping: z.boolean().optional(),
  localPickup: z.boolean().optional(),
  meetInPerson: z.boolean().optional(),
});

// Filtry dla kategorii Dla Dzieci
export const dlaDzieciFilterSchema = z.object({
  ...commonFilterSchema.shape,
  
  // Kategorie
  category: z.enum([
    "clothes", "toys", "furniture", "strollers", "car_seats", "baby_carriers", 
    "feeding", "bathing", "diapers", "accessories", "school", "books", 
    "electronic_toys", "outdoor_toys", "ride_ons", "educational", "creative", "other"
  ]).optional(),
  
  // Informacje o produktach
  ageGroup: z.enum(["0-12m", "1-2y", "3-5y", "6-9y", "10-12y", "13-18y"]).optional(),
  gender: z.enum(["boy", "girl", "unisex"]).optional(),
  size: z.enum([
    "premature", "newborn", "0-3m", "3-6m", "6-9m", "9-12m", "12-18m", "18-24m",
    "2y", "3y", "4y", "5y", "6y", "7y", "8y", "9y", "10y", "11y", "12y", "13y",
    "14y", "15y", "16y", "shoes_16", "shoes_17", "shoes_18", "shoes_19", "shoes_20",
    "shoes_21", "shoes_22", "shoes_23", "shoes_24", "shoes_25", "shoes_26", "shoes_27",
    "shoes_28", "shoes_29", "shoes_30", "shoes_31", "shoes_32", "shoes_33", "shoes_34",
    "shoes_35", "shoes_36", "shoes_37", "shoes_38", "shoes_39", "shoes_40"
  ]).optional(),
  brand: z.enum([
    // Popularne marki dziecięce
    "fisher_price", "lego", "barbie", "hot_wheels", "nerf", "play_doh", "melissa_doug", "vtech",
    "chicco", "britax", "graco", "maclaren", "baby_bjorn", "diono", "mamas_papas", "cybex",
    "mothercare", "baby_design", "kidwell", "caretero", "maxi_cosi", "quinny", "joie", "kinderkraft",
    
    // Marki ubranek dziecięcych
    "coccodrillo", "5_10_15", "h&m", "reserved", "zara_kids", "gap_kids", "next", "nike_kids",
    "adidas_kids", "oshkosh", "carters", "lupilu", "pepco", "newbie", "smyk", "cool_club",
    "name_it", "tommy_hilfiger_kids", "petit_bateau", "mayoral", "little_bird",
    
    // Zabawki i gry
    "hasbro", "mattel", "trefl", "playmobil", "vtech", "bright_starts", "skip_hop", "little_tikes",
    "mega_bloks", "baby_einstein", "ravensburger", "hape", "djeco", "baby_born", "paw_patrol",
    "pokemon", "smoby", "furreal", "hot_wheels", "disney", "marvel", "schleich", "bruder",
    
    // Wyposażenie szkolne
    "herlitz", "starpak", "majewski", "derform", "topgal", "coolpack", "paso", "puma", "nike",
    "adidas", "under_armour", "vans", "faber_castell", "pelikan", "bambino", "endo",
    
    // Meble i akcesoria
    "bellamy", "pinio", "ikea", "timoore", "drewex", "kocot_kids", "troll", "klupś", "novelies",
    "mamo_tato", "przewijak", "stokke", "noordi", "bebecar", "inglesina", "roan", "emmaljunga",
    
    // Inne
    "other"
  ]).optional(),
  season: z.enum(["summer", "winter", "spring", "autumn", "all_seasons"]).optional(),
  
  // Cechy produktów dla niemowląt
  forNewborns: z.boolean().optional(),
  
  // Specyfika zabawek
  toyType: z.enum([
    "dolls", "action_figures", "cars", "remote_control", "construction", "board_games",
    "puzzles", "plush", "educational", "musical", "art_crafts", "outdoor", "sports",
    "bikes", "scooters", "ride_ons", "electronic", "interactive", "building_blocks",
    "roleplay", "collectibles", "wooden_toys", "books", "other"
  ]).optional(),
  
  // Bezpieczeństwo i certyfikaty
  safetyStandards: z.array(z.enum([
    "ce", "en71", "astm", "cpsia", "oeko_tex", "gots", "other"
  ])).optional(),
  
  // Stan i używanie
  unused: z.boolean().optional(),
  packageDamaged: z.boolean().optional(),
  missingParts: z.boolean().optional(),
  
  // Fandom i licencje
  character: z.enum([
    "disney_princess", "mickey_mouse", "winnie_the_pooh", "frozen", "marvel_heroes",
    "spider_man", "avengers", "star_wars", "harry_potter", "paw_patrol", "peppa_pig",
    "pj_masks", "my_little_pony", "pokemon", "hot_wheels", "barbie", "lol_surprise",
    "toy_story", "cars_movie", "minions", "hello_kitty", "batman", "superman", "thomas_friends",
    "teletubbies", "bing", "baby_shark", "other"
  ]).optional(),
});

// Filtry dla kategorii Antyki i Kolekcje
export const antykiKolekcjeFilterSchema = z.object({
  ...commonFilterSchema.shape,
  
  // Kategorie główne
  category: z.enum([
    "antiques", "art", "coins", "banknotes", "stamps", "postcards", "books", "comics", "records",
    "figurines", "military", "models", "posters", "memorabilia", "retro_gadgets", 
    "vintage_electronics", "vintage_toys", "trading_cards", "vinyl_records", "photography", 
    "historical_items", "alcohol", "instruments", "watches", "jewelry", "medals", "badges",
    "old_documents", "vintage_clothes", "vintage_accessories", "maps", "fossils", "minerals",
    "natural_history", "archaeological_finds", "political", "advertising", "sports_memorabilia",
    "film_memorabilia", "music_memorabilia", "theater_memorabilia", "royal_memorabilia", 
    "religious_items", "folk_art", "primitives", "scientific_instruments", "typewriters", 
    "cameras", "radios", "telephones", "clocks", "furniture", "kitchen_items", "glassware",
    "ceramics", "porcelain", "silverware", "autographs", "manuscripts", "other"
  ]).optional(),
  
  // Podkategorie szczegółowe dla różnych typów kolekcji
  subcategory: z.enum([
    // Podkategorie monet
    "ancient_coins", "medieval_coins", "modern_coins", "commemorative_coins", "bullion_coins", 
    "error_coins", "patterns", "tokens", "exonumia", "coin_sets", "proof_coins", "slabbed_coins",
    
    // Podkategorie banknotów
    "historical_banknotes", "world_banknotes", "emergency_money", "specimen_notes", "error_notes",
    "consecutive_serial_numbers", "star_notes", "replacement_notes", "uncut_sheets",
    
    // Podkategorie znaczków
    "classic_stamps", "commemoratives", "definitives", "airmail", "fiscal_stamps", "errors", 
    "varieties", "covers", "first_day_covers", "postal_history", "cinderellas", "souvenir_sheets",
    "stamp_booklets", "stamp_sheets", "stamp_blocks",
    
    // Podkategorie militariów
    "edged_weapons", "firearms", "helmets", "uniforms", "medals", "badges", "field_equipment",
    "documents", "photographs", "propaganda", "rations", "manuals", "insignia", "flags", "patches",
    "wwi", "wwii", "cold_war", "napoleonic", "american_civil_war", "medieval", "ancient",
    
    // Podkategorie modeli
    "aircraft_models", "car_models", "ship_models", "train_models", "military_models", 
    "architectural_models", "figure_models", "scale_models", "diecast", "plastic_kits", 
    "wooden_models", "radio_controlled", "display_models", "working_models",
    
    // Podkategorie figurek
    "action_figures", "statues", "busts", "miniatures", "dolls", "tin_toys", "lead_figures",
    "resin_figures", "pop_culture", "gaming_figures", "anime_figures", "cartoon_characters",
    "historical_figures", "mythological_figures", "religious_figures",
    
    // Podkategorie retro elektroniki
    "vintage_computers", "vintage_consoles", "vintage_games", "audio_equipment", "record_players",
    "tape_decks", "radios", "televisions", "cameras", "projectors", "telephones", "typewriters",
    "calculators", "mechanical_devices", "scientific_instruments", "medical_instruments",
    
    // Podkategorie kart kolekcjonerskich
    "sports_cards", "non_sports_cards", "game_cards", "tcg", "ocg", "rpg_cards", "vintage_cards",
    "promo_cards", "chase_cards", "autographed_cards", "relic_cards", "graded_cards",
    
    // Podkategorie sztuki
    "paintings", "prints", "lithographs", "etchings", "engravings", "woodcuts", "drawings",
    "watercolors", "pastels", "sculptures", "carvings", "ceramics", "folk_art", "aboriginal_art",
    "asian_art", "african_art", "religious_art", "posters", "contemporary_art", "modern_art",
    "surrealism", "impressionism", "expressionism", "abstract", "realism", "pop_art",
    
    // Inne podkategorie
    "other_subcategory"
  ]).optional(),
  
  // Cechy historyczne
  period: z.enum([
    "ancient", "medieval", "renaissance", "enlightenment", "industrial_revolution", 
    "pre_1800", "1800_1850", "1850_1900", "1900_1920", "1920_1940", "1940_1960", 
    "1960_1980", "1980_2000", "post_2000", "belle_epoque", "interwar_period", 
    "wwi_era", "wwii_era", "cold_war_era", "prehistoric", "bronze_age", "iron_age",
    "specific_historical_event", "other_period"
  ]).optional(),
  
  decade: z.enum([
    "pre_1900s", "1900s", "1910s", "1920s", "1930s", "1940s", "1950s", "1960s", 
    "1970s", "1980s", "1990s", "2000s", "2010s", "other_decade"
  ]).optional(),
  
  year: z.number().optional(),
  yearFrom: z.number().optional(),
  yearTo: z.number().optional(),
  
  // Styl i estetyka
  style: z.enum([
    "art_nouveau", "art_deco", "bauhaus", "mid_century", "mid_century_modern", "victorian", "edwardian", 
    "baroque", "renaissance", "rococo", "neoclassic", "modernist", "gothic", "romanesque",
    "industrial", "rustic", "streamline_moderne", "atomic_age", "brutalist", "constructivist", 
    "futurism", "minimalist", "postmodern", "beaux_arts", "craftsman", "empire", "biedermeier",
    "folk", "arts_and_crafts", "aestheticism", "jugendstil", "secession", "neo_gothic",
    "memphis", "space_age", "retro_futurism", "steampunk", "shabby_chic", "bohemian", "other_style"
  ]).optional(),
  
  // Pochodzenie
  origin: z.enum([
    // Europa
    "poland", "germany", "france", "uk", "italy", "spain", "portugal", "austria", "hungary",
    "czech_republic", "slovakia", "netherlands", "belgium", "switzerland", "ireland", "scotland",
    "denmark", "sweden", "norway", "finland", "iceland", "estonia", "latvia", "lithuania",
    "russia", "ukraine", "belarus", "romania", "bulgaria", "serbia", "croatia", "slovenia",
    "greece", "turkey", "malta", "cyprus", "luxembourg", "monaco", "liechtenstein", "vatican",
    
    // Ameryka
    "usa", "canada", "mexico", "brazil", "argentina", "chile", "colombia", "peru", "cuba",
    
    // Azja
    "china", "japan", "korea", "india", "iran", "israel", "saudi_arabia", "uae", "iraq",
    "pakistan", "afghanistan", "indonesia", "malaysia", "thailand", "vietnam", "philippines",
    "singapore", "hong_kong", "taiwan",
    
    // Pozostałe
    "australia", "new_zealand", "egypt", "south_africa", "morocco", "other_origin",
    
    // Regiony
    "scandinavia", "eastern_europe", "western_europe", "central_europe", "southern_europe",
    "northern_europe", "baltics", "balkans", "middle_east", "central_asia", "south_asia",
    "east_asia", "southeast_asia", "central_america", "south_america", "north_america",
    "africa", "oceania", "caribbean", "soviet_union", "habsburg_empire", "ottoman_empire",
    "british_empire"
  ]).optional(),
  
  // Materiały
  material: z.enum([
    // Metale
    "metal", "silver", "gold", "platinum", "bronze", "copper", "brass", "pewter", "tin",
    "zinc", "iron", "steel", "cast_iron", "chrome", "aluminum", "titanium", "lead",
    
    // Drewno i materiały organiczne
    "wood", "oak", "pine", "walnut", "mahogany", "ebony", "rosewood", "teak", "bamboo",
    "cork", "leather", "parchment", "bone", "horn", "ivory", "shell", "tortoiseshell",
    "coral", "amber", "wax", "feather", "fur", "hair",
    
    // Kamień i minerały
    "stone", "marble", "granite", "limestone", "alabaster", "jade", "onyx", "turquoise",
    "lapis_lazuli", "agate", "quartz", "crystal", "enamel", "ceramic", "porcelain",
    "earthenware", "stoneware", "majolica", "faience", "terracotta", "bisque",
    
    // Szkło
    "glass", "crystal_glass", "bohemian_glass", "murano_glass", "stained_glass",
    "pressed_glass", "carnival_glass", "milk_glass", "uranium_glass", "vaseline_glass",
    
    // Papier i tekstylia
    "paper", "cardboard", "textile", "cotton", "wool", "silk", "linen", "velvet", "lace",
    "canvas", "tapestry", "needlepoint", "embroidery",
    
    // Nowoczesne materiały
    "plastic", "bakelite", "celluloid", "galalith", "catalin", "lucite", "acrylic",
    "vinyl", "rubber", "fiberglass", "carbon_fiber", "plexiglass", "resin", "composite",
    
    // Inne
    "mixed_media", "other_material"
  ]).optional(),
  
  // Stan zachowania i jakość
  condition: z.enum([
    // Ogólne stany
    "mint", "near_mint", "excellent", "very_good", "good", "fair", "poor", "parts_only",
    "as_new", "new_old_stock", "original_condition", "restored", "conserved", "refinished",
    "repainted", "repaired", "damaged", "incomplete", "complete", "working", "non_working",
    
    // Stany dla monet i numizmatów
    "proof", "uncirculated", "au", "xf", "vf", "f", "vg", "g", "ag", "p", "ngc_certified",
    "pcgs_certified", "anacs_certified",
    
    // Stany dla znaczków
    "mnh", "mlh", "mh", "used", "cto", "on_piece", "on_cover", "hinged", "never_hinged",
    
    // Stany dla kart kolekcjonerskich
    "gem_mint", "psa_10", "psa_9", "psa_8", "psa_7", "bgs_10", "bgs_9.5", "bgs_9", 
    "sgc_10", "sgc_9", "graded", "ungraded", "sealed", "played", "heavily_played",
    
    // Stany dla książek
    "fine", "near_fine", "very_good_plus", "very_good_minus", "good_plus", "good_minus",
    "reading_copy", "ex_library", "book_club", "first_edition", "signed", "inscribed",
    
    // Stany dla militariów
    "museum_quality", "battlefield_pickup", "relic", "excavated", "ground_dug", "dug", 
    "untouched_patina", "cleaned", "polished", "aged", "barn_find", "veterans_bring_back",
    
    // Inne
    "other_condition"
  ]).optional(),
  
  // Rzadkość i wartość
  rarity: z.enum([
    "unique", "extremely_rare", "very_rare", "rare", "scarce", "uncommon", "common",
    "limited_edition", "limited_production", "one_of_a_kind", "prototype", "sample",
    "artist_proof", "numbered_edition", "mass_produced", "museum_piece", "historically_significant",
    "other_rarity"
  ]).optional(),
  
  // Ilość w kolekcji
  quantity: z.enum([
    "single_item", "pair", "set", "collection", "lot", "bulk", "accumulation", "complete_set",
    "partial_set", "volume", "album", "stockbook", "box", "other_quantity"
  ]).optional(),
  
  // Certyfikaty i proweniencja
  certification: z.enum([
    "authenticated", "certified", "appraised", "graded", "slabbed", "with_coa", "with_provenance",
    "museum_deaccession", "auction_house_provenance", "estate_sale", "private_collection",
    "family_heirloom", "excavated", "archaeologically_recovered", "treasure_trove",
    "with_documents", "with_original_receipt", "with_original_box", "with_original_tags",
    "other_certification"
  ]).optional(),
  
  // Autentyczność
  authenticity: z.enum([
    "authentic", "original", "genuine", "period", "reproduction", "replica", "copy", "fake",
    "forgery", "fantasy_piece", "modern_made", "aged", "artificially_aged", "other_authenticity"
  ]).optional(),
  
  // Marki, wydawcy, producenci, artyści
  brand: z.enum([
    // Monety i numizmatyka
    "mennica_polska", "nbp", "royal_mint", "us_mint", "perth_mint", "monnaie_de_paris",
    "canadian_mint", "pcgs", "ngc", "anacs", "spink", "baldwin", "künker", "gdańskie_muzeum_narodowe", 
    "wda", "gvn", "heritage_auctions", "stack's_bowers", "ira_and_larry_goldberg", "numismatica_ars_classica",
    
    // Sztuka i antyki
    "desa_unicum", "sothebys", "christies", "bonhams", "dorotheum", "koller", "phillips",
    "lempertz", "grisebach", "agra_art", "piasa", "drouot", "artcurial", "ketterer_kunst",
    "van_ham", "villa_grisebach", "neumeister", "freeman's", "skinner", "bruun_rasmussen",
    
    // Modele i figurki kolekcjonerskie
    "lego", "warhammer", "games_workshop", "hot_wheels", "matchbox", "siku", "schleich", 
    "revell", "tamiya", "italeri", "zvezda", "airfix", "hasegawa", "aoshima", "amt", 
    "trumpeter", "bandai", "kotobukiya", "mcfarlane_toys", "funko", "neca", "hasbro", 
    "mattel", "mezco", "hot_toys", "sideshow", "enterbay", "good_smile", "figma", 
    "medicom", "dragon", "eaglemoss", "atlas_editions", "corgi", "dinky", "britains",
    
    // Karty kolekcjonerskie
    "wizards_of_the_coast", "konami", "pokemon_company", "upper_deck", "topps", "panini",
    "futera", "talonsoft", "fantasy_flight_games", "games_workshop", "cryptozoic", 
    "rittenhouse", "leaf", "fleer", "donruss", "score", "skybox", "ultra_pro", "bowman",
    "o_pee_chee", "psa", "bgs", "sgc", "ksa", "mnt", "gma",
    
    // Militaria
    "militaria_pl", "sklep_cichociemni", "firearms", "hpc", "kmp", "mil_tec", "max_fuchs",
    "usmilitariaforum", "iwm", "bundeswehr_shop", "varusteleka", "hessen_antique", "ima_usa",
    "collectors_guild", "griffin_militaria", "green_jacket_shop", "military_antiques_toronto",
    
    // Filatelistyka
    "poczta_polska", "royal_mail", "usps", "deutsche_post", "leuchtturm", "lindner", "lighthouse", 
    "safe", "michel", "scott", "stanley_gibbons", "afa", "schaubek", "pofis", "yvert_et_tellier", 
    "abria", "hawid", "showgard", "hagner", "prinz", "marini", "davo", "kabe", "american_philatelic_society",
    
    // Książki, komiksy i rękopisy
    "penguin", "random_house", "harpercollins", "simon_schuster", "wydawnictwo_literackie", "znak",
    "czytelnik", "muza", "amber", "egmont", "marvel", "dc_comics", "dark_horse", "vertigo",
    "image_comics", "idw", "dynamite", "boom_studios", "jpk", "kultura_gniewu", "tore_editions",
    "abbeville", "abrams", "taschen", "phaidon", "skira", "rizzoli", "thames_hudson",
    
    // Zegarki i zegary
    "rolex", "omega", "patek_philippe", "audemars_piguet", "vacheron_constantin", "jaeger_lecoultre",
    "iwc", "breitling", "tag_heuer", "cartier", "panerai", "zenith", "longines", "tissot", "tudor",
    "breguet", "blancpain", "hublot", "ulysse_nardin", "piaget", "chopard", "bucherer", "oris",
    "seiko", "citizen", "casio", "bulova", "timex", "swatch", "poljot", "raketa", "vostok", "slava",
    "atlantic", "certina", "doxa", "cyma", "eterna", "movado", "rado", "zodiac", "junghans", "ball",
    "hamilton", "frederique_constant", "glycine", "mido", "nomos", "sinn", "stowa", "universal_geneve",
    
    // Biżuteria kolekcjonerska
    "tiffany", "cartier", "bvlgari", "van_cleef_arpels", "harry_winston", "mikimoto", "buccellati",
    "faberge", "graff", "chopard", "piaget", "georg_jensen", "lalique", "apart", "yes", "pandora", 
    "swarovski", "kruk", "chanel", "gucci", "hermes", "dior", "boucheron", "damiani", "pomellato",
    
    // Instrumenty muzyczne
    "fender", "gibson", "martin", "taylor", "ibanez", "prs", "rickenbacker", "gretsch", "yamaha",
    "steinway", "bosendorfer", "fazioli", "bechstein", "bluthner", "stradivarius", "guarneri",
    "amati", "selmer", "conn", "holton", "bach", "buffet_crampon", "hammond", "rhodes", "moog",
    
    // Inne
    "other_brand"
  ]).optional(),
  
  // Sygnatury i twórcy
  signed: z.boolean().optional(),
  signedBy: z.string().optional(),
  artist: z.string().optional(),
  designer: z.string().optional(),
  maker: z.string().optional(),
  
  // Cechy fizyczne
  size: z.object({
    height: z.number().optional(),
    width: z.number().optional(),
    depth: z.number().optional(),
    diameter: z.number().optional(),
    length: z.number().optional(),
    weight: z.number().optional(),
  }).optional(),
  
  // Cechy dodatkowe
  withBox: z.boolean().optional(),
  withOriginalPackaging: z.boolean().optional(),
  withDocuments: z.boolean().optional(),
  withCertificate: z.boolean().optional(),
  restored: z.boolean().optional(),
  modified: z.boolean().optional(),
  handmade: z.boolean().optional(),
  firstEdition: z.boolean().optional(),
  numbered: z.boolean().optional(),
  serialNumber: z.string().optional(),
  commemorative: z.boolean().optional(),
  museum_quality: z.boolean().optional(),
  part_of_series: z.boolean().optional(),
  prototype: z.boolean().optional(),
  
  // Zainteresowania specjalistyczne
  specialistInterest: z.enum([
    "art_history", "archaeology", "genealogy", "paleontology", "automotive_history",
    "industrial_history", "social_history", "political_history", "fashion_history",
    "aviation_history", "maritime_history", "railroad_history", "scientific_history",
    "medical_history", "technological_history", "architectural_history", "religious_history",
    "military_history", "sports_history", "music_history", "cinema_history", "literary_history",
    "other_interest"
  ]).optional(),
});

// Marki, które wystąpiły już wyżej w kodzie, uzupełnienie
export const antykiAdditionalBrands = [
    // Fotografika i kamery
    "kodak", "leica", "hasselblad", "rollei", "linhof", "zeiss", "olympus", "nikon", "canon", 
    "pentax", "minolta", "polaroid", "agfa", "voigtlander", "praktica", "zorki", "fed", "kiev",
    
    // Elektronika kolekcjonerska
    "grundig", "telefunken", "philips", "nokia", "motorola", "ericsson", "siemens", "braun", 
    "bang_olufsen", "blaupunkt", "tesla", "unitra", "radmor", "diora", "pioneer", "panasonic", 
    "aiwa", "sanyo", "toshiba", "hitachi", "sony", "sharp", "jvc", "akai", "technics", "marantz",
    "apple", "commodore", "atari", "sinclair", "amstrad", "tandy", "ibm", "olivetti", "brother",
    
    // Meble i wzornictwo
    "herman_miller", "knoll", "vitra", "cassina", "eames", "le_corbusier", "mies_van_der_rohe",
    "artek", "thonet", "panton", "kartell", "artifort", "fritz_hansen", "gubi", "polscy_projektanci",
    "wzornictwo_polskie", "skandynawskie", "ikea_vintage", "bauhaus_design", "art_deco_furniture",
];
    
    // Instrumenty vintage
    "fender", "gibson", "martin", "gretsch", "rickenbacker", "hofner", "vox", "marshall",
    "moog", "roland", "korg", "yamaha", "selmer", "conn", "king", "harmonium", "farfisa",
    
    // Zegarki vintage
    "rolex", "omega", "patek_philippe", "vacheron_constantin", "jaeger_lecoultre", "longines",
    "zenith", "seiko", "citizen", "bulova", "poljot", "vostok", "raketa", "slava", "casio",
    "swatch", "timex", "certina", "doxa", "atlantic", "tissot", "movado", "tag_heuer", "iwc",
    
    // Elektronika retro
    "atari", "commodore", "sinclair", "spectrum", "amiga", "amstrad", "apple", "ibm", "nintendo",
    "sega", "sony", "panasonic", "grundig", "philips", "bang_olufsen", "unitra", "diora",
    "radmor", "fonica", "kasprzak", "grundig", "telefunken", "sanyo", "sharp", "kenwood",
    
    // Inne
    "other"
  ]).optional(),
  
  // Cechy dodatkowe
  authenticity: z.enum([
    "certified", "authenticated", "provenance", "original", "reproduction", "copy", "replica", "unknown"
  ]).optional(),
  rarity: z.enum([
    "unique", "extremely_rare", "very_rare", "rare", "uncommon", "common", "unknown"
  ]).optional(),
  signed: z.boolean().optional(),
  numbered: z.boolean().optional(),
  limitedEdition: z.boolean().optional(),
  yearFrom: z.number().optional(),
  yearTo: z.number().optional(),
  completeness: z.enum([
    "complete", "near_complete", "partial", "incomplete", "fragments"
  ]).optional(),
  working: z.boolean().optional(),
  restored: z.boolean().optional(),
  documentation: z.boolean().optional(),
  original_packaging: z.boolean().optional(),
  certificate: z.boolean().optional(),
});

// Filtry dla kategorii Zdrowie i Uroda
export const zdrowieUrodaFilterSchema = z.object({
  ...commonFilterSchema.shape,
  
  // Kategorie
  category: z.enum([
    "cosmetics", "fragrances", "hair_care", "skin_care", "makeup", "nail_care", 
    "oral_care", "bath_body", "shaving", "supplements", "medical_equipment", 
    "fitness_equipment", "wellness", "massage", "first_aid", "mobility_aids", 
    "vision_care", "hearing_care", "diet_nutrition", "aromatherapy", "personal_hygiene", "other"
  ]).optional(),
  
  // Marki
  brand: z.enum([
    // Kosmetyki i pielęgnacja
    "loreal", "nivea", "maybelline", "rimmel", "revlon", "max_factor", "bourjois", "garnier",
    "dove", "neutrogena", "vichy", "la_roche_posay", "avene", "eucerin", "cerave", "bioderma",
    "dermika", "dermacol", "eveline", "inglot", "wibo", "bell", "ziaja", "bielenda", "lirene",
    "perfecta", "farmona", "joanna", "dax", "soraya", "clean_clear", "yves_rocher", "avon",
    "oriflame", "mary_kay", "dermena", "pharmaceris", "tołpa", "floslek", "kolastyna", "delia",
    "piz_buin", "lirene", "dermika", "nivelazione", "oillan", "iwostin", "dermedic", "lierac", 
    "filorga", "nuxe", "weleda", "mustela", "sylveco", "bandi", "ecocera", "resibo", 
    
    // Marki premium
    "chanel", "dior", "lancôme", "estee_lauder", "clinique", "shiseido", "guerlain", "sisley", 
    "givenchy", "ysl", "giorgio_armani", "mac", "bobbi_brown", "urban_decay", "nars", 
    "charlotte_tilbury", "clarins", "kiehl's", "origins", "too_faced", "benefit", "fresh", 
    "bare_minerals", "it_cosmetics", "fenty_beauty", "huda_beauty", "glossier", "pat_mcgrath",
    "dr_barbara_sturm", "dr_jart", "tatcha", "drunk_elephant", "the_ordinary", "pat_mcgrath", 
    "natasha_denona", "hourglass", "make_up_for_ever", "stila",
    
    // Perfumy
    "hugo_boss", "calvin_klein", "versace", "dolce_gabbana", "armani", "burberry", "jimmy_choo", 
    "marc_jacobs", "paco_rabanne", "davidoff", "kenzo", "lacoste", "ralph_lauren", "tom_ford", 
    "creed", "thierry_mugler", "carolina_herrera", "issey_miyake", "gucci", "hermes", "azzaro", 
    "jean_paul_gaultier", "montblanc", "cartier", "bvlgari", "michael_kors", "diesel", "dkny", 
    "elizabeth_arden", "nina_ricci", "cavalli", "escada", "chloe", "valentino", "zadig_voltaire",
    
    // Suplementy i zdrowie
    "olimp", "olimp_labs", "allnutrition", "swanson", "solgar", "now_foods", "life_extension", 
    "jarrow_formulas", "nature's_bounty", "puritan's_pride", "source_naturals", "myprotein", 
    "fitness_authority", "scitec_nutrition", "biotech_usa", "activlab", "musclepharm", "optimum_nutrition", 
    "centrum", "muscle_clinic", "pharmaton", "garden_of_life", "new_nordic", "pharmavital", 
    "naturell", "suplement_diety", "a-z_medica", "better_body", "nature_love", "onnit", "vegan_protein",
    
    // Sprzęt medyczny i fitness
    "beurer", "sanitas", "microlife", "omron", "braun", "diagnostic", "vitammy", "tech_med", 
    "geratherm", "kardio_test", "novama", "medel", "novama", "medisana", "gess", "aescu_form", 
    "salter", "crane", "kettler", "hammer", "york", "spokey", "reebok", "nike", "adidas", "puma", 
    "marbo_sport", "mft", "hms", "insportline", "tiguar", "tunturi", "proform", "nordictrack", 
    "schwinn", "concept2", "bowflex", "theraband", "trigger_point", "blackroll", "gymstick",
    
    // Sprzęt do masażu i fizjoterapii
    "medivon", "casada", "homedics", "lanaform", "medisana", "beurer", "medmax", "schupp", 
    "gymna", "enraf_nonius", "btl", "hydro_jet", "inhalmed", "tech_med", "novama", "amylior",
    
    // Higiena
    "colgate", "oral_b", "sensodyne", "listerine", "blend_a_med", "meridol", "lacalut", "elmex", 
    "signal", "splat", "tesa_dental", "protefix", "corega", "super_white", "whitewash", "blanx", 
    "white_glo", "jordan", "tepe", "curaprox", "meridol", "vademecum", "ziaja", "nivea", "dove", 
    "fa", "palmolive", "old_spice", "adidas", "axe", "rexona", "head_shoulders", "pantene", "garnier", 
    "aussie", "herbal_essences", "elseve", "syoss", "john_frieda", "schwarzkopf", "gliss_kur", 
    "taft", "got2be", "wella", "joico", "matrix", "loreal", "nivea", "gillette", "wilkinson", 
    "schick", "bic", "philips", "braun", "remington", "babyliss", "rowenta", "panasonic",
    
    // Inne
    "other"
  ]).optional(),
  
  // Cechy produktu
  form: z.enum([
    "cream", "lotion", "serum", "gel", "oil", "balm", "mask", "spray", "mousse", "powder", 
    "liquid", "tablet", "capsule", "patch", "drops", "foam", "stick", "roll_on", "wipes", "other"
  ]).optional(),
  
  skinType: z.enum([
    "normal", "dry", "oily", "combination", "sensitive", "acne_prone", "mature", "all"
  ]).optional(),
  
  hairType: z.enum([
    "normal", "dry", "oily", "damaged", "colored", "curly", "straight", "fine", "thick", "all"
  ]).optional(),
  
  concern: z.enum([
    "acne", "aging", "dark_spots", "dryness", "redness", "wrinkles", "sensitive_skin", 
    "pores", "dark_circles", "hair_loss", "dandruff", "split_ends", "cellulite", "stretch_marks",
    "scars", "sun_damage", "uneven_tone", "fatigue", "stress", "immunity", "joints", "vision",
    "digestion", "blood_pressure", "cholesterol", "sleep", "memory", "energy", "weight_management", "other"
  ]).optional(),
  
  gender: z.enum(["men", "women", "unisex"]).optional(),
  natural: z.boolean().optional(),
  organic: z.boolean().optional(),
  vegan: z.boolean().optional(),
  cruelty_free: z.boolean().optional(),
  hypoallergenic: z.boolean().optional(),
  dermatologically_tested: z.boolean().optional(),
  paraben_free: z.boolean().optional(),
  fragrance_free: z.boolean().optional(),
  alcohol_free: z.boolean().optional(),
  sls_free: z.boolean().optional(),
  silicone_free: z.boolean().optional(),
  
  // Sprzęt
  power_source: z.enum(["battery", "rechargeable", "wired", "manual", "other"]).optional(),
  connectivity: z.enum(["bluetooth", "wifi", "usb", "none", "other"]).optional(),
  warranty: z.boolean().optional(),
  warranty_months: z.number().optional(),
});

// Filtry dla kategorii Zwierzęta
export const zwierzetaFilterSchema = z.object({
  ...commonFilterSchema.shape,
  
  // Kategorie
  category: z.enum([
    "dogs", "cats", "birds", "fish", "reptiles", "small_mammals", "farm_animals", 
    "pet_food", "accessories", "toys", "cages", "aquariums", "terrariums", 
    "health_care", "grooming", "training", "transportation", "other"
  ]).optional(),
  
  // Szczegóły kategorii
  animalType: z.enum([
    // Psy
    "dogs_small", "dogs_medium", "dogs_large", "dogs_puppies", "dogs_specific_breed",
    
    // Koty
    "cats_kittens", "cats_adult", "cats_specific_breed",
    
    // Ptaki
    "canaries", "parrots", "budgerigars", "finches", "pigeons", "chickens", "ducks",
    
    // Gryzonie
    "hamsters", "guinea_pigs", "rabbits", "rats", "mice", "chinchillas", "ferrets", "degus",
    
    // Ryby
    "tropical_fish", "cold_water_fish", "marine_fish", "pond_fish", "aquatic_plants",
    
    // Gady i płazy
    "turtles", "snakes", "lizards", "frogs", "newts", "insects", "spiders",
    
    // Zwierzęta hodowlane
    "horses", "cows", "sheep", "goats", "pigs", "poultry", "beekeeping",
    
    // Inne
    "other_pets"
  ]).optional(),
  
  // Marki
  brand: z.enum([
    // Karmy i przysmaki
    "royal_canin", "whiskas", "pedigree", "purina", "felix", "sheba", "applaws", "hills", 
    "eukanuba", "iams", "acana", "orijen", "nutro", "josera", "bosch", "kitekat", "friskies", 
    "gourmet", "advance", "pro_plan", "one", "darling", "chappy", "butchers", "dolina_noteci", 
    "rinti", "animonda", "gimborn", "gimcat", "beaphar", "vitakraft", "versele_laga", "padovan", 
    "trixie", "brit", "canagan", "taste_of_the_wild", "barking_heads", "naturea", "regal", 
    "bozita", "dr_clauder", "comfy", "miamor", "dingo", "petitki", "dakota", "goldim", "brekeke", 
    "tropidog", "tropicat", "pupil", "piper", "indulona", "dehner", "bozita", "aatu", "arie", 
    "arion", "adragna", "amity", "belcando", "bewi_dog", "biofeed", "bioline", "carnilove", 
    "chicopee", "dibaq", "dingo", "dolina_noteci", "ecopet", "eminent", "exalto", "farmina", 
    "flatazor", "forza10", "golosi", "goood", "happy_dog", "happy_cat", "hubertus_gold", 
    "karmy_z_własnej_wędzarni", "kennel_nutrition", "rafi", "wanpy", "smilla", "yarrah", "rocco", 
    "rosie's_farm", "lukullus", "wolf_of_wilderness", "sanabelle", "porta_21", "almo_nature", 
    "concept_for_life", "cosma", "catz_finefood", "dokas", "greenwoods", "wild_freedom", "cachet",
    
    // Akcesoria
    "trixie", "kerbl", "zolux", "ferplast", "beaphar", "tetra", "vitakraft", "flamingo", 
    "comfy", "chuckit", "rogz", "hunter", "hurtta", "karlie", "ruffwear", "julius_k9", "flexi", 
    "kong", "jk_animals", "sera", "aquael", "eheim", "exo_terra", "jbl", "fluval", "hagen", 
    "oase", "marina", "happet", "tropical", "aqua_szut", "chemoform", "baspool", "kuweta", 
    "intersand", "benek", "bazyl", "tigerino", "catsan", "super_benek", "żwirek_naturalny", 
    "pet_mate", "savic", "marchioro", "trixie", "beeztees", "tomy", "petmate", "midwest", 
    "moderna", "catit", "petface", "vadigran", "bunny", "versele_laga", "karlie", "brit_care", 
    "menforsan", "dr_seidel", "dermapharm", "sera", "tropical", "tetra", "hs_aqua", "beaphar", 
    "pet_health_care",
    
    // Sklepy i marki lokalne
    "zooplus", "zoopluspl", "pet_expert", "kakadu", "krakvet", "zoo_karina", "zoo_centrum", 
    "aquael", "apetete", "aquarium_gdyńskie", "pan_żako", "tropiciele", "zoo_safari", "zoo_market", 
    "zooart", "aquaelzoo", "zoologiczny_centrum_exotica", "aqua_exotic", "aqua_light", "aqua_zoo", 
    "super_zoo", "zoolek", "doktor_zimny", "animals_centrum_zoologiczne", "aquarist", "hornbach", 
    "obi", "leroy_merlin", "castorama", "jula", "real", "auchan", "carrefour", "selgros", "makro",
    
    // Inne
    "other"
  ]).optional(),
  
  // Cechy produktu
  age: z.enum([
    "puppy", "junior", "adult", "senior", "all"
  ]).optional(),
  
  size: z.enum([
    "extra_small", "small", "medium", "large", "extra_large", "all"
  ]).optional(),
  
  foodType: z.enum([
    "dry", "wet", "raw", "freeze_dried", "semi_moist", "treats", "supplements", "milk"
  ]).optional(),
  
  ingredient: z.enum([
    "chicken", "beef", "turkey", "lamb", "pork", "fish", "salmon", "tuna", "duck", 
    "venison", "rabbit", "horse", "goat", "grain_free", "organic", "vegetarian", 
    "hypoallergenic", "premium", "super_premium", "economy", "natural", "barf"
  ]).optional(),
  
  specialNeeds: z.enum([
    "weight_control", "hairball", "dental", "sensitive_digestion", "urinary", 
    "joints", "skin_coat", "hypoallergenic", "sterilized", "indoor", "outdoor", 
    "multicat", "kitten", "senior", "puppy", "large_breed", "small_breed", "active"
  ]).optional(),
  
  weight: z.number().optional(),
  weightFrom: z.number().optional(),
  weightTo: z.number().optional(),
  
  // Inne
  breed: z.string().optional(),
  material: z.enum([
    "plastic", "metal", "wood", "glass", "fabric", "leather", "rubber", "silicone", "ceramic", "other"
  ]).optional(),
  color: z.string().optional(),
  warranty: z.boolean().optional(),
  warrantyMonths: z.number().optional(),
});

// Filtry dla kategorii Firma i Przemysł
export const firmaPrzemyslFilterSchema = z.object({
  ...commonFilterSchema.shape,
  
  // Kategorie
  category: z.enum([
    "industrial_equipment", "construction", "agricultural", "electrical", "metalworking", 
    "woodworking", "restaurant", "retail", "office", "warehouse", "safety", "lab_equipment", 
    "packaging", "printing", "textiles", "landscaping", "cleaning", "manufacturing", "automotive", 
    "hvac", "plumbing", "welding", "material_handling", "other"
  ]).optional(),
  
  // Szczegóły kategorii
  equipmentType: z.enum([
    // Maszyny i sprzęt przemysłowy
    "generators", "compressors", "pumps", "motors", "heaters", "chillers", "fans", "blowers",
    "hydraulics", "pneumatics", "conveyor", "cnc_machines", "lathes", "milling_machines", 
    "drilling_machines", "grinders", "presses", "welding_equipment", "cutting_machines", 
    "bending_machines", "painting_equipment", "plasma_cutters", "laser_cutters", "3d_printers",
    
    // Narzędzia
    "hand_tools", "power_tools", "measuring_tools", "electrical_tools", "pneumatic_tools", 
    "hydraulic_tools", "gardening_tools", "automotive_tools", "plumbing_tools", "hvac_tools",
    
    // Budownictwo
    "scaffolding", "concrete_equipment", "excavators", "loaders", "bulldozers", "cranes", 
    "mixing_equipment", "demolition_equipment", "surveying_equipment", "traffic_safety",
    
    // Magazynowanie i logistyka
    "forklifts", "pallet_jacks", "shelving", "storage_racks", "containers", "scales", 
    "loading_ramps", "dock_equipment", "conveyors", "packing_machines", "shrink_wrappers",
    
    // Biuro i handel
    "furniture", "electronics", "printers", "copiers", "cash_registers", "pos_systems", 
    "displays", "signage", "security_systems", "telecommunications", "computers", "software",
    
    // Inne
    "other_equipment"
  ]).optional(),
  
  // Marki
  brand: z.enum([
    // Narzędzia i sprzęt
    "bosch", "makita", "dewalt", "milwaukee", "hitachi", "ryobi", "metabo", "hilti", "flex", 
    "festool", "aeg", "kress", "black_decker", "skil", "dremel", "einhell", "worx", "ferm", 
    "parkside", "profix", "stanley", "fiskars", "bahco", "teng_tools", "facom", "gedore", "hazet", 
    "kraftwelle", "knipex", "wera", "wiha", "stahlwille", "proxxon", "yato", "topex", "awtools", 
    "neo_tools", "hogert", "proline", "verto", "graphite", "erba", "irwin", "jonnesway", "luna", 
    "stihl", "husqvarna", "echo", "dolmar", "oleo_mac", "nac", "briggs_stratton", "mcculloch", 
    
    // Maszyny przemysłowe
    "kärcher", "nilfisk", "alto", "stiga", "fiac", "compair", "boge", "airpol", "walter", 
    "metabo", "kemppi", "esab", "lincoln_electric", "fronius", "hypertherm", "fanuc", "haas", 
    "mazak", "dmg_mori", "doosan", "sodick", "okuma", "amada", "trumpf", "bystronic", "durma", 
    "geka", "ermaksan", "promotech", "eckert", "esab", "fein", "gys", "kemper", "lorch", 
    "migatronic", "rehm", "selco", "telwin", "tecna", "aro", "gys", "deca", "telwin", "kempi", 
    "dynamic", "esab", "magnum", "spartus", "powermat", "dedra", "vulcan", "kwb", "faster", 
    "rems", "ridgid", "rothenberger", "virax", "super_ego", "alfra", "exact", "robend", 
    
    // Maszyny budowlane
    "cat", "komatsu", "hitachi", "jcb", "liebherr", "volvo", "hyundai", "case", "manitou", 
    "bomag", "wacker_neuson", "dynapac", "atlas_copco", "kramer", "merlo", "doosan", "new_holland", 
    "terex", "mecalac", "kubota", "haulotte", "genie", "bobcat", "avant", "gehl", "thwaites", 
    "ausa", "putzmeister", "schwing", "cifa", "iveco", "man", "scania", "daf", "mercedes", 
    "renault_trucks", "volvo_trucks", "schmitz", "krone", "wielton", 
    
    // Biuro i handel
    "hp", "canon", "epson", "brother", "kyocera", "sharp", "ricoh", "xerox", "lexmark", "oki", 
    "samsung", "dell", "lenovo", "apple", "asus", "microsoft", "acer", "logitech", "fellowes", 
    "novus", "leitz", "esselte", "durable", "bisley", "interstuhl", "herman_miller", "steelcase", 
    "nowy_styl", "kinnarps", "profim", "bnos", "elzap", "gratnells", "trodat", "colop", "unistar", 
    "tesa", "uhu", "rapid", "leatherman", "victorinox", "casio", "citizen", "hewlett_packard", 
    "adobe", "microsoft", "autodesk", "sage", "comarch", "sap", "ibm", "oracle", "symantec", 
    "cisco", "hp", "dell", "lenovo", "apple", "asus", "acer", "msi", "toshiba", "sony", "lg", 
    "samsung", "philips", "nec", "hikvision", "axis", "bosch_security", "dahua", "zebra", 
    "datalogic", "honeywell", "bixolon", "posnet", "novitus", "elzab", "verifone", "ingenico",
    
    // Hydraulika, elektryka, budownictwo
    "lowara", "grundfos", "wilo", "pedrollo", "ibo", "hydro_vacuum", "omnigena", "ebara", "italtecnica", 
    "leo", "sigma", "belsan", "sigma", "resideo", "aquatica", "heiztechnik", "galmet", "defro", 
    "viessmann", "junkers", "vaillant", "termet", "saunier_duval", "purmo", "kermi", "instal_projekt", 
    "Atlantic", "kospel", "ariston", "biawar", "tece", "geberit", "hansgrohe", "grohe", "kludi", 
    "armatura_kraków", "ferro", "koło", "roca", "cersanit", "ideal_standard", "deante", "liveno", 
    "dafi", "purmo", "jaga", "zehnder", "uponor", "rehau", "kan", "wavin", "kisan", "herz", "danfoss", 
    "afriso", "gebo", "valvex", "honeywell", "oventrop", "watts", "scneider_electric", "abb", "legrand", 
    "eaton", "hager", "siemens", "eti", "gewiss", "kontakt_simon", "ospel", "karlik", "ftg", "ergom", 
    "wago", "phoenix_contact", "wieland", "lapp_kabel", "elektroplast", "elko_bis", "baks", "bemko", 
    "schneider_electric", "abb", "legrand", "eaton", "apator", "sonel", "benning", "fluke", "hioki", 
    "megger", "testo", "laserliner", "knipex", "wera", "wiha", "profix", "neo", "topex", "yato",
    
    // Materiały budowlane i wykończeniowe
    "mapei", "atlas", "ceresit", "basf", "kreisel", "alpol", "sopro", "weber", "knauf", "rigips", 
    "norgips", "siniat", "rockwool", "ursa", "isover", "paroc", "styropmin", "austrotherm", "bachl", 
    "izobud", "icopal", "sika", "henkel", "wurth", "tytan", "den_braven", "bochemie", "tikkurila", 
    "dulux", "śnieżka", "beckers", "caparol", "ceresit", "magnat", "dekoral", "nobiles", "jedynka", 
    "bondex", "sadolin", "altax", "drewnochron", "vidaron", "remmers", "osmo", "soudal", "lakma", 
    "izolex", "nexler", "dyckerhoff", "górażdże", "lafarge", "cemex", "limex", "alpol", "ytong", 
    "solbet", "h+h", "leier", "cerpol", "wienerberger", "porotherm", "klinkier", "semmelrock", 
    "polbruk", "libet", "bruk_bet", "ziel_bruk", "drewno_betonowe", "pozbruk", "certus", "kronospan", 
    "pfleiderer", "egger", "kronopol", "swiss_krono", "classen", "barlinek", "tarkett", "quickstep", 
    "arbiton", "krono_original", "viterra", "panele_podłogowe", "magnat_ceramic", "paradyż", 
    "cersanit", "opoczno", "tubądzin", "cerrad", "nowa_gala", "incana", "stegu", "stones", "steinblau", 
    "bruk_bet", "libet", "ziel_bruk", "polbruk", "brukbet", "pozbruk", "semmelrock", "hauraton", 
    "aco", "kessel", "alcaplast", "muffenrohr", "baumit", "sto", "bolix", "foveo_tech", "farby_kabe", 
    "tytan_eos", "caparol", "kreisel", "optolith", "weber", "lakma", "sempre", "alpol", "atlas", 
    "kreisel", "ceresit", "mapei", "sopro", "botament", "schomburg", "izohan", "bostik", "uzin", 
    "thomsit", "flugger", "ecophon", "armstrong", "norgips", "siniat", "rigips", "knauf", "fermacell", 
    "steico", "metpol", "alu", "balexmetal", "glinmet", "budmat", "ruukki", "blachy_pruszyński", 
    "blachotrapez", "regamet", "bratex", "florian", "jaf", "egger", "steico", "swiss_krono", "paged", 
    "standrew", "drewpol", "jawor", "kronopol", "parkieciarz",
    
    // Inne
    "other"
  ]).optional(),
  
  // Cechy produktu
  condition: z.enum([
    "new", "demo", "refurbished", "used_like_new", "used_good", "used_fair", "for_parts"
  ]).optional(),
  
  powerType: z.enum([
    "electric", "petrol", "diesel", "hydraulic", "pneumatic", "battery", "manual", "hybrid"
  ]).optional(),
  
  phase: z.enum([
    "single", "three", "dc", "other"
  ]).optional(),
  
  voltage: z.enum([
    "12v", "24v", "110v", "230v", "400v", "other"
  ]).optional(),
  
  powerOutput: z.number().optional(),
  powerOutputUnit: z.enum([
    "w", "kw", "hp", "nm", "other"
  ]).optional(),
  
  year: z.number().optional(),
  yearFrom: z.number().optional(),
  yearTo: z.number().optional(),
  weight: z.number().optional(),
  
  certification: z.enum([
    "ce", "iso", "tuv", "gs", "ul", "gost", "rohs", "reach", "atex", "iecex", "ip", "other"
  ]).optional(),
  
  // Wymiary i parametry
  width: z.number().optional(),
  height: z.number().optional(),
  depth: z.number().optional(),
  diameter: z.number().optional(),
  capacity: z.number().optional(),
  speed: z.number().optional(),
  
  // Inne
  warranty: z.boolean().optional(),
  warrantyMonths: z.number().optional(),
  leasing: z.boolean().optional(),
  financing: z.boolean().optional(),
  rental: z.boolean().optional(),
  training: z.boolean().optional(),
  installation: z.boolean().optional(),
  service: z.boolean().optional(),
});

// Filtry dla kategorii Usługi
export const uslugiFilterSchema = z.object({
  ...commonFilterSchema.shape,
  
  // Kategorie
  category: z.enum([
    "construction", "renovation", "repair", "transport", "moving", "cleaning", "gardening", 
    "beauty", "health", "education", "tutoring", "legal", "financial", "it", "marketing", 
    "design", "photography", "video", "translation", "childcare", "eldercare", "events", 
    "travel", "automotive", "other"
  ]).optional(),
  
  // Szczegóły kategorii
  serviceType: z.enum([
    // Budowa, remont, naprawa
    "construction", "renovation", "electrical", "plumbing", "carpentry", "flooring", 
    "painting", "roofing", "windows", "doors", "tiling", "plastering", "masonry", 
    "demolition", "insulation", "interior_design", "exterior_design", "handyman", 
    "hvac", "locksmith", "landscaping", "fence_installation", "swimming_pool", "sauna",
    
    // Transport
    "delivery", "moving", "furniture_transport", "courier", "passenger_transport", 
    "airport_transfer", "car_rental", "truck_rental", "trailer_rental", "car_sharing", 
    "taxi", "chauffeur", "transport_national", "transport_international", "heavy_loads",
    
    // Dom i ogród
    "cleaning", "window_cleaning", "carpet_cleaning", "chimney_sweeping", "pest_control", 
    "gardening", "lawn_care", "tree_cutting", "snow_removal", "housekeeping", "laundry", 
    "ironing", "furniture_assembly", "home_security", "smart_home_installation",
    
    // Usługi osobiste
    "beauty_salon", "hair_salon", "barbershop", "nail_salon", "makeup", "tattoo", 
    "piercing", "massage", "spa", "fitness", "personal_trainer", "yoga", "physiotherapy", 
    "alternative_medicine", "dietitian", "psychologist", "speech_therapist", "life_coach", 
    "personal_shopper", "stylist", "tailor", "shoemaker",
    
    // Edukacja i praca
    "tutoring", "language_courses", "music_lessons", "dance_lessons", "art_lessons", 
    "cooking_classes", "driving_lessons", "computer_courses", "vocational_training", 
    "professional_development", "career_coaching", "resume_writing", "job_search", 
    "recruitment", "translation", "interpretation", "proofreading", "copywriting",
    
    // Biznes i finanse
    "accounting", "tax_services", "bookkeeping", "payroll", "financial_advice", 
    "insurance", "legal_services", "notary", "patents", "trademarks", "consulting", 
    "business_planning", "market_research", "debt_collection", "credit_repair", 
    "investment_advice", "retirement_planning", "mortgage_advice", "loans", "leasing",
    
    // IT i media
    "web_development", "app_development", "software_development", "it_support", 
    "computer_repair", "data_recovery", "network_installation", "cybersecurity", 
    "seo", "social_media_marketing", "content_marketing", "email_marketing", "sms_marketing", 
    "graphic_design", "logo_design", "branding", "printing", "photography", "videography", 
    "animation", "3d_modeling", "virtual_reality", "augmented_reality", "drone_services",
    
    // Wydarzenia i okazje
    "event_planning", "wedding_planning", "catering", "party_rentals", "entertainment", 
    "band", "dj", "photographer", "videographer", "photo_booth", "decoration", "floral_design", 
    "balloon_decoration", "rent_a_venue", "rent_a_car", "limousine_service", "tour_guide", 
    "sightseeing_tours", "travel_agency", "hotel_reservations", "vacation_rentals",
    
    // Motoryzacja
    "car_repair", "car_maintenance", "tire_services", "car_wash", "car_detailing", 
    "paint_job", "dent_removal", "windshield_repair", "car_electronics", "car_diagnostics", 
    "tuning", "motorcycle_repair", "bicycle_repair", "towing", "roadside_assistance", 
    "vehicle_inspection", "car_wrapping", "car_valuation", "vehicle_import", "car_buying_advice",
    
    // Zdrowie i opieka
    "babysitting", "childcare", "eldercare", "home_care", "pet_sitting", "dog_walking", 
    "pet_grooming", "pet_training", "veterinarian", "animal_boarding", "animal_breeding", 
    "medical_services", "dental_services", "optometry", "nursing", "physical_therapy", 
    "chiropractic", "mental_health", "addiction_treatment", "rehabilitation",
    
    // Inne
    "other_services"
  ]).optional(),
  
  // Dostawca usługi
  serviceProvider: z.enum([
    "business", "individual", "licensed_professional", "certified_specialist", "agency", 
    "franchise", "cooperative", "non_profit", "other"
  ]).optional(),
  
  // Doświadczenie i kwalifikacje
  experience: z.enum([
    "beginner", "intermediate", "advanced", "expert", "master"
  ]).optional(),
  
  experienceYears: z.number().optional(),
  
  certification: z.boolean().optional(),
  certification_type: z.string().optional(),
  license: z.boolean().optional(),
  license_type: z.string().optional(),
  insurance: z.boolean().optional(),
  portfolio: z.boolean().optional(),
  references: z.boolean().optional(),
  
  // Lokalizacja i dostępność
  location: z.enum([
    "at_provider", "at_client", "remote", "hybrid", "any"
  ]).optional(),
  
  radius: z.number().optional(),
  availability: z.enum([
    "immediately", "this_week", "next_week", "this_month", "next_month", "flexible"
  ]).optional(),
  
  availableDays: z.array(z.enum([
    "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday", "weekdays", "weekends", "any"
  ])).optional(),
  
  // Płatność i warunki
  priceType: z.enum([
    "fixed", "hourly", "daily", "weekly", "monthly", "per_sqm", "per_unit", "per_project", "estimate", "quote", "free"
  ]).optional(),
  
  paymentMethod: z.enum([
    "cash", "bank_transfer", "card", "mobile_payment", "crypto", "installments", "invoice", "any"
  ]).optional(),
  
  contract: z.boolean().optional(),
  guarantee: z.boolean().optional(),
  guaranteePeriod: z.number().optional(),
  
  // Inne
  languages: z.array(z.enum([
    "polish", "english", "german", "french", "spanish", "italian", "russian", 
    "ukrainian", "czech", "slovak", "lithuanian", "latvian", "norwegian", 
    "swedish", "danish", "dutch", "portuguese", "romanian", "hungarian", "other"
  ])).optional(),
  
  instantBooking: z.boolean().optional(),
  onlineService: z.boolean().optional(),
  mobileService: z.boolean().optional(),
  emergencyService: z.boolean().optional(),
  rating: z.number().optional(),
  freeConsultation: z.boolean().optional(),
  freeEstimate: z.boolean().optional(),
});

// Filtry dla kategorii Wypożyczalnia
export const wypozyczalniaFilterSchema = z.object({
  ...commonFilterSchema.shape,
  
  // Kategorie
  category: z.enum([
    "tools", "equipment", "vehicles", "boats", "party", "costumes", "sports", 
    "cameras", "audio_video", "computers", "phones", "games", "instruments", 
    "books", "clothing", "furniture", "appliances", "children", "other"
  ]).optional(),
  
  // Szczegóły kategorii
  rentalType: z.enum([
    // Narzędzia i sprzęt
    "power_tools", "hand_tools", "garden_tools", "cleaning_equipment", "generators", 
    "compressors", "heaters", "pumps", "ladders", "scaffolding", "welding_equipment", 
    "measuring_tools", "painting_equipment", "construction_equipment", "automotive_tools", 
    "plumbing_tools", "electrical_tools", "floor_equipment", "wood_equipment", 
    "pressure_washers", "carpet_cleaners", "lawn_mowers", "chainsaws", "hedge_trimmers", 
    "log_splitters", "tillers", "aerators", "trench_diggers", "concrete_mixers", 
    "concrete_grinders", "demolition_hammers", "nail_guns", "sanders", "saws", "drills",
    
    // Pojazdy i transport
    "cars", "vans", "trucks", "trailers", "motorcycles", "scooters", "bicycles", 
    "boats", "jet_skis", "kayaks", "canoes", "paddle_boards", "campers", "rvs", 
    "moving_trucks", "moving_vans", "car_roof_boxes", "car_carriers", "car_seats", 
    "gps_navigation", "wheelchair_accessible", "limousines", "classic_cars", "luxury_cars", 
    "sports_cars", "off_road_vehicles", "snowmobiles", "atvs", "golf_carts", "segways",
    
    // Imprezy i uroczystości
    "party_tents", "chairs", "tables", "linens", "tableware", "glassware", "catering_equipment", 
    "heaters", "coolers", "bar_equipment", "lighting", "sound_systems", "karaoke", "projectors", 
    "screens", "stages", "dance_floors", "photo_booths", "carnival_games", "bouncy_castles", 
    "costumes", "halloween_props", "christmas_decor", "wedding_decor", "arches", "backdrops", 
    "chandeliers", "centerpieces", "candle_holders", "cake_stands", "serving_trays", "fountains",
    
    // Sport i rekreacja
    "skis", "snowboards", "ice_skates", "roller_skates", "inline_skates", "skateboards", 
    "surfboards", "wetsuits", "fishing_gear", "camping_gear", "hiking_gear", "climbing_gear", 
    "diving_gear", "golf_clubs", "tennis_rackets", "bicycles", "helmets", "protective_gear", 
    "fitness_equipment", "exercise_machines", "weights", "yoga_mats", "binoculars", "telescopes", 
    "metal_detectors", "beach_gear", "pool_accessories", "sleds", "snow_tubes", "water_toys",
    
    // Elektronika i multimedia
    "cameras", "lenses", "tripods", "drones", "gopro", "camera_stabilizers", "lighting_equipment", 
    "video_cameras", "projectors", "screens", "tvs", "sound_systems", "speakers", "microphones", 
    "dj_equipment", "musical_instruments", "amplifiers", "keyboards", "drums", "guitars", 
    "computers", "laptops", "tablets", "printers", "scanners", "gaming_consoles", "vr_headsets", 
    "phones", "smartwatches", "power_banks", "portable_chargers", "wifi_hotspots",
    
    // Dom i ogród
    "furniture", "beds", "cribs", "high_chairs", "appliances", "refrigerators", "freezers", 
    "washing_machines", "dryers", "dishwashers", "microwaves", "coffee_machines", "blenders", 
    "food_processors", "vacuum_cleaners", "carpet_cleaners", "air_purifiers", "dehumidifiers", 
    "humidifiers", "fans", "heaters", "air_conditioners", "generators", "lawn_mowers", 
    "trimmers", "chainsaws", "pressure_washers", "garden_tillers", "snow_blowers", "ladders",
    
    // Moda i akcesoria
    "formal_wear", "suits", "tuxedos", "dresses", "gowns", "wedding_dresses", "maternity_clothes", 
    "costumes", "uniforms", "designer_bags", "jewelry", "watches", "accessories", "footwear", 
    "ski_wear", "outdoor_clothing", "sports_clothing", "protective_clothing", "medical_uniforms",
    
    // Inne
    "other_rentals"
  ]).optional(),
  
  // Marki
  brand: z.enum([
    // Narzędzia i sprzęt
    "bosch", "makita", "dewalt", "milwaukee", "hilti", "metabo", "black_decker", "einhell", 
    "stihl", "husqvarna", "karcher", "alto", "nilfisk", "craftsman", "ryobi", "skil", "dremel", 
    "stanley", "ridgid", "festool", "hitachi", "worx", "flex", "fein", "atlas_copco", "honda", 
    "yamaha", "briggs_stratton", "kawasaki", "honda", "bomag", "wacker_neuson", "dynapac", 
    "cat", "jcb", "volvo", "komatsu", "liebherr", "doosan", "hyundai", "case", "bobcat", 
    "manitou", "genie", "haulotte", "jlg", "skyjack", "fiskars", "gardena", "weber", "napoleón",
    
    // Pojazdy
    "audi", "bmw", "citroen", "dacia", "fiat", "ford", "honda", "hyundai", "jaguar", "kia", 
    "lexus", "mazda", "mercedes", "mini", "mitsubishi", "nissan", "opel", "peugeot", "renault", 
    "seat", "skoda", "suzuki", "toyota", "volkswagen", "volvo", "harley_davidson", "yamaha", 
    "kawasaki", "honda_motorcycles", "suzuki_motorcycles", "ducati", "ktm", "triumph", "piaggio", 
    "vespa", "kymco", "trek", "specialized", "cannondale", "giant", "scott", "cube", "merida", 
    "kross", "romet", "bianchi", "ghost", "orbea", "raleigh", "schwinn", "focus", "haibike",
    
    // Elektronika i multimedia
    "canon", "nikon", "sony", "panasonic", "fujifilm", "olympus", "gopro", "dji", "rode", 
    "sennheiser", "shure", "zoom", "tascam", "jbl", "bose", "yamaha_audio", "roland", "korg", 
    "pioneer", "numark", "native_instruments", "technics", "denon", "mackie", "apple", "samsung", 
    "microsoft", "asus", "hp", "dell", "lenovo", "acer", "msi", "intel", "amd", "nvidia", 
    "benq", "lg", "philips", "epson", "logitech", "nintendo", "playstation", "xbox", "oculus",
    
    // Imprezy i rekreacja
    "stoly_krzesla", "wypozyczalnia_namiotow", "wypozyczalnia_stolow", "catering_rent", 
    "imprezowo", "rent_event", "all_party", "party_serwis", "snowshop", "ski_rent", "narty_wypozyczalnia", 
    "windsurfing_rent", "sailboarding_center", "water_equipment", "rower_wypozyczalnia", 
    "bike_center", "fit_rent", "active_rent", "turystyka_wypozyczalnia", "camping_rent",
    
    // Wypożyczalnie i marki lokalne
    "wypożyczalnia_kamaz", "wypożyczalnia_raf", "serwis_i_wynajem", "wynajmiemy_wszystko", 
    "castorama_wynajem", "leroy_merlin_wynajem", "obi_wypożyczalnia", "adecco", "randstad", 
    "manpower", "rent_a_car", "europcar", "hertz", "avis", "sixt", "enterprise", "budget", 
    "panek", "traficar", "express", "rentcars", "interrent", "rentis", "global_rent", "carrent", 
    "flexrent", "quick_rent", "europcar", "rent_center", "active_rent", "rent_all",
    
    // Inne
    "other"
  ]).optional(),
  
  // Cechy wynajmu
  rentalPeriod: z.enum([
    "hourly", "daily", "weekly", "monthly", "long_term", "weekend", "event", "seasonal", "custom"
  ]).optional(),
  
  minRentalPeriod: z.string().optional(),
  maxRentalPeriod: z.string().optional(),
  
  condition: z.enum([
    "new", "like_new", "very_good", "good", "acceptable", "well_maintained"
  ]).optional(),
  
  delivery: z.boolean().optional(),
  pickup: z.boolean().optional(),
  setup: z.boolean().optional(),
  instruction: z.boolean().optional(),
  operator: z.boolean().optional(),
  
  // Płatność i kaucja
  deposit: z.boolean().optional(),
  depositAmount: z.number().optional(),
  paymentMethod: z.enum([
    "cash", "card", "bank_transfer", "online_payment", "installments", "any"
  ]).optional(),
  
  // Inne
  insurance: z.boolean().optional(),
  availability: z.enum([
    "available_now", "available_from_date", "weekends_only", "weekdays_only", "by_appointment", "seasonal"
  ]).optional(),
  reservation: z.boolean().optional(),
  onlineBooking: z.boolean().optional(),
  quantity: z.number().optional(),
  location: z.string().optional(),
  rating: z.number().optional(),
});

// Filtry dla kategorii Noclegi
export const noclegiFilterSchema = z.object({
  ...commonFilterSchema.shape,
  
  // Kategorie
  category: z.enum([
    "hotel", "apartment", "house", "room", "hostel", "guest_house", "cottage", "villa", 
    "bungalow", "camping", "glamping", "farm_stay", "boat", "unusual", "other"
  ]).optional(),
  
  // Lokalizacja
  locationType: z.enum([
    "seaside", "mountains", "lake", "countryside", "forest", "city_center", "suburbs", 
    "historic_district", "beach_front", "ski_resort", "spa_resort", "golf_resort", 
    "business_district", "entertainment_district", "near_attraction", "isolated", "rural", "urban"
  ]).optional(),
  
  view: z.enum([
    "sea_view", "mountain_view", "lake_view", "garden_view", "city_view", "pool_view", 
    "park_view", "courtyard_view", "street_view", "forest_view", "panoramic", "no_view"
  ]).optional(),
  
  // Udogodnienia
  roomFacilities: z.array(z.enum([
    "private_bathroom", "air_conditioning", "heating", "tv", "wifi", "minibar", "refrigerator", 
    "microwave", "kitchen", "kitchenette", "coffee_machine", "kettle", "washing_machine", 
    "dryer", "iron", "hairdryer", "toiletries", "towels", "linens", "balcony", "terrace", 
    "seating_area", "desk", "dining_area", "wardrobe", "safe", "fireplace", "soundproofing", 
    "private_entrance", "private_pool", "jacuzzi", "bathtub", "shower", "bidet"
  ])).optional(),
  
  propertyFacilities: z.array(z.enum([
    "free_parking", "paid_parking", "pool", "indoor_pool", "outdoor_pool", "sauna", 
    "hot_tub", "spa", "fitness_center", "restaurant", "bar", "breakfast", "room_service", 
    "elevator", "terrace", "garden", "bbq", "playground", "games_room", "library", 
    "shared_lounge", "meeting_rooms", "business_center", "airport_shuttle", "bicycle_rental", 
    "car_rental", "laundry", "dry_cleaning", "ironing_service", "24h_reception", "security", 
    "concierge", "luggage_storage", "pet_facilities", "disability_friendly", "charging_station", 
    "ski_storage", "ski_to_door", "beach_access", "water_sports", "tennis", "golf", "hiking", 
    "cycling", "fishing", "horseback_riding", "windsurfing", "diving", "skiing"
  ])).optional(),
  
  mealOptions: z.array(z.enum([
    "breakfast_included", "breakfast_available", "lunch_available", "dinner_available", 
    "all_inclusive", "half_board", "full_board", "self_catering", "restaurant_on_site", 
    "room_service", "special_diet_menus", "bar", "minibar", "shared_kitchen"
  ])).optional(),
  
  // Cechy zakwaterowania
  roomType: z.enum([
    "single", "double", "twin", "triple", "quad", "family", "suite", "studio", 
    "apartment", "villa", "cottage", "bungalow", "dormitory", "tent", "caravan", "other"
  ]).optional(),
  
  bedType: z.array(z.enum([
    "single_bed", "double_bed", "twin_beds", "king_bed", "queen_bed", "sofa_bed", 
    "bunk_bed", "futon", "water_bed", "air_mattress", "crib", "extra_bed"
  ])).optional(),
  
  size: z.number().optional(),
  sizeUnit: z.enum(["m2", "ft2"]).optional(),
  
  maxOccupancy: z.number().optional(),
  minOccupancy: z.number().optional(),
  
  bedrooms: z.number().optional(),
  bathrooms: z.number().optional(),
  
  floor: z.number().optional(),
  totalFloors: z.number().optional(),
  
  // Reguły pobytu
  checkInFrom: z.string().optional(),
  checkInTo: z.string().optional(),
  checkOutFrom: z.string().optional(),
  checkOutTo: z.string().optional(),
  
  minStay: z.number().optional(),
  maxStay: z.number().optional(),
  
  smoking: z.enum(["allowed", "not_allowed", "designated_areas"]).optional(),
  parties: z.enum(["allowed", "not_allowed"]).optional(),
  pets: z.enum(["allowed", "not_allowed", "on_request"]).optional(),
  children: z.enum(["allowed", "not_allowed", "above_certain_age"]).optional(),
  childrenAge: z.number().optional(),
  
  // Dostępność i rezerwacja
  availabilityStart: z.string().optional(),
  availabilityEnd: z.string().optional(),
  
  instantBooking: z.boolean().optional(),
  freeCancellation: z.boolean().optional(),
  cancellationPeriod: z.number().optional(),
  
  // Ceny i oferty
  priceType: z.enum([
    "per_night", "per_person", "per_room", "per_apartment", "per_property", "per_week"
  ]).optional(),
  
  paymentOptions: z.array(z.enum([
    "credit_card", "debit_card", "bank_transfer", "cash", "paypal", "apple_pay", 
    "google_pay", "cryptocurrency", "advance_payment", "pay_at_property"
  ])).optional(),
  
  specialOffers: z.array(z.enum([
    "free_nights", "early_booking", "last_minute", "long_stay", "non_refundable", 
    "free_breakfast", "honeymoon", "seasonal_special", "weekend_deal", "weekday_deal", 
    "group_discount", "senior_discount", "student_discount", "military_discount"
  ])).optional(),
  
  // Informacje o gospodarzu/obiekcie
  hostType: z.enum([
    "professional", "individual", "company", "hotel_chain"
  ]).optional(),
  
  hostLanguages: z.array(z.enum([
    "polish", "english", "german", "french", "spanish", "italian", "russian", 
    "ukrainian", "czech", "slovak", "hungarian", "dutch", "portuguese", "chinese", 
    "japanese", "arabic", "turkish", "swedish", "norwegian", "danish", "finnish", "other"
  ])).optional(),
  
  propertyAge: z.enum([
    "new", "modern", "contemporary", "historic", "renovated", "traditional"
  ]).optional(),
  
  brand: z.enum([
    // Międzynarodowe sieci hotelowe
    "accor", "hilton", "marriott", "intercontinental", "radisson", "best_western", 
    "wyndham", "hyatt", "mercure", "ibis", "novotel", "holiday_inn", "sheraton", 
    "doubletree", "hampton", "days_inn", "ramada", "crowne_plaza", "nh_hotels", 
    "barcelo", "melia", "four_seasons", "ritz_carlton", "shangri_la", "mandarin_oriental", 
    "peninsula", "kempinski", "six_senses", "aman", "oberoi", "park_hyatt", "westin", 
    
    // Polskie sieci i obiekty
    "orbis", "gromada", "diament", "hotel_503", "focus_hotels", "arche_hotels", 
    "golden_tulip", "qubus", "green_hotel", "hotel_spa_dr_irena_eris", "manor_house", 
    "bukovina", "hotel_anders", "hotel_arka", "hotel_marina", "hotel_neptun", "hotel_nadmorski", 
    "hotel_krynica", "hotel_klimek", "hotel_bryza", "hotel_golebiewski", "hotel_zamek_ryn", 
    "hotel_zamek_gniew", "hotel_warmia_park", "hotel_spa_dolina_charlotty", "hotel_bania", 
    "hotel_nosalowy_dwor", "hotel_krasicki", "hotel_nikko", "hotel_farmona", "hotel_crocus", 
    "hotel_aquarion", "hotel_prezydent", "hotel_skal", "hotel_wodnik", "hotel_europa", 
    
    // Platformy rezerwacyjne
    "booking", "airbnb", "expedia", "hotels", "agoda", "trivago", "direct", "orbitz", 
    "travelocity", "tripadvisor", "homeaway", "vrbo", "9flats", "hometogo", "wimdu", 
    "traveloka", "hostelworld", "hotelopia", "noclegi24", "nocowanie", "e_turysta", 
    "meteor24", "travelist", "wakacje_pl", "tui", "itaka", "rainbow", "grecos", "coral", 
    "exim_tours", "biuro_podrozy", "neckermann", "sun_fun", "travelplanet", "fly_pl",
    
    // Inne
    "other"
  ]).optional(),
  
  // Oceny i recenzje
  rating: z.number().optional(),
  stars: z.number().optional(),
  reviewCount: z.number().optional(),
  superhost: z.boolean().optional(),
  verified: z.boolean().optional(),
  
  // Inne
  accessibility: z.array(z.enum([
    "wheelchair_accessible", "elevator", "ground_floor", "accessible_bathroom", "roll_in_shower", 
    "grab_rails", "raised_toilet", "lowered_sink", "shower_chair", "accessible_parking", 
    "accessible_entrance", "visual_aids", "auditory_aids", "allergy_friendly"
  ])).optional(),
  
  sustainability: z.array(z.enum([
    "eco_friendly", "energy_efficient", "water_saving", "renewable_energy", "recycling", 
    "organic_food", "local_products", "plastic_free", "green_certified", "carbon_neutral"
  ])).optional(),
  
  propertySize: z.number().optional(),
  distanceToCenter: z.number().optional(),
  distanceToBeach: z.number().optional(),
  distanceToAirport: z.number().optional(),
  distanceToPublicTransport: z.number().optional(),
  
  // Bezpieczeństwo
  safety: z.array(z.enum([
    "fire_extinguisher", "smoke_detector", "carbon_monoxide_detector", "first_aid_kit", 
    "fire_exit", "security_system", "doorman", "security_guard", "safe", "emergency_info", 
    "emergency_contact", "24h_reception", "health_safety_trained", "covid_measures"
  ])).optional(),
});

// Filtry dla kategorii Oddam za darmo
export const oddamZaDarmoFilterSchema = z.object({
  ...commonFilterSchema.shape,
  
  // Kategorie
  category: z.enum([
    "furniture", "electronics", "appliances", "clothing", "toys", "books", "music", 
    "movies", "games", "sports", "tools", "garden", "materials", "food", "pets", 
    "baby_items", "beauty", "health", "automotive", "hobby", "collectibles", 
    "instruments", "office", "tickets", "other"
  ]).optional(),
  
  // Cechy
  condition: z.enum([
    "like_new", "very_good", "good", "acceptable", "damaged", "for_parts"
  ]).optional(),
  
  completeness: z.enum([
    "complete", "missing_parts", "just_parts"
  ]).optional(),
  
  ageGroup: z.enum([
    "baby", "toddler", "children", "teenager", "adult", "senior", "all"
  ]).optional(),
  
  gender: z.enum([
    "men", "women", "boys", "girls", "unisex"
  ]).optional(),
  
  size: z.enum([
    "xxs", "xs", "s", "m", "l", "xl", "xxl", "xxxl", "other_size"
  ]).optional(),
  
  brand: z.string().optional(),
  model: z.string().optional(),
  
  // Wymiary i waga
  weight: z.number().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  depth: z.number().optional(),
  
  // Szczegóły ogłoszenia
  reason: z.enum([
    "moving", "cleaning_out", "no_longer_needed", "upgrading", "excess", "donation"
  ]).optional(),
  
  forCharity: z.boolean().optional(),
  quantity: z.number().optional(),
  
  // Odbiór i dostępność
  pickupMethod: z.enum([
    "pickup_only", "can_deliver", "shipping_possible", "meet_in_public"
  ]).optional(),
  
  pickupDays: z.array(z.enum([
    "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday", "weekdays", "weekends"
  ])).optional(),
  
  pickupHours: z.string().optional(),
  urgency: z.enum([
    "asap", "today", "this_week", "this_month", "no_rush"
  ]).optional(),
  
  reserved: z.boolean().optional(),
  
  // Wymagania
  requirements: z.array(z.enum([
    "must_take_all", "must_pickup_all", "must_pickup_today", "first_come_first_served", 
    "by_appointment", "for_those_in_need", "for_students", "for_families", "for_charity", 
    "pet_free_home", "smoke_free_home", "good_home_wanted"
  ])).optional(),
  
  // Inne
  pets: z.enum([
    "dog", "cat", "bird", "fish", "reptile", "rodent", "exotic", "farm_animal", "other_pet"
  ]).optional(),
  
  foodType: z.enum([
    "fresh", "packaged", "canned", "frozen", "baked", "homemade", "produce", "dairy", 
    "meat", "vegetarian", "vegan", "gluten_free", "organic", "baby_food", "pet_food"
  ]).optional(),
  
  plantType: z.enum([
    "indoor_plant", "outdoor_plant", "seeds", "cutting", "bulbs", "tree", "shrub", 
    "flower", "vegetable", "herb", "succulent", "cactus", "aquatic", "garden_plant"
  ]).optional(),
  
  materialType: z.enum([
    "wood", "metal", "plastic", "glass", "ceramic", "textile", "paper", "construction", 
    "art_supplies", "craft_supplies", "sewing", "yarn", "garden_supplies", "automotive_parts", 
    "electronic_parts", "mixed_materials"
  ]).optional(),
  
  bookType: z.enum([
    "fiction", "non_fiction", "textbook", "children", "comic", "cookbook", "travel", 
    "biography", "history", "science", "art", "self_help", "reference", "foreign_language", 
    "religious", "magazine", "audiobook", "vintage"
  ]).optional(),
  
  homeDelivery: z.boolean().optional(),
  contactMethod: z.enum([
    "comments", "private_message", "phone", "email", "sms", "website", "social_media"
  ]).optional(),
});

// Filtry dla kategorii Praca
export const pracaFilterSchema = z.object({
  ...commonFilterSchema.shape,
  
  // Cechy ogłoszenia
  jobType: z.enum([
    "full_time", "part_time", "contract", "temporary", "internship", "seasonal", 
    "project_based", "volunteer", "replacement", "probation"
  ]).optional(),
  
  category: z.enum([
    "it", "administration", "office", "finance", "accounting", "banking", "sales", 
    "marketing", "pr", "customer_service", "call_center", "human_resources", "education", 
    "training", "healthcare", "pharmacy", "medicine", "engineering", "construction", 
    "manufacturing", "production", "logistics", "transport", "warehouse", "retail", 
    "hospitality", "restaurant", "hotel", "tourism", "beauty", "fitness", "cleaning", 
    "security", "legal", "public_sector", "agriculture", "food_industry", "automotive", 
    "real_estate", "media", "design", "art", "science", "research", "energy", "environment", 
    "telecommunication", "insurance", "consulting", "management", "manual_labor", "other"
  ]).optional(),
  
  position: z.string().optional(),
  
  experienceLevel: z.enum([
    "entry", "junior", "mid", "senior", "expert", "manager", "director", "executive", "trainee", "any"
  ]).optional(),
  
  educationLevel: z.enum([
    "none", "primary", "secondary", "vocational", "bachelor", "master", "phd", "postdoc", 
    "mba", "certification", "license", "any"
  ]).optional(),
  
  // Wymagania
  skills: z.array(z.string()).optional(),
  certificates: z.array(z.string()).optional(),
  languages: z.array(z.object({
    language: z.enum([
      "polish", "english", "german", "french", "spanish", "italian", "russian", 
      "ukrainian", "czech", "slovak", "hungarian", "romanian", "bulgarian", "croatian", 
      "serbian", "dutch", "portuguese", "swedish", "norwegian", "danish", "finnish", 
      "estonian", "latvian", "lithuanian", "greek", "turkish", "arabic", "hebrew", 
      "chinese", "japanese", "korean", "vietnamese", "hindi", "other"
    ]),
    level: z.enum(["basic", "intermediate", "advanced", "fluent", "native", "any"])
  })).optional(),
  
  drivingLicense: z.array(z.enum([
    "a", "a1", "a2", "am", "b", "b1", "be", "c", "c1", "c1e", "ce", "d", "d1", "d1e", 
    "de", "t", "none"
  ])).optional(),
  
  // Warunki pracy
  schedule: z.enum([
    "standard", "flexible", "shifts", "weekends", "evenings", "nights", 
    "rotational", "on_call", "overtime"
  ]).optional(),
  
  remoteOption: z.enum([
    "on_site", "hybrid", "remote", "partially_remote", "flexible"
  ]).optional(),
  
  contractType: z.enum([
    "employment", "civil_contract", "b2b", "internship", "volunteer", "self_employment"
  ]).optional(),
  
  salaryType: z.enum([
    "hourly", "daily", "weekly", "monthly", "annual", "task_based", "commission", 
    "tips", "performance_based"
  ]).optional(),
  
  salaryFrom: z.number().optional(),
  salaryTo: z.number().optional(),
  salaryCurrency: z.enum(["pln", "eur", "usd", "gbp", "other"]).optional(),
  
  benefits: z.array(z.enum([
    "health_insurance", "life_insurance", "dental_insurance", "vision_insurance", 
    "retirement_plan", "pension", "bonuses", "profit_sharing", "stock_options", 
    "company_car", "fuel_card", "public_transport", "parking", "meal_allowance", 
    "food_vouchers", "gym_membership", "sports_card", "wellness_program", "private_healthcare", 
    "phone", "laptop", "home_office_allowance", "training", "conferences", "education_funding", 
    "language_courses", "childcare", "flexible_hours", "remote_work", "additional_vacation", 
    "sabbatical", "relocation_package", "accommodation", "company_events", "team_building", 
    "employee_discounts", "referral_program", "casual_dress", "pet_friendly", "game_room", 
    "free_snacks", "free_drinks", "free_lunch"
  ])).optional(),
  
  // Wystawiający
  employerType: z.enum([
    "company", "recruitment_agency", "headhunter", "individual", "governmental", 
    "non_profit", "startup", "corporation", "small_business", "self_employed", "other"
  ]).optional(),
  
  companySize: z.enum([
    "micro", "small", "medium", "large", "corporation", "startup"
  ]).optional(),
  
  industry: z.enum([
    "agriculture", "automotive", "banking", "construction", "consulting", "education", 
    "energy", "engineering", "entertainment", "finance", "food", "healthcare", "hospitality", 
    "insurance", "it", "legal", "logistics", "manufacturing", "marketing", "media", 
    "pharmaceutical", "real_estate", "retail", "sports", "technology", "telecommunications", 
    "tourism", "transportation", "other"
  ]).optional(),
  
  // Dodatkowe informacje
  applicationProcess: z.enum([
    "online", "email", "phone", "in_person", "mail", "agency", "referral"
  ]).optional(),
  
  applicationDeadline: z.string().optional(),
  
  startDate: z.enum([
    "immediately", "flexible", "specific_date", "after_recruitment", "to_be_discussed"
  ]).optional(),
  
  duration: z.enum([
    "temporary", "fixed_term", "permanent", "indefinite", "project_based", "seasonal"
  ]).optional(),
  
  featured: z.boolean().optional(),
  urgent: z.boolean().optional(),
  
  // Dodatkowe filtry
  postedBy: z.enum([
    "employer", "agency", "headhunter", "individual"
  ]).optional(),
  
  ageRequirement: z.enum([
    "18_plus", "21_plus", "no_requirement"
  ]).optional(),
  
  disability: z.enum([
    "friendly", "dedicated", "not_specified"
  ]).optional(),
  
  travel: z.enum([
    "none", "occasional", "frequent", "constant"
  ]).optional(),
  
  relocation: z.enum([
    "required", "optional", "assistance", "none"
  ]).optional(),
});

// Filtry dla kategorii Muzyka i Edukacja
export const muzykaEdukacjaFilterSchema = z.object({
  ...commonFilterSchema.shape,
  
  // Kategorie
  category: z.enum([
    "instruments", "music_accessories", "vinyl_records", "cds", "music_lessons",
    "textbooks", "educational_books", "courses", "educational_toys", "language_learning",
    "tutoring", "scientific_equipment", "school_supplies", "educational_software", "other"
  ]).optional(),
  
  // Instrumenty muzyczne i sprzęt
  instrumentType: z.enum([
    // Instrumenty strunowe
    "acoustic_guitar", "electric_guitar", "bass_guitar", "ukulele", "violin", "viola", 
    "cello", "double_bass", "mandolin", "banjo", "harp", "other_string",
    
    // Instrumenty klawiszowe
    "piano", "keyboard", "synthesizer", "organ", "accordion", "other_keyboard",
    
    // Instrumenty dęte
    "saxophone", "trumpet", "trombone", "flute", "clarinet", "oboe", "bassoon",
    "harmonica", "recorder", "other_wind",
    
    // Instrumenty perkusyjne
    "drum_kit", "electronic_drums", "cajon", "bongos", "congas", "cymbals",
    "tambourine", "xylophone", "marimba", "other_percussion",
    
    // Inne
    "other_instrument"
  ]).optional(),
  
  // Sprzęt audio i nagrywanie
  audioEquipment: z.enum([
    "amplifiers", "speakers", "microphones", "audio_interfaces", "mixers",
    "headphones", "cables", "midi_controllers", "dj_equipment", "other_audio"
  ]).optional(),
  
  // Materiały edukacyjne
  educationalLevel: z.enum([
    "preschool", "primary", "middle_school", "high_school", "college", 
    "university", "vocational", "adult_learning", "professional", "other_level"
  ]).optional(),
  
  subject: z.enum([
    "math", "physics", "chemistry", "biology", "history", "geography", "literature",
    "language", "music_theory", "arts", "computer_science", "economics", "law",
    "medicine", "psychology", "sociology", "philosophy", "other_subject"
  ]).optional(),
  
  language: z.enum([
    "polish", "english", "german", "french", "spanish", "italian", "russian",
    "ukrainian", "czech", "swedish", "norwegian", "japanese", "chinese", 
    "arabic", "latin", "other_language"
  ]).optional(),
  
  // Marki i wydawnictwa
  brand: z.enum([
    // Instrumenty muzyczne
    "yamaha", "fender", "gibson", "ibanez", "roland", "korg", "casio", "shure", 
    "marshall", "esp", "prs", "epiphone", "meinl", "zildjian", "tama", "pearl", 
    "line6", "takamine", "gretsch", "ludwig", "mapex", "sabian", "schecter", 
    "jackson", "sennheiser", "beyerdynamic", "akg", "nord", "focusrite",
    "presonus", "native_instruments", "boss", "zoom", "vox", "laney", "ampeg",
    
    // Wydawnictwa edukacyjne i muzyczne
    "pwn", "wsip", "nowa_era", "operon", "pearson", "oxford", "cambridge", 
    "macmillan", "longman", "helion", "onepress", "harmonia", "universal_music",
    "warner_music", "sony_music", "nuclear_blast", "century_media", "mystic", 
    "metal_mind", "kayax", "agora", "sp_records", "koch", "polskie_nagrania",
    
    // Płyty winylowe i CD
    "cd_action", "empik", "muzyczny", "rockmetalshop", "sound_garden", 
    "winylownia", "musicspot", "audiofilbazar", "winyl_market",
    
    // Sprzęt edukacyjny
    "fisher_price", "vtech", "trefl", "egmont", "alexander", "hasbro", "mattel",
    "bright_starts", "baby_einstein", "national_geographic", "discovery", "edurom",
    "young_digital_planet", "lego_education", "texas_instruments", "casio_calculators",
    
    // Inne
    "other"
  ]).optional(),
  
  // Cechy produktu
  condition: z.enum(["new", "very_good", "good", "acceptable", "for_parts"]).optional(),
  yearFrom: z.number().optional(),
  yearTo: z.number().optional(),
  edition: z.enum(["first", "limited", "special", "anniversary", "regular", "other"]).optional(),
  certification: z.boolean().optional(),
  authenticated: z.boolean().optional(),
  
  // Opcje sprzedaży
  lessonOption: z.boolean().optional(),
  onlineOption: z.boolean().optional(),
  rental: z.boolean().optional(),
  warranty: z.boolean().optional(),
});

// Mapa filtrów według kategorii
export const categoryFilters: Record<string, any> = {
  "Motoryzacja": motoryzacjaFilterSchema,
  "Nieruchomości": nieruchomosciFilterSchema,
  "Elektronika": elektronikaFilterSchema,
  "Moda": modaFilterSchema,
  "Dom i Ogród": domOgrodFilterSchema,
  "Rolnictwo": rolnictwoFilterSchema,
  "Sport i Hobby": sportHobbyFilterSchema,
  "Dla Dzieci": dlaDzieciFilterSchema,
  "Muzyka i Edukacja": muzykaEdukacjaFilterSchema,
  "Antyki i Kolekcje": antykiKolekcjeFilterSchema,
  "Zdrowie i Uroda": zdrowieUrodaFilterSchema,
  "Zwierzęta": zwierzetaFilterSchema,
  "Firma i Przemysł": firmaPrzemyslFilterSchema,
  "Usługi": uslugiFilterSchema,
  "Wypożyczalnia": wypozyczalniaFilterSchema,
  "Noclegi": noclegiFilterSchema,
  "Oddam za darmo": oddamZaDarmoFilterSchema,
  "Praca": pracaFilterSchema,
};

// Funkcja zwracająca filtry dla danej kategorii
export function getFiltersForCategory(categoryName: string) {
  return categoryFilters[categoryName] || commonFilterSchema;
}

// Tłumaczenia dla filtrów
export const filterTranslations = {
  // Ogólne
  "condition": {
    en: "Condition",
    pl: "Stan"
  },
  "condition.new": {
    en: "New",
    pl: "Nowy"
  },
  "condition.used": {
    en: "Used",
    pl: "Używany"
  },
  "condition.damaged": {
    en: "Damaged",
    pl: "Uszkodzony"
  },
  "deliveryOptions": {
    en: "Delivery Options",
    pl: "Opcje dostawy"
  },
  "deliveryOptions.shipping": {
    en: "Shipping",
    pl: "Wysyłka"
  },
  "deliveryOptions.pickup": {
    en: "Pickup",
    pl: "Odbiór osobisty"
  },
  "deliveryOptions.meeting": {
    en: "Meeting",
    pl: "Spotkanie"
  },
  "sellerType": {
    en: "Seller Type",
    pl: "Typ sprzedawcy"
  },
  "sellerType.private": {
    en: "Private",
    pl: "Prywatny"
  },
  "sellerType.business": {
    en: "Business",
    pl: "Firma"
  },
  
  // Motoryzacja
  "brand": {
    en: "Brand",
    pl: "Marka"
  },
  "model": {
    en: "Model",
    pl: "Model"
  },
  "yearFrom": {
    en: "Year from",
    pl: "Rok od"
  },
  "yearTo": {
    en: "Year to",
    pl: "Rok do"
  },
  "mileageFrom": {
    en: "Mileage from",
    pl: "Przebieg od"
  },
  "mileageTo": {
    en: "Mileage to",
    pl: "Przebieg do"
  },
  "fuelType": {
    en: "Fuel Type",
    pl: "Rodzaj paliwa"
  },
  "fuelType.petrol": {
    en: "Petrol",
    pl: "Benzyna"
  },
  "fuelType.diesel": {
    en: "Diesel",
    pl: "Diesel"
  },
  "fuelType.electric": {
    en: "Electric",
    pl: "Elektryczny"
  },
  "fuelType.hybrid": {
    en: "Hybrid",
    pl: "Hybryda"
  },
  "fuelType.lpg": {
    en: "LPG",
    pl: "LPG"
  },
  "fuelType.other": {
    en: "Other",
    pl: "Inny"
  },
  
  // Nieruchomości
  "type": {
    en: "Type",
    pl: "Typ"
  },
  "type.apartment": {
    en: "Apartment",
    pl: "Mieszkanie"
  },
  "type.house": {
    en: "House",
    pl: "Dom"
  },
  "type.room": {
    en: "Room",
    pl: "Pokój"
  },
  "type.plot": {
    en: "Plot",
    pl: "Działka"
  },
  "type.garage": {
    en: "Garage",
    pl: "Garaż"
  },
  "type.commercial": {
    en: "Commercial",
    pl: "Komercyjne"
  },
  "areaFrom": {
    en: "Area from",
    pl: "Powierzchnia od"
  },
  "areaTo": {
    en: "Area to",
    pl: "Powierzchnia do"
  },
  "rooms": {
    en: "Rooms",
    pl: "Liczba pokoi"
  },
  
  // Elektronika
  "category": {
    en: "Category",
    pl: "Kategoria"
  },
  "category.smartphones": {
    en: "Smartphones",
    pl: "Smartfony"
  },
  "category.computers": {
    en: "Computers",
    pl: "Komputery"
  }
};