import type { HttpMethod } from '@/domain/http-method';
import { decodeText, getUrlDomain } from '@maxigarcia/js-utils';
import { REQUEST_METHOD_PARAM, REQUEST_URL_PARAM } from '@/store/request/url';
import { methodFromUrlParam } from '@/utils/url';

export interface SnapshotRequestMeta {
  method: HttpMethod | null;
  domain: string | null;
}

export function getSnapshotRequestMeta(search: string): SnapshotRequestMeta {
  const qs = search.startsWith('?') ? search.slice(1) : search;
  const params = new URLSearchParams(qs);
  const urlEncoded = params.get(REQUEST_URL_PARAM);
  const methodEncoded = params.get(REQUEST_METHOD_PARAM);

  const rawUrl = urlEncoded ? decodeText(urlEncoded).trim() : '';
  const method = methodEncoded ? decodeText(methodEncoded).trim() : '';

  const domain = rawUrl !== '' ? getUrlDomain(rawUrl) : null;

  return {
    method: methodFromUrlParam(method),
    domain,
  };
}
