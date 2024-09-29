'use client';
import { useTranslations } from 'next-intl';
import { formatNum } from '@/lib/number';
import { useAirdropClaim } from '@/lib/hook/use-airdrop-claim';
import TruncatedText from '@/components/truncated-text';
import { toBigIntNumber } from '@/lib/number';

export default function AirdropBtn({ airdrop, updateAirdrop, index }: any) {
  const T = useTranslations('Common');

  const { isClaiming, claimAction } = useAirdropClaim(airdrop.airdrop_token, toBigIntNumber(airdrop.claimable_amount, airdrop?.decimal) as bigint, airdrop.merkle_proof, updateAirdrop);

  return (
    <div className="flex justify-center pl-[10px] py-2 cursor-pointer" key={index}>
      <div className="flex flex-col justify-center w-[160px] mr-6">
        <div className="text-[22px] leading-6 text-nowrap">{airdrop.name}</div>
      </div>
      <div className="flex flex-col justify-center w-[200px] mr-6">
        <div className="font-din font-medium text-[22px] leading-6 text-nowrap">
          <TruncatedText text={formatNum(airdrop.claimable_amount)} maxLength={19} />
        </div>
      </div>
      <div className="flex flex-col justify-between w-[90px] mr-6 text-right">
        {airdrop.claimable_amount !== '0' && airdrop.is_claimed === '0' ? (
          <div className={`"w-[82px] h-[32px] leading-8 rounded-xl bg-[#3E71FF] text-center  text-[14px] text-white  ${isClaiming ? 'cursor-not-allowed' : ''}`} onClick={claimAction}>
            {isClaiming ? `${T('Claim')}...` : T('Claim')}
          </div>
        ) : (
          <div className="w-[82px] h-[32px] leading-8 rounded-xl bg-transparent text-center border border-white opacity-40  text-[14px] text-white cursor-not-allowed">
            {airdrop.claimable_amount === '0' ? T('N/A') : T('Claimed')}
          </div>
        )}
      </div>
    </div>
  );
}
