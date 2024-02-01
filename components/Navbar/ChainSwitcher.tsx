import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useRouter } from 'next/navigation';
import { LinkIcon } from '@heroicons/react/24/outline';

export default function ChainSwitcher() {
  const router = useRouter();
  return (
    <>
      <Select
        defaultValue={`${process.env.NEXT_PUBLIC_PROTOCOL_VERSION}-${process.env.NEXT_PUBLIC_CHAIN}`}
        onValueChange={(value) => {
          if (value === 'alpha-mumbai') {
            router.push('https://am-explorer.storyprotocol.xyz');
          } else if (value === 'alpha-sepolia') {
            router.push('https://as-explorer.storyprotocol.xyz');
          } else if (value === 'beta-sepolia') {
            router.push('https://bs-explorer.storyprotocol.xyz');
          }
        }}
      >
        <SelectTrigger className="text-sm text-white bg-transparent border-none outline-none focus:outline-none focus:ring-0 ring-0 ring-offset-0 bg-indigo-400">
          <LinkIcon className="w-5 h-5 ml-0.5 shrink-0" />
          <SelectValue placeholder="Version" className="bg-transparent" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="alpha-mumbai">
            <div className="flex flex-row gap-2">Alpha (Mumbai)</div>
          </SelectItem>
          <SelectItem value="alpha-sepolia">Alpha (Sepolia)</SelectItem>
          <SelectItem value="beta-sepolia">Beta (Sepolia)</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}
