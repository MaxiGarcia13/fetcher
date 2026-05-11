import type { HttpMethod } from './types';
import { METHODS_EXCLUDED_FROM_BODY } from './methods.consts';

export function isJsonString(body: string): boolean {
  return typeof body === 'string'
    && body.trim() !== ''
    && (
      (
        body.startsWith('{') && body.endsWith('}')
      ) || (
        body.startsWith('[') && body.endsWith(']')
      )
    );
}

export function parseBodyForRequest(method: HttpMethod, body: string) {
  if (METHODS_EXCLUDED_FROM_BODY.includes(method)) {
    return undefined;
  }

  const trimmedBody = body.trim();

  if (!isJsonString(trimmedBody)) {
    return undefined;
  }

  return trimmedBody;
}
