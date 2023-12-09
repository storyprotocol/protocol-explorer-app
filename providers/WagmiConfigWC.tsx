// 'use client';
// import { createWeb3Modal } from '@web3modal/wagmi/react';
// import { walletConnectProvider, EIP6963Connector } from '@web3modal/wagmi';

// import { WagmiConfig, configureChains, createConfig } from 'wagmi';
// import { publicProvider } from 'wagmi/providers/public';
// import { sepolia } from 'wagmi/chains';
// import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
// import { InjectedConnector } from 'wagmi/connectors/injected';
// import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
// import { alchemyProvider } from 'wagmi/providers/alchemy';

// // 1. Get projectId
// const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID as string;

// // 2. Create wagmiConfig
// const { chains, publicClient } = configureChains(
//   [sepolia],
//   [
//     walletConnectProvider({ projectId }),
//     publicProvider(),
//     alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string }),
//   ],
// );

// const metadata = {
//   name: 'Dashboard Alpha',
//   description: 'SP Dashboard Alpha',
//   url: '',
//   icons: [''],
// };

// const wagmiConfig = createConfig({
//   autoConnect: true,
//   connectors: [
//     new WalletConnectConnector({
//       chains,
//       options: { projectId, showQrModal: false, metadata },
//     }),
//     new EIP6963Connector({ chains }),
//     new InjectedConnector({ chains, options: { shimDisconnect: true } }),
//     new CoinbaseWalletConnector({
//       chains,
//       options: { appName: metadata.name },
//     }),
//   ],
//   publicClient,
// });

// // 3. Create modal
// createWeb3Modal({ wagmiConfig, projectId, chains });

// export default function WagmiConfigWrapper({ children }: { children: React.ReactNode }) {
//   return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
// }
