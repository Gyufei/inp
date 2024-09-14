import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateAddr(
  address: string,
  params = {
    nPrefix: 3,
    nSuffix: 3,
  }
): string {
  if (!address) return address;

  const { nPrefix, nSuffix } = params;

  const shorter = `${address.slice(0, nPrefix)}...${address.slice(-1 * nSuffix)}`;

  return shorter;
}

export function toHex(str: string) {
  return '0x' + Buffer.from(str, 'utf8').toString('hex');
}
