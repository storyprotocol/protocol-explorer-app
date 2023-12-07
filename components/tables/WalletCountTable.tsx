'use client';

import React from 'react';
import SortableTable from './SortableTable';
import AddressComponent from '../snippets/AddressComponent';
import { ColumnDef } from '@tanstack/react-table';

const columns: ColumnDef<{ key: string; value: string }>[] = [
  {
    accessorKey: 'address',
    header: 'Address',
    cell: ({ row }) => {
      const address = row.getValue('address');
      return <AddressComponent address={address as string} displayFull />;
    },
  },
  {
    accessorKey: 'count',
    header: 'Transactions',
  },
];

export default function WalletCountTable({ data }: { data: Record<string, number> }) {
  return (
    <>
      <h1>Wallet Leaderboard</h1>
      <SortableTable data={data} columns={columns} />
    </>
  );
}
