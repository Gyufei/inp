import { useLedger } from '@/lib/api/use-ledger';
import { IServer } from '@/lib/api/use-servers';
import { formatNum } from '@/lib/number';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export function NodeInfoRow({ server, rank }: { server: IServer | null; rank: number | null }) {
  const T = useTranslations('Common');
  const { data: userLedger } = useLedger(server?.server_id || null);

  return (
    <div className="mt-[146px] flex justify-between items-end">
      <div className="flex items-end">
        <div className="w-16 mr-[30px] self-end flex h-16 items-center justify-center rounded-full border border-solid border-[rgba(255,255,255,0.2)] bg-[rgba(7,7,9,0.2)]">
          <Image src="/icons/clap.svg" width={24} height={24} alt="clap" />
        </div>

        <div className="flex flex-col gap-y-[10px]">
          <div className="font-cal text-[#707274] font-bold text-[20px] leading-[30px]">{T('TotalMAKPower')}</div>
          <div className="font-medium text-[60px] leading-[60px] font-din text-white">{server ? formatNum(server.total_power) : '--'}</div>
        </div>

        <div className="flex flex-col gap-y-[10px] ml-[87px]">
          <div className="font-cal text-[#707274] font-bold text-[20px] leading-[30px]">{T('Rank')}</div>
          <div className="font-medium text-[60px] leading-[60px] font-din text-white">{rank || '--'}</div>
        </div>
      </div>

      <div className="flex justify-between items-end">
        <div className="flex items-end">
          <div className="w-12 h-12 mr-3 self-end flex items-center justify-center rounded-full border border-solid border-[rgba(255,255,255,0.2)] bg-[rgba(7,7,9,0.2)]">
            <Image src="/icons/lighting.svg" width={24} height={24} alt="clap" />
          </div>

          <div className="flex flex-col gap-y-1">
            <div className="text-[14px] leading-5 font-semibold text-[rgba(255,255,255,0.6)]">{T('MyMAKPower')}</div>
            <div className="font-din font-medium text-2xl leading-9 text-white">
              {userLedger ? formatNum(userLedger.stake_amount) : '--'}
            </div>
          </div>
        </div>

        <div className="flex items-end ml-[55px]">
          <div className="w-12 h-12 mr-3 self-end flex items-center justify-center rounded-full border border-solid border-[rgba(255,255,255,0.2)] bg-[rgba(7,7,9,0.2)]">
            <Image src="/icons/gift.svg" width={20} height={20} alt="clap" />
          </div>

          <div className="flex flex-col gap-y-1">
            <div className="text-[14px] leading-5 font-semibold text-[rgba(255,255,255,0.6)]">{T('MyMCPoints')}</div>
            <div className="flex items-center gap-x-2">
              <div className="font-din font-medium text-2xl leading-9 text-white">
                {userLedger ? formatNum(userLedger.my_airdrop) : '--'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
