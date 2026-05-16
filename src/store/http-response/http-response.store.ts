import type { HttpResponseState } from './type';
import { map } from 'nanostores';

export const initialHttpResponseState: HttpResponseState = {
  isLoading: false,
  status: null,
  statusText: '',
  headers: {},
  body: '',
  error: null,
};

export const $httpResponse = map<HttpResponseState>(initialHttpResponseState);
