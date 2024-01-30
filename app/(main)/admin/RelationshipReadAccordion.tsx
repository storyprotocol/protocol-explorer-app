'use client';
import React from 'react';
import AccordionInputForm from './AccordionInputForm';
import * as z from 'zod';
import { getRelationship, listRelationship } from '@/lib/server/sdk';

export default function RelationshipReadAccordion() {
  const getRelationshipSchema = z.object({
    relationshipId: z.string().min(1, {
      message: 'Required.',
    }),
  });

  const listRelationshipSchema = z.object({
    tokenId: z.string().min(1, {
      message: 'Required.',
    }),
    contract: z.string().min(1, {
      message: 'Required.',
    }),
  });

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-semibold text-2xl">Relationship</h1>
      <AccordionInputForm
        fcnName={'relationship.get'}
        formSchema={getRelationshipSchema}
        onSubmitFcn={getRelationship}
      />
      <AccordionInputForm
        fcnName={'relationship.list'}
        formSchema={listRelationshipSchema}
        onSubmitFcn={listRelationship}
        defaultValues={{ contract: process.env.NEXT_PUBLIC_IP_ASSET_REGISTRY_CONTRACT }}
      />
    </div>
  );
}
