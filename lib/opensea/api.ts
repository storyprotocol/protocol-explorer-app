import { Address } from 'viem';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'x-api-key': process.env.OPENSEA_API_KEY || '',
  },
};

export async function getCollection(slug: string) {
  try {
    const data = await fetch(`${process.env.OPENSEA_BASE_URL}/api/v2/collections/${slug}`, options);
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

export async function getContract(chain: string, address: Address) {
  try {
    const data = await fetch(`${process.env.OPENSEA_BASE_URL}/api/v2/chain/${chain}/contract/${address}`);
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

export async function getCollectionMetadata(address: Address) {
  try {
    const { collection } = await getContract('sepolia', address);
    if (!collection) {
      console.error('Collection not found');
      return [];
    }
    // Assuming the collection object has a property `primaryAssetContracts`
    // and the first contract in this array has the properties `chain` and `address` we need.

    const contract = await getCollection(collection);
    return contract;
  } catch (e) {
    console.error(e);
    return [];
  }
}

// dummy address: 0x3eee83358e9ff3fc7ac46e8e5921fb2ec0a77fcb
