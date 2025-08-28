// src/components/LeftSidebar.tsx
"use client";

import { useEffect } from "react";
import { FieldListGroup, FieldListProps } from "@/components/FieldLists/FieldList";
import { ScrollArea } from "@/components/ui/scroll-area";
import LeftToggleButton from "@/components/ToggleButton/LeftToggleButton";

const PANEL_WIDTH_REM = 28;               // ⬅️ 패널 너비(rem) — 토글 버튼에도 동일 값 전달
const HEADER_HEIGHT_REM = 6.667;          // top과 높이에 사용
const PANEL_TOP_CSS = `${HEADER_HEIGHT_REM}rem`; // "6.667rem"
const PANEL_HEIGHT_CSS = `calc(100vh - ${HEADER_HEIGHT_REM}rem)`;

const FIELDS: FieldListProps[] = [
  {
    id: 1,
    name: "대구모 수로공사",
    statusText: "작업중",
    variant: "primary",
    temperatureText: "35.3°",
    humidityText: "46%",
    gauges: [
      { label: "O2", unit: "%", value: 20, max: 100 },
      { label: "CO", unit: "ppm", value: 400, max: 1000 },
      { label: "H2S", unit: "ppm", value: 0, max: 100 },
      { label: "EXP", unit: "LEL", value: 0, max: 100 },
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
      { label: "O2", unit: "%", value: 20, max: 100 },
      { label: "CO", unit: "ppm", value: 400, max: 1000 },
      { label: "H2S", unit: "ppm", value: 0, max: 100 },
      { label: "EXP", unit: "LEL", value: 0, max: 100 },
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
    gauges: [
      { label: "O2", unit: "%", value: 20, max: 100 },
      { label: "CO", unit: "ppm", value: 400, max: 1000 },
      { label: "H2S", unit: "ppm", value: 0, max: 100 },
      { label: "EXP", unit: "LEL", value: 0, max: 100 },
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
      { label: "현재 작업자", valueText: "5명", current: 12, total: 18 },
      { label: "미작업자", valueText: "13명", current: 13, total: 18 },
    ],
  },
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
      {/* 사이드바 패널 */}
      <aside
        className={`fixed left-0 z-40
                    bg-white dark:bg-[#1E1E20] !border-0 !ring-0 !shadow-none !outline-none
                    transition-transform duration-300 will-change-transform`}
        style={{
          top: PANEL_TOP_CSS,
          height: PANEL_HEIGHT_CSS,
          width: `${PANEL_WIDTH_REM}rem`,
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <ScrollArea className="h-full w-full">
          <div className="h-full overflow-y-auto px-[1.333rem] text-gray-900 dark:text-gray-100">
            {/* 내부 카드류는 FieldListGroup 쪽에서 dark:bg / dark:border 처리 */}
            <FieldListGroup items={FIELDS} />
          </div>
        </ScrollArea>
      </aside>

      {/* 토글 버튼: 새 컴포넌트 적용 */}
      <LeftToggleButton
        isOpen={isOpen}
        onToggle={onToggle}
        leftRemWhenOpen={PANEL_WIDTH_REM}
        top={`calc(50vh + ${HEADER_HEIGHT_REM / 2}rem)`} // 기존 위치와 유사

      />
    </>
  );
}
