import { Address } from 'viem';

export type NFTMetadata = {
  nft_id: string;
  chain: string;
  contract_address: string;
  token_id: string;
  name: string;
  description: string;
  previews: {
    image_small_url: string;
    image_medium_url: string;
    image_large_url: string;
    image_opengraph_url: string;
    blurhash: string;
    predominant_color: string;
  };
  image_url: string;
  image_properties: {
    width: number;
    height: number;
    size: number;
    mime_type: string;
  };
  video_url: string | null;
  video_properties: any;
  audio_url: string | null;
  audio_properties: any;
  model_url: string | null;
  model_properties: any;
  other_url: string | null;
  other_properties: any;
  background_color: string | null;
  external_url: string | null;
  created_date: string;
  status: string;
  token_count: number;
  owner_count: number;
  owners: {
    owner_address: string;
    quantity: number;
    quantity_string: string;
    first_acquired_date: string;
    last_acquired_date: string;
  }[];
  contract: {
    type: string;
    name: string;
    symbol: string;
    deployed_by: string;
    deployed_via_contract: string | null;
    owned_by: string;
    has_multiple_collections: boolean;
  };
  collection: CollectionMetadata;
  last_sale: any;
  first_created: {
    minted_to: string;
    quantity: number;
    quantity_string: string;
    timestamp: string;
    block_number: number;
    transaction: string;
    transaction_initiator: string;
  };
  rarity: {
    rank: number;
    score: number;
    unique_attributes: number;
  };
  royalty: CollectionRoyalties[];
  extra_metadata: {
    attributes: {
      trait_type: string;
      value: string;
      display_type: string | null;
    }[];
    image_original_url: string;
    animation_original_url: string;
    metadata_original_url: string;
  };
};

export const getNFTByTokenId = async (contractAddress: Address, tokenId: string): Promise<NFTMetadata> => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-API-KEY': process.env.NEXT_PUBLIC_SIMPLE_HASH_API_KEY || process.env.SIMPLE_HASH_API_KEY || '',
    },
  };

  const res = await fetch(
    `https://api.simplehash.com/api/v0/nfts/${process.env.NEXT_PUBLIC_SIMPLE_HASH_CHAIN}/${contractAddress}/${tokenId}`,
    options,
  );
  const data = await res.json();

  console.log({ data });

  return data;
};

export const getCollectionByAddress = async (contractAddress: Address): Promise<CollectionMetadata> => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-API-KEY': process.env.NEXT_PUBLIC_SIMPLE_HASH_API_KEY || process.env.SIMPLE_HASH_API_KEY || '',
    },
  };

  const res = await fetch(
    `https://api.simplehash.com/api/v0/nfts/collections/${process.env.NEXT_PUBLIC_SIMPLE_HASH_CHAIN}/${contractAddress}`,
    options,
  );
  const data = await res.json();

  console.log({ data });
  return data.collections[0];
};

export type CollectionResponse = {
  next_cursor: string | null;
  next: string | null;
  previous: string | null;
  collections: CollectionMetadata[];
};

export type CollectionMetadata = {
  collection_id: string;
  name: string;
  description: string;
  image_url: string;
  banner_image_url: string;
  category: string;
  is_nsfw: boolean;
  external_url: string;
  twitter_username: string;
  discord_url: string;
  instagram_username: string;
  medium_username: string;
  telegram_url: string;
  marketplace_pages: MarketplacePage[];
  metaplex_mint: string;
  metaplex_candy_machine: string;
  metaplex_first_verified_creator: string;
  floor_prices: any[];
  top_bids: any[];
  distinct_owner_count: number;
  distinct_nft_count: number;
  total_quantity: number;
  chains: string[];
  top_contracts: string[];
  collection_royalties: CollectionRoyalties[];
};

export type MarketplacePage = {
  marketplace_id: string;
  marketplace_name: string;
  marketplace_collection_id: string;
  collection_url: string;
  verified: boolean;
};

export type CollectionRoyalties = {
  source: string;
  total_creator_fee_basis_points: number;
  recipients: any[];
};
