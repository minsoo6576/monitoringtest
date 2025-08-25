"use client";

import {
  Table, TableRow, TableBody, TableCell,
} from "@/components/ui/table";

type Tone = "warn" | "danger";
export type NoticeWarnItem = { text: string; time?: string; tone?: Tone };

function Chip({ tone = "warn", children }: { tone?: Tone; children: React.ReactNode }) {
  const map: Record<Tone, string> = {
    warn: "bg-amber-100 text-amber-700",
    danger: "bg-red-100 text-red-700",
  };
  return (
    <span className={`inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium ${map[tone]}`}>
      {children}
    </span>
  );
}

export default function NoticeWarnTable({ items }: { items: NoticeWarnItem[] }) {
  return (
    <Table aria-label="전체현장 실시간 알림">
      <TableBody>
        {items.length === 0 ? (
          <TableRow>
            <TableCell colSpan={3} className="py-6 text-center text-xs text-gray-400">
              데이터가 없습니다.
            </TableCell>
          </TableRow>
        ) : (
          items.map((n, i) => {
            const tone: Tone = n.tone === "danger" ? "danger" : "warn";
            const label = tone === "danger" ? "경고" : "주의";
            return (
             <TableRow key={i} className="p-[0.833rem]">
            <TableCell className="w-12">
              <Chip tone={tone}>{label}</Chip>
            </TableCell>
            <TableCell className="max-w-[180px] truncate">{n.text}</TableCell>
            <TableCell className="text-right text-xs text-gray-500 whitespace-nowrap">
              {n.time ?? "-"}
            </TableCell>
          </TableRow>

            );
          })
        )}
      </TableBody>
    </Table>
  );
}
