'use client';

import React from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function MintNft({ text, buttonText }: { text?: string; buttonText?: string }) {
  const { writeContractAsync, isPending: isPendingInWallet, data: txHash } = useWriteContract();

  const { address } = useAccount();

  async function handleMintNft() {
    await writeContractAsync({
      address: '0x0f00a58A741aD6C9DFb549e8B0aad1e9bC48D9f1', // dummy ERC721 contract address to mint from
      functionName: 'mintAndRegister',
      args: [address],
      abi: [
        {
          inputs: [
            {
              internalType: 'address',
              name: 'to',
              type: 'address',
            },
          ],
          name: 'mintAndRegister',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'name',
          outputs: [
            {
              internalType: 'string',
              name: '',
              type: 'string',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
      ],
    });
  }

  return (
    <>
      <p className="mb-2">
        This allows you to mint a simple standard ERC721 token for testing purposes. (This is not part of the protocol).
      </p>
      <p className="mb-2">
        The contract address for this mint is{' '}
        <Link
          href={`${process.env.NEXT_PUBLIC_EXTERNAL_CHAIN_EXPLORER_URL}/address/0x0f00a58A741aD6C9DFb549e8B0aad1e9bC48D9f1`}
          className=" text-blue-600 dark:text-blue-500 hover:underline"
          target="_blank"
        >
          0x0f00a58A741aD6C9DFb549e8B0aad1e9bC48D9f1
        </Link>{' '}
        You will want to note the token ID that was minted, by viewing the transaction on Etherscan.
      </p>
      <Button onClick={() => handleMintNft()} variant={'register'}>
        {isPendingInWallet ? 'Confirm in wallet' : buttonText ? buttonText : 'Mint an NFT'}
      </Button>
      {txHash && (
        <Link
          href={`${process.env.NEXT_PUBLIC_EXTERNAL_CHAIN_EXPLORER_URL}/tx/${txHash}`}
          target="_blank"
          className="ml-4"
        >
          <Button variant={'etherscan'} type="button">
            View on Etherscan
          </Button>
        </Link>
      )}
    </>
  );
}
