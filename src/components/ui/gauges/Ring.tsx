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
      <div
        className="relative grid place-items-center w-16 h-16 rounded-full text-gray-200 dark:text-[#222]"
        style={{
          background: `conic-gradient(${RING_COLOR} ${angle}deg, currentColor 0deg)`,
        }}
        aria-label={`${label} ${value}${unit}`}
      >
        <div className="grid place-items-center w-12 h-12 rounded-full bg-white dark:bg-[#272829]">
          <div className="text-[0.8125rem] leading-4 font-semibold text-gray-900 dark:text-gray-100">
            {value}
          </div>
          <div className="text-[0.625rem] leading-3 text-gray-500 dark:text-gray-400">
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
