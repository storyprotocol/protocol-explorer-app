import { RESOURCE_TYPE, RoyaltyPolicy } from '@/lib/server/types';
import { getResource, listResource } from '@/lib/server/sdk';
import RoyaltyPolicyDataViewerComponent from './RoyaltyPolicyDataViewerComponent';

export default async function RoyaltyPolicyDataViewerWrapper({ royaltyPolicy, ipId, ...params }: any) {
  const listReq = {
    pagination: {
      limit: 1000,
      offset: 0,
    },
    where: {
      // tokenContract: collectionId as Address,
      ipId: ipId,
      // royaltyPolicy,
    },
  };

  const royaltyPolicyRes = await getResource(RESOURCE_TYPE.ROYALTY_POLICY, ipId);

  let royaltyPolicyData: RoyaltyPolicy = royaltyPolicyRes.data;

  console.log({ royaltyPolicyRes });

  if (!royaltyPolicyData) {
    return <div className="w-full pt-8 text-center text-gray-500">No Royalty data found</div>;
  }

  return <RoyaltyPolicyDataViewerComponent data={[royaltyPolicyData]} {...params} />;
}