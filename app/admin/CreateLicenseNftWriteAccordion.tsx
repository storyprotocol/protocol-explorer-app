'use client';
import React from 'react';
import * as z from 'zod';
import WriteAccordionInputForm from './WriteAccordionInputForm';
import { CreateLicenseRequest } from '@story-protocol/core-sdk';
import useCreateLicense from '@/hooks/useCreateLicense';

export default function CreateLicenseNftWriteAccordion({
  defaultValues,
}: {
  defaultValues: Partial<CreateLicenseRequest>;
}) {
  const createIpaBoundLicenseSchema = z.object({
    ipOrgId: z.string().min(1, {
      message: 'Required.',
    }),
  });

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-semibold text-2xl">License</h1>
      <WriteAccordionInputForm
        fcnName={'license.create'}
        description={'To create an IP Asset within this IP Organization (IPO), the IPO must be configured to allow it.'}
        formSchema={createIpaBoundLicenseSchema}
        hook={useCreateLicense}
        defaultValues={defaultValues}
      />
    </div>
  );
}
