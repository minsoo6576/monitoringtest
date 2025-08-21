"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const ROOT = 12; // 1rem = 12px
const toPx = (rem: number) => rem * ROOT;

const chartData = [
  { browser: "수성구", visitors: 1, fill: "#6FD195" },
  { browser: "달서구", visitors: 2, fill: "#537FF1" },
  { browser: "북구",  visitors: 1, fill: "#3CC3DF" },
  { browser: "남구",  visitors: 3, fill: "#8979FF" },
  { browser: "서구",  visitors: 1, fill: "#FF928A" },
  { browser: "중구",  visitors: 1, fill: "#FFAE4C" },
];

const chartConfig = {
  visitors: { label: "Visitors" },
} satisfies ChartConfig;

type Props = {
  sizeRem?: number;         // 컨테이너 높이 (정사각형)
  widthRem?: number;        // 컨테이너 가로
  innerRadiusRem?: number;  // 도넛 반지름 (rem로 입력받되 → px로 변환)
  outerRadiusRem?: number;
  translateXRem?: number;
  sidePadRem?: number;      // 라벨 좌우 여백
};

export default function CircleChart({
  sizeRem = 10,             // 120px
  widthRem = 22.333,        // 268px
  innerRadiusRem = 2.083,   // 25px
  outerRadiusRem,
  translateXRem = 0,
  sidePadRem = 1.333,       // 16px
}: Props) {
  const totalVisitors = React.useMemo(
    () => chartData.reduce((acc, curr) => acc + curr.visitors, 0),
    []
  );

  // --- rem 기반 계산은 하되, 최종적으로 px로 변환해서 Recharts에 전달 ---
  const fallbackOuterRem = Math.max(0.833, sizeRem / 2 - 0.667); // ~4.333rem
  const outerRem = outerRadiusRem ?? fallbackOuterRem;
  const innerRem = innerRadiusRem ?? Math.max(0, outerRem * 0.6);

  const outerPx = toPx(outerRem);
  const innerPx = toPx(innerRem);

  // 커넥터 라벨용 간격도 px로
  const outGapRem = 0.833;            // 10px
  const outGapPx = toPx(outGapRem);
  const fontYOffsetRem = 0.25;        // 3px
  const fontYOffsetPx = toPx(fontYOffsetRem);

  // 외부 라벨 커스텀 렌더러 (cx, cy, r 모두 px 좌표계)
  const renderExtLabel = (props: any) => {
    const { cx, cy, midAngle, outerRadius, value, fill } = props;
    const RAD = Math.PI / 180;
    const sin = Math.sin(-RAD * midAngle);
    const cos = Math.cos(-RAD * midAngle);

    const r = outerRadius as number; // px
    const sx = cx + r * cos;
    const sy = cy + r * sin;
    const mx = cx + (r + outGapPx) * cos;
    const my = cy + (r + outGapPx) * sin;

    const containerWidthPx = toPx(widthRem);
    const sidePadPx = toPx(sidePadRem);
    const ex = cos >= 0 ? containerWidthPx - sidePadPx : sidePadPx;
    const ey = my;

    const textAnchor = cos >= 0 ? "start" : "end";
    const tx = cos >= 0 ? ex + 4 : ex - 4; // 4px 미세 여백
    const ty = ey + fontYOffsetPx;

    return (
      <g>
        <path
          d={`M${sx},${sy} L${mx},${my} L${ex},${ey}`}
          stroke={fill || "currentColor"}
          strokeWidth={1.5}
          fill="none"
        />
        <text
          x={tx}
          y={ty}
          textAnchor={textAnchor}
          className="fill-foreground text-[0.833rem] font-medium" // 10px
        >
          {value?.toLocaleString?.() ?? value}
        </text>
      </g>
    );
  };

  return (
    <div
      className="[&_.recharts-wrapper]:overflow-visible [&_.recharts-surface]:overflow-visible"
      style={{
        width: `${widthRem}rem`,
        height: `${sizeRem}rem`,
        transform: `translateX(${translateXRem}rem)`,
        overflow: "visible",
      }}
    >
      <ChartContainer config={chartConfig} className="w-full h-full aspect-auto overflow-visible">
        <PieChart
          margin={{
            top: toPx(1),                 // 1rem → 12px
            right: toPx(sidePadRem),
            bottom: toPx(0.333),          // 0.333rem → 4px
            left: toPx(sidePadRem),
          }}
        >
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Pie
            data={chartData}
            dataKey="visitors"
            nameKey="browser"
            innerRadius={innerPx}         // px로 전달
            outerRadius={outerPx}         // px로 전달
            strokeWidth={1}
            labelLine={false}
            label={renderExtLabel}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="fill-foreground"
                    >
                      <tspan x={viewBox.cx} y={viewBox.cy} className="text-base font-bold">
                        {totalVisitors.toLocaleString()}
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  );
}
