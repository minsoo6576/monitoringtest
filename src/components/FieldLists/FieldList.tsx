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
};

const cn = (...xs: Array<string | false | null | undefined>) => xs.filter(Boolean).join(" ");

export function FieldList({
  name, statusText, variant = "primary",
  temperatureText, humidityText, gauges, counts, progress,
}: FieldListProps) {
  return (
    <div className="w-full">
      {/* 카드 컨테이너 */}
      <div
        className="rounded-2xl border border-gray-200 bg-white shadow-sm p-[1.333rem]
                   dark:border-[#222] dark:bg-[#272829]"
      >
        {/* 헤더 라인 */}
        <div className="flex items-start justify-between">
          <div className="font-semibold text-[1.15rem] text-gray-900 dark:text-gray-100">{name}</div>

          <span
            className={cn(
              "inline-flex w-[50px] h-[26px] px-[8px] py-[7px] justify-center items-center gap-[10px]",
              "rounded-[6px] bg-[#026CF3]",
              "text-white text-[0.833rem]",
              "dark:bg-[#313233]",
            )}
          >
            {statusText}
          </span>
        </div>

        {/* 온/습도 박스 */}
        <div className="mt-[1.333rem] grid grid-cols-2 gap-[1rem]">
          {/* 현장온도 */}
          <div
            className={cn(
              "flex flex-col justify-center items-center gap-[0.125rem]",
              "w-[9.167rem] h-[4.167rem] px-[2.375rem] py-[1rem]",
              "rounded-lg",
              variant === "primary"
                ? "bg-blue-600 text-white dark:bg-blue-600"
                : "bg-slate-700 text-white dark:bg-slate-700"
            )}
          >
             <div className="text-[0.833rem] font-normal leading-[1.25rem] text-[#F3F8FF]">현장온도</div>
            <div className=" leading-[1.083rem] font-semibold text-[#F3F8FF] ">{temperatureText}</div>
          </div>

          {/* 현장습도 */}
          <div
            className={cn(
              "flex flex-col justify-center items-center gap-[0.125rem]",
                "w-[9.167rem] h-[4.167rem] px-[2.375rem] py-[1rem]",
              "rounded-lg",
              variant === "primary"
                ? "bg-blue-50 text-blue-700 dark:bg-[#272829] dark:text-blue-300 dark:border dark:border-[#222]"
                : "bg-slate-200 text-slate-800 dark:bg-[#272829] dark:text-slate-200 dark:border dark:border-[#222]"
            )}
          >
            <div className="text-[0.833rem] font-normal leading-[1.25rem] text-[#026CF3]">
            현장습도
          </div>

          <div className=" leading-[1.083rem] font-semibold text-[#026CF3] ">{humidityText}</div>
          </div>
        </div>

        {/* 게이지(링) */}
        <div className="mt-[1.25rem] grid grid-cols-4 gap-[0.6775rem] ">
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

        <hr className="my-[1.333rem] border-gray-200 dark:border-[#EEE]" />

        {/* 카운트 목록 */}
        <div className="space-y-3 text-[1rem]">
          {counts.map(c => (
            <div key={c.label} className="flex items-center justify-between">
              <span className="font-normal leading-normal text-[#3A4451] dark:text-gray-300">{c.label}</span>
              <span className="font-bold leading-normal text-[#3A4451] dark:text-gray-100">{c.valueText}</span>
            </div>
          ))}
        </div>

        <hr className="my-[1.333rem] border-gray-200 dark:border-[#EEE]" />

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
