import { mainnet } from 'viem/chains';
import { isProduction } from '@/lib/PathMap';
import { testnet } from '@/lib/web3-modal/testnet';
import { useAccount, useBalance } from 'wagmi';

export function useBalanceData() {
  const { address } = useAccount();

  const { data: balance } = useBalance({
    address,
    chainId: isProduction ? mainnet.id : testnet.id,
  });
  return balance;
}
