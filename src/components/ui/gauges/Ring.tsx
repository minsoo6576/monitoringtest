// src/components/ui/gauges/Ring.tsx
"use client";
import React from "react";

const clamp01 = (n: number) => Math.min(100, Math.max(0, n));
const round = (n: number) => Math.round(n);

// ✅ 고정 색상 (원하는 색으로 바꿔도 됨)
const RING_COLOR = "#3b82f6";   // blue-500
const TRACK_COLOR = "#e5e7eb";  // gray-200

export type RingProps = {
  value: number | string;
  unit: string;
  label: string;
  /** @deprecated 색상은 고정됩니다. 전달해도 무시됩니다. */
  color?: string;
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
  const { value, unit, label } = props; // color는 고정이라 구조분해하지 않음
  const pct = calcPercent(props);
  const angle = (pct / 100) * 360;

  return (
    <div className="grid place-items-center gap-2">
      <div
        className="relative grid place-items-center w-16 h-16 rounded-full"
        style={{
          background: `conic-gradient(${RING_COLOR} ${angle}deg, ${TRACK_COLOR} 0deg)`,
        }}
        aria-label={`${label} ${value}${unit}`}
      >
        <div className="grid place-items-center w-12 h-12 rounded-full bg-white">
          <div className="text-[0.8125rem] leading-4 font-semibold">{value}</div>
          <div className="text-[0.625rem] text-gray-500 leading-3">{unit}</div>
        </div>
      </div>
      <div className="text-xs text-gray-500 text-center">{label}</div>
    </div>
  );
}
