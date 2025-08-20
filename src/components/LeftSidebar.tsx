// src/components/LeftSidebar.tsx
"use client";
import { useEffect } from "react";
import { FieldListGroup, FieldListProps } from "@/components/FieldLists/FieldList";

const FIELDS: FieldListProps[] = [
  {
    id: 1,
    name: "대구모 수로공사",
    statusText: "작업중",
    variant: "primary",
    temperatureText: "35.3°",
    humidityText: "46%",
    gauges: [
      { label: "O2", unit: "%", value: 20, current: 20, total: 100 },
      { label: "CO", unit: "ppm", value: 400, max: 1000 },
      { label: "H2S", unit: "ppm", value: 0, max: 100 },
      { label: "EXP", unit: "LEL", value: 0, current: 0, total: 100 },
    ],
    counts: [
      { label: "위험알리미 (지역형)", valueText: "0개소" },
      { label: "위험알리미 (장비형)", valueText: "0대" },
      { label: "안전지키미", valueText: "0명" },
      { label: "스마트 센서장치", valueText: "0EA" },
    ],
    progress: [
      { label: "작업률", valueText: "40%", percent: 40 },
      { label: "총 작업자 수", valueText: "18명", current: 18, total: 18 },
      { label: "현재 작업자", valueText: "5명", current: 5, total: 18 },
      { label: "미작업자", valueText: "13명", current: 13, total: 18 },
    ],
  },
  {
    id: 2,
    name: "북구 체육문화센터 건립공사",
    statusText: "작업중",
    temperatureText: "35.3°",
    humidityText: "46%",
    gauges: [
      { label: "O2", unit: "%", value: 20, current: 20, total: 100 },
      { label: "CO", unit: "ppm", value: 400, max: 1000 },
      { label: "H2S", unit: "ppm", value: 0, max: 100 },
      { label: "EXP", unit: "LEL", value: 0, current: 0, total: 100 },
    ],
    counts: [
      { label: "위험알리미 (지역형)", valueText: "0개소" },
      { label: "위험알리미 (장비형)", valueText: "0대" },
      { label: "안전지키미", valueText: "0명" },
      { label: "스마트 센서장치", valueText: "0EA" },
    ],
    progress: [
      { label: "작업률", valueText: "40%", percent: 40 },
      { label: "총 작업자 수", valueText: "18명", current: 18, total: 18 },
      { label: "현재 작업자", valueText: "5명", current: 5, total: 18 },
      { label: "미작업자", valueText: "13명", current: 13, total: 18 },
    ],
  },
  {
    id: 3,
    name: "달서구 상수도관로 정비공사",
    statusText: "작업중",
    temperatureText: "35.3°",
    humidityText: "46%",
    gauges : [
      { label: "O2", unit: "%", value: 20, current: 20, total: 100 },
      { label: "CO", unit: "ppm", value: 400, max: 1000 },
      { label: "H2S", unit: "ppm", value: 0, max: 100 },
      { label: "EXP", unit: "LEL", value: 0, current: 0, total: 100 },
    ],
    counts : [
      { label: "위험알리미 (지역형)", valueText: "0개소" },
      { label: "위험알리미 (장비형)", valueText: "0대" },
      { label: "안전지키미", valueText: "0명" },
      { label: "스마트 센서장치", valueText: "0EA" },
    ],
    progress : [
      {label: "작업률", valueText: "40%", percent: 40 },
      {label: "총 작업자 수", valueText: "18명", current: 18, total: 18 },
      {label: "현재 작업자", valueText: "5명", current: 5, total: 18 },
      {label: "미작업자", valueText: "13명", current: 13, total: 18 },
    ]
  }
];


type LeftSidebarProps = {
  isOpen: boolean;
  onToggle: () => void;
};

export default function LeftSidebar({ isOpen, onToggle }: LeftSidebarProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onToggle();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onToggle]);

  return (
    <>
      <div
        onClick={onToggle}
        className={`fixed inset-0 bg-black/30 lg:hidden transition-opacity duration-300
        ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      <aside
        className={`fixed left-0 top-[5rem] z-40 h-[calc(100vh-5rem)] w-[18.75rem] border-r bg-white
        transition-transform duration-300 will-change-transform
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="h-full overflow-y-auto p-4">
         <FieldListGroup items={FIELDS} />
        </div>
      </aside>

      <button
        type="button"
        onClick={onToggle}
        aria-label={isOpen ? "왼쪽 메뉴 닫기" : "왼쪽 메뉴 열기"}
        className={`fixed z-50 top-[calc(50vh+2.5rem)] -translate-y-1/2
                    transition-[left,transform] duration-300
                    ${isOpen ? "left-[17.5rem]" : "left-0"}
                    flex h-12 w-8 items-center justify-center
                    rounded-r-full border border-gray-200 bg-white shadow
                    hover:bg-gray-50 active:scale-95`}
      >
        <svg
          viewBox="0 0 24 24"
          className={`h-5 w-5 transition-transform ${isOpen ? "" : "rotate-180"}`}
          aria-hidden="true"
        >
          <path
            d="M15 6l-6 6 6 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </>
  );
}
