// src/components/LeftSidebar.tsx
"use client";

import { useEffect } from "react";

type LeftSidebarProps = {
  isOpen: boolean;
  onToggle: () => void;
  panelWidthPx?: number; // 사이드 패널 외곽 폭 (스페이서와 동일)
  cardWidthPx?: number; // 카드 폭 (Figma: 260)
  gutterPx?: number; // 패널 안쪽 여백
  topOffsetPx?: number; // 고정 헤더 높이
};

export default function LeftSidebar({
  isOpen,
  onToggle,
  panelWidthPx = 300, // page.tsx의 LEFT_W와 맞춰 사용 권장
  cardWidthPx = 260,
  gutterPx = 15,
  topOffsetPx = 80,
}: LeftSidebarProps) {
  // Esc로 닫기
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onToggle();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onToggle]);

  // 패널 최소 폭 보장(카드+좌우 여백)
  const asideWidth = Math.max(panelWidthPx, cardWidthPx + gutterPx * 2);

  return (
    <>
      {/* 모바일 오버레이 */}
      <div
        onClick={onToggle}
        className={`fixed inset-0 bg-black/30 lg:hidden transition-opacity duration-300
        ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* 왼쪽 고정 패널 */}
      <aside
        className={`fixed left-0 z-40 border-r bg-white transition-transform duration-300 will-change-transform
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{
          top: topOffsetPx,
          height: `calc(100vh - ${topOffsetPx}px)`,
          width: asideWidth,
        }}
      >
        {/* 내부 스크롤 + gutter */}
        <div className="h-full overflow-y-auto" style={{ padding: gutterPx }}>
          {/* ===== 카드(Box): Figma 사양 그대로 =====
              display: flex;
              width: 260px;
              padding: 20px 15px;
              flex-direction: column;
              justify-content: center;
              align-items: flex-start;
              gap: 25px;
              border-radius: 6px;
              border: 1px solid #EEE;
              background: #FFF;
          */}
          <div
            className="mx-auto flex flex-col items-start justify-center
                       rounded-[6px] border border-[#EEE] bg-white
                       gap-[25px]"
            style={{ width: cardWidthPx, padding: "20px 15px" }}
          >
            {/* 상단: 현장/검색 */}
            <div className="w-full">
              <h3 className="mb-2 text-sm font-semibold text-gray-800">
                현장 리스트
              </h3>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="현장 검색"
                  className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-300"
                />
                <button
                  className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 active:scale-95"
                  type="button"
                >
                  검색
                </button>
              </div>
            </div>

            {/* 요약 카드: 게이지/수치 자리 */}
            <section className="w-full">
              <h4 className="mb-2 text-sm font-semibold text-gray-700">
                현장 요약
              </h4>
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded border border-gray-200 px-2 py-3 text-center">
                  <div className="text-xs text-gray-500">작업중</div>
                  <div className="text-base font-semibold">12</div>
                </div>
                <div className="rounded border border-gray-200 px-2 py-3 text-center">
                  <div className="text-xs text-gray-500">주의</div>
                  <div className="text-base font-semibold">6</div>
                </div>
                <div className="rounded border border-gray-200 px-2 py-3 text-center">
                  <div className="text-xs text-gray-500">경고</div>
                  <div className="text-base font-semibold">2</div>
                </div>
              </div>
            </section>

            {/* 실시간 센서/그래프 자리(와이어프레임) */}
            <section className="w-full">
              <h4 className="mb-2 text-sm font-semibold text-gray-700">
                환경 센서
              </h4>
              <div className="h-24 rounded border border-dashed border-gray-300" />
            </section>

            {/* 알림 리스트(간단 목업) */}
            <section className="w-full">
              <h4 className="mb-2 text-sm font-semibold text-gray-700">
                최근 알림
              </h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li className="flex items-center justify-between">
                  <span className="truncate">test01 O₂ 주의발생</span>
                  <span className="text-xs text-gray-500">10:31:21</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="truncate">H₂S 감지</span>
                  <span className="text-xs text-gray-500">10:29:10</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="truncate">소음 기준 초과</span>
                  <span className="text-xs text-gray-500">10:20:03</span>
                </li>
              </ul>
            </section>
          </div>
          {/* ===== /카드 ===== */}
        </div>
      </aside>

      {/* 바깥 토글 버튼: 패널 실제 폭 기준으로 배치 */}
      <button
        type="button"
        onClick={onToggle}
        aria-label={isOpen ? "왼쪽 메뉴 닫기" : "왼쪽 메뉴 열기"}
        className="fixed z-50 flex h-12 w-8 -translate-y-1/2 items-center justify-center
                   rounded-r-full border border-gray-200 bg-white shadow
                   hover:bg-gray-50 active:scale-95 transition-[left,transform] duration-300"
        style={{
          left: isOpen ? asideWidth : 0,
          top: `calc(50vh + ${topOffsetPx / 2}px)`,
        }}
      >
        <svg
          viewBox="0 0 24 24"
          className={`h-5 w-5 transition-transform ${
            isOpen ? "" : "rotate-180"
          }`}
          aria-hidden="true"
        >
          <path
            d="M15 6l-6 6 6 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </>
  );
}
