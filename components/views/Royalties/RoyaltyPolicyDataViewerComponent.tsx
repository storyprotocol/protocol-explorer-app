'use client';
import { ColumnDef } from '@tanstack/react-table';
import BaseDataViewer from '../BaseDataViewer';
import { RoyaltyPolicy } from '@/lib/server/types';
import moment from 'moment';

const columns: ColumnDef<RoyaltyPolicy>[] = [
  {
    accessorKey: 'id',
    header: 'id',
    cell: ({ row }) => {
      const id: string = row.getValue('id');
      return <div className="capitalize font-mono text-xs underline text-indigo-300 hover:text-indigo-400">{id}</div>;
    },
  },
  {
    accessorKey: 'ancestorsVault',
    header: 'ancestorsVault',
    cell: ({ row }) => {
      const ancestorsVault: string = row.getValue('ancestorsVault');
      return (
        <div className="capitalize font-mono text-xs underline text-indigo-300 hover:text-indigo-400">
          {ancestorsVault}
        </div>
      );
    },
  },
  {
    accessorKey: 'splitClone',
    header: 'splitClone',
    cell: ({ row }) => {
      const splitClone: string = row.getValue('splitClone');
      return (
        <div className="capitalize font-mono text-xs underline text-indigo-300 hover:text-indigo-400">{splitClone}</div>
      );
    },
  },
  {
    accessorKey: 'royaltyStack',
    header: 'royaltyStack',
    cell: ({ row }) => {
      const royaltyStack: string = row.getValue('royaltyStack');
      return (
        <div className="capitalize font-mono text-xs underline text-indigo-300 hover:text-indigo-400">
          {royaltyStack}
        </div>
      );
    },
  },
  {
    accessorKey: 'targetAncestors',
    header: 'targetAncestors',
    cell: ({ row }) => {
      const targetAncestors: string = row.getValue('targetAncestors');
      return (
        <div className="capitalize font-mono text-xs underline text-indigo-300 hover:text-indigo-400">
          {JSON.stringify(targetAncestors)}
        </div>
      );
    },
  },
  {
    accessorKey: 'targetRoyaltyAmount',
    header: 'targetRoyaltyAmount',
    cell: ({ row }) => {
      const targetRoyaltyAmount: string = row.getValue('targetRoyaltyAmount');
      return (
        <div className="capitalize font-mono text-xs underline text-indigo-300 hover:text-indigo-400">
          {JSON.stringify(targetRoyaltyAmount)}
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

export default function RoyaltyPolicyDataViewerComponent({ data, ...params }: any) {
  return <BaseDataViewer hasSearch={false} data={data} columns={columns} tableOnly {...params} />;
}
