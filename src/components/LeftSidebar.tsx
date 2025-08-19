"use client";
import { useEffect } from "react";

type LeftSidebarProps = {
  isOpen: boolean;
  onToggle: () => void;
};

export default function LeftSidebar({ isOpen, onToggle }: LeftSidebarProps) {
  // Esc로 닫기
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onToggle();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onToggle]);

  return (
    <>
      {/* 모바일 오버레이 (열렸을 때만) */}
      <div
        onClick={onToggle}
        className={`fixed inset-0 bg-black/30 lg:hidden transition-opacity duration-300
        ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* 사이드바: 헤더(h-20=80px) 아래 고정 + 슬라이드 */}
      <aside
        className={`fixed left-0 top-20 z-40 h-[calc(100vh-80px)] w-[380px] border-r bg-white
        transition-transform duration-300 will-change-transform
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="h-full overflow-y-auto p-4">
          {/* ...여기에 카드들 */}
        </div>
      </aside>

      {/* 🔽 바깥 토글 버튼: 사이드바 오른쪽면 '바로 밖' 중앙에 고정 */}
      <button
        type="button"
        onClick={onToggle}
        aria-label={isOpen ? "왼쪽 메뉴 닫기" : "왼쪽 메뉴 열기"}
        // 열림: left = 사이드바 폭(280px). 닫힘: 화면 가장 왼쪽(0)
        className={`fixed z-50 top-[calc(50vh+40px)] -translate-y-1/2
                    transition-[left,transform] duration-300
                    ${isOpen ? "left-[280px]" : "left-0"}
                    flex h-12 w-8 items-center justify-center
                    rounded-r-full border border-gray-200 bg-white shadow
                    hover:bg-gray-50 active:scale-95`}
      >
        {/* 열림: ←(닫기) / 닫힘: →(열기) */}
        <svg
          viewBox="0 0 24 24"
          className={`h-5 w-5 transition-transform ${isOpen ? "" : "rotate-180"}`}
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
