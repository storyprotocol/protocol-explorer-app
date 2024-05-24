'use client';

import SuccessBadge from '@/components/badges/SuccessBadge';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import React from 'react';
import BaseDataViewer from '../BaseDataViewer';
import { Validator } from '@/lib/server/types';

const columns: ColumnDef<Validator>[] = [
  {
    accessorKey: 'validatorName',
    header: 'Name',
    cell: ({ row }) => {
        const name: String = row.getValue('validatorName');
        return (
        <Link href={`/stake`} className="capitalize text-xs font-mono underline">
            {name}
        </Link>
        );
    },
  },
  {
    accessorKey: 'validatorStatus',
    header: 'Status',
    cell: ({ row }) => {
        const status: String = row.getValue('validatorStatus');
        return <>{status}</>;
    },
  },

{
    accessorKey: 'votingPower',
    header: 'Voting Power',
    cell: ({ row }) => {
        const votingPower: String = row.getValue('votingPower');
        return <>{votingPower}</>;
    },
  },
  {
    accessorKey: 'commission',
    header: 'Commission',
    cell: ({ row }) => {
        const commission: String = row.getValue('commission');
        return <>{commission}</>;
    },
  },
  {
    accessorKey: 'validatorStake',
    header: 'Stake',
    cell: ({ row }) => {
        const stake: String = row.getValue('validatorStake');
        return <>{stake}</>;
    },
  },
  {
    accessorKey: 'validatorUptime',
    header: 'Uptime',
    cell: ({ row }) => {
        const uptime: String = row.getValue('validatorUptime');
        return <>{uptime}</>;
    },
  }
];

export default function ValidatorTableComponent({ data, pageSize }: { data: Validator[]; pageSize?: number }) {
  return <BaseDataViewer data={data} columns={columns} pageSize={pageSize} tableOnly hasSearch={false} />;
}
