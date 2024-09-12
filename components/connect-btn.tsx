'use client';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { useAccount } from 'wagmi';

export default function ConnectBtn() {
  const T = useTranslations('Common');

  const { address } = useAccount();
  const { open } = useWeb3Modal();

  return (
    <button className="h-12 border rounded-[32px] text-base leading-5 text-white font-redHat border-[rgba(255,255,255,0.4)] px-6">
      {T('ConnectWallet')}
    </button>
  );
}
