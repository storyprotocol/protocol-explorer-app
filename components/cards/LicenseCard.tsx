import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { PuzzlePieceIcon } from '@heroicons/react/24/outline';
import AddressComponent from '../snippets/AddressComponent';
import { License } from '@/lib/server/types';
import { OpenSeaNFT, getOpenSeaNFTMetadata } from '@/lib/opensea/api';
import { getRoundedTime } from '@/utils';
import { Address } from 'viem';

const LicenseCard = ({ data }: { data: License }) => {
  const [openseaNFTdata, setOpenseaNFTdata] = useState<OpenSeaNFT | null>(null);

  useEffect(() => {
    const fetchMetadata = async () => {
      const metadata = await getOpenSeaNFTMetadata(
        'sepolia',
        process.env.NEXT_PUBLIC_REGISTRATION_MODULE_CONTRACT as Address,
        data.id,
      );
      setOpenseaNFTdata(metadata);
    };

    fetchMetadata();

    return () => {};
  }, [data.id]);

  return (
    <div className="w-full bg-white rounded-2xl overflow-hidden border-2 border-slate-100 hover:border-indigo-500 hover:shadow-md">
      <span data-state="closed">
        <div className="overflow-hidden aspect-square">
          <Link
            href={`https://testnets.opensea.io/assets/sepolia/${process.env.NEXT_PUBLIC_LICENSE_REGISTRY_CONTRACT}/${data.id}`}
            target="_blank"
            className="hover:cursor-pointer"
          >
            {openseaNFTdata?.image_url ? (
              <img
                width={400}
                height={400}
                alt={data.id}
                className="h-full w-full object-cover transition-all hover:scale-125"
                src={`${openseaNFTdata.image_url}?date=${getRoundedTime(15)}`}
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
          <div className="w-full flex flex-col">
            <h3 className="font-medium leading-none mb-1 truncate">ID: {data.id}</h3>
            <p className="text-xs font-mono text-indigo-400">Policy ID: {data.policyId}</p>
          </div>
          <div className="w-full flex flex-row justify-between">
            <p className="text-xs font-mono text-muted-foreground">
              <AddressComponent address={data.licensorIpId} size="sm" />
            </p>
            {/* <p className="font-mono text-xs">{data.licensorIpId}</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LicenseCard;
