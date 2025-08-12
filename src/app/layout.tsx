import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "관제 모니터링 시스템",
  description: "실시간 모니터링 웹 앱",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-gray-100">
        <Header />
        {/* 전체 화면: 헤더 제외 */}
        <div className="pt-[72px] flex">
          {/* 왼쪽 사이드바 */}
          <aside className="w-64 bg-white shadow-md border-r hidden md:block">
            <div className="p-4 font-semibold">왼쪽 메뉴</div>
            <ul className="p-2">
              <li className="p-2 hover:bg-gray-100 cursor-pointer">대시보드</li>
              <li className="p-2 hover:bg-gray-100 cursor-pointer">모니터링</li>
              <li className="p-2 hover:bg-gray-100 cursor-pointer">로그</li>
            </ul>
          </aside>

          {/* 메인 콘텐츠 */}
          <main className="flex-1 p-6">{children}</main>

          {/* 오른쪽 사이드바 */}
          <aside className="w-72 bg-white shadow-md border-l hidden lg:block">
            <div className="p-4 font-semibold">알림 / 상세</div>
            <div className="p-2 text-sm text-gray-500">
              여기에 실시간 알림, 차트, 로그를 표시할 수 있습니다.
            </div>
          </aside>
        </div>
      </body>
    </html>
  );
}
