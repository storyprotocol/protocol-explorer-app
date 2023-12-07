import { cn } from '@/utils';
import React from 'react';

export default function CardContainer({ children, className = '' }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('relative rounded-xl px-6 py-2 bg-[#FFFFFF] dark:bg-[#2C2B35] w-full', className)}>
      {children}
    </div>
  );
}
