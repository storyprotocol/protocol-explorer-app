'use client';
import { ColumnDef } from '@tanstack/react-table';
import BaseDataViewer from '../BaseDataViewer';
import { Permission } from '@/lib/server/types';
import moment from 'moment';
import AddressComponent from '@/components/address/AddressComponent';

const columns: ColumnDef<Permission>[] = [
  {
    accessorKey: 'id',
    header: 'id',
    cell: ({ row }) => {
      const id: string = row.getValue('id');
      return <div className="capitalize font-mono text-xs">{id}</div>;
    },
  },
  {
    accessorKey: 'signer',
    header: 'signer',
    cell: ({ row }) => {
      const signer: string = row.getValue('signer');
      return (
        // <div className="capitalize font-mono text-xs underline text-indigo-300 hover:text-indigo-400">
        <AddressComponent address={signer} size="sm"></AddressComponent>
        // </div>
      );
    },
  },
  {
    accessorKey: 'permission',
    header: 'permission',
    cell: ({ row }) => {
      const permission: string = row.getValue('permission');
      return (
        <div className="font-mono text-xs">
          {permission ? <span className="text-indigo-500">{permission}</span> : '*'}
        </div>
      );
    },
  },

  {
    accessorKey: 'to',
    header: 'to',
    cell: ({ row }) => {
      const to: string = row.getValue('to');
      return <div className="capitalize font-mono text-xs">{to}</div>;
    },
  },
  {
    accessorKey: 'func',
    header: 'func',
    cell: ({ row }) => {
      const func: string = row.getValue('func');
      return <div className="capitalize font-mono text-xs ">{func}</div>;
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
