import { useCallback, useEffect, useState } from 'react';
import { useWaitForTransaction } from 'wagmi';
import { Client, ConfigureLicenseRequest } from '@story-protocol/core-sdk';
import { useStoryClient } from './useStoryClient';

export default function useConfigureLicense(configureReq: ConfigureLicenseRequest) {
  const { client } = useStoryClient();
  const [isIdle, setIsIdle] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
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

  console.log('Hook Configure Request: ', configureReq);
  const execute = useCallback(async () => {
    try {
      const { txHash } = await (client as Client).license.configure(configureReq);
      setIsIdle(false);
      setTxHash(txHash);
    } catch (e) {
      console.log('Error creating license', e);
      setIsIdle(false);
      setIsError(true);
      setIsSuccess(false);
      setData(undefined);
    }
  }, [client, configureReq]);

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
