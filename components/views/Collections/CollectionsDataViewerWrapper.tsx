import React from 'react';
import CollectionsDataViewerComponent from '@/components/views/Collections/CollectionsDataViewerComponent';

// {
//   "data": [
//       {
//           "id": "0x1e47f9cafbc2262fb8ad1bb6836244dd6b9a07d2",
//           "assetCount": "4",
//           "blockNumber": "5240808",
//           "blockTimestamp": "1707343980"
//       }
//   ]
// }

export default async function CollectionsDataViewerWrapper({
  tableOnly,
  gridOnly,
  pageSize,
}: {
  tableOnly?: boolean;
  gridOnly?: boolean;
  pageSize?: number;
}) {
  // const data: ListIPOrgResponse = await storyClient.ipOrg.list({});
  // const ipOrgData = data?.ipOrgs;
  // crude sort, TODO: make this better
  // ipOrgData.sort((a: IPOrg, b: IPOrg) => parseInt(b.id) - parseInt(a.id));

  let collectionData = [];
  try {
    const data = await fetch(`https://edge.stg.storyprotocol.net/api/v1/collections`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': process.env.NEXT_PUBLIC_STORY_PROTOCOL_X_API_KEY as string,
      },
      body: JSON.stringify({
        options: {
          pagination: {
            limit: 100,
            offset: 0,
          },
          where: {},
        },
      }),
    });
    const res = await data.json();
    collectionData = res.data;
  } catch (e) {
    console.log(e);
  }

  return (
    // <></>
    <CollectionsDataViewerComponent
      data={collectionData}
      tableOnly={tableOnly}
      gridOnly={gridOnly}
      pageSize={pageSize}
    />
  );
}
