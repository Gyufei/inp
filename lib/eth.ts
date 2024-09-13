import { isProduction } from './PathMap';

const MainConfig = {
  chainId: 1,
  chainName: 'Ethereum',
  contract: {
    inphura: '0xDEF3B27f6285748bbB20E077b83F983EA4e10980',
    makToken: '0x0f4801e7a6f480DF0B5330Ef38122Ea0149f269d',
  },
};

const TestConfig = {
  chainId: 1337,
  chainName: 'TestEth',
  contract: {
    inphura: '0xDEF3B27f6285748bbB20E077b83F983EA4e10980',
    makToken: '0x0f4801e7a6f480DF0B5330Ef38122Ea0149f269d',
  },
};

export const EthConfig = isProduction ? MainConfig : TestConfig;
