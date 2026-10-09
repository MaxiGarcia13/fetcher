import type { StreamEvent } from '@/domain/http-request';
import { tryParseJson } from '@maxigarcia/js-utils';

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

/** Full event payload for expanded event rows (pretty-printed when JSON). */
export function formatFullEvent(event: StreamEvent): string {
  switch (event.kind) {
    case 'sse': {
      const lines: string[] = [];
      if (event.event !== undefined) {
        lines.push(`event: ${event.event}`);
      }
      if (event.id !== undefined) {
        lines.push(`id: ${event.id}`);
      }
      lines.push(`data:\n${prettyJsonOrText(event.data)}`);
      return lines.join('\n');
    }
    case 'ndjson':
      return prettyJsonValue(event.data) ?? event.raw;
    case 'bytes':
      return prettyJsonOrText(event.text);
  }
}

function prettyJsonOrText(value: string): string {
  const parsed = tryParseJson(value.trim());
  if (parsed === undefined) {
    return value;
  }
  return prettyJsonValue(parsed) ?? value;
}

function prettyJsonValue(value: unknown): string | null {
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return null;
  }
}

function truncate(value: string, max = 160): string {
  if (value.length <= max) {
    return value;
  }

  return `${value.slice(0, max)}…`;
}
