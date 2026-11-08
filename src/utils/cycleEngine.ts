import { CyclePhase } from '../types';

export interface CycleCalculationResult {
  currentCycleDay: number;
  phase: CyclePhase;
  phaseNameEn: string;
  phaseNameUr: string;
  phaseSubtitleEn: string;
  phaseSubtitleUr: string;
  daysUntilNextPeriod: number;
  totalCycleLength: number;
  periodDuration: number;
  hormones: {
    estrogen: 'Low' | 'Rising' | 'Peak' | 'Secondary Surge' | 'Dropping';
    progesterone: 'Low' | 'Low' | 'Surging' | 'High' | 'Dropping';
    energyTendency: 'Lower' | 'Rising' | 'Peak' | 'Variable';
  };
  nutritionalFocus: string[];
  urduNutritionalFocus: string[];
  recommendedMovement: {
    titleEn: string;
    titleUr: string;
    descEn: string;
    descUr: string;
  };
}

export function calculateCycleState(
  lastPeriodDateStr: string,
  cycleLength = 28,
  periodDuration = 5
): CycleCalculationResult {
  const lastPeriod = new Date(lastPeriodDateStr);
  const now = new Date();

  // Reset time portions for accurate day differences
  lastPeriod.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);

  const diffTime = Math.max(0, now.getTime() - lastPeriod.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // Current day in the cycle (1-indexed)
  const currentCycleDay = (diffDays % cycleLength) + 1;
  const daysUntilNextPeriod = cycleLength - currentCycleDay + 1;

  // Ovulation typically occurs approx 14 days before next period
  const estimatedOvulationDay = Math.max(12, cycleLength - 14);

  let phase: CyclePhase = 'menstrual';
  if (currentCycleDay <= periodDuration) {
    phase = 'menstrual';
  } else if (currentCycleDay < estimatedOvulationDay - 1) {
    phase = 'follicular';
  } else if (currentCycleDay <= estimatedOvulationDay + 2) {
    phase = 'ovulatory';
  } else {
    phase = 'luteal';
  }

  switch (phase) {
    case 'menstrual':
      return {
        currentCycleDay,
        phase,
        phaseNameEn: 'Menstrual Phase',
        phaseNameUr: 'مرحلۂ ایام (حیض)',
        phaseSubtitleEn: 'Uterine shedding & renewal (Days 1–5)',
        phaseSubtitleUr: 'جسم کی تجدید اور خون کی بحالی کا دورانیہ (دن ۱ تا ۵)',
        daysUntilNextPeriod,
        totalCycleLength: cycleLength,
        periodDuration,
        hormones: {
          estrogen: 'Low',
          progesterone: 'Low',
          energyTendency: 'Lower',
        },
        nutritionalFocus: [
          'Heme & non-heme Iron to replenish blood loss',
          'Vitamin C paired with greens to triple iron absorption',
          'Magnesium & Calcium to ease smooth uterine muscle cramps',
          'Anti-inflammatory ginger & turmeric to mitigate prostaglandins',
          'Warm hydrating broths and water',
        ],
        urduNutritionalFocus: [
          'خون کی کمی پوری کرنے کے لیے آئرن',
          'آئرن کو جذب کرنے کے لیے لیموں اور وٹامن سی',
          'پیٹ کے درد اور کھچاؤ سے نجات کے لیے میگنیشیم',
          'سوزش کم کرنے کے لیے ادرک، ہلدی اور دارچینی',
          'گرم شوربے، چائے اور وافر پانی',
        ],
        recommendedMovement: {
          titleEn: 'Restorative Movement & Slow Walks',
          titleUr: 'ہلکی واک اور پرسکون اسٹریچنگ',
          descEn: 'Prioritize deep breathing, gentle spine and hip stretches, and 20-minute slow walking. Avoid high-intensity inverted workouts.',
          descUr: 'تیز ورزش کے بجائے نرمی سے چہل قدمی، گہرے سانس اور کولہوں کے کھچاؤ کی مشقیں کریں۔',
        },
      };

    case 'follicular':
      return {
        currentCycleDay,
        phase,
        phaseNameEn: 'Follicular Phase',
        phaseNameUr: 'فولیکولر مرحلہ (تیاری)',
        phaseSubtitleEn: 'Estrogen rising & follicle development (Days 6–12)',
        phaseSubtitleUr: 'ایسٹروجن کا اضافہ اور بیضے کی افزائش (دن ۶ تا ۱۲)',
        daysUntilNextPeriod,
        totalCycleLength: cycleLength,
        periodDuration,
        hormones: {
          estrogen: 'Rising',
          progesterone: 'Low',
          energyTendency: 'Rising',
        },
        nutritionalFocus: [
          'Fermented and probiotic foods (dahi, kefir) for gut health',
          'Prebiotic fiber (chickpeas, lentils, oats) to support estrogen clearance',
          'Zinc and healthy fats (pumpkin seeds, walnuts) for egg cell maturation',
          'Lean bioavailable protein for muscle recovery',
        ],
        urduNutritionalFocus: [
          'آنتوں کی صحت کے لیے تازہ دہی اور پروبائیوٹک غذائیں',
          'ہاضمہ بہتر بنانے کے لیے چنے اور دالوں کا فائبر',
          'بیضہ دانی کے لیے زنک اور اومیگا تھری (کدو کے بیج، اخروٹ)',
          'پٹھوں کی مضبوطی کے لیے معیاری پروٹین',
        ],
        recommendedMovement: {
          titleEn: 'Strength Progression & Brisk Cardio',
          titleUr: 'پٹھوں کی مضبوطی اور تیز چہل قدمی',
          descEn: 'Rising estrogen enhances insulin sensitivity and muscular recovery. Excellent phase for resistance training, running, and dance.',
          descUr: 'توانائی میں اضافہ ہو رہا ہے؛ یہ وزن اٹھانے، دوڑنے اور چست ورزشوں کے لیے بہترین وقت ہے۔',
        },
      };

    case 'ovulatory':
      return {
        currentCycleDay,
        phase,
        phaseNameEn: 'Ovulatory Phase',
        phaseNameUr: 'بیضوی مرحلہ (اخراجِ بیضہ)',
        phaseSubtitleEn: 'Peak estrogen & LH surge (Days 13–16)',
        phaseSubtitleUr: 'ہارمونز اور توانائی کا عروج (دن ۱۳ تا ۱۶)',
        daysUntilNextPeriod,
        totalCycleLength: cycleLength,
        periodDuration,
        hormones: {
          estrogen: 'Peak',
          progesterone: 'Surging',
          energyTendency: 'Peak',
        },
        nutritionalFocus: [
          'Cruciferous vegetables (broccoli, cabbage) rich in DIM/sulforaphane',
          'Omega-3 fatty acids (fish, chia) to support vascular blood flow',
          'Glutathione and vitamin C antioxidants for cellular protection',
          'Generous hydration to support cervical fluid hydration',
        ],
        urduNutritionalFocus: [
          'ایسٹروجن کے اخراج کے لیے گوبھی اور سبز پتوں والی سبزیاں',
          'اومیگا تھری فیٹی ایسڈز (مچھلی، السی، چیا سیڈز)',
          'خلیات کی حفاظت کے لیے اینٹی آکسیڈنٹس',
          'جسم میں نمکیات کے توازن کے لیے خوب پانی',
        ],
        recommendedMovement: {
          titleEn: 'Peak Performance & High-Energy Workouts',
          titleUr: 'عمدہ کارکردگی اور تیز رفتار ورزشیں',
          descEn: 'Energy, stamina, and confidence peak now. Great for high-intensity intervals, heavy lifts, or social group sports.',
          descUr: 'جسم بھرپور چستی محسوس کرتا ہے۔ سخت ورزش اور ہائی انٹینسٹی ٹریننگ کے لیے موزوں ترین وقت۔',
        },
      };

    case 'luteal':
    default:
      return {
        currentCycleDay,
        phase: 'luteal',
        phaseNameEn: 'Luteal Phase',
        phaseNameUr: 'لیوٹئل مرحلہ (پی ایم ایس مرحلہ)',
        phaseSubtitleEn: 'Progesterone dominance & PMS management (Days 17–28)',
        phaseSubtitleUr: 'پروجیسٹرون کا دور اور پی ایم ایس کی علامات (دن ۱۷ تا ۲۸)',
        daysUntilNextPeriod,
        totalCycleLength: cycleLength,
        periodDuration,
        hormones: {
          estrogen: 'Dropping',
          progesterone: 'High',
          energyTendency: 'Variable',
        },
        nutritionalFocus: [
          'Vitamin B6 (poultry, bananas, oats) for serotonin & progesterone',
          'High Magnesium (dark cacao, almonds, spinach) to relieve PMS and mood dips',
          'Complex carbohydrates (brown rice, sweet potatoes) to curb sugar spikes',
          'Potassium (bananas, coconut water) to dispel fluid retention and bloating',
          'Limiting excess refined salt and caffeine',
        ],
        urduNutritionalFocus: [
          'موڈ خوشگوار رکھنے اور وٹامن بی ۶ کے لیے چکن اور کیلے',
          'پی ایم ایس، سوجن اور اینٹھن سے بچاؤ کے لیے میگنیشیم اور ڈارک چاکلیٹ',
          'بلڈ شوگر کو متوازن رکھنے کے لیے براؤن چاول اور جو کا دلیہ',
          'پیٹ کا اپھارہ کم کرنے کے لیے پوٹاشیم اور نمک میں اعتدال',
        ],
        recommendedMovement: {
          titleEn: 'Low-Impact Pilates & Steady Walking',
          titleUr: 'ہلکی پیلاٹیز اور پرسکون چہل قدمی',
          descEn: 'Metabolism is elevated while joints and energy are more vulnerable. Shift from frantic cardio to steady pilates, restorative yoga, and leisurely nature walks.',
          descUr: 'تھکاوٹ بڑھ سکتی ہے، اس لیے تیز ورزش کے بجائے پیلاٹیز، یوگا اور شام کی پرسکون سیر کو ترجیح دیں۔',
        },
      };
  }
}
