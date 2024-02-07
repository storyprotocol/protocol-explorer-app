'use client';

import { Module } from '@story-protocol/core-sdk';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import React from 'react';
import BaseDataViewer from '../BaseDataViewer';

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
  {
    accessorKey: 'ipOrgId',
    header: 'Module ID',
    cell: ({ row }) => (
      <Link href={`/collections/${row.original.ipOrgId}`} className="capitalize font-mono underline">
        {row.original.ipOrgId}
      </Link>
    ),
  },
];

export default function ModuleTableComponent({ data, pageSize }: { data: Module[]; pageSize?: number }) {
  return <BaseDataViewer data={data} columns={columns} pageSize={pageSize} tableOnly />;
}
