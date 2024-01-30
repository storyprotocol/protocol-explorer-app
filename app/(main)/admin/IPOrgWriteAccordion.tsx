'use client';
import React from 'react';
import * as z from 'zod';
import WriteAccordionInputForm from './WriteAccordionInputForm';
import { CreateIPOrgRequest } from '@story-protocol/core-sdk';
import useCreateIpOrg from '@/hooks/useCreateIpOrg';

export default function IpOrgWriteAccordion({ defaultValues }: { defaultValues?: Partial<CreateIPOrgRequest> }) {
  const createSchema = z.object({
    name: z.string().min(1, {
      message: 'Required.',
    }),
    symbol: z.string().min(1, {
      message: 'Required.',
    }),
    ipAssetTypes: z.string(),
  });

  const descriptions = {
    ipAssetTypes: 'An array of IP Asset types that this IP Org will be able to create.',
  };

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-semibold text-2xl">IP Org</h1>
      <WriteAccordionInputForm
        fcnName={'ipOrg.create'}
        description={'To create an IP Org within this IP Organization (IPO), the IPO must be configured to allow it.'}
        formSchema={createSchema}
        hook={useCreateIpOrg}
        defaultValues={defaultValues}
        descriptions={descriptions}
        placeholders={{ ipAssetTypes: '["STORY", "CHARACTER"]' }}
      />
    </div>
  );
}
