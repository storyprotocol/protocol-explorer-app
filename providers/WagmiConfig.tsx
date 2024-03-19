'use client';
import '@rainbow-me/rainbowkit/styles.css';

import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { Chain, sepolia } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const testnet = {
  id: 15_13,
  name: 'Testnet',
  // iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5805.png',
  // iconBackground: '#fff',
  nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://renaissance-testnet.rpc.caldera.xyz/http'] },
  },
  blockExplorers: {
    default: { name: 'BlockScout', url: 'https://renaissance-testnet.explorer.caldera.xyz' },
  },
  testnet: true,
} as const satisfies Chain;

const isTestnet = process.env.NEXT_PUBLIC_CHAIN === 'renaissance';

const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID!,
  chains: isTestnet ? [testnet] : [sepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
});
const queryClient = new QueryClient();

export default function WagmiConfigWrapper({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
