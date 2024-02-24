'use client';

import React from 'react';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Skeleton } from '../ui/skeleton';

export default function SkeletonTable() {
  return (
    <div className="w-full">
      <div className="p-5 bg-white w-full rounded-lg border bg-card text-card-foreground shadow-sm ">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[600px]">
                <Skeleton className="h-4 w-[100px] bg-indigo-100" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-[100px] bg-indigo-100" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-[100px] bg-indigo-100" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-[100px] bg-indigo-100" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-[100px] bg-indigo-100" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {new Array(10).fill(0).map((row) => (
              <TableRow key={row.id}>
                {new Array(5).fill(0).map((cell) => (
                  <TableCell key={cell.id}>{<Skeleton className="h-4 w-[250px]" />}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
          selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div> */}
    </div>
  );
}
