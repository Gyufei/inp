import fetcher from '@/lib/fetcher';
import { Paths } from '@/lib/PathMap';
import { useQuery } from '@tanstack/react-query';

export function useLedger(serverId: number | null) {
  const res = useQuery<{
    action: 'Deposit' | 'Withdraw';
    amount: string;
    tx_hash: string;
    user: string;
  }>({
    queryKey: ['user-activities', serverId],
    queryFn: getServers,
    enabled: !!serverId,
  });

  async function getServers() {
    if (!serverId) {
      return null;
    }

    const res = await fetcher(Paths.userActivities + `?&server_id=${serverId}`);

    return res;
  }

  return res;
}
