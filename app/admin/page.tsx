import React from 'react';

import IpOrgReadAccordion from './IPOrgReadAccordion';
import IpOrgWriteAccordion from './IPOrgWriteAccordion';

import LicenseReadAccordion from './LicenseReadAccordion';
import RelationshipReadAccordion from './RelationshipReadAccordion';
import TransactionReadAccordion from './TransactionReadAccordion';
import RelationshipWriteAccordion from './RelationshipWriteAccordion';
import IPAssetReadAccordion from './IPAssetReadAccordion';
import IPAssetWriteAccordion from './IPAssetWriteAccordion';
import RelationshipTypeReadAccordion from './RelationshipTypeReadAccordion';
import RelationshipTypeWriteAccordion from './RelationshipTypeWriteAccordion';
import HookReadAccordion from './HookReadAccordion';
import ModuleReadAccordion from './ModuleReadAccordion';

export default function Page() {
  return (
    <main className="p-10 max-w-[1600px] mx-auto">
      <h1 className="text-2xl pb-4">Read from SDK</h1>
      <section className="flex flex-col gap-4">
        <TransactionReadAccordion />
        <IpOrgReadAccordion />
        <IPAssetReadAccordion />
        <RelationshipReadAccordion />
        <RelationshipTypeReadAccordion />
        <LicenseReadAccordion />
        <ModuleReadAccordion />
        <HookReadAccordion />
      </section>
      <h1 className="text-2xl pt-10 pb-4">Write from SDK</h1>
      <section className="flex flex-col gap-4">
        <IpOrgWriteAccordion />
        <IPAssetWriteAccordion />
        <RelationshipWriteAccordion />
        <RelationshipTypeWriteAccordion />
      </section>
    </main>
  );
}
