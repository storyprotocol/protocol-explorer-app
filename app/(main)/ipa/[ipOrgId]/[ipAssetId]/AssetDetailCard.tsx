import React, { Suspense } from 'react';

import storyClient from '@/lib/SP';
import { cn } from '@/utils';
import Icons from '@/components/ui/icons';
import SuccessBadge from '@/components/badges/SuccessBadge';
import { Skeleton } from '@/components/ui/skeleton';

import TimeSince, { Fallback as TimeSinceFallback } from './TimeSince';
import Link from 'next/link';
import { GetIpAssetRequest, GetIpAssetResponse, IPAsset } from '@story-protocol/core-sdk';
import AddressComponent from '@/components/snippets/AddressComponent';
import AssetDisplayComponent from './AssetDisplayComponent';

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => {
  return (
    <div className="py-4 sm:grid sm:grid-cols-5 sm:gap-4">
      <dt className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">{label}</dt>
      <dd className="relative w-full truncate mt-1 flex items-center space-x-2 text-sm leading-6 text-gray-700 dark:text-gray-200 sm:col-span-4 sm:mt-0">
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

export default async function AssetDetailCard({ ipAssetId }: { ipAssetId: string; ipOrgId: string }) {
  const getReq: GetIpAssetRequest = {
    ipAssetId,
  };
  const getRes: GetIpAssetResponse = await storyClient.ipAsset.get(getReq);
  const ipAsset: IPAsset = getRes.ipAsset;

  return (
    <div className="grid grid-cols-12 gap-2">
      <AssetDisplayComponent data={ipAsset} />
      <div className="flex flex-col gap-2 h-full col-span-12 xl:col-span-6">
        <div className={cn('relative rounded-xl px-6 py-2 bg-[#FFFFFF] dark:bg-[#2C2B35] w-full')}>
          <div className="flex items-center justify-between py-4">
            <h1 className="font-medium md:text-2xl">{ipAsset.name}</h1>
          </div>
          <div className="border-t py-4 border-gray-200 dark:border-gray-900">
            <Row label="TxHash">
              <span className="truncate">
                <a
                  href={`${process.env.NEXT_PUBLIC_EXTERNAL_CHAIN_EXPLORER_URL}/tx/${ipAsset.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex font-mono items-center space-x-2 break-all text-indigo-400 underline dark:text-[#D0DBFF]"
                >
                  <span className="shrink truncate">{ipAsset.txHash}</span>
                  <Icons.externalLink className="h-4 w-4 shrink-0" />
                </a>
              </span>
            </Row>

            <Row label="Created At">
              <Suspense fallback={<TimeSinceFallback />}>
                <TimeSince txHash={ipAsset.txHash} />
              </Suspense>
            </Row>

            <Row label="IP Org ID">
              <Link href={`/collections/${ipAsset.ipOrgId}`}>
                <span className="font-mono truncate text-indigo-400 hover:underline">{ipAsset.ipOrgId}</span>
              </Link>
            </Row>

            <Row label="IPA ID">
              <span className="truncate font-mono text-gray-500">{ipAsset.id}</span>
            </Row>

            <Row label="IPA Type">
              <span className="truncate font-mono text-gray-500">{JSON.stringify(ipAsset.type)}</span>
            </Row>

            <Row label="Content Hash">
              <p className="font-mono text-gray-500">{ipAsset.contentHash}</p>
            </Row>
            {ipAsset.mediaUrl && (
              <Row label="Media URL">
                <Link
                  href={ipAsset.mediaUrl}
                  target="_blank"
                  className="flex font-mono items-center space-x-2 break-all text-indigo-400 underline dark:text-[#D0DBFF]"
                >
                  <span>{ipAsset.mediaUrl}</span>
                  <Icons.externalLink className="h-4 w-4 shrink-0" />
                </Link>
              </Row>
            )}

            {/* <Row label="Submitted"><></></Row> */}

            <Row label="Posted By">
              {/* <div className="flex items-center space-x-2 break-all">          
            <img
              src="https://cdn.stamp.fyi/avatar/eth:0x7941983a3e1001dc3bdde75a0c29b281760f0413?s=300"
              alt={ipAsset.owner}
              className="h-8 w-8 rounded-full"
            />
            <b className="shrink truncate">{truncateEthAddress(ipAsset.owner)}</b>
            <button className="shrink-0">
              <Icons.copy className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </button>
          </div> */}
              <AddressComponent address={ipAsset.owner} />
            </Row>

            <Row label="Status">
              <SuccessBadge>Verified</SuccessBadge>
            </Row>
          </div>
        </div>
        <AssetStatsComponent />
      </div>
    </div>
  );
}
