'use client';
import { shortenAddress } from '@/utils';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount, useNetwork } from 'wagmi';
import ClientOnly from '../../utils/ClientOnly';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { sepolia } from 'wagmi/chains';

export default function ConnectWalletButton() {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false);
  const connectedText = address ? `Connected: ${shortenAddress(address as string)} (${chain ? chain.name : ''})` : '';
  const notConnectedText = 'Connect Wallet';
  const buttonText = isConnected ? (isCorrectNetwork ? connectedText : 'Switch to sepolia') : notConnectedText;

  useEffect(() => {
    if (chain?.id === sepolia.id) {
      setIsCorrectNetwork(true);
    } else {
      setIsCorrectNetwork(false);
    }
  }, [chain]);

  return (
    <ClientOnly>
      <button
        onClick={() => open()}
        className={clsx({
          ['py-2 px-4 md:px-6 rounded-3xl text-white text-xs md:text-base font-semibold shadow-sm']: true,
          ['bg-sp-purple hover:bg-sp-purple-dark']: isCorrectNetwork || !isConnected,
          ['bg-red-700']: !isCorrectNetwork && isConnected,
        })}
      >
        {buttonText}
      </button>
    </ClientOnly>
  );
}
