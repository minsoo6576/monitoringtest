"use client";

export default function Header() {
  return (
    <header className="w-full bg-blue-600 text-white px-6 py-4 shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-lg font-bold">관제 모니터링 시스템</h1>
        <nav className="flex gap-4 ">
          <a href="/" className="hover:underline">
            홈
          </a>
          <a href="/about" className="hover:underline">
            소개
          </a>
          <a href="/settings" className="hover:underline">
            설정
          </a>
        </nav>
      </div>
    </header>
  );
}
