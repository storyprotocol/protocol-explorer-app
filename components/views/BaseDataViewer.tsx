'use client';

import React, { useState } from 'react';
import SortableTable from '@/components/tables/SortableTable';
import Grid from '../Grid/Grid';
import { cn } from '@/utils';
import { TableCellsIcon } from '@heroicons/react/24/outline';
import { LayoutGridIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';

// Define the props that your CardComponent expects
type CardComponentProps = {
  data: any;
};

export default function BaseViewSwitcher({
  data,
  columns,
  tableOnly,
  gridOnly,
  cardOnly,
  pageSize,
  hasSearch = true,
  cardComponent: CardComponent = () => <></>,
}: {
  data: any;
  columns: any;
  tableOnly?: boolean;
  gridOnly?: boolean;
  cardOnly?: boolean;
  pageSize?: number;
  hasSearch?: boolean;
  cardComponent?: React.ComponentType<CardComponentProps>;
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [isGrid, setIsGrid] = useState(true);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Filter data based on the search term
    const value: string = e.target.value;
    setSearchTerm(value);
    const filtered = data.filter((d: any) => {
      if (value[0] === '#') {
        return d.id?.toLowerCase() === value.split('#')[1].toLowerCase();
      } else {
        return (
          d.name?.toLowerCase().includes(value.toLowerCase()) ||
          d.owner?.toLowerCase().includes(value.toLowerCase()) ||
          d.id?.toLowerCase().includes(value.toLowerCase()) ||
          d.initiator?.toLowerCase().includes(value.toLowerCase()) ||
          d.ipOrgId?.toLowerCase().includes(value.toLowerCase()) ||
          d.actionType?.toLowerCase().includes(value.toLowerCase()) ||
          d.resourceType?.toLowerCase().includes(value.toLowerCase()) ||
          d.txHash?.toLowerCase().includes(value.toLowerCase()) ||
          d.ipAssetId?.toLowerCase().includes(value.toLowerCase()) ||
          d.ipAssetName?.toLowerCase().includes(value.toLowerCase())
        );
      }
    });
    setFilteredData(filtered);
  };
  const TableComp = () => (
    <div className="pt-5">
      <SortableTable data={filteredData} columns={columns} pageSize={pageSize} />
    </div>
  );
  const GridComp = () => (
    <Grid>
      {filteredData?.map((d: any, id: number) => {
        return <CardComponent key={id} data={d} />;
      })}
    </Grid>
  );
  const CardFlexComp = () => (
    <div className="flex flex-col gap-2">
      {filteredData?.map((d: any, id: number) => {
        return <CardComponent key={id} data={d} />;
      })}
    </div>
  );

  const renderDataView = () => {
    if (tableOnly) {
      return <TableComp />;
    } else if (gridOnly) {
      return <GridComp />;
    } else if (cardOnly) {
      return <CardFlexComp />;
    } else {
      return isGrid ? <GridComp /> : <TableComp />;
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        {/* <h1 className="text-xl md:text-xl font-medium">{name}</h1> */}
        {hasSearch && (
          <Input
            placeholder="Search by ID, Name, or Txn Hash"
            value={searchTerm}
            onChange={handleSearch}
            className="max-w-sm focus-visible:ring-indigo-500"
          />
        )}
        {!(tableOnly || gridOnly || cardOnly) && (
          <span className="isolate inline-flex rounded-md shadow-sm">
            <button
              type="button"
              onClick={() => {
                setIsGrid(true);
              }}
              className={cn(
                'transition-all relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-indigo-500 focus:z-10',
                isGrid ? 'bg-indigo-100 text-indigo-500' : 'text-gray-500 ',
              )}
            >
              <LayoutGridIcon className="h-5 w-5" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => {
                setIsGrid(false);
              }}
              className={cn(
                'transition-all relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-indigo-500 focus:z-10',
                !isGrid ? 'bg-indigo-100 text-indigo-500' : 'text-gray-500',
              )}
            >
              <TableCellsIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </span>
        )}
      </div>
      {renderDataView()}
    </div>
  );
}
