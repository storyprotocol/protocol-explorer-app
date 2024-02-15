import React from 'react';
import CollectionsDataViewerComponent from '@/components/views/Collections/CollectionsDataViewerComponent';
import { RESOURCE_TYPE } from '@/lib/server/types';
import { listResource } from '@/lib/server/sdk';
import ErrorComponent from '@/components/Error/ErrorComponent';

export default async function CollectionsDataViewerWrapper({
  tableOnly,
  gridOnly,
  pageSize,
}: {
  tableOnly?: boolean;
  gridOnly?: boolean;
  pageSize?: number;
}) {
  try {
    let listParams = {
      pagination: {
        limit: 100,
        offset: 0,
      },
    };

    const collectionRes = await listResource(RESOURCE_TYPE.COLLECTION, listParams);

    const collectionData = collectionRes.data;
    return (
      // <></>
      <CollectionsDataViewerComponent
        data={collectionData}
        tableOnly={tableOnly}
        gridOnly={gridOnly}
        pageSize={pageSize}
      />
    );
  } catch (e) {
    console.log(e);
    return <ErrorComponent />;
  }
}
