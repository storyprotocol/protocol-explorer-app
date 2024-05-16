import ValidatorCard from '@/components/cards/ValidatorCard';
import ValidatorDetailsCard from '@/components/cards/ValidatorDetailsCard';
import ValidatorStatsCard from '@/components/cards/ValidatorStatsCard';
import { Button } from '@/components/ui/button';
import { getResource } from '@/lib/server/sdk';
import { RESOURCE_TYPE, Validator } from '@/lib/server/types';

import React from 'react';

type ValidatorDetailComponentProps = {
    buttonOnClick: () => void; // Specify that buttonOnClick is a function that returns void
  };
  
  // Use ValidatorDetailComponentProps for the component's props
  export default function ValidatorDetailComponent({ buttonOnClick }: ValidatorDetailComponentProps) {
      return (
      <div className="w-full mt-2 mb-2 flex justify-end">
        <Button onClick={buttonOnClick} variant="register">
          Stake
        </Button>
      </div>
    );
  };
