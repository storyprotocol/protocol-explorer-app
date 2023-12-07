'use client';
import { useCallback, useEffect, useState } from 'react';
import { useWaitForTransaction } from 'wagmi';
import { Client, CreateIpAssetRequest, CreateIpAssetResponse } from '@story-protocol/core-sdk';
import { useStoryClient } from './useStoryClient';

type ModifiedCreateIPAssetRequest = Omit<CreateIpAssetRequest, 'typeIndex'> & {
  typeIndex: string;
};

export default function useCreateIpAsset(createReq?: ModifiedCreateIPAssetRequest) {
  const { client } = useStoryClient();
  const [isIdle, setIsIdle] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<string | undefined>(undefined);
  const [txHash, setTxHash] = useState<string | undefined>(undefined);
  const [events, setEvents] = useState<any[]>([]);
  const [isEventEmitted, setIsEventEmitted] = useState(false);

  const {
    data: txReceipt,
    isError: isTxError,
    isLoading: isLoading,
    isSuccess: isTxSuccess,
  } = useWaitForTransaction({
    hash: txHash as `0x${string}`,
  });

  useEffect(() => {
    setIsSuccess(isTxSuccess);
    setIsError(isTxError);
  }, [isTxSuccess, isTxError]);

  const execute = useCallback(
    async (executeCreateReq?: CreateIpAssetRequest | ModifiedCreateIPAssetRequest) => {
      const _createReq = executeCreateReq || createReq;
      try {
        const formattedReq = {
          ..._createReq!,
          typeIndex:
            typeof _createReq!.typeIndex === 'string' ? parseInt(_createReq!.typeIndex) : _createReq!.typeIndex,
        };

        const createRes: CreateIpAssetResponse = await (client as Client).ipAsset.create(formattedReq);
        setIsIdle(false);
        setData(createRes?.ipAssetId);
        setTxHash(createRes?.txHash);
      } catch (e) {
        setIsIdle(false);
        setIsError(true);
        setIsSuccess(false);
        setData(undefined);
      }
    },
    [client, createReq],
  );

  const reset = () => {
    setIsIdle(true);
    setIsSuccess(false);
    setIsError(false);
    setData(undefined);
    setEvents([]);
    setIsEventEmitted(false);
  };

  return {
    execute,
    data,
    events,
    txReceipt,
    isIdle,
    isSuccess,
    isError,
    isLoading,
    isTxSuccess,
    isEventEmitted,
    reset,
  };
}
