"use client";

import { Table, TableRow, TableBody, TableCell } from "@/components/ui/table";

export type NoticeItem = { text: string; time?: string };

export default function NoticeTable({ items }: { items: NoticeItem[] }) {
  return (
    <Table aria-label="공지사항" className="w-full table-fixed h-full">
      <TableBody className="h-full [&_tr]:border-[#EEE] dark:[&_tr]:border-[#222]">
        {items.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={2}
              className="py-[2rem] text-center text-[1rem] text-gray-400"
            >
              데이터가 없습니다.
            </TableCell>
          </TableRow>
        ) : (
          items.slice(0, 4).map((n, i) => (
            <TableRow key={i} className="group align-middle text-[1rem]">
              {/* 텍스트 */}
              <TableCell className="p-0">
                <div
                  className={`min-w-0 h-full box-border flex items-center px-[0.833rem] pt-[0.667rem] pb-[0.667rem] group-first:pt-0 group-last:pb-0`}
                >
                  <span className="truncate">{n.text}</span>
                </div>
              </TableCell>

              {/* 시간 */}
              <TableCell className="p-0">
                <div
                  className={`h-full box-border flex items-center justify-end text-gray-500 whitespace-nowrap px-[0.833rem] pt-[0.667rem] pb-[0.667rem] group-first:pt-0 group-last:pb-0`}
                >
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
