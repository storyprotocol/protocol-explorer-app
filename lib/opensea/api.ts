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

// {
//   openseaMetadata: {
//     collection: 'coolcatssepolia',
//     name: 'Cool Cats - SEPOLIA',
//     description: 'This is a test NFT collection that helps decentralized Finance, NFT Finance, Social Finance, and other kinds of Dapps building on Sepolia Testnet.\n' +
//       '\n' +
//       'You can mint your own at https://www.testnetmint.com/ price is 0.1 sepolia ether per one, and max wallet mint is 2.',
//     image_url: 'https://i.seadn.io/gcs/files/549aa2dcadc94cfe7bbcb8fc09d20848.png?w=500&auto=format',
//     banner_image_url: 'https://i.seadn.io/gcs/files/1da70cdb0660b79fe7b4c2f9d982310e.png?w=500&auto=format',
//     owner: '0x69f2301e037f1e35cc056a736758123460141d7a',
//     safelist_status: 'not_requested',
//     category: '',
//     is_disabled: false,
//     is_nsfw: false,
//     trait_offers_enabled: false,
//     collection_offers_enabled: true,
//     opensea_url: 'https://testnets.opensea.io/collection/coolcatssepolia',
//     project_url: 'https://testnetmint.com/',
//     wiki_url: '',
//     discord_url: '',
//     telegram_url: '',
//     twitter_username: '',
//     instagram_username: '',
//     contracts: [ [Object] ],
//     editors: [ '0x69f2301e037f1e35cc056a736758123460141d7a' ],
//     fees: [ [Object] ],
//     total_supply: 120,
//     created_date: '2023-09-05'
//   }
// }

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

  // {
  //   "collection": "murakamiflowerssepolia",
  //   "name": "Murakami.Flowers - SEPOLIA",
  //   "description": "This is a test NFT collection that helps decentralized Finance, NFT Finance, Social Finance, and other kinds of Dapps building on Sepolia Testnet.\n\nYou can mint your own at https://www.testnetmint.com/ price is 0.1 sepolia ether per one, and max wallet mint is 2.",
  //   "image_url": "https://i.seadn.io/gcs/files/ebca1f6c5b3b75eef4eb048f1c76b816.png?w=500&auto=format",
  //   "banner_image_url": "https://i.seadn.io/gcs/files/6f3a412e76ac5727348b79b0f70671dd.png?w=500&auto=format",
  //   "owner": "0x69f2301e037f1e35cc056a736758123460141d7a",
  //   "safelist_status": "not_requested",
  //   "category": "",
  //   "is_disabled": false,
  //   "is_nsfw": false,
  //   "trait_offers_enabled": false,
  //   "collection_offers_enabled": true,
  //   "opensea_url": "https://testnets.opensea.io/collection/murakamiflowerssepolia",
  //   "project_url": "",
  //   "wiki_url": "",
  //   "discord_url": "",
  //   "telegram_url": "",
  //   "twitter_username": "",
  //   "instagram_username": "",
  //   "contracts": [
  //     {
  //       "address": "0x3eee83358e9ff3fc7ac46e8e5921fb2ec0a77fcb",
  //       "chain": "sepolia"
  //     }
  //   ],
  //   "editors": [
  //     "0x69f2301e037f1e35cc056a736758123460141d7a"
  //   ],
  //   "fees": [
  //     {
  //       "fee": 2.5,
  //       "recipient": "0x0000a26b00c1f0df003000390027140000faa719",
  //       "required": true
  //     }
  //   ],
  //   "total_supply": 74,
  //   "created_date": "2023-09-04"
  // }
}

export async function getOpenSeaContract(chain: string, address: Address) {
  try {
    const data = await fetch(`${OPENSEA_BASE_URL}/api/v2/chain/${chain}/contract/${address}`);
    const res = await data.json();

    // {
    //   "address": "0x3eee83358e9ff3fc7ac46e8e5921fb2ec0a77fcb",
    //   "chain": "sepolia",
    //   "collection": "murakamiflowerssepolia",
    //   "contract_standard": "erc721",
    //   "name": "Murakami.Flowers",
    //   "total_supply": 0
    // }
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

// dummy address: 0x3eee83358e9ff3fc7ac46e8e5921fb2ec0a77fcb
