import { Badge } from '../ui/badge';
import React from 'react';

export default function SuccessBadge({ children }: { children: React.ReactNode | string }) {
  return <Badge className="capitalize bg-green-300 hover:bg-green-300 text-green-700">{children}</Badge>;
}
