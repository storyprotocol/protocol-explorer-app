import { Permission, RESOURCE_TYPE } from '@/lib/server/types';
import { listResource } from '@/lib/server/sdk';
import { Address } from 'viem';
import PermissionDataViewerComponent from './PermissionDataViewerComponent';

export default async function PermissionDataViewerWrapper({ collectionId, ipId, ...params }: any) {
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

  const permissionListRes = await listResource(RESOURCE_TYPE.PERMISSION, listReq);

  let permissionData: Permission[] = permissionListRes.data;

  if (!permissionData.length) {
    return <div className="w-full pt-8 text-center text-gray-500">No Policies found</div>;
  }

  return <PermissionDataViewerComponent data={permissionData} {...params} />;
}
