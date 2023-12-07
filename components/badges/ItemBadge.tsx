import { Badge } from '../ui/badge';
import { Wand } from 'lucide-react';
import React from 'react';

export default function ItemBadge({ children }: { children: React.ReactNode | string }) {
  return (
    <Badge className="capitalize bg-yellow-200 hover:bg-yellow-200 text-yellow-600">
      <Wand width={12} height={12} />
      <span className="pl-1">{children}</span>
    </Badge>
  );
}
