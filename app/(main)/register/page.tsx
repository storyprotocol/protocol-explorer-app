import React from 'react';
import { RegisterIpAssetForm } from './RegisterIpAssetForm';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { RegisterPilPolicyForm } from './RegisterPilPolicy';
import { AddPolicyToIpAssetForm } from './AddPolicyToIpAssetForm';
import { MintLicenseForm } from './MintLicenseForm';
import { RegisterDerivativeIpAssetForm } from './RegisterDerivativeIpAssetForm';
import MintNft from './MintNft';
import { ReadIpIdForm } from './ReadIpIdForm';

// Register IPA
// Register Derivative
// Register PIL Policy
// Attach Policy to IPA
// Mint license

export default function page() {
  return (
    <div className="w-full p-4 md:p-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col items-left pt-16 md:pt-10">
        <h1 className="text-xl md:text-2xl font-semibold leading-none mb-2">Register</h1>
      </div>
      <p className="text-sm">
        This page provides a convenient method to read and write from the Story Protocol contracts
      </p>
      <Accordion type="single" collapsible>
        <AccordionItem value="mint-nft" className="bg-white px-4 rounded-xl mt-4">
          <AccordionTrigger>Mint a test ERC721 NFT</AccordionTrigger>
          <AccordionContent className="px-2">
            <MintNft />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="register-ipa" className="bg-white px-4 rounded-xl mt-4">
          <AccordionTrigger>Register IP Asset</AccordionTrigger>
          <AccordionContent className="px-2">
            <RegisterIpAssetForm />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="register-pil" className="bg-white px-4 rounded-xl mt-4">
          <AccordionTrigger>Register PIL Policy</AccordionTrigger>
          <AccordionContent className="px-2">
            <RegisterPilPolicyForm />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="add-policy-to-ipa" className="bg-white px-4 rounded-xl mt-4">
          <AccordionTrigger>Add Policy to IP Asset</AccordionTrigger>
          <AccordionContent className="px-2">
            <AddPolicyToIpAssetForm />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="mint-license" className="bg-white px-4 rounded-xl mt-4">
          <AccordionTrigger>Mint License NFT</AccordionTrigger>
          <AccordionContent className="px-2">
            <MintLicenseForm />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="register-derivative" className="bg-white px-4 rounded-xl mt-4">
          <AccordionTrigger>Register Derivative IP Asset</AccordionTrigger>
          <AccordionContent className="px-2">
            <RegisterDerivativeIpAssetForm />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="flex flex-col items-left pt-16 md:pt-10">
        <h1 className="text-xl md:text-2xl font-semibold leading-none mb-2">Read Contract Storage Variables</h1>
      </div>
      <Accordion type="single" collapsible>
        <AccordionItem value="read-ip-id" className="bg-white px-4 rounded-xl mt-4">
          <AccordionTrigger>Read IP ID</AccordionTrigger>
          <AccordionContent className="px-2">
            <ReadIpIdForm />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
