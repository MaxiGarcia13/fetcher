import { $httpRequest } from '@/store/http-request';
import { fetchHttpRequest } from './fetch-http-request';
import { getHttpMethod, parseObjectFromKeyValueEntries } from './request.utils';

export function submitHttpRequest(submitType: 'server' | 'client') {
  const { url, body, ...state } = $httpRequest.get();

  const method = getHttpMethod(state.method);
  const headers = parseObjectFromKeyValueEntries(state.headers);
  const params = parseObjectFromKeyValueEntries(state.params);

  if (submitType === 'server') {
    return fetch('/api/v1/http-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url,
        method,
        headers,
        params,
        body,
      }),
    });
  }

  return fetchHttpRequest(
    url,
    {
      method,
      headers,
      params,
      body,
    },
  );
}
