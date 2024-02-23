'use client';
import { ColumnDef } from '@tanstack/react-table';
import BaseDataViewer from '../BaseDataViewer';
import Link from 'next/link';
import AddressComponent from '@/components/address/AddressComponent';
import { Dispute } from '@/lib/server/types';
import moment from 'moment';

const columns: ColumnDef<Dispute>[] = [
  {
    accessorKey: 'id',
    header: 'id',
    cell: ({ row }) => {
      const id: string = row.getValue('id');
      return <div className="capitalize font-mono text-xs">{id}</div>;
    },
  },
  {
    accessorKey: 'targetIpId',
    header: 'targetIpId',
    cell: ({ row }) => {
      const targetIpId: string = row.getValue('targetIpId');
      return (
        <Link
          href={`/ipa/${targetIpId}`}
          className="capitalize font-mono text-xs underline text-indigo-300 hover:text-indigo-400"
        >
          {targetIpId}
        </Link>
      );
    },
  },
  {
    accessorKey: 'targetTag',
    header: 'targetTag',
    cell: ({ row }) => {
      const targetTag: string = row.getValue('targetTag');
      return <div className="capitalize font-mono text-xs">{targetTag}</div>;
    },
  },
  {
    accessorKey: 'currentTag',
    header: 'currentTag',
    cell: ({ row }) => {
      const currentTag: string = row.getValue('currentTag');
      return <div className="capitalize font-mono text-xs">{currentTag}</div>;
    },
  },
  {
    accessorKey: 'arbitrationPolicy',
    header: 'arbitrationPolicy',
    cell: ({ row }) => {
      const arbitrationPolicy: string = row.getValue('arbitrationPolicy');
      return <div className="capitalize font-mono text-xs">{arbitrationPolicy}</div>;
    },
  },
  {
    accessorKey: 'evidenceLink',
    header: 'evidenceLink',
    cell: ({ row }) => {
      const evidenceLink: string = row.getValue('evidenceLink');
      return <div className="capitalize font-mono text-xs">{evidenceLink}</div>;
    },
  },
  {
    accessorKey: 'initiator',
    header: 'initiator',
    cell: ({ row }) => {
      const initiator: string = row.getValue('initiator');
      return (
        // <div className="capitalize font-mono text-xs underline text-indigo-300 hover:text-indigo-400">
        <AddressComponent address={initiator} size="sm" />
        // </div>
      );
    },
  },
  {
    accessorKey: 'data',
    header: 'data',
    cell: ({ row }) => {
      const data: string = row.getValue('data');
      return <div className="capitalize font-mono text-xs">{data}</div>;
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
