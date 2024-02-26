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
      address: '0x7ee32b8b515dee0ba2f25f612a04a731eec24f49', // dummy ERC721 contract address to mint from
      functionName: 'mint',
      args: [address],
      abi: [
        {
          inputs: [{ internalType: 'address', name: 'to', type: 'address' }],
          name: 'mint',
          outputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
          stateMutability: 'nonpayable',
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
          href="https://sepolia.etherscan.io/address/0x7ee32b8b515dee0ba2f25f612a04a731eec24f49"
          className=" text-blue-600 dark:text-blue-500 hover:underline"
          target="_blank"
        >
          0x7ee32b8b515dee0ba2f25f612a04a731eec24f49
        </Link>{' '}
        You can want to note the token ID that was minted, by viewing the transaction on Etherscan.
      </p>
      <Button onClick={() => handleMintNft()} variant={'register'}>
        {isPendingInWallet ? 'Confirm in wallet' : buttonText ? buttonText : 'Mint an NFT'}
      </Button>
      {txHash && (
        <Link href={`https://sepolia.etherscan.io/tx/${txHash}`} target="_blank" className="ml-4">
          <Button variant={'etherscan'} type="button">
            View on Etherscan
          </Button>
        </Link>
      )}
    </>
  );
}
