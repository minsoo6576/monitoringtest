// src/components/FieldLists/FieldList.tsx
"use client";
import React from "react";
import Ring from "@/components/ui/gauges/Ring";
import Line from "@/components/ui/gauges/Line";

/* ===== 타입 ===== */
export type GaugeDatum = {
  label: string; unit: string; value: number | string;
  percent?: number; current?: number; total?: number; min?: number; max?: number;
};
export type CountDatum = { label: string; valueText: string };
export type ProgressDatum = {
  label: string; valueText: string;
  percent?: number; current?: number; total?: number; value?: number; max?: number; min?: number;
};
export type FieldListProps = {
  id?: string | number;
  name: string;
  statusText: string;
  variant?: "primary" | "slate";
  temperatureText: string;
  humidityText: string;
  gauges: GaugeDatum[];
  counts: CountDatum[];
  progress: ProgressDatum[];
  updatedAtText?: string;
};

const cn = (...xs: Array<string | false | null | undefined>) => xs.filter(Boolean).join(" ");

/* ===== 단일 카드 ===== */
export function FieldList({
  name, statusText, variant = "primary",
  temperatureText, humidityText, gauges, counts, progress, updatedAtText,
}: FieldListProps) {
  const tempBoxCls =
    variant === "primary" ? "rounded-lg bg-blue-600 px-3 py-3 text-white"
                          : "rounded-lg bg-slate-700 px-3 py-3 text-white";
  const humiBoxCls =
    variant === "primary" ? "rounded-lg bg-blue-50 px-3 py-3 text-blue-700"
                          : "rounded-lg bg-slate-200 px-3 py-3 text-slate-800";

  return (
    <div className="w-full">
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-4">
        <div className="flex items-start justify-between">
          <div className="font-semibold text-gray-900">{name}</div>
          <span className={cn("inline-flex items-center rounded-md px-2 py-1 text-xs font-medium",
            variant === "primary" ? "bg-blue-50 text-blue-600" : "bg-slate-100 text-slate-700")}>
            {statusText}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className={tempBoxCls}>
            <div className="text-xs/none opacity-90">현장온도</div>
            <div className="text-xl font-semibold">{temperatureText}</div>
          </div>
          <div className={humiBoxCls}>
            <div className="text-xs/none opacity-90">현장습도</div>
            <div className="text-xl font-semibold">{humidityText}</div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-4 gap-3">
          {gauges.map(g => (
            <Ring key={g.label} label={g.label} unit={g.unit} value={g.value}
                  percent={g.percent} current={g.current} total={g.total} min={g.min} max={g.max} />
          ))}
        </div>

        <hr className="my-4 border-gray-200" />

        <div className="space-y-3 text-sm">
          {counts.map(c => (
            <div key={c.label} className="flex items-center justify-between">
              <span className="text-gray-600">{c.label}</span>
              <span className="font-semibold text-gray-900">{c.valueText}</span>
            </div>
          ))}
        </div>

        <hr className="my-4 border-gray-200" />

        <div className="space-y-3">
          {progress.map(p => (
            <Line key={p.label} label={p.label} valueText={p.valueText}
                  percent={p.percent} current={p.current} total={p.total}
                  value={p.value} max={p.max} min={p.min} />
          ))}
        </div>

        {updatedAtText && (
          <p className="mt-3 text-right text-[0.75rem] text-gray-500">{updatedAtText}</p>
        )}
      </div>
    </div>
  );
}

/* ===== 여러 카드 묶음 ===== */
export function FieldListGroup({ items }: { items: FieldListProps[] }) {
  return (
    <div className="flex flex-col gap-4">
      {items.map(item => <FieldList key={item.id ?? item.name} {...item} />)}
    </div>
  );
}
