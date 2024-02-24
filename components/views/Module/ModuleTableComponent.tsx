'use client';

import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import React from 'react';
import BaseDataViewer from '../BaseDataViewer';
import { Module } from '@/lib/server/types';

const columns: ColumnDef<Module>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => (
      <Link href={`/transactions/${row.original.id}`} className="capitalize font-mono underline">
        {row.original.id}
      </Link>
    ),
  },
  {
    accessorKey: 'moduleKey',
    header: 'Module',
    cell: ({ row }) => {
      const moduleKey = row.getValue('moduleKey');
      return <>{moduleKey}</>;
    },
  },
];

export default function ModuleTableComponent({ data, pageSize }: { data: Module[]; pageSize?: number }) {
  return <BaseDataViewer data={data} columns={columns} pageSize={pageSize} tableOnly />;
}
