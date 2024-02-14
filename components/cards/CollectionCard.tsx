import { shortenAddress } from '@/utils';
import React from 'react';
import AddressComponent from '../snippets/AddressComponent';
import { Address } from 'viem';
import { getOpenSeaCollectionMetadata } from '@/lib/opensea/api';
import { Collection } from '../views/Collections/CollectionsDataViewerComponent';
import Link from 'next/link';

export default async function CollectionCard({ data }: { data: Collection }) {
  const openseaMetadata = await getOpenSeaCollectionMetadata(data.id as Address);

  console.log('openseaMetadata', openseaMetadata);
  return (
    <div className="w-full bg-white rounded-2xl overflow-hidden border-2 border-slate-100 hover:border-indigo-500 hover:shadow-md">
      {/* <span data-state="closed"> */}
      <div className="overflow-hidden aspect-video">
        <Link href={`/collections/${data.id}`} className="hover:cursor-pointer">
          {openseaMetadata.image_url ? (
            <img
              width={400}
              height={300}
              // fill={true}
              // sizes="(max-width: 768px) 800px, (max-width: 1200px) 600px, 400px"
              alt={data.id}
              loading="lazy"
              decoding="async"
              data-nimg="1"
              className="h-auto w-full object-cover transition-all hover:scale-125"
              src={openseaMetadata.image_url || 'https://via.placeholder.com/400x300'}
            />
          ) : (
            <div className="flex h-full justify-center items-center bg-gradient-to-br from-indigo-50 to-indigo-200 text-indigo-500 px-5 group">
              <h1 className="text-2xl text-center font-semibold inline-flex truncate  group-hover:max-w-none group-hover:whitespace-normal group-hover:overflow-visible">
                {shortenAddress(data.id)}
              </h1>
            </div>
          )}
        </Link>
      </div>
      {/* </span> */}

      <div className="flex flex-row justify-between items-end text-sm px-6 py-4">
        <div className="flex flex-col gap-1 items-start justify-between">
          <p className="text-xs text-indigo-400 font-medium font-mono">{shortenAddress(data.id, 6)}</p>
          <AddressComponent address={openseaMetadata.owner as string} size="sm" />
        </div>
        <div>
          {openseaMetadata.opensea_url && (
            <Link
              className="text-blue-500 hover:text-blue-600 hover:cursor-pointer"
              href={openseaMetadata.opensea_url}
              target="_blank"
            >
              Opensea
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
