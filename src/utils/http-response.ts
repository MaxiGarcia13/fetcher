import type { HttpResponseError } from '@/store/http-response';
import { tryParseJson } from '@/utils/value';

function primaryMimeType(headers: Record<string, string>): string {
  return (headers['content-type'] ?? '').split(';')[0]?.trim().toLowerCase() ?? '';
}

export function isImageResponseBody(headers: Record<string, string>, body: string): boolean {
  return primaryMimeType(headers).startsWith('image/') || body.startsWith('data:image/');
}

export function contentTypeIsHtml(headers: Record<string, string>): boolean {
  return primaryMimeType(headers).includes('text/html');
}

export function contentTypeIsJson(headers: Record<string, string>): boolean {
  return primaryMimeType(headers).includes('json');
}

export function isLikelyHtmlDocument(text: string): boolean {
  const head = text.trimStart().slice(0, 256);
  return /^<!DOCTYPE\s+html\b/i.test(head) || /^<html(?:[\s>]|$)/i.test(head);
}

function isJsonEditorContent(text: string, headers: Record<string, string>): boolean {
  const trimmed = text.trim();
  if (trimmed === '') {
    return true;
  }
  if (contentTypeIsJson(headers)) {
    return true;
  }
  return tryParseJson(trimmed) !== undefined;
}

export type ResponseBodyEditorLanguage = 'json' | 'html' | 'markdown';

export function responseEditorLanguage(headers: Record<string, string>, body: string): ResponseBodyEditorLanguage {
  if (contentTypeIsHtml(headers) || isLikelyHtmlDocument(body)) {
    return 'html';
  }
  if (isJsonEditorContent(body, headers)) {
    return 'json';
  }
  return 'markdown';
}

export function errorEditorValueAndLanguage(error: HttpResponseError): { value: string; language: 'json' | 'html' } {
  const message = error.message;
  if (typeof message === 'string' && isLikelyHtmlDocument(message)) {
    return { value: message, language: 'html' };
  }
  return { value: JSON.stringify(error, null, 2), language: 'json' };
}
