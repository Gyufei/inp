import fetcher from '@/lib/fetcher';
import { Paths } from '@/lib/PathMap';
import { useQuery } from '@tanstack/react-query';

export interface UserActivity {
  action: 'Deposit' | 'Withdraw';
  amount: string;
  tx_hash: string;
  user: string;
  block_number: string;
}

export function useActivities(serverId: number | null) {
  const res = useQuery<Array<UserActivity>>({
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
