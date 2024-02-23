import { Address } from 'viem';

export type OpenSeaCollection = {
  collection?: string;
  name?: string;
  description?: string;
  image_url?: string;
  banner_image_url?: string;
  owner?: Address;
  safelist_status?: string;
  category?: string;
  is_disabled?: boolean;
  is_nsfw?: boolean;
  trait_offers_enabled?: boolean;
  collection_offers_enabled?: boolean;
  opensea_url?: string;
  project_url?: string;
  wiki_url?: string;
  discord_url?: string;
  telegram_url?: string;
  twitter_username?: string;
  instagram_username?: string;
  contracts?: OpenSeaContract[];
  editors?: Address[];
  fees?: OpenSeaFee[];
  total_supply?: number;
  created_date?: string;
};

export type OpenSeaContract = {
  address: string;
  chain: string;
  collection: string;
  contract_standard: string;
  name: string;
  total_supply: number;
};

export type OpenSeaFee = {
  fee: number;
  recipient: string;
  required: boolean;
};

export function changeUrlParam(url: string, paramName: string, paramValue: string) {
  const urlObj = new URL(url);
  urlObj.searchParams.set(paramName, paramValue);
  return urlObj.toString();
}

const OPENSEA_BASE_URL = process.env.NEXT_PUBLIC_OPENSEA_BASE_URL || process.env.OPENSEA_BASE_URL || '';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'x-api-key': process.env.NEXT_PUBLIC_OPENSEA_API_KEY || process.env.OPEN_SEA_API_KEY || '',
  },
};

export async function getOpenSeaCollection(slug: string) {
  try {
    const data = await fetch(`${OPENSEA_BASE_URL}/api/v2/collections/${slug}`, options);
    const res = await data.json();
    return res;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function getOpenSeaContract(chain: string, address: Address) {
  try {
    const data = await fetch(`${OPENSEA_BASE_URL}/api/v2/chain/${chain}/contract/${address}`);
    const res = await data.json();

    return res;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function getOpenSeaCollectionMetadata(address: Address): Promise<OpenSeaCollection> {
  try {
    const { collection } = await getOpenSeaContract('sepolia', address);
    if (!collection) {
      console.error('Collection not found');
      return {};
    }
    const openseaMetadata = await getOpenSeaCollection(collection);

    // update image urls to higher resolution
    openseaMetadata.image_url = openseaMetadata.image_url && changeUrlParam(openseaMetadata.image_url, 'w', '1400');
    openseaMetadata.banner_image_url =
      openseaMetadata.banner_image_url && changeUrlParam(openseaMetadata.banner_image_url, 'w', '1400');

    return openseaMetadata;
  } catch (e) {
    console.error(e);
    return {};
  }
}

// https://api.opensea.io/api/v2/chain/{chain}/contract/{address}/nfts/{identifier}
// {
//   "nft": {
//     "identifier": "12",
//     "collection": "murakamiflowerssepolia",
//     "contract": "0x3eee83358e9ff3fc7ac46e8e5921fb2ec0a77fcb",
//     "token_standard": "erc721",
//     "name": "Murakami.Flower #3270",
//     "description": "Murakami.Flowers is a work in which artist Takashi Murakami’s representative artwork, flowers, are expressed as dot art evocative of Japanese TV games created in the 1970s. The work is being developed with the number 108 as the keyword; a combination of 108 backgrounds and flower colors make up a field, and there are 108 fields. Each field has 108 flower images, resulting in 11,664 flower images in total. The number 108 is a reference to bonnō, or earthly temptations.\n\nMurakami.Flowers NFTs are subject to the Collector Terms available here:https://murakamiflowers.kaikaikiki.com/collector.html. If you buy a Murakami.Flowers NFT, you do not receive commercial rights in the corresponding artwork.\n\n©Takashi Murakami/Kaikai Kiki Co., Ltd. All Rights Reserved.",
//     "image_url": "https://ipfs.io/ipfs/bafkreidodkamxjzjhvxkgshqhiunjmocy423nwd5smo27zq2jxzxxyopjm",
//     "metadata_url": "https://mflowers-prod.s3.us-west-1.amazonaws.com/12",
//     "opensea_url": "https://testnets.opensea.io/assets/sepolia/0x3eee83358e9ff3fc7ac46e8e5921fb2ec0a77fcb/12",
//     "updated_at": "2023-09-13T08:24:51.422534",
//     "is_disabled": false,
//     "is_nsfw": false,
//     "animation_url": null,
//     "is_suspicious": false,
//     "creator": "0x69f2301e037f1e35cc056a736758123460141d7a",
//     "traits": [
//       {
//         "trait_type": "Eye",
//         "display_type": null,
//         "max_value": null,
//         "value": "Double Wink"
//       },
//       {
//         "trait_type": "Mouth",
//         "display_type": null,
//         "max_value": null,
//         "value": "Pursed Lips"
//       },
//       {
//         "trait_type": "Tribe",
//         "display_type": null,
//         "max_value": null,
//         "value": "PCBVP"
//       },
//       {
//         "trait_type": "Eyeware",
//         "display_type": null,
//         "max_value": null,
//         "value": "Dazzled by Money"
//       },
//       {
//         "trait_type": "Background",
//         "display_type": null,
//         "max_value": null,
//         "value": "Grid Rainbow"
//       }
//     ],
//     "owners": [
//       {
//         "address": "0x1f7a99f88601c631bdbbdb648955355ddd7965c0",
//         "quantity": 1
//       }
//     ],
//     "rarity": null
//   }
// }

export type OpenSeaNFT = {
  identifier: string;
  collection: string;
  contract: string;
  token_standard: string;
  name: string;
  description: string;
  image_url: string;
  metadata_url: string;
  opensea_url: string;
  updated_at: string;
  is_disabled: boolean;
  is_nsfw: boolean;
  animation_url: string;
  is_suspicious: boolean;
  creator: Address;
  traits: OpenSeaTrait[];
  owners: OpenSeaOwner[];
  rarity: string;
};

export type OpenSeaTrait = {
  trait_type: string;
  display_type: string;
  max_value: string;
  value: string;
};

export type OpenSeaOwner = {
  address: Address;
  quantity: number;
};

export async function getOpenSeaNFTMetadata(
  chain: string = 'sepolia',
  address: Address,
  tokenId: string,
): Promise<OpenSeaNFT | null> {
  try {
    const data = await fetch(`${OPENSEA_BASE_URL}/api/v2/chain/${chain}/contract/${address}/nfts/${tokenId}`, options);
    const res = await data.json();

    return res.nft;
  } catch (e) {
    console.error(e);
    return null;
  }
}

// dummy address: 0x3eee83358e9ff3fc7ac46e8e5921fb2ec0a77fcb
