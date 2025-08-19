// src/components/RightSidebar.tsx
"use client";

import WarnTable from "@/components/LiveAlarm/WarnTable";
import DangerTable from "@/components/LiveAlarm/DangerTable";
import NoticeTable from "@/components/LiveAlarm/NoticeTable";
import WorkTable from "@/components/LiveAlarm/WorkTable";
type Tone = "warn" | "danger";
type LogItem = { text: string; time?: string; tone?: Tone };


export default function RightSidebar({
  isOpen,
  onToggle,
  panelWidthPx = 340,
  cardWidthPx = 260,
  gutterPx = 10,
  topOffsetPx = 70,
}: {
  isOpen: boolean;
  onToggle: () => void;
  panelWidthPx?: number;
  cardWidthPx?: number;
  gutterPx?: number;
  topOffsetPx?: number;
}) {
  // 패널이 카드+여백보다 작아지면 카드가 눌리므로 최소 폭 보장
  const asideWidth = Math.max(panelWidthPx, cardWidthPx + gutterPx * 2);

  // 샘플 데이터 (API 연동 시 교체)
  const warns: LogItem[] = [
    { text: "test01 O₂ 주의발생", time: "10:31:21", tone: "warn" },
    { text: "H₂S 감지", time: "10:29:10", tone: "warn" },
    { text: "test01 O₂ 주의발생", time: "10:31:21", tone: "warn" },
    { text: "test01 O₂ 주의발생", time: "10:31:21", tone: "warn" },
  ];
  const dangers: LogItem[] = [
    { text: "O₂ 농도 초과", time: "10:28:45", tone: "danger" },
    { text: "가스농도 초과", time: "10:21:12", tone: "danger" },
    { text: "O₂ 농도 초과", time: "10:28:45", tone: "danger" },
    { text: "가스농도 초과", time: "10:21:12", tone: "danger" },
    
  ];
  const notices = [
    { text: "[공지] test01 O₂ 주의발생", time: "09:50:00" },
    { text: "[공지] test01 O₂ 주의발생", time: "09:50:00" },
    { text: "[공지] test01 O₂ 주의발생", time: "09:50:00" },
    { text: "[공지] test01 O₂ 주의발생", time: "09:50:00" },
  ];
  const works = [
    { text: "[작업] 콘크리트 타설 진행중", time: "08:10:00" },
    { text: "[작업] 골조 양중 대기", time: "07:40:00" },
    { text: "[작업] 콘크리트 타설 진행중", time: "08:10:00" },
    { text: "[작업] 골조 양중 대기", time: "07:40:00" },
  ];

  return (
    <>
      {/* 모바일 오버레이 */}
      <div
        onClick={onToggle}
        className={`fixed inset-0 bg-black/30 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* 사이드바 */}
      <aside
        className={`fixed right-0 z-40 border-l bg-white transition-transform duration-300 will-change-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          top: topOffsetPx,
          height: `calc(100vh - ${topOffsetPx}px)`,
          width: asideWidth,
        }}
      >
        {/* 내부 스크롤 + gutter */}
        <div className="h-full overflow-y-auto" style={{ padding: gutterPx }}>
          {/* 카드: 고정폭 */}
          <div
            className="mx-auto flex shrink-0 flex-col items-start justify-center gap-[25px] rounded-[6px] border border-[#EEE] bg-white"
            style={{
              width: cardWidthPx,
              minWidth: cardWidthPx,
              maxWidth: cardWidthPx,
              padding: "20px 15px",
            }}
          >
            {/* 헤더(썸네일/요약) */}
            <div className="flex w-full items-center gap-3">
              <div className="h-12 w-16 overflow-hidden rounded-md bg-gray-100" />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-gray-800">대구교 수로공사</p>
                <p className="truncate text-xs text-gray-500">진행률 40%</p>
              </div>
            </div>

            <hr className="w-full border-gray-200" />

            {/* 실시간 주의알림 */}
            <div className="w-full">
              <h4 className="mb-2 text-sm font-semibold text-gray-700">실시간 주의알림</h4>
              <WarnTable items={warns} />
            </div>

            <hr className="w-full border-gray-200" />

            {/* 실시간 경고알림 */}
            <div className="w-full">
              <h4 className="mb-2 text-sm font-semibold text-gray-700">실시간 경고알림</h4>
              <DangerTable items={dangers} />
            </div>

            <hr className="w-full border-gray-200" />

            {/* 공지사항  */}
           <div className="w-full">
              <h4 className="mb-2 text-sm font-semibold text-gray-700">공지사항</h4>
              <NoticeTable items={notices} />
            </div>

            <hr className="w-full border-gray-200" />

            {/* 주요 작업정보 */}
           <div className="w-full">
              <h4 className="mb-2 text-sm font-semibold text-gray-700">주요 작업정보</h4>
              <WorkTable items={works} />
            </div>
          </div>
          {/* /카드 */}
        </div>
      </aside>

      {/* 바깥 토글 버튼 */}
      <button
        type="button"
        onClick={onToggle}
        aria-label={isOpen ? "오른쪽 메뉴 닫기" : "오른쪽 메뉴 열기"}
        className="fixed z-50 flex h-12 w-8 -translate-y-1/2 items-center justify-center
                   rounded-l-full border border-gray-200 bg-white shadow
                   hover:bg-gray-50 active:scale-95 transition-[right,transform] duration-300"
        style={{
          right: isOpen ? asideWidth : 0,
          top: `calc(50vh + ${topOffsetPx / 2}px)`,
        }}
      >
        <svg viewBox="0 0 24 24" className={`h-5 w-5 transition-transform ${isOpen ? "" : "rotate-180"}`} aria-hidden="true">
          <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </>
  );
}
