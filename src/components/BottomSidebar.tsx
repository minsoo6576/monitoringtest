"use client";

export default function BottomSidebar({
  isOpen,
  onToggle,
  heightPx = 280,
  insetLeftPx = 0, // ← 좌측 사이드바가 차지한 폭
  insetRightPx = 0, // ← 우측 사이드바가 차지한 폭
}: {
  isOpen: boolean;
  onToggle: () => void;
  heightPx?: number;
  insetLeftPx?: number;
  insetRightPx?: number;
}) {
  // 남은 중앙 영역의 가로 중앙 (토글 버튼 위치)
  const centerX = `calc(${insetLeftPx}px + (100vw - ${
    insetLeftPx + insetRightPx
  }px)/2)`;

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

      {/* ✅ 좌/우 인셋을 주어 중앙 영역 폭만큼만 차지 */}
      <aside
        className={`fixed bottom-0 z-40 border-t bg-white
                    transition-transform duration-300 will-change-transform
                    ${isOpen ? "translate-y-0" : "translate-y-full"}
                    transition-[left,right,transform]`}
        style={{ height: heightPx, left: insetLeftPx, right: insetRightPx }}
      >
        <div className="h-full overflow-y-auto p-4">
          <div className="mx-auto max-w-[1200px]">
            {/* ↓ 여긴 너가 원하는 카드/그리드로 자유 구성 */}
            <div className="flex w-full max-w-[460px] px-[15px] py-5 flex-col items-start gap-[15px] rounded-[5px] border border-[#EEE] bg-white">
              <div className="text-sm font-semibold text-gray-800">
                하단 패널
              </div>
              <p className="text-sm text-gray-700">
                대구교 수로공사 · 일일 리포트 / 공정률 40%
              </p>
              <ul className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                <li>안전점검: 완료</li>
                <li>자재반입: 진행중</li>
                <li>장비가동: 정상</li>
                <li>기상: 폭염주의</li>
              </ul>
            </div>
          </div>
        </div>
      </aside>

      {/* 중앙 영역의 정확한 중앙에 토글 버튼 */}
      <button
        type="button"
        onClick={onToggle}
        aria-label={isOpen ? "하단 메뉴 닫기" : "하단 메뉴 열기"}
        className="fixed z-50 -translate-x-1/2 transition-[bottom,left,transform] duration-300
                   flex h-8 w-16 items-center justify-center rounded-t-full border border-gray-200 bg-white shadow
                   hover:bg-gray-50 active:scale-95"
        style={{ left: centerX, bottom: isOpen ? heightPx : 0 }}
      >
        <svg
          viewBox="0 0 24 24"
          className={`h-5 w-5 transition-transform ${
            isOpen ? "rotate-90" : "-rotate-90"
          }`}
          aria-hidden="true"
        >
          <path
            d="M9 6l6 6-6 6"
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
