"use client";
import React from "react";

const clamp01 = (n: number) => Math.min(100, Math.max(0, n));
const round = (n: number) => Math.round(n);

export type LineProps = {
  label: string;
  valueText: string;
  percent?: number;
  current?: number;
  total?: number;
  value?: number;
  max?: number;
  min?: number;
};

function calcPercent({ percent, current, total, value, max, min }: LineProps) {
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

export default function Line(props: LineProps) {
  const { label, valueText } = props;
  const pct = calcPercent(props);

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>{label}</span>
        <span>{valueText}</span>
      </div>
      <div className="h-2 rounded bg-gray-200 overflow-hidden">
        <div
          className="h-2 bg-blue-500"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
