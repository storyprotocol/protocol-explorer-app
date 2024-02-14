import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronRight } from 'lucide-react';

export const Fallback = () => (
  <div className="flex h-6 md:mb-2 items-center">
    <Skeleton className="h-4 w-[100px] bg-white" />
    <ChevronRight className="inline-block w-4 h-4 mx-1 text-white" />
    <Skeleton className="h-4 w-[100px] bg-white" />
  </div>
);

export default async function CollectionBreadcrumbs({ collectionId }: { collectionId: string }) {
  if (!collectionId) {
    console.log('No Collection found for id: ' + collectionId);
    return <Fallback />;
  }

  return (
    <Breadcrumbs
      crumbs={[{ url: '/collections', name: 'Collections' }, { name: collectionId }]}
      className="md:mb-2 text-white text-xs md:text-lg"
    />
  );
}
