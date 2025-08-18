"use client";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white backdrop-blur-[5px]">
      <div className="h-20 px-6 py-5 flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-900">관제 모니터링 시스템</h1>
        <nav className="flex gap-4">
          <a href="/" className="text-gray-700 hover:underline">다크모드</a>
          <a href="/about" className="text-gray-700 hover:underline">로그아웃</a>

        </nav>
      </div>
    </header>
  );
}
