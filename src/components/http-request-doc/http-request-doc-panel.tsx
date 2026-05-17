import type { DocFieldRow } from './type';
import { toFlatObject } from '@maxigarcia/js-utils';
import { METHODS_EXCLUDED_FROM_BODY } from '@/constants/methods';
import { filterNotVisibleAndEmptyKey } from '@/domain/http-request';
import { useHttpRequestState } from '@/store/http-request';
import { getValueType, tryParseJson } from '@/utils/value';
import { RequestDocTable } from './request-doc-table';

export function HttpRequestDocPanel() {
  const { method, params, headers, body } = useHttpRequestState();

  const showBodySection = !METHODS_EXCLUDED_FROM_BODY.includes(method);

  const paramsRows: DocFieldRow[] = params.filter(filterNotVisibleAndEmptyKey).map((param) => ({
    key: param.key,
    type: getValueType(param.value),
    example: param.value,
  }));

  const headersRows: DocFieldRow[] = headers.filter(filterNotVisibleAndEmptyKey).map((header) => ({
    key: header.key,
    type: getValueType(header.value),
    example: header.value,
  }));

  const parsedBody = tryParseJson(body) ?? {};

  const bodyRows: DocFieldRow[] = Object.entries(toFlatObject(parsedBody)).map(([key, value]) => ({
    key,
    type: getValueType(value),
    example: value,
  }));

  return (
    <>
      <RequestDocTable title="Headers" rows={headersRows} />
      <RequestDocTable title="Params" rows={paramsRows} />

      { showBodySection && <RequestDocTable title="Body" rows={bodyRows} />}
    </>
  );
}
