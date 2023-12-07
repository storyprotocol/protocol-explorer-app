'use client';
import React from 'react';
import * as z from 'zod';
import WriteAccordionInputForm from './WriteAccordionInputForm';
import { CreateIpAssetRequest } from '@story-protocol/core-sdk';
import useCreateIpAsset from '@/hooks/useCreateIpAsset';

export default function IPAssetWriteAccordion({ defaultValues }: { defaultValues?: Partial<CreateIpAssetRequest> }) {
  const createSchema = z.object({
    ipOrgId: z.string().min(1, {
      message: 'Required.',
    }),
    typeIndex: z.string().min(1, {
      message: 'Required.',
    }),
    name: z.string().min(1, {
      message: 'Required.',
    }),
    mediaUrl: z.string().min(1, {
      message: 'Required.',
    }),
  });

  const descriptions = {
    ipOrgId: 'The address of the IP Org',
    typeIndex:
      'The enum number that corresponds to the type of IP Asset within that IP Org, use relationshipType.list() to find the enum number.',
    name: 'The name of the IP Asset',
    mediaUrl: 'The URL of the metadata that contains the IP Asset information',
  };

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-semibold text-2xl">IP Asset</h1>
      <WriteAccordionInputForm
        fcnName={'ipAsset.create'}
        description={'To create an IP Asset within this IP Organization (IPO), the IPO must be configured to allow it.'}
        formSchema={createSchema}
        hook={useCreateIpAsset}
        defaultValues={defaultValues}
        descriptions={descriptions}
      />
    </div>
  );
}
