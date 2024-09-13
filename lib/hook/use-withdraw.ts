import { useAccount, useWriteContract } from 'wagmi';
import { useGasEth } from './use-gas-eth';
import { InphuraAbi } from '../abi/Inphura';
import useTxStatus from './use-tx-status';
import { EthConfig } from '../eth';

export function useWithdraw() {
  const { getGasParams } = useGasEth();

  const { address: userAddress } = useAccount();

  const { writeContractAsync } = useWriteContract();

  const txAction = async ({ serverId, amount }: { tokenAddress: string; serverId: bigint; amount: bigint }) => {
    const abiAddress = EthConfig.contract.inphura;

    const callParams = {
      abi: InphuraAbi,
      address: abiAddress as any,
      functionName: 'withdraw',
      args: [userAddress, serverId, amount],
    };

    const gasParams = await getGasParams(callParams);

    const txHash = await writeContractAsync({
      ...callParams,
      ...gasParams,
    });

    return txHash;
  };

  const wrapRes = useTxStatus(txAction);

  return wrapRes;
}
