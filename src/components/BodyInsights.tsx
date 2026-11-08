import React, { useState, useEffect } from 'react';
import {
  Activity,
  Moon,
  Droplets,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Heart,
  TrendingUp,
} from 'lucide-react';
import { CycleCalculationResult } from '../utils/cycleEngine';
import { TRANSLATIONS } from '../data/translations';

interface BodyInsightsProps {
  cycleState: CycleCalculationResult;
  language: 'en' | 'ur';
}

export const BodyInsights: React.FC<BodyInsightsProps> = ({ cycleState, language }) => {
  const isUrdu = language === 'ur';

  // 4-7-8 Breathing state
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [secondsLeft, setSecondsLeft] = useState(4);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (breathingActive) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            if (breathPhase === 'inhale') {
              setBreathPhase('hold');
              return 7;
            } else if (breathPhase === 'hold') {
              setBreathPhase('exhale');
              return 8;
            } else {
              setBreathPhase('inhale');
              setCyclesCompleted((c) => c + 1);
              return 4;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [breathingActive, breathPhase]);

  const resetBreathing = () => {
    setBreathingActive(false);
    setBreathPhase('inhale');
    setSecondsLeft(4);
    setCyclesCompleted(0);
  };

  const movement = cycleState.recommendedMovement;

  return (
    <section className="bg-white border border-[#E8DEC8] rounded-2xl p-5 sm:p-8 shadow-xs space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-[#F0EAE1]">
        <span className="text-xs uppercase tracking-wider text-[#C4677E] font-semibold">
          {isUrdu ? 'طرزِ زندگی اور جسمانی ہم آہنگی' : 'Body Intelligence & Holistic Movement'}
        </span>
        <h2 className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#4A2234] mt-0.5">
          {isUrdu ? 'جسمانی رہنمائی، ورزش اور سانس کی مشق' : 'Phase-Aligned Movement & Calming Care'}
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
          {isUrdu
            ? 'ماہواری کے مختلف ادوار میں جسم کی توانائی اور جوڑوں کی لچک بدلتی ہے۔ اپنے جسم کی سنیں اور مناسب سرگرمیاں اختیار کریں۔'
            : 'Hormonal fluctuations naturally modulate metabolic rate, ligament laxity, and insulin sensitivity. Sync your workouts and self-care with your biology.'}
        </p>
      </div>

      {/* Movement and Exercise Recommendation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#FAF7F2] p-5 sm:p-6 rounded-xl border border-[#EDE4D5] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-[#4A2234] mb-2">
              <Activity className="w-5 h-5 text-[#C4677E]" />
              <h3 className="text-sm font-bold uppercase tracking-wider">
                {isUrdu ? 'آج کی تجویز کردہ ورزش' : 'Recommended Movement for Current Phase'}
              </h3>
            </div>
            <h4 className="font-serif-cormorant text-2xl font-bold text-[#4A2234] mt-1">
              {isUrdu ? movement.titleUr : movement.titleEn}
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
              {isUrdu ? movement.descUr : movement.descEn}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-[#EDE4D5] flex items-center justify-between text-xs text-stone-600">
            <span>
              {isUrdu ? 'مرحلہ:' : 'Phase:'}{' '}
              <strong className="text-[#4A2234]">
                {isUrdu ? cycleState.phaseNameUr : cycleState.phaseNameEn}
              </strong>
            </span>
            <span>
              {isUrdu ? 'بنیادی توانائی:' : 'Energy Level:'}{' '}
              <strong className="text-[#C4677E]">
                {cycleState.hormones.energyTendency}
              </strong>
            </span>
          </div>
        </div>

        {/* 4-7-8 Breathing Relaxation Widget */}
        <div className="bg-[#FAF7F2] p-5 sm:p-6 rounded-xl border border-[#EDE4D5] flex flex-col items-center justify-between text-center">
          <div className="w-full text-left">
            <div className="flex items-center gap-2 text-[#4A2234]">
              <Heart className="w-4 h-4 text-[#C4677E]" />
              <h3 className="text-xs font-bold uppercase tracking-wider">
                {isUrdu ? 'درد اور اینٹھن کے لیے ۴-۷-۸ سانس کی مشق' : '4-7-8 Dysmenorrhea & Cramp Breath'}
              </h3>
            </div>
            <p className="text-xs text-stone-500 mt-1">
              {isUrdu
                ? 'پٹھوں کے کھچاؤ کو فوری ڈھیلا کرنے اور پیراسمپیتھٹک اعصابی نظام کو فعال کرنے کا سائنسی طریقہ۔'
                : 'Clinically proven to downregulate sympathetic fight-or-flight signaling and relieve uterine smooth muscle tension.'}
            </p>
          </div>

          {/* Interactive Breathing Ring */}
          <div className="my-5 relative flex items-center justify-center">
            <div
              className={`w-32 h-32 rounded-full border-4 flex flex-col items-center justify-center transition-all duration-1000 ${
                breathPhase === 'inhale'
                  ? 'border-[#7A9A7B] scale-110 bg-[#EEF5EE]'
                  : breathPhase === 'hold'
                  ? 'border-[#DDA15E] scale-110 bg-[#FFF8EE]'
                  : 'border-[#C4677E] scale-95 bg-[#FAF0F2]'
              }`}
            >
              <span className="text-xs font-semibold uppercase text-stone-600">
                {breathPhase === 'inhale'
                  ? isUrdu
                    ? 'سانس اندر'
                    : 'Inhale'
                  : breathPhase === 'hold'
                  ? isUrdu
                    ? 'روکیں'
                    : 'Hold'
                  : isUrdu
                  ? 'سانس باہر'
                  : 'Exhale'}
              </span>
              <span className="font-mono text-3xl font-bold text-[#4A2234] mt-0.5">
                {secondsLeft}s
              </span>
            </div>
          </div>

          {/* Breathing Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setBreathingActive(!breathingActive)}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#4A2234] hover:bg-[#381926] rounded-lg transition-transform active:scale-95 flex items-center gap-1.5"
            >
              {breathingActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>
                {breathingActive
                  ? isUrdu
                    ? 'روکیں'
                    : 'Pause'
                  : isUrdu
                  ? 'مشق شروع کریں'
                  : 'Start Exercise'}
              </span>
            </button>
            <button
              onClick={resetBreathing}
              className="p-2 text-stone-500 hover:text-stone-800 rounded-lg hover:bg-stone-200 transition-colors"
              title="Reset timer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs text-stone-500">
              {isUrdu ? `دور: ${cyclesCompleted}` : `Cycles: ${cyclesCompleted}`}
            </span>
          </div>
        </div>
      </div>

      {/* Sleep Hygiene & Hydration Protocols */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl border border-stone-200 bg-white flex items-start gap-3">
          <Moon className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-semibold text-[#4A2234]">
              {isUrdu ? 'نیند اور درجہ حرارت کی بحالی' : 'Luteal & Menstrual Sleep Regulation'}
            </h4>
            <p className="text-xs text-stone-600 mt-1 leading-relaxed">
              {isUrdu
                ? 'پروجیسٹرون کی وجہ سے جسم کا بنیادی درجہ حرارت ادھا ڈگری بڑھ جاتا ہے جس سے بے خوابی ہو سکتی ہے۔ کمرے کا درجہ حرارت ۱۹ سے ۲۰ ڈگری سینٹی گریڈ رکھیں اور سونے سے دو گھنٹے قبل اسکرین کا استعمال بند کریں۔'
                : 'Elevated progesterone increases basal body temperature by ~0.5°C, often triggering fragmented REM sleep. Keep bedroom ambient temperature at 18–20°C and supplement with warm chamomile tea.'}
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-stone-200 bg-white flex items-start gap-3">
          <Droplets className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-semibold text-[#4A2234]">
              {isUrdu ? 'ہائیڈریشن اور واٹر ریٹینشن' : 'Electrolyte Hydration Protocol'}
            </h4>
            <p className="text-xs text-stone-600 mt-1 leading-relaxed">
              {isUrdu
                ? 'پیٹ کے پھولنے کا علاج کم پانی پینا نہیں ہے؛ روزانہ کم از کم ۲ سے ۲.۵ لیٹر پانی پئیں اور پوٹاشیم والی غذائیں لیں تاکہ سوجن ختم ہو سکے۔'
                : 'Counter-intuitively, premenstrual fluid retention improves with increased hydration. Drink 2.2–2.5L daily with a pinch of Himalayan pink salt or lemon juice to optimize cellular fluid pressure.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
