//@ts-nocheck
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRegisterPILPolicy } from '@story-protocol/react';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Address, zeroAddress } from 'viem';
import Link from 'next/link';

const registrationParamsSchema = z.object({
  transferable: z.boolean().optional(),
  attribution: z.boolean().optional(),
  commercialUse: z.boolean().optional(),
  commercialAttribution: z.boolean().optional(),
  commercialRevShare: z.string().optional(),
  commercializerChecker: z.string().optional(),
  commercializerCheckerData: z.string().optional(),
  derivativesAllowed: z.boolean().optional(),
  derivativesAttribution: z.boolean().optional(),
  derivativesApproval: z.boolean().optional(),
  derivativesReciprocal: z.boolean().optional(),
  territories: z.string().optional(),
  distributionChannels: z.string().optional(),
  contentRestrictions: z.string().optional(),

  royaltyPolicy: z.string().optional(),
  mintingFee: z.bigint().optional(),
  mintingFeeToken: z.string().optional(),
});

export function RegisterPilPolicyForm() {
  const { writeContractAsync, isPending: isPendingInWallet, data: txHash } = useRegisterPILPolicy();

  const form = useForm<z.infer<typeof registrationParamsSchema>>({
    resolver: zodResolver(registrationParamsSchema),
    defaultValues: {
      // ... your default values
    },
  });
  const commercialUse = form.watch('commercialUse');
  const derivativesAllowed = form.watch('derivativesAllowed');

  function onSubmit(values: z.infer<typeof registrationParamsSchema>) {
    if (values.territories && typeof values.territories === 'string') {
      values.territories = values.territories.split(',').map((s) => s.trim());
    }
    if (values.distributionChannels && typeof values.distributionChannels === 'string') {
      values.distributionChannels = values.distributionChannels.split(',').map((s) => s.trim());
    }
    if (values.contentRestrictions && typeof values.contentRestrictions === 'string') {
      values.contentRestrictions = values.contentRestrictions.split(',').map((s) => s.trim());
    }

    const parseStringToArray = (str: string) => {
      try {
        // Remove the outer double quotes
        const trimmedStr = str.startsWith('"') && str.endsWith('"') ? str.substring(1, str.length - 1) : str;

        // Parse the JSON array
        return JSON.parse(trimmedStr);
      } catch (e) {
        return []; // Return an empty array if parsing fails
      }
    };

    const transformBooleanFields = (obj: any) => {
      console.log('OBJ', obj);
      Object.keys(obj).forEach((key) => {
        console.log('Key', key, obj[key]);

        if (typeof obj[key] === 'object' && obj[key] !== null) {
          transformBooleanFields(obj[key]);
        } else if (obj[key] === 'true' || obj[key] === 'false' || obj[key] === 'True' || obj[key] === 'False') {
          obj[key] = obj[key] === 'true';
        }
      });
    };

    transformBooleanFields(values);
    console.log('Form Values after check', values);

    const submitValues = {
      transferable: values.transferable || true,
      royaltyPolicy: (values.royaltyPolicy ||
        (values.commercialUse ? '0xda483fd6e6ecA1C2D913802F9a6B57a83b73029f' : zeroAddress)) as Address,
      mintingFee: BigInt(values.mintingFee || 0),
      mintingFeeToken: (values.mintingFeeToken || zeroAddress) as Address,
      policy: {
        attribution: values.attribution || false,
        commercialUse: values.commercialUse || false,
        commercialAttribution: values.commercialAttribution || false,
        commercializerChecker: (values.commercializerChecker || zeroAddress) as Address, // Assuming zeroAddress is a string
        commercializerCheckerData: (values.commercializerCheckerData || '0x') as `0x${string}`, // Validates a string starting with 0x followed by hex characters
        commercialRevShare: Number(values.commercialRevShare) || 0, // Assuming this is a percentage
        derivativesAllowed: values.derivativesAllowed || false,
        derivativesAttribution: values.derivativesAttribution || false,
        derivativesApproval: values.derivativesApproval || false,
        derivativesReciprocal: values.derivativesReciprocal || false,
        territories: parseStringToArray(values.territories) || [], // List of strings
        distributionChannels: parseStringToArray(values.distributionChannels) || [], // List of strings
        contentRestrictions: parseStringToArray(values.contentRestrictions) || [], // List of strings, assuming contentRestrictions should be a string array
      },
    };

    console.log('Submit Values', submitValues);
    writeContractAsync({
      args: [submitValues],
    });
  }

  const formFields = Object.keys(registrationParamsSchema.shape);

  const placeholders: Record<string, string> = {
    royaltyPolicy: '0x1234...6789', // Assuming royaltyPolicy is a string address
    mintingFee: '1000000000000000000 (1 WETH, in wei)', // Assuming mintingFee is a bigint
    mintingFeeToken: '0x7b79995e5f793a07bc00c21412e50ecae098e7f9 (WETH)',
    commercializerChecker: '',
    commercializerCheckerData: '',
    commercialRevShare: '0',
    territories: '',
    distributionChannels: '',
    contentRestrictions: '',
  };

  const descriptions: Record<string, string> = {
    transferable: "Select 'true' or 'false' if a policy is transferable",
    royaltyPolicy:
      '(Optional) The contract address of a specific royalty policy, applicable if commercialUse is true. If blank, this defaults to the RoyaltyPolicyLAP contract.', // Assuming royaltyPolicy is a string address
    mintingFee: '(Optional) The minting fee for the policy, if applicable. Leave blank otherwise.', // Assuming mintingFee is a bigint
    mintingFeeToken:
      '(Optional) The contract address of the ERC20 token used to mint, if applicable. Leave blank otherwise',
    attribution: "Select 'true' or 'false' if using the original IPA requires attribution",
    commercialUse: "Select 'true' or 'false' if commercial use is allowed",
    commercialAttribution:
      "Select 'true' or 'false' if commercial use requires attribution, only applicable if commercialUse is true.",
    commercializerChecker:
      'The commercializer contract address, Only applicable if commercialUse is true. Leave blank otherwise.', // Assuming zeroAddress is a string
    commercializerCheckerData:
      'Additional commercializer checker calldata, Only applicable if commercialUse is true. Leave blank otherwise.', // Validates a string starting with 0x followed by hex characters
    commercialRevShare: 'Revenue share in percentage (number), e.g 5. Only applicable if commercialUse is true', // Assuming this is a percentage
    derivativesAllowed: "Select 'true' or 'false' if derivatives are allowed.",
    derivativesAttribution:
      "Select 'true' or 'false' if derivatives require attribution, only applicable if derivativesAllowed is true.",
    derivativesApproval:
      "Select 'true' or 'false' if derivatives require approval, only applicable if derivativesAllowed is true.",
    derivativesReciprocal:
      "Select 'true' or 'false' if derivatives require reciprocal licensing., only applicable if derivativesAllowed is true.",
    territories:
      '(Optional) List of territories where the policy applies, if applicable e.g ["US", "UK"]. Leave blank otherwise.',
    distributionChannels:
      '(Optional) List of distribution channels, if applicable e.g ["TV", "video games"]. Leave blank otherwise.',
    contentRestrictions:
      "(Optional) List of content restrictions, if applicable e.g ['No-Hate', 'Suitable-for-All-Ages']. Leave blank otherwise.",
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-sm">
        {formFields.map((fieldName) => {
          if (fieldName !== 'policy') {
            const fieldSchema = registrationParamsSchema.shape[fieldName];
            const isCheckbox =
              fieldSchema instanceof z.ZodOptional && fieldSchema._def.innerType instanceof z.ZodBoolean;

            if (
              (fieldName === 'commercialRevShare' ||
                fieldName === 'commercialAttribution' ||
                fieldName === 'commercializerChecker' ||
                fieldName === 'commercializerCheckerData' ||
                fieldName === 'royaltyPolicy') &&
              !commercialUse
            ) {
              return null;
            }

            if (
              (fieldName === 'derivativesAttribution' ||
                fieldName === 'derivativesApproval' ||
                fieldName === 'derivativesReciprocal') &&
              !derivativesAllowed
            ) {
              return null;
            }

            return (
              <FormField
                key={fieldName}
                control={form.control}
                name={fieldName as any}
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>{`${fieldName}`} </FormLabel>
                    {isCheckbox ? (
                      <Select onValueChange={(value) => field.onChange(value === 'true')}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select True/False" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="true">True</SelectItem>
                          <SelectItem value="false">False</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <FormControl>
                        <Input {...field} placeholder={placeholders[fieldName]} />
                      </FormControl>
                    )}
                    <FormDescription>{descriptions[fieldName]}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          }
        })}
        <Button type="submit" variant={'register'}>
          {isPendingInWallet ? 'Confirm in wallet' : 'Register PIL Policy'}
        </Button>
        {txHash && (
          <Link href={`https://sepolia.etherscan.io/tx/${txHash}`} target="_blank" className="ml-4">
            <Button variant={'etherscan'} type="button">
              View on Etherscan
            </Button>
          </Link>
        )}
      </form>
    </Form>
  );
}
