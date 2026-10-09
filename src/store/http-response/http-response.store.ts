import type { HttpResponseState } from './type';
import { map } from 'nanostores';

export const initialHttpResponseState: HttpResponseState = {
  isLoading: false,
  status: null,
  statusText: '',
  headers: {},
  body: '',
  error: null,
  callResults: [],
  mode: 'buffered',
  isStreaming: false,
  streamFormat: null,
  events: [],
};

export const $httpResponse = map<HttpResponseState>(initialHttpResponseState);
