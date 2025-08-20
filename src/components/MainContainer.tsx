"use client";

import React from "react";

type Len = number | string;
const toCss = (v: Len) => (typeof v === "number" ? `${v}px` : v);

type MainContainerProps = {
  children: React.ReactNode;
  leftPad?: Len;
  rightPad?: Len;
  bottomPad?: Len;         // ← 바텀 열릴 때 패널 높이
  headerOffsetPx?: Len;    // ← 고정 헤더 높이
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
  headerOffsetPx = "5rem",     // 기본 80px → 5rem
  bgSrc = "/mapex.png",
  bgAlt = "메인 배경",
  objectPosition = "center",
  dim = false,
}: MainContainerProps) {
  // ✅ rem 대응
  const minH = `calc(100vh - ${toCss(headerOffsetPx)} - ${toCss(bottomPad)})`;

  return (
    <main
      aria-label={bgAlt}
      className="relative transition-[min-height,padding] duration-300 bg-cover bg-no-repeat"
      style={{
        minHeight: minH,
        paddingLeft: toCss(leftPad),
        paddingRight: toCss(rightPad),
        backgroundImage: `url(${bgSrc})`,
        backgroundPosition: objectPosition,
      }}
    >
      {dim && (
        <div className="pointer-events-none absolute inset-0 bg-black/10" />
      )}
      <div className="relative z-10 h-full flex items-center gap-[0.9375rem]">
        {children}
      </div>
    </main>
  );
}
