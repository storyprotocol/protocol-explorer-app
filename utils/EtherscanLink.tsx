import React from 'react';

export default function EtherscanLink({ txHash, chainId }: { txHash: string; chainId: number | undefined }) {
  if (!txHash || !chainId) return null;

  let linkUrl;

  switch (chainId) {
    case 1:
      linkUrl = `https://etherscan.io/tx/${txHash}`;
      break;
    case 5:
      linkUrl = `${process.env.NEXT_PUBLIC_EXTERNAL_CHAIN_EXPLORER_URL}/tx/${txHash}`;
      break;
    default:
      linkUrl = '';
  }

  return (
    <span>
      View on{' '}
      <a href={linkUrl} target="_blank" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
        Etherscan
      </a>
    </span>
  );
}
