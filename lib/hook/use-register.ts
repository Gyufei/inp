import { useWriteContract } from 'wagmi';
import { useGasEth } from './use-gas-eth';
import { InphuraAbi } from '../abi/Inphura';
import useTxStatus from './use-tx-status';
import { EthConfig } from '../eth';
import { usePurchasePrice } from '@/lib/hook/use-purchase-price';

export function useRegister() {
  const { getGasParams } = useGasEth();

  const { writeContractAsync } = useWriteContract();
  const { data: purchasePrice } = usePurchasePrice();

  const txAction = async ({
    serverName,
    ownerName,
    serverNo,
    serverLogo,
  }: {
    serverName: string;
    ownerName: string;
    serverNo: string;
    serverLogo: string;
  }) => {
    if (!purchasePrice) {
      throw new Error('No purchase price');
      return;
    }

    const abiAddress = EthConfig.contract.inphura;
    const makToken = EthConfig.contract.makToken;

    const callParams = {
      abi: InphuraAbi,
      address: abiAddress as any,
      functionName: 'registerServerNode',
      args: [makToken, serverNo, serverName, ownerName, serverLogo],
    };

    const gasParams = await getGasParams(callParams);

    const valueParams = { value: purchasePrice as any };

    const txHash = await writeContractAsync({
      ...callParams,
      ...gasParams,
      ...valueParams,
    });

    return txHash;
  };

  const wrapRes = useTxStatus(txAction);

  return wrapRes;
}
