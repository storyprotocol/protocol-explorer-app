'use client';
import React from 'react';
import AccordionInputForm from './AccordionInputForm';
import * as z from 'zod';
import { getModule, listModules } from '@/lib/server/sdk';

export default function ModuleReadAccordion() {
  const getModuleSchema = z.object({
    moduleId: z.string().min(1, {
      message: 'Required.',
    }),
  });

  const listModulesSchema = z.object({
    ipOrgId: z.string().optional(),
  });

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-semibold text-2xl">Module</h1>
      <AccordionInputForm fcnName={'module.get'} formSchema={getModuleSchema} onSubmitFcn={getModule} />
      <AccordionInputForm fcnName={'module.list'} formSchema={listModulesSchema} onSubmitFcn={listModules} />
    </div>
  );
}
