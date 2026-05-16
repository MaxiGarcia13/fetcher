import type { HttpMethod } from '@/domain/http-request';
import { decodeText, getUrlDomain } from '@maxigarcia/js-utils';
import { getHttpMethod } from '@/domain/http-request';
import { HTTP_REQUEST_METHOD_PARAM, HTTP_REQUEST_URL_PARAM } from '@/domain/http-request/url.consts';

export interface SnapshotRequestMeta {
  method: HttpMethod | null;
  domain: string | null;
}

export function getSnapshotRequestMeta(search: string): SnapshotRequestMeta {
  const qs = search.startsWith('?') ? search.slice(1) : search;
  const params = new URLSearchParams(qs);

  const urlEncoded = params.get(HTTP_REQUEST_URL_PARAM);
  const methodEncoded = params.get(HTTP_REQUEST_METHOD_PARAM);

  const rawUrl = urlEncoded ? decodeText(decodeURIComponent(urlEncoded)).trim() : '';
  const method = methodEncoded ? decodeText(decodeURIComponent(methodEncoded)).trim() : '';

  const domain = rawUrl !== '' ? getUrlDomain(rawUrl) : null;

  return {
    method: getHttpMethod(method),
    domain,
  };
}
