import type { DocFieldRow } from './type';
import { toFlatObject } from '@maxigarcia/js-utils';
import { METHODS_EXCLUDED_FROM_BODY } from '@/constants/methods';
import { filterNotVisibleAndEmptyKey } from '@/domain/http-request';
import { useHttpRequestState } from '@/store/http-request';
import { getExampleValue, getValueType, tryParseJson } from '@/utils/value';
import { RequestDocTable } from './request-doc-table';

export function HttpRequestDocPanel() {
  const { method, params, headers, body } = useHttpRequestState();

  const showBodySection = !METHODS_EXCLUDED_FROM_BODY.includes(method);

  const mapToDocFieldRow = ({ key, value, masked }: { key: string; value: unknown; masked?: boolean }) => ({
    key,
    type: getValueType(value),
    example: masked ? '********' : getExampleValue(value),
  });

  const paramsRows: DocFieldRow[] = params.filter(filterNotVisibleAndEmptyKey).map(mapToDocFieldRow);
  const headersRows: DocFieldRow[] = headers.filter(filterNotVisibleAndEmptyKey).map(mapToDocFieldRow);

  const parsedBody = tryParseJson(body) ?? {};

  const bodyRows: DocFieldRow[] = Object
    .entries(toFlatObject(parsedBody))
    .map(([key, value]) => mapToDocFieldRow({ key, value }));

  return (
    <>
      <RequestDocTable title="Headers" rows={headersRows} />
      <RequestDocTable title="Params" rows={paramsRows} />

      { showBodySection && <RequestDocTable title="Body" rows={bodyRows} />}
    </>
  );
}
