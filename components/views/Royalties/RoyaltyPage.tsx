import AddressComponent from '@/components/snippets/AddressComponent';
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
import { getResource, listResource } from '@/lib/server/sdk';
import { RESOURCE_TYPE, RoyaltyPolicy } from '@/lib/server/types';
import Link from 'next/link';
import React from 'react';
import { Address } from 'viem';

// Royalty Payment
// {
//   "data": [
//       {
//           "id": "0x3c456f1d379570x8b",
//           "receiverIpId": "0x305c94f3debab37911b3b306931fe70ae7d54708",
//           "payerIpId": "0x305c94f3debab37911b3b306931fe70ae7d54708",
//           "sender": "0xf398c12a45bc409b6c652e25bb0a3e702492a4ab",
//           "token": "0xd53c2a80d24f6b3ff009e48cf88d3b482e8e1457",
//           "amount": "1000000000000000000",
//           "blockNumber": "5311042",
//           "blockTimestamp": "1708219080"
//       }
//   ]
// }

// Royalty Policy
// {
//   "data": {
//       "id": "0xa494385b40e89127d92d3c244156d6ddfd70e4d6",
//       "splitClone": "0x69d5ce93a87445cf2da93e2f6a965d41b2a94fb2",
//       "ancestorsVault": "0x6dbacf8277ab88fa7259cbf2a28602a615fdae69",
//       "royaltyStack": "100",
//       "targetAncestors": [
//           "0x0bf7660f5f7c984f0301359494c67219af4f5d58"
//       ],
//       "targetRoyaltyAmount": [
//           "100"
//       ],
//       "blockNumber": "5325746",
//       "blockTimestamp": "1708412160"
//   }
// }

const mockRoyaltyTable = [
  {
    targetAncestor: '0x0bf7660f5f7c984f0301359494c67219af4f5d58',
    targetRoyaltyAmount: '100',
  },
  {
    targetAncestor: '0x0bf7660f5f7c984f0301359494c67219af4f5d58',
    targetRoyaltyAmount: '100',
  },
  {
    targetAncestor: '0x0bf7660f5f7c984f0301359494c67219af4f5d58',
    targetRoyaltyAmount: '100',
  },
  {
    targetAncestor: '0x0bf7660f5f7c984f0301359494c67219af4f5d58',
    targetRoyaltyAmount: '100',
  },
];

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
      <h2 className="text-lg">Ancestor Vault</h2>
      <div className="mt-4">
        <div>Address: {data.ancestorsVault}</div>
      </div>
    </div>
  );
}

export function RoyaltyPool({ data }: { data: RoyaltyPolicy }) {
  return (
    <div className="p-6 rounded-xl bg-white">
      <h2 className="text-lg">Royalty Pool</h2>
      <div className="mt-4">Split Clone: {data.splitClone}</div>
    </div>
  );
}

export async function RoyaltyTargetTable({ data }: { data: RoyaltyPolicy }) {
  const tableData = combineArrays(data.targetAncestors, data.targetRoyaltyAmount);
  return (
    <div className="p-6 rounded-xl bg-white">
      <h2 className="text-lg">Royalty Splits</h2>
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
                <TableCell>{targetRoyaltyAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter className="bg-white text-black">
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell className="text-left">{data.royaltyStack}</TableCell>
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
