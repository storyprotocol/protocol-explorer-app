'use client';
import React from 'react';
import AccordionInputForm from './AccordionInputForm';
import * as z from 'zod';
import { getLicense, listLicense } from '@/lib/server/sdk';
import { ListLicenseRequest } from '@story-protocol/core-sdk';

export default function LicenseReadAccordion({ defaultValues }: { defaultValues?: Partial<ListLicenseRequest> }) {
  const getFormSchema = z.object({
    licenseId: z.string().min(1, {
      message: 'Required.',
    }),
  });

  const listFormSchema = z.object({
    ipAssetId: z.string().min(1, {
      message: 'Required.',
    }),
    ipOrgId: z.string().min(1, {
      message: 'Required.',
    }),
  });

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-semibold text-2xl">License</h1>
      <AccordionInputForm
        fcnName={'license.get'}
        formSchema={getFormSchema}
        onSubmitFcn={getLicense}
        defaultValues={defaultValues}
      />
      <AccordionInputForm
        fcnName={'license.list'}
        formSchema={listFormSchema}
        onSubmitFcn={listLicense}
        defaultValues={defaultValues}
      />
    </div>
  );
}
