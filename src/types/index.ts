export type CyclePhase = 'menstrual' | 'follicular' | 'ovulatory' | 'luteal';

export type MoodType = 'happy' | 'calm' | 'tired' | 'anxious' | 'irritable' | 'low' | 'energetic';

export type CravingType = 'sweet' | 'spicy' | 'salty' | 'savory' | 'comfort' | 'none';

export type PainLevel = 'none' | 'mild' | 'moderate' | 'severe';

export type PainLocation = 'lower_abdomen' | 'lower_back' | 'breasts' | 'headache' | 'pelvic' | 'none';

export type EnergyLevel = 'low' | 'moderate' | 'high';

export type BloatingLevel = 'none' | 'mild' | 'moderate' | 'severe';

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export type DietaryPreference = 'all' | 'halal' | 'vegetarian' | 'vegan' | 'gluten_free' | 'dairy_free';

export interface NutrientBreakdown {
  calories: number;
  protein: number; // grams
  carbs: number; // grams
  fat: number; // grams
  fiber: number; // grams
  iron: number; // mg (RDA: ~18mg for menstruating individuals)
  calcium: number; // mg (RDA: ~1000mg)
  magnesium: number; // mg (RDA: ~320mg)
  potassium: number; // mg (RDA: ~2600mg)
  zinc: number; // mg (RDA: ~8-11mg)
  vitaminB6?: number; // mg (RDA: ~1.3-1.7mg)
  folate?: number; // mcg (RDA: ~400mcg)
}

export interface FoodItem {
  id: string;
  name: string;
  urduName: string;
  category: 'grain' | 'protein' | 'dairy' | 'vegetable' | 'fruit' | 'fat' | 'beverage';
  servingDesc: string;
  nutrients: NutrientBreakdown;
}

export interface MealRecommendation {
  id: string;
  title: string;
  urduTitle: string;
  tagline: string;
  urduTagline: string;
  phase: CyclePhase;
  cravingMatch: CravingType[];
  mealType: MealType[];
  cuisine: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  image: string;
  ingredients: {
    name: string;
    urduName: string;
    amount: string;
    inPantry?: boolean;
    substituteNote?: string;
  }[];
  instructions: string[];
  urduInstructions: string[];
  substitutions: {
    original: string;
    replacement: string;
    reason: string;
  }[];
  nutrients: NutrientBreakdown;
  whyThisMeal: {
    title: string;
    urduTitle: string;
    description: string;
    urduDescription: string;
  }[];
  phaseBenefits: string;
  urduPhaseBenefits: string;
}

export interface EatenFoodLog {
  id: string;
  foodId: string;
  name: string;
  urduName: string;
  quantity: number; // multiplier of serving
  servingDesc: string;
  nutrients: NutrientBreakdown;
}

export interface DailyCheckin {
  id: string;
  date: string;
  cycleDay: number;
  phase: CyclePhase;
  mood: MoodType;
  craving: CravingType;
  painLevel: PainLevel;
  painLocation: PainLocation;
  energy: EnergyLevel;
  bloating: BloatingLevel;
  sleepHours: number;
  waterGlasses: number;
  mealTiming: MealType;
  availableIngredients: string[];
  foodsEatenToday: EatenFoodLog[];
  notes?: string;
}

export interface GroceryStore {
  id: string;
  name: string;
  category: 'Organic & Health' | 'Supermarket' | 'Local Grocer & Spice Bazaar' | 'Halal Market';
  address: string;
  city: string;
  distanceKm: number;
  phone: string;
  hours: string;
  rating: number;
  inStockIngredients: string[];
  deliveryAvailable: boolean;
}

export interface UserProfile {
  name: string;
  age: number;
  lastPeriodDate: string; // YYYY-MM-DD
  cycleLength: number; // e.g. 28 days
  periodDuration: number; // e.g. 5 days
  dietaryPreference: DietaryPreference;
  allergies: string[];
  healthConditions: string[];
  isPremium: boolean;
  language: 'en' | 'ur';
}
