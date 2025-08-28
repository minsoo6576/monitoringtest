// src/components/ToggleButton/RightToggleButton.tsx
"use client";

import { useEffect, useRef, useState } from "react";

const REM = 12; // 1rem = 12px

export type RightToggleButtonProps = {
  isOpen: boolean;
  onToggle: () => void;
  rightRemWhenOpen: number; // 패널 폭(rem) = 열렸을 때 버튼의 right 오프셋
  top: string;              // 버튼의 CSS top (예: `calc(50vh + ${topOffsetRem/2}rem)`)
  holdVisible?: boolean;    // 패널 위 호버 시 true로 유지
  inactiveMs?: number;      // 활동 없을 때 자동 숨김(ms)
  zoneRatioX?: number;      // 수평 감지 비율(0~1): 오른쪽 가장자리/패널 왼쪽 인접 밴드 폭
  className?: string;
};

function RightToggleButton({
  isOpen,
  onToggle,
  rightRemWhenOpen,
  top,
  holdVisible = false,
  inactiveMs = 500,
  zoneRatioX = 0.1,
  className = "",
}: RightToggleButtonProps) {
  const [visible, setVisible] = useState(false);

  const hoverBtnRef = useRef(false);
  const focusBtnRef = useRef(false);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const clearHide = () => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = null;
  };

  // 보이기 + 타이머 리셋(호버/포커스/패널 유지 중 아니면 inactiveMs 후 숨김)
  const bump = () => {
    setVisible(true);
    clearHide();
    hideTimerRef.current = setTimeout(() => {
      if (!hoverBtnRef.current && !focusBtnRef.current && !holdVisible) {
        setVisible(false);
      }
    }, inactiveMs);
  };

  // 수평 감지 밴드 (닫힘: 오른쪽 가장자리, 열림: 패널 왼쪽 인접 밴드)
  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      const vw = window.innerWidth || document.documentElement.clientWidth;
      const bandW = Math.max(1, vw * Math.max(0, Math.min(1, zoneRatioX)));
      const panelPx = rightRemWhenOpen * REM;

      // 닫힘: [vw - bandW, vw]
      // 열림: [vw - panelPx - bandW, vw - panelPx]
      const bandLeft = isOpen ? Math.max(0, vw - panelPx - bandW) : Math.max(0, vw - bandW);
      const inBand = e.clientX >= bandLeft;

      if (inBand || holdVisible) bump();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      clearHide();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, rightRemWhenOpen, zoneRatioX, holdVisible, inactiveMs]);

  // 패널 호버 신호 변화 → 즉시 보이기
  useEffect(() => {
    if (holdVisible) bump();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [holdVisible]);

  // 열림/닫힘 전환 시에도 잠깐 보였다가 자동 숨김
  useEffect(() => {
    bump();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // 버튼 자체 호버/포커스
  const onEnter = () => {
    hoverBtnRef.current = true;
    bump();
    clearHide(); // 호버 중엔 숨김 중단
  };
  const onLeave = () => {
    hoverBtnRef.current = false;
    bump(); // 떠날 때 한 번 리셋 → 이후 자동 숨김
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
      aria-label={isOpen ? "오른쪽 메뉴 닫기" : "오른쪽 메뉴 열기"}
      className={`
        fixed z-50
        flex items-center justify-center
        h-[6.667rem] w-[2.883rem]
        rounded-[0.5rem]
        border border-gray-200 bg-white text-gray-700
        transition-[right,transform,opacity] duration-300
        hover:bg-gray-50
        dark:border-[#222] dark:bg-[#272829] dark:text-gray-100 dark:hover:bg-[#2f3032]
        ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}
        ${className}
      `}
      style={{
        right: isOpen ? `${rightRemWhenOpen}rem` : 0,
        top,
      }}
    >
      <svg
        viewBox="0 0 24 24"
        className={`h-[1.667rem] w-[1.667rem] transition-transform ${isOpen ? "" : "rotate-180"}`}
        aria-hidden="true"
      >
        <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    </button>
  );
}

// ✅ default + named export 동시 제공
export default RightToggleButton;
export { RightToggleButton };
