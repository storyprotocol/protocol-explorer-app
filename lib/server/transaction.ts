'use server';

import { providers } from 'ethers';

export async function getBlockTimestampFromTransaction(txHash: string) {
  // Connect to the Ethereum network (this could also be providers.Web3Provider or others)
  const provider = new providers.JsonRpcProvider(process.env.RPC_PROVIDER_URL);

  // Fetch the transaction receipt using the transaction hash
  const receipt = await provider.getTransactionReceipt(txHash);

  if (!receipt) {
    throw new Error('Transaction receipt not found');
  }

  // Fetch the block using the block number from the receipt
  const block = await provider.getBlock(receipt.blockNumber);

  if (!block) {
    throw new Error('Block not found');
  }

  // Return the block timestamp
  return block.timestamp;
}
