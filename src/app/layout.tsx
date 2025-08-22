import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ui/theme-provider";

export const metadata: Metadata = {
  title: "관제 모니터링 시스템",
  description: "실시간 모니터링 웹 앱",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="pt-[6.667rem] h-screen overflow-hidden bg-gray-100 antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
