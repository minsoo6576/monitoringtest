"use client";

import RightSidebar from "@/components/RightSidebar";
export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* 헤더 */}
      <header className="h-16 bg-white shadow px-6 flex items-center justify-between">
        <div className="font-semibold text-gray-700">라이브모드</div>
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <span>2025년 08월 22일 14시 30분</span>
          <span>기온 35.3° 습도 46% 풍속 0.9m/s</span>
          <button className="px-3 py-1 rounded-md bg-gray-100">
            다크 모드
          </button>
          <button className="px-3 py-1 rounded-md bg-gray-100">로그인</button>
        </div>
      </header>

      {/* 본문 */}
      <div className="flex flex-1">
        {/* 좌측 사이드바 */}
        <aside className="w-72 bg-white border-r shadow-md p-4 space-y-4 overflow-y-auto">
          <h2 className="font-semibold">대구교 수로공사</h2>
          <div className="space-y-4">
            <div className="rounded-lg border p-4 bg-white">현장 카드 1</div>
            <div className="rounded-lg border p-4 bg-white">현장 카드 2</div>
          </div>
        </aside>

        {/* 중앙 지도 + 하단 현황판 */}
        <main className="flex-1 flex flex-col">
          <div className="flex-1 bg-gray-200">지도 들어갈 자리</div>
          <div className="h-40 bg-white border-t shadow-md p-4">
            전체 현장 알림 / 통계 그래프
          </div>
        </main>

        {/* 우측 사이드바 */}
        <RightSidebar />
      </div>
    </div>
  );
}
