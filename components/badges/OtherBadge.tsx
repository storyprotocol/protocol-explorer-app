import { Badge } from '../ui/badge';
import { BookIcon } from 'lucide-react';
import React from 'react';

export default function OtherBadge({ children }: { children: React.ReactNode | string }) {
  return (
    <Badge className="capitalize bg-gray-200 hover:bg-gray-200 text-gray-600">
      <BookIcon width={12} height={12} />
      <span className="pl-1">{children}</span>
    </Badge>
  );
}
