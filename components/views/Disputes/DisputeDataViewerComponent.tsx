'use client';
import { ColumnDef } from '@tanstack/react-table';
import BaseDataViewer from '../BaseDataViewer';
import Link from 'next/link';
import AddressComponent from '@/components/snippets/AddressComponent';
import { Dispute, Royalty } from '@/lib/server/types';
import { Address } from 'viem';
import moment from 'moment';

// id: string;
//     targetIpId: Address;
//     targetTag: Address;
//     currentTag: Address;
//     arbitrationPolicy: Address;
//     evidenceLink: string;
//     initiator: Address;
//     data: string;
//     blockNumber: string;
//     blockTimestamp: string;
// }

const columns: ColumnDef<Dispute>[] = [
  {
    accessorKey: 'id',
    header: 'id',
    cell: ({ row }) => {
      const id: string = row.getValue('id');
      return <div className="capitalize font-mono text-xs underline text-indigo-300 hover:text-indigo-400">{id}</div>;
    },
  },
  {
    accessorKey: 'targetIpId',
    header: 'targetIpId',
    cell: ({ row }) => {
      const targetIpId: string = row.getValue('targetIpId');
      return (
        <div className="capitalize font-mono text-xs underline text-indigo-300 hover:text-indigo-400">{targetIpId}</div>
      );
    },
  },
  {
    accessorKey: 'targetTag',
    header: 'targetTag',
    cell: ({ row }) => {
      const targetTag: string = row.getValue('targetTag');
      return (
        <div className="capitalize font-mono text-xs underline text-indigo-300 hover:text-indigo-400">{targetTag}</div>
      );
    },
  },
  {
    accessorKey: 'currentTag',
    header: 'currentTag',
    cell: ({ row }) => {
      const currentTag: string = row.getValue('currentTag');
      return (
        <div className="capitalize font-mono text-xs underline text-indigo-300 hover:text-indigo-400">{currentTag}</div>
      );
    },
  },
  {
    accessorKey: 'arbitrationPolicy',
    header: 'arbitrationPolicy',
    cell: ({ row }) => {
      const arbitrationPolicy: string = row.getValue('arbitrationPolicy');
      return (
        <div className="capitalize font-mono text-xs underline text-indigo-300 hover:text-indigo-400">
          {arbitrationPolicy}
        </div>
      );
    },
  },
  {
    accessorKey: 'evidenceLink',
    header: 'evidenceLink',
    cell: ({ row }) => {
      const evidenceLink: string = row.getValue('evidenceLink');
      return (
        <div className="capitalize font-mono text-xs underline text-indigo-300 hover:text-indigo-400">
          {evidenceLink}
        </div>
      );
    },
  },
  {
    accessorKey: 'initiator',
    header: 'initiator',
    cell: ({ row }) => {
      const initiator: string = row.getValue('initiator');
      return (
        <div className="capitalize font-mono text-xs underline text-indigo-300 hover:text-indigo-400">{initiator}</div>
      );
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

export default function DisputeDataViewerComponent({ data, ...params }: any) {
  return <BaseDataViewer hasSearch={false} data={data} columns={columns} tableOnly {...params} />;
}
