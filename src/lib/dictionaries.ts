import 'server-only';

// Define Locale type consistently
type Locale = 'en' | 'ro';

// Define a type for the dictionary structure (optional but good practice)
// You can expand this type as you add more keys to your JSON files
interface Dictionary {
  lineupPage: {
    title: string;
    description: string;
    friday: string;
    saturday: string;
    comingSoonFriday: string;
    comingSoonSaturday: string;
    comingSoonFull: string;
  };
  header: {
    home: string;
    lineup: string;
    tickets: string;
  };
  // Add other top-level keys here
}

// Define the dictionaries object using Record for type safety
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  ro: () => import('@/dictionaries/ro.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  // Fallback to 'en' if the locale is not found (or handle error as needed)
  const loader = dictionaries[locale] || dictionaries.en;
  return loader();
}; 