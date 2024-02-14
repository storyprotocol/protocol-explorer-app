'use client';
import BaseDataViewer from '../BaseDataViewer';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { shortenAddress } from '@/utils';
import AddressComponent from '@/components/snippets/AddressComponent';
import { Address } from 'viem';
import CollectionCard from '@/components/cards/CollectionCard';

export type Collection = {
  id: Address;
  assetCount: string;
  blockNumber: string;
  blockTimestamp: string;
};

const columns: ColumnDef<Collection>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => (
      <Link href={`/collections/${row.getValue('id')}`} className="capitalize font-mono underline">
        <span className="min-w-[200px] font-mono">{shortenAddress(row.getValue('id'), 4)}</span>
      </Link>
    ),
  },
  {
    accessorKey: 'assetCount',
    header: 'Assets',
    cell: ({ row }) => (
      <Link href={`/collections/${row.getValue('id')}`} className="capitalize underline">
        <span className="min-w-[200px]">{row.getValue('name')}</span>
      </Link>
    ),
  },
  {
    accessorKey: 'blockNumber',
    header: 'Block Number',
    cell: ({ row }) => {
      const address = row.getValue('owner');
      return <AddressComponent address={address as string} />;
    },
  },
  {
    accessorKey: 'blockTimestamp',
    header: 'Block Timestamp',
    cell: ({ row }) => (
      <Link href={`/transactions/${row.getValue('txHash')}`} className="capitalize font-mono underline">
        {shortenAddress(row.getValue('txHash'), 5)}
      </Link>
    ),
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
