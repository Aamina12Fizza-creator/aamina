import { EatenFoodLog, NutrientBreakdown } from '../types';
import { DAILY_RECOMMENDED_VALUES } from '../data/nutritionDatabase';

export function createEmptyNutrients(): NutrientBreakdown {
  return {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    iron: 0,
    calcium: 0,
    magnesium: 0,
    potassium: 0,
    zinc: 0,
    vitaminB6: 0,
    folate: 0,
  };
}

export function sumNutrients(a: NutrientBreakdown, b: NutrientBreakdown): NutrientBreakdown {
  return {
    calories: Math.round(a.calories + b.calories),
    protein: Number((a.protein + b.protein).toFixed(1)),
    carbs: Number((a.carbs + b.carbs).toFixed(1)),
    fat: Number((a.fat + b.fat).toFixed(1)),
    fiber: Number((a.fiber + b.fiber).toFixed(1)),
    iron: Number((a.iron + b.iron).toFixed(1)),
    calcium: Math.round(a.calcium + b.calcium),
    magnesium: Math.round(a.magnesium + b.magnesium),
    potassium: Math.round(a.potassium + b.potassium),
    zinc: Number((a.zinc + b.zinc).toFixed(1)),
    vitaminB6: Number(((a.vitaminB6 || 0) + (b.vitaminB6 || 0)).toFixed(1)),
    folate: Math.round((a.folate || 0) + (b.folate || 0)),
  };
}

export function calculateFoodsEatenTotal(foodLogs: EatenFoodLog[]): NutrientBreakdown {
  return foodLogs.reduce((acc, log) => {
    const mult = log.quantity;
    return {
      calories: Math.round(acc.calories + log.nutrients.calories * mult),
      protein: Number((acc.protein + log.nutrients.protein * mult).toFixed(1)),
      carbs: Number((acc.carbs + log.nutrients.carbs * mult).toFixed(1)),
      fat: Number((acc.fat + log.nutrients.fat * mult).toFixed(1)),
      fiber: Number((acc.fiber + log.nutrients.fiber * mult).toFixed(1)),
      iron: Number((acc.iron + log.nutrients.iron * mult).toFixed(1)),
      calcium: Math.round(acc.calcium + log.nutrients.calcium * mult),
      magnesium: Math.round(acc.magnesium + log.nutrients.magnesium * mult),
      potassium: Math.round(acc.potassium + log.nutrients.potassium * mult),
      zinc: Number((acc.zinc + log.nutrients.zinc * mult).toFixed(1)),
      vitaminB6: Number(((acc.vitaminB6 || 0) + (log.nutrients.vitaminB6 || 0) * mult).toFixed(1)),
      folate: Math.round((acc.folate || 0) + (log.nutrients.folate || 0) * mult),
    };
  }, createEmptyNutrients());
}

export interface NutrientComparison {
  key: keyof NutrientBreakdown;
  labelEn: string;
  labelUr: string;
  unit: string;
  eatenValue: number;
  mealValue: number;
  combinedValue: number;
  dailyGoal: number;
  percentDailyGoal: number;
  status: 'below' | 'optimal' | 'exceeded';
  clinicalRoleEn: string;
  clinicalRoleUr: string;
}

