import { map } from 'nanostores';
import { isJsonString } from '@/domain/http-request';

export interface HttpResponseState {
  status: number | null;
  statusText: string;
  headers: Record<string, string>;
  body: string;
}

const initialHttpResponseState: HttpResponseState = {
  status: null,
  statusText: '',
  headers: {},
  body: '',
};

export const $httpResponse = map<HttpResponseState>(initialHttpResponseState);

export async function saveHttpResponse(response: Response): Promise<void> {
  const body = await response.text();

  $httpResponse.set({
    status: response.status,
    statusText: response.statusText,
    headers: Object.fromEntries(response.headers.entries()),
    body: mapBodyToRequest(body),
  });
}

export function clearHttpResponse(): void {
  $httpResponse.set(initialHttpResponseState);
}

function mapBodyToRequest(body: string): string {
  try {
    if (isJsonString(body)) {
      return JSON.stringify(JSON.parse(body), null, 2);
    }

    return body;
  } catch {
    return body;
  }
}
