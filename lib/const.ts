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
  },
];

export const ServerPercent = [0.5, 0.15, 0.08, 0.05, 0.03, 0.02, 0.015, 0.01, 0.006, 0.004];
export const OtherPercent = 1 - ServerPercent.reduce((a, b) => a + b, 0);
