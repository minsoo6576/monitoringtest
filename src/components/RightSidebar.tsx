// src/components/RightSidebar.tsx
"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image";
import WarnTable from "@/components/LiveAlarm/WarnTable";
import DangerTable from "@/components/LiveAlarm/DangerTable";
import NoticeTable from "@/components/LiveAlarm/NoticeTable";
import WorkTable from "@/components/LiveAlarm/WorkTable";

// ⬇️ 네가 올린 Carousel 컴포넌트 사용 (경로는 네가 둔 곳으로)
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

type Tone = "warn" | "danger";
type LogItem = { text: string; time?: string; tone?: Tone };

// ✅ 안전수칙 슬라이드(이미지 + 캡션) — API 연동시 이 배열만 교체
const SAFETY_SLIDES: string[] = [
  "/mapex.png",
  "/safeguide.png",
  "/public/gloves.jpg",
];

export default function RightSidebar({
  isOpen,
  onToggle,
  panelWidthRem = 18.75, // 300px
  cardWidthRem = 16.25,  // 260px
  gutterRem = 0.9375,    // 15px
  topOffsetRem = 5,      // 80px
}: {
  isOpen: boolean;
  onToggle: () => void;
  panelWidthRem?: number;
  cardWidthRem?: number;
  gutterRem?: number;
  topOffsetRem?: number;
}) {
  const asideWidth = Math.max(panelWidthRem, cardWidthRem + gutterRem * 2);

  const autoplay = React.useRef(
    Autoplay({ delay: 6000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  // 샘플 데이터 (API 예정)
  const warns: LogItem[] = [
    { text: "test01 O₂ 주의발생", time: "10:31:21", tone: "warn" },
    { text: "H₂S 감지", time: "10:29:10", tone: "warn" },
    { text: "test01 O₂ 주의발생", time: "10:20:03", tone: "warn" },
    { text: "test01 O₂ 주의발생", time: "10:20:03", tone: "warn" },
  ];
  const dangers: LogItem[] = [
    { text: "O₂ 농도 초과", time: "10:28:45", tone: "danger" },
    { text: "가스농도 초과", time: "10:21:12", tone: "danger" },
    { text: "가스농도 초과", time: "10:21:12", tone: "danger" },
    { text: "가스농도 초과", time: "10:21:12", tone: "danger" },
  ];
  const notices = [
    { text: "[공지] test01 O₂ 주의발생", time: "09:50:00" },
    { text: "[공지] 작업 계획 변경 안내", time: "09:10:00" },
    { text: "[공지] test01 O₂ 주의발생", time: "09:50:00" },
    { text: "[공지] 작업 계획 변경 안내", time: "09:10:00" },
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

      {/* 오른쪽 고정 패널 */}
      <aside
        className={`fixed right-0 z-40 border-l bg-white transition-transform duration-300 will-change-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          top: `${topOffsetRem}rem`,
          height: `calc(100vh - ${topOffsetRem}rem)`,
          width: `${asideWidth}rem`,
        }}
      >
        {/* 내부 스크롤 + gutter */}
        <div 
        // style={{ padding: `${gutterRem}rem` }}
        >
          {/* 카드 */}
          <div
            className="mx-auto flex flex-col items-start justify-center rounded-[0.375rem] border border-[#EEE] bg-white gap-[1.5625rem]"
            style={{ width: `${cardWidthRem}rem`, padding: `1.25rem ${gutterRem}rem`, height: `61.1875rem` }}
          >
            {/* 헤더 */}
            <div className="flex w-full items-center gap-3">
              <div className="h-12 w-16 overflow-hidden rounded-md bg-gray-100" />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-gray-800">대규모 수로공사</p>
                <p className="truncate text-xs text-gray-500">진행률 40%</p>
              </div>
            </div>

            {/* 실시간 주의/경고/공지/작업 */}
            <section className="w-full">
              <h4 className="mb-2 text-sm font-semibold text-gray-700">실시간 주의알림</h4>
              <WarnTable items={warns} />
            </section>

            <section className="w-full">
              <h4 className="mb-2 text-sm font-semibold text-gray-700">실시간 경고알림</h4>
              <DangerTable items={dangers} />
            </section>

            <section className="w-full">
              <h4 className="mb-2 text-sm font-semibold text-gray-700">공지사항</h4>
              <NoticeTable items={notices} />
            </section>

            <section className="w-full">
              <h4 className="mb-2 text-sm font-semibold text-gray-700">주요 작업정보</h4>
              <WorkTable items={works} />
            </section>

          <section className="w-full">
        <h4 className="mb-2 text-sm font-semibold text-gray-700">안전수칙 가이드</h4>
        {/*마우스로 다음 사진 넘기기 가능*/}
          <Carousel
          opts={{ loop: true }}
          plugins={[autoplay.current]}   
          className="w-full"
        >
          <CarouselContent>
            {SAFETY_SLIDES.map((src, i) => (
              <CarouselItem key={src}>
                <div className="relative overflow-hidden rounded-md border">
                  <Image
                    src={src}
                    alt=""
                    width={640}
                    height={360}
                    draggable={false}
                    className="h-[9rem] w-full object-cover"
                    priority={i === 0}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
         </Carousel>

      </section>

          </div>
          {/* /카드 */}
        </div>
      </aside>

      {/* 패널 바깥 토글 버튼 */}
      <button
        type="button"
        onClick={onToggle}
        aria-label={isOpen ? "오른쪽 메뉴 닫기" : "오른쪽 메뉴 열기"}
        className="fixed z-50 flex h-12 w-8 -translate-y-1/2 items-center justify-center
                   rounded-l-full border border-gray-200 bg-white shadow
                   hover:bg-gray-50 active:scale-95 transition-[right,transform] duration-300"
        style={{
          right: isOpen ? `${asideWidth}rem` : 0,
          top: `calc(50vh + ${topOffsetRem / 2}rem)`,
        }}
      >
        <svg viewBox="0 0 24 24" className={`h-5 w-5 transition-transform ${isOpen ? "" : "rotate-180"}`} aria-hidden="true">
          <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>
    </>
  );
}
