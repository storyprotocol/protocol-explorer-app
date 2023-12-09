import { useCallback, useEffect, useState } from 'react';
import { useWaitForTransaction } from 'wagmi';
import { Client, RegisterRelationshipTypeRequest, RegisterRelationshipTypeResponse } from '@story-protocol/core-sdk';
import { useStoryClient } from './useStoryClient';

type ModifiedRegisterRelationshipTypeRequest = Omit<
  RegisterRelationshipTypeRequest,
  'relatedElements' | 'allowedSrcIpAssetTypes' | 'allowedDstIpAssetTypes'
> & {
  relatedElements: {
    src: string;
    dst: string;
  };
  allowedSrcIpAssetTypes: string;
  allowedDstIpAssetTypes: string;
};

export default function useRegisterRelationshipType(registerReq: ModifiedRegisterRelationshipTypeRequest) {
  const { client } = useStoryClient();
  const [isIdle, setIsIdle] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState<String | undefined>(undefined);
  const [data, setData] = useState<boolean | undefined>(undefined);
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
        ...registerReq,
        relatedElements: {
          src: parseInt(registerReq.relatedElements.src),
          dst: parseInt(registerReq.relatedElements.dst),
        },
        allowedSrcIpAssetTypes: JSON.parse(registerReq.allowedSrcIpAssetTypes),
        allowedDstIpAssetTypes: JSON.parse(registerReq.allowedDstIpAssetTypes),
      };

      const { txHash, success }: RegisterRelationshipTypeResponse = await (client as Client).relationshipType.register(
        formattedReq,
      );

      setIsIdle(false);
      setData(success);
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
  }, [client, registerReq]);

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
