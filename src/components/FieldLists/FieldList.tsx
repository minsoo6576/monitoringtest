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

export function FieldList({
  name, statusText, variant = "primary",
  temperatureText, humidityText, gauges, counts, progress, updatedAtText,
}: FieldListProps) {
  // 온습도 작은 박스 (라이트/다크 각각 가독성 유지)
  const tempBoxCls =
    variant === "primary"
      ? "rounded-lg bg-blue-600 px-[1rem] py-[1rem] text-white dark:bg-blue-600"
      : "rounded-lg bg-slate-700 px-[1rem] py-[1rem] text-white dark:bg-slate-700";

  const humiBoxCls =
    variant === "primary"
      ? "rounded-lg bg-blue-50 px-[1rem] py-[1rem] text-blue-700 dark:bg-[#272829] dark:text-blue-300 dark:border dark:border-[#222]"
      : "rounded-lg bg-slate-200 px-[1rem] py-[1rem] text-slate-800 dark:bg-[#272829] dark:text-slate-200 dark:border dark:border-[#222]";

  return (
    <div className="w-full">
      {/* 카드 컨테이너 */}
      <div
        className="rounded-2xl border border-gray-200 bg-white shadow-sm p-[1.333rem]
                   dark:border-[#222] dark:bg-[#272829]"
      >
        {/* 헤더 라인 */}
        <div className="flex items-start justify-between">
          <div className="font-semibold text-gray-900 dark:text-gray-100">{name}</div>

          <span
            className={cn(
              "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium",
              variant === "primary"
                ? "bg-blue-50 text-blue-600 dark:bg-blue-600/20 dark:text-blue-300"
                : "bg-slate-100 text-slate-700 dark:bg-slate-600/20 dark:text-slate-200"
            )}
          >
            {statusText}
          </span>
        </div>

        {/* 온/습도 박스 */}
        <div className="mt-[1.333rem] grid grid-cols-2 gap-[1rem]">
          <div className={tempBoxCls}>
            <div className="text-xs/none opacity-90">현장온도</div>
            <div className="text-xl font-semibold">{temperatureText}</div>
          </div>
          <div className={humiBoxCls}>
            <div className="text-xs/none opacity-90">현장습도</div>
            <div className="text-xl font-semibold">{humidityText}</div>
          </div>
        </div>

        {/* 게이지(링) */}
        <div className="mt-[1.667rem] grid grid-cols-4 gap-[1rem] ">
          {gauges.map(g => (
            <Ring
              key={g.label}
              label={g.label}
              unit={g.unit}
              value={g.value}
              percent={g.percent}
              current={g.current}
              total={g.total}
              min={g.min}
              max={g.max}
            />
          ))}
        </div>

        <hr className="my-[1.333rem] border-gray-200 dark:border-[#222]" />

        {/* 카운트 목록 */}
        <div className="space-y-3 text-sm">
          {counts.map(c => (
            <div key={c.label} className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-300">{c.label}</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">{c.valueText}</span>
            </div>
          ))}
        </div>

        <hr className="my-[1.333rem] border-gray-200 dark:border-[#222]" />

        {/* 진행률/바 */}
        <div className="space-y-3">
          {progress.map(p => (
            <Line
              key={p.label}
              label={p.label}
              valueText={p.valueText}
              percent={p.percent}
              current={p.current}
              total={p.total}
              value={p.value}
              max={p.max}
              min={p.min}
            />
          ))}
        </div>

        {updatedAtText && (
          <p className="mt-3 text-right text-[1rem] text-gray-500 dark:text-gray-400">
            {updatedAtText}
          </p>
        )}
      </div>
    </div>
  );
}

/* ===== 여러 카드 묶음 ===== */
export function FieldListGroup({ items }: { items: FieldListProps[] }) {
  return (
    <div className="flex flex-col gap-[1.333rem]">
      {items.map(item => (
        <FieldList key={item.id ?? item.name} {...item} />
      ))}
    </div>
  );
}
