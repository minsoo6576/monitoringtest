"use client";

import React from "react";

type MainContainerProps = {
  children: React.ReactNode;
  leftPad?: number;
  rightPad?: number;
  bottomPad?: number; // ← 바텀 열릴 때 패널 높이(px)
  headerOffsetPx?: number; // ← 고정 헤더 높이 (기본 80)
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
  headerOffsetPx = 80,
  bgSrc = "/mapex.png",
  bgAlt = "메인 배경",
  objectPosition = "center",
  dim = false,
}: MainContainerProps) {
  // ✅ 바텀이 열리면 표시 높이를 줄여서 bg-cover가 재스케일되도록
  const minH = `calc(100vh - ${headerOffsetPx}px - ${bottomPad}px)`;

  return (
    <main
      aria-label={bgAlt}
      className="relative transition-[min-height,padding] duration-300 bg-cover bg-no-repeat"
      style={{
        minHeight: minH,
        paddingLeft: leftPad,
        paddingRight: rightPad,
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
