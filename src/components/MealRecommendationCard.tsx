import React, { useState } from 'react';
import {
  Clock,
  Flame,
  CheckCircle,
  RefreshCw,
  Sparkles,
  ChevronRight,
  ArrowRightLeft,
  BookOpen,
} from 'lucide-react';
import { MealRecommendation, CyclePhase } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface MealRecommendationCardProps {
  meal: MealRecommendation;
  language: 'en' | 'ur';
  onExploreOtherMeals: () => void;
  onViewFullNutrition: () => void;
}

export const MealRecommendationCard: React.FC<MealRecommendationCardProps> = ({
  meal,
  language,
  onExploreOtherMeals,
  onViewFullNutrition,
}) => {
  const isUrdu = language === 'ur';
  const t = TRANSLATIONS[language].mealCard;
  const [activeTab, setActiveTab] = useState<'why' | 'recipe' | 'subs'>('why');

  return (
    <div className="bg-white border border-[#E8DEC8] rounded-2xl overflow-hidden shadow-xs">
      {/* Top Banner / Split layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-b border-[#F0EAE1]">
        {/* Left / Top Image Area */}
        <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full bg-stone-100 overflow-hidden">
          <img
            src={meal.image}
            alt={meal.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover min-h-[260px]"
            onError={(e) => {
              // Fallback styling if image fails
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute top-4 left-4">
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-md bg-[#FAF7F2]/90 backdrop-blur-md text-[#4A2234] border border-[#E8DEC8]">
              {meal.cuisine}
            </span>
          </div>
          <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 text-xs text-white bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {meal.prepTimeMinutes + meal.cookTimeMinutes} {t.minutes}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              {meal.nutrients.calories} kcal
            </span>
            <span>·</span>
            <span>{meal.nutrients.protein}g Protein</span>
          </div>
        </div>

        {/* Right / Content Area */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs uppercase tracking-wider text-[#C4677E] font-semibold">
                {t.badge}
              </span>
              <button
                onClick={onExploreOtherMeals}
                className="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-[#4A2234] transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>{isUrdu ? 'دوسری ترکیب دیکھیں' : 'Alternative meal'}</span>
              </button>
            </div>

            <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#4A2234] leading-snug">
              {isUrdu ? meal.urduTitle : meal.title}
            </h3>

            <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
              {isUrdu ? meal.urduTagline : meal.tagline}
            </p>

            {/* Micro nutrient highlight ticker */}
            <div className="grid grid-cols-4 gap-2 mt-5 p-3 rounded-xl bg-[#FAF7F2] border border-[#EDE4D5] text-center">
              <div>
                <span className="block text-[11px] text-stone-500">
                  {isUrdu ? 'آئرن' : 'Iron'}
                </span>
                <span className="font-mono text-xs sm:text-sm font-semibold text-[#4A2234]">
                  {meal.nutrients.iron}mg
                </span>
              </div>
              <div>
                <span className="block text-[11px] text-stone-500">
                  {isUrdu ? 'میگنیشیم' : 'Magnesium'}
                </span>
                <span className="font-mono text-xs sm:text-sm font-semibold text-[#4A2234]">
                  {meal.nutrients.magnesium}mg
                </span>
              </div>
              <div>
                <span className="block text-[11px] text-stone-500">
                  {isUrdu ? 'کیلشیم' : 'Calcium'}
                </span>
                <span className="font-mono text-xs sm:text-sm font-semibold text-[#4A2234]">
                  {meal.nutrients.calcium}mg
                </span>
              </div>
              <div>
                <span className="block text-[11px] text-stone-500">
                  {isUrdu ? 'فائبر' : 'Fiber'}
                </span>
                <span className="font-mono text-xs sm:text-sm font-semibold text-[#4A2234]">
                  {meal.nutrients.fiber}g
                </span>
              </div>
            </div>
          </div>

          {/* Interactive tabs within meal card */}
          <div className="mt-6 flex items-center justify-between border-t border-[#F0EAE1] pt-4">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveTab('why')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  activeTab === 'why'
                    ? 'bg-[#FAF0F2] text-[#C4677E] font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {isUrdu ? 'طبی فوائد' : 'Why This Meal'}
              </button>
              <button
                onClick={() => setActiveTab('recipe')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  activeTab === 'recipe'
                    ? 'bg-[#FAF0F2] text-[#C4677E] font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {isUrdu ? 'ترکیب و اجزاء' : 'Recipe & Method'}
              </button>
              <button
                onClick={() => setActiveTab('subs')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  activeTab === 'subs'
                    ? 'bg-[#FAF0F2] text-[#C4677E] font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {isUrdu ? 'متبادل اشیاء' : 'Substitutions'}
              </button>
            </div>

            <button
              onClick={onViewFullNutrition}
              className="text-xs font-semibold text-[#4A2234] hover:text-[#C4677E] flex items-center gap-1 transition-colors"
            >
              <span>{t.viewAnalysis}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Tab Panels */}
      <div className="p-6 sm:p-8 bg-[#FAF7F2]">
        {activeTab === 'why' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#4A2234] font-semibold text-sm">
              <Sparkles className="w-4 h-4 text-[#C4677E]" />
              <h4>{t.whyThisMeal}</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {meal.whyThisMeal.map((reason, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-xl border border-[#EDE4D5] shadow-2xs"
                >
                  <h5 className="font-semibold text-xs text-[#4A2234] mb-1.5">
                    {isUrdu ? reason.urduTitle : reason.title}
                  </h5>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {isUrdu ? reason.urduDescription : reason.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-3 p-3 bg-[#EEF5EE] border border-[#D5E5D5] rounded-xl text-xs text-emerald-950 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{isUrdu ? meal.urduPhaseBenefits : meal.phaseBenefits}</span>
            </div>
          </div>
        )}

        {activeTab === 'recipe' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Ingredients */}
            <div className="bg-white p-4 sm:p-5 rounded-xl border border-[#EDE4D5]">
              <h5 className="text-xs font-semibold uppercase tracking-wider text-[#4A2234] mb-3 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#C4677E]" />
                {t.ingredients}
              </h5>
              <ul className="space-y-2 text-xs text-stone-700">
                {meal.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-start justify-between gap-2 border-b border-stone-100 pb-1.5">
                    <span>{isUrdu ? ing.urduName : ing.name}</span>
                    <span className="font-mono text-stone-500 font-medium whitespace-nowrap">
                      {ing.amount}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Preparation Steps */}
            <div className="bg-white p-4 sm:p-5 rounded-xl border border-[#EDE4D5]">
              <h5 className="text-xs font-semibold uppercase tracking-wider text-[#4A2234] mb-3">
                {t.instructions}
              </h5>
              <ol className="space-y-3 text-xs text-stone-700">
                {(isUrdu ? meal.urduInstructions : meal.instructions).map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#FAF0F2] text-[#C4677E] font-semibold text-[11px] flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}

        {activeTab === 'subs' && (
          <div className="space-y-3">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-[#4A2234] mb-2 flex items-center gap-1.5">
              <ArrowRightLeft className="w-3.5 h-3.5 text-[#C4677E]" />
              {t.substitutions}
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {meal.substitutions.map((sub, i) => (
                <div key={i} className="bg-white p-4 rounded-xl border border-[#EDE4D5]">
                  <div className="text-xs font-semibold text-stone-800 line-through text-stone-400">
                    {sub.original}
                  </div>
                  <div className="text-xs font-semibold text-[#4A2234] mt-0.5">
                    → {sub.replacement}
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1 leading-snug">{sub.reason}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
