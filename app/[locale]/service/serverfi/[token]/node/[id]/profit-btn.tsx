import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useLedger } from '@/lib/api/use-ledger';
import { formatNum } from '@/lib/number';

export function ProfitBtn({ serverId }: { serverId: number }) {
  const T = useTranslations('Common');

  const { data: userLedger } = useLedger(serverId || null);

  return (
    <div className="flex flex-1">
      <div className="h-12 w-[244px] p-2 flex relative z-20 items-center rounded-full bg-[#202022]">
        <div className="w-8 h-8 mr-[10px] flex items-center justify-center rounded-full border border-solid border-[rgba(255,255,255,0.2)]">
          <Image src="/icons/dollar.svg" width={16} height={16} alt="dollar" />
        </div>
        <div className="text-[rgba(255,255,255,0.4)] font-hel text-base left-5">{T('PotentialProfit')}</div>
        <div className="ml-5 text-white font-hel leading-5 text-[22px]">{userLedger?.potential_profit ? `${'$'}${formatNum(userLedger?.potential_profit)}` : '--'}</div>
      </div>
      <div
        style={{
          backgroundImage: 'url(/images/dashed.svg)',
          backgroundPositionX: '-277px',
        }}
        className="flex-1 relative bg-no-repeat -ml-2 z-10"
      ></div>
    </div>
  );
}
