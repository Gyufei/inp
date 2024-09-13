'use client';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useQueryClient } from '@tanstack/react-query';
import { useCurrentToken } from '@/lib/hook/use-current-token';
import { useLedger } from '@/lib/api/use-ledger';
import { useServers } from '@/lib/api/use-servers';
import { useDeposit } from '@/lib/hook/use-deposit';
import { useWithdraw } from '@/lib/hook/use-withdraw';

export default function Page({ params: { id } }: { params: { id: string } }) {
  const { address } = useAccount();
  const { data: servers } = useServers();

  const currentToken = useCurrentToken();
  const queryClient = useQueryClient();

  const currentServer = (servers || [])?.find((server) => server.server_id === Number(id));

  const { data: userLedger } = useLedger(currentServer?.server_id || null);

  const stakeAmount = Number(userLedger?.stake_amount || 0);

  const { isLoading: isWdLoading, write: withdrawAction, isSuccess: isWdSuccess } = useWithdraw();
  const { isLoading: isDepositLoading, write: depositAction, isSuccess: isDepositSuccess } = useDeposit();

  function handleWithdraw() {
    withdrawAction({ serverId: BigInt(id), amount: BigInt(stakeAmount * 10 ** (currentToken?.decimal || 0)) });
  }

  function handleDeposit() {
    depositAction({ serverId: BigInt(id), amount: BigInt(100) });
  }

  useEffect(() => {
    if (isWdSuccess || isDepositSuccess) {
      queryClient.invalidateQueries({ queryKey: ['user-ledger', id, address] });
      queryClient.invalidateQueries({ queryKey: ['user-activities', id] });
    }
  }, [isWdSuccess, isDepositSuccess]);

  return (
    <div>
      <button className="bg-white text-black mr-4" onClick={handleWithdraw}>
        {isWdLoading ? 'Withdrawing' : isWdSuccess ? 'Withdraw Success' : 'Withdraw'}
      </button>
      <button className="bg-white text-black" onClick={handleDeposit}>
        {isDepositLoading ? 'Depositing' : isDepositSuccess ? 'Deposit Success' : 'Deposit'}
      </button>
    </div>
  );
}
