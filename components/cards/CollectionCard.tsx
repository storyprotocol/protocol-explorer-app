import { shortenAddress } from '@/utils';
import { Link } from 'lucide-react';
import React from 'react';
import AddressComponent from '../snippets/AddressComponent';
import { Address } from 'viem';
import { getCollectionMetadata } from '@/lib/opensea/api';

export default async function CollectionCard({ address }: { address: Address }) {
  const data = await getCollectionMetadata(address);

  console.log({ data });
  return (
    <div className="w-full bg-white rounded-2xl overflow-hidden border-2 border-slate-100 hover:border-indigo-500 hover:shadow-md">
      {/* <span data-state="closed"> */}
      {/* <div className="overflow-hidden aspect-video"> */}

      {/* <Link href={`/collections/${data.owner}`} className="hover:cursor-pointer">
            {data.image_url ? (
              <img
                width={400}
                height={300}
                // fill={true}
                // sizes="(max-width: 768px) 800px, (max-width: 1200px) 600px, 400px"
                alt="React Rendezvous"
                loading="lazy"
                decoding="async"
                data-nimg="1"
                className="h-auto w-full object-cover transition-all hover:scale-125"
                src={data.image_url}
              />
            ) : (
              <div className="flex h-full justify-center items-center bg-gradient-to-br from-indigo-50 to-indigo-200 text-indigo-500 px-5 group">
                <h1 className="text-2xl text-center font-semibold inline-flex truncate  group-hover:max-w-none group-hover:whitespace-normal group-hover:overflow-visible">
                  {data.name}
                </h1>
              </div>
            )} */}
      {/* </Link> */}
      {/* </div> */}
      {/* </span> */}
      <img
        width={400}
        height={300}
        // fill={true}
        // sizes="(max-width: 768px) 800px, (max-width: 1200px) 600px, 400px"
        alt="React Rendezvous"
        loading="lazy"
        decoding="async"
        data-nimg="1"
        className="h-auto w-full object-cover transition-all hover:scale-125"
        src={data.image_url}
      />
      <div className="text-sm px-6 py-4">
        <div className="flex flex-col gap-1 items-start justify-between">
          <p className="text-xs text-indigo-400 font-medium font-mono">{shortenAddress(data.owner, 6)}</p>
          <AddressComponent address={data.owner} size="sm" />
        </div>
      </div>
    </div>
  );
}
