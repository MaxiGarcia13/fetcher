import type { KeyValueEntry } from '@/components/key-value-table';
import type { HttpMethod } from '@/domain/http-request';

export interface HttpRequestState {
  method: HttpMethod;
  url: string;
  headers: KeyValueEntry[];
  params: KeyValueEntry[];
  body: string;
}
