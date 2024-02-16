'use client';
import { ColumnDef } from '@tanstack/react-table';
import BaseDataViewer from '../BaseDataViewer';
import Link from 'next/link';
import AddressComponent from '@/components/snippets/AddressComponent';
import { Policy } from '@/lib/server/types';
import { Address } from 'viem';
import moment from 'moment';

const columns: ColumnDef<Policy>[] = [
  {
    accessorKey: 'id',
    header: 'id',
    cell: ({ row }) => {
      const id: string = row.getValue('id');
      return <div className="capitalize font-mono text-xs underline text-indigo-300 hover:text-indigo-400">{id}</div>;
    },
  },

  {
    accessorKey: 'policyFrameworkManager',
    header: 'policyFrameworkManager',
    cell: ({ row }) => {
      const policyFrameworkManager: string = row.getValue('policyFrameworkManager');
      return (
        <div className="capitalize font-mono text-xs underline text-indigo-300 hover:text-indigo-400">
          {policyFrameworkManager}
        </div>
      );
    },
  },

  {
    accessorKey: 'uml',
    header: 'uml',
    cell: ({ row }) => {
      const uml: string = row.getValue('uml');
      return (
        <div className="capitalize font-mono text-xs underline text-indigo-300 hover:text-indigo-400">
          {JSON.stringify(uml)}
        </div>
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

export default function PolicyDataViewerComponent({ data, ...params }: any) {
  return <BaseDataViewer hasSearch={false} data={data} columns={columns} tableOnly {...params} />;
}
