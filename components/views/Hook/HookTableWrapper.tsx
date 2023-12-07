import React from 'react';
import HookTableComponent from './HookTableComponent';
import { ListHookResponse } from '@story-protocol/core-sdk';
import storyClient from '@/lib/SP';

export default async function HookTableWrapper({
  pageSize = 20,
}: {
  pageSize?: number;
  ipOrgId?: string;
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

  const { hooks }: ListHookResponse = await storyClient.hook.list(req);

  return (
    <>
      <HookTableComponent data={hooks} pageSize={pageSize} />
    </>
  );
}
