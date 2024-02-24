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

const policyParametersSchema = z.object({
  attribution: z.boolean().optional(),
  commercialUse: z.boolean().optional(),
  commercialAttribution: z.boolean().optional(),
  commercialRevShare: z.number().min(0).max(100).optional(),
  commercializerChecker: z.string().optional(),
  commercializerCheckerData: z.string().optional(),
  derivativesAllowed: z.boolean().optional(),
  derivativesAttribution: z.boolean().optional(),
  derivativesApproval: z.boolean().optional(),
  derivativesReciprocal: z.boolean().optional(),
  territories: z.array(z.string()).optional(),
  distributionChannels: z.array(z.string()).optional(),
  contentRestrictions: z.array(z.string()).optional(),
});

const registrationParamsSchema = z.object({
  transferable: z.boolean().optional(),
  policy: policyParametersSchema, // Nested policyParameters schema
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

  function onSubmit(values: z.infer<typeof registrationParamsSchema>) {
    // Transform 'true'/'false' string values to boolean for policy parameters
    Object.keys(values.policy).forEach((key) => {
      if (values.policy[key] === 'true') {
        values.policy[key] = true;
      } else if (values.policy[key] === 'false') {
        values.policy[key] = false;
      }
    });

    const policyParameters = {
      attribution: values.policy.attribution || false,
      commercialUse: values.policy.commercialUse || false,
      commercialAttribution: values.policy.commercialAttribution || false,
      commercializerChecker: (values.policy.commercializerChecker || zeroAddress) as Address, // Assuming zeroAddress is a string
      commercializerCheckerData: (values.policy.commercializerCheckerData || '0x') as `0x${string}`, // Validates a string starting with 0x followed by hex characters
      commercialRevShare: values.policy.commercialRevShare || 0, // Assuming this is a percentage
      derivativesAllowed: values.policy.derivativesAllowed || false,
      derivativesAttribution: values.policy.derivativesAttribution || false,
      derivativesApproval: values.policy.derivativesApproval || false,
      derivativesReciprocal: values.policy.derivativesReciprocal || false,
      territories: values.policy.territories || [], // List of strings
      distributionChannels: values.policy.distributionChannels || [], // List of strings
      contentRestrictions: values.policy.contentRestrictions || [], // List of strings, assuming contentRestrictions should be a string array
    };

    console.log('Transformed values', values);
    writeContractAsync({
      args: [
        {
          transferable: values.transferable || true,
          royaltyPolicy: (values.royaltyPolicy || zeroAddress) as Address,
          mintingFee: BigInt(values.mintingFee || 0),
          mintingFeeToken: (values.mintingFeeToken || zeroAddress) as Address,
          policy: policyParameters,
        },
      ],
    });
  }

  const formFields = Object.keys(registrationParamsSchema.shape);

  const placeholders: Record<string, string> = {
    royaltyPolicy: '0x1234...6789', // Assuming royaltyPolicy is a string address
    mintingFee: '1000000000', // Assuming mintingFee is a bigint
    mintingFeeToken:
      '(Optional) The contract address of the ERC20 token used to mint, if applicable. Leave blank otherwise',
    commercializerChecker: '',
    commercializerCheckerData: '',
    commercialRevShare: '5',
    territories: '',
    distributionChannels: '',
    contentRestrictions: '',
  };

  const descriptions: Record<string, string> = {
    transferable: "Select 'true' or 'false' if a policy is transferable",
    royaltyPolicy:
      '(Optional) The contract address of a specific royalty policy, if applicable. Leave blank otherwise.', // Assuming royaltyPolicy is a string address
    mintingFee: '(Optional) The minting fee for the policy, if applicable. Leave blank otherwise.', // Assuming mintingFee is a bigint
    mintingFeeToken:
      '(Optional) The contract address of the ERC20 token used to mint, if applicable. Leave blank otherwise',
    attribution: "Select 'true' or 'false' if using the original IPA requires attribution",
    commercialUse: "Select 'true' or 'false' if commercial use is allowed",
    commercialAttribution:
      "Select 'true' or 'false' if commercial use requires attribution, only if commercialUse is true. ",
    commercializerChecker: 'The commercializer contract address, if applicable. Leave blank otherwise.', // Assuming zeroAddress is a string
    commercializerCheckerData: 'Additional commercializer checker calldata, if applicable. Leave blank otherwise.', // Validates a string starting with 0x followed by hex characters
    commercialRevShare: 'Revenue share in percentage (number), e.g 5. ', // Assuming this is a percentage
    derivativesAllowed: "Select 'true' or 'false' if derivatives are allowed.",
    derivativesAttribution:
      "Select 'true' or 'false' if derivatives require attribution, only if derivativesAllowed is true.",
    derivativesApproval: "Select 'true' or 'false' if derivatives require approval.",
    derivativesReciprocal: "Select 'true' or 'false' if derivatives require reciprocal licensing.",
    territories: 'List of territories where the policy applies, if applicable e.g ["US", "UK"]. Leave blank otherwise.',
    distributionChannels:
      'List of distribution channels, if applicable e.g ["TV", "video games"]. Leave blank otherwise.',
    contentRestrictions:
      "List of content restrictions, if applicable e.g ['No-Hate', 'Suitable-for-All-Ages']. Leave blank otherwise.",
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-sm">
        <PolicyParametersForm control={form.control} descriptions={descriptions} placeholders={placeholders} />

        {formFields.map((fieldName) => {
          if (fieldName !== 'policy') {
            const fieldSchema = registrationParamsSchema.shape[fieldName];
            const isCheckbox =
              fieldSchema instanceof z.ZodOptional && fieldSchema._def.innerType instanceof z.ZodBoolean;
            const fieldType = isCheckbox ? 'boolean' : 'string'; // Adjust this logic based on your actual schema types

            return (
              <FormField
                key={fieldName}
                control={form.control}
                name={fieldName}
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>{`${fieldName}`} </FormLabel>
                    <FormControl>
                      {isCheckbox ? (
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select True/False" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="true">True</SelectItem>
                            <SelectItem value="false">False</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input {...field} placeholder={placeholders[fieldName]} />
                      )}
                    </FormControl>
                    <FormDescription>{descriptions[fieldName]}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          }
        })}
        {txHash ? (
          <Link href={`https://sepolia.etherscan.io/tx/${txHash}`}>
            <Button>View on Etherscan</Button>
          </Link>
        ) : (
          <Button type="submit">{isPendingInWallet ? 'Confirm in wallet' : 'Register IP Asset'}</Button>
        )}
      </form>
    </Form>
  );
}

function PolicyParametersForm({
  control,
  descriptions,
  placeholders,
}: {
  control: any;
  descriptions: Record<string, string>;
  placeholders: Record<string, string>;
}) {
  // Define the fields for the policyParametersSchema
  const policyFields = Object.keys(policyParametersSchema.shape);

  return (
    <>
      {policyFields.map((fieldName) => {
        const fieldSchema = policyParametersSchema.shape[fieldName];
        const isCheckbox = fieldSchema instanceof z.ZodOptional && fieldSchema._def.innerType instanceof z.ZodBoolean;
        const fieldType = isCheckbox ? 'boolean' : 'string'; // Adjust this logic based on your actual schema types

        return (
          <FormField
            key={fieldName}
            control={control}
            name={`policy.${fieldName}`} // Use dot notation for nested fields
            render={({ field }) => (
              <FormItem>
                <FormLabel>{`${fieldName}`}</FormLabel>
                <FormControl>
                  {isCheckbox ? (
                    <Select {...field}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select True/False" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">True</SelectItem>
                        <SelectItem value="false">False</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input {...field} placeholder={placeholders[fieldName]} />
                  )}
                </FormControl>
                <FormDescription>{descriptions[fieldName]}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      })}
    </>
  );
}
