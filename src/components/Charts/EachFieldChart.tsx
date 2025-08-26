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

type DataItem = { region: string; running: number; swimming: number };

const chartData: DataItem[] = [
  { region: "수성구", running: 1, swimming: 3 },
  { region: "북구",   running: 3, swimming: 4 },
  { region: "중구",   running: 5, swimming: 1 },
  { region: "동구",   running: 1, swimming: 5 },
  { region: "남구",   running: 6, swimming: 3 },
  { region: "서구",   running: 4, swimming: 4 },
  { region: "달서구", running: 5, swimming: 3 },
  { region: "달성군", running: 1, swimming: 1 },
];

const chartConfig = {
  running:  { label: "Running",  color: "#026CF3" },
  swimming: { label: "Swimming", color: "#e4ecf8ff" },
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
      {/* ChartContainer는 부모 크기를 100%로 따라감 */}
      <ChartContainer config={chartConfig} className="w-full h-full text-[1rem]">
        <BarChart accessibilityLayer data={data}>
          <XAxis
            dataKey="region"
            tickLine={false}
            tickMargin={8}
            axisLine={false}
          />

          <Bar
            dataKey="running"
            stackId="a"
            fill="var(--color-running)"
            radius={[0, 0, 4, 4]}
          />
          <Bar
            dataKey="swimming"
            stackId="a"
            fill="var(--color-swimming)"
            radius={[4, 4, 0, 0]}
          />

          <ChartTooltip
            cursor={false}
            defaultIndex={1}
            content={
              <ChartTooltipContent
                hideLabel
                className="w-[180px]"
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
                      <span className="text-muted-foreground font-normal">kcal</span>
                    </div>

                    {index === 1 && (
                      <div className="text-foreground mt-1.5 flex basis-full items-center border-t pt-1.5 text-xs font-medium">
                        Total
                        <div className="text-foreground ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums">
                          {item.payload.running + item.payload.swimming}
                          <span className="text-muted-foreground font-normal">kcal</span>
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
