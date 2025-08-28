// src/components/BottomSidebar.tsx
"use client";

import React, { memo, useMemo, useState } from "react";
import NoticeWarnTable from "@/components/LiveAlarm/NoticeWarnTable";
import EachFieldChart from "@/components/Charts/EachFieldChart";
import BottomToggleButton from "@/components/ToggleButton/BottomToggleButton";

type LogItem = { location: string; text: string; time?: string; tone?: "warn" | "danger" };

const ALARMS: LogItem[] = [
  { location: "현장1", text: "test01 O₂ 주의발생생생생생생생생생", time: "10:31:21", tone: "warn" },
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
  const resolvedHeightRem = useMemo(() => heightPx / 12, [heightPx]); // 1rem = 12px
  const centerX = useMemo(
    () => `calc(${insetLeftRem}rem + (100vw - ${insetLeftRem + insetRightRem}rem)/2)`,
    [insetLeftRem, insetRightRem]
  );

  // 패널 위 호버 시 버튼을 계속 보이게 유지
  const [hoveringPanel, setHoveringPanel] = useState(false);

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
        onMouseEnter={() => setHoveringPanel(true)}
        onMouseLeave={() => setHoveringPanel(false)}
      >
        <div className="h-full pt-[1rem] pb-[1.667rem]">
          <div className="flex h-full w-full items-stretch gap-[clamp(0.667rem,3rem-2vw,1.083rem)]">
            {/* 1) 알림 */}
            <Card className="h-full w-[clamp(22rem,32vw,33.333rem)] shrink-0 px-[1.333rem] py-[1.333rem]">
              <SectionTitle>전체현장 실시간 알림</SectionTitle>
              <div className="mt-[0.667rem] min-h-0 flex-1 w-full">
                <NoticeWarnTable items={ALARMS} />
              </div>
            </Card>

            {/* 2) 현장별 활동량 */}
            <Card className="h-full w-[33.333rem] shrink-0 px-[1.333rem] py-[1.333rem]">
              <SectionTitle>현장별 활동량</SectionTitle>
              <div className="mt-[0.667rem] flex min-h-0 flex-1 items-center justify-center">
                <EachFieldChart />
              </div>
            </Card>

            {/* 3) 8개 지표 */}
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

      {/* 토글 버튼 (분리 컴포넌트) */}
      <BottomToggleButton
        isOpen={isOpen}
        onToggle={onToggle}
        left={centerX}
        bottomRemWhenOpen={resolvedHeightRem}
        holdVisible={hoveringPanel}
      />
    </>
  );
}
