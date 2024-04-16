'use client';

import BaseDataViewer from '../BaseDataViewer';
import { ColumnDef } from '@tanstack/react-table';
import { shortenAddress } from '@/utils';
import LicenseCard from '@/components/cards/LicenseCard';
import { LicenseToken } from '@/lib/server/types';
import AddressComponent from '@/components/address/AddressComponent';

const columns: ColumnDef<LicenseToken>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <span className="min-w-[120px] font-mono">{shortenAddress(row.getValue('id'), 4)}</span>,
  },

  {
    accessorKey: 'license_terms_id',
    header: 'license_terms_id',
    cell: ({ row }) => <span className="min-w-[150px]">{row.getValue('license_terms_id')}</span>,
  },
  {
    accessorKey: 'licensor_ip_id',
    header: 'licensor_ip_id',
    cell: ({ row }) => <span className="min-w-[150px]">{row.getValue('licensor_ip_id')}</span>,
  },
  {
    accessorKey: 'license_template',
    header: 'license_template',
    cell: ({ row }) => <span className="min-w-[150px]">{row.getValue('license_template')}</span>,
  },
  {
    accessorKey: 'transferable',
    header: 'transferable',
    cell: ({ row }) => <span className="min-w-[150px]">{(row.getValue('transferable') as Boolean).toString()}</span>,
  },

  {
    accessorKey: 'owner',
    header: 'owner',
    cell: ({ row }) => <AddressComponent address={row.getValue('owner')} />,
  },

  {
    accessorKey: 'minted_at',
    header: 'minted_at',
    cell: ({ row }) => {
      const minted_at = row.getValue('minted_at');
      return <div className="capitalize text-xs min-w-[100px] text-center">{minted_at as string}</div>;
    },
  },

  {
    accessorKey: 'expires_at',
    header: 'expires_at',
    cell: ({ row }) => {
      const expires_at = row.getValue('expires_at');
      return <div className="capitalize text-xs min-w-[100px] text-center">{expires_at as string}</div>;
    },
  },

  {
    accessorKey: 'burnt_at',
    header: 'burnt_at',
    cell: ({ row }) => {
      const burnt_at = row.getValue('burnt_at');
      return <div className="capitalize text-xs min-w-[100px] text-center">{burnt_at as string}</div>;
    },
  },

  {
    accessorKey: 'block_number',
    header: 'block_number',
    cell: ({ row }) => {
      const block_number = row.getValue('block_number');
      return <>{block_number}</>;
    },
  },
  {
    accessorKey: 'block_time',
    header: 'block_time',
    cell: ({ row }) => {
      const block_time = row.getValue('block_time');
      return <div className="capitalize text-xs min-w-[100px] text-center">{block_time as string}</div>;
    },
  },
];

export default function LicenseDataViewerComponent({
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
      hasSearch={false}
      columns={columns}
      tableOnly={tableOnly}
      gridOnly={gridOnly}
      pageSize={pageSize}
      cardComponent={LicenseCard}
    />
  );
}
