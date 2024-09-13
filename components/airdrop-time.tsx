import { useAirdropInfo } from '@/lib/api/use-airdrop-info';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';

export function AirdropTime({ className }: { className?: string }) {
  const T = useTranslations('Common');

  const { data: airdropInfo } = useAirdropInfo();

  const [timeObj, setTimeObj] = useState({
    hour: 0,
    minute: 0,
    second: 0,
  });

  const calcTime = useCallback(
    function () {
      if (!airdropInfo) {
        return;
      }

      const { first_airdrop_at: startAt, airdrop_cycle: cycle } = airdropInfo;

      const nowNum = Math.floor(new Date().getTime() / 1000);
      const remainSecond = cycle - ((nowNum - startAt) % cycle);

      const hour = Math.floor(remainSecond / 3600);
      const minute = Math.floor((remainSecond - hour * 3600) / 60);
      const second = remainSecond - hour * 3600 - minute * 60;

      setTimeObj({
        hour,
        minute,
        second,
      });
    },
    [airdropInfo]
  );

  useEffect(() => {
    calcTime();

    const inter = setInterval(() => {
      calcTime();
    }, 1000);

    return () => clearInterval(inter);
  }, [calcTime]);

  return (
    <div className={cn(className)}>
      <div className="text-[40px] leading-9 text-[rgba(255,255,255,0.8)] font-hel">{T('NextAirdrop')}</div>
      <div className="mt-5 flex justify-start items-center">
        <div className="flex flex-col items-start gap-y-[10px] pr-12">
          <div className="text-5xl text-white leading-[60px] font-light font-din">{timeObj.hour}</div>
          <div className="text-[18px] leading-[26px] text-[rgba(255,255,255,0.4)] uppercase font-semibold">
            {T('Hour', { num: timeObj.hour })}
          </div>
        </div>
        <div className="flex flex-col items-center px-10 gap-y-[10px] mr-12 border-x border-solid border-[rgba(255,255,255,0.4)]">
          <div className="text-5xl text-white leading-[60px] font-light font-din">{timeObj.minute}</div>
          <div className="text-[18px] leading-[26px] text-[rgba(255,255,255,0.4)] uppercase font-semibold">
            {T('Minute', { num: timeObj.minute })}
          </div>
        </div>
        <div className="flex flex-col items-end gap-y-[10px] mr-12">
          <div className="text-5xl text-white leading-[60px] font-light font-din">{timeObj.second}</div>
          <div className="text-[18px] leading-[26px] text-[rgba(255,255,255,0.4)] uppercase font-semibold">
            {T('Second', { num: timeObj.second })}
          </div>
        </div>
      </div>
    </div>
  );
}
