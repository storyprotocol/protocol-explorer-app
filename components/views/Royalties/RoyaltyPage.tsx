import AddressComponent from '@/components/address/AddressComponent';
import TooltipWrapper from '@/components/tooltip/tooltip';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getResource } from '@/lib/server/sdk';
import { RESOURCE_TYPE, RoyaltyPolicy } from '@/lib/server/types';
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
        <h2 className="text-lg">Ancestor Vault</h2>
        <TooltipWrapper content="Ancestor vault is the address where royalties are collected and distributed.">
          <InformationCircleIcon className="h-4 w-4 text-slate-400 hover:text-indigo-300 transition-all" />
        </TooltipWrapper>
      </div>
      <div className="mt-4 font-mono text-xs">
        <div>Address: {data.ancestorsVault}</div>
      </div>
    </div>
  );
}

export function RoyaltyPool({ data }: { data: RoyaltyPolicy }) {
  return (
    <div className="p-6 rounded-xl bg-white">
      <div className="flex flex-row items-center gap-1 justify-start">
        <h2 className="text-lg">Royalty Pool</h2>
        <TooltipWrapper content="Royalty pool is the total amount royalties that are available to the target ancestor defined in 0xSplits">
          <InformationCircleIcon className="h-4 w-4 text-slate-400 hover:text-indigo-300 transition-all" />
        </TooltipWrapper>
      </div>
      <div className="mt-4 font-mono text-xs">Split Clone: {data.splitClone}</div>
    </div>
  );
}

export async function RoyaltyTargetTable({ data }: { data: RoyaltyPolicy }) {
  const tableData = combineArrays(data.targetAncestors, data.targetRoyaltyAmount);
  return (
    <div className="p-6 rounded-xl bg-white">
      <div className="flex flex-row items-center gap-1 justify-start">
        <h2 className="text-lg">Royalty Splits</h2>
        <TooltipWrapper content="Royalty splits are the percentage of royalties that are distributed to the target ancestor.">
          <InformationCircleIcon className="h-4 w-4 text-slate-400 hover:text-indigo-300 transition-all" />
        </TooltipWrapper>
      </div>
      {tableData.length ? (
        <Table>
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead>IP ID</TableHead>
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
              <TableCell>Total</TableCell>
              <TableCell className="text-left">{parseFloat(data.royaltyStack) / 10}%</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      ) : (
        <div className="flex justify-center items-center p-10">No royalty splits defined</div>
      )}
    </div>
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
        <RoyaltyPool data={royaltyPolicyData} />
      </div>
      <div className="flex-1">
        <RoyaltyTargetTable data={royaltyPolicyData} />
      </div>
    </div>
  );
}
