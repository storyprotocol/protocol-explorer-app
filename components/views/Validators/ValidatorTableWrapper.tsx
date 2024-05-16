import React from 'react';
import ValidatorTableComponent from './ValidatorTableComponent';
import { listResource } from '@/lib/server/sdk';
import { RESOURCE_TYPE, Transaction } from '@/lib/server/types';
import { Address } from 'viem';

export default async function ValidatorTableWrapper({
  pageSize = 100,
  collectionId,
  ipId,
}: {
  pageSize?: number;
  collectionId?: Address;
  ipId?: Address;
}) {
  // try {
  const req = {
    pagination: {
      limit: 1000,
      offset: 0,
    },
    where: {
      ipId,
    },
  };

  const txnListRes = await listResource(RESOURCE_TYPE.TRANSACTION, req);

//   const filteredData = txnListRes.data.filter((tx: Transaction) => {
//     return true;
//   });
const filteredData = [
    {
      validatorName: 'Validator One',
      validatorStatus: 'Active',
      votingPower: '2,500,000',
      commission: '5%',
      validatorStake: '50,000,000',
      validatorUptime: '99.97%'
    },
    {
      validatorName: 'Validator Two',
      validatorStatus: 'Inactive',
      votingPower: '1,200,000',
      commission: '7%',
      validatorStake: '30,000,000',
      validatorUptime: '98.65%'
    },
    {
      validatorName: 'Validator Three',
      validatorStatus: 'Active',
      votingPower: '3,000,000',
      commission: '4%',
      validatorStake: '75,000,000',
      validatorUptime: '99.82%'
    },
    {
      validatorName: 'Validator Four',
      validatorStatus: 'Pending',
      votingPower: '500,000',
      commission: '6%',
      validatorStake: '20,000,000',
      validatorUptime: '95.76%'
    },
    {
      validatorName: 'Validator Five',
      validatorStatus: 'Active',
      votingPower: '2,800,000',
      commission: '3.5%',
      validatorStake: '60,000,000',
      validatorUptime: '97.30%'
    },
    {
      validatorName: 'Validator Six',
      validatorStatus: 'Inactive',
      votingPower: '1,100,000',
      commission: '8%',
      validatorStake: '15,000,000',
      validatorUptime: '98.90%'
    },
    {
      validatorName: 'Validator Seven',
      validatorStatus: 'Active',
      votingPower: '4,000,000',
      commission: '2%',
      validatorStake: '80,000,000',
      validatorUptime: '99.99%'
    },
    {
      validatorName: 'Validator Eight',
      validatorStatus: 'Active',
      votingPower: '3,500,000',
      commission: '4.5%',
      validatorStake: '40,000,000',
      validatorUptime: '99.50%'
    },
    {
      validatorName: 'Validator Nine',
      validatorStatus: 'Pending',
      votingPower: '900,000',
      commission: '5.5%',
      validatorStake: '25,000,000',
      validatorUptime: '94.76%'
    },
    {
      validatorName: 'Validator Ten',
      validatorStatus: 'Active',
      votingPower: '2,200,000',
      commission: '3%',
      validatorStake: '70,000,000',
      validatorUptime: '96.60%'
    },
    {
      validatorName: 'Validator Eleven',
      validatorStatus: 'Inactive',
      votingPower: '800,000',
      commission: '7.5%',
      validatorStake: '10,000,000',
      validatorUptime: '97.85%'
    },
    {
      validatorName: 'Validator Twelve',
      validatorStatus: 'Active',
      votingPower: '3,200,000',
      commission: '2.5%',
      validatorStake: '85,000,000',
      validatorUptime: '99.40%'
    },
    {
      validatorName: 'Validator Thirteen',
      validatorStatus: 'Active',
      votingPower: '1,000,000',
      commission: '6%',
      validatorStake: '12,000,000',
      validatorUptime: '95.00%'
    },
    {
      validatorName: 'Validator Fourteen',
      validatorStatus: 'Pending',
      votingPower: '2,000,000',
      commission: '4%',
      validatorStake: '55,000,000',
      validatorUptime: '99.70%'
    },
    {
      validatorName: 'Validator Fifteen',
      validatorStatus: 'Active',
      votingPower: '3,800,000',
      commission: '3.8%',
      validatorStake: '90,000,000',
      validatorUptime: '98.50%'
    },
    {
      validatorName: 'Validator Sixteen',
      validatorStatus: 'Inactive',
      votingPower: '1,500,000',
      commission: '9%',
      validatorStake: '35,000,000',
      validatorUptime: '97.00%'
    },
    {
      validatorName: 'Validator Seventeen',
      validatorStatus: 'Active',
      votingPower: '3,100,000',
      commission: '2.2%',
      validatorStake: '78,000,000',
      validatorUptime: '99.20%'
    },
    {
      validatorName: 'Validator Eighteen',
      validatorStatus: 'Active',
      votingPower: '850,000',
      commission: '4.8%',
      validatorStake: '22,000,000',
      validatorUptime: '95.90%'
    }
  ];
  
  return (
    <>
      <ValidatorTableComponent data={filteredData} pageSize={pageSize} />
    </>
  );
}
