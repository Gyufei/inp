import { useCurrentToken } from '@/lib/hook/use-current-token';
import { useWithdraw } from '@/lib/hook/use-withdraw';
import { useQueryClient } from '@tanstack/react-query';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { toBigIntNumber } from '@/lib/number';
import { useLedger } from '@/lib/api/use-ledger';

export function WithdrawBtn({ serverId }: { serverId: number }) {
  const T = useTranslations('Common');

  const { address } = useAccount();
  const { open } = useWeb3Modal();

  const currentToken = useCurrentToken();
  const { data: userLedger } = useLedger(serverId || null);

  const queryClient = useQueryClient();

  const [inputOpen, setInputOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  let isOverage = false;
  if (inputValue && Number(inputValue) > 0 && userLedger?.stake_amount) {
    isOverage = toBigIntNumber(inputValue, currentToken?.decimal) > toBigIntNumber(userLedger?.stake_amount, currentToken?.decimal);
  }
  const { isLoading: isWithdrawLoading, write: withdrawAction, isSuccess: isWithdrawSuccess } = useWithdraw();

  function handleWithdraw() {
    if (isProcessing) return;
    setIsProcessing(true);

    if (!inputValue) {
      setIsProcessing(false);
      return;
    }

    const amount = toBigIntNumber(inputValue, currentToken?.decimal);
    withdrawAction({ serverId: BigInt(serverId), amount: amount }).finally(() => setIsProcessing(false));
  }

  useEffect(() => {
    if (isWithdrawSuccess) {
      queryClient.invalidateQueries({ queryKey: ['servers'] });
      queryClient.invalidateQueries({ queryKey: ['user-ledger', serverId, address] });
      queryClient.invalidateQueries({ queryKey: ['user-activities', serverId] });

      setInputOpen(false);
      setInputValue('');
    }
  }, [isWithdrawSuccess, address, serverId, queryClient]);

  function handleClick() {
    if (isWithdrawLoading) {
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

  return (
    <div className="relative">
      <div onClick={handleClick} className="w-[200px] h-12 bg-[#FFF96A] flex items-center cursor-pointer justify-center rounded-2xl">
        <span className="select-none font-hel text-[#070709] text-base leading-5">{T('Withdraw')}</span>
      </div>
      <div
        className="absolute z-10 -top-[120px] w-[200px] bg-[rgba(255,255,255,0.1)] backdrop-blur-xl p-3 rounded-2xl"
        style={{
          display: inputOpen ? 'block' : 'none',
        }}
      >
        <div className="">
          <input
            data-error={isOverage}
            className="w-full rounded-xl text-white border border-solid h-10 px-3 py-2 pr-16 border-[rgba(255,255,255,0.2)] data-[error=true]:border-[#E86565] bg-transparent"
            value={inputValue}
            placeholder="0"
            onChange={(e) => handleInput(e.target.value)}
          />
        </div>
        <div
          onClick={handleWithdraw}
          data-disabled={!inputValue || isProcessing || isOverage}
          className="mt-[10px] bg-[#3E71FF] h-10 cursor-pointer rounded-xl flex items-center justify-center text-white font-hel text-base leading-5 data-[disabled=true]:brightness-75 data-[disabled=true]:pointer-events-none"
        >
          {T('Confirm')}
        </div>
      </div>
    </div>
  );
}
