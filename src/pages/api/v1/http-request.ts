import type { APIRoute } from 'astro';
import { fetchHttpRequest } from '@/domain/http-request/fetch-http-request';

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

    const response = await fetchHttpRequest(url, { method, params, headers, body });

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
