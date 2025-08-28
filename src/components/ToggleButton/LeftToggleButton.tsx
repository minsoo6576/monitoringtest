// src/components/ToggleButton/LeftToggleButton.tsx
"use client";

import { useEffect, useRef, useState } from "react";

const REM = 12; // 1rem = 12px

export type LeftToggleButtonProps = {
  isOpen: boolean;
  onToggle: () => void;
  leftRemWhenOpen: number; // 열렸을 때 버튼의 left 오프셋(rem) = 패널 폭
  top: string;             // 버튼 top (예: `calc(50vh + 3.333rem)`)
  holdVisible?: boolean;
  inactiveMs?: number;
  zoneRatioX?: number;     // 수평 감지 비율(0~1)
  className?: string;
};

function LeftToggleButton({
  isOpen,
  onToggle,
  leftRemWhenOpen,
  top,
  holdVisible = false,
  inactiveMs = 500,
  zoneRatioX = 0.1,
  className = "",
}: LeftToggleButtonProps) {
  const [visible, setVisible] = useState(false);

  const hoverBtnRef = useRef(false);
  const focusBtnRef = useRef(false);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const clearHide = () => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = null;
  };

  const bump = () => {
    setVisible(true);
    clearHide();
    hideTimerRef.current = setTimeout(() => {
      if (!hoverBtnRef.current && !focusBtnRef.current && !holdVisible) {
        setVisible(false);
      }
    }, inactiveMs);
  };

  // 수평 감지 밴드 (닫힘: 왼쪽 가장자리, 열림: 패널 오른쪽 인접 밴드)
  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      const vw = window.innerWidth || document.documentElement.clientWidth;
      const bandW = Math.max(1, vw * Math.max(0, Math.min(1, zoneRatioX)));
      const panelPx = leftRemWhenOpen * REM;

      // 닫힘: [0, bandW], 열림: [panelPx, panelPx + bandW]
      const bandLeft = isOpen ? panelPx : 0;
      const bandRight = bandLeft + bandW;
      const inBand = e.clientX >= bandLeft && e.clientX <= bandRight;

      if (inBand || holdVisible) bump();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      clearHide();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, leftRemWhenOpen, zoneRatioX, holdVisible, inactiveMs]);

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
        btnRef.current?.blur?.(); // 클릭 포커스 제거
        bump();
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      aria-label={isOpen ? "왼쪽 메뉴 닫기" : "왼쪽 메뉴 열기"}
      className={`
        fixed z-50 
        flex items-center justify-center
        h-[6.667rem] w-[2.883rem]
        rounded-[0.5rem]
        border border-gray-200 bg-white text-gray-700
        transition-[left,transform,opacity] duration-300
        hover:bg-gray-50
        dark:border-[#222] dark:bg-[#272829] dark:text-gray-100 dark:hover:bg-[#2f3032]
        ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}
        ${className}
      `}
      style={{ left: isOpen ? `${leftRemWhenOpen}rem` : 0, top }}
    >
      <svg
        viewBox="0 0 24 24"
        className={`h-[1.667rem] w-[1.667rem] transition-transform ${isOpen ? "" : "rotate-180"}`}
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
  );
}

// ✅ default + named export 동시 제공
export default LeftToggleButton;
export { LeftToggleButton };
