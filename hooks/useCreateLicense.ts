import { useCallback, useEffect, useState } from 'react';
import { useWaitForTransaction } from 'wagmi';
import {
  Client,
  CreateIpaBoundLicenseRequest,
  CreateLicenseNftRequest,
  CreateLicenseResponse,
} from '@story-protocol/core-sdk';
import { useStoryClient } from './useStoryClient';

export default function useCreateLicense(createReq: CreateIpaBoundLicenseRequest | CreateLicenseNftRequest) {
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

  const execute = useCallback(async () => {
    try {
      const { txHash, licenseId }: CreateLicenseResponse = await (client as Client).license.create(createReq);
      setIsIdle(false);
      setData(licenseId);
      setTxHash(txHash);
    } catch (e) {
      console.log('Error creating license', e);
      setIsIdle(false);
      setIsError(true);
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
    isLoading,
    isTxSuccess,
    isEventEmitted,
    reset,
  };
}
