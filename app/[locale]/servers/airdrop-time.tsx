'use client';
import fetcher from '@/lib/fetcher';
import { Paths } from '@/lib/PathMap';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';

export function AirdropTime() {
  const T = useTranslations('Common');

  const [timeObj, setTimeObj] = useState({
    hour: 0,
    minute: 0,
    second: 0,
  });

  const { data: airdropInfo } = useQuery({
    queryKey: ['airdropInfo'],
    queryFn: getAirdropInfo,
  });

  async function getAirdropInfo() {
    const res = await fetcher(Paths.airdropInfo);
    return res;
  }

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
    <div className="mt-10">
      <div className="text-2xl leading-9 text-[rgba(255,255,255,0.4)]">{T('NextAirdrop')}</div>
      <div className="mt-5 flex justify-start items-center">
        <div className="flex flex-col items-start gap-y-[10px] pr-12">
          <div className="text-5xl text-white leading-[60px] font-light">{timeObj.hour}</div>
          <div className="text-[18px] leading-[26px] text-[rgba(255,255,255,0.4)] uppercase">{T('Hour', { num: timeObj.hour })}</div>
        </div>
        <div className="flex flex-col items-center px-10 gap-y-[10px] mr-12 border-x border-solid border-[rgba(255,255,255,0.4)]">
          <div className="text-5xl text-white leading-[60px] font-light">{timeObj.minute}</div>
          <div className="text-[18px] leading-[26px] text-[rgba(255,255,255,0.4)] uppercase">{T('Minute', { num: timeObj.minute })}</div>
        </div>
        <div className="flex flex-col items-end gap-y-[10px] mr-12">
          <div className="text-5xl text-white leading-[60px] font-light">{timeObj.second}</div>
          <div className="text-[18px] leading-[26px] text-[rgba(255,255,255,0.4)] uppercase">{T('Second', { num: timeObj.second })}</div>
        </div>
      </div>
    </div>
  );
}
