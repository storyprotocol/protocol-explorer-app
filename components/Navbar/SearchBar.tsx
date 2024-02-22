'use client';
import { ChangeEvent, useEffect, useState, useRef } from 'react';
import { Combobox } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { ArrowsRightLeftIcon, FolderIcon, RectangleStackIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { debounce } from '@/utils';
import { getResource } from '@/lib/server/sdk';
import { Asset, Collection, RESOURCE_TYPE, Transaction } from '@/lib/server/types';
import Link from 'next/link';
import IPIcon from '../icons/IPIcon';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [collections, setCollections] = useState<Collection[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [ipAssets, setIpAssets] = useState<Asset[]>([]);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const autocompleteRef = useRef(null);

  const hasResults = collections.length > 0 || transactions.length > 0 || ipAssets.length > 0;

  console.log({ collections, ipAssets, transactions });

  useEffect(() => {
    if (query.includes('0x')) {
      try {
        // fetch transactions
        getResource(RESOURCE_TYPE.TRANSACTION, query).then((res) => {
          if (res?.data) {
            setTransactions([res.data]);
          } else {
            setTransactions([]);
          }
        });

        // fetch collections
        getResource(RESOURCE_TYPE.COLLECTION, query).then((res) => {
          if (res?.data) {
            setCollections([res.data]);
          } else {
            setCollections([]);
          }
        });

        // fetch ipAssets
        getResource(RESOURCE_TYPE.ASSET, query).then((res) => {
          if (res?.data) {
            setIpAssets([res.data]);
          } else {
            setIpAssets([]);
          }
        });
      } catch (e) {
        console.log('collections');
      }
    }
  }, [query]);

  const handleLinkClick = () => {
    setShowAutocomplete(false);
    setQuery('');
    setCollections([]);
    setTransactions([]);
    setIpAssets([]);
  };

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (autocompleteRef.current && !(autocompleteRef.current as any).contains(event.target)) {
        setShowAutocomplete(false);
        setQuery('');
        setCollections([]);
        setTransactions([]);
        setIpAssets([]);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex flex-col justify-center flex-1 bg-white transition-all">
      <Combobox onChange={() => {}}>
        <div ref={autocompleteRef}>
          <div className="relative">
            <MagnifyingGlassIcon
              className="pointer-events-none absolute left-0 md:left-4 top-3.5 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            <Combobox.Input
              className="h-12 w-full border-0 bg-transparent pl-6 md:pl-11 pr-4 text-gray-900 placeholder:text-gray-400 text-xs sm:text-sm focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 "
              placeholder="Search by Address / Txn Hash / IP Asset ID"
              onChange={debounce((event: ChangeEvent<HTMLInputElement>) => {
                setQuery(event.target.value);
                setShowAutocomplete(true);
              })}
            />
          </div>

          {/* Autocomplete section start */}

          {showAutocomplete && query !== '' && hasResults && (
            <Combobox.Options
              static
              className="absolute text-xs w-full top-16 max-h-80 scroll-py-2 divide-y divide-gray-100 overflow-y-auto z-30 bg-white shadow-md rounded-b-xl"
            >
              {transactions.length > 0 && (
                <li className="p-2">
                  <h2 className="mb-2 mt-4 px-3 text-xs font-semibold text-gray-500">Transactions</h2>

                  <ul className="text-sm text-gray-700">
                    {transactions.map((txn) => (
                      <Combobox.Option
                        key={txn.id}
                        value={txn.id}
                        as={Link}
                        href={`/transactions/${txn.id}`}
                        onClick={handleLinkClick}
                        className={({ active }) =>
                          classNames(
                            'flex flex-row cursor-default select-none items-center rounded-md px-3 py-2',
                            active && 'bg-indigo-600 text-white',
                          )
                        }
                      >
                        {({ active }) => (
                          <>
                            <ArrowsRightLeftIcon
                              className={classNames('h-6 w-6 flex-none', active ? 'text-white' : 'text-gray-400')}
                              aria-hidden="true"
                            />
                            <span className="ml-3 flex-auto text-xs truncate">{txn.id}</span>
                            {active && <span className="ml-3 flex-none text-xs text-indigo-100">Jump to...</span>}
                          </>
                        )}
                      </Combobox.Option>
                    ))}
                  </ul>
                </li>
              )}

              {collections.length > 0 && (
                <li className="p-2">
                  <h2 className="mb-2 mt-4 px-3 text-xs font-semibold text-gray-500">Collections</h2>

                  <ul className="text-sm text-gray-700">
                    {collections.map((collection) => (
                      <Combobox.Option
                        as={Link}
                        href={`/collections/${collection.id}`}
                        onClick={handleLinkClick}
                        key={collection.id}
                        value={collection.id}
                        className={({ active }) =>
                          classNames(
                            'flex cursor-default select-none items-center rounded-md px-3 py-2',
                            active && 'bg-indigo-600 text-white',
                          )
                        }
                      >
                        {({ active }) => (
                          <>
                            <RectangleStackIcon
                              className={classNames('h-6 w-6 flex-none', active ? 'text-white' : 'text-gray-400')}
                              aria-hidden="true"
                            />
                            <span className="ml-3 flex-auto text-xs truncate">{collection.id}</span>
                            {active && <span className="ml-3 flex-none text-xs text-indigo-100">Jump to...</span>}
                          </>
                        )}
                      </Combobox.Option>
                    ))}
                  </ul>
                </li>
              )}
              {ipAssets.length > 0 && (
                <li className="p-2">
                  <h2 className="mb-2 mt-4 px-3 text-xs font-semibold text-gray-500">Assets</h2>

                  <ul className="text-sm text-gray-700">
                    {ipAssets.map((asset) => (
                      <Combobox.Option
                        as={Link}
                        href={`/ipa/${asset.id}`}
                        onClick={handleLinkClick}
                        key={asset.id}
                        value={asset.id}
                        className={({ active }) =>
                          classNames(
                            'flex cursor-default select-none items-center rounded-md px-3 py-2',
                            active && 'bg-indigo-600 text-white',
                          )
                        }
                      >
                        {({ active }) => (
                          <>
                            <IPIcon
                              className={classNames('h-6 w-6 flex-none', active ? 'text-white' : 'text-gray-400')}
                              aria-hidden="true"
                            />
                            <span className="ml-3 flex-auto text-xs truncate">{asset.id}</span>
                            {active && <span className="ml-3 flex-none text-xs text-indigo-100">Jump to...</span>}
                          </>
                        )}
                      </Combobox.Option>
                    ))}
                  </ul>
                </li>
              )}
            </Combobox.Options>
          )}

          {query !== '' && !hasResults && (
            <div className="absolute top-16 w-full px-6 py-14 text-center sm:px-14 bg-white shadow-md rounded-b-xl">
              <FolderIcon className="mx-auto h-6 w-6 text-gray-400" aria-hidden="true" />
              <p className="mt-4 text-sm text-gray-900">
                {`We couldn't find anything on our protocol with that term. Please try again.`}
              </p>
            </div>
          )}
          {/* Autocomplete section end */}
        </div>
      </Combobox>
    </div>
  );
}
