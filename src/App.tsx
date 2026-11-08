import React, { useState, useMemo } from 'react';
import {
  Heart,
  Droplets,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Activity,
  MapPin,
  ChevronRight,
  RefreshCw,
  FileText,
  Clock,
  Flame,
  Award,
} from 'lucide-react';
import { Header } from './components/Header';
import { CycleRing } from './components/CycleRing';
import { DailyCheckinSection } from './components/DailyCheckinSection';
import { MealRecommendationCard } from './components/MealRecommendationCard';
import { NutritionDashboard } from './components/NutritionDashboard';
import { BodyInsights } from './components/BodyInsights';
import { NearbyStores } from './components/NearbyStores';
import { LearnLibrary } from './components/LearnLibrary';
import { ClinicalReportModal } from './components/ClinicalReportModal';
import { MEAL_PRESETS } from './data/mealPresets';
import { COMMON_FOOD_DATABASE } from './data/nutritionDatabase';
import { calculateCycleState } from './utils/cycleEngine';
import {
  DailyCheckin,
  UserProfile,
  MealRecommendation,
  CyclePhase,
} from './types';
import { TRANSLATIONS } from './data/translations';

export default function App() {
  const [language, setLanguage] = useState<'en' | 'ur'>('en');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isPremium, setIsPremium] = useState<boolean>(true);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);

  // User cycle settings: Default to 3 days ago to demo the active Menstrual phase
  const today = new Date();
  const defaultLastPeriod = new Date(today);
  defaultLastPeriod.setDate(today.getDate() - 3);
  const defaultLastPeriodStr = defaultLastPeriod.toISOString().split('T')[0];

  const [lastPeriodDate, setLastPeriodDate] = useState<string>(defaultLastPeriodStr);
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [periodDuration, setPeriodDuration] = useState<number>(5);

  // User profile
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Aamina',
    age: 26,
    lastPeriodDate,
    cycleLength,
    periodDuration,
    dietaryPreference: 'halal',
    allergies: [],
    healthConditions: [],
    isPremium,
    language,
  });

  // Calculate live cycle state
  const cycleState = useMemo(() => {
    return calculateCycleState(lastPeriodDate, cycleLength, periodDuration);
  }, [lastPeriodDate, cycleLength, periodDuration]);

  // Initial Daily Check-in state
  const [checkinData, setCheckinData] = useState<DailyCheckin>({
    id: 'checkin_today',
    date: today.toISOString().split('T')[0],
    cycleDay: cycleState.currentCycleDay,
    phase: cycleState.phase,
    mood: 'tired',
    craving: 'savory',
    painLevel: 'mild',
    painLocation: 'lower_abdomen',
    energy: 'low',
    bloating: 'mild',
    sleepHours: 7,
    waterGlasses: 5,
    mealTiming: 'lunch',
    availableIngredients: [
      'chicken',
      'spinach',
      'rice',
      'yogurt_dahi',
      'ginger',
      'turmeric',
      'chickpeas',
    ],
    foodsEatenToday: [
      {
        id: 'log_1',
        foodId: 'chapati_wheat',
        name: 'Whole Wheat Chapati / Roti',
        urduName: 'گندم کی روٹی / چپاتی',
        quantity: 2,
        servingDesc: '1 medium',
        nutrients: COMMON_FOOD_DATABASE[0].nutrients,
      },
      {
        id: 'log_2',
        foodId: 'egg_omelette',
        name: 'Desi Herb Omelette',
        urduName: 'دیسی انڈے کا آملیٹ',
        quantity: 1,
        servingDesc: '1 egg with herbs',
        nutrients: COMMON_FOOD_DATABASE[4].nutrients,
      },
      {
        id: 'log_3',
        foodId: 'masala_chai',
        name: 'Ginger Cardamom Chai',
        urduName: 'ادرک اور الائچی والی چائے',
        quantity: 1,
        servingDesc: '1 teacup',
        nutrients: COMMON_FOOD_DATABASE[17].nutrients,
      },
    ],
  });

  // Active meal index for alternative cycling
  const [mealAlternativeOffset, setMealAlternativeOffset] = useState<number>(0);

  // Smart Meal Recommendation matching logic
  const recommendedMeal: MealRecommendation = useMemo(() => {
    // 1. Filter by phase
    const phaseMeals = MEAL_PRESETS.filter((m) => m.phase === cycleState.phase);

    // 2. Filter or rank by craving
    let matching = phaseMeals.filter((m) =>
      m.cravingMatch.includes(checkinData.craving)
    );

    if (matching.length === 0) {
      matching = phaseMeals.length > 0 ? phaseMeals : MEAL_PRESETS;
    }

    const selectedIndex = mealAlternativeOffset % matching.length;
    return matching[selectedIndex] || MEAL_PRESETS[0];
  }, [cycleState.phase, checkinData.craving, mealAlternativeOffset]);

  const handleCycleAlternativeMeal = () => {
    setMealAlternativeOffset((prev) => prev + 1);
  };

  const handleSaveCheckin = (updated: DailyCheckin) => {
    setCheckinData(updated);
    setActiveTab('meal');
  };

  const isUrdu = language === 'ur';
  const t = TRANSLATIONS[language];

  return (
    <div
      dir={isUrdu ? 'rtl' : 'ltr'}
      className={`min-h-screen flex flex-col bg-[#FAF7F2] text-stone-800 ${
        isUrdu ? 'font-urdu' : ''
      }`}
    >
      {/* Top Bar Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
        isPremium={isPremium}
        setIsPremium={setIsPremium}
        onOpenCheckin={() => setActiveTab('checkin')}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-10">
        {/* Tab 1: Comprehensive Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-10">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-[#4A2234] to-[#341624] text-[#FAF7F2] rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
              <div className="relative z-10 max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold rounded-full bg-[#FAF7F2]/10 text-[#FAF7F2] border border-[#FAF7F2]/20">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>{t.hero.badge}</span>
                </div>

                <h1 className="font-serif-cormorant text-3xl sm:text-5xl font-bold leading-tight">
                  {t.hero.title}
                </h1>

                <p className="text-stone-300 text-xs sm:text-base leading-relaxed max-w-2xl">
                  {t.hero.description}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => setActiveTab('checkin')}
                    className="px-5 py-3 text-xs sm:text-sm font-semibold text-[#4A2234] bg-[#FAF7F2] hover:bg-white rounded-xl shadow-xs transition-transform active:scale-95 flex items-center gap-2"
                  >
                    <Heart className="w-4 h-4 text-[#C4677E]" />
                    <span>{t.hero.startCheckin}</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('meal')}
                    className="px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-colors flex items-center gap-2"
                  >
                    <span>{t.hero.viewMeal}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Decorative background element */}
              <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-white/5 blur-2xl pointer-events-none" />
            </div>

            {/* Split Row: Cycle Intelligence Wheel + Today's Body Snapshot */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Interactive Cycle Ring & Phase Insights */}
              <div className="lg:col-span-5 bg-white border border-[#E8DEC8] rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col items-center">
                <div className="w-full flex items-center justify-between pb-4 border-b border-[#F0EAE1] mb-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#4A2234] uppercase tracking-wider">
                    <Calendar className="w-4 h-4 text-[#C4677E]" />
                    <span>{t.cycle.currentPhase}</span>
                  </div>
                  <span className="text-xs font-mono text-stone-500">
                    Day {cycleState.currentCycleDay} / {cycleState.totalCycleLength}
                  </span>
                </div>

                <CycleRing
                  cycleState={cycleState}
                  language={language}
                  onSelectPhasePreview={(phase) => {
                    // Update checkin phase preview
                    const updated = { ...checkinData, phase };
                    setCheckinData(updated);
                  }}
                />

                {/* Hormonal & Nutritional Priorities */}
                <div className="w-full mt-6 pt-5 border-t border-[#F0EAE1] space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#4A2234]">
                    {t.cycle.nutritionalPriorities}
                  </h4>
                  <ul className="space-y-1.5 text-xs text-stone-700">
                    {(isUrdu
                      ? cycleState.urduNutritionalFocus
                      : cycleState.nutritionalFocus
                    )
                      .slice(0, 4)
                      .map((focus, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C4677E] mt-1.5 shrink-0" />
                          <span>{focus}</span>
                        </li>
                      ))}
                  </ul>

                  <p className="text-[11px] text-stone-400 italic pt-2 border-t border-stone-100">
                    {t.cycle.scientificNote}
                  </p>
                </div>
              </div>

              {/* Right Column: Active Daily Check-in & Meal Spotlight */}
              <div className="lg:col-span-7 space-y-8">
                {/* Active Check-in status bar */}
                <div className="bg-white border border-[#E8DEC8] rounded-2xl p-5 sm:p-6 shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C4677E]">
                      {isUrdu ? 'آج کی جسمانی رپورٹ' : 'Reported Symptoms & State'}
                    </span>
                    <button
                      onClick={() => setActiveTab('checkin')}
                      className="text-xs font-medium text-[#4A2234] hover:text-[#C4677E] flex items-center gap-1"
                    >
                      <span>{isUrdu ? 'ترمیم کریں' : 'Update check-in'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EDE4D5]">
                      <span className="text-stone-500 block text-[11px]">
                        {isUrdu ? 'موڈ' : 'Mood'}
                      </span>
                      <strong className="text-stone-800 capitalize font-medium">
                        {t.checkin.moods[checkinData.mood]}
                      </strong>
                    </div>

                    <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EDE4D5]">
                      <span className="text-stone-500 block text-[11px]">
                        {isUrdu ? 'طلب (Craving)' : 'Craving'}
                      </span>
                      <strong className="text-stone-800 capitalize font-medium">
                        {t.checkin.cravings[checkinData.craving]}
                      </strong>
                    </div>

                    <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EDE4D5]">
                      <span className="text-stone-500 block text-[11px]">
                        {isUrdu ? 'درد کی کیفیت' : 'Pain Level'}
                      </span>
                      <strong className="text-stone-800 capitalize font-medium">
                        {checkinData.painLevel}
                      </strong>
                    </div>

                    <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EDE4D5]">
                      <span className="text-stone-500 block text-[11px]">
                        {isUrdu ? 'پانی' : 'Hydration'}
                      </span>
                      <strong className="text-stone-800 font-mono font-medium">
                        {checkinData.waterGlasses} glasses
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Primary Meal Highlight Card */}
                <MealRecommendationCard
                  meal={recommendedMeal}
                  language={language}
                  onExploreOtherMeals={handleCycleAlternativeMeal}
                  onViewFullNutrition={() => setActiveTab('nutrition')}
                />
              </div>
            </div>

            {/* Feature Modules Quick Strip */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#E8DEC8]">
              <div
                onClick={() => setActiveTab('nutrition')}
                className="bg-white p-6 rounded-2xl border border-[#E8DEC8] hover:border-[#C4677E] transition-all cursor-pointer shadow-xs group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FAF0F2] text-[#C4677E] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-serif-cormorant text-xl font-bold text-[#4A2234]">
                  {t.nav.nutrition}
                </h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  {isUrdu
                    ? 'آئرن، میگنیشیم، کیلشیم اور پروٹین کا مصدقہ سائنسی تجزیہ۔'
                    : 'Transparent, verified micro-nutrient calculations for blood volume replenishment and cramp mitigation.'}
                </p>
              </div>

              <div
                onClick={() => setActiveTab('body')}
                className="bg-white p-6 rounded-2xl border border-[#E8DEC8] hover:border-[#7A9A7B] transition-all cursor-pointer shadow-xs group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#EEF5EE] text-[#7A9A7B] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Activity className="w-5 h-5" />
                </div>
                <h3 className="font-serif-cormorant text-xl font-bold text-[#4A2234]">
                  {t.nav.bodyInsights}
                </h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  {isUrdu
                    ? 'ماہواری کے مطابق ہلکی یا چست ورزش اور درد سے آرام کے لیے سانس کی مشق۔'
                    : 'Phase-tailored movement protocols, sleep temperature hygiene, and interactive 4-7-8 breathing.'}
                </p>
              </div>

              <div
                onClick={() => setActiveTab('stores')}
                className="bg-white p-6 rounded-2xl border border-[#E8DEC8] hover:border-[#DDA15E] transition-all cursor-pointer shadow-xs group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FFF8EE] text-[#DDA15E] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="font-serif-cormorant text-xl font-bold text-[#4A2234]">
                  {t.nav.stores}
                </h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  {isUrdu
                    ? 'تازہ سبزی، حلال گوشت اور دیسی مصالحہ جات کے قریبی مراکز۔'
                    : 'Locate nearby grocery stores, spice bazaars, and organic markets for fresh recipe ingredients.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Daily Check-in Form */}
        {activeTab === 'checkin' && (
          <DailyCheckinSection
            checkinData={checkinData}
            onSaveCheckin={handleSaveCheckin}
            language={language}
            lastPeriodDate={lastPeriodDate}
            setLastPeriodDate={setLastPeriodDate}
            cycleLength={cycleLength}
            setCycleLength={setCycleLength}
            periodDuration={periodDuration}
            setPeriodDuration={setPeriodDuration}
          />
        )}

        {/* Tab 3: Meal Recommendation View */}
        {activeTab === 'meal' && (
          <div className="space-y-6">
            <MealRecommendationCard
              meal={recommendedMeal}
              language={language}
              onExploreOtherMeals={handleCycleAlternativeMeal}
              onViewFullNutrition={() => setActiveTab('nutrition')}
            />
          </div>
        )}

        {/* Tab 4: Verified Nutrition Engine Dashboard */}
        {activeTab === 'nutrition' && (
          <NutritionDashboard
            foodsEatenToday={checkinData.foodsEatenToday}
            currentMeal={recommendedMeal}
            language={language}
            isPremium={isPremium}
            onOpenReportModal={() => setIsReportModalOpen(true)}
          />
        )}

        {/* Tab 5: Body Insights & Movement */}
        {activeTab === 'body' && (
          <BodyInsights cycleState={cycleState} language={language} />
        )}

        {/* Tab 6: Nearby Stores */}
        {activeTab === 'stores' && <NearbyStores language={language} />}

        {/* Tab 7: Learn & Evidence-based Science */}
        {activeTab === 'learn' && <LearnLibrary language={language} />}
      </main>

      {/* Clinical Report Export Modal */}
      <ClinicalReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        userProfile={userProfile}
        checkinData={checkinData}
        cycleState={cycleState}
        recommendedMeal={recommendedMeal}
        language={language}
      />

      {/* Footer */}
      <footer className="mt-16 border-t border-[#E8DEC8] bg-[#FAF7F2] py-8 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#4A2234] text-white flex items-center justify-center font-serif text-[10px] font-bold">
              L
            </div>
            <span className="font-serif-cormorant text-base font-semibold text-[#4A2234]">
              {t.brandName}
            </span>
            <span className="text-stone-300">·</span>
            <span>{t.brandTagline}</span>
          </div>

          <div className="text-center sm:text-right text-[11px] text-stone-500 max-w-md">
            {isUrdu
              ? 'لونارا ایک طرزِ زندگی اور غذائی معلوماتی پلیٹ فارم ہے۔ یہ طبی تشخیص یا علاج فراہم نہیں کرتا۔'
              : 'Lunara is an educational and lifestyle platform. It does not provide medical diagnoses or replace physician care.'}
          </div>
        </div>
      </footer>
    </div>
  );
}
