import { useCallback, useState } from 'react';
import { Client } from '@story-protocol/core-sdk';
import { useStoryClientContext } from '@/app/context/StoryClientContext';

export default function useUploadFile() {
  const { client } = useStoryClientContext();
  const [isIdle, setIsIdle] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<string | undefined>(undefined);

  const execute = useCallback(
    async (contentFile: File) => {
      setIsLoading(true);
      try {
        const uploadRes = await (client as Client).platform.uploadFile(contentFile, contentFile.type);
        setIsIdle(false);
        setData(uploadRes.uri);
        setIsSuccess(true);
        setIsLoading(false);
      } catch (e) {
        setIsIdle(false);
        setIsError(true);
        setIsSuccess(false);
        setData(undefined);
        setIsLoading(false);
      }
    },
    [client],
  );

  const reset = () => {
    setIsIdle(true);
    setIsSuccess(false);
    setIsError(false);
    setData(undefined);
  };

  return {
    execute,
    data,
    isLoading,
    isError,
    isSuccess,
    isIdle,
    reset,
  };
}
