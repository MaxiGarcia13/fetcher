import type { KeyValueEntry } from '@/components/key-value-table/types';
import type { DocFieldRow, RequestDocSections } from '@/domain/request-doc/types';
import { decodeText } from '@maxigarcia/js-utils';
import { getHttpMethod, parseObjectFromKeyValueEntries } from '@/domain/http-request/request.utils';
import {
  HTTP_REQUEST_BODY_PARAM,
  HTTP_REQUEST_HEADERS_PARAM,
  HTTP_REQUEST_METHOD_PARAM,
  HTTP_REQUEST_PARAMS_PARAM,
  HTTP_REQUEST_URL_PARAM,
} from '@/domain/http-request/url.consts';
import { escapeHtml } from '@/utils/html';
import { formatExampleValue, getValueType, normalizeJsonObjectValue } from '@/utils/value';

function readDecodedSearchParam(searchParams: URLSearchParams, key: string): string | undefined {
  const encoded = searchParams.get(key);

  if (!encoded) {
    return undefined;
  }

  return decodeText(encoded);
}

function readKeyValueEntries(searchParams: URLSearchParams, key: string): KeyValueEntry[] {
  const decoded = readDecodedSearchParam(searchParams, key);

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

function keyValueParamToDocFieldRows(searchParams: URLSearchParams, key: string): DocFieldRow[] {
  return objectToDocFieldRows(
    parseObjectFromKeyValueEntries(readKeyValueEntries(searchParams, key)),
  );
}

function joinDocFieldKey(prefix: string, segment: string): string {
  if (!prefix) {
    return segment;
  }

  if (segment.startsWith('[')) {
    return `${prefix}${segment}`;
  }

  return `${prefix}.${segment}`;
}

function getArrayItemTypes(items: unknown[]): string[] {
  return [...new Set(items.map((item) => getValueType(normalizeJsonObjectValue(item))))];
}

function formatArrayDocType(items: unknown[]): string {
  const itemTypes = getArrayItemTypes(items);

  if (itemTypes.length === 0) {
    return 'array';
  }

  if (itemTypes.length === 1) {
    return `array<${itemTypes[0]}>`;
  }

  return `array<${itemTypes.join(' | ')}>`;
}

function flattenToDocFieldRows(value: unknown, keyPrefix = ''): DocFieldRow[] {
  const normalized = normalizeJsonObjectValue(value);
  const type = getValueType(normalized);

  if (type === 'object' && normalized !== null && typeof normalized === 'object' && !Array.isArray(normalized)) {
    const entries = Object.entries(normalized as Record<string, unknown>);

    if (entries.length === 0) {
      return [{
        key: keyPrefix || 'body',
        type: 'object',
        example: '{}',
      }];
    }

    return entries.flatMap(([key, childValue]) => (
      flattenToDocFieldRows(childValue, joinDocFieldKey(keyPrefix, key))
    ));
  }

  if (type === 'array' && Array.isArray(normalized)) {
    return [{
      key: keyPrefix || 'body',
      type: formatArrayDocType(normalized),
      example: formatExampleValue(normalized),
    }];
  }

  return [{
    key: keyPrefix || 'body',
    type,
    example: formatExampleValue(normalized),
  }];
}

export function objectToDocFieldRows(data: Record<string, unknown>): DocFieldRow[] {
  return flattenToDocFieldRows(data);
}

export function bodyToDocFieldRows(body: string): DocFieldRow[] {
  const trimmed = body.trim();

  if (!trimmed) {
    return [];
  }

  return flattenToDocFieldRows(trimmed);
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
  return {
    method: getHttpMethod(readDecodedSearchParam(searchParams, HTTP_REQUEST_METHOD_PARAM) ?? ''),
    url: readDecodedSearchParam(searchParams, HTTP_REQUEST_URL_PARAM) ?? '',
    params: keyValueParamToDocFieldRows(searchParams, HTTP_REQUEST_PARAMS_PARAM),
    headers: keyValueParamToDocFieldRows(searchParams, HTTP_REQUEST_HEADERS_PARAM),
    body: bodyToDocFieldRows(readDecodedSearchParam(searchParams, HTTP_REQUEST_BODY_PARAM) ?? ''),
  };
}
