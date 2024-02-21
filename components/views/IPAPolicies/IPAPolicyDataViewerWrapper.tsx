import { IPAPolicy, Policy, RESOURCE_TYPE } from '@/lib/server/types';
import { listResource } from '@/lib/server/sdk';
// import IPAPolicyDataViewerComponent from './IPAPolicyDataViewerComponent';
import PolicyDataViewerComponent from '../Policies/PolicyDataViewerComponent';

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

  const policyListRes = await listResource(RESOURCE_TYPE.POLICY, listReq);

  let policyListData: Policy[] = policyListRes.data;

  const ipaPolicyListRes = await listResource(RESOURCE_TYPE.IPA_POLICY, listReq);

  let policyData: IPAPolicy[] = ipaPolicyListRes.data;

  const intersection = policyListData.filter((policy) => {
    return policyData.some((ipaPolicy) => ipaPolicy.policyId === policy.id);
  });

  console.log({ intersection });

  if (!policyData.length) {
    return <div className="w-full pt-8 text-center text-gray-500">No Policies found</div>;
  }

  return <PolicyDataViewerComponent data={intersection} cardOnly {...params} />;
}
