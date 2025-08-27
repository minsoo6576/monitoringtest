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

  /** ========= Layout Tokens (root 12px 기준) =========
   * LeftSidebar: w-[28rem]
   * RightSidebar: panelWidthRem=28, cardWidthRem=24.667, gutterRem=1.25
   * BottomSidebar: heightPx 기반 (컴포넌트 내부에서 /12로 rem 환산)
   * Header: 80px → 6.667rem
   */
  const HEADER_H_REM = 6.667;   // 80 / 12
  const LEFT_W_REM = 28;        // LeftSidebar 실제 width와 동일
  const RIGHT_PANEL_REM = 28;   // RightSidebar panelWidthRem
  const RIGHT_CARD_REM = 24.667;
  const RIGHT_GUTTER_REM = 1.25;
  const RIGHT_W_REM = Math.max(RIGHT_PANEL_REM, RIGHT_CARD_REM + RIGHT_GUTTER_REM * 2);

  const BOTTOM_H_PX = 220; // BottomSidebar는 heightPx를 받음 (컴포넌트 내에서 /12)

  // 현재 열린 사이드바에 따라 하단바 좌/우 인셋 계산(rem)
  const insetLeftRem = leftOpen ? LEFT_W_REM : 0;
  const insetRightRem = rightOpen ? RIGHT_W_REM : 0;

  return (
    <>
      <Header />

      {/* 헤더 높이만큼 하단 영역 확보 */}
      <div
        className="overflow-hidden bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100"
        style={{ height: `calc(100vh - ${HEADER_H_REM}rem)` }}
      >
        <div className="flex h-full">
          {/* 좌측 스페이서 (사이드바 폭과 정확히 일치) */}
          <div
            className="shrink-0 transition-[width] duration-300"
            style={{ width: leftOpen ? `${LEFT_W_REM}rem` : "0rem" }}
          />

          {/* 본문 */}
          <div className="relative flex-1 overflow-hidden">

        <MainContainer
          leftPad={0}
          rightPad={0}
          bottomPad={bottomOpen ? BOTTOM_H_PX : 0}
          headerOffsetPx={0}              // ✅ 부모가 이미 헤더만큼 높이 뺐음
          // bgSrc/objectPosition 넘겨도 되지만 현재 계산엔 미사용
          // objectPosition="center"
          // 디버그: 지도를 위로 띄워서 덮임 여부 확인
          mapZ={0}                        // 필요시 30으로 올려서 테스트
        >
          {children}
        </MainContainer>

          </div>

          {/* 우측 스페이서 (RightSidebar 가시 영역 폭과 동일) */}
          <div
            className="shrink-0 transition-[width] duration-300"
            style={{ width: rightOpen ? `${RIGHT_W_REM}rem` : "0rem" }}
          />
        </div>

        {/* ===== 고정 패널들 ===== */}
        <LeftSidebar
          isOpen={leftOpen}
          onToggle={() => setLeftOpen(v => !v)}
        />

        <RightSidebar
          isOpen={rightOpen}
          onToggle={() => setRightOpen(v => !v)}
          // ✅ rem 기반 props로 전달 (이 컴포넌트는 rem을 받음)
          panelWidthRem={RIGHT_PANEL_REM}
          cardWidthRem={RIGHT_CARD_REM}
          gutterRem={RIGHT_GUTTER_REM}
          topOffsetRem={HEADER_H_REM}
        />

        <BottomSidebar
          isOpen={bottomOpen}
          onToggle={() => setBottomOpen(v => !v)}
          // ✅ 이 컴포넌트는 heightPx를 받아 내부에서 /12로 환산
          heightPx={BOTTOM_H_PX}
          insetLeftRem={insetLeftRem}
          insetRightRem={insetRightRem}
        />
      </div>
    </>
  );
}
