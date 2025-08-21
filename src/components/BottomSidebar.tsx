"use client";
import NoticeWarnTable from "@/components/LiveAlarm/NoticeWarnTable";
import CircleChart  from "@/components/Charts/CircleChart";
type Tone = "warn" | "danger";
type LogItem = { text: string; time?: string; tone?: Tone };

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h4 className="text-[1.167rem] font-semibold text-gray-700">{children}</h4>;
}

function Card({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`flex flex-col items-start rounded-[0.417rem] border border-[#EEE] bg-white ${className}`}>
      {children}
    </div>
  );
}

export default function BottomSidebar({
  isOpen,
  onToggle,
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
  // /16 -> /12 로 보정
  const resolvedHeightRem = typeof heightRem === "number" ? heightRem : heightPx / 12;

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
        <div className="h-full py-[1rem]" >{/* py-3(12px@16px) -> 1rem */}
          {/* 전체 폭 사용 */}
          <div className="h-full w-full px-[1.333rem]">{/* px-4(16px@16px) -> 1.333rem */}
            <div className="flex h-[15.667rem] w-full items-stretch justify-between gap-[1.333rem]">
              {/* h-[11.75rem] -> ×1.333 = 15.667rem, gap-4 -> 1.333rem */}

              {/* 1) 전체현장 실시간 알림 (원래 25rem=400px@16px) -> 400/12=33.333rem */}
              <Card className="w-[33.333rem] h-full px-[1.333rem] py-[1.333rem]">
                <SectionTitle>전체현장 실시간 알림</SectionTitle>
                <NoticeWarnTable items={alarms} />
              </Card>

              {/* 2) 원그래프 (400px 폭 유지) */}
              <Card className="w-[33.333rem] h-full px-[1.333rem] py-[1.333rem]">
                <SectionTitle>원그래프</SectionTitle>
                <div className="mt-[0.667rem] flex-1 min-h-0 flex items-center justify-center">
                  {/* translate-x-5(20px@16px) -> 20/12=1.667rem */}
                  <div className="translate-x-[1.667rem]">
                    <CircleChart />
                  </div>
                </div>
              </Card>

              {/* 3) 8개 지표 카드: 4×2 고정 그리드 */}
              <div className="grid grid-cols-4 gap-[1rem]">{/* gap-3(12px@16px) -> 1rem */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-[9.667rem] h-[7.417rem] rounded-[0.5rem] border border-gray-200 bg-white px-[1rem] py-[0.667rem] flex flex-col justify-center"
                    // w 7.25rem->9.667rem, h 5.5625rem->7.417rem, rounded-md(6px)->0.5rem,
                    // px-3(12px)->1rem, py-2(8px)->0.667rem
                  >
                    <div className="text-[1rem] text-gray-500">지표 {i + 1}</div>{/* 0.75rem->1rem(12px 유지) */}
                    <div className="text-[1.333rem] font-semibold text-gray-900">값</div>{/* base(16px) 유지 */}
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
                   flex h-[2.667rem] w-[5.333rem] items-center justify-center rounded-t-full border border-gray-200 bg-white shadow
                   hover:bg-gray-50 active:scale-95"
        // h-8(32px) -> 2.667rem, w-16(64px) -> 5.333rem
        style={{ left: centerX, bottom: isOpen ? `${resolvedHeightRem}rem` : 0 }}
      >
        <svg
          viewBox="0 0 24 24"
          className={`h-[1.667rem] w-[1.667rem] transition-transform ${isOpen ? "rotate-90" : "-rotate-90"}`}
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
