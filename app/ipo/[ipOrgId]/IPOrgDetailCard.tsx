import storyClient from '@/lib/SP';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

import TimeSince, { Fallback as TimeSinceFallback } from './TimeSince';
import Icons from '@/components/ui/icons';
import { GetIPOrgRequest, GetIPOrgResponse, IPOrg } from '@story-protocol/core-sdk';
import RelationshipTypes from './RelationshipTypes';

const CardWrapper = ({ children, txHash }: { children: React.ReactNode; txHash?: string }) => (
  <div className="flex flex-col col-span-12 md:col-span-6 bg-white rounded-2xl shadow-lg">
    <div className="flex items-center justify-between w-full h-12 px-6 pb-2 pt-3 border-b border-gray-200">
      <h4 className="font-semibold text-gray-800 text-base leading-none">Details</h4>
      {txHash && (
        <a
          href={`https://sepolia.etherscan.io/tx/${txHash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center font-light text-sm text-sp-purple hover:underline"
        >
          Etherscan
          <Icons.externalLink className="inline-block w-4 h-4 ml-1" />
        </a>
      )}
    </div>
    {children}
  </div>
);

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => {
  return (
    <div className="py-2 xl:py-1 grid grid-cols-12 gap-0 xl:gap-4">
      <dt className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-300 col-span-12 xl:col-span-6">
        {label}
      </dt>
      <dd className="relative w-full xl:mt-1 flex items-center space-x-2 text-sm leading-6 text-gray-700 dark:text-gray-200 col-span-12 xl:col-span-6 sm:mt-0">
        <span className="truncate">{children}</span>
      </dd>
    </div>
  );
};

export const Fallback = () => (
  <CardWrapper>
    <div className="w-full p-4 pb-6">
      <Row label="IPA Organization">
        <Skeleton className=" w-48 h-4" />
      </Row>
      <Row label="IPA Organization Owner">
        <Skeleton className=" w-48 h-4" />
      </Row>
      <Row label="IPA Organization Name">
        <Skeleton className=" w-48 h-4" />
      </Row>
      <Row label="Time Created">
        <Skeleton className=" w-48 h-4" />
      </Row>
    </div>
  </CardWrapper>
);

export default async function IPOrgDetailCard({ ipOrgId }: { ipOrgId: string }) {
  const getReq: GetIPOrgRequest = {
    ipOrgId: ipOrgId,
  };
  const getRes: GetIPOrgResponse = await storyClient.ipOrg.get(getReq);
  const ipOrgData: IPOrg = getRes.ipOrg;

  return (
    <CardWrapper txHash={ipOrgData.txHash}>
      <div className="w-full p-4 pb-6">
        <Row label="IPA Organization">
          <span className="font-mono">{ipOrgData.id}</span>
        </Row>
        <Row label="IPA Organization Owner">
          <span className="font-mono">{ipOrgData.owner}</span>
        </Row>
        <Row label="IPA Organization Name">{ipOrgData.name}</Row>
        <Row label="Time Created">
          {
            <Suspense fallback={<TimeSinceFallback />}>
              <TimeSince txHash={ipOrgData.txHash} />
            </Suspense>
          }
        </Row>
        <Row label="IPA Types">
          <span className="font-mono">{JSON.stringify(ipOrgData.ipAssetTypes)}</span>
        </Row>

        <Row label="Relationship Types">
          {
            <Suspense fallback={<TimeSinceFallback />}>
              <RelationshipTypes ipOrgId={ipOrgId} />
            </Suspense>
          }
        </Row>
      </div>
    </CardWrapper>
  );
}
