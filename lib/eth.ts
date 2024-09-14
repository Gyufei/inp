import { MainnetConfig } from './config/eth-mainnet-config';
import { TestnetConfig } from './config/eth-testnet-config';
import { isProduction } from './PathMap';

export const EthConfig = isProduction ? MainnetConfig : TestnetConfig;
