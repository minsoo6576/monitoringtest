"use client";
import React from "react";

const clamp01 = (n: number) => Math.min(100, Math.max(0, n));
const round = (n: number) => Math.round(n);

const RING_COLOR = "#3b82f6"; // blue-500

export type RingProps = {
  value: number | string;
  unit: string;
  label: string;
  percent?: number;
  current?: number;
  total?: number;
  min?: number;
  max?: number;
};

function calcPercent({ percent, current, total, value, min, max }: RingProps) {
  if (typeof percent === "number") return clamp01(round(percent));
  if (typeof current === "number" && typeof total === "number" && total > 0)
    return clamp01(round((current / total) * 100));
  if (typeof value === "number" && typeof max === "number") {
    const base = typeof min === "number" ? min : 0;
    const span = max - base;
    if (span <= 0) return 0;
    return clamp01(round(((value - base) / span) * 100));
  }
  return 0;
}

export default function Ring(props: RingProps) {
  const { value, unit, label } = props;
  const pct = calcPercent(props);
  const angle = (pct / 100) * 360;

  return (
    <div className="grid place-items-center gap-2">
      {/* 바깥 원: 50px = 4.167rem */}
      <div
        className="relative grid place-items-center w-[4.167rem] h-[4.167rem] rounded-full text-gray-200 dark:text-[#222]"
        style={{
          background: `conic-gradient(${RING_COLOR} ${angle}deg, currentColor 0deg)`,
        }}
        aria-label={`${label} ${value}${unit}`}
      >
    
    <div className="grid place-items-center w-[3.16rem] h-[3.16rem] rounded-full bg-white dark:bg-[#272829] gap-0">
  <div className="text-[1rem] font-bold leading-[1rem] text-gray-900 dark:text-gray-100">
    {value}
  </div>
  <div className="text-[0.667rem] font-normal leading-[0.75rem] text-gray-500 dark:text-gray-400 -mt-[1.2rem]">
    {unit}
  </div>
</div>




      </div>

      <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
        {label}
      </div>
    </div>
  );
}
