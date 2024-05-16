'use client';

import { useState } from 'react';
import ValidatorCard from '@/components/cards/ValidatorCard';
import ValidatorDetailsCard from '@/components/cards/ValidatorDetailsCard';
import ValidatorStatsCard from '@/components/cards/ValidatorStatsCard';
import StakingCalculatorCard from '@/components/cards/StakingCalculatorCard';
import StakeButtonMenu from './StakeButtonMenu';
import { getResource } from '@/lib/server/sdk';
import { RESOURCE_TYPE, Validator } from '@/lib/server/types';

import React from 'react';

export default async function ValidatorDetailComponent({ validatorName }: { validatorName: string }) {
  try {
    const [isModalOpen, setModalOpen] = useState(false);
    // const txDetailRes = await getResource(RESOURCE_TYPE.TRANSACTION, validatorName);
    // const txData: Validator = txDetailRes.data;
    const stakeButtonOnClick = () => {
        console.log("Stake button clicked for validator:", validatorName);
        setModalOpen(true); 
    };
    const validatorData = {
        validatorName: 'Validator Alpha',
        validatorDescription: 'This is the description for the validator',
        validatorWebsiteUrl: 'https://examplevalidator.com',
        validatorStatus: 'Active',
        votingPower: '2,300,000',
        commission: '2%',
        maxCommission: '5%',
        validatorStake: '45,000,000',
        validatorTotalStaked: '104m',
        validatorUptime: '99.95%',
        validatorPoolSize: '50,000,000',
        validatorLifetimeRewards: '$45,000',
        validatorExpectedReturn: '12% APY',
        validatorDelegated: '48%',
    };
    return (
      <div className="w-full">
        <div className="grid grid-cols-12 gap-6 mb-8">
            <ValidatorDetailsCard data={validatorData} />
            <ValidatorStatsCard data={validatorData} />
        </div>
        <ValidatorCard data={validatorData} />
        <StakeButtonMenu onClick={stakeButtonOnClick}/>
        <StakingCalculatorCard isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <p>This is the modal content!</p>
        </StakingCalculatorCard>
      </div>
    );
  } catch (e) {
    return <>Something went wrong</>;
  }
}
