"use client";

import React from "react";

type Len = number | string;
const toCss = (v: Len) => (typeof v === "number" ? `${v}px` : v);

type MainContainerProps = {
  children: React.ReactNode;
  leftPad?: Len;
  rightPad?: Len;
  bottomPad?: Len;       
  headerOffsetPx?: Len;    
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
  headerOffsetPx = "6.667rem",
  bgSrc = "/mapex.png",
  bgAlt = "메인 배경",
  objectPosition = "center",
  dim = false,
}: MainContainerProps) {

  const minH = `calc(100vh - ${toCss(headerOffsetPx)} - ${toCss(bottomPad)})`;

  return (
    <main
      aria-label={bgAlt}
      className="relative transition-[min-height,padding] duration-300 bg-cover bg-no-repeat rounded-xl"
      style={{
        minHeight: minH,
        paddingLeft: toCss(leftPad),
        paddingRight: toCss(rightPad),
        backgroundImage: `url(${bgSrc})`,
        backgroundPosition: objectPosition,
      }}
    >
      {dim && <div className="pointer-events-none absolute inset-0 bg-black/10" />}

      {/* 15px 유지: 15 / 12 = 1.25rem */}
      <div className="relative z-10 h-full flex items-center gap-[1.25rem]">
        {children}
      </div>
    </main>
  );
}
