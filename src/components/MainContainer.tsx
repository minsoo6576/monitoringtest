// src/components/MainContainer.tsx
"use client";

import React from "react";
import dynamic from "next/dynamic";

// 통합 맵
const VWorldMap = dynamic(
  () => import("@/components/VWorldMap/VWorldMap").then((m) => m.default),
  { ssr: false, loading: () => <div style={{ width: "100%", height: "100%" }} /> }
);

// ✅ 마커 버튼 패널
const VWorldMarker = dynamic(
  () => import("@/components/VWorldMap/VWorldMarker").then((m) => m.default),
  { ssr: false }
);

type Len = number | string;
const toCss = (v: Len) => (typeof v === "number" ? `${v}px` : v);

export type MainContainerProps = {
  children: React.ReactNode;
  leftPad?: Len;
  rightPad?: Len;
  bottomPad?: Len;
  headerOffsetPx?: Len; // eslint-disable-line @typescript-eslint/no-unused-vars
  bgSrc?: string;
  bgAlt?: string;
  objectPosition?: string;
  dim?: boolean;
  className?: string;
  probeTimeoutMs?: number;
  apiKey?: string;
  domain?: string;
  /** ⬇ 마커 버튼 오버레이 표시 여부 */
  renderMarkerPanel?: boolean;
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
  className = "",
  probeTimeoutMs,
  apiKey,
  domain,
  renderMarkerPanel = true, // 기본 ON (원하면 false로 끄면 됨)
}: MainContainerProps) {
  const h = `calc(100% - ${toCss(bottomPad)})`;

  return (
    <main
      aria-label="메인 컨테이너"
      className={[
        "relative isolate rounded-xl",
        "border border-[#EEE] dark:border-white/10",
        className,
      ].join(" ")}
      style={{
        minHeight: h,
        height: h,
        paddingLeft: toCss(leftPad),
        paddingRight: toCss(rightPad),
      }}
    >
      {/* ===== 지도 레이어 ===== */}
      <div className="absolute inset-0 -z-10 rounded-xl overflow-hidden">
        <VWorldMap
          fallbackSrc={bgSrc}
          alt={bgAlt}
          timeoutMs={probeTimeoutMs}
          className="w-full h-full"
          style={{ objectPosition }}
          apiKey={apiKey as any}
          domain={domain as any}
        />
        {dim && <div className="absolute inset-0 bg-black/10 pointer-events-none" />}
      </div>

      {/* ===== 컨텐츠 ===== */}
      <div className="relative h-full pointer-events-none">
        <div className="flex h-full w-full items-center gap-[1.25rem] pointer-events-none">
          {React.Children.map(children, (child, i) => (
            <div key={i} className="pointer-events-auto">
              {child}
            </div>
          ))}
        </div>

        {/* ✅ 마커 버튼 오버레이 */}
        {renderMarkerPanel && (
          <div className="pointer-events-auto absolute top-3 left-3 z-10">
            <div className="rounded-xl border border-[#EEE] dark:border-[#222] bg-white/90 dark:bg-black/50 backdrop-blur px-3 py-2 shadow-sm">
              <VWorldMarker />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
