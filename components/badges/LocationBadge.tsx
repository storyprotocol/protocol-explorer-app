import { Badge } from '../ui/badge';
import { Map } from 'lucide-react';
import React from 'react';

export default function LocationBadge({ children }: { children: React.ReactNode | string }) {
  return (
    <Badge className="capitalize bg-pink-200 hover:bg-pink-200 text-pink-600">
      <Map width={12} height={12} />
      <span className="pl-1">{children}</span>
    </Badge>
  );
}
