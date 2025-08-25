"use client";

import { Table, TableRow, TableBody, TableCell } from "@/components/ui/table";

export type WorkItem = { text: string; time?: string };

export default function WorkTable({ items }: { items: WorkItem[] }) {
  return (
    <Table aria-label="주요 작업정보" className="w-full table-fixed h-full">
      <TableBody className="h-full">
        {items.length === 0 ? (
          <TableRow>
            <TableCell colSpan={2} className="py-[2rem] text-center text-[1rem] text-gray-400">
              데이터가 없습니다.
            </TableCell>
          </TableRow>
        ) : (
          items.map((n, i) => (
            <TableRow key={i} className="align-middle h-[3.083rem]">
              <TableCell className="px-[0.833rem] pt-[0.667rem] pb-[0.667rem] first:pt-0">
                <div className="min-w-0 truncate">{n.text}</div>
              </TableCell>
              <TableCell className="text-right text-[1rem] text-gray-500 whitespace-nowrap px-[0.833rem] pt-[0.667rem] pb-[0.667rem] first:pt-0">
                {n.time ?? "-"}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
