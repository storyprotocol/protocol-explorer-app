'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAddPolicyToIp } from '@story-protocol/react'; // Import useAddPolicyToIp

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Address } from 'viem';
import Link from 'next/link';

const formSchema = z.object({
  ipId: z.string(), // Add ipId field
  policyId: z.string(), // Add policyId field
});

export function AddPolicyToIpAssetForm() {
  const { writeContractAsync, isPending: isPendingInWallet, data: txHash } = useAddPolicyToIp(); // Use useAddPolicyToIp hook

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      policyId: '1',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    writeContractAsync({
      args: [
        values.ipId as Address, // Use ipId
        BigInt(values.policyId), // Use policyId
        // ... other arguments
      ],
    });
  }

  const placeholders: Record<string, string> = {
    ipId: '0x1234...5678',
    policyId: '1',
  };

  const descriptions: Record<string, string> = {
    ipId: 'Enter your IP Asset ID here (address). This is the contract address of your IPAccount that is deployed when you register your NFT as an IP Asset',
    policyId:
      'Enter Policy ID (number). If you use a pre-set policy, you can find the policyId here: https://docs.storyprotocol.xyz/docs/pil-flavors-preset-policy.',
  };

  const formFields = Object.keys(formSchema.shape);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {formFields.map((fieldName) => (
          <FormField
            key={fieldName}
            control={form.control}
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
        {txHash ? (
          <Link href={`https://sepolia.etherscan.io/tx/${txHash}`}>
            <Button>View on Etherscan</Button>
          </Link>
        ) : (
          <Button type="submit">{isPendingInWallet ? 'Confirm in wallet' : 'Add Policy to IPA'}</Button>
        )}
      </form>
    </Form>
  );
}
