import { decodeText, getParamFromUrl, isRecord, tryParseJson } from '@maxigarcia/js-utils';
import {
  HTTP_REQUEST_BODY_PARAM,
  HTTP_REQUEST_HEADERS_PARAM,
  HTTP_REQUEST_METHOD_PARAM,
  HTTP_REQUEST_PARAMS_PARAM,
  HTTP_REQUEST_URL_PARAM,
} from '@/domain/http-request';
import { removeUrlParam } from '@/utils/url';

export function readHttpRequestUrlParam<T>(key: string, defaultValue?: T): T | undefined {
  const param = getParamFromUrl(key);

  if (param) {
    const decoded = decodeText(param);

    const paramsToParse = [HTTP_REQUEST_HEADERS_PARAM, HTTP_REQUEST_PARAMS_PARAM];

    if (paramsToParse.includes(key)) {
      const parsed = tryParseJson(decoded);

      if (Array.isArray(parsed)
        && parsed.length > 0
        && parsed.every((item) => isRecord(item) && 'key' in item && 'value' in item)) {
        return parsed as T;
      }

      return defaultValue;
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
