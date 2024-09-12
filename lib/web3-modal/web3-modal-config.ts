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

// Create wagmiConfig
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  auth: {
    email: false, // default to true
    socials: [],
    showWallets: true, // default to true
    walletFeatures: true, // default to true
  },
  transports: {
    [mainnet.id]: http(),
    [testnet.id]: http(),
  },
});
