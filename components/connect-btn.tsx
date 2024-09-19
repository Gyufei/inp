'use client';
import Image from 'next/image';
import { truncateAddr } from '@/lib/utils';
import { useWeb3Modal, useWeb3ModalState } from '@web3modal/wagmi/react';
import { useTranslations } from 'next-intl';
import { useAccount, useDisconnect } from 'wagmi';

export default function ConnectBtn() {
  const T = useTranslations('Common');
  const { disconnect } = useDisconnect();
  const { address, isConnected, isConnecting } = useAccount();
  const { open } = useWeb3Modal();
  const { open: isOpen } = useWeb3ModalState();

  const displayAddress = truncateAddr(address || '', { nPrefix: 6, nSuffix: 4 });

  function handleClick() {
    if (address || isConnected) {
      disconnect();
      return;
    }

    open();
  }

  return (
    <button onClick={handleClick} className="h-12 border rounded-[32px] text-base leading-5 text-white border-[rgba(255,255,255,0.4)] px-6">
      {isConnecting && isOpen ? (
        T('Connecting')
      ) : isConnected ? (
        <div className="flex items-center justify-center gap-2">
          <span className="mr-2">{displayAddress}</span>
          <Image src="/icons/exit.svg" width={16} height={16} alt="exit" />
        </div>
      ) : (
        T('ConnectWallet')
      )}
    </button>
  );
}
