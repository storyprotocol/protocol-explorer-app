'use client';
import React from 'react';
import AccordionInputForm from './AccordionInputForm';
import * as z from 'zod';
import { getIpOrg, listIpOrg } from '@/lib/server/sdk';

export default function IpOrgReadAccordion() {
  const getFormSchema = z.object({
    ipOrgId: z.string().min(1, {
      message: 'Required.',
    }),
  });

  const listFormSchema = z.object({});

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-semibold text-2xl">IP Org</h1>
      <AccordionInputForm fcnName={'ipOrg.get'} formSchema={getFormSchema} onSubmitFcn={getIpOrg} />
      <AccordionInputForm fcnName={'ipOrg.list'} formSchema={listFormSchema} onSubmitFcn={listIpOrg} />
    </div>
  );
}
