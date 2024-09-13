import NP from 'number-precision';
import fetcher from '@/lib/fetcher';
import { Paths } from '@/lib/PathMap';
import { useQuery } from '@tanstack/react-query';
import { OtherPercent, ServerPercent } from '../const';

export interface IServer {
  album_list: Array<string>;
  is_up: number;
  members: number;
  owner_name: string;
  parent_server_id: number;
  server_id: number;
  server_logo: string;
  server_name: string;
  stake_token_address: string;
  total_airdrop: string;
  total_power: string;
  wallet: string;

  airdrop_percent: string;
}

export function useServers() {
  const res = useQuery<Array<IServer>>({
    queryKey: ['servers'],
    queryFn: getServers,
  });

  async function getServers() {
    const res = await fetcher(Paths.serverList);

    const servers = (res || []).sort((a: IServer, b: IServer) => Number(b.total_power) - Number(a.total_power));

    const percentServers = servers.map((server: IServer, index: number) => {
      const extraNum = servers.length - 10;
      const extraP = extraNum > 0 ? NP.divide(OtherPercent, extraNum) : 0;
      const percent = index > 9 ? extraP : ServerPercent[index];

      console.log(percent);
      return {
        ...server,
        airdrop_percent: percent * 100,
      };
    });

    console.log(percentServers);

    return percentServers;
  }

  return res;
}
