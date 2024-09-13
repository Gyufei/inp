import { useEffect } from 'react';
import { useWithdraw } from '@/lib/hook/use-withdraw';
import { useAccount } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useCurrentToken } from '@/lib/hook/use-current-token';
import { useQueryClient } from '@tanstack/react-query';
import { useLedger } from '@/lib/api/use-ledger';
import { useTranslations } from 'next-intl';

export function WithdrawBtn({ serverId }: { serverId: number }) {
  const T = useTranslations('Common');

  const { isLoading: isWdLoading, write: withdrawAction, isSuccess: isWdSuccess } = useWithdraw();

  const { address, isConnecting } = useAccount();
  const { open } = useWeb3Modal();

  const currentToken = useCurrentToken();
  const queryClient = useQueryClient();

  const { data: userLedger } = useLedger(serverId || null);

  function handleWithdraw() {
    const stakeAmount = userLedger?.stake_amount || 0;
    const amount = Number(stakeAmount) * 10 ** (currentToken?.decimal || 0);
    withdrawAction({ serverId: BigInt(serverId), amount: BigInt(amount) });
  }

  useEffect(() => {
    if (isWdSuccess) {
      queryClient.invalidateQueries({ queryKey: ['user-ledger', serverId, address] });
      queryClient.invalidateQueries({ queryKey: ['user-activities', serverId] });
    }
  }, [isWdSuccess]);

  function handleClick() {
    if (isWdLoading || isConnecting) {
      return;
    }

    if (!address) {
      open();
    }

    handleWithdraw();
  }

  return (
    <div onClick={handleClick} className="w-[200px] h-12 bg-[#FFF96A] flex items-center cursor-pointer justify-center rounded-2xl">
      <span className="select-none font-hel text-[#070709] text-base leading-5">{T('Withdraw')}</span>
    </div>
  );
}
