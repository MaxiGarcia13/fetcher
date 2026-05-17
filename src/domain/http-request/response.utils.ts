import type { HttpMethod } from './types';
import { tryParseJson } from '@maxigarcia/js-utils';
import { METHODS_EXCLUDED_FROM_BODY } from '@/constants/methods';

export function parseBodyForRequest(method: HttpMethod, body: string) {
  if (METHODS_EXCLUDED_FROM_BODY.includes(method)) {
    return undefined;
  }

  const trimmedBody = body.trim();

  if (trimmedBody === '') {
    return undefined;
  }

  const parsed = tryParseJson(trimmedBody);

  if (parsed === undefined || typeof parsed !== 'object' || parsed === null) {
    return undefined;
  }

  return trimmedBody;
}
