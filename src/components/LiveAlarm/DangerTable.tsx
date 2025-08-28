// src/components/LiveAlarm/DangerTable.tsx
"use client";

import { Table, TableRow, TableBody, TableCell } from "@/components/ui/table";

type Tone = "warn" | "danger";
export type DangerItem = { text: string; time?: string; tone?: Tone };

function Chip({ tone = "danger", children }: { tone?: Tone; children: React.ReactNode }) {
  const map: Record<Tone, string> = {
    warn: "bg-[#FFF6ED] text-[#FF8B17] text-[1rem]",
    danger: "bg-[#FFEFEF] text-[#FF1717] text-[1rem]", 
  };
  return (
    <span
      className={`inline-flex items-center rounded px-[0.5rem] py-[0.167rem] text-[0.833rem] font-medium ${map[tone]}`}
    >
      {children}
    </span>
  );
}

export default function DangerTable({ items }: { items: DangerItem[] }) {
  return (
    <Table aria-label="실시간 경고알림" className="w-full table-fixed h-full">
      {/* 모든 tr 보더 색상 통일 */}
      <TableBody className="h-full [&_tr]:border-[#EEE] dark:[&_tr]:border-[#222]">
        {items.length === 0 ? (
          <TableRow>
            <TableCell colSpan={3} className="py-[2rem] text-center text-[1rem] text-gray-400">
              데이터가 없습니다.
            </TableCell>
          </TableRow>
        ) : (
          items.map((n, i) => (
            <TableRow key={i} className="group align-middle">
              {/* 상태 칩 */}
              <TableCell className=" p-0 w-12">
                <div className=" h-full box-border flex items-center px-[0.833rem] pt-[0.667rem] pb-[0.667rem] group-first:pt-0 group-last:pb-0">
                  <Chip tone={n.tone ?? "danger"}>
                    {(n.tone ?? "danger") === "warn" ? "주의" : "경고"}
                  </Chip>
                </div>
              </TableCell>

              {/* 텍스트 */}
              <TableCell
                className={`text-[1rem] px-[0.833rem] pb-[0.667rem] group-last:pb-0 ${i === 0 ? "pt-0" : "pt-[0.667rem]"}`}
              >
                <div className="w-60 truncate ">{n.text}</div>
              </TableCell>

              {/* 시간 */}
              <TableCell className="p-0">
                <div className="h-full box-border flex items-center justify-end text-[1rem] text-gray-500 whitespace-nowrap px-[0.833rem] pt-[0.667rem] pb-[0.667rem] group-first:pt-0 group-last:pb-0">
                  {n.time ?? "-"}
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
