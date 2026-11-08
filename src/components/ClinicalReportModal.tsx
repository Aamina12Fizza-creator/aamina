import React from 'react';
import { X, Printer, ShieldCheck, Heart, Sparkles, CheckCircle2 } from 'lucide-react';
import { DailyCheckin, MealRecommendation, UserProfile } from '../types';
import { CycleCalculationResult } from '../utils/cycleEngine';
import { calculateFoodsEatenTotal, compareWithDailyGoals } from '../utils/nutritionCalculator';

interface ClinicalReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  checkinData: DailyCheckin;
  cycleState: CycleCalculationResult;
  recommendedMeal: MealRecommendation;
  language: 'en' | 'ur';
}

export const ClinicalReportModal: React.FC<ClinicalReportModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  checkinData,
  cycleState,
  recommendedMeal,
  language,
}) => {
  if (!isOpen) return null;

  const isUrdu = language === 'ur';
  const eatenTotal = calculateFoodsEatenTotal(checkinData.foodsEatenToday);
  const comparisons = compareWithDailyGoals(eatenTotal, recommendedMeal.nutrients);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200">
        {/* Modal Controls (Hidden in print) */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-stone-200 flex items-center justify-between z-10 print:hidden">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#4A2234]">
            <ShieldCheck className="w-4 h-4 text-[#C4677E]" />
            <span>
              {isUrdu ? 'لونارا کلینیکل نیوٹریشن رپورٹ' : 'Lunara Clinical Nutrition & Cycle Report'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#4A2234] text-white hover:bg-[#381926] transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{isUrdu ? 'پرنٹ / پی ڈی ایف' : 'Print / Save PDF'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Report Content */}
        <div className="p-6 sm:p-10 space-y-6 text-stone-800" id="lunara-report">
          {/* Header */}
          <div className="flex items-start justify-between border-b-2 border-[#4A2234] pb-5">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#4A2234] text-[#FAF7F2] flex items-center justify-center font-serif text-sm font-bold">
                  L
                </div>
                <h1 className="font-serif-cormorant text-2xl font-bold tracking-wider text-[#4A2234]">
                  LUNARA HEALTH INTELLIGENCE
                </h1>
              </div>
              <p className="text-xs text-stone-500 mt-1">
                Individual Menstrual Nutrition Assessment & Biomarker Tracking
              </p>
            </div>
            <div className="text-right text-xs text-stone-500 font-mono">
              <div>Date: {new Date().toLocaleDateString()}</div>
              <div>Status: Verified Analysis</div>
            </div>
          </div>

          {/* Patient/User Meta */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-[#FAF7F2] border border-[#EDE4D5] text-xs">
            <div>
              <span className="text-stone-500 block">User Name</span>
              <strong className="text-[#4A2234]">{userProfile.name}</strong>
            </div>
            <div>
              <span className="text-stone-500 block">Current Phase</span>
              <strong className="text-[#C4677E]">
                {isUrdu ? cycleState.phaseNameUr : cycleState.phaseNameEn}
              </strong>
            </div>
            <div>
              <span className="text-stone-500 block">Cycle Day</span>
              <strong className="text-stone-800">
                Day {cycleState.currentCycleDay} of {cycleState.totalCycleLength}
              </strong>
            </div>
            <div>
              <span className="text-stone-500 block">Reported Mood & Pain</span>
              <strong className="capitalize text-stone-800">
                {checkinData.mood} · {checkinData.painLevel} pain
              </strong>
            </div>
          </div>

          {/* Recommended Meal & Clinical Rationale */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-bold text-[#4A2234] border-b border-stone-200 pb-1">
              Personalized Nutritional Intervention
            </h3>
            <div className="p-4 rounded-xl border border-stone-200 bg-white">
              <div className="flex items-center justify-between">
                <h4 className="font-serif-cormorant text-xl font-bold text-[#4A2234]">
                  {isUrdu ? recommendedMeal.urduTitle : recommendedMeal.title}
                </h4>
                <span className="font-mono text-xs font-semibold text-[#C4677E]">
                  {recommendedMeal.nutrients.calories} kcal
                </span>
              </div>
              <p className="text-xs text-stone-600 mt-1">
                {isUrdu ? recommendedMeal.urduTagline : recommendedMeal.tagline}
              </p>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                {recommendedMeal.whyThisMeal.map((reason, idx) => (
                  <div key={idx} className="bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                    <strong className="text-[#4A2234] block mb-0.5">
                      {isUrdu ? reason.urduTitle : reason.title}
                    </strong>
                    <span className="text-stone-600 text-[11px] leading-snug">
                      {isUrdu ? reason.urduDescription : reason.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Micronutrient Balance Table */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-bold text-[#4A2234] border-b border-stone-200 pb-1">
              Micronutrient Daily Target Completion
            </h3>
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500 font-mono text-[11px]">
                  <th className="py-2">Nutrient</th>
                  <th className="py-2 text-right">Eaten Today</th>
                  <th className="py-2 text-right">Lunara Meal</th>
                  <th className="py-2 text-right">Day Total</th>
                  <th className="py-2 text-right">RDA Goal</th>
                  <th className="py-2 text-right">% Met</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-mono">
                {comparisons.map((c) => (
                  <tr key={c.key} className="py-1.5">
                    <td className="py-2 font-sans font-medium text-stone-900">{c.labelEn}</td>
                    <td className="py-2 text-right text-stone-600">
                      {c.eatenValue} {c.unit}
                    </td>
                    <td className="py-2 text-right text-[#C4677E]">
                      +{c.mealValue} {c.unit}
                    </td>
                    <td className="py-2 text-right font-bold text-stone-900">
                      {c.combinedValue} {c.unit}
                    </td>
                    <td className="py-2 text-right text-stone-500">
                      {c.dailyGoal} {c.unit}
                    </td>
                    <td className="py-2 text-right font-bold">
                      <span
                        className={
                          c.percentDailyGoal >= 100
                            ? 'text-emerald-700'
                            : c.percentDailyGoal >= 50
                            ? 'text-amber-700'
                            : 'text-rose-700'
                        }
                      >
                        {c.percentDailyGoal}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Clinical Disclaimer */}
          <div className="pt-4 border-t border-stone-200 text-[11px] text-stone-500 leading-relaxed">
            <p>
              <strong>Clinical Disclosure:</strong> This summary is prepared by Lunara for
              informational and nutritional synchronization purposes. Cycle phase boundaries and
              hormonal states are algorithmically estimated from reported menstrual histories and
              do not constitute serum endocrine assays. If you experience menorrhagia (excessive
              bleeding) or debilitating dysmenorrhea, consult your primary care physician or
              gynecologist.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
