import { Skeleton } from '@/components/ui/skeleton';
import { listRelationshipType } from '@/lib/server/sdk';
import { ListRelationshipTypesRequest, ListRelationshipTypesResponse } from '@story-protocol/core-sdk';

export const Fallback = () => <Skeleton className=" w-48 h-4" />;

export default async function RelationshipTypes({ ipOrgId }: ListRelationshipTypesRequest) {
  const { relationshipTypes }: ListRelationshipTypesResponse = await listRelationshipType({
    ipOrgId: ipOrgId as string,
  });

  return (
    <div className="flex items-center space-x-2 break-all">
      <span className="shrink truncate">{JSON.stringify(relationshipTypes)}</span>
    </div>
  );
}
