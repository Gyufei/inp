import { prodHost } from './config/eth-mainnet-config';
import { devHost } from './config/eth-testnet-config';

export const isPreview = process.env.NEXT_PUBLIC_IS_PREVIEW === '1';
export const isProduction = process.env.NODE_ENV === 'production' && !isPreview;

export function WithHost(path: string) {
  const host = isProduction ? prodHost : devHost;
  return `${host}${path}`;
}

export const Paths = {
  serverList: WithHost('/server/list'),
  userLedger: WithHost('/user/ledger'),
  userActivities: WithHost('/user/activities'),
  albumUpload: WithHost('/server/album/upload'),
  logoUpdate: WithHost('/server/logo/update'),
  userNameCheck: WithHost('/user/name/check'),
  userMcPoints: WithHost('/user/mc_points'),
  userAirdropTokens: WithHost('/airdrop/tokens'),
};
