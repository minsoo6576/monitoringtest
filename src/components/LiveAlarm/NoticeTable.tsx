// src/components/LiveAlarm/NoticeTable.tsx
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
    <Table aria-label="실시간 주의알림">


      <TableBody>
        {items.length === 0 ? (
          <TableRow>
            <TableCell colSpan={2} className="py-6 text-center text-xs text-gray-400">
              데이터가 없습니다.
            </TableCell>
          </TableRow>
        ) : (
          items.map((n, i) => (
            <TableRow key={i}>
              <TableCell className="max-w-[220px] truncate">{n.text}</TableCell>
              <TableCell className="text-right text-xs text-gray-500">
                {n.time ?? "-"}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
