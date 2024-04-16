'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRegisterRootIp } from '@story-protocol/react';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Address, stringToHex } from 'viem';
import Link from 'next/link';

const formSchema = z.object({
  nftContract: z.string(),
  tokenId: z.string(),
  policyId: z.string(),
  ipName: z.string(),
  contentHash: z.string(),
  externalURL: z.string(),
});

export function RegisterIpAssetForm() {
  const { writeContractAsync, isPending: isPendingInWallet, data: txHash } = useRegisterRootIp();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      policyId: '',
      ipName: '',
      contentHash: '',
      externalURL: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    writeContractAsync({
      args: [
        BigInt(values.policyId),
        values.nftContract as Address,
        BigInt(values.tokenId),
        values.ipName ?? '',
        stringToHex(values.contentHash ?? '', { size: 32 }),
        values.externalURL ?? '',
      ],
    });
  }

  const formFields = Object.keys(formSchema.shape);
  const placeholders: Record<string, string> = {
    policyId: '1',
    nftContract: '0x1234...5678',
    tokenId: '69',
    ipName: 'Bob',
    contentHash: 'foobar',
    externalURL: 'https://example.com/',
  };

  const descriptions: Record<string, string> = {
    policyId:
      '(Optional) This allows you to attach a policy ID (number) to your IP Asset in a single transaction while registering it. If you use a pre-set policy, you can find the policyId here: https://docs.storyprotocol.xyz/docs/preset-pil-policies. Note: Leave blank if not applicable, you can always add a policy ID later on.',
    nftContract: 'Contract address of your NFT (address)',
    tokenId: 'Token ID of your NFT (number)',
    ipName: '(Optional) Enter IP Name. Leave empty if not applicable (string)',
    contentHash: '(Optional) Enter Content Hash. Leave empty if not applicable (string)',
    externalURL: '(Optional) Enter External URL. Leave empty if not applicable (string)',
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {formFields.map((fieldName) => (
          <FormField
            key={fieldName}
            control={form.control}
            name={fieldName as 'policyId' | 'nftContract' | 'tokenId' | 'ipName' | 'contentHash' | 'externalURL'}
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
          {isPendingInWallet ? 'Confirm in wallet' : 'Register IP Asset'}
        </Button>
        {txHash && (
          <Link
            href={`${process.env.NEXT_PUBLIC_EXPLORER_BASE_URL || process.env.EXPLORER_BASE_URL}/tx/${txHash}`}
            target="_blank"
            className="ml-4"
          >
            <Button variant={'etherscan'} type="button">
              View on Etherscan
            </Button>
          </Link>
        )}
      </form>
    </Form>
  );
}
