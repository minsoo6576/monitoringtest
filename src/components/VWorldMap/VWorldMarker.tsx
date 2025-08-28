// src/components/VWorldMap/VWorldMarker.tsx
"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

/** 최소 타입 스텁 */
declare global {
  interface Window {
    vw?: any;
    ws3d?: any;
    __VWORLD_MAP__?: any;
  }
}

type MapInstance = {
  createMarker: (
    title: string,
    x: number, // 경도
    y: number, // 위도
    html: string,
    imgUrl: string,
    popupWidth?: number | null,
    popupHeight?: number | null,
    altitude?: number | null,
    labelOptions?: any
  ) => void;
  getObjectById: (id: string) => any;
  removeObjectById: (id: string) => any;
  removeObject: (obj: any) => void;
  lookat?: {
    setLocation?: (x: number, y: number) => void;
    setAltitude?: (alt: number) => void;
  };
  onMoveEnd?: { raiseEvent?: () => void };
};

type Props = { className?: string };

/** 기본 좌표: 대구 */
const DAEGU_LAT = 35.8714;
const DAEGU_LON = 128.6014;

export default function VWorldMarker({ className = "" }: Props) {
  const [ready, setReady] = useState(false);
  const mapRef = useRef<MapInstance | null>(null);
  const guardId = useId();

  // 입력폼 상태
  const [createMode, setCreateMode] = useState(false);
  const [latInput, setLatInput] = useState(`${DAEGU_LAT}`);
  const [lonInput, setLonInput] = useState(`${DAEGU_LON}`);
  const [titleInput, setTitleInput] = useState("사용자 마커");

  // 마지막 생성 마커 id (삭제/수정에 사용)
  const lastIdRef = useRef<string | null>(null);

  /** 전역 map 인스턴스 참조 */
  useEffect(() => {
    const tryBind = () => {
      const m: MapInstance | null =
        (window as any).vw?.getCurrentMap?.() ??
        (window as any).__VWORLD_MAP__ ??
        null;
      if (m) {
        mapRef.current = m;
        setReady(true);
        return true;
      }
      return false;
    };

    if (!tryBind()) {
      let raf = 0;
      const poll = () => {
        if (tryBind()) {
          cancelAnimationFrame(raf);
          return;
        }
        raf = requestAnimationFrame(poll);
      };
      poll();
      return () => cancelAnimationFrame(raf);
    }
  }, [guardId]);

  /** 좌표로 마커 생성 */
  const createMarkerAt = useCallback(
    (lat: number, lon: number, title = "사용자 마커") => {
      const map =
        mapRef.current ??
        (window as any).vw?.getCurrentMap?.() ??
        (window as any).__VWORLD_MAP__;

      if (!ready || !map?.createMarker) {
        console.warn("[Marker] map not ready");
        return;
      }

      // 카메라 이동(보이도록)
      map.lookat?.setLocation?.(lon, lat);
      map.lookat?.setAltitude?.(1500);
      map.onMoveEnd?.raiseEvent?.();

      const id = `user_marker_${Date.now()}`;

      const html = `<div class="vworld-info-window">
        <h2 style="margin:0 0 4px 0;">${title}</h2>
        <p><b>위치</b> : ${lat.toFixed(6)}, ${lon.toFixed(6)}</p>
      </div>`;

      const img = "https://map.vworld.kr/images/v4map/bluepin.png";

      // 안전 파라미터(팝업 크기/고도)
      map.createMarker(id, lon, lat, html, img, 240, 120, 40);
      map.getObjectById?.(id)?.show?.();

      lastIdRef.current = id;
      console.log("[Marker] created:", id);
    },
    [ready]
  );

  /** “마커생성” 버튼: 입력폼 토글 */
  const onClickCreate = useCallback(() => {
    setCreateMode((v) => !v);
  }, []);

  /** 입력폼 “생성” */
  const onConfirmCreate = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault();
      const lat = parseFloat(latInput);
      const lon = parseFloat(lonInput);
      if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
        alert("위도/경도를 올바르게 입력하세요.");
        return;
      }
      if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
        alert("위도는 -90~90, 경도는 -180~180 범위여야 합니다.");
        return;
      }
      createMarkerAt(lat, lon, titleInput.trim() || "사용자 마커");
      setCreateMode(false);
    },
    [latInput, lonInput, titleInput, createMarkerAt]
  );

  /** 마지막 마커 삭제 (없으면 camp1 시도) */
  const removeMarker = useCallback(() => {
    const map =
      mapRef.current ??
      (window as any).vw?.getCurrentMap?.() ??
      (window as any).__VWORLD_MAP__;

    if (!ready || !map) return;

    const targetId = lastIdRef.current ?? "camp1";
    const obj = map.getObjectById?.(targetId);
    if (obj) map.removeObject?.(obj);
    else map.removeObjectById?.(targetId);

    console.log("[Marker] removed:", targetId);
    if (lastIdRef.current === targetId) lastIdRef.current = null;
  }, [ready]);

  /** 마지막 마커 내용/위치 수정 (조금 이동 + 팝업 업데이트) */
  const updateMarker = useCallback(() => {
    const map =
      mapRef.current ??
      (window as any).vw?.getCurrentMap?.() ??
      (window as any).__VWORLD_MAP__;

    if (!ready || !map) return;

    const targetId = lastIdRef.current ?? "test2";
    const obj = map.getObjectById?.(targetId);
    if (!obj) {
      alert("수정할 마커를 찾지 못했습니다. 먼저 생성해 주세요.");
      return;
    }

    // 약간 남서쪽으로 이동
    obj.x = (obj.x ?? DAEGU_LON) - 0.0025;
    obj.y = (obj.y ?? DAEGU_LAT) - 0.0018;
    obj.popupWidth = 240;
    obj.popupHeight = 120;
    obj.popupHtml = "내용 업데이트 완료<br/>조금 이동했습니다.";
    obj.show?.();

    // 카메라도 재조정(확인용)
    map.lookat?.setLocation?.(obj.x, obj.y);
    map.lookat?.setAltitude?.(1200);
    map.onMoveEnd?.raiseEvent?.();

    console.log("[Marker] updated:", targetId, obj);
  }, [ready]);

  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onClickCreate}
          className="rounded border px-3 py-1 text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
          disabled={!ready}
        >
          마커생성
        </button>
        <button
          type="button"
          onClick={removeMarker}
          className="rounded border px-3 py-1 text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
          disabled={!ready}
        >
          마커삭제
        </button>
        <button
          type="button"
          onClick={updateMarker}
          className="rounded border px-3 py-1 text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
          disabled={!ready}
        >
          마커내용변경
        </button>
      </div>

      {/* 입력폼: “마커생성” 클릭 시 토글 */}
      {createMode && (
        <form
          onSubmit={onConfirmCreate}
          className="mt-2 flex flex-wrap items-end gap-2 rounded-lg border border-[#EEE] dark:border-[#222] bg-white/80 dark:bg-black/40 backdrop-blur px-3 py-2"
        >
          <div className="flex flex-col">
            <label className="text-xs text-gray-500 dark:text-gray-300">위도 (lat)</label>
            <input
              className="rounded border px-2 py-1 text-sm bg-transparent"
              value={latInput}
              onChange={(e) => setLatInput(e.target.value)}
              placeholder="예: 35.8714"
              inputMode="decimal"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs text-gray-500 dark:text-gray-300">경도 (lon)</label>
            <input
              className="rounded border px-2 py-1 text-sm bg-transparent"
              value={lonInput}
              onChange={(e) => setLonInput(e.target.value)}
              placeholder="예: 128.6014"
              inputMode="decimal"
            />
          </div>

          <div className="flex flex-col min-w-40">
            <label className="text-xs text-gray-500 dark:text-gray-300">제목</label>
            <input
              className="rounded border px-2 py-1 text-sm bg-transparent"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              placeholder="마커 제목"
            />
          </div>

          <button
            type="submit"
            className="rounded border px-3 py-1 text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            생성
          </button>
          <button
            type="button"
            onClick={() => setCreateMode(false)}
            className="rounded border px-3 py-1 text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            취소
          </button>
        </form>
      )}

      {!ready && (
        <p className="mt-2 text-xs text-amber-600">
          window.vw 가 아직 준비되지 않았어요. (배경 VWorld 지도가 먼저 초기화되어야 함)
        </p>
      )}
    </div>
  );
}
