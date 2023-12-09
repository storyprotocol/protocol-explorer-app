import storyClient from '@/lib/SP';
import React from 'react';
import IPOrgDataViewerComponent from '@/components/views/IPOrg/IPOrgDataViewerComponent';
import { ListIPOrgResponse } from '@story-protocol/core-sdk';

export default async function IPOrgDataViewerWrapper({
  tableOnly,
  gridOnly,
  pageSize,
}: {
  tableOnly?: boolean;
  gridOnly?: boolean;
  pageSize?: number;
}) {
  const data: ListIPOrgResponse = await storyClient.ipOrg.list({});
  const ipOrgData = data?.ipOrgs;
  // crude sort, TODO: make this better
  // ipOrgData.sort((a: IPOrg, b: IPOrg) => parseInt(b.id) - parseInt(a.id));

  return <IPOrgDataViewerComponent data={ipOrgData} tableOnly={tableOnly} gridOnly={gridOnly} pageSize={pageSize} />;
}
