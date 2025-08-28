// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/ui/theme-provider";

export const metadata: Metadata = {
  title: "관제 모니터링 시스템",
  description: "실시간 모니터링 웹 앱",
};

const HEADER_H = "6.667rem";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const apiKey = process.env.NEXT_PUBLIC_VWORLD_API_KEY ?? "";
  const domain = process.env.NEXT_PUBLIC_VWORLD_DOMAIN ?? "localhost:3000";

  return (
    <html lang="ko" className="h-full" suppressHydrationWarning>
      <head>
        {/* ✅ document.write 패치 (중복 방지 포함) */}
        <Script id="patch-document-write" strategy="beforeInteractive">
          {`
            (function(){
              if (window.__vworldPatched) return;
              window.__vworldPatched = true;

              var inserted = window.__vworldInserted = new Set(
                Array.from(document.querySelectorAll('script[src],link[rel="stylesheet"][href]'))
                     .map(function(n){ return n.src || n.href; })
                     .filter(Boolean)
              );

              var queue = [];   // { type: 'script'|'style', url }
              var loading = false;

              function enqueue(type, url){
                if (!url || inserted.has(url)) return;
                inserted.add(url);
                queue.push({ type, url });
                if (!loading) loadNext();
              }

              function loadNext(){
                if (!queue.length) { loading = false; return; }
                loading = true;
                var item = queue.shift();

                if (item.type === 'script'){
                  var s = document.createElement('script');
                  s.src = item.url;
                  s.async = false; // 실행 순서 보장
                  s.onload = s.onerror = function(){ loadNext(); };
                  document.head.appendChild(s);
                } else {
                  var l = document.createElement('link');
                  l.rel = 'stylesheet';
                  l.href = item.url;
                  l.onload = l.onerror = function(){ loadNext(); };
                  document.head.appendChild(l);
                }
              }

              var origWrite = document.write;
              document.write = function(html){
                try{
                  if (typeof html === 'string') {
                    var tmp = document.createElement('div');
                    tmp.innerHTML = html;

                    tmp.querySelectorAll('script[src]').forEach(function(orig){
                      enqueue('script', orig.src);
                    });
                    tmp.querySelectorAll('link[rel="stylesheet"][href]').forEach(function(orig){
                      enqueue('style', orig.href);
                    });

                    return; // 원래 document.write로 DOM에 직접 쓰는 행위 방지
                  }
                } catch(e){
                  console.warn('[VWorld] document.write shim warning:', e);
                }
                try { origWrite.apply(document, arguments); } catch(e) {}
              };
            })();
          `}
        </Script>

        {/* ✅ VWorld 메인 스크립트 (문서 파싱 전에 동기 로드) */}
        {apiKey && (
          <Script
            id="vworld-webgl3"
            src={
              "https://map.vworld.kr/js/webglMapInit.js.do" +
              "?version=3.0" +
              "&apiKey=" + encodeURIComponent(apiKey) +
              "&domain=" + encodeURIComponent(domain)
            }
            strategy="beforeInteractive"
          />
        )}
      </head>

      <body className="h-full overflow-hidden antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Header />
          <div id="app-shell" className="fixed inset-0" style={{ top: HEADER_H }}>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
