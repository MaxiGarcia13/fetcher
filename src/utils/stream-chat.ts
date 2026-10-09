import type { StreamEvent } from '@/domain/http-request';
import { isRecord, tryParseJson } from '@maxigarcia/js-utils';

export type ChatMessageRole = 'system' | 'user' | 'assistant' | (string & {});

export interface ChatMessage {
  role: ChatMessageRole;
  content: string;
}

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

/**
 * Append an assistant message to an OpenAI-style chat request body.
 * Returns the updated JSON string, or `null` if the body is not a chat payload
 * / assistant text is empty / the same assistant turn was already appended.
 */
export function appendAssistantToRequestBody(
  requestBody: string,
  assistantText: string,
): string | null {
  const trimmedAssistant = assistantText.trim();
  if (trimmedAssistant === '') {
    return null;
  }

  const parsed = tryParseJson(requestBody.trim());
  if (!isRecord(parsed) || !Array.isArray(parsed.messages)) {
    return null;
  }

  const messages = [...parsed.messages];
  const last = messages.at(-1);

  if (
    isRecord(last)
    && last.role === 'assistant'
    && normalizeMessageContent(last.content) === trimmedAssistant
  ) {
    return null;
  }

  messages.push({ role: 'assistant', content: trimmedAssistant });

  return JSON.stringify({ ...parsed, messages }, null, 2);
}

/** Parse OpenAI-style `{ messages: [{ role, content }] }` from the request body. */
export function parseChatMessages(requestBody: string): ChatMessage[] | null {
  const trimmed = requestBody.trim();
  if (trimmed === '') {
    return null;
  }

  const parsed = tryParseJson(trimmed);
  if (!isRecord(parsed) || !Array.isArray(parsed.messages)) {
    return null;
  }

  const messages: ChatMessage[] = [];

  for (const entry of parsed.messages) {
    if (!isRecord(entry) || typeof entry.role !== 'string') {
      continue;
    }

    const content = normalizeMessageContent(entry.content);
    if (content === null) {
      continue;
    }

    messages.push({ role: entry.role, content });
  }

  return messages.length > 0 ? messages : null;
}

function normalizeMessageContent(content: unknown): string | null {
  if (typeof content === 'string') {
    return content;
  }

  if (Array.isArray(content)) {
    const text = content
      .map((part) => {
        if (typeof part === 'string') {
          return part;
        }
        if (isRecord(part) && typeof part.text === 'string') {
          return part.text;
        }
        return '';
      })
      .join('');

    return text.length > 0 ? text : null;
  }

  return null;
}

export function streamEventToRawText(event: StreamEvent): string {
  switch (event.kind) {
    case 'sse': {
      const lines: string[] = [];
      if (event.event !== undefined) {
        lines.push(`event: ${event.event}`);
      }
      if (event.id !== undefined) {
        lines.push(`id: ${event.id}`);
      }
      for (const dataLine of event.data.split('\n')) {
        lines.push(`data: ${dataLine}`);
      }
      lines.push('');
      return `${lines.join('\n')}\n`;
    }
    case 'ndjson':
      return `${event.raw}\n`;
    case 'bytes':
      return event.text;
  }
}

export function streamEventPreview(event: StreamEvent): string {
  switch (event.kind) {
    case 'sse': {
      const label = event.event ? `${event.event} · ` : '';
      return truncate(`${label}${event.data}`);
    }
    case 'ndjson':
      return truncate(event.raw);
    case 'bytes':
      return truncate(event.text);
  }
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

function truncate(value: string, max = 160): string {
  if (value.length <= max) {
    return value;
  }

  return `${value.slice(0, max)}…`;
}
