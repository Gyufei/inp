import fetcher from '@/lib/fetcher';
import { Paths } from '@/lib/PathMap';
import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

export function useLedger(serverId: number | null) {
  const { address } = useAccount();

  const res = useQuery<{
    stake_amount: string;
    my_airdrop: string;
    potential_profit: string;
  }>({
    queryKey: ['user-ledger', serverId, address],
    queryFn: getServers,
    enabled: !!address && !!serverId,
  });

  async function getServers() {
    if (!address || !serverId) {
      return null;
    }

    const res = await fetcher(Paths.userLedger + `?user=${address}&server_id=${serverId}`);

    return res;
  }

  return res;
}
