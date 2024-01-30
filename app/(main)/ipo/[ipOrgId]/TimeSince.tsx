import moment from 'moment';
import { getBlockTimestampFromTransaction } from '@/lib/server/transaction';
import { Skeleton } from '@/components/ui/skeleton';

export const Fallback = () => <Skeleton className=" w-48 h-4" />;

export default async function TimeSince({ txHash }: { txHash: string }) {
  const timestamp = await getBlockTimestampFromTransaction(txHash);

  return (
    <div className="flex items-center space-x-2 break-all">
      <span className="shrink truncate">{moment.unix(timestamp).format('ddd Do MMMM YYYY, h:mm a [GMT]Z')}</span>
    </div>
  );
}
