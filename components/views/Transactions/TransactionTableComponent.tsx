'use client';

import SuccessBadge from '@/components/badges/SuccessBadge';
import { shortenAddress, shortenString } from '@/utils';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import React from 'react';
import moment from 'moment';
import BaseDataViewer from '../BaseDataViewer';
import AddressComponent from '@/components/snippets/AddressComponent';
import { Transaction } from '@/lib/server/sdk';

const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'id',
    header: 'TxHash',
    cell: ({ row }) => (
      <Link href={`/transactions/${row.original.id}`} className="capitalize text-xs font-mono underline">
        {shortenString(row.original.id, 20)}
      </Link>
    ),
  },
  {
    accessorKey: 'txStatus',
    header: 'Status',
    cell: () => <SuccessBadge>Success</SuccessBadge>,
  },
  {
    accessorKey: 'actionType',
    header: 'Action',
    cell: ({ row }) => {
      const type: Transaction = row.getValue('actionType');
      return <>{type}</>;
    },
  },
  {
    accessorKey: 'resourceType',
    header: 'Resource',
    cell: ({ row }) => {
      const type: Transaction = row.getValue('resourceType');
      return <>{type}</>;
    },
  },
  {
    accessorKey: 'ipId',
    header: 'IP ID',
    cell: ({ row }) => (
      <div className="text-xs font-mono min-w-[70px] text-center">{shortenAddress(row.getValue('resourceId'), 5)}</div>
    ),
  },
  {
    accessorKey: 'resourceId',
    header: 'Collection ID',
    cell: ({ row }) => (
      <Link href={`/collections/${row.original.resourceId}`}>
        <div className="text-xs text-left font-mono text-indigo-400 hover:underline">{row.getValue('resourceId')}</div>
      </Link>
    ),
  },
  {
    accessorKey: 'initiator',
    header: 'Address',
    cell: ({ row }) => {
      const address = row.getValue('initiator');
      return <AddressComponent address={address as string} size="sm" />;
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Timestamp',
    cell: ({ row }) => (
      <div className="capitalize text-xs min-w-[100px] text-center">
        {moment.unix(row.getValue('createdAt')).fromNow()}
      </div>
    ),
  },

  // {
  //   accessorKey: 'arweaveURI',
  //   header: 'Arweave',
  //   cell: ({ row }) => (
  //     <a href={row.getValue('arweaveURI')} target="_blank" rel="noopener noreferrer">
  //       {row.getValue('arweaveURI')}
  //     </a>
  //   ),
  // },
  // {
  //   accessorKey: 'etherscanURI',
  //   header: 'Etherscan',
  //   cell: ({ row }) => (
  //     <a href={row.getValue('etherscanURI')} target="_blank" rel="noopener noreferrer">
  //       {row.getValue('etherscanURI')}
  //     </a>
  //   ),
  // },
];

export default function TransactionTableComponent({ data, pageSize }: { data: Transaction[]; pageSize?: number }) {
  return <BaseDataViewer data={data} columns={columns} pageSize={pageSize} tableOnly hasSearch={false} />;
}
