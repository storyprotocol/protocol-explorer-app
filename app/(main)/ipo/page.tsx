import { Suspense } from 'react';
import IPOrgDataViewer from '@/components/views/IPOrg';
import SkeletonGrid from '@/components/Skeletons/SkeletonGrid';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import IpOrgWriteAccordion from '@/app/(main)/admin/IPOrgWriteAccordion';
export const revalidate = 60;
export const fetchCache = 'force-no-store';

export default async function IPOrgsPage() {
  return (
    <div>
      <div className="w-full p-4 md:p-8 max-w-[1600px] mx-auto">
        <div className="flex flex-col items-left gap-6 mb-6">
          <h1 className="text-xl md:text-4xl font-semibold leading-none">IP Organizations</h1>
        </div>

        <div className="flex flex-col items-left gap-2 mt-6">
          <Suspense
            fallback={
              <div className="flex flex-col">
                <Skeleton className="h-9 w-24 bg-white" />
                <SkeletonGrid />
              </div>
            }
          >
            <Tabs defaultValue="view-all">
              <TabsList>
                <TabsTrigger value="view-all">All</TabsTrigger>
                <TabsTrigger value="write">Actions</TabsTrigger>
              </TabsList>
              <TabsContent value="view-all">
                <IPOrgDataViewer />
              </TabsContent>
              <TabsContent value="write">
                <IpOrgWriteAccordion />
              </TabsContent>
            </Tabs>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
