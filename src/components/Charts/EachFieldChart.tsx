// src/components/Charts/EachFieldChart.tsx
"use client";

import * as React from "react";
import { Bar, BarChart, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type DataItem = { region: string; open: number; close: number };

const chartData: DataItem[] = [
  { region: "수성구", open: 1, close: 3 },
  { region: "북구",   open: 3, close: 4 },
  { region: "중구",   open: 5, close: 1 },
  { region: "동구",   open: 1, close: 5 },
  { region: "남구",   open: 6, close: 3 },
  { region: "서구",   open: 4, close: 4 },
  { region: "달서구", open: 5, close: 3 },
  { region: "달성군", open: 1, close: 1 },
];

const chartConfig = {
  open:  { label: "활성 현장",   color: "#026CF3" },
  close: { label: "비활성 현장", color: "#e4ecf8ff" },
} satisfies ChartConfig;

export default function EachFieldChart({
  data = chartData,
  heightRem = 14,
  widthPx,
  widthRem = 30,
  className = "",
}: {
  data?: DataItem[];
  heightRem?: number;
  widthPx?: number;
  widthRem?: number;
  className?: string;
}) {
  const style: React.CSSProperties = {
    height: `${heightRem}rem`,
    ...(widthPx ? { width: `${widthPx}px` } : widthRem ? { width: `${widthRem}rem` } : {}),
  };

  return (
    <div className={`min-w-0 shrink-0 ${className}`} style={style}>
      <ChartContainer config={chartConfig} className="w-full h-full text-[1rem]">
        <BarChart accessibilityLayer data={data}>
          <XAxis
            dataKey="region"
            tickLine={false}
            tickMargin={8}
            axisLine={false}
          />

          <Bar
            dataKey="open"
            stackId="a"
            fill="var(--color-open)"
            radius={[0, 0, 4, 4]}
          />
          <Bar
            dataKey="close"
            stackId="a"
            fill="var(--color-close)"
            radius={[4, 4, 0, 0]}
          />

          <ChartTooltip
            cursor={false}
            defaultIndex={1}
            content={
              <ChartTooltipContent
                hideLabel
                className="w-[220px] h-[100x]"
                formatter={(value, name, item, index) => (
                  <>
                    <div
                      className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-[var(--color-bg)]"
                      style={
                        {
                          "--color-bg": `var(--color-${name})`,
                        } as React.CSSProperties
                      }
                    />
                    {chartConfig[name as keyof typeof chartConfig]?.label ?? name}
                    <div className="text-foreground ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums">
                      {value}
                      <span className="text-muted-foreground font-normal">개</span>
                    </div>

                    {index === 1 && (
                      <div className="text-foreground mt-1.5 flex basis-full items-center border-t pt-1.5 text-xs font-medium">
                        총 현장
                        <div className="text-foreground ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums">
                          {item.payload.open + item.payload.close}
                          <span className="text-muted-foreground font-normal">개</span>
                        </div>
                      </div>
                    )}
                  </>
                )}
              />
            }
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
