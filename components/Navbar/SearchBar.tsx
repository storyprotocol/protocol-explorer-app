'use client';
import { ChangeEvent, useEffect, useState, useRef } from 'react';
import { Combobox } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { FolderIcon, RectangleStackIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { debounce } from '@/utils';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [collections, setCollections] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const autocompleteRef = useRef(null);

  const hasResults = collections.length > 0;

  useEffect(() => {
    setCollections([
      {
        id: '0xasdasdasdasda',
      },
    ]);
  }, []);

  console.log({ collections });

  useEffect(() => {
    if (query.includes('0x')) {
      try {
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/collections/${query}`, {
          headers: {
            'x-api-key': process.env.NEXT_PUBLIC_STORY_PROTOCOL_X_API_KEY as string,
          },
        })
          .then((res) => {
            if (res.status === 200) {
              return res.json();
            } else {
              setCollections([
                {
                  id: '0xasdasdasdasda',
                },
              ]);
              return;
            }
          })
          .then((collectionData) => {
            if (collectionData.data) {
              setCollections([collectionData.data]);
            }
          });
      } catch (e) {
        console.log('collections');
      }
    }
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (autocompleteRef.current && !(autocompleteRef.current as any).contains(event.target)) {
        setShowAutocomplete(false);
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
        <div className="relative" ref={autocompleteRef}>
          <MagnifyingGlassIcon
            className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          <Combobox.Input
            className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 sm:text-sm focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 "
            placeholder="Search..."
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
            className="absolute w-full top-16 max-h-80 scroll-py-2 divide-y divide-gray-100 overflow-y-auto z-30 bg-white shadow-md rounded-b-xl"
          >
            {transactions.length > 0 && (
              <li className="p-2">
                <h2 className="mb-2 mt-4 px-3 text-xs font-semibold text-gray-500">Transactions</h2>

                <ul className="text-sm text-gray-700">
                  {transactions.map((txn) => (
                    <Combobox.Option
                      key={txn.id}
                      value={txn.id}
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
                          <span className="ml-3 flex-auto truncate">{txn.id}</span>
                          {active && <span className="ml-3 flex-none text-indigo-100">Jump to...</span>}
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
                          <span className="ml-3 flex-auto truncate">{collection.id}</span>
                          {active && <span className="ml-3 flex-none text-indigo-100">Jump to...</span>}
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
      </Combobox>
    </div>
  );
}
