'use client';
import { ColumnDef } from '@tanstack/react-table';
import BaseDataViewer from '../BaseDataViewer';
import Link from 'next/link';
import AddressComponent from '@/components/snippets/AddressComponent';
import { Dispute, Permission, Royalty } from '@/lib/server/types';
import { Address } from 'viem';
import moment from 'moment';

const columns: ColumnDef<Permission>[] = [
  {
    accessorKey: 'id',
    header: 'id',
    cell: ({ row }) => {
      const id: string = row.getValue('id');
      return <div className="capitalize font-mono text-xs underline text-indigo-300 hover:text-indigo-400">{id}</div>;
    },
  },
  {
    accessorKey: 'permission',
    header: 'permission',
    cell: ({ row }) => {
      const permission: string = row.getValue('permission');
      return (
        <div className="capitalize font-mono text-xs underline text-indigo-300 hover:text-indigo-400">{permission}</div>
      );
    },
  },
  {
    accessorKey: 'signer',
    header: 'signer',
    cell: ({ row }) => {
      const signer: string = row.getValue('signer');
      return (
        <div className="capitalize font-mono text-xs underline text-indigo-300 hover:text-indigo-400">{signer}</div>
      );
    },
  },
  {
    accessorKey: 'to',
    header: 'to',
    cell: ({ row }) => {
      const to: string = row.getValue('to');
      return <div className="capitalize font-mono text-xs underline text-indigo-300 hover:text-indigo-400">{to}</div>;
    },
  },
  {
    accessorKey: 'func',
    header: 'func',
    cell: ({ row }) => {
      const func: string = row.getValue('func');
      return <div className="capitalize font-mono text-xs underline text-indigo-300 hover:text-indigo-400">{func}</div>;
    },
  },

  {
    accessorKey: 'blockNumber',
    header: 'blockNumber',
    cell: ({ row }) => {
      const blockNumber = row.getValue('blockNumber');
      return <>{blockNumber}</>;
    },
  },
  {
    accessorKey: 'blockTimestamp',
    header: 'blockTimestamp',
    cell: ({ row }) => {
      const blockTimestamp = row.getValue('blockTimestamp');
      return (
        <div className="capitalize text-xs min-w-[100px] text-center">
          {moment.unix(blockTimestamp as number).fromNow()}
        </div>
      );
    },
  },
];

export default function PermissionDataViewerComponent({ data, ...params }: any) {
  return <BaseDataViewer hasSearch={false} data={data} columns={columns} tableOnly {...params} />;
}
