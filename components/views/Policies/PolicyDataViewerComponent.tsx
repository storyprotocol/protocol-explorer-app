'use client';
import { ColumnDef } from '@tanstack/react-table';
import BaseDataViewer from '../BaseDataViewer';
import { LicenseTerm } from '@/lib/server/types';
import moment from 'moment';
import PolicyCard from '@/components/cards/PolicyCard';
import JsonView from '@uiw/react-json-view';
import { cleanAndParseJson } from '@/utils';

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
    accessorKey: 'license_template',
    header: 'license_template',
    cell: ({ row }) => {
      const license_template: string = row.getValue('license_template');
      return (
        <div className="capitalize font-mono text-xs underline text-indigo-300 hover:text-indigo-400">
          {license_template}
        </div>
      );
    },
  },

  {
    accessorKey: 'json',
    header: 'json',
    cell: ({ row }) => {
      const json: string = row.getValue('json');
      const parsedJson = cleanAndParseJson(json);
      return (
        <div className="capitalize font-mono text-xs underline text-indigo-300 hover:text-indigo-400">
          <JsonView value={parsedJson} />
        </div>
      );
    },
  },

  {
    accessorKey: 'block_time',
    header: 'block_time',
    cell: ({ row }) => {
      const block_time = row.getValue('block_time');
      return <>{block_time}</>;
    },
  },
  {
    accessorKey: 'block_time',
    header: 'block_time',
    cell: ({ row }) => {
      const block_time = row.getValue('block_time');
      return (
        <div className="capitalize text-xs min-w-[100px] text-center">
          {moment.unix(block_time as number).fromNow()}
        </div>
      );
    },
  },
];

export default function PolicyDataViewerComponent({ data, ...params }: any) {
  return <BaseDataViewer hasSearch={false} cardComponent={PolicyCard} data={data} columns={columns} {...params} />;
}
