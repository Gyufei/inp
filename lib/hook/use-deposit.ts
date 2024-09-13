import { useWriteContract } from 'wagmi';
import { useGasEth } from './use-gas-eth';
import { InphuraAbi } from '../abi/Inphura';
import useTxStatus from './use-tx-status';
import { EthConfig } from '../eth';

export function useDeposit() {
  const { getGasParams } = useGasEth();

  const { writeContractAsync } = useWriteContract();

  const txAction = async ({ serverId, amount }: { tokenAddress: string; serverId: bigint; amount: bigint }) => {
    const abiAddress = EthConfig.contract.inphura;

    const callParams = {
      abi: InphuraAbi,
      address: abiAddress as any,
      functionName: 'deposit',
      args: [serverId, amount],
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
