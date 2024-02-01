import storyClient from '@/lib/SP';

import NivoChartDemo from '@/components/charts/NivoChartDemo';
import TransactionTableWrapper from '@/components/views/Transactions/TransactionTableWrapper';
import IPOrgDataViewerWrapper from '@/components/views/IPOrg/IPOrgDataViewerWrapper';
import TxnTypeCountCard from '@/components/dashboard/TxnTypeCountCard';
import { getTxnDataInsights } from '@/utils';
import WalletCountTable from '@/components/tables/WalletCountTable';

export const revalidate = 60;
export const fetchCache = 'force-no-store';

export default async function Home() {
  const { transactions: transactionData } = await storyClient.transaction.list({});

  const { totalTypes, walletData }: any = getTxnDataInsights(transactionData);

  return (
    <div>
      <div className="w-full p-4 md:p-8 max-w-[1600px] mx-auto">
        <div className="flex flex-col items-left gap-6 mb-6">
          <h1 className="text-xl md:text-4xl font-semibold leading-none">Overview</h1>
          <ul
            role="list"
            className="grid grid-cols-4 gap-3 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3 2xl:grid-cols-4 w-full"
          >
            <TxnTypeCountCard name={'IP Orgs'} count={totalTypes?.IPOrg} />
            <TxnTypeCountCard name={'IP Asset'} count={totalTypes?.IPAsset} />
            <TxnTypeCountCard name={'Relationship'} count={totalTypes?.Relationship} />
            <TxnTypeCountCard name={'RelationshipTypes'} count={totalTypes?.RelationshipType} />
          </ul>

          {/* <div className="flex flex-col sm:flex-row gap-3 sm:gap-6"> */}
          <NivoChartDemo data={transactionData} />

          {/* <NivoChartDemo data={transactionData} />
          </div> */}

          <WalletCountTable data={walletData} />

          <h1>Transactions</h1>
          {/* TODO } */}
          <TransactionTableWrapper pageSize={5} />

          <h1>IP Org</h1>
          {/* TODO } */}
          <IPOrgDataViewerWrapper tableOnly pageSize={5} />
        </div>
      </div>
    </div>
  );
}
