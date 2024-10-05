// upload to R2
export const R2_ACCESS_KEY_ID = process.env.NEXT_PUBLIC_R2_ACCESS_KEY_ID;
export const R2_SECRET_ACCESS_KEY = process.env.NEXT_PUBLIC_R2_SECRET_ACCESS_KEY;
export const R2_BUCKET_NAME = process.env.NEXT_PUBLIC_R2_BUCKET_NAME;
export const R2_ACCOUNT_ID = process.env.NEXT_PUBLIC_R2_ACCOUNT_ID;
export const R2_URl_HOST = process.env.NEXT_PUBLIC_R2_URl_HOST;

export const Tokens = [
  {
    name: 'MAK',
    symbol: 'MAK',
    decimal: 18,
    logo: '/images/mak.png',
    address: '0x0f4801e7a6f480DF0B5330Ef38122Ea0149f269d',
  },
];

export const ServerPercent = [0.5, 0.15, 0.08, 0.05, 0.03, 0.02, 0.015, 0.01, 0.006, 0.004];
export const OtherPercent = 1 - ServerPercent.reduce((a, b) => a + b, 0);

export const MainAirdropTokens = [
  {
    name: 'STARSHIP',
    airdrop_token: '0x5DD73967b4A2dbB5e026Ae2A0C335395e6563B0a',
    claimable_amount: '0',
    is_claimed: '0',
    decimal: 18,
  },
  // {
  //   name: '12306',
  //   airdrop_token: '0xA3936379F429D2881a5206F57809ca7FdC5B4212',
  //   claimable_amount: '0',
  //   is_claimed: '0',
  //   decimal: 18,
  // },
];

export const TestAirdropTokens = [
  {
    name: 'STARSHIP',
    airdrop_token: '0x6bbC96B0A4fd77E045D2eC8Dc5D87C49D1EA8389',
    claimable_amount: '0',
    is_claimed: '0',
    decimal: 18,
  },
  {
    name: '12306',
    airdrop_token: '0xe8e6e13029a8c576c7a2121abdcc2818f1933e03',
    claimable_amount: '0',
    is_claimed: '0',
    decimal: 18,
  },
];
