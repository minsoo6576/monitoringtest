// src/components/VWorldMap/VWorldScriptLoader.tsx
"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    vw?: any;
    vworldIsValid?: string;
    vworldErrMsg?: string;
    __vworldLoaded?: boolean;
  }
}

export default function VWorldScriptLoader({
  apiKey,
  domain,
}: {
  apiKey: string;
  domain: string;
}) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // 이미 로드됨
    if (window.__vworldLoaded || window.vw?.Map) return;

    const id = "vworld-webgl3-auto";
    if (document.getElementById(id)) return;

    const url =`https://map.vworld.kr/js/webglMapInit.js.do?version=3.0&apiKey=036A9E06-64C2-3934-A436-813006721906&domain=localhost:3000`

    const s = document.createElement("script");
    s.id = id;
    s.src = url;
    s.async = true;

    s.onload = () => {
      // 내부 초기화가 늦을 수 있어, vw.Map 생길 때까지 폴링
      const tick = () => {
        if (window.vworldIsValid === "false") {
          console.warn("[VWorld] invalid:", window.vworldErrMsg);
          return;
        }
        if (window.vw?.Map) {
          window.__vworldLoaded = true;
          return;
        }
        requestAnimationFrame(tick);
      };
      tick();
    };
    s.onerror = (e) => {
      console.error("[VWorld] script load error", e);
    };

    document.head.appendChild(s);
  }, [apiKey, domain]);

  return null;
}
