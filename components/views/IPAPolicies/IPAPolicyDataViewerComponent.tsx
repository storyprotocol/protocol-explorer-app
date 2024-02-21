'use client';
import { ColumnDef } from '@tanstack/react-table';
import BaseDataViewer from '../BaseDataViewer';
import Link from 'next/link';
import AddressComponent from '@/components/snippets/AddressComponent';
import { IPAPolicy, Policy } from '@/lib/server/types';
import { Address } from 'viem';
import moment from 'moment';

const columns: ColumnDef<IPAPolicy>[] = [
  {
    accessorKey: 'id',
    header: 'id',
    cell: ({ row }) => {
      const id: string = row.getValue('id');
      return <div className="capitalize font-mono text-xs underline text-indigo-300 hover:text-indigo-400">{id}</div>;
    },
  },
  {
    accessorKey: 'ipId',
    header: 'ipId',
    cell: ({ row }) => {
      const ipId: string = row.getValue('ipId');
      return <div className="capitalize font-mono text-xs underline text-indigo-300 hover:text-indigo-400">{ipId}</div>;
    },
  },

  {
    accessorKey: 'policyId',
    header: 'policyId',
    cell: ({ row }) => {
      const policyId: string = row.getValue('policyId');
      return (
        <div className="capitalize font-mono text-xs underline text-indigo-300 hover:text-indigo-400">{policyId}</div>
      );
    },
  },

  {
    accessorKey: 'index',
    header: 'index',
    cell: ({ row }) => {
      const index: string = row.getValue('index');
      return (
        <div className="capitalize font-mono text-xs underline text-indigo-300 hover:text-indigo-400">{index}</div>
      );
    },
  },
  {
    accessorKey: 'active',
    header: 'active',
    cell: ({ row }) => {
      const active: string = row.getValue('active');
      return (
        <div className="capitalize font-mono text-xs underline text-indigo-300 hover:text-indigo-400">{active}</div>
      );
    },
  },
  {
    accessorKey: 'inherited',
    header: 'inherited',
    cell: ({ row }) => {
      const inherited: string = row.getValue('inherited');
      return (
        <div className="capitalize font-mono text-xs underline text-indigo-300 hover:text-indigo-400">{inherited}</div>
      );
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

export default function IPAPolicyDataViewerComponent({ data, ...params }: any) {
  return <BaseDataViewer hasSearch={false} data={data} columns={columns} tableOnly {...params} />;
}
