'use client';

import { shortenAddress } from '@/utils';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount, useNetwork, useSignMessage } from 'wagmi';
import ClientOnly from '../../utils/ClientOnly';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { sepolia } from 'wagmi/chains';
import { getSignMessageRequest, verifySignature } from '@/lib/server/platform';

export default function ConnectWalletButton() {
  const notConnectedText = 'Connect Wallet';

  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { chain } = useNetwork();
  const [buttonText, setButtonText] = useState<string>(notConnectedText);
  const [requireSign, setRequireSign] = useState(false);
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false);
  const connectedText = address ? `Connected: ${shortenAddress(address as string)} (${chain ? chain.name : ''})` : '';

  useEffect(() => {
    // check if address previously signed
    const validatedAddress = sessionStorage.getItem('validatedAddress');
    if (isConnected) {
      if (isCorrectNetwork) {
        if (!validatedAddress) {
          setRequireSign(true);
          setButtonText('Sign Message');
        } else {
          setButtonText(connectedText);
        }
      } else {
        setButtonText('Switch to sepolia');
      }
    }
  }, [connectedText, isConnected, isCorrectNetwork]);

  const signIn = async () => {
    try {
      const chainId = chain?.id;
      if (!address || !chainId) return;

      setButtonText('Signing in...');

      const { signingMessage } = await getSignMessageRequest(address);

      console.log({ signingMessage });
      const signature = await signMessageAsync({ message: signingMessage });
      const verifyRes = await verifySignature(signature, address);
      console.log({ verifyRes });

      sessionStorage.setItem('validatedAddress', address);
      setRequireSign(false);
      setButtonText(connectedText);
    } catch (e) {
      setRequireSign(true);
      setButtonText('Sign Message');
    }
  };

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
        onClick={requireSign ? signIn : () => open()}
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
