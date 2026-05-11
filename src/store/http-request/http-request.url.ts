import { decodeText, getUrlParam, removeUrlParam } from '@maxigarcia/js-utils';

export const HTTP_REQUEST_URL_PARAM = 'url';
export const HTTP_REQUEST_METHOD_PARAM = 'method';
export const HTTP_REQUEST_HEADERS_PARAM = 'headers';
export const HTTP_REQUEST_PARAMS_PARAM = 'params';
export const HTTP_REQUEST_BODY_PARAM = 'body';

export function readHttpRequestUrlParam<T>(key: string, defaultValue?: T): T | undefined {
  const param = getUrlParam(key);

  if (param) {
    const decoded = decodeText(param);

    const paramsToParse = [HTTP_REQUEST_HEADERS_PARAM, HTTP_REQUEST_PARAMS_PARAM];

    if (paramsToParse.includes(key)) {
      return JSON.parse(decoded) as T;
    }

    return decoded as T;
  }

  return defaultValue;
}

export function resetHttpRequestUrlParams() {
  removeUrlParam(HTTP_REQUEST_URL_PARAM);
  removeUrlParam(HTTP_REQUEST_METHOD_PARAM);
  removeUrlParam(HTTP_REQUEST_HEADERS_PARAM);
  removeUrlParam(HTTP_REQUEST_PARAMS_PARAM);
  removeUrlParam(HTTP_REQUEST_BODY_PARAM);
}
