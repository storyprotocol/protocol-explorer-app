import React from 'react';

import StoryBadge from './StoryBadge';
import CharacterBadge from './CharacterBadge';
import ArtBadge from './ArtBadge';
import LocationBadge from './LocationBadge';
import OtherBadge from './OtherBadge';
import ItemBadge from './ItemBadge';

export default function AssetBadge({ type }: { type: number | string }) {
  console.log({ type });
  switch (type) {
    case 1:
    case 'Story':
      return <StoryBadge>Story</StoryBadge>;
    case 2:
    case 'Character':
      return <CharacterBadge>Character</CharacterBadge>;
    case 3:
    case 'Art':
      return <ArtBadge>Art</ArtBadge>;
    case 5:
    case 'Location':
      return <LocationBadge>Location</LocationBadge>;
    case 6:
    case 'Item':
      return <ItemBadge>Item</ItemBadge>;
    default:
      return <OtherBadge>Other</OtherBadge>;
  }
}
