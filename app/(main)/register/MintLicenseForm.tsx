'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useMintLicense } from '@story-protocol/react';
import { useAccount } from 'wagmi'; // Make sure to import useAccount

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Address } from 'viem';
import Link from 'next/link';

const formSchema = z.object({
  ipId: z.string(), // Added field for ipId
  policyId: z.string(),
  amount: z.bigint(), // Added field for amount
  royaltyContext: z.string().optional(), // Added field for royaltyContext
});

export function MintLicenseForm() {
  const { writeContractAsync, isPending: isPendingInWallet, data: txHash } = useMintLicense();
  const { address } = useAccount(); // Get the user's address

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // ... default values for your form fields
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    writeContractAsync({
      args: [
        BigInt(values.policyId),
        values.ipId as Address,
        BigInt(values.amount),
        address as Address, // Using the user's address as minter
        (values.royaltyContext ?? '0x') as `0x${string}`, // Defaulting to '0x' if undefined
      ],
    });
  }

  const formFields = Object.keys(formSchema.shape);
  //amount 是一个数字，那么 placeholders 应该重新定义


  const placeholders: Record<string, string> = {
    policyId: '1',
    ipId: '0x123...456', // Added field for ipId
    amount: '1', // Added field for amount
    royaltyContext: '', // Added field for royaltyContext
  };
  const descriptions: Record<string, string> = {
    policyId:
      'Enter the policyId that the minted license will adhere to (number). This policyId must be attached to the IP Asset before minting the license.',
    ipId: 'Enter your IP Asset ID here (address). This is the contract address of your IPAccount that is deployed when you register your NFT as an IP Asset',
    amount: 'Number of licenses to mint', // Added field for amount
    royaltyContext: '(Optional) Additional royalty calldata. Leave blank if not applicable.', // Added field for royaltyContext
  };

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
        <Button type="submit" variant={'register'}>
          {isPendingInWallet ? 'Confirm in wallet' : 'Mint License'}
        </Button>
        {txHash && (
          <Link href={`https://sepolia.etherscan.io/tx/${txHash}`} target="_blank" className="ml-4">
            <Button variant={'etherscan'}>View on Etherscan</Button>
          </Link>
        )}
      </form>
    </Form>
  );
}
