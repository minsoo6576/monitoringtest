// src/components/VWorldMap/VWorld3DMap.tsx
"use client";
import { useEffect, useId } from "react";

declare global {
  interface Window {
    vw?: any;
    __VWORLD_3D_STARTED?: boolean; // ⬅ 전역 가드
    viewer?: any;                  // (VWorld 내부에서 잡는 전역)
  }
}

export default function VWorld3DMap() {
  const mapId = useId().replace(/:/g, "_");
  const apiKey = process.env.NEXT_PUBLIC_VWORLD_API_KEY as string;

  useEffect(() => {
    if (typeof window === "undefined" || !apiKey) return;

    // ✅ 중복 방지: 이미 시작했으면 두 번째 init 스킵
    if (window.__VWORLD_3D_STARTED) {
      console.warn("[VWorld] already started, skip duplicate init");
      return;
    }

    function waitForContainerAndInit() {
      const el = document.getElementById(mapId);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.width < 10 || rect.height < 10) {
        requestAnimationFrame(waitForContainerAndInit);
        return;
      }
      init3D();
    }

    function init3D() {
      const { vw } = window;
      if (!vw?.Map) { requestAnimationFrame(init3D); return; }

      const el = document.getElementById(mapId);
      if (el) el.innerHTML = ""; // HMR 중복 캔버스 제거

      // ✅ 최종 초기화 직전에 다시 한 번 가드(동시성 대비)
      if (window.__VWORLD_3D_STARTED) return;

      const map = new vw.Map();
      map.setOption({ mapId, logo: true, navigation: true });
      map.setMapId(mapId);
      map.setInitPosition(
        new vw.CameraPosition(
          new vw.CoordZ(127.425, 38.196, 1548700),
          new vw.Direction(0, -90, 0)
        )
      );
      map.setLogoVisible(true);
      map.setNavigationZoomVisible(true);

      // ✅ 여기서 “이미 시작” 표시
      window.__VWORLD_3D_STARTED = true;

      map.start();

      const r = el?.getBoundingClientRect();
      console.log("[VWorld] started", { w: r?.width, h: r?.height });
    }

    waitForContainerAndInit();
  }, [apiKey, mapId]);

  return <div id={mapId} style={{ width: "100%", height: "100%" }} />;
}
