import type { HttpMethod } from './types';
import type { KeyValueEntry } from '@/components/key-value-table';
import { HTTP_METHODS } from './methods.consts';

export function getHttpMethod(value: unknown): HttpMethod {
  if (typeof value === 'string' && HTTP_METHODS.includes(value as HttpMethod)) {
    return value as HttpMethod;
  }
  return 'GET';
}

export function parseObjectFromKeyValueEntries<T extends Record<string, string>>(entries: KeyValueEntry[]): T {
  return Object.fromEntries(entries
    .filter((entry) => entry.key !== '' && !entry.hidden)
    .map((entry) => [entry.key, entry.value]),
  ) as T;
}
