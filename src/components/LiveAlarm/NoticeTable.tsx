"use client";

import {
  Table,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export type NoticeItem = { text: string; time?: string };

export default function NoticeTable({ items }: { items: NoticeItem[] }) {
  return (
    <Table aria-label="공지사항">
      <TableBody>
        {items.length === 0 ? (
          <TableRow>
            <TableCell colSpan={2} className="py-[2rem] text-center text-[1rem] text-gray-400">
              데이터가 없습니다.
            </TableCell>
          </TableRow>
        ) : (
          items.map((n, i) => (
            <TableRow key={i}>
              <TableCell className="max-w-[220px] truncate">{n.text}</TableCell>
              <TableCell className="text-right text-[1rem] text-gray-500">
                {n.time ?? "-"}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
