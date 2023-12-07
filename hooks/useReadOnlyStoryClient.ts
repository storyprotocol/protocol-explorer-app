'use client';
import { StoryClient, StoryReadOnlyConfig } from '@story-protocol/core-sdk';
import { sepolia } from 'wagmi';
import { http } from 'viem';

export function useReadOnlyStoryClient() {
  const readOnlyConfig: StoryReadOnlyConfig = {
    chain: sepolia,
    transport: http(process.env.RPC_PROVIDER_URL),
  };
  const client = StoryClient.newReadOnlyClient(readOnlyConfig);

  return { client };
}
