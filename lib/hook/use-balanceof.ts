import { useReadContract, useAccount } from 'wagmi';
import { EthConfig } from '../eth';
import { erc20Abi } from 'viem';

export function useBalanceDataOf() {
  const abiAddress = EthConfig.contract.makToken;
  const { address } = useAccount();
  console.log('🚀 ~ useBalanceDataOf ~ address:', address);
  const result = useReadContract({
    abi: erc20Abi,
    address: abiAddress as any,
    functionName: 'balanceOf',
    args: ['0x144be1DC28B38CE5E5F842EB735bE35Fe623F4c9'] as any,
  });

  return result;
}
