import type { HttpMethod } from '@/domain/http-method';
import { HTTP_METHODS } from '@/domain/http-method';

export function methodFromUrlParam(value: unknown): HttpMethod {
  if (typeof value === 'string' && HTTP_METHODS.includes(value as HttpMethod)) {
    return value as HttpMethod;
  }
  return 'GET';
}
