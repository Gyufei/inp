'use client';
import { useLedger } from '@/lib/api/use-ledger';
import { useServers } from '@/lib/api/use-servers';
import { MAKDecimal } from '@/lib/const';
import { useDeposit } from '@/lib/hook/use-deposit';
import { useWithdraw } from '@/lib/hook/use-withdraw';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';

export default function Page({ params: { id } }: { params: { id: string } }) {
  const { address } = useAccount();
  const { data: servers } = useServers();

  const queryClient = useQueryClient();

  const currentServer = (servers || [])?.find((server) => server.server_id === Number(id));

  const { data: userLedger } = useLedger(currentServer?.server_id || null);

  const stakeAmount = Number(userLedger?.stake_amount || 0);

  const { isLoading: isWdLoading, write: withdrawAction, isSuccess: isWdSuccess } = useWithdraw();
  const { isLoading: isDepositLoading, write: depositAction, isSuccess: isDepositSuccess } = useDeposit();

  function handleWithdraw() {
    withdrawAction({ serverId: BigInt(id), amount: BigInt(stakeAmount * 10 ** MAKDecimal) });
  }

  function handleDeposit() {
    depositAction({ serverId: BigInt(id), amount: BigInt(100) });
  }

  useEffect(() => {
    if (isWdSuccess || isDepositSuccess) {
      queryClient.invalidateQueries({ queryKey: ['user-ledger', id, address] });
    }
  }, [isWdSuccess, isDepositSuccess]);

  return (
    <div>
      {id}
      <button className="bg-white text-black mr-4" onClick={handleWithdraw}>
        {isWdLoading ? 'Withdrawing' : isWdSuccess ? 'Withdraw Success' : 'Withdraw'}
      </button>
      <button className="bg-white text-black" onClick={handleDeposit}>
        {isDepositLoading ? 'Depositing' : isDepositSuccess ? 'Deposit Success' : 'Deposit'}
      </button>
    </div>
  );
}
