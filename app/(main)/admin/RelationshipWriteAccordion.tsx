'use client';
import React from 'react';
import * as z from 'zod';
import useRegisterRelationship from '@/hooks/useRegisterRelationship';
import WriteAccordionInputForm from './WriteAccordionInputForm';
import { RegisterRelationshipRequest } from '@story-protocol/core-sdk';

export default function RelationshipWriteAccordion({
  defaultValues,
}: {
  defaultValues?: Partial<RegisterRelationshipRequest>;
}) {
  const registerRelationshipSchema = z.object({
    ipOrgId: z.string().min(1, {
      message: 'Required.',
    }),
    relType: z.string().min(1, {
      message: 'Required.',
    }),
    srcContract: z.string().min(1, {
      message: 'Required.',
    }),
    srcTokenId: z.string().min(1, {
      message: 'Required.',
    }),
    dstContract: z.string().min(1, {
      message: 'Required.',
    }),
    dstTokenId: z.string().min(1, {
      message: 'Required.',
    }),
  });

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-semibold text-2xl">Relationship</h1>
      <WriteAccordionInputForm
        fcnName={'relationship.register'}
        formSchema={registerRelationshipSchema}
        hook={useRegisterRelationship}
        defaultValues={defaultValues}
      />
    </div>
  );
}
