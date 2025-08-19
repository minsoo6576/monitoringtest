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
  const LEFT_W = 300; // LeftSidebar 전체 폭 (유지)
  const RIGHT_W = 300; // ✅ RightSidebar 패널 폭 (카드260 + 양쪽 gutter 15*2)
  const BOTTOM_H = 280; // BottomSidebar 높이
  const HEADER_H = 80; // 고정 헤더 h-20

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
              bottomPad={bottomOpen ? BOTTOM_H : 0} // ✅ 열릴 때만 높이 반영
              headerOffsetPx={HEADER_H} // ✅ 헤더 높이 전달
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
          panelWidthPx={RIGHT_W} // ✅ 패널 폭 동기화
          topOffsetPx={HEADER_H} // 헤더 높이 보정
        />

        <BottomSidebar
          isOpen={bottomOpen}
          onToggle={() => setBottomOpen((v) => !v)}
          heightPx={BOTTOM_H}
        />
      </div>
    </>
  );
}
