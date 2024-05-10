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
    accessorKey: 'licenseTermsId',
    header: 'licenseTermsId',
    cell: ({ row }) => <span className="min-w-[150px]">{row.getValue('licenseTermsId')}</span>,
  },
  {
    accessorKey: 'licensorIpId',
    header: 'licensorIpId',
    cell: ({ row }) => <span className="min-w-[150px]">{row.getValue('licensorIpId')}</span>,
  },
  {
    accessorKey: 'licenseTemplate',
    header: 'licenseTemplate',
    cell: ({ row }) => <span className="min-w-[150px]">{row.getValue('licenseTemplate')}</span>,
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
    accessorKey: 'mintedAt',
    header: 'mintedAt',
    cell: ({ row }) => {
      const mintedAt = row.getValue('mintedAt');
      return <div className="capitalize text-xs min-w-[100px] text-center">{mintedAt as string}</div>;
    },
  },

  {
    accessorKey: 'expiresAt',
    header: 'expiresAt',
    cell: ({ row }) => {
      const expiresAt = row.getValue('expiresAt');
      return <div className="capitalize text-xs min-w-[100px] text-center">{expiresAt as string}</div>;
    },
  },

  {
    accessorKey: 'burntAt',
    header: 'burntAt',
    cell: ({ row }) => {
      const burntAt = row.getValue('burntAt');
      return <div className="capitalize text-xs min-w-[100px] text-center">{burntAt as string}</div>;
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
      return <div className="capitalize text-xs min-w-[100px] text-center">{blockTime as string}</div>;
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
