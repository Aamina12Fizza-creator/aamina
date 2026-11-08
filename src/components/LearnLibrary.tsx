import React from 'react';
import {
  BookOpen,
  HelpCircle,
  AlertTriangle,
  Sparkles,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

interface LearnLibraryProps {
  language: 'en' | 'ur';
}

export const LearnLibrary: React.FC<LearnLibraryProps> = ({ language }) => {
  const isUrdu = language === 'ur';
  const t = TRANSLATIONS[language].learn;

  const myths = [
    {
      mythEn: 'Craving chocolate or sweets means your progesterone is deficient.',
      mythUr: 'چاکلیٹ یا میٹھے کی طلب کا مطلب ہے کہ آپ کے جسم میں پروجیسٹرون کم ہے۔',
      factEn:
        'Fluctuating estrogen and progesterone modulate brain serotonin and dopamine sensitivity. Chocolate cravings are driven by the search for elemental magnesium and rapid neurotransmitter elevation, not a direct endocrine deficiency.',
      factUr:
        'حقیقت: ہارمونز کے اتار چڑھاؤ سے دماغ میں سیروٹونن کم ہوتا ہے جس سے میٹھے کی طلب ہوتی ہے۔ چاکلیٹ میں میگنیشیم ہوتا ہے جو دماغ کو پرسکون کرتا ہے؛ یہ کسی ہارمون کی کمی کا تشخیصی ثبوت نہیں ہے۔',
    },
    {
      mythEn: 'Drinking cold water or eating citrus stops menstrual flow or worsens cramps.',
      mythUr: 'ماہواری میں ٹھنڈا پانی پینے یا کھٹی چیزیں (لیموں/دہی) کھانے سے خون جم جاتا ہے۔',
      factEn:
        'Human core body temperature is strictly regulated by the hypothalamus at ~37°C. Digestive contents do not freeze pelvic vessels. In fact, citrus foods provide Vitamin C, which triples non-heme iron absorption from spinach and lentils.',
      factUr:
        'حقیقت: معدے کا کھانا یا پینا بچہ دانی تک نہیں جاتا۔ انسانی جسم کا درجہ حرارت مستحکم رہتا ہے۔ لیموں اور ترش پھلوں کا وٹامن سی پالک اور دالوں کے آئرن کو جسم میں جذب کرنے کے لیے ازحد ضروری ہے۔',
    },
    {
      mythEn: 'Every woman ovulates exactly on Day 14.',
      mythUr: 'ہر عورت کا بیضہ ٹھیک ۱۴ویں دن خارج ہوتا ہے۔',
      factEn:
        'The follicular phase is naturally variable, ranging from 10 to 22 days across individuals. Ovulation occurs approximately 14 days BEFORE the next period, meaning in a 35-day cycle, ovulation happens around Day 21.',
      factUr:
        'حقیقت: چودہواں دن صرف ۲۸ دن کے مثالی سائیکل میں ہوتا ہے۔ مختلف خواتین میں یہ دورانیہ ۱۰ سے ۲۲ دن کا ہو سکتا ہے اور بیضہ اگلے ایام سے ۱۴ دن پہلے خارج ہوتا ہے۔',
    },
    {
      mythEn: 'Severe incapacitating period pain is normal and something women just have to bear.',
      mythUr: 'شدید اور ناقابل برداشت درد ہر عورت کے لیے نارمل ہے اور اسے برداشت ہی کرنا پڑتا ہے۔',
      factEn:
        'Mild cramping from normal prostaglandin contraction is common. However, severe pain that halts work, school, or causes vomiting is clinical dysmenorrhea and warrants evaluation for endometriosis, fibroids, or adenomyosis.',
      factUr:
        'حقیقت: ہلکا مروڑ عام ہے، لیکن بستر پر لٹانے والا شدید درد نارمل نہیں ہے۔ یہ اینڈومیٹریوسس یا رسولی کی علامت ہو سکتا ہے اور اس پر گائناکالوجسٹ سے معائنہ ضروری ہے۔',
    },
  ];

  const redFlags = [
    {
      en: 'Soaking through one or more sanitary pads/tampons every hour for consecutive hours.',
      ur: 'ہر ایک سے دو گھنٹے بعد پیڈ یا کپڑا مکمل بھیگ جانا اور بار بار بدلنا پڑنا۔',
    },
    {
      en: 'Passing blood clots larger than a quarter coin (approx. 2.5 cm across).',
      ur: 'خون کے بڑے لوتھڑے (سکے سے بڑے سائز کے) خارج ہونا۔',
    },
    {
      en: 'Severe debilitating pelvic pain that does not respond to standard pain relief or causes fainting.',
      ur: 'ایسا شدید درد جس سے بے ہوشی طاری ہو یا عام دوائیوں سے بالکل آرام نہ آئے۔',
    },
    {
      en: 'Unexpected spotting or bleeding between menstrual cycles or following intercourse.',
      ur: 'ایام کے درمیان اچانک خون کے دھبے لگنا یا غیر متوقع خون بہنا۔',
    },
  ];

  return (
    <section className="bg-white border border-[#E8DEC8] rounded-2xl p-5 sm:p-8 shadow-xs space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-[#F0EAE1]">
        <span className="text-xs uppercase tracking-wider text-[#C4677E] font-semibold flex items-center gap-1.5">
          <BookOpen className="w-4 h-4" />
          {isUrdu ? 'تحقیق اور سائنسی شواہد' : 'Evidence-Based Cycle Science'}
        </span>
        <h2 className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#4A2234] mt-0.5">
          {t.title}
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">{t.subtitle}</p>
      </div>

      {/* Myths vs Science */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-[#4A2234] mb-4 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-[#C4677E]" />
          <span>{t.mythTitle}</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myths.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#FAF7F2] p-5 rounded-xl border border-[#EDE4D5] space-y-2.5"
            >
              <div className="flex items-start gap-2 text-xs font-semibold text-rose-900">
                <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>
                  {isUrdu ? 'غلط فہمی: ' : 'Common Myth: '}
                  {isUrdu ? item.mythUr : item.mythEn}
                </span>
              </div>
              <div className="flex items-start gap-2 text-xs text-emerald-950 pt-2 border-t border-[#EDE4D5]">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {isUrdu ? 'سائنسی حقیقت: ' : 'Scientific Truth: '}
                  {isUrdu ? item.factUr : item.factEn}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ob/Gyn Red Flags Box */}
      <div className="bg-[#FFF8F8] border border-[#F5D5D8] rounded-xl p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-rose-900 uppercase tracking-wider">
              {t.doctorTitle}
            </h4>
            <p className="text-xs text-rose-800 leading-relaxed">
              {isUrdu
                ? 'لونارا ایک طرز زندگی اور غذائی ساتھی ہے، یہ میڈیکل تشخیص یا علاج کا نعم البدل نہیں ہے۔ مندرجہ ذیل علامات ظاہر ہونے پر فوراً گائناکالوجسٹ سے رجوع فرمائیں:'
                : 'Lunara is an educational and lifestyle platform. It is never a replacement for professional clinical care. Contact a qualified gynecologist or healthcare provider if you experience any of the following:'}
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 pt-2 border-t border-rose-200/60 text-xs text-rose-900">
              {redFlags.map((rf, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>{isUrdu ? rf.ur : rf.en}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
