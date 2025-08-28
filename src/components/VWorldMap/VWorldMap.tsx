// src/components/VWorldMap/VWorldMap.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

declare global {
  interface Window {
    vw?: any;
    vworldIsValid?: string;
    vworldErrMsg?: string;
    __vworldLoaded?: boolean;
  }
}

type Props = {
  fallbackSrc?: string;
  alt?: string;
  timeoutMs?: number;
  className?: string;
  style?: React.CSSProperties;
  priorityFallback?: boolean;
};

const VWorld3DMap = dynamic(() => import("./VWorld3DMap"), { ssr: false });

export default function VWorldMap({
  fallbackSrc = "/MapEx.png",
  alt = "지도 이미지",
  timeoutMs = 8000,
  className = "",
  style,
  priorityFallback = true,
}: Props) {
  const [status, setStatus] = useState<"loading" | "ok" | "fail">("loading");

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 레이아웃에서 이미 스크립트 로드됨. 여기서는 준비 상태만 체크.
    const to = window.setTimeout(() => {
      if (status === "loading") {
        console.warn(`[VWorld] Loading timed out after ${timeoutMs}ms.`);
        setStatus("fail");
      }
    }, timeoutMs);

    const pollReady = () => {
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
      requestAnimationFrame(pollReady);
    };

    pollReady();
    return () => clearTimeout(to);
  }, [timeoutMs, status]);

  if (status === "ok") {
    return (
      <div className={className} style={{ width: "100%", height: "100%", ...style }}>
        <VWorld3DMap />
      </div>
    );
  }

  if (status === "fail") {
    return (
      <div className={className} style={{ ...style, width: "100%", height: "100%", position: "relative" }}>
        <Image
          src={fallbackSrc}
          alt={alt}
          fill
          sizes="100vw"
          priority={priorityFallback}
          style={{ objectFit: "cover", ...(style?.objectPosition ? { objectPosition: style.objectPosition } : {}) }}
          unoptimized
        />
      </div>
    );
  }

  return (
    <div
      className={className}
      style={{ width: "100%", height: "100%", background: "#eee", ...style }}
      aria-label="Loading map..."
    />
  );
}
