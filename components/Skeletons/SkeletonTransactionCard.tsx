import React from 'react';
import { Skeleton } from '../ui/skeleton';

export default function SkeletonTransactionCard() {
  return (
    <div className={'relative rounded-xl px-2 md:px-0 bg-[#FFFFFF] !p-5 dark:bg-[#2C2B35]'}>
      <div className="flex flex-wrap items-center justify-between space-y-3 px-4 sm:px-0">
        <div>
          <h1 className="font-medium md:text-3xl">
            <Skeleton className="h-10 w-[200px] bg-indigo-200" />
          </h1>
          {/* <p className="text-sm opacity-60">All Transaction related information will be displayed here.</p> */}
        </div>
        <button className="group ml-auto flex">
          <Skeleton className="h-4 w-[100px] rounded-full bg-indigo-200" />
        </button>
      </div>
      <div className="mt-6 border-t border-gray-200 dark:border-gray-900">
        <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">
            <Skeleton className="h-4 w-[100px] bg-indigo-200" />
          </dt>
          <dd className="mt-1 flex items-center space-x-2 text-sm leading-6 text-gray-700 dark:text-gray-200 sm:col-span-4 sm:mt-0">
            <span className="truncate">
              <span>
                <Skeleton className="h-4 w-[500px] bg-indigo-100" />
              </span>
            </span>
          </dd>
        </div>
        <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">
            <Skeleton className="h-4 w-[100px] bg-indigo-200" />
          </dt>
          <dd className="mt-1 flex items-center space-x-2 text-sm leading-6 text-gray-700 dark:text-gray-200 sm:col-span-4 sm:mt-0">
            <span className="truncate">
              <div className="flex items-center space-x-2">
                <span>
                  <Skeleton className="h-4 w-[300px] bg-indigo-100" />
                </span>
              </div>
            </span>
          </dd>
        </div>
        <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">
            <Skeleton className="h-4 w-[100px] bg-indigo-200" />
          </dt>
          <dd className="mt-1 flex items-center space-x-2 text-sm leading-6 text-gray-700 dark:text-gray-200 sm:col-span-4 sm:mt-0">
            <span className="truncate">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-6 w-[100px] bg-indigo-100 rounded-md" />
              </div>
            </span>
          </dd>
        </div>
        <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">
            <Skeleton className="h-4 w-[100px] bg-indigo-200" />
          </dt>
          <dd className="mt-1 flex items-center space-x-2 text-sm leading-6 text-gray-700 dark:text-gray-200 sm:col-span-4 sm:mt-0">
            <span>
              <Skeleton className="h-4 w-[200px] bg-indigo-100" />
            </span>
          </dd>
        </div>
        {/* <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">Submitter</dt>
        <dd className="mt-1 flex items-center space-x-2 text-sm leading-6 text-gray-700 dark:text-gray-200 sm:col-span-4 sm:mt-0">
          <span className="truncate">
            <div className="flex items-center space-x-2 break-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                ></path>
              </svg>
              <b>0xBe29464B9784a0d8956f29630d8bc4D7B5737435</b>
            </div>
          </span>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              className="h-4 w-4 text-gray-500 dark:text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
              ></path>
            </svg>
          </button>
        </dd>
      </div> */}
        <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">
            <Skeleton className="h-4 w-[100px] bg-indigo-200" />
          </dt>
          <dd className="mt-1 flex items-center space-x-2 text-sm leading-6 text-gray-700 dark:text-gray-200 sm:col-span-4 sm:mt-0">
            <span className="truncate">
              <a className="inline-flex items-center space-x-2 rounded-lg text-sm" href="/profile/0x01e89d">
                <Skeleton className="h-8 w-8 rounded-full bg-indigo-100" />
                <div>
                  <div className="font-bold">
                    <Skeleton className="h-4 w-[300px] bg-indigo-100" />
                  </div>
                </div>
              </a>
            </span>
          </dd>
        </div>
        {/* <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">Arweave ID</dt>
        <dd className="mt-1 flex items-center space-x-2 text-sm leading-6 text-gray-700 dark:text-gray-200 sm:col-span-4 sm:mt-0">
          <span className="truncate">
            <a
              className="flex items-center space-x-2 text-[#3D794E] underline dark:text-[#D0DBFF]"
              target="_blank"
              href="#"
            >
              <span>ar://0x01e89d-0x01-DA-e12b2a3c</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                ></path>
              </svg>
            </a>
          </span>
        </dd>
      </div> */}
        <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">
            <Skeleton className="h-4 w-[100px] bg-indigo-200" />
          </dt>
          <dd className="mt-1 flex items-center space-x-2 text-sm leading-6 text-gray-700 dark:text-gray-200 sm:col-span-4 sm:mt-0">
            <span>
              <Skeleton className="h-4 w-[100px] bg-indigo-100" />
            </span>
          </dd>
        </div>
        <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">
            <Skeleton className="h-4 w-[100px] bg-indigo-200" />
          </dt>
          <dd className="mt-1 flex items-center space-x-2 text-sm leading-6 text-gray-700 dark:text-gray-200 sm:col-span-4 sm:mt-0">
            <span>
              <Skeleton className="h-4 w-[100px] bg-indigo-100" />
            </span>
          </dd>
        </div>
        {/* <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">Posted via</dt>
                <dd className="mt-1 flex items-center space-x-2 text-sm leading-6 text-gray-700 dark:text-gray-200 sm:col-span-4 sm:mt-0">
                  <span className="truncate">
                    <div className="flex items-center space-x-2">
                      <img
                        src="https://static-assets.hey.xyz/images/source/hey.jpeg"
                        className="h-5 w-5 rounded-full"
                        alt="hey"
                        draggable="false"
                      />
                      <span>Hey</span>
                    </div>
                  </span>
                </dd>
              </div> */}
      </div>
    </div>
  );
}
