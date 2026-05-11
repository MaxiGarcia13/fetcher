import type { APIRoute } from 'astro';
import { parseBodyForRequest } from '@/domain/http-request/response.utils';

export const POST: APIRoute = async ({ request }) => {
  const { url, method, params, headers, body } = await request.json();

  const response = await fetch(`${url}?${new URLSearchParams(params).toString()}`, {
    method,
    headers,
    body: parseBodyForRequest(method, body),
  });

  return new Response(response.body, {
    headers: response.headers,
  });
};
