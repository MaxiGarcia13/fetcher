import { $httpRequest } from '@/store/http-request';
import { getHttpMethod, parseObjectFromKeyValueEntries } from './request.utils';

export function sendHttpRequest() {
  const { url, method, params, headers, body } = $httpRequest.get();

  return fetch('/api/v1/http-request', {
    method: 'POST',
    body: JSON.stringify({
      url,
      method: getHttpMethod(method),
      headers: parseObjectFromKeyValueEntries(headers),
      params: parseObjectFromKeyValueEntries(params),
      body,
    }),
  });
}
