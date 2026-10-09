import type { ChatMessage } from './types';
import { isRecord, tryParseJson } from '@maxigarcia/js-utils';

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
