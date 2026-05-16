import type { HttpRequestState } from './type';
import { map } from 'nanostores';
import { createKeyValueEmptyEntry } from '@/components/key-value-table/utils';
import { getHttpMethod } from '@/domain/http-request';
import {
  HTTP_REQUEST_BODY_PARAM,
  HTTP_REQUEST_HEADERS_PARAM,
  HTTP_REQUEST_METHOD_PARAM,
  HTTP_REQUEST_PARAMS_PARAM,
  HTTP_REQUEST_URL_PARAM,
} from '@/domain/http-request/url.consts';
import { readHttpRequestUrlParam } from './http-request.url';

export const $httpRequest = map<HttpRequestState>({
  method: getHttpMethod(readHttpRequestUrlParam(HTTP_REQUEST_METHOD_PARAM)),
  url: readHttpRequestUrlParam(HTTP_REQUEST_URL_PARAM, ''),
  headers: readHttpRequestUrlParam(HTTP_REQUEST_HEADERS_PARAM, [createKeyValueEmptyEntry()]),
  params: readHttpRequestUrlParam(HTTP_REQUEST_PARAMS_PARAM, [createKeyValueEmptyEntry()]),
  body: readHttpRequestUrlParam(HTTP_REQUEST_BODY_PARAM, '{}'),
});
