import { IPAPolicy, Policy, RESOURCE_TYPE } from '@/lib/server/types';
import { listResource } from '@/lib/server/sdk';
import PolicyDataViewerComponent from './IPAPolicyDataViewerComponent';

export default async function PolicyDataViewerWrapper({ collectionId, ipId, ...params }: any) {
  const listReq = {
    pagination: {
      limit: 1000,
      offset: 0,
    },
    where: {
      ipId,
    },
  };

  const policyListRes = await listResource(RESOURCE_TYPE.IPA_POLICY, listReq);

  let policyData: IPAPolicy[] = policyListRes.data;

  if (!policyData.length) {
    return <div className="w-full pt-8 text-center text-gray-500">No Policies found</div>;
  }

  return <PolicyDataViewerComponent data={policyData} {...params} />;
}
