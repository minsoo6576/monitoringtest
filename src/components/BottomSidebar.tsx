// src/components/BottomSidebar.tsx
"use client";

import React, { memo } from "react";
import NoticeWarnTable from "@/components/LiveAlarm/NoticeWarnTable";
import EachFieldChart  from "@/components/Charts/EachFieldChart"

type LogItem = { location: string; text: string; time?: string; tone?: "warn" | "danger" };

const ALARMS: LogItem[] = [
  { location: "현장1", text: "test01 O₂ 주의발생", time: "10:31:21", tone: "warn" },
  { location: "현장2", text: "H₂S 감지",          time: "10:29:10", tone: "warn" },
  { location: "현장1", text: "추가 데이터 1",     time: "10:19:00", tone: "danger" },
  { location: "현장2", text: "추가 데이터 2",     time: "10:18:00", tone: "warn" },
];

const SectionTitle = memo(({ children }: { children: React.ReactNode }) => (
  <h4 className="text-[1.15rem] text-[#3A4451] font-bold not-italic leading-[1] tracking-[-0.027rem] dark:text-gray-200">
    {children}
  </h4>
));
SectionTitle.displayName = "SectionTitle";

const Card = memo(({ className = "", children }: { className?: string; children: React.ReactNode }) => (
  <div className={`flex flex-col items-start rounded-[0.417rem] border border-gray-200 bg-white dark:border-[#222] dark:bg-[#272829] ${className}`}>
    {children}
  </div>
));
Card.displayName = "Card";

export default function BottomSidebar({
  isOpen,
  onToggle,
  heightPx = 200,
  insetLeftRem = 0,
  insetRightRem = 0,
}: {
  isOpen: boolean;
  onToggle: () => void;
  heightPx?: number;
  insetLeftRem?: number;
  insetRightRem?: number;
}) {
  const resolvedHeightRem = heightPx / 12; // 1rem = 12px
  const centerX = `calc(${insetLeftRem}rem + (100vw - ${insetLeftRem + insetRightRem}rem)/2)`;

  return (
    <>
      {/* 패널 */}
      <aside
        className={`fixed bottom-0 z-40 bg-white transition-transform duration-300 will-change-transform
                    ${isOpen ? "" : "translate-y-full"}
                    transition-[left,right,transform] dark:bg-[#1E1E20]`}
        style={{
          height: `${resolvedHeightRem}rem`,
          left: `${insetLeftRem}rem`,
          right: `${insetRightRem}rem`,
        }}
      >
        <div className="h-full pt-[1rem] pb-[1.667rem]">
          {/* 메인: 2컬럼 (그래프 제거) */}
          <div className="flex h-full w-full items-stretch gap-[clamp(0.667rem,3rem-2vw,1.083rem)]">
            {/* 1) 알림 */}
            <Card className="h-full w-[clamp(22rem,32vw,33.333rem)] shrink-0 px-[1.333rem] py-[1.333rem]">
              <SectionTitle>전체현장 실시간 알림</SectionTitle>
              <div className="mt-[0.667rem] min-h-0 flex-1 w-full">
                <NoticeWarnTable items={ALARMS} />
              </div>
            </Card>

         <Card className="h-full w-[33.333rem] shrink-0 px-[1.333rem] py-[1.333rem]">
  <SectionTitle>현장별 활동량</SectionTitle>
  <div className="mt-[0.667rem] flex min-h-0 flex-1 items-center justify-center">
    <EachFieldChart />
  </div>
</Card>
            {/* 2) 8개 지표 */}
            <div className="h-full flex-1">
              <div className="grid h-full content-between grid-cols-[repeat(4,minmax(0,1fr))] gap-[clamp(0.667rem,1.5rem-0.5vw,1rem)]">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex h-[7.417rem] w-full flex-col justify-center rounded-[0.5rem] border border-gray-200 bg-white px-[1rem] py-[0.667rem] dark:border-[#222] dark:bg-[#272829]"
                  >
                    <div className="text-[1rem] text-gray-500 dark:text-gray-400">지표 {i + 1}</div>
                    <div className="text-[1.333rem] font-semibold text-gray-900 dark:text-gray-100">값</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* 토글 버튼 */}
      <button
        type="button"
        onClick={onToggle}
        aria-label={isOpen ? "하단 메뉴 닫기" : "하단 메뉴 열기"}
        className="fixed z-50 -translate-x-1/2 transition-[bottom,left,transform] duration-300 flex h-[2.667rem] w-[5.333rem] items-center justify-center rounded-t-full border border-gray-200 bg-white text-gray-700 shadow hover:bg-gray-50 active:scale-95 dark:border-[#222] dark:bg-[#272829] dark:text-gray-100 dark:hover:bg-[#2f3032]"
        style={{ left: centerX, bottom: isOpen ? `${resolvedHeightRem}rem` : 0 }}
      >
        <svg
          viewBox="0 0 24 24"
          className={`h-[1.667rem] w-[1.667rem] transition-transform ${isOpen ? "rotate-90" : "-rotate-90"}`}
          aria-hidden="true"
        >
          <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </>
  );
}
