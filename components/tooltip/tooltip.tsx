import React from 'react';
import { TooltipProvider, TooltipTrigger, Tooltip, TooltipContent } from '@/components/ui/tooltip';

export default function TooltipWrapper({ children, content }: { children: React.ReactNode; content: React.ReactNode }) {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent className="bg-black text-white text-xs font-sans rounded-sm p-0.5 px-1">
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
