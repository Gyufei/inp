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

export interface IAirdropInfo {
  airdrop_cycle: number;
  first_airdrop_at: number;
}
