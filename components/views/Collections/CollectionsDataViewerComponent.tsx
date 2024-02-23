'use client';
import BaseDataViewer from '../BaseDataViewer';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import CollectionCard from '@/components/cards/CollectionCard';
import { Collection } from '@/lib/server/types';
import moment from 'moment';
import { calculateTotalDisputes } from '@/utils';

const columns: ColumnDef<Collection>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => (
      <Link href={`/collections/${row.getValue('id')}`} className="capitalize font-mono underline">
        <span className="min-w-[200px] font-mono">{row.getValue('id')}</span>
      </Link>
    ),
  },
  {
    accessorKey: 'assetCount',
    header: 'assetCount',
    cell: ({ row }) => {
      const assetCount: string = row.getValue('assetCount');
      return <div className="capitalize font-mono text-xs">{assetCount}</div>;
    },
  },
  {
    accessorKey: 'licensesCount',
    header: 'licensesCount',
    cell: ({ row }) => {
      const licensesCount: string = row.getValue('licensesCount');
      return <div className="capitalize font-mono text-xs ">{licensesCount}</div>;
    },
  },
  {
    header: 'disputeCount',
    cell: ({ row }) => {
      const data = row.original;
      return <div className="capitalize font-mono text-xs ">{calculateTotalDisputes(row.original)}</div>;
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

export default function CollectionsDataViewerComponent({
  data,
  tableOnly,
  gridOnly,
  pageSize,
}: {
  data: any;
  tableOnly?: boolean;
  gridOnly?: boolean;
  pageSize?: number;
}) {
  return (
    <>
      <BaseDataViewer
        hasSearch={false}
        data={data}
        columns={columns}
        tableOnly={tableOnly}
        gridOnly={gridOnly}
        pageSize={pageSize}
        cardComponent={CollectionCard}
      />
    </>
  );
}
