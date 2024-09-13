import GoToTokenWebsite from '@/components/go-to-token-website';
import { useActivities, UserActivity } from '@/lib/api/use-activities';
import { useCurrentToken } from '@/lib/hook/use-current-token';
import { truncateAddr } from '@/lib/utils';
import { useTranslations } from 'next-intl';

export function NodeActivities({ serverId }: { serverId: number }) {
  const T = useTranslations('Common');
  const { data: activities } = useActivities(serverId);
  const currentToken = useCurrentToken();

  return (
    <div className="flex-1">
      <div className="flex w-full justify-between">
        <div
          className="w-[257px] h-[68px] bg-no-repeat flex items-center pl-6 text-2xl leading-9 text-white font-cal"
          style={{
            backgroundImage: "url('/images/1090.svg')",
          }}
        >
          {T('Activities')}
        </div>
        <GoToTokenWebsite />
      </div>
      <div className="overflow-hidden rounded-[30px]  rounded-tl-none">
        <div
          className="bg-[rgba(255,255,255,0.1)] h-[374px] overflow-y-auto trans-scroll-bar backdrop-blur-[20px] px-6 py-[50px] rounded-[30px] rounded-tl-none"
          style={{
            borderImage: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 100%)',
          }}
        >
          <div className="flex pl-[10px] border-b border-solid border-[rgba(255,255,255,0.2)] pb-[15px]">
            <div className="w-[35%]  text-base leading-5 text-[rgba(255,255,255,0.6)]">{T('Wallet')}</div>
            <div className="w-[20%] text-base leading-5 text-[rgba(255,255,255,0.6)]">{T('Op')}</div>
            <div className="w-[20%] text-base leading-5 text-[rgba(255,255,255,0.6)]">{T('Power')}</div>
            <div className="w-[25%] text-base leading-5 text-[rgba(255,255,255,0.6)]">{T('BlockNo')}</div>
          </div>
          {(activities || []).map((act: UserActivity) => (
            <div className="flex justify-between h-12 pl-[10px] py-3 bg-[rgba(22,23,22,0.01)] mt-[10px]" key={act.tx_hash}>
              <div className="w-[35%] text-base leading-6 text-white font-normal">{truncateAddr(act.user, { nPrefix: 6, nSuffix: 4 })}</div>
              <div className="w-[20%]">
                {act.action === 'Deposit' ? (
                  <div className="h-6 w-fit px-3 rounded-md bg-[rgba(105,208,255,0.2)] flex items-center text-[#6EFF90] text-xs leading-4">
                    {T('Deposit')}
                  </div>
                ) : (
                  <div className="h-6 w-fit px-3 rounded-md bg-[rgba(255,179,158,0.2)] flex items-center text-[#FFB39E] text-xs leading-4">
                    {T('Withdraw')}
                  </div>
                )}
              </div>
              <div className="w-[20%] text-base leading-5 text-[rgba(255,255,255,0.6)]">
                {act.action === 'Deposit' ? (
                  <div className="h-6 w-fit px-3 rounded-md flex items-center text-[#6EFF90] text-base leading-6">
                    +{act.amount} {currentToken?.name}
                  </div>
                ) : (
                  <div className="h-6 w-fit px-3 rounded-md flex items-center text-[#FFB39E] text-base leading-6">
                    -{act.amount} {currentToken?.name}
                  </div>
                )}
              </div>
              <div className="w-[25%] text-base leading-6 text-white font-normal">{act.block_number}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
