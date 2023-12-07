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

export function formatNumber(
  number: number | string,
  options: {
    decimals?: number;
    style?: Intl.NumberFormatOptions['style'];
    notation?: Intl.NumberFormatOptions['notation'];
  } = {}
) {
  const { decimals = 0, style = 'decimal', notation = 'standard' } = options;

  return new Intl.NumberFormat('en-US', {
    style,
    notation,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(Number(number));
}

export function formatDateTXn(date: Date | string | number) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(date));
}

export function formatDate(timestamp: any) {
  // var date = new Date(parseInt(timestamp));
  // return date.toLocaleString();
  const date = new Date(parseInt(timestamp));
  return date.toLocaleDateString('en-US').replace(' ', '-');
}

export function formatDateToTimeStamp(date: string) {
  const newDate = new Date(date);
  const timestamp = newDate.getTime();
  console.log(timestamp.toString());
  return timestamp;
}
