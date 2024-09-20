'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { config as getConfig, projectId, metadata } from './web3-modal-config';

import { createWeb3Modal } from '@web3modal/wagmi/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { State, WagmiProvider } from 'wagmi';

import { eventEmitterOverall } from '../event-emitter';

// Setup queryClient
const queryClient = new QueryClient();

if (!projectId) throw new Error('Project ID is not defined');

const defaultConfig = getConfig();

// Create modal
createWeb3Modal({
  metadata,
  wagmiConfig: defaultConfig,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

export default function Web3ModalProvider({ children, initialState }: { children: ReactNode; initialState?: State }) {
  const [config, setConfig] = useState(defaultConfig);
  useEffect(() => {
    const handleChangeRpc = (newRpc: string) => {
      setConfig(getConfig(newRpc));
    };
    eventEmitterOverall.on('change-rpc', handleChangeRpc);
    return () => {
      eventEmitterOverall.off('change-rpc', handleChangeRpc);
    };
  }, []);
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
