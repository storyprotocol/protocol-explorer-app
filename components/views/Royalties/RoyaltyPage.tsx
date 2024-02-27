import AddressComponent from '@/components/address/AddressComponent';
import TooltipWrapper from '@/components/tooltip/tooltip';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getResource } from '@/lib/server/sdk';
import { RESOURCE_TYPE, RoyaltyHolder, RoyaltyPolicy, RoyaltySplit } from '@/lib/server/types';
import { InformationCircleIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import React from 'react';
import { Address } from 'viem';

function combineArrays(targetAncestors: Address[], targetRoyaltyAmount: string[]) {
  // Check if both arrays have the same length
  if (targetAncestors.length !== targetRoyaltyAmount.length) {
    throw new Error('Arrays must have the same length');
  }

  // Combine arrays into array of objects
  const combinedArray = [];
  for (let i = 0; i < targetAncestors.length; i++) {
    combinedArray.push({
      targetAncestor: targetAncestors[i],
      targetRoyaltyAmount: targetRoyaltyAmount[i],
    });
  }

  return combinedArray;
}

export function AncestorVault({ data }: { data: RoyaltyPolicy }) {
  return (
    <div className="p-6 rounded-xl bg-white">
      <div className="flex flex-row items-center gap-1 justify-start">
        <h2 className="text-lg">Ancestors</h2>
        <TooltipWrapper content="Ancestor vault is the address where royalties are collected and distributed.">
          <InformationCircleIcon className="h-4 w-4 text-slate-400 hover:text-indigo-300 transition-all" />
        </TooltipWrapper>
      </div>
      <div className="mt-4 font-mono text-xs">
        <div>Ancestor Vault Address: {data.ancestorsVault}</div>
      </div>
      <div className="mt-4 font-mono text-xs">
        <AncestorRoyaltyTable data={data} />
      </div>
    </div>
  );
}

export function RoyaltyPool({ data }: { data: RoyaltyPolicy }) {
  return (
    <div className="p-6 rounded-xl bg-white">
      <div className="flex flex-row items-center gap-1 justify-start">
        <h2 className="text-lg">Royalty IP Pool</h2>
        <TooltipWrapper content="Royalty IP pool displays the current holders of the RNFTs">
          <InformationCircleIcon className="h-4 w-4 text-slate-400 hover:text-indigo-300 transition-all" />
        </TooltipWrapper>
      </div>
      <div className="mt-4 font-mono text-xs">Split Clone: {data.splitClone}</div>
      <div className="mt-4 font-mono text-xs">
        <RoyaltyHoldersTable data={data} />
      </div>
    </div>
  );
}

export async function AncestorRoyaltyTable({ data }: { data: RoyaltyPolicy }) {
  const tableData = combineArrays(data.targetAncestors, data.targetRoyaltyAmount);
  return (
    <>
      {tableData.length ? (
        <Table className="text-xs">
          <TableCaption className="font-sans text-left">
            A list of ancestors that this IP Asset was derived from and their percentage of royalty share.
          </TableCaption>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead>Ancestor IP IDs</TableHead>
              <TableHead>Percentage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map(({ targetAncestor, targetRoyaltyAmount }) => (
              <TableRow key={targetAncestor}>
                <TableCell className="font-xs">
                  <Link href={`/ipa/${targetAncestor}`}>
                    <AddressComponent address={targetAncestor} size="sm" />
                  </Link>
                </TableCell>
                <TableCell>{parseFloat(targetRoyaltyAmount) / 10}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter className="bg-white text-black">
            <TableRow>
              <TableCell>Royalty Stack</TableCell>
              <TableCell className="text-left">{parseFloat(data.royaltyStack) / 10}%</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      ) : (
        <div className="flex justify-center items-center p-10">No royalty stack defined</div>
      )}
    </>
  );
}

export async function RoyaltyHoldersTable({ data }: { data: RoyaltyPolicy }) {
  const royaltySplit = await getResource(RESOURCE_TYPE.ROYALTY_SPLIT, data.splitClone);
  const royaltySplitData: RoyaltySplit = royaltySplit.data;
  const royaltySplitHolders: RoyaltyHolder[] = royaltySplitData.holders;

  return (
    <>
      {royaltySplitHolders.length ? (
        <>
          <div className="items-center mb-6 gap-2">
            NFT Holder array:
            <code className="text-xs inline-flex text-left items-center space-x-4 bg-gray-100 text-black rounded-lg p-4 pl-3 h-8 ">
              <span className="flex flex-1 gap-4 text-nowrap overflow-x-scroll w-full max-w-[400px]">
                {royaltySplitData.claimFromIPPoolArg}
              </span>
            </code>
          </div>
          <Table className="text-xs">
            <TableCaption className="font-sans text-left">
              A list of RNFT holders and the amount they are holding at the moment. <br />
              Note: if the RNFTs are not claimed yet, the holder will be the Ancestor Vault address.
            </TableCaption>
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead>RNFT Holder Address</TableHead>
                <TableHead>Percentage</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {royaltySplitHolders.map(({ id, ownership }) =>
                ownership !== '' ? (
                  <TableRow key={id}>
                    <TableCell className="font-xs flex flex-row ">
                      <Link href={`/ipa/${id}`}>
                        <AddressComponent address={id} size="sm" />
                      </Link>
                      {id === data.ancestorsVault && '(Ancestor Vault)'}
                      {id === data.id && '(Current NFT)'}
                    </TableCell>
                    <TableCell>{parseFloat(ownership) / 10}%</TableCell>
                    <TableCell>{parseFloat(ownership)}</TableCell>
                  </TableRow>
                ) : (
                  <></>
                ),
              )}
            </TableBody>
            <TableFooter className="bg-white text-black">
              <TableRow>
                <TableCell>Total</TableCell>
                <TableCell className="text-left">100%</TableCell>
                <TableCell>1000</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </>
      ) : (
        <div className="flex justify-center items-center p-10">No royalty stack defined</div>
      )}
    </>
  );
}

export default async function RoyaltyPage({ ipId }: { ipId: Address }) {
  const royaltyPolicy = await getResource(RESOURCE_TYPE.ROYALTY_POLICY, ipId);
  const royaltyPolicyData = royaltyPolicy.data;

  console.log({ royaltyPolicyData });

  if (!royaltyPolicy.data) {
    return <div className="w-full pt-8 text-center text-gray-500">No Royalty data found</div>;
  }
  return (
    <div className="flex flex-col xl:flex-row gap-2 max-w-full">
      <div className="flex flex-col gap-2 flex-1">
        <AncestorVault data={royaltyPolicyData} />
      </div>
      <div className="flex-1">
        <RoyaltyPool data={royaltyPolicyData} />
      </div>
    </div>
  );
}
