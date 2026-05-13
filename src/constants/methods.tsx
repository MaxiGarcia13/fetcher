import type { HttpMethod } from '../domain/http-request/types';

export const METHODS_EXCLUDED_FROM_BODY: ReadonlyArray<HttpMethod> = ['GET', 'HEAD', 'DELETE', 'OPTIONS'];
export const METHODS_WITH_BODY: ReadonlyArray<HttpMethod> = ['POST', 'PUT', 'PATCH'];

export const HTTP_METHODS: ReadonlyArray<HttpMethod> = [
  ...METHODS_EXCLUDED_FROM_BODY,
  ...METHODS_WITH_BODY,
];
