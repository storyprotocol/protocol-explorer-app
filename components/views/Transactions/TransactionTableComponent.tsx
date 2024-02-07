'use client';

import SuccessBadge from '@/components/badges/SuccessBadge';
import { shortenAddress, shortenString } from '@/utils';
import { Transaction } from '@story-protocol/core-sdk';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import React from 'react';
import moment from 'moment';
import BaseDataViewer from '../BaseDataViewer';
import AddressComponent from '@/components/snippets/AddressComponent';

const columns: ColumnDef<Transaction>[] = [
  // Update columns to match Transaction type
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected()}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: 'txHash',
    header: 'TxHash',
    cell: ({ row }) => (
      <Link href={`/transactions/${row.original.id}`} className="capitalize text-xs font-mono underline">
        {shortenString(row.original.txHash, 20)}
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
    header: 'Resource Type',
    cell: ({ row }) => {
      const type: Transaction = row.getValue('resourceType');
      return <>{type}</>;
    },
  },
  // {
  //   accessorKey: 'type',
  //   header: 'Type',
  //   cell: ({ row }) => {
  //     const type: Transaction = row.getValue('type');
  //     return (
  //       <>
  //         <AssetBadge type={1} />
  //       </>
  //     );
  //   },
  // },
  {
    accessorKey: 'ipOrgId',
    header: 'IP Org ID',
    cell: ({ row }) => (
      <Link href={`/collections/${row.original.ipOrgId}`}>
        <div className="text-xs text-left font-mono text-indigo-400 hover:underline">{row.getValue('ipOrgId')}</div>
      </Link>
    ),
  },
  {
    accessorKey: 'resourceId',
    header: 'Resource ID',
    cell: ({ row }) => (
      <div className="text-xs text-left font-mono">{shortenAddress(row.getValue('resourceId'), 5)}</div>
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
    cell: ({ row }) => <div className="capitalize">{moment(row.getValue('createdAt')).fromNow()}</div>,
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
  return <BaseDataViewer data={data} columns={columns} pageSize={pageSize} tableOnly />;
}
