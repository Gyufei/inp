import { useApproveMak } from '@/lib/hook/use-approve';
import { useCurrentToken } from '@/lib/hook/use-current-token';
import { useDeposit } from '@/lib/hook/use-deposit';
import { useQueryClient } from '@tanstack/react-query';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { formatUnits, parseUnits } from 'viem';
import { useBalanceDataOf } from '@/lib/hook/use-balanceof';
import { numberMin } from '@/lib/number';

export function DepositBtn({ serverId }: { serverId: number }) {
  const T = useTranslations('Common');

  const { address } = useAccount();
  const { open } = useWeb3Modal();

  const currentToken = useCurrentToken();

  const { data: balanceData } = useBalanceDataOf();

  const queryClient = useQueryClient();

  const [inputOpen, setInputOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const { allowance, isShouldApprove, isApproving, approveAction, approveBtnText } = useApproveMak(Number(inputValue || -1));
  const { isLoading: isDepositLoading, write: depositAction, isSuccess: isDepositSuccess } = useDeposit();

  function handleDeposit() {
    if (isProcessing) return;
    setIsProcessing(true);

    if (isShouldApprove) {
      approveAction().finally(() => setIsProcessing(false));
      return;
    }

    if (!inputValue) {
      setIsProcessing(false);
      return;
    }

    const amount = parseUnits(inputValue, currentToken?.decimal || 18);
    depositAction({ serverId: BigInt(serverId), amount: amount }).finally(() => setIsProcessing(false));
  }

  useEffect(() => {
    if (isDepositSuccess) {
      queryClient.invalidateQueries({ queryKey: ['servers'] });
      queryClient.invalidateQueries({ queryKey: ['user-ledger', serverId, address] });
      queryClient.invalidateQueries({ queryKey: ['user-activities', serverId] });

      setInputOpen(false);
      setInputValue('');
    }
  }, [isDepositSuccess, address, serverId, queryClient]);

  function handleClick() {
    if (isApproving || isDepositLoading) {
      return;
    }

    if (!address) {
      open();
      return;
    }

    setInputOpen(!inputOpen);
  }

  function handleInput(val: string) {
    const newV = val.replace(/[^0-9.]/g, '');
    setInputValue(newV);
  }

  function handleMaxClick() {
    const value = formatUnits(balanceData || BigInt(0), currentToken?.decimal || 0);
    const minValue = numberMin(value, allowance || 0);
    setInputValue(minValue.toString());
  }

  return (
    <div className="relative">
      <div onClick={handleClick} className="w-[200px] h-12 bg-[#6EFF90] flex items-center cursor-pointer justify-center rounded-2xl">
        <span className="select-none font-hel text-[#070709] text-base leading-5">{T('Deposit')}</span>
      </div>
      <div
        className="absolute z-10 -top-[120px] w-[200px] bg-[rgba(255,255,255,0.1)] backdrop-blur-xl p-3 rounded-2xl"
        style={{
          display: inputOpen ? 'block' : 'none',
        }}
      >
        <div className="relative">
          <input
            className="w-full rounded-xl text-white border border-solid h-10 px-3 py-2 pr-16 border-[rgba(255,255,255,0.2)] bg-transparent"
            value={inputValue}
            placeholder="0"
            onChange={(e) => handleInput(e.target.value)}
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 text-[#3E71FF] text-[16px] font-[500]" onClick={handleMaxClick}>
            MAX
          </button>
        </div>
        <div
          onClick={handleDeposit}
          data-disabled={(!isShouldApprove && !inputValue) || isProcessing}
          className="mt-[10px] bg-[#3E71FF] h-10 cursor-pointer rounded-xl flex items-center justify-center text-white font-hel text-base leading-5 data-[disabled=true]:brightness-75 data-[disabled=true]:pointer-events-none"
        >
          {isShouldApprove ? approveBtnText : T('Confirm')}
        </div>
      </div>
    </div>
  );
}
