'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useReadIpAssetRegistryIpId, useReadIpAssetRegistryIsRegistered } from '@story-protocol/react';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useChainId } from 'wagmi';
import { useEffect, useState } from 'react';
import { Address, zeroAddress } from 'viem';

const formSchema = z.object({
  nftAddress: z.string(),
  tokenId: z.string(),
});

export function ReadIpIdForm() {
  const chainId = useChainId();
  const [result, setResult] = useState<Address | null>(null);
  const [displayIpId, setDisplayIpId] = useState(false);

  const { control, handleSubmit, watch } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const nftAddress = watch('nftAddress'); // We use watch to get the current value
  const tokenId = watch('tokenId');

  const {
    data: licensorIpId,
    isFetching: isFetchingIpId,
    isPending: isPendingIpId,
  } = useReadIpAssetRegistryIpId({
    args: [BigInt(chainId), nftAddress as Address, BigInt(tokenId || 0)],
  });

  const {
    data: isRegistered,
    isFetching: isFetchingIsRegistered,
    isPending: isPendingIsRegistered,
  } = useReadIpAssetRegistryIsRegistered({
    args: [licensorIpId ? licensorIpId : zeroAddress],
  });

  useEffect(() => {
    if (licensorIpId) {
      setResult(licensorIpId);
    }
  }, [licensorIpId]);

  function onSubmit() {
    setDisplayIpId(true);
  }

  const formFields = Object.keys(formSchema.shape);
  const placeholders: Record<string, string> = {
    nftAddress: '0x123...456',
    tokenId: '1',
  };
  const descriptions: Record<string, string> = {
    nftAddress: 'Enter the NFT contract address',
    tokenId: 'Enter the NFT token ID',
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {formFields.map((fieldName) => (
            <FormField
              key={fieldName}
              control={control}
              name={fieldName as keyof typeof formSchema.shape}
              render={({ field }: { field: any }) => (
                <FormItem>
                  <FormLabel>{fieldName}</FormLabel>
                  <FormControl>
                    <Input placeholder={placeholders[fieldName]} {...field} />
                  </FormControl>
                  <FormDescription>{descriptions[fieldName]}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button type="submit" variant={'register'}>
            {'Get IP ID'}
          </Button>
          {displayIpId ? (
            isFetchingIpId || isPendingIpId || isFetchingIsRegistered || isPendingIsRegistered ? (
              <p>Reading...</p>
            ) : isRegistered ? (
              <div>
                <p>IP ID Result:</p>
                <p>{result}</p>
              </div>
            ) : (
              <div>IP ID not registered for this token</div>
            )
          ) : null}
        </form>
      </Form>
    </>
  );
}
