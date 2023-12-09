'use client';
import IPOrgCard from '@/components/cards/IPOrgCard';
import BaseDataViewer from '../BaseDataViewer';
import { ColumnDef } from '@tanstack/react-table';
import { IPOrg } from '@story-protocol/core-sdk';
import Link from 'next/link';
import { shortenAddress } from '@/utils';
import AddressComponent from '@/components/snippets/AddressComponent';
import { License } from '@story-protocol/core-sdk';
// Create
// id: number;
//     isCommercial: boolean;
//     status: number;
//     licensor: string;
//     revoker: string;
//     ipOrgId: string;
//     licenseeType: number;
//     ipAssetId: string;
//     parentLicenseId: string;
//     termIds: string[];
//     termsData: string[];
//     createdAt: string;
//     txHash: string;

const columns: ColumnDef<IPOrg>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <span className="min-w-[120px] font-mono">{shortenAddress(row.getValue('id'), 4)}</span>,
  },

  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <span className="min-w-[150px]">{row.getValue('status')}</span>,
  },
  {
    accessorKey: 'licensor',
    header: 'Licensor',
    cell: ({ row }) => <span className="min-w-[150px]">{shortenAddress(row.getValue('licensor'), 4)}</span>,
  },
  {
    accessorKey: 'revoker',
    header: 'Revoker',
    cell: ({ row }) => <span className="min-w-[150px]">{shortenAddress(row.getValue('revoker'), 4)}</span>,
  },
  {
    accessorKey: 'ipOrgId',
    header: 'IP Org ID',
    cell: ({ row }) => <span className="min-w-[150px]">{shortenAddress(row.getValue('ipOrgId'), 4)}</span>,
  },
  {
    accessorKey: 'licenseeType',
    header: 'Licensee Type',
    cell: ({ row }) => <span className="min-w-[150px]">{row.getValue('licenseeType') ?? 'N/A'}</span>,
  },
  {
    accessorKey: 'ipAssetId',
    header: 'IPAsset ID',
    cell: ({ row }) => <span className="min-w-[200px]">{row.getValue('ipAssetId')}</span>,
  },
  {
    accessorKey: 'parentLicenseId',
    header: 'Parent License ID',
    cell: ({ row }) => <span className="min-w-[200px]">{row.getValue('parentLicenseId')}</span>,
  },
  {
    accessorKey: 'ipOrgId',
    header: 'IP Org ID',
    cell: ({ row }) => <span className="min-w-[150px]">{row.getValue('ipOrgId')}</span>,
  },
  // {
  //   accessorKey: 'termsData',
  //   header: 'termsData',
  //   cell: ({ row }) => <span className="min-w-[150px]">{row.getValue('termsData')}</span>,
  // },
  {
    accessorKey: 'createdAt',
    header: 'createdAt',
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'));
      const formattedDate = date.toLocaleDateString('en-US', {
        year: '2-digit',
        month: 'short',
        day: 'numeric',
      });
      const formattedTime = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short',
      });
      return <span className="min-w-[150px]">{`${formattedDate}, ${formattedTime}`}</span>;
    },
  },
  {
    accessorKey: 'txHash',
    header: 'Tx Hash',
    cell: ({ row }) => <span className="min-w-[150px]">{shortenAddress(row.getValue('txHash'), 3)}</span>,
  },
];

export default function IPOrgLicenseDataViewerComponent({
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
