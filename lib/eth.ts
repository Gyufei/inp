import { isProduction } from './PathMap';

const MainConfig = {
  chainId: 1,
  chainName: 'Ethereum',
  contract: {
    inphura: '',
    makToken: '',
  },
};

const TestConfig = {
  chainId: 1337,
  chainName: 'TestEth',
  contract: {
    inphura: '0x5443984fD2c4CfF01F3Ab29e3dE9084cc408265d',
    makToken: '0x0f4801e7a6f480DF0B5330Ef38122Ea0149f269d',
  },
};

export const EthConfig = isProduction ? MainConfig : TestConfig;
