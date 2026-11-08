import React, { useState } from 'react';
import {
  Heart,
  Droplets,
  Calendar,
  Plus,
  Trash2,
  CheckCircle2,
  Flame,
  AlertCircle,
  Clock,
  Sparkles,
} from 'lucide-react';
import {
  DailyCheckin,
  MoodType,
  CravingType,
  PainLevel,
  PainLocation,
  EnergyLevel,
  BloatingLevel,
  MealType,
  EatenFoodLog,
} from '../types';
import { PANTRY_INGREDIENT_OPTIONS, COMMON_FOOD_DATABASE } from '../data/nutritionDatabase';
import { TRANSLATIONS } from '../data/translations';

interface DailyCheckinSectionProps {
  checkinData: DailyCheckin;
  onSaveCheckin: (updated: DailyCheckin) => void;
  language: 'en' | 'ur';
  lastPeriodDate: string;
  setLastPeriodDate: (val: string) => void;
  cycleLength: number;
  setCycleLength: (val: number) => void;
  periodDuration: number;
  setPeriodDuration: (val: number) => void;
}

export const DailyCheckinSection: React.FC<DailyCheckinSectionProps> = ({
  checkinData,
  onSaveCheckin,
  language,
  lastPeriodDate,
  setLastPeriodDate,
  cycleLength,
  setCycleLength,
  periodDuration,
  setPeriodDuration,
}) => {
  const isUrdu = language === 'ur';
  const t = TRANSLATIONS[language].checkin;

  // Local editable draft
  const [mood, setMood] = useState<MoodType>(checkinData.mood);
  const [craving, setCraving] = useState<CravingType>(checkinData.craving);
  const [painLevel, setPainLevel] = useState<PainLevel>(checkinData.painLevel);
  const [painLocation, setPainLocation] = useState<PainLocation>(checkinData.painLocation);
  const [energy, setEnergy] = useState<EnergyLevel>(checkinData.energy);
  const [bloating, setBloating] = useState<BloatingLevel>(checkinData.bloating);
  const [mealTiming, setMealTiming] = useState<MealType>(checkinData.mealTiming);
  const [waterGlasses, setWaterGlasses] = useState<number>(checkinData.waterGlasses);
  const [availableIngredients, setAvailableIngredients] = useState<string[]>(
    checkinData.availableIngredients
  );
  const [customIngredient, setCustomIngredient] = useState('');
  const [foodsEaten, setFoodsEaten] = useState<EatenFoodLog[]>(checkinData.foodsEatenToday);
  const [selectedFoodId, setSelectedFoodId] = useState(COMMON_FOOD_DATABASE[0].id);
  const [foodQuantity, setFoodQuantity] = useState(1);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Toggle available pantry ingredient
  const toggleIngredient = (id: string) => {
    if (availableIngredients.includes(id)) {
      setAvailableIngredients(availableIngredients.filter((i) => i !== id));
    } else {
      setAvailableIngredients([...availableIngredients, id]);
    }
  };

  const handleAddCustomIngredient = () => {
    if (customIngredient.trim()) {
      setAvailableIngredients([...availableIngredients, customIngredient.trim().toLowerCase()]);
      setCustomIngredient('');
    }
  };

  // Add food eaten today
  const handleAddFood = () => {
    const food = COMMON_FOOD_DATABASE.find((f) => f.id === selectedFoodId);
    if (!food) return;

    const newLog: EatenFoodLog = {
      id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
      foodId: food.id,
      name: food.name,
      urduName: food.urduName,
      quantity: Number(foodQuantity),
      servingDesc: food.servingDesc,
      nutrients: food.nutrients,
    };

    setFoodsEaten([...foodsEaten, newLog]);
  };

  const handleRemoveFood = (logId: string) => {
    setFoodsEaten(foodsEaten.filter((f) => f.id !== logId));
  };

  // Save full checkin
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: DailyCheckin = {
      ...checkinData,
      mood,
      craving,
      painLevel,
      painLocation,
      energy,
      bloating,
      mealTiming,
      waterGlasses,
      availableIngredients,
      foodsEatenToday: foodsEaten,
    };
    onSaveCheckin(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <section className="bg-white border border-[#E8DEC8] rounded-2xl p-5 sm:p-8 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#F0EAE1] gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-[#C4677E] font-semibold">
            {isUrdu ? 'روزانہ کی صحت کا انتظام' : 'Personalized Daily Check-in'}
          </span>
          <h2 className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#4A2234] mt-0.5">
            {t.title}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">{t.subtitle}</p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-medium animate-fade-in shrink-0">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{isUrdu ? 'تجاویز اپ ڈیٹ ہوگئیں!' : 'Insights Updated!'}</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-8">
        {/* Step 1: Cycle Calibration */}
        <div className="bg-[#FAF7F2] p-4 sm:p-5 rounded-xl border border-[#EDE4D5]">
          <div className="flex items-center gap-2 mb-3 text-[#4A2234]">
            <Calendar className="w-4 h-4 text-[#C4677E]" />
            <h3 className="text-sm font-semibold">{t.cycleInfo}</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                {t.lastPeriodDate}
              </label>
              <input
                type="date"
                value={lastPeriodDate}
                onChange={(e) => setLastPeriodDate(e.target.value)}
                className="w-full text-xs sm:text-sm px-3 py-2 bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-[#C4677E] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                {t.cycleLengthPrompt}
              </label>
              <input
                type="number"
                min="21"
                max="45"
                value={cycleLength}
                onChange={(e) => setCycleLength(Number(e.target.value))}
                className="w-full text-xs sm:text-sm px-3 py-2 bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-[#C4677E] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                {t.periodDurationPrompt}
              </label>
              <input
                type="number"
                min="2"
                max="10"
                value={periodDuration}
                onChange={(e) => setPeriodDuration(Number(e.target.value))}
                className="w-full text-xs sm:text-sm px-3 py-2 bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-[#C4677E] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Step 2: Mood and Craving */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Mood selection */}
          <div>
            <label className="block text-xs font-semibold text-[#4A2234] mb-2.5">
              {t.mood}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {(
                [
                  'happy',
                  'calm',
                  'tired',
                  'anxious',
                  'irritable',
                  'low',
                  'energetic',
                ] as MoodType[]
              ).map((m) => (
                <button
                  type="button"
                  key={m}
                  onClick={() => setMood(m)}
                  className={`text-left p-2.5 rounded-lg border text-xs font-medium transition-all ${
                    mood === m
                      ? 'border-[#C4677E] bg-[#FAF0F2] text-[#4A2234] shadow-xs'
                      : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                  }`}
                >
                  {t.moods[m]}
                </button>
              ))}
            </div>
          </div>

          {/* Craving selection */}
          <div>
            <label className="block text-xs font-semibold text-[#4A2234] mb-2.5">
              {t.craving}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {(
                ['sweet', 'spicy', 'salty', 'savory', 'comfort', 'none'] as CravingType[]
              ).map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setCraving(c)}
                  className={`text-left p-2.5 rounded-lg border text-xs font-medium transition-all ${
                    craving === c
                      ? 'border-[#DDA15E] bg-[#FFF8EE] text-[#7A4B1A] shadow-xs'
                      : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                  }`}
                >
                  {t.cravings[c]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Step 3: Physical Discomfort, Bloating & Energy */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-[#F0EAE1]">
          {/* Pain Level */}
          <div>
            <label className="block text-xs font-semibold text-[#4A2234] mb-1.5">
              {t.pain}
            </label>
            <div className="space-y-1.5">
              {(['none', 'mild', 'moderate', 'severe'] as PainLevel[]).map((lvl) => (
                <button
                  type="button"
                  key={lvl}
                  onClick={() => setPainLevel(lvl)}
                  className={`w-full text-left px-3 py-2 text-xs rounded-lg border transition-colors ${
                    painLevel === lvl
                      ? 'border-[#C4677E] bg-[#FAF0F2] text-[#4A2234] font-medium'
                      : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  {t.painLevels[lvl]}
                </button>
              ))}
            </div>
          </div>

          {/* Pain Location */}
          <div>
            <label className="block text-xs font-semibold text-[#4A2234] mb-1.5">
              {t.painLocation}
            </label>
            <div className="space-y-1.5">
              {(
                [
                  'none',
                  'lower_abdomen',
                  'lower_back',
                  'headache',
                  'breasts',
                  'pelvic',
                ] as PainLocation[]
              ).map((loc) => (
                <button
                  type="button"
                  key={loc}
                  onClick={() => setPainLocation(loc)}
                  className={`w-full text-left px-3 py-2 text-xs rounded-lg border transition-colors ${
                    painLocation === loc
                      ? 'border-[#7A9A7B] bg-[#F1F6F1] text-emerald-900 font-medium'
                      : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  {t.painLocations[loc]}
                </button>
              ))}
            </div>
          </div>

          {/* Bloating & Energy */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#4A2234] mb-1.5">
                {t.bloating}
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {(['none', 'mild', 'moderate', 'severe'] as BloatingLevel[]).map((b) => (
                  <button
                    type="button"
                    key={b}
                    onClick={() => setBloating(b)}
                    className={`text-center px-2 py-1.5 text-xs rounded-lg border transition-colors ${
                      bloating === b
                        ? 'border-[#C4677E] bg-[#FAF0F2] text-[#4A2234] font-medium'
                        : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    {t.bloatingLevels[b]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#4A2234] mb-1.5">
                {t.energy}
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {(['low', 'moderate', 'high'] as EnergyLevel[]).map((en) => (
                  <button
                    type="button"
                    key={en}
                    onClick={() => setEnergy(en)}
                    className={`text-center px-2 py-1.5 text-xs rounded-lg border transition-colors ${
                      energy === en
                        ? 'border-[#DDA15E] bg-[#FFF8EE] text-[#7A4B1A] font-medium'
                        : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    {t.energies[en]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Step 4: Meal Timing & Water Intake */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#F0EAE1]">
          <div>
            <label className="block text-xs font-semibold text-[#4A2234] mb-2">
              {t.mealPlanningFor}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['breakfast', 'lunch', 'dinner', 'snack'] as MealType[]).map((m) => (
                <button
                  type="button"
                  key={m}
                  onClick={() => setMealTiming(m)}
                  className={`py-2 text-xs rounded-lg border text-center font-medium transition-colors ${
                    mealTiming === m
                      ? 'border-[#4A2234] bg-[#4A2234] text-white shadow-xs'
                      : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  {t.meals[m]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#4A2234] mb-2">
              {t.waterIntake}
            </label>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-[#FAF7F2] p-1.5 rounded-lg border border-[#EDE4D5]">
                <button
                  type="button"
                  onClick={() => setWaterGlasses(Math.max(0, waterGlasses - 1))}
                  className="w-7 h-7 rounded-md bg-white border border-stone-300 text-stone-700 flex items-center justify-center font-bold hover:bg-stone-50"
                >
                  -
                </button>
                <div className="flex items-center gap-1.5 px-3">
                  <Droplets className="w-4 h-4 text-sky-500" />
                  <span className="text-sm font-bold text-stone-800">{waterGlasses}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setWaterGlasses(waterGlasses + 1)}
                  className="w-7 h-7 rounded-md bg-white border border-stone-300 text-stone-700 flex items-center justify-center font-bold hover:bg-stone-50"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-stone-500">{t.glasses}</span>
            </div>
          </div>
        </div>

        {/* Step 5: Available Kitchen Ingredients */}
        <div className="pt-4 border-t border-[#F0EAE1]">
          <div className="mb-2">
            <h4 className="text-xs font-semibold text-[#4A2234] uppercase tracking-wider">
              {t.availableIngredients}
            </h4>
            <p className="text-xs text-stone-500 mt-0.5">{t.availableIngredientsDesc}</p>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            {PANTRY_INGREDIENT_OPTIONS.map((item) => {
              const selected = availableIngredients.includes(item.id);
              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => toggleIngredient(item.id)}
                  className={`px-3 py-1.5 text-xs rounded-lg transition-colors border ${
                    selected
                      ? 'border-[#7A9A7B] bg-[#EEF5EE] text-emerald-900 font-medium'
                      : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
                  }`}
                >
                  {isUrdu ? item.urdu : item.label} {selected && '✓'}
                </button>
              );
            })}
          </div>

          {/* Add custom item */}
          <div className="flex items-center gap-2 mt-3 max-w-sm">
            <input
              type="text"
              placeholder={isUrdu ? 'کوئی اور چیز شامل کریں...' : 'Add other ingredient (e.g. methi, walnuts)...'}
              value={customIngredient}
              onChange={(e) => setCustomIngredient(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddCustomIngredient();
                }
              }}
              className="flex-1 text-xs px-3 py-2 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C4677E]"
            />
            <button
              type="button"
              onClick={handleAddCustomIngredient}
              className="px-3 py-2 text-xs font-medium bg-stone-100 text-stone-700 rounded-lg hover:bg-stone-200 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Step 6: Food Eaten Today (Live Nutrition Log) */}
        <div className="pt-4 border-t border-[#F0EAE1]">
          <div className="mb-2">
            <h4 className="text-xs font-semibold text-[#4A2234] uppercase tracking-wider">
              {t.foodEatenToday}
            </h4>
            <p className="text-xs text-stone-500 mt-0.5">{t.foodEatenTodayDesc}</p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-3">
            <select
              value={selectedFoodId}
              onChange={(e) => setSelectedFoodId(e.target.value)}
              className="flex-1 text-xs sm:text-sm px-3 py-2 bg-white border border-stone-300 rounded-lg focus:outline-none"
            >
              {COMMON_FOOD_DATABASE.map((f) => (
                <option key={f.id} value={f.id}>
                  {isUrdu ? f.urduName : f.name} — ({f.servingDesc})
                </option>
              ))}
            </select>

            <div className="flex items-center gap-2">
              <label className="text-xs text-stone-600 whitespace-nowrap">
                {isUrdu ? 'مقدار:' : 'Portion:'}
              </label>
              <input
                type="number"
                min="0.5"
                max="10"
                step="0.5"
                value={foodQuantity}
                onChange={(e) => setFoodQuantity(Number(e.target.value))}
                className="w-16 text-xs sm:text-sm px-2 py-2 bg-white border border-stone-300 rounded-lg focus:outline-none text-center"
              />
              <button
                type="button"
                onClick={handleAddFood}
                className="px-3.5 py-2 text-xs font-medium text-white bg-[#4A2234] hover:bg-[#381926] rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t.addFood}</span>
              </button>
            </div>
          </div>

          {/* List of currently logged foods */}
          {foodsEaten.length > 0 && (
            <div className="mt-4 divide-y divide-stone-100 border border-stone-200 rounded-xl overflow-hidden bg-[#FAF7F2]">
              {foodsEaten.map((f) => (
                <div key={f.id} className="p-3 flex items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-semibold text-stone-800">
                      {isUrdu ? f.urduName : f.name}
                    </span>{' '}
                    <span className="text-stone-500">
                      (× {f.quantity} {f.servingDesc})
                    </span>
                    <div className="text-[11px] text-stone-500 mt-0.5">
                      {Math.round(f.nutrients.calories * f.quantity)} kcal ·{' '}
                      {(f.nutrients.protein * f.quantity).toFixed(1)}g Protein ·{' '}
                      {(f.nutrients.iron * f.quantity).toFixed(1)}mg Iron
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveFood(f.id)}
                    className="p-1.5 text-stone-400 hover:text-rose-600 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-6 border-t border-[#F0EAE1] flex justify-end">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-white bg-[#C4677E] hover:bg-[#B3566D] rounded-xl shadow-sm transition-transform active:scale-98 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{t.submitCheckin}</span>
          </button>
        </div>
      </form>
    </section>
  );
};
