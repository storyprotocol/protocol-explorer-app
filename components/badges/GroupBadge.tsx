import { Badge } from '../ui/badge';
import { Group } from 'lucide-react';
import React from 'react';

export default function GroupBadge({ children }: { children: React.ReactNode | string }) {
  return (
    <Badge className="capitalize bg-teal-200 hover:bg-teal-200 text-teal-600">
      <Group width={12} height={12} />
      <span className="pl-1">{children}</span>
    </Badge>
  );
}
