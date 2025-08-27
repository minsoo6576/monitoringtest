// src/components/VWorldMap/VWorld3DProbe.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import VWorld3DMap from "./VWorld3DMap";

declare global {
  interface Window {
    vw?: any;
    vworldIsValid?: string; // 가이드 스크립트가 세팅하는 전역
    vworldErrMsg?: string;
  }
}

type Props = {
  fallbackSrc?: string;      // 통신 실패 시 띄울 이미지
  alt?: string;
  timeoutMs?: number;        // 타임아웃(통신 실패 간주)
  className?: string;
  style?: React.CSSProperties;
  /** 위 fold에 보이는 경우 LCP 경고 방지 */
  priorityFallback?: boolean;
};

export default function VWorld3DProbe({
  fallbackSrc = "/MapEx.png",
  alt = "지도 이미지",
  timeoutMs = 8000,
  className = "",
  style,
  priorityFallback = true,
}: Props) {
  const [status, setStatus] = useState<"loading" | "ok" | "fail">("loading");

  useEffect(() => {
    if (typeof window === "undefined" || status === "ok") return;

    const to = window.setTimeout(() => {
      if (status === "loading") {
        console.warn(`[VWorld] Loading timed out after ${timeoutMs}ms.`);
        setStatus("fail");
      }
    }, timeoutMs);

    function decide() {
      const gv = window as any;
      if (gv.vworldIsValid === "false") {
        console.warn("[VWorld] invalid key/domain:", gv.vworldErrMsg);
        setStatus("fail");
        return;
      }
      if (window.vw?.Map) {
        setStatus("ok");
        return;
      }
      requestAnimationFrame(decide);
    }

    decide();
    return () => clearTimeout(to);
  }, [timeoutMs, status]);

  if (status === "ok") return <VWorld3DMap />;

  if (status === "fail") {
    return (
      <div className={className} style={{ ...style, width: "100%", height: "100%", position: "relative" }}>
        <Image
  src={fallbackSrc}
  alt={alt}
  fill
  sizes="100vw"              // ✅ 추가
  priority={priorityFallback}
  style={{ objectFit: "cover", ...(style?.objectPosition ? { objectPosition: style.objectPosition } : {}) }}
  unoptimized
/>
      </div>
    );
  }

  // loading
  return (
    <div
      className={className}
      style={{ width: "100%", height: "100%", background: "#eee", ...style }}
      aria-label="Loading map..."
    />
  );
}
