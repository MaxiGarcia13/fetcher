import type { KeyValueEntry } from '@/components/key-value-table/types';
import { parseObjectFromKeyValueEntries } from '@/domain/http-request/request.utils';
import {
  HTTP_REQUEST_BODY_PARAM,
  HTTP_REQUEST_HEADERS_PARAM,
  HTTP_REQUEST_PARAMS_PARAM,
  HTTP_REQUEST_URL_PARAM,
} from '@/domain/http-request/url.consts';

export interface DocFieldRow {
  key: string;
  type: string;
  example: string;
}

export interface RequestDocSections {
  url: string;
  params: DocFieldRow[];
  headers: DocFieldRow[];
  body: DocFieldRow[];
}

function decodeSearchParamText(value: string): string {
  const binary = atob(value);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));

  return new TextDecoder().decode(bytes);
}

function readEncodedSearchParam(searchParams: URLSearchParams, key: string): string | undefined {
  const value = searchParams.get(key);

  if (!value) {
    return undefined;
  }

  return decodeSearchParamText(value);
}

function readKeyValueEntries(searchParams: URLSearchParams, key: string): KeyValueEntry[] {
  const decoded = readEncodedSearchParam(searchParams, key);

  if (!decoded) {
    return [];
  }

  try {
    const parsed = JSON.parse(decoded) as KeyValueEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function readBody(searchParams: URLSearchParams): string {
  return readEncodedSearchParam(searchParams, HTTP_REQUEST_BODY_PARAM) ?? '';
}

export function getValueType(value: unknown): string {
  if (value === null) {
    return 'null';
  }

  if (Array.isArray(value)) {
    return 'array';
  }

  return typeof value;
}

export function formatDocExample(value: unknown): string {
  if (typeof value === 'string') {
    return value;
  }

  return JSON.stringify(value);
}

export function objectToDocFieldRows(data: Record<string, unknown>): DocFieldRow[] {
  return Object.entries(data).map(([key, value]) => ({
    key,
    type: getValueType(value),
    example: formatDocExample(value),
  }));
}

export function bodyToDocFieldRows(body: string): DocFieldRow[] {
  const trimmed = body.trim();

  if (!trimmed) {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(trimmed);

    if (parsed !== null && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return objectToDocFieldRows(parsed as Record<string, unknown>);
    }

    return [{
      key: 'body',
      type: getValueType(parsed),
      example: formatDocExample(parsed),
    }];
  } catch {
    return [{
      key: 'body',
      type: 'string',
      example: trimmed,
    }];
  }
}

export function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll('\'', '&#39;');
}

export function docFieldRowsToHtml(title: string, rows: DocFieldRow[]): string {
  if (rows.length === 0) {
    return `<section class="space-y-3"><h2 class="text-sm font-semibold tracking-wide text-gray-300 uppercase">${escapeHtml(title)}</h2><p class="text-sm text-gray-500">No fields yet.</p></section>`;
  }

  const tableRows = rows.map((row) => `
      <tr class="border-t border-gray-700">
        <td class="px-3 py-2 font-medium text-gray-100">${escapeHtml(row.key)}</td>
        <td class="px-3 py-2 text-gray-400">${escapeHtml(row.type)}</td>
        <td class="px-3 py-2 break-all text-gray-300">${escapeHtml(row.example)}</td>
      </tr>`).join('');

  return `<section class="space-y-3"><h2 class="text-sm font-semibold tracking-wide text-gray-300 uppercase">${escapeHtml(title)}</h2><div class="overflow-x-auto rounded border border-gray-700"><table class="min-w-full text-left text-sm"><thead class="bg-gray-800 text-xs tracking-wide text-gray-400 uppercase"><tr><th class="px-3 py-2 font-medium">Key</th><th class="px-3 py-2 font-medium">Type</th><th class="px-3 py-2 font-medium">Example</th></tr></thead><tbody>${tableRows}</tbody></table></div></section>`;
}

export function parseRequestDocSearchParams(searchParams: URLSearchParams): RequestDocSections {
  const params = objectToDocFieldRows(
    parseObjectFromKeyValueEntries(readKeyValueEntries(searchParams, HTTP_REQUEST_PARAMS_PARAM)),
  );
  const headers = objectToDocFieldRows(
    parseObjectFromKeyValueEntries(readKeyValueEntries(searchParams, HTTP_REQUEST_HEADERS_PARAM)),
  );
  const body = bodyToDocFieldRows(readBody(searchParams));
  const url = readEncodedSearchParam(searchParams, HTTP_REQUEST_URL_PARAM) ?? '';

  return { url, params, headers, body };
}
