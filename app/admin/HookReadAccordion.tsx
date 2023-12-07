'use client';
import React from 'react';
import AccordionInputForm from './AccordionInputForm';
import * as z from 'zod';
import { getHook, listHooks } from '@/lib/server/sdk';

export default function HookReadAccordion() {
  const getHookSchema = z.object({
    hookId: z.string().min(1, {
      message: 'Required.',
    }),
  });

  const listHooksSchema = z.object({
    moduleId: z.string().optional(),
  });

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-semibold text-2xl">Hook</h1>
      <AccordionInputForm fcnName={'hook.get'} formSchema={getHookSchema} onSubmitFcn={getHook} />
      <AccordionInputForm fcnName={'hook.list'} formSchema={listHooksSchema} onSubmitFcn={listHooks} />
    </div>
  );
}
