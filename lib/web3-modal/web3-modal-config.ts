import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { cookieStorage, createStorage, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { testnet } from './testnet';
import { isProduction } from '@/lib/PathMap';

export const projectId = '8e507d09486ed2283f0d0922c0a02261'; // process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error('Project ID is not defined');

export const metadata = {
  name: 'inphura',
  description: 'inphura',
  url: 'https://inphura.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

const chains = isProduction ? ([mainnet] as const) : ([mainnet, testnet] as const);

export const getRpcUrl = (customRpc?: string) => {
  return customRpc || localStorage.getItem('customRPC') || 'https://mainnet.infura.io/v3/534d2ca5a3a84db7accafc2eab774a3a';
};
// Create wagmiConfig
export const config = (customRpc?: string) =>
  defaultWagmiConfig({
    chains,
    projectId,
    metadata,
    ssr: true,
    storage: createStorage({
      storage: cookieStorage,
    }),
    auth: {
      email: false,
      socials: [],
      showWallets: true,
      walletFeatures: true,
    },
    transports: {
      [mainnet.id]: http(getRpcUrl(customRpc)), // Use the dynamic RPC URL
      [testnet.id]: http(),
    },
  });
