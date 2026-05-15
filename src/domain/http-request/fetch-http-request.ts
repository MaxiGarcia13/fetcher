import type { HttpMethod } from './types';
import { parseBodyForRequest } from './response.utils';

export interface HttpRequestOptions {
  method: HttpMethod;
  params: Record<string, string>;
  headers: Record<string, string>;
  body: string;
}

export function fetchHttpRequest(url: string, { method, params, headers, body }: HttpRequestOptions) {
  const urlParams = new URLSearchParams(params);
  const urlWithParams = new URL(url);

  urlWithParams.search = urlParams.toString();

  return fetch(urlWithParams.toString(), {
    method,
    headers,
    body: parseBodyForRequest(method, body),
  });
}
