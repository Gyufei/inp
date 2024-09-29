'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { MainAirdropTokens, TestAirdropTokens } from '@/lib/const';
import { useAirdropTokens } from '@/lib/api/use-airdrop-tokens';
import AirdropTokensItem from './item';
import { isProduction } from '@/lib/PathMap';

export default function AirdropBtn() {
  const T = useTranslations('Common');
  const [showFloatingLayer, setShowFloatingLayer] = useState(false);
  const { data: airdropTokensData = [] } = useAirdropTokens();
  const [airdropTokens, setAirdropTokens] = useState([] as any);

  useEffect(() => {
    const localTokens = isProduction ? MainAirdropTokens : TestAirdropTokens;
    let airdropTokens = [] as any;
    if (airdropTokensData && airdropTokensData.length > 0) {
      airdropTokens = airdropTokensData.map((token: any) => {
        const localToken = localTokens.find((t: any) => t.airdrop_token.toLowerCase() === token.airdrop_token.toLowerCase());
        return { ...token, name: localToken?.name, decimal: localToken?.decimal };
      });
    } else {
      airdropTokens = localTokens;
    }
    setAirdropTokens(airdropTokens);
  }, [airdropTokensData]);

  function handleUpdateAirdrop(token: any) {
    console.log('🚀 ~ handleUpdateAirdrop ~ airdrop:');
    // updateAirdropTokens();
    setAirdropTokens(
      airdropTokens.map((t: any) => ({
        ...t,
        claim: token === t.airdrop_token ? '1' : t.claim,
      }))
    );
  }

  function handleClick() {
    setShowFloatingLayer(!showFloatingLayer);
  }

  return (
    <div className="relative z-30">
      <div onClick={handleClick} className="w-12 h-12 rounded-full flex items-center justify-center border border-solid border-[rgba(255,255,255,0.4)] text-base leading-5 text-white font-inter cursor-pointer">
        <div className="flex items-center justify-center gap-2">
          <Image src="/icons/airdrop.svg" width={28} height={28} alt="airdrop" />
        </div>
      </div>
      {showFloatingLayer && (
        <div className="fixed z-20 top-0 left-0 flex items-center justify-center w-[100vw] h-[100vh] bg-[rgb(3,3,5,.6)]">
          <div
            className="w-[560px] h-[340px] mt-0 p-6 bg-[rgba(255,255,255,.1)] backdrop-blur-[20px] border border- text-white rounded-xl shadow-lg relative flex flex-col items-center"
            style={{
              borderImage: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 100%)',
            }}
          >
            <Image className="absolute top-5 right-5 w-[24px] h-[24px] cursor-pointer" src="/icons/x.svg" width={24} height={24} alt="close" onClick={handleClick} />
            <div className="font-cal font-semibold text-[24px] ">{airdropTokensData.length < 1 ? T('Sorry') : T('Congrats')}</div>
            <div className="min-h-[200px]  max-h-[1000px] mt-4">
              {(airdropTokens || []).map((airdrop: any, index: number) => (
                <AirdropTokensItem airdrop={airdrop} key={index} updateAirdrop={handleUpdateAirdrop} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
