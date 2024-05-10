import { Dispute, RESOURCE_TYPE } from '@/lib/server/types';
import { listResource } from '@/lib/server/sdk';
import { Address } from 'viem';
import DisputeDataViewerComponent from './DisputeDataViewerComponent';

export default async function DisputeDataViewerWrapper({ collectionId, ipId, ...params }: any) {
  const listReq = {
    pagination: {
      limit: 1000,
      offset: 0,
    },
    where: {
      tokenContract: collectionId as Address,
      ipId: ipId,
      targetIpId: ipId,
    },
  };

  const disputeListRes = await listResource(RESOURCE_TYPE.DISPUTE, listReq);

  let disputeData: Dispute[] = disputeListRes.data;

  if (!disputeData.length) {
    return <div className="w-full pt-8 text-center text-gray-500">No Disputes found</div>;
  }

  return <DisputeDataViewerComponent data={disputeData} {...params} />;
}
