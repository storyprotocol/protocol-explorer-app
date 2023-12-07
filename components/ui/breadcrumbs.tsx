'use client';

import * as React from 'react';
// import * as LabelPrimitive from '@radix-ui/react-label';
// import { cva, type VariantProps } from 'class-variance-authority';

import { ChevronRight } from 'lucide-react';

import { cn } from '@/utils';
import Link from 'next/link';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
export interface BreadcrumbProps {
  className?: string;
  crumbs: {
    name: string;
    url?: string;
  }[];
}

const Breadcrumbs = React.forwardRef<HTMLInputElement, BreadcrumbProps>(({ className, crumbs }, ref) => {
  return (
    <div className={cn('flex h-6 text-gray-500', className)} ref={ref}>
      {crumbs.map((crumb, index) => (
        <span key={index} className="flex items-center">
          {crumb.url ? (
            <Link href={crumb.url} className="">
              {crumb.name}
            </Link>
          ) : (
            <span>{crumb.name}</span>
          )}
          {index !== crumbs.length - 1 && (
            <ChevronRight className="inline-block w-3 h-3 md:w-4 md:h-4 mx-0.5 md:mx-1" />
          )}
        </span>
      ))}
    </div>
  );
});
Breadcrumbs.displayName = 'Breadcrumbs';

export { Breadcrumbs };
