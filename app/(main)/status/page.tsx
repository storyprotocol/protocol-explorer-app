'use client';
import { getResource, listResource } from '@/lib/server/sdk';
import { RESOURCE_TYPE } from '@/lib/server/types';
import React, { useEffect } from 'react';

function APIStatus({ resourceType }: any) {
  const [getStatus, setGetStatus] = React.useState<string | null>();
  const [listStatus, setListStatus] = React.useState<string | null>();

  console.log({ resourceType });
  useEffect(() => {
    getResource(resourceType, '1')
      .then((res) => {
        console.log(res);
        setGetStatus(JSON.stringify(res));
      })
      .catch((err) => {
        console.error(err);
        setGetStatus(err.message);
      });

    listResource(resourceType, {
      pagination: {
        limit: 1,
        offset: 0,
      },
    })
      .then((res) => {
        console.log(res);
        setListStatus(JSON.stringify(res));
      })
      .catch((err) => {
        console.error(err);
        setListStatus(err.message);
      });
  }, [resourceType]);

  return (
    <div>
      <h1 className="font-mono bg-yellow-50">/{resourceType}</h1>
      <p>
        GET:{' '}
        {getStatus ? (
          <>
            <span className="text-green-600 text-xl">●</span>Online
          </>
        ) : (
          <>
            <span className="text-red-600 text-xl">●</span>Error
          </>
        )}
      </p>
      <p>
        LIST:{' '}
        {listStatus ? (
          <>
            <span className="text-green-600 text-xl">●</span>Online
          </>
        ) : (
          <>
            <span className="text-red-600 text-xl">●</span>Error
          </>
        )}
      </p>
    </div>
  );
}

export default function StatusPage() {
  return (
    <div className="pt-20 px-6">
      <h1 className="text-2xl">CORS StatusPage</h1>
      <div className="flex flex-col gap-4">
        {Object.values(RESOURCE_TYPE).map((resourceType) => {
          return (
            <div key={resourceType}>
              <APIStatus resourceType={resourceType} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
