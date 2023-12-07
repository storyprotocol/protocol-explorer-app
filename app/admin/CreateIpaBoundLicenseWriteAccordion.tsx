'use client';
import React from 'react';
import * as z from 'zod';
import WriteAccordionInputForm from './WriteAccordionInputForm';
import { CreateIpAssetRequest } from '@story-protocol/core-sdk';
import useCreateLicense from '@/hooks/useCreateLicense';

export default function CreateIpaBoundLicenseWriteAccordion({
  defaultValues,
}: {
  defaultValues?: Partial<CreateIpAssetRequest>;
}) {
  const createIpaBoundLicenseSchema = z.object({
    ipOrgId: z.string().min(1, {
      message: 'Required.',
    }),
    ipaId: z.number(),
  });

  return (
    <div className="flex flex-col gap-2">
      <WriteAccordionInputForm
        fcnName={'license.create (IPA-bound license)'}
        description={'To create an IP Asset within this IP Organization (IPO), the IPO must be configured to allow it.'}
        formSchema={createIpaBoundLicenseSchema}
        hook={useCreateLicense}
        defaultValues={defaultValues}
      />
    </div>
  );
}
