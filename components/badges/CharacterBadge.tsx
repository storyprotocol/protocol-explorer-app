import { Badge } from '../ui/badge';
import { User } from 'lucide-react';
import React from 'react';

export default function CharacterBadge({ children }: { children: React.ReactNode | string }) {
  return (
    <Badge className="capitalize bg-purple-200 hover:bg-purple-200 text-purple-600">
      <User width={12} height={12} />
      <span className="pl-1">{children}</span>
    </Badge>
  );
}
