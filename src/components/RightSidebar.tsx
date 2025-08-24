"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import WarnTable from "@/components/LiveAlarm/WarnTable";
import DangerTable from "@/components/LiveAlarm/DangerTable";
import NoticeTable from "@/components/LiveAlarm/NoticeTable";
import WorkTable from "@/components/LiveAlarm/WorkTable";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

type Tone = "warn" | "danger";
type LogItem = { text: string; time?: string; tone?: Tone };

const SAFETY_SLIDES: string[] = ["/mapex.png", "/safeguide.png", "/next.svg"];

export default function RightSidebar({
  isOpen,
  onToggle,
  panelWidthRem = 25,
  cardWidthRem = 21.667,
  gutterRem = 1.25,
  topOffsetRem = 6.667,
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
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* 오른쪽 고정 패널 */}
      <aside
        className={`fixed right-0 z-40 border-l bg-white transition-transform duration-300 will-change-transform
                    ${isOpen ? "translate-x-0" : "translate-x-full"}
                    dark:bg-[#1E1E20] dark:border-[#222]`}
        style={{
          top: `${topOffsetRem}rem`,
          height: `calc(100vh - ${topOffsetRem}rem)`,
          width: `${asideWidth}rem`,
        }}
      >
        <div className="h-full w-full overflow-y-auto py-[1.25rem]">
          {/* 카드 */}
          <div
            className="mx-auto flex h-full flex-col rounded-[0.5rem] border border-[#EEE] bg-white
                       dark:border-[#222] dark:bg-[#272829]"
            style={{
              width: `${cardWidthRem}rem`,
              padding: `${1.667}rem ${gutterRem}rem`,
            }}
          >
            {/* 헤더 (고정 높이) */}
            <div className="flex w-full items-center gap-[0.833rem] h-[6rem]">
              <div className="relative h-[5.833rem] w-[7.5rem] overflow-hidden rounded-[0.333rem] border border-[#93C5FD] bg-gray-100">
                <Image
                  src="/mapex.png"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="120px"
                  priority
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[1.083rem] font-semibold text-gray-800 dark:text-gray-100">
                  대규모 수로공사
                </p>
                <div className="space-y-1">
                  <p className="truncate text-[0.833rem] text-gray-500 dark:text-gray-400">
                    대구광역시 북구 침산로 73
                  </p>
                  <p className="text-[0.833rem] text-gray-700 dark:text-gray-200">
                    작업여부 : <b className="font-medium">작업중</b>
                  </p>
                  <p className="text-[0.833rem] text-gray-700 dark:text-gray-200">
                    진행률 : <b className="font-medium">40%</b>
                  </p>
                </div>
              </div>
            </div>

            {/* 아래 5개 섹션: 화면 높이에 맞춰 균등 분배 */}
            <div className="flex-1 grid grid-rows-5 gap-[1rem] min-h-0 w-full mt-[1rem]">
              <section className="flex flex-col flex-1 min-h-0">
                <h4 className="mb-[0.5rem] text-[1.167rem] font-semibold text-gray-700 dark:text-gray-200">
                  실시간 주의알림
                </h4>
                <div className="flex-1 min-h-0 overflow-hidden">
                  <WarnTable items={warns} />
                </div>
              </section>

              <section className="flex flex-col flex-1 min-h-0">
                <h4 className="mb-[0.5rem] text-[1.167rem] font-semibold text-gray-700 dark:text-gray-200">
                  실시간 경고알림
                </h4>
                <div className="flex-1 min-h-0 overflow-hidden">
                  <DangerTable items={dangers} />
                </div>
              </section>

              <section className="flex flex-col flex-1 min-h-0">
                <h4 className="mb-[0.5rem] text-[1.167rem] font-semibold text-gray-700 dark:text-gray-200">
                  공지사항
                </h4>
                <div className="flex-1 min-h-0 overflow-hidden">
                  <NoticeTable items={notices} />
                </div>
              </section>

              <section className="flex flex-col flex-1 min-h-0">
                <h4 className="mb-[0.5rem] text-[1.167rem] font-semibold text-gray-700 dark:text-gray-200">
                  주요 작업정보
                </h4>
                <div className="flex-1 min-h-0 overflow-hidden">
                  <WorkTable items={works} />
                </div>
              </section>

              <section className="flex flex-col flex-1 min-h-0">
                <h4 className="mb-[0.5rem] text-[1.167rem] font-semibold text-gray-700 dark:text-gray-200">
                  안전수칙 가이드
                </h4>
                <Carousel
                  opts={{ loop: true }}
                  plugins={[autoplay.current]}
                  className="w-full h-full flex-1"
                >
                  <CarouselContent>
                    {SAFETY_SLIDES.map((src, i) => (
                      <CarouselItem key={src}>
                        <div className="relative h-full overflow-hidden rounded-[0.5rem] border border-gray-200 dark:border-[#222]">
                          <Image
                            src={src}
                            alt=""
                            width={640}
                            height={360}
                            draggable={false}
                            className="h-full w-full object-cover"
                            priority={i === 0}
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </section>
            </div>
          </div>
          {/* /카드 */}
        </div>
      </aside>

      {/* 토글 버튼 */}
      <button
        type="button"
        onClick={onToggle}
        aria-label={isOpen ? "오른쪽 메뉴 닫기" : "오른쪽 메뉴 열기"}
        className="fixed z-50 flex -translate-y-1/2 items-center justify-center
                   rounded-l-full border shadow active:scale-95 transition-[right,transform] duration-300
                   h-[4rem] w-[2.667rem]
                   border-gray-200 bg-white text-gray-700 hover:bg-gray-50
                   dark:border-[#222] dark:bg-[#272829] dark:text-gray-100 dark:hover:bg-[#2f3032]"
        style={{
          right: isOpen ? `${asideWidth}rem` : 0,
          top: `calc(50vh + ${topOffsetRem / 2}rem)`,
        }}
      >
        <svg
          viewBox="0 0 24 24"
          className={`h-[1.667rem] w-[1.667rem] transition-transform ${
            isOpen ? "" : "rotate-180"
          }`}
          aria-hidden="true"
        >
          <path
            d="M9 6l6 6-6 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </button>
    </>
  );
}
