'use client';
import React from 'react';
import * as z from 'zod';
import { ConfigureLicenseRequest, CreateLicenseRequest } from '@story-protocol/core-sdk';
import useCreateLicense from '@/hooks/useCreateLicense';
import ConfigureLicenseWriteAccordionInputForm from './ConfigureLicenseWriteAccordionInputForm';
import CreateLicenseWriteAccordionInputForm from './LicenseWriteAccordionInputForm';
import useConfigureLicense from '@/hooks/useConfigureLicense';

export default function CreateLicenseNftWriteAccordion({
  createDefaultValues,
  configureDefaultValues,
}: {
  createDefaultValues: Partial<CreateLicenseRequest>;
  configureDefaultValues: Partial<ConfigureLicenseRequest>;
}) {
  const createLicenseSchema = z.object({
    ipOrgId: z.string().min(1, {
      message: 'Required.',
    }),
    ipaId: z.string().optional(),
    // parentLicenseId: z.string().optional(),
  });

  const createDescriptions = {
    ipaId:
      'Specify the IPA ID if you want to create a license specifically for an IP Asset. Else, leave empty or enter 0',
    attribution: 'To specify if the license requires the licensee to credit the original IP',
  };

  const configureLicenseSchema = z.object({
    ipOrg: z.string().min(1, {
      message: 'Required.',
    }),
    frameworkId: z.nativeEnum({
      'SPUML-1.0': 'SPUML-1.0',
    }),
    licensor: z.nativeEnum({
      IpOrgOwnerAlways: 1,
      Source: 2,
    }),
    attribution: z.boolean(),
    ipaId: z.string().optional(),
  });

  const configureDescriptions = {
    ipaId:
      'Specify the IPA ID if you want to create a license specifically for an IP Asset. Else, leave empty or enter 0',
    frameworkId:
      'The framework ID of the license. Only SPUML-1.0 is currently supported (https://github.com/storyprotocol/protocol-contracts/blob/main/SPUML-v1.pdf)',
    licensor:
      'Specify the licensor configuration type. `IpOrgOwnerAlways` will set the licensor as the IP Org. `Source` will inherit the license from its appropriate source (parent license, linked license, or inherit from IP Org).',
    attribution: 'To specify if the license requires the licensee to credit the original IP',
  };

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-semibold text-2xl">License</h1>
      <ConfigureLicenseWriteAccordionInputForm
        fcnName={'license.configure'}
        description={"Configure your IP Org's licensing framework before being able to create a license."}
        formSchema={configureLicenseSchema}
        hook={useConfigureLicense}
        defaultValues={configureDefaultValues}
        descriptions={configureDescriptions}
      />
      <CreateLicenseWriteAccordionInputForm
        fcnName={'license.create'}
        description={'To create a license, you must first configure your IPO.'}
        formSchema={createLicenseSchema}
        hook={useCreateLicense}
        defaultValues={createDefaultValues}
        descriptions={createDescriptions}
      />
    </div>
  );
}
