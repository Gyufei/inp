'use client';
import { useState } from 'react';
import Image from 'next/image';
import { truncateAddr } from '@/lib/utils';
import { formatNum } from '@/lib/number';
import { useWeb3Modal, useWeb3ModalState } from '@web3modal/wagmi/react';
import { useTranslations } from 'next-intl';
import { useAccount, useDisconnect } from 'wagmi';
import { eventEmitterOverall } from '../lib/event-emitter';
import { useRpc } from '@/lib/hook/use-rpc';

export default function ConnectBtn() {
  const T = useTranslations('Common');
  const { disconnect } = useDisconnect();
  const { address, isConnected, isConnecting, connector } = useAccount();
  const connectorIcon = connector?.icon;
  const { open } = useWeb3Modal();
  const { open: isOpen } = useWeb3ModalState();
  const { checkRpc } = useRpc();

  const [showFloatingLayer, setShowFloatingLayer] = useState(false);
  const [customRPC, setCustomRPC] = useState('');
  const [inputRpcError, setInputRpcError] = useState(false);

  const displayAddress = truncateAddr(address || '', { nPrefix: 6, nSuffix: 4 });

  let mcPoints = '--';
  if (typeof localStorage !== 'undefined') {
    mcPoints = localStorage.getItem('mc_points') || '--';
  }
  function handleClick() {
    if (address || isConnected) {
      disconnect();
      return;
    }

    open();
  }

  function handleMouseEnter() {
    if (isConnected) {
      setShowFloatingLayer(true);
    }
  }

  function handleMouseLeave() {
    setShowFloatingLayer(false);
  }

  function handleCustomRPCChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCustomRPC(e.target.value);
    setInputRpcError(false);
  }

  async function handleCustomRPCSubmit() {
    if (!customRPC) {
      return;
    }

    const result = await checkRpc(customRPC);
    if (!result) {
      setInputRpcError(true);
      return;
    }
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(`customRPC`, customRPC);
    }
    eventEmitterOverall.emit('change-rpc', customRPC);
  }

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
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
      {showFloatingLayer && isConnected && (
        <div className="absolute top-full left-0 h-2 w-full bg-transparent">
          <div className="absolute top-full left-0 w-[240px] h-[251px] mt-0 p-6 bg-[rgba(255,255,255,.1)] rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <Image src={connectorIcon || ''} width={20} height={20} alt="Avatar" className="rounded-full" />
              <span className="text-white ml-2">{displayAddress}</span>
            </div>
            <hr className="border-[rgba(255,255,255,0.2)] mb-4" />
            <p className="text-[rgba(255,255,255,0.6)] text-[14px]  mb-2">{T('MyMCPoints')}</p>
            <p className="text-white text-[24px] font-din mb-2">{mcPoints ? formatNum(mcPoints) : '--'}</p>
            <p className="text-[rgba(255,255,255,0.6)]  text-[14px] mb-2">{T('CustomRPC')}</p>
            <div className="flex justify-between ">
              <input type="text" value={customRPC} onChange={handleCustomRPCChange} placeholder="" className="w-[140px] p-2 border rounded-xl border-[rgba(255,255,255,0.2)]  bg-gray-700 text-white" />
              <button onClick={handleCustomRPCSubmit} className="text-blue-500 size-[40px] border rounded-xl flex items-center justify-center border-[rgba(255,255,255,0.2)]">
                <Image src="/icons/save.svg" width={24} height={24} alt="Set RPC" />
              </button>
            </div>
            {inputRpcError && <div className="pl-2 text-[10px] text-red-500 mt-1">{T('UnsupportedRPC')}</div>}
          </div>
        </div>
      )}
    </div>
  );
}
