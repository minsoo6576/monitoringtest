// src/components/BottomSidebar.tsx
"use client";
import NoticeWarnTable from "@/components/LiveAlarm/NoticeWarnTable";
type Tone = "warn" | "danger";
type LogItem = { text: string; time?: string; tone?: Tone };

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h4 className="text-sm font-semibold text-gray-700">{children}</h4>;
}

function Card({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`flex flex-col items-start rounded-[0.3125rem] border border-[#EEE] bg-white ${className}`}>
      {children}
    </div>
  );
}

export default function BottomSidebar({
  isOpen,
  onToggle,
  // 기존 호출 호환 위해 px 입력도 지원
  heightRem,
  heightPx = 280,
  insetLeftRem = 0,
  insetRightRem = 0,
}: {
  isOpen: boolean;
  onToggle: () => void;
  heightRem?: number;
  heightPx?: number;
  insetLeftRem?: number;
  insetRightRem?: number;
}) {
  const resolvedHeightRem = typeof heightRem === "number" ? heightRem : heightPx / 16;

  // 토글 버튼 중앙 정렬 (사이드 inset 고려)
  const centerX = `calc(${insetLeftRem}rem + (100vw - ${insetLeftRem + insetRightRem}rem)/2)`;

  // 샘플 데이터 (연동 시 교체)
  const alarms: LogItem[] = [
    { text: "test01 O₂ 주의발생", time: "10:31:21", tone: "warn" },
    { text: "H₂S 감지", time: "10:29:10", tone: "warn" },
    { text: "추가 데이터 1", time: "10:19:00", tone: "danger" },
    { text: "추가 데이터 2", time: "10:18:00", tone: "warn" },
  ];

  return (
    <>
      {/* 모바일 오버레이 */}
      <div
        onClick={onToggle}
        className={`fixed inset-0 bg-black/30 lg:hidden transition-opacity duration-300
        ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* 패널 */}
      <aside
        className={`fixed bottom-0 z-40 border-t bg-white
                    transition-transform duration-300 will-change-transform
                    ${isOpen ? "translate-y-0" : "translate-y-full"}
                    transition-[left,right,transform]`}
        style={{
          height: `${resolvedHeightRem}rem`,
          left: `${insetLeftRem}rem`,
          right: `${insetRightRem}rem`,
        }}
      >
        <div className="h-full py-3">
          {/* 전체 폭 사용: 좌우가 비지 않도록 w-full + justify-between */}
          <div className="h-full w-full px-4">
            <div className="flex h-[11.75rem] w-full items-stretch justify-between gap-4">
              {/* 1) 전체현장 실시간 알림 (25rem = 400px) */}
              <Card className="w-[25rem] h-full px-4 py-4">
                <SectionTitle>전체현장 실시간 알림</SectionTitle>
               <NoticeWarnTable items={alarms} />
              </Card>

              {/* 2) 원그래프 (25rem = 400px) */}
              <Card className="w-[25rem] h-full px-4 py-4">
                <SectionTitle>전체 현장현황</SectionTitle>
              </Card>

              {/* 3) 8개 지표 카드: 4×2 고정 그리드 (각 7.25rem = 116px) */}

                <div className="mt-3 grid grid-cols-4 gap-3">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-[7.25rem] h-[4.75rem] rounded-md border border-gray-200 bg-white px-3 py-2 flex flex-col justify-center"
                    >
                      <div className="text-[0.75rem] text-gray-500">지표 {i + 1}</div>
                      <div className="text-base font-semibold text-gray-900">값</div>
                    </div>
                  ))}
                </div>
            </div>
          </div>
        </div>
      </aside>

      {/* 토글 버튼 */}
      <button
        type="button"
        onClick={onToggle}
        aria-label={isOpen ? "하단 메뉴 닫기" : "하단 메뉴 열기"}
        className="fixed z-50 -translate-x-1/2 transition-[bottom,left,transform] duration-300
                   flex h-8 w-16 items-center justify-center rounded-t-full border border-gray-200 bg-white shadow
                   hover:bg-gray-50 active:scale-95"
        style={{ left: centerX, bottom: isOpen ? `${resolvedHeightRem}rem` : 0 }}
      >
        <svg
          viewBox="0 0 24 24"
          className={`h-5 w-5 transition-transform ${isOpen ? "rotate-90" : "-rotate-90"}`}
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

