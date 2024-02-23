import React, { ReactNode } from 'react';
import { cn } from '@/utils';

export default function Grid({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <ul
      role="list"
      className={cn(
        'grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 2xl:grid-cols-6 w-full py-5',
        className,
      )}
    >
      {children}
    </ul>
  );
}
