import { submitHttpRequest } from './submit-http-request';

export async function submitHttpRequestTimes(
  times: number,
  submitType: 'server' | 'client',
): Promise<PromiseSettledResult<Response>[]> {
  const count = Math.max(0, Math.floor(times));

  return Promise.allSettled(
    Array.from({ length: count }, () => submitHttpRequest(submitType)),
  );
}
