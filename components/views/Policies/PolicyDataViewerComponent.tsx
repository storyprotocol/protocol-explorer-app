'use client';
import { ColumnDef } from '@tanstack/react-table';
import BaseDataViewer from '../BaseDataViewer';
import { LicenseTerm } from '@/lib/server/types';
import moment from 'moment';
import PolicyCard from '@/components/cards/PolicyCard';

const columns: ColumnDef<LicenseTerm>[] = [
  {
    accessorKey: 'id',
    header: 'id',
    cell: ({ row }) => {
      const id: string = row.getValue('id');
      return <div className="capitalize font-mono text-xs underline text-indigo-300 hover:text-indigo-400">{id}</div>;
    },
  },

  {
    accessorKey: 'licenseTemplate',
    header: 'licenseTemplate',
    cell: ({ row }) => {
      const licenseTemplate: string = row.getValue('licenseTemplate');
      return (
        <div className="capitalize font-mono text-xs underline text-indigo-300 hover:text-indigo-400">
          {licenseTemplate}
        </div>
      );
    },
  },

  {
    accessorKey: 'licenseTermsId',
    header: 'licenseTermsId',
    cell: ({ row }) => {
      const licenseTermsId: string = row.getValue('licenseTermsId');
      return (
        <div className="capitalize font-mono text-xs underline text-indigo-300 hover:text-indigo-400">
          {licenseTermsId}
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
    accessorKey: 'blockTime',
    header: 'blockTime',
    cell: ({ row }) => {
      const blockTime = row.getValue('blockTime');
      return (
        <div className="capitalize text-xs min-w-[100px] text-center">{moment.unix(blockTime as number).fromNow()}</div>
      );
    },
  },
];

export default function PolicyDataViewerComponent({ data, ...params }: any) {
  return <BaseDataViewer hasSearch={false} cardComponent={PolicyCard} data={data} columns={columns} {...params} />;
}
