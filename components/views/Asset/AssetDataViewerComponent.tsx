'use client';
import { ColumnDef } from '@tanstack/react-table';
import BaseDataViewer from '../BaseDataViewer';
import { IPAsset, IPAssetType } from '@story-protocol/core-sdk';
import AssetCard from '@/components/cards/AssetCard';
import Link from 'next/link';
import AddressComponent from '@/components/snippets/AddressComponent';
import { shortenString } from '@/utils';
import { ExternalLinkIcon } from 'lucide-react';

const columns: ColumnDef<IPAsset>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => {
      const id: string = row.getValue('id');
      return (
        <Link
          href={`/ipa/${row.getValue('ipOrgId')}/${id}`}
          className="capitalize font-mono text-xs underline text-indigo-300 hover:text-indigo-400"
        >
          {id}
        </Link>
      );
    },
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const id: string = row.getValue('id');
      const name: string = row.getValue('name');
      return (
        <Link href={`/ipa/${row.getValue('ipOrgId')}/${id}`} className="capitalize">
          {name}
        </Link>
      );
    },
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const type: IPAssetType = row.getValue('type');
      return <>{type.value}</>;
    },
  },
  {
    accessorKey: 'ipOrgId',
    header: 'IP Org ID',
    cell: ({ row }) => (
      <Link
        href={`/ipo/${row.getValue('ipOrgId')}`}
        className="capitalize font-mono text-xs underline text-indigo-300 hover:text-indigo-400"
      >
        {row.getValue('ipOrgId')}
      </Link>
    ),
  },
  {
    accessorKey: 'txHash',
    header: 'TxHash',
    cell: ({ row }) => (
      <Link href={`/transactions/${row.getValue('txHash')}`} className="capitalize font-mono text-xs underline">
        {shortenString(row.getValue('txHash'), 20)}
      </Link>
    ),
  },

  {
    accessorKey: 'owner',
    header: 'Owner',
    cell: ({ row }) => {
      const address = row.getValue('owner');
      return <AddressComponent address={address as string} size="sm" />;
    },
  },
  {
    accessorKey: 'contentHash',
    header: 'Content Hash',
    cell: ({ row }) => {
      const uri: string = row.getValue('contentHash');

      if (!uri) return <></>;

      return (
        <Link href={uri}>
          <ExternalLinkIcon className="w-5 h-5" />
        </Link>
      );
    },
  },
];

export default function AssetDataViewerComponent({ data }: any) {
  return <BaseDataViewer data={data} columns={columns} cardComponent={AssetCard} />;
}
