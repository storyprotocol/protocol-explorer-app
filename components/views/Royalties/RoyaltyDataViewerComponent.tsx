'use client';
import { ColumnDef } from '@tanstack/react-table';
import BaseDataViewer from '../BaseDataViewer';
import { Royalty } from '@/lib/server/types';
import moment from 'moment';

// id: string;
// ipId: Address;
// data: string;
// royaltyPolicy: Address;
// blockNumber: string;
// blockTimestamp: string;
// }
const columns: ColumnDef<Royalty>[] = [
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
    accessorKey: 'data',
    header: 'data',
    cell: ({ row }) => {
      const data: string = row.getValue('data');
      return <div className="capitalize font-mono text-xs underline text-indigo-300 hover:text-indigo-400">{data}</div>;
    },
  },
  {
    accessorKey: 'royaltyPolicy',
    header: 'royaltyPolicy',
    cell: ({ row }) => {
      const royaltyPolicy: string = row.getValue('royaltyPolicy');
      return (
        <div className="capitalize font-mono text-xs underline text-indigo-300 hover:text-indigo-400">
          {royaltyPolicy}
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

export default function RoyaltyDataViewerComponent({ data, ...params }: any) {
  return <BaseDataViewer hasSearch={false} data={data} columns={columns} tableOnly {...params} />;
}
