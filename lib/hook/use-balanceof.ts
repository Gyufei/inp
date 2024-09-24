import { useReadContract, useAccount } from 'wagmi';
import { EthConfig } from '../eth';
import { erc20Abi } from 'viem';

export function useBalanceDataOf() {
  const abiAddress = EthConfig.contract.makToken;
  const { address } = useAccount();

  const result = useReadContract({
    abi: erc20Abi,
    address: abiAddress as any,
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
  });

  return { data: result.data, value: result.data };
}
