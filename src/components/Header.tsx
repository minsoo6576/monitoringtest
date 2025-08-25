"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";

type AQIKind = "pm10" | "pm25";

function getLevel(kind: AQIKind, v: number) {
  const [g, n, b] = kind === "pm10" ? [30, 80, 150] : [15, 35, 75];
  if (v <= g) return "좋음" as const;
  if (v <= n) return "보통" as const;
  if (v <= b) return "나쁨" as const;
  return "매우나쁨" as const;
}

function levelClasses(level: "좋음" | "보통" | "나쁨" | "매우나쁨") {
  switch (level) {
    case "좋음":
      return {
        text: "text-[#2F7CFF]",
        bg: "bg-[#F3F8FF]",
        border : "border-none"
      };
    case "보통":
      return {
        text: "text-[#16A34A]",
        bg: "bg-[#ECFFED]",
       border : "border-none"
      };
    case "나쁨":
      return {
        text: "text-[#D97706]",
        bg: "bg-[#FFFBF6]",
       border : "border-none"
      };
    case "매우나쁨":
    default:
      return {
        text: "text-[#DC2626]",
        bg: "bg-[#FFF8F8;]",
       border : "border-none"
      };
  }
}


export default function Header() {
  const { resolvedTheme, setTheme } = useTheme();

  const weatherIcons: Record<string, string> = {
    맑음: "/images/weathericon/sunny.png",
    구름조금: "/images/weathericon/partly-cloudy.png",
    구름많음: "/images/weathericon/cloudy.png",
    흐림: "/images/weathericon/overcast.png",
    비: "/images/weathericon/rain.png",
    눈: "/images/weathericon/snow.png",
    천둥번개: "/images/weathericon/thunder.png",
  };
  const fallbackIcon = "/images/weathericon/partly-cloudy.png";

  const weather = {
    date: new Date().toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" }),
    time: new Date().toLocaleTimeString("ko-KR", { hour: "numeric", minute: "numeric" }),
    tempText: "35.3°",
    conditionKo: "구름조금",
    humidity: { label: "습도", value: 46 },
    airpressure: { label: "기압", value: 1006 },
    winddirection: { label: "동풍", value: 0.9 },
    temperature: { label: "체감온도", value: 39.8 },
    pm10: [{ label: "미세먼지", value: 170, unit: "µg/m³" }],
    pm25: [{ label: "초미세먼지", value: 15, unit: "µg/m³" }],
  } as const;

  const pm10 = weather.pm10[0].value;
  const pm25 = weather.pm25[0].value;

  // 등급 계산 + 클래스
  const pm10Level = getLevel("pm10", pm10);
  const pm25Level = getLevel("pm25", pm25);
  const pm10Cls = levelClasses(pm10Level);
  const pm25Cls = levelClasses(pm25Level);

  return (
    <header
      className="
        fixed top-0 left-0 z-50 w-full backdrop-blur-[0.417rem] 
        bg-white/80 border-gray-200
        dark:bg-[#1E1E20] dark:border-[#222]
      "
    >
      <div className="flex h-[6.667rem] items-center gap-x-[12.5rem] px-[2rem]">
        {/* 좌: 로고 */}
        <Link href="/" className="flex items-center">
          <div className="relative w-[10.833rem] aspect-[13/3]">
            <Image src="/logo.png" alt="로고" fill className="object-contain" />
          </div>
        </Link>

        {/* 가운데: 날짜/날씨/지표 */}
        <div className="flex-1 grid grid-cols-[auto_auto_1fr] items-center gap-[3.333rem] text-gray-800 dark:text-gray-200">
          {/* 날짜/시간 */}
          <div className="text-[1.083rem] leading-none">
            <span className="mr-3">{weather.date}</span>
            <span className="font-semibold">{weather.time}</span>
          </div>

          {/* 날씨 */}
          <div className="flex items-center gap-[1rem]">
            <div className="flex items-center gap-[0.667rem]">
              <span className="text-[2rem] leading-none">
                <Image
                  src={weatherIcons[weather.conditionKo] ?? fallbackIcon}
                  alt={weather.conditionKo}
                  width={32}
                  height={32}
                  className="inline-block align-middle object-contain"
                  priority
                />
              </span>
              <div className="flex flex-col leading-none">
                <span className="text-[1.667rem] font-semibold text-gray-900 dark:text-gray-100">
                  {weather.tempText}
                </span>
                <span className="mt-[0.167rem] text-[1rem] text-gray-500 dark:text-gray-400">
                  {weather.conditionKo}
                </span>
              </div>
            </div>

            {/* 세부지표 */}
            <div className="flex flex-col text-[1rem] text-gray-600 dark:text-gray-400 ">
              <span className="mr-3">
                {weather.humidity.label}{" "}
                <b className="text-gray-900 dark:text-gray-200 font-medium">{weather.humidity.value}%</b>
              </span>
              <span className="mr-3">
                {weather.winddirection.label}{" "}
                <b className="text-gray-900 dark:text-gray-200 font-medium">{weather.winddirection.value}m/s</b>
              </span>
            </div>
            <div className="flex flex-col text-[1rem] text-gray-600 dark:text-gray-400">
              <span className="mr-3">
                {weather.airpressure.label}{" "}
                <b className="text-gray-900 dark:text-gray-200 font-medium">{weather.airpressure.value}hPa</b>
              </span>
              <span>
                {weather.temperature.label}{" "}
                <b className="text-gray-900 dark:text-gray-200 font-medium">{weather.temperature.value}°</b>
              </span>
            </div>
          </div>

          {/* 미세먼지/초미세먼지*/}
          <div className="flex items-center gap-[0.667rem] ">
            <div
              className={`inline-flex  h-[3.333rem] items-center gap-[0.5rem] rounded-xl border px-3 py-2 ${pm10Cls.bg} ${pm10Cls.border}`}
              aria-label={`미세먼지 ${pm10Level}`}
            >
              <span className="text-[0.95rem] text-gray-500 dark:text-gray-300">미세먼지</span>
              <b className={`text-[0.95rem] font-semibold ${pm10Cls.text}`}>{pm10Level}</b>
            </div>

            <div
              className={`inline-flex h-[3.333rem] items-center gap-[0.5rem] rounded-xl border px-3 py-2 ${pm25Cls.bg} ${pm25Cls.border}`}
              aria-label={`초미세먼지 ${pm25Level}`}
            >
              <span className="text-[0.95rem] text-gray-500 dark:text-gray-300">초미세먼지</span>
              <b className={`text-[0.95rem] font-semibold ${pm25Cls.text}`}>{pm25Level}</b>
            </div>
          </div>
        </div>

        {/* 우측 버튼 */}
      <nav className="flex items-center gap-[0.667rem]">
        {/* ===== 다크/라이트 모드 버튼 (rem 단위로 수정됨) ===== */}
        <button
          className="
            flex h-[3.333rem] items-center justify-center gap-[0.1875rem] rounded-md border border-[#EEE] bg-white px-[0.8125rem]
            text-gray-700 hover:bg-gray-50
            active:scale-95
            dark:border-[#222] dark:bg-[#272829] dark:text-gray-200 dark:hover:bg-[#333]
          "
          type="button"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          aria-label={resolvedTheme === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환"}
        >
          {/* Image 컴포넌트도 rem 기반의 Tailwind 클래스로 수정 */}
          <Image
            src={resolvedTheme === "dark" ? "/images/icon/lightmode.png" : "/images/icon/darkmode.png"}
            alt={resolvedTheme === "dark" ? "라이트 모드" : "다크 모드"}
            width={12}
            height={12}
            className="h-[1rem] w-[1rem] object-contain"
            priority
          />
          <span className="text-[1rem] text-[#999] font-[400] leading-normal">
            {resolvedTheme === "dark" ? "라이트 모드" : "다크 모드"}
          </span>
        </button>

        {/* ===== 로그아웃 버튼 (기존 코드 유지) ===== */}
          <button
        className="
          inline-flex h-[3.333rem] items-center justify-center gap-[0.625rem] rounded-md border border-[#EEE] bg-white px-[0.625rem]
          font-normal leading-normal text-[#999] hover:bg-gray-50
          active:scale-95
          dark:border-[#222] dark:bg-[#272829] dark:text-gray-400 dark:hover:bg-[#333]
        "
        type="button"
      >
        로그아웃
      </button>
      </nav>
      </div>
    </header>
  );
}


