import { Badge } from '../ui/badge';
import { Paintbrush } from 'lucide-react';
import React from 'react';

export default function ArtBadge({ children }: { children: React.ReactNode | string }) {
  return (
    <Badge className="capitalize bg-orange-200 hover:bg-orange-200 text-orange-600">
      <Paintbrush width={12} height={12} />
      <span className="pl-1">{children}</span>
    </Badge>
  );
}
