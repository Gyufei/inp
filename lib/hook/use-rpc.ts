import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import { isProduction } from '@/lib/PathMap';
import { testnet } from '@/lib/web3-modal/testnet';

export function useRpc() {
  async function checkRpc(testRpc: string) {
    if (!testRpc.startsWith('http')) return false;
    const publicClient = createPublicClient({
      chain: isProduction ? mainnet : testnet,
      transport: http(testRpc),
    });
    try {
      await publicClient.getChainId();
      return true;
    } catch (error) {
      console.error('checkRpc:', error);
      return false;
    }
  }

  return {
    checkRpc,
  };
}
