'use client';

import ConnectBtn from '@/components/connect-btn';
import AirdropBtn from '@/components/airdrop-btn';
import LanguageSetting from '@/components/language-setting';
import { useTranslations } from 'next-intl';
import { AirdropTime } from '../../../../../../components/airdrop-time';

export function NodesBanner() {
  const T = useTranslations('Common');

  return (
    <div className="relative">
      <div className="z-10 relative">
        <div className="flex items-center justify-end gap-x-5">
          <AirdropBtn />
          <LanguageSetting />
          <ConnectBtn />
        </div>
        <div>
          <div className="text-[60px] leading-[80px] font-semibold text-white font-cal">{T.rich('NodesBannerTitle', { br: () => <br /> })}</div>
          <div className="mt-5 text-[20px] leading-[30px] text-[rgba(255,255,255,0.6)]">{T.rich('NodesBannerDesc', { br: () => <br /> })}</div>
        </div>
        <AirdropTime className="mt-[90px]" />
      </div>

      <video className="absolute -top-[265px] -right-[100px] z-0 w-[1920px] h-[1080px]" src="/1-1.mp4" muted loop autoPlay playsInline />
      <div className="absolute -top-[265px] -right-[100px] z-0 w-[1920px] h-[1080px]" style={{ backgroundImage: 'radial-gradient(ellipse at center, rgba(6, 6, 7, 0) 40%, #060607 100%)' }}></div>
    </div>
  );
}
