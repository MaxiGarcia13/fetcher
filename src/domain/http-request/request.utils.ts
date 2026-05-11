import type { HttpMethod } from '@/domain/http-request';
import { HTTP_METHODS } from '@/domain/http-request';

export function getHttpMethod(value: unknown): HttpMethod {
  if (typeof value === 'string' && HTTP_METHODS.includes(value as HttpMethod)) {
    return value as HttpMethod;
  }
  return 'GET';
}
