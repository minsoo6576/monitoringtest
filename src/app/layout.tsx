import "./globals.css";
import type { Metadata } from "next";

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
      <body className="min-h-screen bg-gray-100">{children}</body>
    </html>
  );
}
