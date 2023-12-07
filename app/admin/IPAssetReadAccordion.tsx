'use client';
import React from 'react';
import AccordionInputForm from './AccordionInputForm';
import * as z from 'zod';
import { getIpAsset, listIpAsset } from '@/lib/server/sdk';

export default function IPAssetReadAccordion() {
  const getFormSchema = z.object({
    ipAssetId: z.string().min(1, {
      message: 'Required.',
    }),
  });

  const listFormSchema = z.object({
    ipOrgId: z.string().optional(),
  });

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-semibold text-2xl">IP Asset</h1>
      <AccordionInputForm fcnName={'ipAsset.get'} formSchema={getFormSchema} onSubmitFcn={getIpAsset} />
      <AccordionInputForm fcnName={'ipAsset.list'} formSchema={listFormSchema} onSubmitFcn={listIpAsset} />
    </div>
  );
}
