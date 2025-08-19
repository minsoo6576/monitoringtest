"use client";

import React from "react";

type MainContainerProps = {
  children: React.ReactNode;
  leftPad?: number;
  rightPad?: number;
  bottomPad?: number;
  bgSrc?: string;        
  bgAlt?: string;
  objectPosition?: string;
  dim?: boolean;
};
// 예시 사진, vWorld 추가 예정
export default function MainContainer({
  children,
  leftPad = 0,
  rightPad = 0,
  bottomPad = 0,
  bgSrc = "/mapex.png",
  bgAlt = "메인 배경",
  objectPosition = "center",
  dim = false,
}: MainContainerProps) {
  return (
    <main
      aria-label={bgAlt}
      className="relative min-h-[calc(100vh-80px)] transition-[padding] duration-300 bg-cover bg-no-repeat"
      style={{
        paddingLeft: leftPad,
        paddingRight: rightPad,
        paddingBottom: bottomPad,
        backgroundImage: `url(${bgSrc})`,
        backgroundPosition: objectPosition,
      }}
    >
      {dim && <div className="pointer-events-none absolute inset-0 bg-black/10" />}
      <div className="relative z-10">{children}</div>
    </main>
  );
}
