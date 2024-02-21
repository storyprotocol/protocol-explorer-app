'use client';
import IPOrgCard from '@/components/cards/IPOrgCard';
import BaseDataViewer from '../BaseDataViewer';
import { ColumnDef } from '@tanstack/react-table';
import { License } from '@story-protocol/core-sdk';
import { shortenAddress } from '@/utils';
import moment from 'moment';
import LicenseCard from '@/components/cards/LicenseCard';

const columns: ColumnDef<License>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <span className="min-w-[120px] font-mono">{shortenAddress(row.getValue('id'), 4)}</span>,
  },

  {
    accessorKey: 'policyId',
    header: 'policyId',
    cell: ({ row }) => <span className="min-w-[150px]">{row.getValue('policyId')}</span>,
  },
  {
    accessorKey: 'licensorIpId',
    header: 'LicensorIpId',
    cell: ({ row }) => <span className="min-w-[150px]">{row.getValue('licensorIpId')}</span>,
  },
  {
    accessorKey: 'transferable',
    header: 'transferable',
    cell: ({ row }) => <span className="min-w-[150px]">{(row.getValue('transferable') as Boolean).toString()}</span>,
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
