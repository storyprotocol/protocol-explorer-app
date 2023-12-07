import { Badge } from '../ui/badge';
import { BookIcon } from 'lucide-react';
import React from 'react';

export default function StoryBadge({ children }: { children: React.ReactNode | string }) {
  return (
    <Badge className="capitalize bg-blue-200 hover:bg-blue-200 text-blue-600">
      <BookIcon width={12} height={12} />
      <span className="pl-1">{children}</span>
    </Badge>
  );
}
