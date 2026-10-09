import type { StreamEvent } from '@/domain/http-request';
import { tryParseJson } from '@maxigarcia/js-utils';

type DeltaGetter = (value: Record<string, unknown>) => unknown;

const DELTA_GETTERS: readonly DeltaGetter[] = [
  (value) => getPath(value, ['choices', '0', 'delta', 'content']),
  (value) => getPath(value, ['choices', '0', 'message', 'content']),
  (value) => value.delta,
  (value) => value.content,
  (value) => value.text,
  (value) => getPath(value, ['message', 'content']),
];

export function extractChatDelta(value: unknown): string | null {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (trimmed === '' || trimmed === '[DONE]') {
      return null;
    }

    const parsed = tryParseJson(trimmed);
    if (parsed !== undefined) {
      return extractChatDelta(parsed);
    }

    return value;
  }

  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return null;
  }

  const record = value as Record<string, unknown>;

  for (const getDelta of DELTA_GETTERS) {
    const delta = getDelta(record);
    if (typeof delta === 'string' && delta.length > 0) {
      return delta;
    }
  }

  return null;
}

export function assembleChatFromEvents(events: readonly StreamEvent[]): string {
  let text = '';

  for (const event of events) {
    const delta = chatDeltaFromEvent(event);
    if (delta) {
      text += delta;
    }
  }

  return text;
}

function chatDeltaFromEvent(event: StreamEvent): string | null {
  switch (event.kind) {
    case 'sse':
      return extractChatDelta(event.data);
    case 'ndjson':
      return extractChatDelta(event.data);
    case 'bytes':
      return extractChatDelta(event.text);
  }
}

function getPath(value: Record<string, unknown>, path: readonly string[]): unknown {
  let current: unknown = value;

  for (const key of path) {
    if (typeof current !== 'object' || current === null) {
      return undefined;
    }

    if (Array.isArray(current)) {
      const index = Number(key);
      if (!Number.isInteger(index)) {
        return undefined;
      }
      current = current[index];
      continue;
    }

    current = (current as Record<string, unknown>)[key];
  }

  return current;
}
