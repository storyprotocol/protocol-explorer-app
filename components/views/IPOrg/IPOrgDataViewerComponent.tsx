'use client';
import IPOrgCard from '@/components/cards/IPOrgCard';
import BaseDataViewer from '../BaseDataViewer';
import { ColumnDef } from '@tanstack/react-table';
import { IPOrg } from '@story-protocol/core-sdk';
import Link from 'next/link';
import { shortenAddress } from '@/utils';
import AddressComponent from '@/components/snippets/AddressComponent';

const columns: ColumnDef<IPOrg>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => (
      <Link href={`/ipo/${row.getValue('id')}`} className="capitalize font-mono underline">
        <span className="min-w-[200px] font-mono">{shortenAddress(row.getValue('id'), 4)}</span>
      </Link>
    ),
  },
  {
    accessorKey: 'name',
    header: 'IP Org Name',
    cell: ({ row }) => (
      <Link href={`/ipo/${row.getValue('id')}`} className="capitalize underline">
        <span className="min-w-[200px]">{row.getValue('name')}</span>
      </Link>
    ),
  },
  {
    accessorKey: 'owner',
    header: 'Owner',
    cell: ({ row }) => {
      const address = row.getValue('owner');
      return <AddressComponent address={address as string} />;
    },
  },
  {
    accessorKey: 'txHash',
    header: 'Transaction Hash',
    cell: ({ row }) => (
      <Link href={`/transactions/${row.getValue('txHash')}`} className="capitalize font-mono underline">
        {shortenAddress(row.getValue('txHash'), 5)}
      </Link>
    ),
  },
];

export default function IPOrgDataViewerComponent({
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
    <BaseDataViewer
      data={data}
      columns={columns}
      tableOnly={tableOnly}
      gridOnly={gridOnly}
      pageSize={pageSize}
      cardComponent={IPOrgCard}
    />
  );
}
