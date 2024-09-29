import fetcher from '@/lib/fetcher';
import { Paths } from '@/lib/PathMap';
import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

export interface Tokens {
  name: string;
  address: string;
  power: string;
  claim: string;
}

export function useAirdropTokens() {
  const { address } = useAccount();

  const res = useQuery<Array<Tokens>>({
    queryKey: ['user-airdrop-tokens', address],
    queryFn: getAirdropTokens,
    enabled: !!address,
  });

  async function getAirdropTokens() {
    if (!address) {
      return null;
    }

    const res = await fetcher(Paths.userAirdropTokens + `?user=${address}`);

    return res;
  }
  async function updateAirdropTokens() {
    return res.refetch();
  }

  return { data: res?.data, updateAirdropTokens };
}
