"use client";

import {
  Table, TableRow, TableBody, TableCell,
} from "@/components/ui/table";

type Tone = "warn" | "danger";
export type NoticeWarnItem = { location?: string; text: string; time?: string; tone?: Tone };

function Chip({ tone = "warn", children }: { tone?: Tone; children: React.ReactNode }) {
  const map: Record<Tone, string> = {
  warn: "bg-[#FFF6ED] text-[#FF8B17]",
    danger: "bg-[#FFEFEF] text-[#FF1717]",
  };
  return (
    <span className={`inline-flex items-center rounded px-[0.5rem] py-[0.167rem] text-[1rem] font-medium ${map[tone]}`}>
      {children}
    </span>
  );
}

export default function NoticeWarnTable({ items }: { items: NoticeWarnItem[] }) {
  return (
    <Table aria-label="전체현장 실시간 알림">
      <TableBody className="[&_tr]:border-[#EEE] dark:[&_tr]:border-[#222]">
        {items.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className=" text-center text-[1rem] text-gray-400">
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
            <TableCell className="text-left text-[1rem] text-[#3A4451] not-italic font-semibold leading-[1] px-[0.5rem] pb-[0.667rem]">
              {n.location ?? "-"}
            </TableCell>
            <TableCell
                className={`text-[1rem] px-[0.833rem] pb-[0.667rem] group-last:pb-0 ${i === 0 ? "pt-0" : "pt-[0.667rem]"}`}
              >
                <div className="w-60 truncate ">{n.text}</div>
              </TableCell>
            <TableCell className="text-right text-[1rem] text-[#999] font-normal not leading-[1] whitespace-nowrap px-[1.833rem] pb-[0.667rem]">
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
