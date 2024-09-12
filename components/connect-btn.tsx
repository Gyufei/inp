'use client';
import { truncateAddr } from '@/lib/utils';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useTranslations } from 'next-intl';
import { useAccount } from 'wagmi';

export default function ConnectBtn() {
  const T = useTranslations('Common');

  const { address, isConnected, isConnecting } = useAccount();
  const { open } = useWeb3Modal();

  const displayAddress = truncateAddr(address || '', { nPrefix: 6, nSuffix: 4 });

  function handleClick() {
    if (address || isConnected || isConnecting) {
      return;
    }

    open();
  }

  return (
    <button onClick={handleClick} className="h-12 border rounded-[32px] text-base leading-5 text-white border-[rgba(255,255,255,0.4)] px-6">
      {isConnecting ? T('Connecting') : isConnected ? displayAddress : T('ConnectWallet')}
    </button>
  );
}
