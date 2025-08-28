// src/components/VWorldMap/VWorld3DMap.tsx
"use client";

import { useEffect, useId } from "react";

declare global {
  interface Window {
    vw?: any;
    __VWORLD_3D_STARTED?: boolean;
    __VWORLD_MAP__?: any;
    viewer?: any;
  }
}

export default function VWorld3DMap() {
  const mapId = useId().replace(/:/g, "_");

  useEffect(() => {
   // ✅ 언제든 accessor 보장 (이미 시작돼 있어도 브릿지 깔기)
   const ensureAccessor = () => {
     if (!(window as any).vw) return;
     if (!(window as any).vw.getCurrentMap) {
       (window as any).vw.getCurrentMap = () => (window as any).__VWORLD_MAP__ ?? null;
     }
   };
   ensureAccessor();

    if (typeof window === "undefined") return;

    // 이미 시작된 경우 두 번째 init 스킵
    if (window.__VWORLD_3D_STARTED) {
     console.warn("[VWorld] already started, wiring accessor only");
     // ⚠ 이미 시작되어도 __VWORLD_MAP__이 없을 수 있으니 가볍게 폴링해 채움
     let raf = 0;
     const pump = () => {
       ensureAccessor();
       // 다른 곳에서 map을 노출했다면 여기서 잡힘
       if ((window as any).__VWORLD_MAP__) return;
       raf = requestAnimationFrame(pump);
     };
     pump();
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
      if (!vw?.Map) {
        requestAnimationFrame(init3D);
        return;
      }

      const el = document.getElementById(mapId);
      if (el) el.innerHTML = ""; // HMR 중복 캔버스 제거

      if (window.__VWORLD_3D_STARTED) return;

      const map = new vw.Map();
      map.setOption({ mapId, logo: true, navigation: true });
      map.setMapId(mapId);

      // ✅ 전역 accessor/인스턴스 노출
      (window as any).__VWORLD_MAP__ = map;
+     ensureAccessor();

      map.setInitPosition(
        new vw.CameraPosition(
          new vw.CoordZ(128.6014, 35.8650, 20000),
          new vw.Direction(0, -90, 0)
        )
      );

      try {
        const navCtrl = new vw.NavigationControl(map);
        navCtrl?.setEnable?.(true);
        navCtrl?.setWheelZoom?.(true);
        navCtrl?.setDragPan?.(true);
        navCtrl?.setDragRotate?.(true);
        navCtrl?.setDblClickZoom?.(true);
        map.addControl?.(navCtrl);
      } catch (e) {
        console.warn("[VWorld] NavigationControl attach failed", e);
      }

      window.__VWORLD_3D_STARTED = true;
      map.start();
    }

    waitForContainerAndInit();
  }, [mapId]);

  return <div id={mapId} style={{ width: "100%", height: "100%" }} />;
}
