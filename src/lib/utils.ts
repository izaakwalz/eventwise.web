import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Shorten Address
 * @param {string} address - string to shorten
//  * @returns {string}
 */
export function shortenAddress(address: any) {
  return address?.substring(0, 6) + '...' + address?.substring(address?.length - 4);
}
