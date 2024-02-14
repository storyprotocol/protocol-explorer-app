'use client';
import { ColumnDef } from '@tanstack/react-table';
import BaseDataViewer from '../BaseDataViewer';
import AssetCard from '@/components/cards/AssetCard';
import Link from 'next/link';
import AddressComponent from '@/components/snippets/AddressComponent';
// import { shortenString } from '@/utils';
// import { ExternalLinkIcon } from 'lucide-react';
import { Asset } from '@/lib/server/types';
import { Address } from 'viem';
import moment from 'moment';

const columns: ColumnDef<Asset>[] = [
  {
    accessorKey: 'id',
    header: 'IP ID',
    cell: ({ row }) => {
      const id: string = row.getValue('id');
      return (
        <Link
          href={`/ipa/${id}`}
          className="capitalize font-mono text-xs underline text-indigo-300 hover:text-indigo-400"
        >
          {id}
        </Link>
      );
    },
  },
  {
    accessorKey: 'metadata',
    header: 'Name',
    cell: ({ row }) => {
      const metadata: any = row.getValue('metadata');
      return <>{metadata.name}</>;
    },
  },
  {
    accessorKey: 'rootIpIds',
    header: 'rootIpIds',
    cell: ({ row }) => {
      const rootIpIds: Address[] = row.getValue('rootIpIds');
      return (
        <Link
          href={`/collections/${rootIpIds[0]}`}
          className="capitalize font-mono text-xs underline text-indigo-300 hover:text-indigo-400"
        >
          {rootIpIds[0]}
        </Link>
      );
    },
  },
  {
    accessorKey: 'tokenContract',
    header: 'tokenContract',
    cell: ({ row }) => {
      const address = row.getValue('tokenContract');
      return <AddressComponent address={address as string} size="sm" />;
    },
  },
  {
    accessorKey: 'tokenId',
    header: 'tokenId',
    cell: ({ row }) => {
      const tokenId = row.getValue('tokenId');
      return <>{tokenId}</>;
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

export default function AssetDataViewerComponent({ data }: any) {
  return <BaseDataViewer data={data} columns={columns} cardComponent={AssetCard} />;
}
