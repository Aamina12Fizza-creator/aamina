import React from 'react';
import { CycleCalculationResult } from '../utils/cycleEngine';
import { CyclePhase } from '../types';

interface CycleRingProps {
  cycleState: CycleCalculationResult;
  language: 'en' | 'ur';
  onSelectPhasePreview?: (phase: CyclePhase) => void;
}

export const CycleRing: React.FC<CycleRingProps> = ({
  cycleState,
  language,
  onSelectPhasePreview,
}) => {
  const { currentCycleDay, totalCycleLength, periodDuration } = cycleState;
  const isUrdu = language === 'ur';

  const size = 260;
  const strokeWidth = 22;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  // Calculate day markers
  const days = Array.from({ length: totalCycleLength }, (_, i) => i + 1);

  // Helper to get color for a specific day
  const getDayColor = (day: number) => {
    const ovulationDay = Math.max(12, totalCycleLength - 14);
    if (day <= periodDuration) return '#C4677E'; // Menstrual - Rose
    if (day < ovulationDay - 1) return '#7A9A7B'; // Follicular - Sage
    if (day <= ovulationDay + 2) return '#DDA15E'; // Ovulatory - Amber
    return '#5E3043'; // Luteal - Plum
  };

  // Current day angle
  const currentAngle = ((currentCycleDay - 0.5) / totalCycleLength) * 360 - 90;
  const markerX = center + (radius - 1) * Math.cos((currentAngle * Math.PI) / 180);
  const markerY = center + (radius - 1) * Math.sin((currentAngle * Math.PI) / 180);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[260px] h-[260px]">
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Base background track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke="#EFE8DD"
            strokeWidth={strokeWidth}
          />

          {/* Render segmented colored arcs */}
          {days.map((day) => {
            const arcLength = circumference / totalCycleLength;
            const strokeDashoffset = circumference - (day * arcLength);
            const color = getDayColor(day);
            const isToday = day === currentCycleDay;

            return (
              <circle
                key={day}
                cx={center}
                cy={center}
                r={radius}
                fill="transparent"
                stroke={color}
                strokeWidth={isToday ? strokeWidth + 2 : strokeWidth}
                strokeDasharray={`${arcLength - 1.5} ${circumference - (arcLength - 1.5)}`}
                strokeDashoffset={-((day - 1) * arcLength)}
                opacity={isToday ? 1 : 0.75}
                className="transition-all duration-300 hover:opacity-100 cursor-pointer"
                onClick={() => {
                  const ovulationDay = Math.max(12, totalCycleLength - 14);
                  let phase: CyclePhase = 'luteal';
                  if (day <= periodDuration) phase = 'menstrual';
                  else if (day < ovulationDay - 1) phase = 'follicular';
                  else if (day <= ovulationDay + 2) phase = 'ovulatory';
                  onSelectPhasePreview?.(phase);
                }}
              />
            );
          })}
        </svg>

        {/* Current Day Pointer Pin */}
        <div
          className="absolute w-5 h-5 -ml-2.5 -mt-2.5 rounded-full bg-white border-2 border-[#4A2234] shadow-md pointer-events-none flex items-center justify-center transition-all duration-500"
          style={{
            left: `${markerX}px`,
            top: `${markerY}px`,
          }}
        >
          <div className="w-2 h-2 rounded-full bg-[#C4677E]" />
        </div>

        {/* Center Information */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 pointer-events-none">
          <span className="text-xs uppercase tracking-widest text-stone-500 font-medium">
            {isUrdu ? 'سائیکل کا دن' : 'Cycle Day'}
          </span>
          <div className="font-serif-cormorant text-4xl sm:text-5xl font-bold text-[#4A2234] my-0.5">
            {currentCycleDay}
            <span className="text-lg font-normal text-stone-400">/{totalCycleLength}</span>
          </div>
          <p className="text-xs font-semibold text-[#C4677E] max-w-[150px] leading-tight">
            {isUrdu ? cycleState.phaseNameUr : cycleState.phaseNameEn}
          </p>
          <span className="text-[11px] text-stone-500 mt-1">
            {isUrdu
              ? `${cycleState.daysUntilNextPeriod} دن باقی`
              : `${cycleState.daysUntilNextPeriod} days to period`}
          </span>
        </div>
      </div>

      {/* Phase Legend with Clean Typographic Separators */}
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-xs text-stone-600 mt-4">
        <button
          onClick={() => onSelectPhasePreview?.('menstrual')}
          className="flex items-center gap-1.5 hover:text-stone-900 transition-colors"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#C4677E]" />
          <span>{isUrdu ? 'ایام (۱-۵)' : 'Menstrual (1-5)'}</span>
        </button>
        <span className="text-stone-300">·</span>
        <button
          onClick={() => onSelectPhasePreview?.('follicular')}
          className="flex items-center gap-1.5 hover:text-stone-900 transition-colors"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#7A9A7B]" />
          <span>{isUrdu ? 'فولیکولر (۶-۱۲)' : 'Follicular (6-12)'}</span>
        </button>
        <span className="text-stone-300">·</span>
        <button
          onClick={() => onSelectPhasePreview?.('ovulatory')}
          className="flex items-center gap-1.5 hover:text-stone-900 transition-colors"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#DDA15E]" />
          <span>{isUrdu ? 'بیضوی (۱۳-۱۶)' : 'Ovulatory (13-16)'}</span>
        </button>
        <span className="text-stone-300">·</span>
        <button
          onClick={() => onSelectPhasePreview?.('luteal')}
          className="flex items-center gap-1.5 hover:text-stone-900 transition-colors"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#5E3043]" />
          <span>{isUrdu ? 'لیوٹئل (۱۷-۲۸)' : 'Luteal (17-28)'}</span>
        </button>
      </div>
    </div>
  );
};
