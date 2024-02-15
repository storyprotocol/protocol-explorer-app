import { Address, Hash } from 'viem';

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

export type AssetFilterOptions = {
  chainId: string;
  metadataResolverAddress: string;
  tokenContract: string;
  tokenId: string;
};

export type DisputeFilterOptions = {
  currentTag: string;
  initiator: string;
  targetIpId: string;
  targetTag: string;
};

export type PermissionFilterOptions = {
  signer: string;
  to: string;
};

export type PolicyFilterOptions = {
  policyFrameworkManager: string;
};

export type PolicyFrameworkFilterOptions = {
  address: string;
  name: string;
};

export type RoyaltyFilterOptions = {
  ipId: string;
  royaltyPolicy: string;
};

export type TagFilterOptions = {
  ipId: string;
  tag: string;
};
export type RoyaltyPayFilterOptions = {
  ipId: string;
  payerIpId: string;
  receiverIpId: string;
  sender: string;
  token: string;
};

export type ModuleFilterOptions = {
  name: string;
};

export type LicenseFilterOptions = {
  licensorIpdId: string;
  policyId: string;
};

export type LicenseFrameworkFilterOptions = {
  creator: string;
};

export type IPAPolicyFilterOptions = {
  active: string;
  inherited: string;
  policyId: string;
};

export type TransactionFilterOptions = {
  actionType: string;
  resourceId: string;
};

export type FilterOptions =
  | AssetFilterOptions
  | DisputeFilterOptions
  | PermissionFilterOptions
  | PolicyFilterOptions
  | PolicyFrameworkFilterOptions
  | RoyaltyFilterOptions
  | TagFilterOptions
  | RoyaltyPayFilterOptions
  | ModuleFilterOptions
  | LicenseFilterOptions
  | LicenseFrameworkFilterOptions
  | IPAPolicyFilterOptions
  | TransactionFilterOptions;

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

export type Permission = {
  id: string;
  permission: string;
  signer: Address;
  to: Address;
  func: string;
  blockNumber: string;
  blockTimestamp: string;
};

export type License = {
  id: string;
  policyId: string;
  licensorIpId: Address;
  transferable: boolean;
  blockNumber: string;
  blockTimestamp: string;
};

export type PolicyFramework = {
  id: string;
  address: Address;
  name: string;
  blockNumber: string;
  blockTimestamp: string;
};

export type Module = {
  id: string;
  name: string;
  module: string;
  blockNumber: string;
  blockTimestamp: string;
  deletedAt: string;
};

export type Tag = {
  id: string;
  uuid: string;
  ipId: Address;
  tag: string;
  deletedAt: string;
  blockNumber: string;
  blockTimestamp: string;
};

export type IPAPolicy = {
  id: string;
  ipId: Address;
  policyId: Address;
  index: string;
  active: boolean;
  inherited: boolean;
  blockNumber: string;
  blockTimestamp: string;
};

export type RoyaltyPay = {
  id: string;
  receiverIpId: Address;
  payerIpId: Address;
  sender: Address;
  token: Address;
  amount: string;
  blockNumber: string;
  blockTimestamp: string;
};

export type Royalty = {
  id: string;
  ipId: Address;
  data: string;
  royaltyPolicy: Address;
  blockNumber: string;
  blockTimestamp: string;
};

export type Dispute = {
  id: string;
  targetIpId: Address;
  targetTag: Address;
  currentTag: Address;
  arbitrationPolicy: Address;
  evidenceLink: string;
  initiator: Address;
  data: string;
  blockNumber: string;
  blockTimestamp: string;
};

export type Collection = {
  id: string;
  assetCount: string;
  licensesCount: string;
  resolvedDisputeCount: string;
  cancelledDisputeCount: string;
  raisedDisputeCount: string;
  judgedDisputeCount: string;
  blockNumber: string;
  blockTimestamp: string;
};

export type Policy = {
  id: string;
  policyId: string;
  policyFrameworkManager: Address;
  policy: string;
  blockNumber: string;
  blockTimestamp: string;
  uml: {
    id: Hash;
    frameworkManagerAddress: Address;
    attribution: boolean;
    transferable: boolean;
    commercialUse: boolean;
    commercialAttribution: boolean;
    commercializers: Address[];
    derivativesAllowed: boolean;
    derivativesAttribution: boolean;
    derivativesApproval: boolean;
    derivativesReciprocal: boolean;
    derivativesRevShare: string;
    territories: string[];
    distributionChannels: string[];
    royaltyPolicy: Address;
  };
};
