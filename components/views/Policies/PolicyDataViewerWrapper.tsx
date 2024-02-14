import { Asset, Policy, RESOURCE_TYPE } from '@/lib/server/types';
import { listResource } from '@/lib/server/sdk';
import { Address } from 'viem';
import PolicyDataViewerComponent from './PolicyDataViewerComponent';

export default async function PolicyDataViewerWrapper({ collectionId, ipId, ...params }: any) {
  const listReq = {
    pagination: {
      limit: 1000,
      offset: 0,
    },
    where: {
      tokenContract: collectionId as Address,
      ipId: ipId,
    },
  };

  const policyListRes = await listResource(RESOURCE_TYPE.POLICY, listReq);

  let policyData: Policy[] = policyListRes.data;

  if (!policyData.length) {
    return <div className="w-full pt-8 text-center text-gray-500">No Policies found</div>;
  }

  return <PolicyDataViewerComponent data={policyData} {...params} />;
}
