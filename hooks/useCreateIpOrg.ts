import { useCallback, useEffect, useState } from 'react';
import { useWaitForTransaction } from 'wagmi';
import { Client, CreateIPOrgRequest, CreateIPOrgResponse } from '@story-protocol/core-sdk';
import { useStoryClient } from './useStoryClient';

type ModifiedCreateIPOrgRequest = Omit<CreateIPOrgRequest, 'ipAssetTypes'> & {
  ipAssetTypes: string;
};

export default function useCreateIpOrg(createReq: ModifiedCreateIPOrgRequest) {
  const { client } = useStoryClient();
  const [isIdle, setIsIdle] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState<String | undefined>(undefined);
  const [data, setData] = useState<String | undefined>(undefined);
  const [txHash, setTxHash] = useState<String | undefined>(undefined);
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

  const execute = useCallback(async () => {
    try {
      const formattedReq = {
        ...createReq,
        ipAssetTypes: JSON.parse(createReq.ipAssetTypes),
      };

      const { txHash, ipOrgId }: CreateIPOrgResponse = await (client as Client).ipOrg.create(formattedReq);
      setIsIdle(false);
      setData(ipOrgId);
      setTxHash(txHash);
    } catch (e: unknown) {
      setIsIdle(false);
      setIsError(true);
      if (e instanceof Error) {
        setErrorMsg(e.message);
      } else {
        setErrorMsg('An unknown error occurred');
      }
      setIsSuccess(false);
      setData(undefined);
    }
  }, [client, createReq]);

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
    errorMsg,
    isLoading,
    isTxSuccess,
    isEventEmitted,
    reset,
  };
}
