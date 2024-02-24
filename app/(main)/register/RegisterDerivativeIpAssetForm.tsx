'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRegisterDerivativeIp } from '@story-protocol/react';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Address, stringToHex } from 'viem';

const formSchema = z.object({
  licenseIds: z.string(), // Changed to string
  nftTokenId: z.string(),
  nftContract: z.string(),
  ipName: z.string(),
  contentHash: z.string(),
  externalUrl: z.string(),
  royaltyContext: z.string(),
});

export function RegisterDerivativeIpAssetForm() {
  const { writeContractAsync, isPending: isPendingInWallet, data: txHash } = useRegisterDerivativeIp();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    let parsedLicenseIds = [];
    try {
      parsedLicenseIds = JSON.parse(values.licenseIds);
    } catch (e) {
      console.error('Failed to parse licenseIds:', e);
      // Handle parsing error (e.g., show a message to the user)
      return;
    }

    const licenseIdsBigInt = parsedLicenseIds.map((id) => BigInt(id));
    writeContractAsync({
      args: [
        licenseIdsBigInt,
        values.nftContract as Address,
        BigInt(values.nftTokenId),
        values.ipName ?? '',
        stringToHex(values.contentHash ?? '', { size: 32 }),
        values.externalUrl ?? '',
        (values.royaltyContext ?? '0x') as `0x${string}`,
      ],
    });
  }

  const formFields = Object.keys(formSchema.shape);
  const placeholders: Record<string, string> = {
    licenseIds: '["1"]',
    nftTokenId: 'Enter NFT Token ID',
    nftContract: '0x1234...5678',
    ipName: '',
    contentHash: '',
    externalUrl: '',
    royaltyContext: '',
  };
  const descriptions: Record<string, string> = {
    licenseIds:
      'Enter License IDs for the derivative IP Asset. In most cases, this will be a single licenseId ["1"], but if there are multiple "parent" licenses, you can pass in multiple licenseIds ["1", "5"]. ',
    nftTokenId: "Enter the derivative's NFT token ID, e.g 5 (number)",
    nftContract: "Enter the derivative's NFT contract address, e.g 0x123...567 (address)",
    ipName: '(Optional) Enter IP Name if applicable. Leave blank otherwise.',
    contentHash: '(Optional) Enter Content Hash if applicable. Leave blank otherwise.',
    externalUrl: '(Optional) Enter External URL if applicable. Leave blank otherwise.',
    royaltyContext: '(Optional) Enter Royalty Context if applicable. Leave blank otherwise.',
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {formFields.map((fieldName) => (
          <FormField
            key={fieldName}
            control={form.control}
            name={fieldName}
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>{fieldName}</FormLabel>
                <FormControl>
                  <Input placeholder={placeholders[fieldName]} {...field} className="" />
                </FormControl>
                <FormDescription>{descriptions[fieldName]}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit">{isPendingInWallet ? 'Confirm in wallet' : 'Register Derivative IP'}</Button>
      </form>
    </Form>
  );
}
