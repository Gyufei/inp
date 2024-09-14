import { useReadContract } from 'wagmi';
import { InphuraAbi } from '../abi/Inphura';
import { EthConfig } from '../eth';

export function usePurchasePrice() {
  const abiAddress = EthConfig.contract.inphura;

  const result = useReadContract({
    abi: InphuraAbi,
    address: abiAddress as any,
    functionName: 'serverPurchasePrice',
  });

  return result;
}
