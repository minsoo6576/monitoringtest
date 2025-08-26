"use client";

import { Table, TableRow, TableBody, TableCell } from "@/components/ui/table";

type Tone = "warn" | "danger";
export type DangerItem = { text: string; time?: string; tone?: Tone };

function Chip({ tone = "danger", children }: { tone?: Tone; children: React.ReactNode }) {
  const map: Record<Tone, string> = {
    warn: "bg-[#FFF6ED] text-[#FF8B17]",
    danger: "bg--[#FFEFEF] text-[#FF1717]",
  };
  return (
    <span className={`inline-flex items-center rounded px-[0.5rem] py-[0.167rem] text-[1rem] font-medium ${map[tone]}`}>
      {children}
    </span>
  );
}

export default function DangerTable({ items }: { items: DangerItem[] }) {
  return (
    <Table aria-label="실시간 주의알림" className="w-full table-fixed h-full">
      <TableBody className="h-full [&_tr]:border-[#EEE] dark:[&_tr]:border-[#222]">
        {items.length === 0 ? (
          <TableRow>
            <TableCell colSpan={3} className="py-[2rem] text-center text-[1rem] text-gray-400">
              데이터가 없습니다.
            </TableCell>
          </TableRow>
        ) : (
          items.map((n, i) => (
            <TableRow key={i} className="group align-middle text-[1rem]">
              <TableCell
                className={`w-12 px-[0.833rem] pb-[0.667rem] group-last:pb-0 ${i === 0 ? "pt-0" : "pt-[0.667rem]"}`}
              >
                <Chip tone={n.tone ?? "danger"}>{(n.tone ?? "danger") === "warn" ? "주의" : "경고"}</Chip>
              </TableCell>

              <TableCell
                className={`px-[0.833rem] pb-[0.667rem] group-last:pb-0 ${i === 0 ? "pt-0" : "pt-[0.667rem]"}`}
              >
                <div className="min-w-0 truncate">{n.text}</div>
              </TableCell>

              <TableCell
                className={`text-right text-[1rem] text-gray-500 whitespace-nowrap px-[0.833rem] pb-[0.667rem] group-last:pb-0 ${
                  i === 0 ? "pt-0" : "pt-[0.667rem]"
                }`}
              >
                {n.time ?? "-"}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
