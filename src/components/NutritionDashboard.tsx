import React from 'react';
import {
  Activity,
  ShieldCheck,
  Zap,
  TrendingUp,
  FileText,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
} from 'lucide-react';
import { NutrientBreakdown, EatenFoodLog, MealRecommendation } from '../types';
import {
  calculateFoodsEatenTotal,
  compareWithDailyGoals,
  sumNutrients,
} from '../utils/nutritionCalculator';
import { DAILY_RECOMMENDED_VALUES } from '../data/nutritionDatabase';
import { TRANSLATIONS } from '../data/translations';

interface NutritionDashboardProps {
  foodsEatenToday: EatenFoodLog[];
  currentMeal: MealRecommendation;
  language: 'en' | 'ur';
  isPremium: boolean;
  onOpenReportModal: () => void;
}

export const NutritionDashboard: React.FC<NutritionDashboardProps> = ({
  foodsEatenToday,
  currentMeal,
  language,
  isPremium,
  onOpenReportModal,
}) => {
  const isUrdu = language === 'ur';
  const t = TRANSLATIONS[language].nutrition;

  const eatenTotal = calculateFoodsEatenTotal(foodsEatenToday);
  const mealTotal = currentMeal.nutrients;
  const combinedTotal = sumNutrients(eatenTotal, mealTotal);
  const comparisons = compareWithDailyGoals(eatenTotal, mealTotal);

  return (
    <section className="bg-white border border-[#E8DEC8] rounded-2xl p-5 sm:p-8 shadow-xs space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#F0EAE1] gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-[#C4677E] font-semibold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            {isUrdu ? 'مستند اور سائنسی حساب کتاب' : 'Verified Clinical Nutrition Engine'}
          </span>
          <h2 className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#4A2234] mt-0.5">
            {t.title}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">{t.subtitle}</p>
        </div>

        <button
          onClick={onOpenReportModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl bg-[#4A2234] text-white hover:bg-[#381926] transition-transform active:scale-95 shrink-0"
        >
          <FileText className="w-4 h-4" />
          <span>{isUrdu ? 'مکمل کلینیکل رپورٹ دیکھیں' : 'Export Clinical Report'}</span>
        </button>
      </div>

      {/* Primary KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#EDE4D5]">
          <span className="text-[11px] uppercase tracking-wider text-stone-500 font-medium">
            {isUrdu ? 'مجموعی کیلوریز' : 'Total Energy Intake'}
          </span>
          <div className="font-mono text-2xl sm:text-3xl font-bold text-[#4A2234] mt-1">
            {combinedTotal.calories}
            <span className="text-xs font-normal text-stone-500"> / 2000 kcal</span>
          </div>
          <div className="w-full bg-stone-200 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-[#C4677E] h-full rounded-full"
              style={{
                width: `${Math.min(100, (combinedTotal.calories / 2000) * 100)}%`,
              }}
            />
          </div>
        </div>

        <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#EDE4D5]">
          <span className="text-[11px] uppercase tracking-wider text-stone-500 font-medium">
            {isUrdu ? 'پروٹین' : 'Dietary Protein'}
          </span>
          <div className="font-mono text-2xl sm:text-3xl font-bold text-[#4A2234] mt-1">
            {combinedTotal.protein}g
            <span className="text-xs font-normal text-stone-500"> / 60g</span>
          </div>
          <div className="w-full bg-stone-200 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-[#7A9A7B] h-full rounded-full"
              style={{
                width: `${Math.min(100, (combinedTotal.protein / 60) * 100)}%`,
              }}
            />
          </div>
        </div>

        <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#EDE4D5]">
          <span className="text-[11px] uppercase tracking-wider text-stone-500 font-medium">
            {isUrdu ? 'آئرن (حیاتیاتی ضرورت)' : 'Iron (Menstrual Target)'}
          </span>
          <div className="font-mono text-2xl sm:text-3xl font-bold text-[#C4677E] mt-1">
            {combinedTotal.iron}mg
            <span className="text-xs font-normal text-stone-500"> / 18mg</span>
          </div>
          <div className="w-full bg-stone-200 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-[#C4677E] h-full rounded-full"
              style={{
                width: `${Math.min(100, (combinedTotal.iron / 18) * 100)}%`,
              }}
            />
          </div>
        </div>

        <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#EDE4D5]">
          <span className="text-[11px] uppercase tracking-wider text-stone-500 font-medium">
            {isUrdu ? 'میگنیشیم' : 'Magnesium (PMS Focus)'}
          </span>
          <div className="font-mono text-2xl sm:text-3xl font-bold text-[#DDA15E] mt-1">
            {combinedTotal.magnesium}mg
            <span className="text-xs font-normal text-stone-500"> / 320mg</span>
          </div>
          <div className="w-full bg-stone-200 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-[#DDA15E] h-full rounded-full"
              style={{
                width: `${Math.min(100, (combinedTotal.magnesium / 320) * 100)}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-[#4A2234] uppercase tracking-wider">
            {t.micronutrients}
          </h3>
          <span className="text-xs text-stone-500">
            {isUrdu
              ? 'کھائی گئی خوراک + تجویز کردہ کھانا = مجموعی شرح'
              : 'Eaten Today + Lunara Meal = Total vs Daily Target'}
          </span>
        </div>

        <div className="overflow-x-auto border border-stone-200 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF7F2] text-stone-700 border-b border-stone-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4 font-semibold">{isUrdu ? 'غذائی جز' : 'Nutrient'}</th>
                <th className="py-3 px-3 font-semibold text-right font-mono">
                  {isUrdu ? 'اب تک کھایا' : 'Eaten Today'}
                </th>
                <th className="py-3 px-3 font-semibold text-right font-mono">
                  {isUrdu ? 'تجویز کردہ کھانا' : 'This Meal'}
                </th>
                <th className="py-3 px-3 font-semibold text-right font-mono">
                  {isUrdu ? 'مجموعہ' : 'Day Total'}
                </th>
                <th className="py-3 px-3 font-semibold text-right font-mono">
                  {isUrdu ? 'ہدف' : 'Goal'}
                </th>
                <th className="py-3 px-4 font-semibold">{isUrdu ? 'شرح %' : 'Progress'}</th>
                <th className="py-3 px-4 font-semibold hidden md:table-cell">
                  {isUrdu ? 'طبی افادیت' : 'Clinical Role'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 bg-white">
              {comparisons.map((row) => (
                <tr key={row.key} className="hover:bg-stone-50/80 transition-colors">
                  <td className="py-3 px-4 font-semibold text-[#4A2234]">
                    {isUrdu ? row.labelUr : row.labelEn}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-stone-600">
                    {row.eatenValue} {row.unit}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-medium text-[#C4677E]">
                    +{row.mealValue} {row.unit}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-stone-900">
                    {row.combinedValue} {row.unit}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-stone-500">
                    {row.dailyGoal} {row.unit}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-stone-100 h-2 rounded-full overflow-hidden shrink-0">
                        <div
                          className={`h-full rounded-full ${
                            row.percentDailyGoal >= 100
                              ? 'bg-emerald-500'
                              : row.percentDailyGoal >= 50
                              ? 'bg-amber-400'
                              : 'bg-rose-400'
                          }`}
                          style={{ width: `${Math.min(100, row.percentDailyGoal)}%` }}
                        />
                      </div>
                      <span className="font-mono text-[11px] font-semibold text-stone-700 w-9 text-right">
                        {row.percentDailyGoal}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-[11px] text-stone-500 leading-snug hidden md:table-cell">
                    {isUrdu ? row.clinicalRoleUr : row.clinicalRoleEn}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Calculation Transparency Proof Box */}
      <div className="bg-[#FAF7F2] p-5 rounded-xl border border-[#EDE4D5]">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#7A9A7B] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-[#4A2234] uppercase tracking-wider">
              {t.formulaProof}
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">{t.formulaProofDesc}</p>
            <p className="text-[11px] text-stone-500 italic mt-1">
              {isUrdu
                ? 'لونارا کبھی بھی فرضی غذائی اعداد و شمار تیار نہیں کرتا؛ ہر مقدار کو ثابت شدہ ترکیب کے اجزاء کے وزن سے ماپا جاتا ہے۔'
                : 'Values are strictly computed from verified ingredient weights and official analytical reference data, not generated by generative AI hallucination.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
