// src/app/page.tsx
"use client";

import { useState } from "react";
import Header from "@/components/Header";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import BottomSidebar from "@/components/BottomSidebar";
import MainContainer from "@/components/MainContainer";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);
  const [bottomOpen, setBottomOpen] = useState(false);

  // 사이드/바텀 사이즈 (컴포넌트 실제 폭/높이와 일치)
  const LEFT_W = 300;
  const RIGHT_W = 300;
  const BOTTOM_H = 280;
  const HEADER_H = 80;

  // ✅ 추가: 현재 열린 사이드바 폭
  const leftInset = leftOpen ? LEFT_W : 0;
  const rightInset = rightOpen ? RIGHT_W : 0;

  return (
    <>
      <Header />

      {/* 헤더(80px) 아래 화면 전체 영역 */}
      <div className="h-[calc(100vh-80px)] overflow-hidden">
        {/* 좌 스페이서 / 본문 / 우 스페이서 (사이드바와 겹침 방지) */}
        <div className="flex h-full">
          {/* 좌측 스페이서 */}
          <div
            className="shrink-0 transition-[width] duration-300"
            style={{ width: leftOpen ? LEFT_W : 0 }}
          />

          {/* 본문 */}
          <div className="relative flex-1 overflow-hidden">
            <MainContainer
              leftPad={0}
              rightPad={0}
              bottomPad={bottomOpen ? BOTTOM_H : 0}
              headerOffsetPx={HEADER_H}
              bgSrc="/mapex.png"
              objectPosition="center"
            >
              {children}
            </MainContainer>
          </div>

          {/* 우측 스페이서 */}
          <div
            className="shrink-0 transition-[width] duration-300"
            style={{ width: rightOpen ? RIGHT_W : 0 }}
          />
        </div>

        {/* 고정 사이드바/바텀바 */}
        <LeftSidebar
          isOpen={leftOpen}
          onToggle={() => setLeftOpen((v) => !v)}
        />

        <RightSidebar
          isOpen={rightOpen}
          onToggle={() => setRightOpen((v) => !v)}
          panelWidthPx={RIGHT_W}
          topOffsetPx={HEADER_H}
        />

        <BottomSidebar
          isOpen={bottomOpen}
          onToggle={() => setBottomOpen((v) => !v)}
          heightPx={BOTTOM_H}
          // ✅ 추가: 열린 사이드바 폭 전달(좌/우 인셋)
          insetLeftPx={leftInset}
          insetRightPx={rightInset}
        />
      </div>
    </>
  );
}
