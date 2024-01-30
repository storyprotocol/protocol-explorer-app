import moment from 'moment';
import { getBlockTimestampFromTransaction } from '@/lib/server/transaction';
import { Skeleton } from '@/components/ui/skeleton';
import Icons from '@/components/ui/icons';

export const Fallback = () => <Skeleton className=" w-48 h-6" />;

export default async function TimeSince({ txHash }: { txHash: string }) {
  const timestamp = await getBlockTimestampFromTransaction(txHash);

  return (
    <div className="flex items-center space-x-2 break-all">
      <Icons.clock className="h-4 w-4 shrink-0" />
      <b className="shrink truncate">
        {moment.unix(timestamp).fromNow()}
        <span className="font-light text-gray-500 ml-2">({moment.unix(timestamp).format('Do MMMM YYYY, h:mm a')})</span>
      </b>
    </div>
  );
}
