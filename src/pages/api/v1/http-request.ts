import type { APIRoute } from 'astro';
import { parseBodyForRequest } from '@/domain/http-request/response.utils';

const HOP_BY_HOP_RESPONSE_HEADERS = new Set([
  'connection',
  'content-encoding',
  'content-length',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailer',
  'transfer-encoding',
  'upgrade',
]);

export const POST: APIRoute = async ({ request }) => {
  try {
    const { url, method, params, headers, body } = await request.json();

    const urlParams = new URLSearchParams(params);
    const urlWithParams = new URL(url);
    urlWithParams.search = urlParams.toString();

    const response = await fetch(urlWithParams.toString(), {
      method,
      headers,
      body: parseBodyForRequest(method, body),
    });

    const proxyHeaders = new Headers();

    response.headers.forEach((value, key) => {
      if (!HOP_BY_HOP_RESPONSE_HEADERS.has(key.toLowerCase())) {
        proxyHeaders.set(key, value);
      }
    });

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: proxyHeaders,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Request failed';

    return new Response(JSON.stringify({ message }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
