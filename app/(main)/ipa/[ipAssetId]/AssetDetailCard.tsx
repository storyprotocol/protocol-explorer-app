'use client';
import React from 'react';

import { cn } from '@/utils';
import Icons from '@/components/ui/icons';
import SuccessBadge from '@/components/badges/SuccessBadge';
import { Skeleton } from '@/components/ui/skeleton';

import Link from 'next/link';
import AddressComponent from '@/components/snippets/AddressComponent';
import AssetDisplayComponent from './AssetDisplayComponent';
import { Asset } from '@/lib/server/types';
import moment from 'moment';
import JsonView from '@uiw/react-json-view';

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => {
  return (
    <div className="py-4 sm:grid sm:grid-cols-2 sm:gap-4">
      <dt className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">{label}</dt>
      <dd className="relative w-full truncate mt-1 flex items-center space-x-2 text-sm leading-6 text-gray-700 dark:text-gray-200 sm:col-span-1 sm:mt-0">
        {children}
      </dd>
    </div>
  );
};

const FallbackRow = ({ label }: { label: string }) => {
  return (
    <div className="py-4 sm:grid sm:grid-cols-5 sm:gap-4">
      {/* <Skeleton className="h-6 w-full" /> */}
      <dt className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">{label}</dt>
      <Skeleton className="relative w-72 mt-1 flex space-x-2 h-6 sm:col-span-4 sm:mt-0" />
    </div>
  );
};

export const Fallback = () => (
  <div className={cn('relative rounded-xl px-6 py-2 bg-[#FFFFFF] dark:bg-[#2C2B35] w-full')}>
    <div className="flex items-center justify-between py-4">
      <Skeleton className="w-[100px] h-8" />
    </div>
    <div className="border-t py-4 border-gray-200 dark:border-gray-900">
      <FallbackRow label="TxHash" />
      <FallbackRow label="Created At" />
      <FallbackRow label="IPO ID" />
      <FallbackRow label="IPA ID" />
      <FallbackRow label="Posted By" />
      <FallbackRow label="Status" />
    </div>
  </div>
);

export function AssetStatsComponent() {
  return (
    <div className="w-full mx-auto p-6 bg-white rounded-xl">
      <h2 className="text-lg">Statistics</h2>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-3xl">654</p>
          <p className="text-sm text-gray-600">IPAs</p>
        </div>
        <div>
          <p className="text-3xl">38</p>
          <p className="text-sm text-gray-600">Licenses</p>
        </div>
        <div>
          <p className="text-3xl">5%</p>
          <p className="text-sm text-gray-600">Royalties</p>
        </div>
      </div>
    </div>
  );
}

export default function AssetDetailCard({ data }: { data: Asset }) {
  // TODO: get Opensea data

  return (
    <div className="flex flex-col lg:flex-row gap-2">
      <div className="flex flex-col lg:w-2/5 gap-2">
        <AssetDisplayComponent data={data} />
        <AssetStatsComponent />
      </div>
      <div className="flex flex-col lg:w-3/5 gap-2">
        <div className={cn('relative rounded-xl px-6 py-2 bg-[#FFFFFF] dark:bg-[#2C2B35] w-full')}>
          <div className="flex items-center justify-between py-4">
            <h1 className="font-medium md:text-2xl">{data.metadata.name || 'Untitled'}</h1>
          </div>
          <div className="border-t py-4 border-gray-200 dark:border-gray-900">
            <Row label="Blocknumber">
              <p className="font-mono text-gray-500">{data.blockNumber}</p>
            </Row>

            <Row label="Created At">
              <div className="flex items-center space-x-2 break-all">
                <Icons.clock className="h-4 w-4 shrink-0" />
                <b className="shrink truncate">
                  {moment.unix(parseInt(data.blockTimestamp)).fromNow()}
                  <span className="font-light text-gray-500 ml-2">
                    ({moment.unix(parseInt(data.blockTimestamp)).format('Do MMMM YYYY, h:mm a')})
                  </span>
                </b>
              </div>
            </Row>

            <Row label="Chain ID">
              <p className="font-mono text-gray-500">{data.chainId}</p>
            </Row>

            <Row label="Root IP IDs">
              <div className="flex flex-col">
                {data.rootIpIds.length > 0
                  ? data.rootIpIds.map((rootIpId) => (
                      <Link
                        key={rootIpId.id}
                        href={`/ipa/${rootIpId.id}`}
                        className="text-indigo-400 hover:text-indigo-500"
                      >
                        <AddressComponent key={rootIpId.id} address={rootIpId.id} />
                      </Link>
                    ))
                  : '-'}
              </div>
            </Row>

            <Row label="Parent IP IDs">
              <div className="flex flex-col">
                {data.parentIpIds.length > 0
                  ? data.parentIpIds.map((parentIpId) => (
                      <Link
                        key={parentIpId.id}
                        href={`/ipa/${parentIpId.id}`}
                        className="text-indigo-400 hover:text-indigo-500"
                      >
                        <AddressComponent key={parentIpId.id} address={parentIpId.id} />
                      </Link>
                    ))
                  : '-'}
              </div>
            </Row>

            <Row label="Children IP IDs">
              <div className="flex flex-col">
                {data.childIpIds.length > 0
                  ? data.childIpIds.map((childIpId) => (
                      <Link
                        key={childIpId.id}
                        href={`/ipa/${childIpId.id}`}
                        className="text-indigo-400 hover:text-indigo-500"
                      >
                        <AddressComponent key={childIpId.id} address={childIpId.id} />
                      </Link>
                    ))
                  : '-'}
              </div>
            </Row>

            <Row label="Collection">
              <Link href={`/collections/${data.tokenContract}`}>
                <span className="font-mono truncate text-indigo-400 hover:underline">{data.tokenContract}</span>
              </Link>
            </Row>

            <Row label="Token ID">
              <span className="truncate font-mono text-gray-500">{data.tokenId}</span>
            </Row>

            <Row label="Metadata Resolver Address">
              <p className="font-mono text-gray-500">{data.metadataResolverAddress}</p>
            </Row>

            <Row label="Metadata">
              <JsonView value={data.metadata} className="w-full" />
            </Row>

            <Row label="Status">
              <SuccessBadge>Verified</SuccessBadge>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}
