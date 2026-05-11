import type { APIRoute } from 'astro';
import type { HttpMethod } from '@/domain/http-request';
import { isJsonString } from '@/domain/http-request';

export const POST: APIRoute = async ({ request }) => {
  const { url, method, params, headers, body } = await request.json();

  const response = await fetch(`${url}?${new URLSearchParams(params).toString()}`, {
    method,
    headers,
    body: parseBody(method, body),
  });

  return new Response(response.body, {
    headers: response.headers,
  });
};

function parseBody(method: HttpMethod, body: string) {
  const excludedMethods = ['GET', 'HEAD', 'DELETE', 'OPTIONS'];

  if (excludedMethods.includes(method)) {
    return undefined;
  }

  const trimmedBody = body.trim();

  if (!isJsonString(trimmedBody)) {
    return undefined;
  }

  return trimmedBody;
}
