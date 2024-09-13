import fetcher from '@/lib/fetcher';
import { Paths } from '@/lib/PathMap';
import { useQuery } from '@tanstack/react-query';

export function useAirdropInfo() {
  const res = useQuery<{
    airdrop_cycle: number;
    first_airdrop_at: number;
  }>({
    queryKey: ['airdropInfo'],
    queryFn: getAirdropInfo,
  });

  async function getAirdropInfo() {
    const res = await fetcher(Paths.airdropInfo);
    return res;
  }

  return res;
}
