"use client";

import { useState } from "react";
import Header from "@/components/Header";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import BottomSidebar from "@/components/BottomSidebar";
import MainContainer from "@/components/MainContainer";

export default function PageLayout({ children }: { children: React.ReactNode }) {
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);
  const [bottomOpen, setBottomOpen] = useState(false);

  // 🔧 rem 기준 사이드/바텀/헤더 사이즈 (12px root 기준으로 환산)
  const LEFT_W_REM = 25;       // 300px ÷ 12 = 25rem
  const RIGHT_W_REM = 25;      // 300px ÷ 12 = 25rem
  const BOTTOM_H_REM = 17.5;   // 210px ÷ 12 = 17.5rem
  const HEADER_H_REM = 6.667;  // 80px ÷ 12 ≈ 6.667rem

  // ✅ 현재 열린 사이드바에 따라 하단바 인셋을 rem 값으로 계산
  const insetLeftRem = leftOpen ? LEFT_W_REM : 0;
  const insetRightRem = rightOpen ? RIGHT_W_REM : 0;

  return (
    <>
      <Header />

      {/* 헤더(6.667rem) 아래 영역 */}
      <div className="overflow-hidden" style={{ height: `calc(100vh - ${HEADER_H_REM}rem)` }}>
        <div className="flex h-full">
          {/* 좌측 스페이서 */}
          <div
            className="shrink-0 transition-[width] duration-300"
            style={{ width: leftOpen ? `${LEFT_W_REM}rem` : "0rem" }}
          />
          {/* 본문 */}
          <div className="relative flex-1 overflow-hidden">
            <MainContainer
              leftPad={0}
              rightPad={0}
              bottomPad={bottomOpen ? `${BOTTOM_H_REM}rem` : 0}
              headerOffsetPx={`${HEADER_H_REM}rem` as unknown as number} // 기존 타입이 number면 유지
              bgSrc="/mapex.png"
              objectPosition="center"
            >
              {children}
            </MainContainer>
          </div>
          {/* 우측 스페이서 */}
          <div
            className="shrink-0 transition-[width] duration-300"
            style={{ width: rightOpen ? `${RIGHT_W_REM}rem` : "0rem" }}
          />
        </div>

        {/* 고정 사이드바/바텀바 */}
        <LeftSidebar isOpen={leftOpen} onToggle={() => setLeftOpen(v => !v)} />
        <RightSidebar
          isOpen={rightOpen}
          onToggle={() => setRightOpen(v => !v)}
          panelWidthPx={RIGHT_W_REM * 12}   // rem 기준 변경 → px 환산도 12배
          topOffsetPx={HEADER_H_REM * 12}   // rem 기준 변경 → px 환산도 12배
        />
        <BottomSidebar
          isOpen={bottomOpen}
          onToggle={() => setBottomOpen(v => !v)}
          heightRem={BOTTOM_H_REM}
          insetLeftRem={insetLeftRem}
          insetRightRem={insetRightRem}
        />
      </div>
    </>
  );
}
