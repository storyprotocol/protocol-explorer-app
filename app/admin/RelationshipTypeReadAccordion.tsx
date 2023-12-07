'use client';
import React from 'react';
import AccordionInputForm from './AccordionInputForm';
import * as z from 'zod';
import { getRelationshipType, listRelationshipType } from '@/lib/server/sdk';

export default function RelationshipTypeReadAccordion() {
  const getRelationshipTypeSchema = z.object({
    ipOrgId: z.string().min(1, {
      message: 'Required.',
    }),
    relType: z.string().min(1, {
      message: 'Required.',
    }),
  });

  const listRelationshipTypeSchema = z.object({
    ipOrgId: z.string().optional(),
  });

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-semibold text-2xl">Relationship Type</h1>
      <AccordionInputForm
        fcnName={'relationshipType.get'}
        formSchema={getRelationshipTypeSchema}
        onSubmitFcn={getRelationshipType}
      />
      <AccordionInputForm
        fcnName={'relationshipType.list'}
        formSchema={listRelationshipTypeSchema}
        onSubmitFcn={listRelationshipType}
      />
    </div>
  );
}
