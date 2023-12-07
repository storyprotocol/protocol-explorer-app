import { Suspense } from 'react';
import AssetDataViewer from '@/components/views/Asset';
import SkeletonGrid from '@/components/Skeletons/SkeletonGrid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';

export default function Assets() {
  return (
    <div>
      <div className="w-full p-4 md:p-8 max-w-[1600px] mx-auto">
        <div className="flex flex-col items-left gap-6 mb-6">
          <h1 className="text-xl md:text-4xl font-semibold leading-none">IP Assets</h1>
        </div>

        <div className="grid grid-cols-12 gap-2">
          <div className="flex col-span-12">
            <Tabs defaultValue="all" className="w-full">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <Suspense
                  fallback={
                    <div className="flex flex-col">
                      <Skeleton className="h-9 w-24 bg-white" />
                      <SkeletonGrid />
                    </div>
                  }
                >
                  <AssetDataViewer />
                </Suspense>
              </TabsContent>
              <TabsContent value="story">
                <Suspense
                  fallback={
                    <div className="flex flex-col">
                      <Skeleton className="h-9 w-24 bg-white" />
                      <SkeletonGrid />
                    </div>
                  }
                >
                  <AssetDataViewer />
                </Suspense>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
