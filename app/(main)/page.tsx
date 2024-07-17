import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import AssetDataViewerWrapper from '@/components/views/Asset/AssetDataViewerWrapper';
import TransactionTableWrapper from '@/components/views/Transactions/TransactionTableWrapper';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Suspense } from 'react';
import { FaDiscord, FaGithub } from 'react-icons/fa';

export const revalidate = 60;
export const fetchCache = 'force-no-store';

const INTRO_CARDS = [
  {
    title: 'Get started',
    description: 'Learn about Story Protocol, Programmable IP, core modules with our Beta documentation.',
    cta: 'View Docs',
    href: 'https://docs.storyprotocol.xyz/docs/what-is-story-protocol',
    icon: DocumentTextIcon,
  },
  {
    title: 'Start building',
    description: 'Check out our open-source SDK in Typescript or React to start building on our Protocol',
    cta: 'Visit Github',
    href: 'https://github.com/storyprotocol/sdk',
    icon: FaGithub,
  },
  {
    title: 'Programmable IP',
    description: 'Our white paper on how Story Protocol plans to transform Programmable IPs into networks',
    cta: 'View Blog',
    href: 'https://www.storyprotocol.xyz/media/programmable-ip',
    icon: DocumentTextIcon,
  },
  {
    title: 'Join our community',
    description: "Join our community on Discord and get involved in the world's first decentralized IP protocol.",
    cta: 'Join Discord',
    href: 'https://discord.gg/storyprotocol',
    icon: FaDiscord,
  },
];

function IntroCard({ data }: { data?: any }) {
  return (
    <Link
      className="block p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      href={data.href}
      target="_blank"
    >
      <div className="relative w-6 h-6 mb-3">
        <span
          style={{
            boxSizing: 'border-box',
            display: 'block',
            overflow: 'hidden',
            width: 'initial',
            height: 'initial',
            background: 'none',
            opacity: 1,
            border: 0,
            margin: 0,
            padding: 0,
            position: 'absolute',
            inset: 0,
          }}
        >
          <data.icon className="w-6 h-6" />
        </span>
      </div>
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{data.title}</h2>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{data.description}</p>
      <span className="font-medium text-indigo-600 dark:text-indigo-500 lg:-text-sm">
        <span className="mr-1">{data.cta}</span>
        <svg
          className="w-3.5 h-3.5 ml-2 inline"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </span>
    </Link>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <div className="bg-[url('/story_banner.jpeg')] bg-cover">
        <div className="max-w-[1600px] px-4 md:px-8 py-4 mx-auto pt-20">
          <div className="flex flex-col items-left gap-6 mb-6 w-full">
            <h1 className="text-xl md:text-2xl font-semibold leading-none"></h1>
            <p></p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2  translate-y-20">
            {INTRO_CARDS.map((card, index) => (
              <IntroCard key={index} data={card} />
            ))}
          </div>
        </div>
      </div>
      <div className="pt-20">
        <div className="w-full p-4 md:p-8 max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row gap-3 w-full">
            <div className="flex flex-col w-full md:w-1/2">
              <h2 className="text-xl md:text-2xl font-semibold leading-none">Transactions</h2>
              <Suspense
                fallback={
                  <div className="pt-5">
                    <SkeletonTable />
                  </div>
                }
              >
                <TransactionTableWrapper pageSize={10} />
              </Suspense>
            </div>
            <div className="flex flex-col w-full md:w-1/2">
              {/* <div>
            <h2 className="text-xl md:text-2xl font-semibold leading-none">Collections</h2>
            <Suspense fallback={<SkeletonTable />}>
              <CollectionsDataViewerWrapper tableOnly />
            </Suspense>
          </div> */}
              <div>
                <h2 className="text-xl md:text-2xl font-semibold leading-none">IP Assets</h2>
                <Suspense>
                  <AssetDataViewerWrapper tableOnly pageSize={10} showPagination={false} />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
