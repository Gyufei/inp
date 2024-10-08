import { useActivities } from '@/lib/api/use-activities';
import { truncateAddr } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { useAccount } from 'wagmi';

export function NodeMembers({ serverId }: { serverId: number }) {
  const T = useTranslations('Common');
  const { address } = useAccount();

  const { data: activities } = useActivities(serverId);
  const userBalances: { [key: string]: number } = {};

  (activities || []).forEach((transaction) => {
    const user = transaction.user;
    const amount = parseInt(transaction.amount);
    if (transaction.action === 'Deposit') {
      userBalances[user] = (userBalances[user] || 0) + amount;
    } else if (transaction.action === 'Withdraw') {
      userBalances[user] = (userBalances[user] || 0) - amount;
    }
  });

  const totalAmount = Object.values(userBalances).reduce((acc: number, val) => acc + val, 0) as number;

  const combinedData = Object.keys(userBalances)
    .map((user) => {
      return {
        user: user,
        final_amount: userBalances[user],
        percentage: totalAmount === 0 ? 0 : ((userBalances[user] / totalAmount) * 100).toFixed(2),
      };
    })
    .filter((num) => num.percentage !== '0.00')
    .sort((a, b) => +b.percentage - +a.percentage);

  return (
    <div className="w-[452px] ml-[8px]">
      <div
        className="w-[188px] h-[68px] bg-no-repeat flex items-center justify-center pl-6 text-2xl leading-9 text-white font-cal"
        style={{
          backgroundImage: "url('/images/1138.png')",
          backgroundSize: 'cover',
          float: 'right',
        }}
      >
        {T('Members')}
      </div>
      <div className="w-full  float-left py-[20px] bg-[rgba(255,255,255,0.1)] rounded-[30px] rounded-tr-none ">
        <div className=" w-full  min-h-[334px] max-h-[1250px] overflow-y-auto trans-scroll-bar backdrop-blur-[20px] px-6 py-[10px]">
          {(combinedData || []).map((num: any) => (
            <div className="flex justify-between h-12 pl-[10px] py-3 bg-[rgba(22,23,22,0.01)] mt-[10px]" key={num.user}>
              <div className="w-[15%] text-base leading-6 text-white font-normal">
                {truncateAddr(num.user, { nPrefix: 6, nSuffix: 4 })}
                {num.user === address?.toLowerCase() && <span>(me)</span>}
              </div>
              <div className="w-[45%] text-base leading-6 text-white font-normal flex items-center">
                {num.final_amount}
                <p className="pl-1 pr-2">MAK</p>
                {`(${num.percentage}%)`}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
