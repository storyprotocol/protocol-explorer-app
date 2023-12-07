import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import * as z from 'zod';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRoundedTime(minutes: number) {
  const now = new Date();
  const ms = 1000 * 60 * minutes;

  return Math.floor(now.getTime() / ms) * ms;
}

export function removeEmptyStringFields(obj: Record<string, string>) {
  return Object.entries(obj).reduce(
    (acc, [key, value]) => {
      if (value !== '') {
        acc[key] = value;
      }
      return acc;
    },
    {} as Record<string, string>,
  );
}

export function hasEmptyString(obj: Record<string, string>) {
  return Object.values(obj).some((value) => value === '');
}

export function shortenAddress(address: string, length: number = 4): string {
  if (!address) {
    return '';
  }
  if (address.length < 2 * length + 2) {
    // Check if the address is too short to be shortened.
    return address;
  }

  const start = address.substring(0, length + 2);
  const end = address.substring(address.length - length);
  return `${start}...${end}`;
}

export function shortenString(str: string, length: number = 10): string {
  if (str.length <= length) {
    // If the input string is already shorter than or equal to the specified length, return it as is.
    return str;
  } else {
    // If the input string is longer than the specified length, truncate it and append "..." at the end.
    return str.slice(0, length) + '...';
  }
}

export function tuple<T extends string[]>(...args: T): T {
  return args;
}

export const ipAssetIdSchema = z.object({
  ipOrgId: z.string().min(1, {
    message: 'Required.',
  }),
  ipAssetId: z.string().min(1, {
    message: 'Required.',
  }),
});

export function getTxnDataInsights(data: Array<any>) {
  function countTypes(data: any[]): Record<string, number> {
    const typeCounts: Record<string, number> = {};

    for (const item of data) {
      const resourceType = item.resourceType;
      if (typeCounts[resourceType]) {
        typeCounts[resourceType]++;
      } else {
        typeCounts[resourceType] = 1;
      }
    }

    return typeCounts;
  }

  function countCreatorAddresses(data: any[]): { address: string; count: number }[] {
    const creatorCounts: Record<string, number> = {};

    for (const item of data) {
      const initiator = item.initiator;
      if (creatorCounts[initiator]) {
        creatorCounts[initiator]++;
      } else {
        creatorCounts[initiator] = 1;
      }
    }

    // Sort the creatorCounts object by count in descending order
    const sortedCounts = Object.entries(creatorCounts)
      .sort(([, a], [, b]) => b - a)
      .map(([address, count]) => ({ address, count }));

    return sortedCounts;
  }

  return { totalTypes: countTypes(data), walletData: countCreatorAddresses(data) };
}
