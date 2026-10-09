export type StreamFormat = 'sse' | 'ndjson' | 'bytes';

export type StreamEvent
  = | {
    kind: 'sse';
    event?: string;
    data: string;
    id?: string;
    at: number;
  }
  | {
    kind: 'ndjson';
    data: unknown;
    raw: string;
    at: number;
  }
  | {
    kind: 'bytes';
    text: string;
    at: number;
  };
