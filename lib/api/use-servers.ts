import fetcher from '@/lib/fetcher';
import { Paths } from '@/lib/PathMap';
import { useQuery } from '@tanstack/react-query';

export interface IServer {
  airdrop_percent: string;
  album_list: Array<string>;
  is_up: number;
  mak_power: string;
  members: number;
  owner_name: string;
  server_id: number;
  server_logo: string;
  server_name: string;
  total_airdrop: string;
  wallet: string;
}

export function useServers() {
  const res = useQuery<Array<IServer>>({
    queryKey: ['servers'],
    queryFn: getServers,
  });

  async function getServers() {
    const res = await fetcher(Paths.serverList);

    const servers = res.map((server: any) => {
      return {
        ...server,
        album_list: JSON.parse(server.album_list || '[]'),
      };
    });

    return servers;
  }

  return res;
}
