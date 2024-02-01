'use client';
import { IPAsset } from '@story-protocol/core-sdk';
import React from 'react';
import Link from 'next/link';
import { PuzzlePieceIcon } from '@heroicons/react/24/outline';
import AddressComponent from '../snippets/AddressComponent';
import { getRoundedTime } from '@/utils';

export default function AssetCard({ data }: { data: IPAsset }) {
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);

  if (data.mediaUrl) {
    fetch(data.mediaUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const contentType = response.headers.get('content-type');
        if (contentType?.startsWith('image/')) {
          return true;
        }

        return response.json(); // Parse the JSON response
      })
      .then((d) => {
        if (d === true) {
          setImageUrl(data.mediaUrl);
        } else {
          // Step 2: Access property values from the JavaScript object
          const imageURI = d.image; // Replace 'propertyName' with the actual property name in your JSON data
          console.log('imageURI', imageURI);
          setImageUrl(imageURI);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <div className="w-full bg-white rounded-2xl overflow-hidden border-2 border-slate-100 hover:border-indigo-500 hover:shadow-md">
      <span data-state="closed">
        <div className="overflow-hidden aspect-video">
          <Link href={`/ipa/${data.ipOrgId}/${data.id}`} className=" hover:cursor-pointer">
            {imageUrl ? (
              <img
                width={400}
                height={300}
                alt={data.name}
                // loading="lazy"
                // decoding="async"
                className="h-full w-full object-cover transition-all hover:scale-125"
                src={`${imageUrl}?date=${getRoundedTime(15)}`}
              />
            ) : (
              <div className="flex h-full justify-center items-center bg-gradient-to-br from-indigo-50 to-indigo-200 px-5">
                <PuzzlePieceIcon className="h-10 w-10 text-indigo-500" />
              </div>
            )}
          </Link>
        </div>
      </span>
      <div className="text-sm px-6 py-4">
        <div className="flex flex-col items-start justify-between">
          <div className="w-full flex flex-row justify-between">
            <h3 className="font-medium leading-none mb-1 truncate">{data.name}</h3>
            <p className="text-xs font-mono text-indigo-400">#{data.id}</p>
          </div>
          <div className="w-full flex flex-row justify-between">
            {/* <AssetBadge type={data.type} /> */}
            <p className="text-xs font-mono text-muted-foreground">
              <AddressComponent address={data.owner} size="sm" />
            </p>
            <p className="font-mono text-xs">{data.type.value}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