export function compareWithDailyGoals(
  eaten: NutrientBreakdown,
  meal: NutrientBreakdown
): NutrientComparison[] {
  const combined = sumNutrients(eaten, meal);

  const items: Array<{
    key: keyof NutrientBreakdown;
    labelEn: string;
    labelUr: string;
    unit: string;
    clinicalRoleEn: string;
    clinicalRoleUr: string;
  }> = [
    {
      key: 'iron',
      labelEn: 'Iron (Heme & Non-Heme)',
      labelUr: 'آئرن (فولاد)',
      unit: 'mg',
      clinicalRoleEn: 'Replaces menstrual blood loss; prevents anemia and fatigue.',
      clinicalRoleUr: 'خون کی کمی کو روکتا ہے اور پیریڈز کی تھکن دور کرتا ہے۔',
    },
    {
      key: 'magnesium',
      labelEn: 'Elemental Magnesium',
      labelUr: 'میگنیشیم',
      unit: 'mg',
      clinicalRoleEn: 'Relaxes uterine smooth muscle; curbs prostaglandin cramps and anxiety.',
      clinicalRoleUr: 'بچہ دانی کے پٹھوں کو ڈھیلا کر کے اینٹھن اور درد ختم کرتا ہے۔',
    },
    {
      key: 'calcium',
      labelEn: 'Calcium',
      labelUr: 'کیلشیم',
      unit: 'mg',
      clinicalRoleEn: 'Neuromuscular signaling; essential co-factor to reduce PMS severity.',
      clinicalRoleUr: 'ہڈیوں اور پٹھوں کے مروڑ کو روکنے میں مددگار۔',
    },
    {
      key: 'potassium',
      labelEn: 'Potassium',
      labelUr: 'پوٹاشیم',
      unit: 'mg',
      clinicalRoleEn: 'Regulates extracellular fluids and counters sodium-induced bloating.',
      clinicalRoleUr: 'پیٹ اور جسم کی سوجن و اپھارہ دور کرتا ہے۔',
    },
    {
      key: 'fiber',
      labelEn: 'Dietary Fiber',
      labelUr: 'غذائی فائبر',
      unit: 'g',
      clinicalRoleEn: 'Binds circulating used estrogens in the gut to ensure proper excretion.',
      clinicalRoleUr: 'اضافی ایسٹروجن کو خارج کرتا ہے اور ہاضمہ درست رکھتا ہے۔',
    },
    {
      key: 'protein',
      labelEn: 'Quality Protein',
      labelUr: 'پروٹین',
      unit: 'g',
      clinicalRoleEn: 'Tissue repair, hormone enzyme synthesis, and sustained satiety.',
      clinicalRoleUr: 'خلیات کی مرمت، ہارمونز کی تیاری اور توانائی کے لیے ضروری۔',
    },
    {
      key: 'zinc',
      labelEn: 'Zinc',
      labelUr: 'زنک',
      unit: 'mg',
      clinicalRoleEn: 'Supports ovarian follicle maturation and cellular immune resilience.',
      clinicalRoleUr: 'بیضہ دانی اور مدافعت کی مضبوطی کے لیے ناگزیر۔',
    },
    {
      key: 'calories',
      labelEn: 'Energy (Calories)',
      labelUr: 'کیلوریز (توانائی)',
      unit: 'kcal',
      clinicalRoleEn: 'Provides baseline metabolic energy across menstrual transitions.',
      clinicalRoleUr: 'روزمرہ کام کاج کے لیے درکار بنیادی توانائی۔',
    },
  ];

  return items.map((item) => {
    const eatenVal = Number(eaten[item.key] || 0);
    const mealVal = Number(meal[item.key] || 0);
    const combinedVal = Number(combined[item.key] || 0);
    const goal = Number(DAILY_RECOMMENDED_VALUES[item.key] || 1);
    const percent = Math.round((combinedVal / goal) * 100);

    let status: 'below' | 'optimal' | 'exceeded' = 'below';
    if (percent >= 85 && percent <= 125) {
      status = 'optimal';
    } else if (percent > 125) {
      status = 'exceeded';
    }

    return {
      key: item.key,
      labelEn: item.labelEn,
      labelUr: item.labelUr,
      unit: item.unit,
      eatenValue: eatenVal,
      mealValue: mealVal,
      combinedValue: combinedVal,
      dailyGoal: goal,
      percentDailyGoal: percent,
      status,
      clinicalRoleEn: item.clinicalRoleEn,
      clinicalRoleUr: item.clinicalRoleUr,
    };
  });
}
