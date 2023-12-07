import SkeletonTransactionCard from '@/components/Skeletons/SkeletonTransactionCard';
import TransactionDetailComponent from '@/components/views/Transactions/TransactionDetailComponent';
import React, { Suspense } from 'react';

export default function TransactionDetails({ params: { transactionId } }: { params: { transactionId: string } }) {
  return (
    <div>
      <div className="container">
        <div className="flex flex-col items-left gap-2">
          <div className="relative px-2 md:px-0 mt-6">{/* <TransactionCard classname="mt-6" /> */}</div>
          <Suspense fallback={<SkeletonTransactionCard />}>
            <TransactionDetailComponent txHash={transactionId} />
          </Suspense>

          {/* <div className="relative rounded-xl px-2 md:px-0 mt-6 bg-[#FFFFFF] !p-5 dark:bg-[#2C2B35]">
            <button
              className="flex w-full items-center justify-between rounded-lg py-2 text-left font-medium tracking-wide opacity-70 hover:opacity-100 focus:outline-none"
              id="headlessui-disclosure-button-:r1:"
              type="button"
              aria-expanded="false"
              data-headlessui-state=""
            >
              <span>See more details</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className="rotate-180 transform h-5 w-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
