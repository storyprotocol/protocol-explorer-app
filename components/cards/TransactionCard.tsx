'use client';
import { cn } from '@/utils';
import SuccessBadge from '../badges/SuccessBadge';
import Link from 'next/link';
import moment from 'moment';
import AddressComponent from '../snippets/AddressComponent';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@radix-ui/react-accordion';
import { useCallback, useEffect, useState } from 'react';

import JsonView from '@uiw/react-json-view';
import { useStoryClientContext } from '@/app/(main)/context/StoryClientContext';

export default function TransactionCard({ classname, data }: { classname?: string; data: any }) {
  const [additionalData, setAdditionalData] = useState<Record<any, any>>();
  const { client } = useStoryClientContext();

  const isRelationship = data.resourceType === 'Relationship' && data.actionType === 'Register';

  const fetchData = useCallback(
    async (resourceType: string, resourceId: string, actionType: string, ipOrgId: string) => {
      let responseData;

      if (actionType === 'Register') {
        if (resourceType === 'IPAsset') {
          responseData = await client.ipAsset.get({ ipAssetId: resourceId });
        } else if (resourceType === 'Relationship') {
          responseData = await client.relationship.get({ relationshipId: resourceId });
        } else if (resourceType === 'RelationshipType') {
          responseData = await client.relationshipType.get({ relType: resourceId, ipOrgId });
        } else if (resourceType === 'IPOrg') {
          responseData = await client.ipOrg.get({ ipOrgId: resourceId });
        }

        setAdditionalData(responseData);
      }
    },
    [client.ipAsset, client.ipOrg, client.relationship, client.relationshipType],
  );

  useEffect(() => {
    if (!additionalData) {
      fetchData(data.resourceType, data.resourceId, data.actionType, data.ipOrgId);
    }
  }, [additionalData, data.actionType, data.ipOrgId, data.resourceId, data.resourceType, fetchData]);

  return (
    <>
      <div className={cn('relative rounded-xl px-2 md:px-0 bg-[#FFFFFF] !p-5 dark:bg-[#2C2B35]', classname)}>
        <div className="flex flex-wrap items-center justify-between space-y-3 px-4 sm:px-0">
          <div>
            <h1 className="font-medium md:text-3xl">Transaction Details</h1>
          </div>
          {/* <button className="group ml-auto flex">
            <button className="rounded-full bg-[#aeb4e8] px-3 py-1 text-white hover:bg-[#8888f5] focus:outline-none disabled:opacity-50 dark:bg-[#aeb4e8] dark:text-[#2C2B35] dark:hover:bg-[#8888f5] text-[13px] font-bold uppercase leading-[13px]">
              <span>Etherscan</span>
            </button>
          </button> */}
        </div>
        <div className="mt-6 border-t border-gray-200 dark:border-gray-900">
          <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">TxHash</dt>
            <dd className="mt-1 flex items-center space-x-2 text-sm leading-6 text-gray-700 dark:text-gray-200 sm:col-span-4 sm:mt-0">
              <span className="truncate">
                <a
                  className="flex font-mono items-center space-x-2 break-all text-indigo-400 underline dark:text-[#D0DBFF]"
                  target="_blank"
                  href={`${process.env.NEXT_PUBLIC_EXTERNAL_CHAIN_EXPLORER_URL}/tx/${data.txHash}`}
                >
                  <span>{data.txHash}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    ></path>
                  </svg>
                </a>
              </span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">Created At</dt>
            <dd className="mt-1 flex items-center space-x-2 text-sm leading-6 text-gray-700 dark:text-gray-200 sm:col-span-4 sm:mt-0">
              <span className="truncate">
                <div className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <span>{`${moment(data.createdAt).fromNow()} (${data.createdAt})`}</span>
                </div>
              </span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">Status</dt>
            <dd className="mt-1 flex items-center space-x-2 text-sm leading-6 text-gray-700 dark:text-gray-200 sm:col-span-4 sm:mt-0">
              <span className="truncate">
                <div className="flex items-center space-x-2">
                  <SuccessBadge>Success</SuccessBadge>
                </div>
              </span>
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">Action Type</dt>
            <dd className="mt-1 flex items-center space-x-2 text-sm leading-6 text-gray-700 dark:text-gray-200 sm:col-span-4 sm:mt-0">
              <span>{data.actionType}</span>
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">Resource Type</dt>
            <dd className="mt-1 flex items-center space-x-2 text-sm leading-6 text-gray-700 dark:text-gray-200 sm:col-span-4 sm:mt-0">
              <span>{data.resourceType}</span>
            </dd>
          </div>

          {isRelationship && additionalData && (
            <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">Relationship Details</dt>
              <dd className="mt-1 flex items-center space-x-2 text-sm leading-6 text-gray-700 dark:text-gray-200 sm:col-span-4 sm:mt-0">
                <div className="flex flex-col">
                  <div>
                    Source IPA:{' '}
                    <Link
                      href={`/ipa/${additionalData.relationship.srcContract}/${additionalData.relationship.srcTokenId}`}
                      className="font-mono text-indigo-400 underline dark:text-[#D0DBFF]"
                    >
                      {additionalData.relationship.srcTokenId}
                    </Link>
                  </div>
                  <div>
                    Type: <span className="font-mono">{additionalData.relationship.type}</span>
                  </div>
                  <div>
                    Destination IPA:{' '}
                    <Link
                      href={`/ipa/${additionalData.relationship.dstContract}/${additionalData.relationship.dstTokenId}`}
                      className="font-mono text-indigo-400 underline dark:text-[#D0DBFF]"
                    >
                      {additionalData.relationship.dstTokenId}
                    </Link>
                  </div>
                </div>
              </dd>
            </div>
          )}

          <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">Posted by</dt>
            <dd className="mt-1 flex items-center space-x-2 text-sm leading-6 text-gray-700 dark:text-gray-200 sm:col-span-4 sm:mt-0">
              <span className="truncate">
                <AddressComponent address={data.initiator} displayFull />
              </span>
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">Resource ID</dt>
            <dd className="mt-1 flex items-center space-x-2 text-sm leading-6 text-gray-700 dark:text-gray-200 sm:col-span-4 sm:mt-0">
              <span className="font-mono">{data.resourceId}</span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">IP Org ID</dt>
            <dd className="mt-1 flex items-center space-x-2 text-sm leading-6 text-gray-700 dark:text-gray-200 sm:col-span-4 sm:mt-0">
              {data.ipOrgId ? (
                <Link
                  href={`/ipo/${data.ipOrgId}`}
                  className="flex font-mono items-center space-x-2 break-all text-indigo-400 underline dark:text-[#D0DBFF]"
                >
                  <span>{data.ipOrgId}</span>
                </Link>
              ) : (
                <span>-</span>
              )}
            </dd>
          </div>
        </div>
      </div>

      {additionalData && (
        <Accordion type="single" collapsible defaultValue="additional-data">
          <AccordionItem
            value="additional-data"
            className="relative rounded-xl px-2 md:px-0 mt-6 bg-[#FFFFFF] !p-5 dark:bg-[#2C2B35]"
          >
            <AccordionTrigger className="flex w-full items-center justify-between rounded-lg py-2 text-left font-medium tracking-wide opacity-70 hover:opacity-100 focus:outline-none">
              Additional Details
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className="rotate-180 transform h-5 w-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </AccordionTrigger>
            <AccordionContent>
              <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">Type</dt>
                <dd className="mt-1 flex items-center space-x-2 text-sm leading-6 text-gray-700 dark:text-gray-200 sm:col-span-4 sm:mt-0">
                  <JsonView value={additionalData} />
                </dd>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </>
  );
}
