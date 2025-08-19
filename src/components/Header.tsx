"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  // 샘플 수치 (API 연동시 교체)
  const pm10 = 35;   
  const pm25 = 15;   

  // 막대 너비 (간단 계산)
  const pm10Width = Math.min(100, Math.max(0, (pm10 / 100) * 100));
  const pm25Width = Math.min(100, Math.max(0, (pm25 / 50) * 100));

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white/80 backdrop-blur-[5px]">
      <div className="flex h-20 items-center justify-between px-6 py-5">
        {/* 왼쪽: 로고 */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-[130px] aspect-[13/3]">
            <Image src="/logo.png" alt="로고" fill className="object-contain" />
          </div>
        </Link>

        {/* 가운데: 날짜/시간 + 날씨 + 미세먼지 바 */}
        <div className="hidden xl:flex items-center gap-8">
          {/* 날짜/시간 */}
          <div className="text-gray-800 text-sm">
            <span className="mr-3">2025년 08월 22일</span>
            <span className="font-semibold">14시 30분</span>
          </div>

          {/* 날씨 블록 */}
          <div className="flex items-center gap-3">
            <span className="text-2xl leading-none">🌥️</span>
            <div className="flex items-end gap-[13px] self-stretch">
              <span className="text-2xl font-semibold text-gray-900">35.3°</span>
              <span className="text-xs text-gray-500">흐림</span>
            </div>
            <div className="text-xs text-gray-500">
              <span className="mr-2">습도 46%</span>
              <span className="mr-2">기압 1006 hPa</span>
              <span className="mr-2">동풍 0.9m/s</span>
              <span>체감온도 39.8°</span>
            </div>
          </div>

          {/* 공기질 바들 */}
          <div className="flex items-center gap-6">
            {/* 미세먼지 */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">미세먼지</span>
              <span className="rounded px-1 text-[10px] bg-green-100 text-green-600">보통</span>
              <div className="w-40 h-2 rounded bg-gray-200 overflow-hidden">
                <div
                  className="h-2 bg-green-500"
                  style={{ width: `${pm10Width}%` }}
                />
              </div>
              <span className="text-xs text-gray-500">{pm10}µg/m³</span>
            </div>

            {/* 초미세먼지 */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">초미세먼지</span>
              <span className="rounded px-1 text-[10px] bg-blue-100 text-blue-600">좋음</span>
              <div className="w-40 h-2 rounded bg-gray-200 overflow-hidden">
                <div
                  className="h-2 bg-blue-500"
                  style={{ width: `${pm25Width}%` }}
                />
              </div>
              <span className="text-xs text-gray-500">{pm25}µg/m³</span>
            </div>
          </div>
        </div>

        {/* 오른쪽: 버튼들 */}
        <nav className="flex gap-2">
          <button
            className="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 active:scale-95"
            type="button"
          >
            <span className="text-base leading-none">🌓</span> 다크 모드
          </button>
          <button
            className="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 active:scale-95"
            type="button"
          >
            로그아웃
          </button>
        </nav>
      </div>
    </header>
  );
}
