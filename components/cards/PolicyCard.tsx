import { LicenseTerm } from '@/lib/server/types';
import { cleanAndParseJson } from '@/utils';
import JsonView from '@uiw/react-json-view';
import { lightTheme } from '@uiw/react-json-view/light';
import moment from 'moment';
import React from 'react';

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => {
  return (
    <div className="py-4 sm:grid sm:grid-cols-5 sm:gap-4">
      <dt className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">{label}</dt>
      <dd className="relative w-full truncate mt-1 flex items-center space-x-2 text-sm leading-6 text-gray-700 dark:text-gray-200 sm:col-span-4 sm:mt-0">
        {children}
      </dd>
    </div>
  );
};

export default function PolicyCard({ data }: { data: LicenseTerm }) {
  return (
    <div className="bg-white rounded-xl w-full p-6">
      <Row label="Policy ID">{data.id}</Row>
      <Row label="License Template">{data.license_template}</Row>
      {/* <Row label="Blocknumber">{data.blockNumber}</Row> */}
      <Row label="Created At">
        {moment.unix(parseInt(data.block_time)).fromNow()}
        <span className="font-light text-gray-500 ml-2">
          ({moment.unix(parseInt(data.block_time)).format('Do MMMM YYYY, h:mm a')})
        </span>
      </Row>
      <Row label="PIL data">
        <></>
        <JsonView value={cleanAndParseJson(data.json)} className="w-full" style={lightTheme} />
      </Row>
    </div>
  );
}
