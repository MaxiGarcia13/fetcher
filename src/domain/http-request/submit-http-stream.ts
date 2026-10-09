import type { HttpOptionsWithBody } from '@maxigarcia/js-utils';
import type { StreamEvent, StreamFormat } from './stream.types';
import { http } from '@maxigarcia/js-utils';
import { $httpRequest } from '@/store/http-request';
import { getHttpMethod, parseObjectFromKeyValueEntries } from './request.utils';
import { parseBodyForRequest } from './response.utils';

type HttpClient = ReturnType<typeof http>;
type StreamRequestOptions = HttpOptionsWithBody & { method?: string };

let activeClient: HttpClient | null = null;

export function abortHttpStream(): void {
  activeClient?.abort();
  activeClient = null;
}

export async function* submitHttpStream(
  submitType: 'server' | 'client',
  format: StreamFormat,
): AsyncGenerator<StreamEvent> {
  abortHttpStream();

  const { url, body, ...state } = $httpRequest.get();
  const method = getHttpMethod(state.method);
  const headers = parseObjectFromKeyValueEntries(state.headers);
  const params = parseObjectFromKeyValueEntries(state.params);
  const startedAt = Date.now();

  try {
    if (submitType === 'server') {
      activeClient = http('/api/v1/http-request');
      yield* openMappedStream(activeClient, format, {
        method: 'POST',
        body: {
          url,
          method,
          headers,
          params,
          body,
        },
      }, startedAt);
      return;
    }

    activeClient = http(url);
    yield* openMappedStream(activeClient, format, {
      method,
      headers,
      params,
      body: parseBodyForRequest(method, body),
    }, startedAt);
  } finally {
    activeClient = null;
  }
}

export function streamEventToAssembledText(event: StreamEvent): string {
  switch (event.kind) {
    case 'sse':
      return event.data;
    case 'ndjson':
      return `${event.raw}\n`;
    case 'bytes':
      return event.text;
  }
}

async function* openMappedStream(
  client: HttpClient,
  format: StreamFormat,
  options: StreamRequestOptions,
  startedAt: number,
): AsyncGenerator<StreamEvent> {
  if (format === 'sse') {
    for await (const chunk of client.stream({ ...options, format: 'sse' })) {
      yield {
        kind: 'sse',
        event: chunk.event,
        data: chunk.data,
        id: chunk.id,
        at: Date.now() - startedAt,
      };
    }
    return;
  }

  if (format === 'ndjson') {
    for await (const chunk of client.stream({ ...options, format: 'ndjson' })) {
      yield {
        kind: 'ndjson',
        data: chunk,
        raw: JSON.stringify(chunk),
        at: Date.now() - startedAt,
      };
    }
    return;
  }

  const decoder = new TextDecoder();

  for await (const chunk of client.stream({ ...options, format: 'bytes' })) {
    yield {
      kind: 'bytes',
      text: decoder.decode(chunk, { stream: true }),
      at: Date.now() - startedAt,
    };
  }

  const rest = decoder.decode();

  if (rest) {
    yield {
      kind: 'bytes',
      text: rest,
      at: Date.now() - startedAt,
    };
  }
}
