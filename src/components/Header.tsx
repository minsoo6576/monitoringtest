"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header() {

   const weatherIcons: Record<string, string> = {
    맑음: "/images/weathericon/sunny.png",
    구름조금: "/images/weathericon/partly-cloudy.png",
    구름많음: "/images/weathericon/cloudy.png",
    흐림: "/images/weathericon/overcast.png",
    비: "/images/weathericon/rain.png",
    눈: "/images/weathericon/snow.png",
    천둥번개: "/images/weathericon/thunder.png",
  };
  const weather = {
    date: new Date().toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    time: new Date().toLocaleTimeString("ko-KR", {
      hour: "numeric",
      minute: "numeric",
    }),
    tempText: "35.3°",
    conditionKo: "흐림",
    humidity: { label: "습도", value: 46 },
    airpressure: { label: "기압", value: 1006 },
    winddirection: { label: "동풍", value: 0.9 },
    temperature: { label: "체감온도", value: 39.8 },
    pm10: [
      {
        label: "미세먼지",
        level: "보통",
        value: 35,
        max: 100,
        unit: "µg/m³",
        badgeBg: "bg-green-100",
        badgeText: "text-green-600",
        barClass: "bg-green-500",
      },
    ],
    pm25: [
      {
        label: "초미세먼지",
        level: "좋음",
        value: 15,
        max: 50,
        unit: "µg/m³",
        badgeBg: "bg-blue-100",
        badgeText: "text-blue-600",
        barClass: "bg-blue-500",
      },
    ],
  } as const;

  const pm10 = weather.pm10[0].value;
  const pm25 = weather.pm25[0].value;

  const pm10Width = Math.min(100, Math.max(0, (pm10 / weather.pm10[0].max) * 100));
  const pm25Width = Math.min(100, Math.max(0, (pm25 / weather.pm25[0].max) * 100));

  const humidityText = weather.humidity.value;

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white/80 backdrop-blur-[0.417rem]">
      {/* blur-[5px] → 5/12 = 0.417rem */}
      <div className="flex h-[6.667rem] items-center gap-x-[12.5rem] px-[2rem]">
        {/* 좌: 로고 */}
        <Link href="/" className="flex items-center">
          <div className="relative w-[10.833rem] aspect-[13/3]">
            <Image src="/logo.png" alt="로고" fill className="object-contain" />
          </div>
        </Link>

        {/* 가운데: 날짜/날씨/지표 */}
        <div className="flex-1 grid grid-cols-[auto_auto_1fr] items-center gap-[3.333rem]">
          {/* 1) 날짜/시간 */}
          <div className="text-[1.083rem] leading-none text-gray-800">
            <span className="mr-3">{weather.date}</span>
            <span className="font-semibold">{weather.time}</span>
          </div>

          {/* 2) 날씨 */}
          <div className="flex items-center gap-[1rem]">
            <div className="flex items-center gap-[0.667rem]">
        <span className="text-[2rem] leading-none">
          <Image
            src={weatherIcons[weather.conditionKo] ?? "x"}
            alt={weather.conditionKo}
            width={32}   // 이 크기만 조절하면 됩니다
            height={32}
            className="inline-block align-middle object-contain"
            priority
          />
        </span>

              <div className="flex flex-col leading-none">
                <span className="text-[1.667rem] font-semibold text-gray-900">{weather.tempText}</span>
                <span className="mt-[0.167rem] text-[1rem] text-gray-500">{weather.conditionKo}</span>
              </div>
            </div>

            {/* 세부지표 */}
            <div className="flex flex-col text-[1rem] text-gray-500">
              <span className="mr-3">
                {weather.humidity.label}{" "}
                <b className="text-gray-700 font-medium">{humidityText}%</b>
              </span>
               <span className="mr-3">
                {weather.winddirection.label}{" "}
                <b className="text-gray-700 font-medium">{weather.winddirection.value}m/s</b>
              </span>
            </div>
            <div className="flex flex-col text-[1rem] text-gray-500">
               <span className="mr-3">
                {weather.airpressure.label}{" "}
                <b className="text-gray-700 font-medium">
                  {weather.airpressure.value}
                  hPa
                </b>
              </span>
              <span>
                {weather.temperature.label}{" "}
                <b className="text-gray-700 font-medium">{weather.temperature.value}°</b>
              </span>
            </div>
          </div>

          {/* 3) 미세먼지 */}
          <div className="flex flex-col gap-[0.5rem]">
            <div className="grid grid-cols-[auto_auto_1fr_auto] items-center gap-[0.667rem]">
              <span className="text-[1rem] text-gray-500">{weather.pm10[0].label}</span>
              <span className={`rounded px-[0.25rem] text-[0.833rem] ${weather.pm10[0].badgeBg} ${weather.pm10[0].badgeText} leading-[1rem]`}>
                {weather.pm10[0].level}
              </span>
              <div className="h-[0.5rem] w-[15rem] rounded bg-gray-200 overflow-hidden">
                <div className={`h-[0.5rem] ${weather.pm10[0].barClass}`} style={{ width: `${pm10Width}%` }} />
              </div>
              <span className="text-[1rem] text-gray-500 whitespace-nowrap">
                {pm10}{weather.pm10[0].unit}
              </span>
            </div>

            <div className="grid grid-cols-[auto_auto_1fr_auto] items-center gap-[0.667rem]">
              <span className="text-[1rem] text-gray-500">{weather.pm25[0].label}</span>
              <span className={`rounded px-[0.25rem] text-[0.833rem] ${weather.pm25[0].badgeBg} ${weather.pm25[0].badgeText} leading-[1rem]`}>
                {weather.pm25[0].level}
              </span>
              <div className="h-[0.5rem] w-[15rem] rounded bg-gray-200 overflow-hidden">
                <div className={`h-[0.5rem] ${weather.pm25[0].barClass}`} style={{ width: `${pm25Width}%` }} />
              </div>
              <span className="text-[1rem] text-gray-500 whitespace-nowrap">
                {pm25}{weather.pm25[0].unit}
              </span>
            </div>
          </div>
        </div>

        {/* 우: 버튼 */}
        <nav className="flex gap-[0.667rem]">
          <button
            className="inline-flex items-center gap-[0.25rem] rounded-md border border-gray-200 bg-white px-[1rem] py-[0.5rem] text-[1.167rem] text-gray-700 hover:bg-gray-50 active:scale-95"
            type="button"
          >
            <span className="text-[1.333rem] leading-none">🌓</span> 다크 모드
          </button>
          <button
            className="inline-flex items-center gap-[0.25rem] rounded-md border border-gray-200 bg-white px-[1rem] py-[0.5rem] text-[1.167rem] text-gray-700 hover:bg-gray-50 active:scale-95"
            type="button"
          >
            로그아웃
          </button>
        </nav>
      </div>
    </header>
  );
}
