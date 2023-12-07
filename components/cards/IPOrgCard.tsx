import { shortenAddress } from '@/utils';
import { IPOrg } from '@story-protocol/core-sdk';
import Link from 'next/link';
import React from 'react';
import AddressComponent from '../snippets/AddressComponent';

export default function IPOrgCard({ data }: { data: IPOrg }) {
  console.log({ data });
  return (
    <div className="w-full bg-white rounded-2xl overflow-hidden border-2 border-slate-100 hover:border-indigo-500 hover:shadow-md">
      <span data-state="closed">
        <div className="overflow-hidden aspect-video">
          <Link href={`/ipo/${data.id}`} className="hover:cursor-pointer">
            <div className="flex h-full justify-center items-center bg-gradient-to-br from-indigo-50 to-indigo-200 text-indigo-500 px-5 group">
              {/* <RectangleGroupIcon className="w-10 h-10" /> */}
              <h1 className="text-2xl text-center font-semibold inline-flex truncate  group-hover:max-w-none group-hover:whitespace-normal group-hover:overflow-visible">
                {data.name}
              </h1>
            </div>

            {/* <Image
            width={400}
            height={300}
            // fill={true}
            // sizes="(max-width: 768px) 800px, (max-width: 1200px) 600px, 400px"
            alt="React Rendezvous"
            loading="lazy"
            decoding="async"
            data-nimg="1"
            className="h-auto w-full object-cover transition-all hover:scale-125"
            src={`https://picsum.photos/seed/${data.id}/400/300`}
          /> */}
          </Link>
        </div>
      </span>
      <div className="text-sm px-6 py-4">
        <div className="flex flex-col gap-1 items-start justify-between">
          {/* <h3 className="font-medium leading-none mb-1">{data.name}</h3> */}
          <p className="text-xs text-indigo-400 font-medium font-mono">{shortenAddress(data.id, 6)}</p>
          <AddressComponent address={data.owner} size="sm" />
          {/* <p className="text-xs text-muted-foreground font-mono">Owner: {shortenAddress(data.owner, 3)}</p> */}
        </div>
      </div>
    </div>
  );
}
