'use client';

import ConnectBtn from '@/components/connect-btn';
import LanguageSetting from '@/components/language-setting';
import useCurrentToken from '@/lib/hook/use-current-token';
import { useTranslations } from 'next-intl';
import { AirdropTime } from '../../../../../../components/airdrop-time';

export function NodesBanner() {
  const T = useTranslations('Common');

  const token = useCurrentToken();

  return (
    <div className="relative">
      <div className="z-10 relative">
        <div className="flex items-center justify-end gap-x-5">
          <LanguageSetting />
          <ConnectBtn />
        </div>
        <div>
          <div className="text-[60px] leading-[80px] font-semibold text-white font-cal">
            {T.rich('BannerTitle', { br: () => <br />, token: token?.name })}
          </div>
          <div className="mt-5 text-[20px] leading-[30px] text-[rgba(255,255,255,0.6)]">{T.rich('BannerDesc', { br: () => <br /> })}</div>
        </div>
        <AirdropTime className="mt-[90px]" />
      </div>

      <video className="absolute -top-[220px] -right-[195px] z-0 w-[1920px] h-[1080px]" src="/1-1.mp4" muted loop autoPlay playsInline />
    </div>
  );
}
