import type { KeyValueEntry } from '@/components/key-value-table/types';
import { decodeText, getParamFromUrl, isRecord, isValidHttpUrl, tryParseJson } from '@maxigarcia/js-utils';
import { createKeyValueEmptyEntry } from '@/components/key-value-table/utils';
import {
  HTTP_REQUEST_BODY_PARAM,
  HTTP_REQUEST_HEADERS_PARAM,
  HTTP_REQUEST_METHOD_PARAM,
  HTTP_REQUEST_PARAMS_PARAM,
  HTTP_REQUEST_URL_PARAM,
} from '@/domain/http-request';
import { removeUrlParam } from '@/utils/url';

export function parseParamsFromRequestUrl(url: string): { baseUrl: string; params: KeyValueEntry[] } {
  const trimmed = url.trim();

  if (!trimmed || !isValidHttpUrl(trimmed)) {
    return { baseUrl: url, params: [] };
  }

  try {
    const parsed = new URL(trimmed);

    if (parsed.search === '') {
      return { baseUrl: url, params: [] };
    }

    const params = Array.from(parsed.searchParams.entries()).map(([key, value]) =>
      createKeyValueEmptyEntry(key, value),
    );

    parsed.search = '';

    return {
      baseUrl: parsed.toString(),
      params,
    };
  } catch {
    return { baseUrl: url, params: [] };
  }
}

function mergeParamsWithUrlQueryParams(
  loadedParams: KeyValueEntry[],
  paramsFromUrl: KeyValueEntry[],
): KeyValueEntry[] {
  const existingParams = loadedParams.filter((entry) => entry.key !== '' || entry.value !== '');
  const merged = [...existingParams, ...paramsFromUrl];

  return merged.length > 0 ? merged : [createKeyValueEmptyEntry()];
}

export function readInitialHttpRequestUrlAndParams(): { url: string; params: KeyValueEntry[] } {
  const urlRaw = readHttpRequestUrlParam(HTTP_REQUEST_URL_PARAM, '') ?? '';
  const loadedParams = readHttpRequestUrlParam(HTTP_REQUEST_PARAMS_PARAM, [createKeyValueEmptyEntry()]) ?? [
    createKeyValueEmptyEntry(),
  ];
  const { baseUrl, params: paramsFromUrl } = parseParamsFromRequestUrl(urlRaw);

  return {
    url: baseUrl,
    params: mergeParamsWithUrlQueryParams(loadedParams, paramsFromUrl),
  };
}

export function readHttpRequestUrlParam<T>(key: string, defaultValue?: T): T | undefined {
  const param = getParamFromUrl(key);

  if (param) {
    const decoded = decodeText(param);

    const paramsToParse = [HTTP_REQUEST_HEADERS_PARAM, HTTP_REQUEST_PARAMS_PARAM];

    if (paramsToParse.includes(key)) {
      const parsed = tryParseJson(decoded);

      if (Array.isArray(parsed)) {
        const filtered = parsed.filter((item) => isRecord(item) && 'key' in item && 'value' in item);

        if (filtered.length > 0) {
          return filtered as T;
        }
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
