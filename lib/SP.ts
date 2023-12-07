import { StoryClient, StoryConfig } from '@story-protocol/core-sdk';
import { privateKeyToAccount } from 'viem/accounts';
import { Hex, http } from 'viem';
import { sepolia } from 'wagmi';

const config: StoryConfig = {
  chain: sepolia,
  transport: http(process.env.RPC_PROVIDER_URL),
  account: privateKeyToAccount(process.env.WALLET_PRIVATE_KEY as Hex),
};

const storyClient = StoryClient.newClient(config);

export default storyClient;
