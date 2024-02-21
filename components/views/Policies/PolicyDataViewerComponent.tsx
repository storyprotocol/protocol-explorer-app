'use client';
import { ColumnDef } from '@tanstack/react-table';
import BaseDataViewer from '../BaseDataViewer';
import { Policy } from '@/lib/server/types';
import moment from 'moment';
import PolicyCard from '@/components/cards/PolicyCard';

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
    accessorKey: 'pil',
    header: 'pil',
    cell: ({ row }) => {
      const pil: string = row.getValue('pil');
      return (
        <div className="capitalize font-mono text-xs underline text-indigo-300 hover:text-indigo-400">
          {JSON.stringify(pil)}
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
  return <BaseDataViewer hasSearch={false} cardComponent={PolicyCard} data={data} columns={columns} {...params} />;
}
