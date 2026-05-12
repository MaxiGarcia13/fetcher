import type { HttpMethod } from '@/domain/http-request/types';

export interface DocFieldRow {
  key: string;
  type: string;
  example: string;
}

export interface RequestDocSections {
  method: HttpMethod;
  url: string;
  params: DocFieldRow[];
  headers: DocFieldRow[];
  body: DocFieldRow[];
}
