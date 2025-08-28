// src/components/MainContainer.tsx
"use client";

import React from "react";
import dynamic from "next/dynamic";

const VWorld3DProbe = dynamic(
  () => import("@/components/VWorldMap/VWorld3DProbe").then(m => m.default),
  { ssr: false, loading: () => <div style={{ width: "100%", height: "100%" }} /> }
);

type Len = number | string;
const toCss = (v: Len) => (typeof v === "number" ? `${v}px` : v);

export type MainContainerProps = {
  children: React.ReactNode;
  leftPad?: Len;
  rightPad?: Len;
  bottomPad?: Len;
  headerOffsetPx?: Len;
  bgSrc?: string;
  bgAlt?: string;
  objectPosition?: string;
  dim?: boolean;
  className?: string;
  probeTimeoutMs?: number;
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
}: MainContainerProps) {
  const h = `calc(100% - ${toCss(bottomPad)})`;

  return (
    <main
      aria-label="메인 컨테이너"
      className={[
        // ✅ isolate로 독립 스택 컨텍스트 생성 → 내부 얇은 보더가 캔버스와 충돌하지 않음
        "relative isolate rounded-xl",
        // ✅ 메인 박스 자체 보더만 유지 (내부 카드 보더와 무관, 간섭 없음)
        "border border-[#EEE] dark:border-white/10",
        className,
      ].join(" ")}
      style={{
        minHeight: h,
        height: h,
        paddingLeft: toCss(leftPad),
        paddingRight: toCss(rightPad),
        // ⚠️ overflow-hidden 제거: 내부 카드/리스트의 1px 보더가 잘리지 않게
      }}
    >
      {/* ===== 지도 레이어: 항상 뒤로(-z) 내리고, 모서리만 둥글게/클리핑 ===== */}
      <div className="absolute inset-0 -z-10 rounded-xl overflow-hidden">
        <VWorld3DProbe
          fallbackSrc={bgSrc}
          alt={bgAlt}
          timeoutMs={probeTimeoutMs}
          style={{ objectPosition }}
          className="w-full h-full"
        />
        {dim && (
          <div className="absolute inset-0 bg-black/10 pointer-events-none" />
        )}
      </div>

      {/* ===== 컨텐츠: 빈 공간만 지도에 이벤트 통과, 실제 패널만 상호작용 ===== */}
      <div className="relative h-full pointer-events-none">
        <div className="flex h-full w-full items-center gap-[1.25rem] pointer-events-none">
          {React.Children.map(children, (child, i) => (
            <div key={i} className="pointer-events-auto">
              {child}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
