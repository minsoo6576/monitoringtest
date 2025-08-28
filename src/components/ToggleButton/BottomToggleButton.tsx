// src/components/ToggleButton/BottomToggleButton.tsx
"use client";

import { useEffect, useRef, useState } from "react";

const REM = 12; // 1rem = 12px

export default function BottomToggleButton({
  isOpen,
  onToggle,
  left,
  bottomRemWhenOpen,
  holdVisible = false,
  inactiveMs = 500,
  zoneRatio = 0.1,
  className = "",
}: {
  isOpen: boolean;
  onToggle: () => void;
  left: string | number;
  bottomRemWhenOpen: number;
  holdVisible?: boolean;
  inactiveMs?: number;
  zoneRatio?: number;
  className?: string;
}) {
  const [visible, setVisible] = useState(false);

  const hoverBtnRef = useRef(false);
  const focusBtnRef = useRef(false);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null); // ⬅️ 추가

  const clearHide = () => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = null;
  };

  // 표시 + 타이머 리셋
  const bump = () => {
    setVisible(true);
    clearHide();
    hideTimerRef.current = setTimeout(() => {
      if (!hoverBtnRef.current && !focusBtnRef.current && !holdVisible) {
        setVisible(false);
      }
    }, inactiveMs);
  };

  // 감지 밴드
  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const zoneH = Math.max(1, vh * Math.max(0, Math.min(1, zoneRatio)));
      const panelPx = bottomRemWhenOpen * REM;

      const zoneTop = isOpen
        ? Math.max(0, vh - panelPx - zoneH)
        : Math.max(0, vh - zoneH);

      const inZone = e.clientY >= zoneTop;
      if (inZone || holdVisible) bump();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      clearHide();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoneRatio, isOpen, bottomRemWhenOpen, holdVisible, inactiveMs]);

  useEffect(() => {
    if (holdVisible) bump();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [holdVisible]);

  useEffect(() => {
    bump(); // 열림/닫힘 전환 직후 잠깐 보였다가 자동 숨김
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const onEnter = () => {
    hoverBtnRef.current = true;
    bump();
    clearHide();
  };
  const onLeave = () => {
    hoverBtnRef.current = false;
    bump();
  };
  const onFocus = () => {
    focusBtnRef.current = true;
    bump();
    clearHide();
  };
  const onBlur = () => {
    focusBtnRef.current = false;
    bump();
  };

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={() => {
        onToggle();
        // ⬇️ 이벤트 객체 대신 ref 사용 (rAF 불필요)
        btnRef.current?.blur?.();
        bump();
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      aria-label={isOpen ? "하단 메뉴 닫기" : "하단 메뉴 열기"}
      className={`
        fixed z-50
        flex items-center justify-center 
        w-[6.667rem] h-[2.833rem] 
        flex-shrink-0
        rounded-[0.5rem]
        border border-gray-200 bg-white text-gray-700
        transition-[bottom,left,transform,opacity] duration-300
        hover:bg-gray-50 active:scale-95 shadow
        dark:border-[#222] dark:bg-[#272829] dark:text-gray-100 dark:hover:bg-[#2f3032]
        ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}
        ${className}
      `}
      style={{ left, bottom: isOpen ? `${bottomRemWhenOpen}rem` : 0 }}
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
  );
}
