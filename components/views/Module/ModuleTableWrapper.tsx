import React from 'react';
import storyClient from '@/lib/SP';
import ModuleTableComponent from './ModuleTableComponent';

export default async function ModuleTableWrapper({
  pageSize = 20,
}: {
  pageSize?: number;
  collectionId?: string;
  ipAssetId?: string;
}) {
  const req = {
    options: {
      pagination: {
        limit: 100,
        offset: 0,
      },
    },
  };

  const { modules }: ListModuleResponse = await storyClient.module.list(req);

  return (
    <>
      <ModuleTableComponent data={modules} pageSize={pageSize} />
    </>
  );
}
