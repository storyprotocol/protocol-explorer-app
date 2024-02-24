import React from 'react';
import { RegisterIpAssetForm } from './RegisterIpAssetForm';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { RegisterPilPolicyForm } from './RegisterPilPolicy';
import { AddPolicyToIpAssetForm } from './AddPolicyToIpAssetForm';
import { MintLicenseForm } from './MintLicenseForm';
import { RegisterDerivativeIpAssetForm } from './RegisterDerivativeIpAssetForm';

// Register IPA
// Register Derivative
// Register PIL Policy
// Attach Policy to IPA
// Mint license

export default function page() {
  return (
    <div className="w-full p-4 md:p-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col items-left pt-16 md:pt-10">
        <h1 className="text-xl md:text-2xl font-semibold leading-none mb-2">
          Interact with Story Protocol Smart Contracts
        </h1>
      </div>
      <p className="text-sm">This page provides a convenient method to read and write from the contracts</p>

      <Accordion type="single" collapsible>
        <AccordionItem value="register-ipa" className="bg-white px-4 rounded-xl mt-4">
          <AccordionTrigger>Register IP Asset</AccordionTrigger>
          <AccordionContent>
            <RegisterIpAssetForm />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="register-pil" className="bg-white px-4 rounded-xl mt-4">
          <AccordionTrigger>Register PIL Policy</AccordionTrigger>
          <AccordionContent>
            <RegisterPilPolicyForm />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="add-policy-to-ipa" className="bg-white px-4 rounded-xl mt-4">
          <AccordionTrigger>Add Policy to IP Asset</AccordionTrigger>
          <AccordionContent>
            <AddPolicyToIpAssetForm />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="mint-license" className="bg-white px-4 rounded-xl mt-4">
          <AccordionTrigger>Mint License NFT</AccordionTrigger>
          <AccordionContent>
            <MintLicenseForm />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="register-derivative" className="bg-white px-4 rounded-xl mt-4">
          <AccordionTrigger>Register Derivative IP Asset</AccordionTrigger>
          <AccordionContent>
            <RegisterDerivativeIpAssetForm />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
