import React from 'react';
import { Skeleton } from '../ui/skeleton';

export default function SkeletonCard() {
  return (
    <div className="w-full hover:cursor-pointer bg-white rounded-2xl overflow-hidden">
      <span data-state="closed">
        <div className="overflow-hidden aspect-square">
          <Skeleton className="h-full w-full bg-white" />
        </div>
      </span>

      <div className="text-sm px-6 py-4">
        <div className="flex flex-row items-center justify-between">
          <div>
            <h3 className="font-medium leading-none">
              <Skeleton className="h-4 w-[100px] bg-indigo-100" />
            </h3>
            <p className="text-xs text-muted-foreground pt-1">
              <Skeleton className="h-4 w-[80px] bg-indigo-100" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
