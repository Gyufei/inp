import fetcher from '@/lib/fetcher';
import { Paths } from '@/lib/PathMap';
import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

export function useMcPoints() {
  const { address } = useAccount();

  const res = useQuery<{
    mc_points: string;
  }>({
    queryKey: ['user-mc-points', address],
    queryFn: getMcPoints,
    enabled: !!address,
  });

  async function getMcPoints() {
    if (!address) {
      return null;
    }

    const res = await fetcher(Paths.userMcPoints + `?user=${address}`);

    return res;
  }

  return res;
}
