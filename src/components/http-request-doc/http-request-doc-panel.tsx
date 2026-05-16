import type { DocFieldRow } from './type';
import { toFlatObject } from '@maxigarcia/js-utils';
import { METHODS_EXCLUDED_FROM_BODY } from '@/constants/methods';
import { filterNotVisibleAndEmptyKey } from '@/domain/http-request';
import { useHttpRequestState } from '@/store/http-request';
import { tryParseJson } from '@/utils/value';
import { RequestMethodBadge } from '../request-method-badge';
import { RequestDocTable } from './request-doc-table';

export function HttpRequestDocPanel() {
  const { method, url, params, headers, body } = useHttpRequestState();

  const showBodySection = !METHODS_EXCLUDED_FROM_BODY.includes(method);

  const paramsRows: DocFieldRow[] = params.filter(filterNotVisibleAndEmptyKey).map((param) => ({
    key: param.key,
    type: typeof param.value,
    example: param.value,
  }));

  const headersRows: DocFieldRow[] = headers.filter(filterNotVisibleAndEmptyKey).map((header) => ({
    key: header.key,
    type: typeof header.value,
    example: header.value,
  }));

  const parsedBody = tryParseJson(body) ?? {};

  const bodyRows: DocFieldRow[] = Object.entries(toFlatObject(parsedBody)).map(([key, value]) => ({
    key,
    type: typeof value,
    example: value,
  }));

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-sm font-semibold tracking-wide text-app-text-muted uppercase">
        Method
      </h2>

      <RequestMethodBadge
        method={method}
        className="text-lg!"
      />

      <section className="space-y-3">
        <h2
          className="text-sm font-semibold tracking-wide text-app-text-muted uppercase"
        >
          URL
        </h2>
        {
          url
            ? (
                <p className="rounded border border-app-border bg-app-bg-surface px-3 py-2 text-sm break-all text-app-text-primary">
                  {url}
                </p>
              )
            : (
                <p className="text-sm text-app-text-muted">No URL set.</p>
              )
        }
      </section>

      <RequestDocTable title="Headers" rows={headersRows} />
      <RequestDocTable title="Params" rows={paramsRows} />

      { showBodySection && <RequestDocTable title="Body" rows={bodyRows} />}
    </section>
  );
}
