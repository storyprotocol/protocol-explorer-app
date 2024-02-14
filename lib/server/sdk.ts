import storyClient from '../SP';
import {
  GetTransactionRequest,
  ListTransactionRequest,
  CreateIPOrgRequest,
  GetIPOrgRequest,
  GetIpAssetRequest,
  ListIpAssetRequest,
  ListIPOrgRequest,
  GetRelationshipRequest,
  ListRelationshipRequest,
  GetRelationshipTypeRequest,
  ListRelationshipTypesRequest,
  GetHookRequest,
  ListHookRequest,
  GetModuleRequest,
  ListModuleRequest,
} from '@story-protocol/core-sdk';

import { Address } from 'viem';

export enum RESOURCE_TYPE {
  ASSET = 'assets',
  COLLECTION = 'collections',
  TRANSACTION = 'transactions',
  POLICY = 'policies',
  PERMISSION = 'permissions',
  LICENSE = 'licenses',
  POLICY_FRAMEWORK = 'policyframeworks',
  MODULE = 'modules',
  TAGS = 'tags',
  IPA_POLICY = 'ipapolicies',
  ROYALTY_PAY = 'royaltypays',
  ROYALTY = 'royalties',
  DISPUTE = 'disputes',
}

export type ResourceType =
  | RESOURCE_TYPE.ASSET
  | RESOURCE_TYPE.COLLECTION
  | RESOURCE_TYPE.TRANSACTION
  | RESOURCE_TYPE.LICENSE
  | RESOURCE_TYPE.MODULE
  | RESOURCE_TYPE.POLICY
  | RESOURCE_TYPE.PERMISSION
  | RESOURCE_TYPE.POLICY_FRAMEWORK
  | RESOURCE_TYPE.TAGS
  | RESOURCE_TYPE.IPA_POLICY
  | RESOURCE_TYPE.ROYALTY_PAY
  | RESOURCE_TYPE.ROYALTY
  | RESOURCE_TYPE.DISPUTE;

export type PaginationOptions = {
  limit: number;
  offset: number;
};

export type FilterOptions = {
  creator?: Address;
  receiver?: Address;
  tokenContract?: Address;
  ipId?: Address;
};

export type QueryOptions = {
  pagination: PaginationOptions;
  where?: FilterOptions;
};

export type Transaction = {
  id: string;
  createdAt: string;
  actionType: string;
  initiator: Address;
  ipId: Address;
  resourceId: Address;
  resourceType: string;
};

export type Asset = {
  id: string;
  chainId: string;
  childIpIds: string[];
  parentIpIds: string[];
  rootIpIds: string[];
  tokenContract: string;
  tokenId: string;
  metadataResolverAddress: string;
  metadata: {
    name: string;
    hash: string;
    registrationDate: string;
    registrant: string;
    uri: string;
  };
  blockNumber: string;
  blockTimestamp: string;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || '';
const API_KEY = process.env.NEXT_PUBLIC_STORY_PROTOCOL_X_API_KEY || process.env.STORY_PROTOCOL_X_API_KEY || '';

export async function getResource(resourceName: ResourceType, resourceId: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/${resourceName}/${resourceId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY as string,
      },
    });
    if (res.ok) {
      return res.json();
    }
  } catch (error) {
    console.error(error);
  }
}

export async function listResource(resourceName: ResourceType, options: QueryOptions) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/${resourceName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY as string,
      },
      body: JSON.stringify({ options }),
    });
    if (res.ok) {
      return res.json();
    } else {
      return res;
    }
  } catch (error) {
    console.error(error);
  }
}

async function createIpOrg({ name, symbol, ipAssetTypes }: CreateIPOrgRequest) {
  const data = await storyClient.ipOrg.create({
    name,
    symbol,
    ipAssetTypes,
  });

  return data;
}

async function getIpOrg({ ipOrgId }: GetIPOrgRequest) {
  const data = await storyClient.ipOrg.get({
    ipOrgId,
  });

  return data;
}

async function listIpOrg({ options }: ListIPOrgRequest) {
  const data = await storyClient.ipOrg.list({ options });

  return data;
}

async function getIpAsset({ ipAssetId }: GetIpAssetRequest) {
  const data = await storyClient.ipAsset.get({
    ipAssetId,
  });

  return data;
}

async function listIpAsset({ ipOrgId, options }: ListIpAssetRequest) {
  const data = await storyClient.ipAsset.list({ ipOrgId, options });

  return data;
}

async function getRelationship({ relationshipId, options }: GetRelationshipRequest) {
  const data = await storyClient.relationship.get({
    relationshipId,
    options,
  });

  return data;
}

async function listRelationship({ tokenId, contract, options }: ListRelationshipRequest) {
  const data = await storyClient.relationship.list({ tokenId, contract, options });

  return data;
}

async function getRelationshipType({ ipOrgId, relType }: GetRelationshipTypeRequest) {
  const data = await storyClient.relationshipType.get({
    ipOrgId,
    relType,
  });

  return data;
}

async function listRelationshipType({ ipOrgId, options }: ListRelationshipTypesRequest) {
  const data = await storyClient.relationshipType.list({ ipOrgId, options });

  return data;
}

// async function createLicense({
//   ipOrgId,
//   isCommercial = false,
//   licensee,
// }: {
//   ipOrgId: string;
//   isCommercial: boolean;
//   licensee: string;
// }) {
//   const data = await storyClient.license.create({
//     ipOrgId,
//   });

//   return data;
// }

async function getLicense({ licenseId }: { licenseId: string }) {
  const data = await storyClient.license.get({
    licenseId,
  });

  return data;
}

async function listLicense({ ipAssetId, ipOrgId }: { ipAssetId: string; ipOrgId: string }) {
  const data = await storyClient.license.list({
    ipAssetId,
    ipOrgId,
  });

  return data;
}

async function getTransaction({ transactionId }: GetTransactionRequest) {
  const data = await storyClient.transaction.get({ transactionId });

  return data;
}
async function listTransaction({ ipOrgId, options }: ListTransactionRequest) {
  const data = await storyClient.transaction.list({ ipOrgId, options });

  return data;
}

async function getHook({ hookId }: GetHookRequest) {
  const data = await storyClient.hook.get({ hookId });

  return data;
}

async function listHooks({ moduleId, options }: ListHookRequest) {
  const data = await storyClient.hook.list({ moduleId, options });

  return data;
}

async function getModule({ moduleId }: GetModuleRequest) {
  const data = await storyClient.module.get({ moduleId });

  return data;
}

async function listModules({ ipOrgId, options }: ListModuleRequest) {
  const data = await storyClient.module.list({ ipOrgId, options });

  return data;
}

export {
  getIpOrg,
  listIpOrg,
  createIpOrg,
  getIpAsset,
  listIpAsset,
  getLicense,
  listLicense,
  getTransaction,
  listTransaction,
  getRelationship,
  listRelationship,
  getRelationshipType,
  listRelationshipType,
  getHook,
  listHooks,
  getModule,
  listModules,
};
