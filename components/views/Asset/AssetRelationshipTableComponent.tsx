'use client';

import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import BaseDataViewer from '../BaseDataViewer';
import { Badge } from '@/components/ui/badge';
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from 'react-icons/bs';

export type Relationship = {
  id: string;
  type: string; // i.e. "APPEARS_IN"
  typeId: string;
  srcContract: string;
  srcTokenId: string;
  srcName?: string;
  dstContract: string;
  dstTokenId: string;
  dstName?: string;
  ttl?: number; // based in seconds
  registeredAt: string; // ISO 8601
  txHash: string;
};

// eslint-disable-next-line no-unused-vars
const columns: (ipAssetId: string | undefined) => ColumnDef<any>[] = (ipAssetId?) => [
  {
    accessorKey: 'srcContract',
    header: 'Src Contract',
    cell: ({ row }) => <span className="font-mono">{row.original.srcContract}</span>,
  },
  {
    accessorKey: 'srcTokenId',
    header: 'ID',
    cell: ({ row }) => <span className="font-mono">{row.original.srcTokenId}</span>,
  },
  {
    accessorKey: 'type',
    header: 'Relationship',
    cell: ({ row }) => {
      return (
        <div className="flex flex-row gap-2 items-center text-indigo-300">
          {ipAssetId === row.original.srcTokenId ? (
            <BsFillArrowRightCircleFill className="w-5 h-5" />
          ) : (
            <BsFillArrowLeftCircleFill className="w-5 h-5" />
          )}
          <Badge className="capitalize bg-indigo-400 hover:bg-indigo-400">{row.original.type}</Badge>
          {ipAssetId === row.original.srcTokenId ? (
            <BsFillArrowRightCircleFill className="w-5 h-5" />
          ) : (
            <BsFillArrowLeftCircleFill className="w-5 h-5" />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'dstTokenId',
    header: 'ID',
    cell: ({ row }) => <span className="font-mono">{row.original.dstTokenId}</span>,
  },
  {
    accessorKey: 'dstContract',
    header: 'Dst Contract',
    cell: ({ row }) => <span className="font-mono">{row.original.dstContract}</span>,
  },
];

export default function AssetRelationshipTableComponent({
  data,
  pageSize,
  ipAssetId,
}: {
  data: any[];
  pageSize?: number;
  ipAssetId?: string | undefined;
}) {
  return <BaseDataViewer data={data} columns={columns(ipAssetId)} pageSize={pageSize} tableOnly />;
}
