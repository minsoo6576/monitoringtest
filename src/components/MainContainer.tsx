// src/components/MainContainer.tsx
"use client";

import React from "react";

type MainContainerProps = {
  children: React.ReactNode;
  leftPad?: number;
  rightPad?: number;
  /** 바텀 패널 높이(열릴 때만 값 전달) */
  bottomPad?: number;
  /** 고정 헤더 높이(기본 80) */
  headerOffsetPx?: number;
  bgSrc?: string;
  bgAlt?: string;
  objectPosition?: string;
  dim?: boolean;
};

export default function MainContainer({
  children,
  leftPad = 0,
  rightPad = 0,
  bottomPad = 0,
  headerOffsetPx = 80, // ✅ 헤더 높이
  bgSrc = "/mapex.png",
  bgAlt = "메인 배경",
  objectPosition = "center",
  dim = false,
}: MainContainerProps) {
  // 바텀이 열리면 min-height를 줄여서 실제 표시 영역을 축소 → bg-cover가 재스케일됨
  const minH = `calc(100vh - ${headerOffsetPx}px - ${bottomPad}px)`;

  return (
    <main
      aria-label={bgAlt}
      className="relative transition-[min-height,padding] duration-300 bg-cover bg-no-repeat"
      style={{
        minHeight: minH, // ✅ 핵심: 높이 자체를 줄임
        paddingLeft: leftPad,
        paddingRight: rightPad,
        // paddingBottom: 0,        // ❌ 더 이상 패딩으로 여백 주지 않음
        backgroundImage: `url(${bgSrc})`,
        backgroundPosition: objectPosition,
      }}
    >
      {dim && (
        <div className="pointer-events-none absolute inset-0 bg-black/10" />
      )}
      <div className="relative z-10 h-full flex items-center gap-[15px]">
        {children}
      </div>
    </main>
  );
}
