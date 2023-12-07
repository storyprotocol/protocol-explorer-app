'use client';
import React from 'react';
import AccordionInputForm from './AccordionInputForm';
import * as z from 'zod';
import { getTransaction, listTransaction } from '@/lib/server/sdk';

export default function TransactionReadAccordion() {
  const transactionGetSchema = z.object({
    transactionId: z.string().min(1, {
      message: 'Required.',
    }),
  });
  const transactionListSchema = z.object({
    ipOrgId: z.string().optional(),
  });

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-semibold text-2xl">Transaction</h1>

      <AccordionInputForm fcnName={'transaction.get'} formSchema={transactionGetSchema} onSubmitFcn={getTransaction} />
      <AccordionInputForm
        fcnName={'transaction.list'}
        formSchema={transactionListSchema}
        onSubmitFcn={listTransaction}
      />
    </div>
  );
}
