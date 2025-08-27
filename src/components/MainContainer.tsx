// src/components/MainContainer.tsx
"use client";

import React from "react";
import dynamic from "next/dynamic";

const VWorld3DProbe = dynamic(
  () => import("@/components/VWorldMap/VWorld3DProbe").then((m) => m.default),
  { ssr: false, loading: () => <div style={{ width: "100%", height: "100%" }} /> }
);

type Len = number | string;
const toCss = (v: Len) => (typeof v === "number" ? `${v}px` : v);

export type MainContainerProps = {
  children: React.ReactNode;
  leftPad?: Len;
  rightPad?: Len;
  bottomPad?: Len;
  headerOffsetPx?: Len; // 호환용
  bgSrc?: string;
  bgAlt?: string;
  objectPosition?: string;
  dim?: boolean;
  mapZ?: number;
  probeTimeoutMs?: number;
  className?: string;
};

export default function MainContainer({
  children,
  leftPad = 0,
  rightPad = 0,
  bottomPad = 0,
  headerOffsetPx, // eslint-disable-line @typescript-eslint/no-unused-vars
  bgSrc = "/MapEx.png",
  bgAlt = "지도(통신 실패 시 대체 이미지)",
  objectPosition = "center",
  dim = false,
  mapZ = 0,
  probeTimeoutMs,
  className = "",
}: MainContainerProps) {
  const h = `calc(100% - ${toCss(bottomPad)})`;

  const overlayZ = mapZ + 5;
  const contentZ = mapZ + 10;

  return (
    <main
      aria-label="메인 컨테이너"
      className={`relative overflow-hidden rounded-xl transition-[min-height,padding] duration-300 ${className}`}
      style={{
        minHeight: h,
        height: h,
        paddingLeft: toCss(leftPad),
        paddingRight: toCss(rightPad),
      }}
    >
      {/* ===== 지도/프로브 레이어 ===== */}
      <div className="absolute inset-0" style={{ zIndex: mapZ }}>
        <VWorld3DProbe
          fallbackSrc={bgSrc}
          alt={bgAlt}
          timeoutMs={probeTimeoutMs}
          style={{ objectPosition }}
          className="w-full h-full"
        />
      </div>

      {/* (선택) 지도 위를 살짝 어둡게 */}
      {dim && (
        <div
          className="pointer-events-none absolute inset-0 bg-black/10"
          style={{ zIndex: overlayZ }}
        />
      )}

      {/* ===== 실제 화면 콘텐츠(카드/패널 등) ===== */}
       <div
        className="relative h-full flex items-center gap-[1.25rem] pointer-events-none"
        style={{ zIndex: contentZ }}
      >
        {/* 💡 패널/버튼 등 상호작용 필요한 루트에만 pointer-events-auto */}
        <div className="pointer-events-auto w-full">
          {children}
        </div>
      </div>
    </main>
  );
}
