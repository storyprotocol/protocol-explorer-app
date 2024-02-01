'use client';
import React from 'react';
import * as z from 'zod';
import useRegisterRelationshipType from '@/hooks/useRegisterRelationshipType';
import WriteAccordionInputForm from './WriteAccordionInputForm';
import { RegisterRelationshipRequest, Relatables } from '@story-protocol/core-sdk';

export default function RelationshipTypeWriteAccordion({
  defaultValues,
}: {
  defaultValues?: Partial<RegisterRelationshipRequest>;
}) {
  const registerRelationshipTypeSchema = z.object({
    ipOrgId: z.string().min(1, {
      message: 'Required.',
    }),
    relType: z.string().min(1, {
      message: 'Required.',
    }),
    relatedElements: z.object({
      src: z.nativeEnum(Relatables),
      dst: z.nativeEnum(Relatables),
    }),
    allowedSrcIpAssetTypes: z.string(),
    allowedDstIpAssetTypes: z.string(),
  });

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-semibold text-2xl">Relationship Type</h1>
      <WriteAccordionInputForm
        fcnName={'relationshipType.register'}
        formSchema={registerRelationshipTypeSchema}
        hook={useRegisterRelationshipType}
        defaultValues={defaultValues}
      />
    </div>
  );
}
