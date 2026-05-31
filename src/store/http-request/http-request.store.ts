import type { HttpRequestState } from './type';
import { map } from 'nanostores';
import { createKeyValueEmptyEntry } from '@/components/key-value-table/utils';
import { getHttpMethod } from '@/domain/http-request';
import {
  HTTP_REQUEST_BODY_PARAM,
  HTTP_REQUEST_HEADERS_PARAM,
  HTTP_REQUEST_METHOD_PARAM,
} from '@/domain/http-request/url.consts';
import { readHttpRequestUrlParam, readInitialHttpRequestUrlAndParams } from './http-request.url';

const { url, params } = readInitialHttpRequestUrlAndParams();

export const $httpRequest = map<HttpRequestState>({
  method: getHttpMethod(readHttpRequestUrlParam(HTTP_REQUEST_METHOD_PARAM)),
  url,
  headers: readHttpRequestUrlParam(HTTP_REQUEST_HEADERS_PARAM, [createKeyValueEmptyEntry()]),
  params,
  body: readHttpRequestUrlParam(HTTP_REQUEST_BODY_PARAM, '{}'),
});
