import { $requestEditor } from '@/store/request';
import { getHttpMethod } from '@/utils/request';

export function sendHttpRequest() {
  const { url, method, params, headers, body } = $requestEditor.get();

  const headersObject = Object
    .fromEntries(
      headers
        .filter((header) => header.key !== '' || header.hidden)
        .map((header) => [header.key, header.value]),
    );

  const paramsObject = Object
    .fromEntries(
      params
        .filter((param) => param.key !== '' || param.hidden)
        .map((param) => [param.key, param.value]),
    );

  return fetch('/api/http-request', {
    method: 'POST',
    body: JSON.stringify({
      url,
      method: getHttpMethod(method),
      params: paramsObject,
      headers: headersObject,
      body,
    }),
  });
}
