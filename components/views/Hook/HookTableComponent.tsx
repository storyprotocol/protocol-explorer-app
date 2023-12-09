'use client';

import { shortenString } from '@/utils';
import { Hook, Transaction } from '@story-protocol/core-sdk';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import React from 'react';
import moment from 'moment';
import BaseDataViewer from '../BaseDataViewer';

const columns: ColumnDef<Hook>[] = [
  {
    accessorKey: 'txHash',
    header: 'Txn Hash',
    cell: ({ row }) => (
      <Link href={`/transactions/${row.original.txHash}`} className="capitalize font-mono underline">
        {shortenString(row.original.txHash, 20)}
      </Link>
    ),
  },
  {
    accessorKey: 'id',
    header: 'Hook Address',
    cell: ({ row }) => (
      <Link href={`/transactions/${row.original.id}`} className="capitalize font-mono underline">
        {shortenString(row.original.id, 20)}
      </Link>
    ),
  },
  {
    accessorKey: 'moduleId',
    header: 'Module ID',
    cell: ({ row }) => <>{row.original.moduleId}</>,
  },
  {
    accessorKey: 'hookType',
    header: 'Type',
    cell: ({ row }) => {
      const type: Transaction = row.getValue('hookType');
      return <>{type}</>;
    },
  },
  {
    accessorKey: 'registryKey',
    header: 'Registry Key',
    cell: ({ row }) => {
      const key: Transaction = row.getValue('registryKey');
      return <>{key}</>;
    },
  },

  {
    accessorKey: 'registeredAt',
    header: 'Timestamp',
    cell: ({ row }) => <div className="capitalize">{moment(row.getValue('registeredAt')).fromNow()}</div>,
  },
];

export default function HookTableComponent({ data, pageSize }: { data: Hook[]; pageSize?: number }) {
  return <BaseDataViewer data={data} columns={columns} pageSize={pageSize} tableOnly />;
}
