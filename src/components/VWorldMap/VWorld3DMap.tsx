// src/components/VWorldMap/VWorld3DMap.tsx
"use client";
import { useEffect, useId } from "react";

declare global {
  interface Window {
    vw?: any;
    __VWORLD_3D_STARTED?: boolean; // ⬅ 전역 가드(중복 init 방지)
    viewer?: any;                  // (VWorld 내부에서 잡는 전역)
  }
}

/**
 * VWorld 3D 지도 컴포넌트
 * - 중복 초기화를 안전하게 가드
 * - 마우스 드래그/휠/더블클릭 등 인터랙션 활성화를 위해 NavigationControl 추가
 */
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

      // ✅ 마우스 인터랙션 활성화: NavigationControl 부착
      //    - 드래그로 이동/회전, 휠 줌, 더블클릭 줌 등
      try {
        const navCtrl = new vw.NavigationControl(map);
        // 일부 프로젝트에서 메서드 존재 유무가 다를 수 있어 안전하게 체크
        navCtrl?.setEnable?.(true);
        navCtrl?.setWheelZoom?.(true);
        navCtrl?.setDragPan?.(true);
        navCtrl?.setDragRotate?.(true);
        navCtrl?.setDblClickZoom?.(true);
        map.addControl?.(navCtrl);
      } catch (e) {
        console.warn("[VWorld] NavigationControl attach failed (fallback to default interactions)", e);
      }

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
