'use client';
import { PuzzlePieceIcon } from '@heroicons/react/24/outline';
import { IPAsset } from '@story-protocol/core-sdk';
import React, { useState } from 'react';
import Image from 'next/image';
import { getRoundedTime } from '@/utils';

export default function AssetDisplayComponent({ data }: { data: IPAsset }) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
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
          setImageUrl(imageURI);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <div className="flex h-52 md:h-72 xl:h-full col-span-12 xl:col-span-5 rounded-xl bg-indigo-100 overflow-hidden justify-center items-center">
      {imageUrl ? (
        <Image
          width={700}
          height={600}
          alt={data.name}
          loading="lazy"
          decoding="async"
          data-nimg="1"
          src={`${imageUrl}?date=${getRoundedTime(15)}`}
          unoptimized
        />
      ) : (
        <PuzzlePieceIcon className="w-20 h-20 text-indigo-500" />
      )}
    </div>
  );
}
