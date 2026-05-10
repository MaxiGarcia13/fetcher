import type { KeyValueSuggestion } from '@/components/key-value-table';
import { cn } from '@maxigarcia/js-utils';
import { KeyValueTable } from '@/components/key-value-table';
import { useRequestState } from '@/store/request';

const COMMON_HTTP_HEADER_SUGGESTIONS: readonly KeyValueSuggestion[] = [
  {
    key: 'Accept',
    valueSuggestions: [
      'application/json',
      'application/xml',
      'text/html',
      'application/hal+json',
      '*/*',
    ],
  },
  {
    key: 'Accept-Encoding',
    valueSuggestions: ['gzip, deflate, br', 'gzip', 'identity'],
  },
  {
    key: 'Accept-Language',
    valueSuggestions: ['en-US,en;q=0.9', 'en-US', 'en'],
  },
  {
    key: 'Authorization',
    valueSuggestions: ['Bearer ', 'Basic ', 'Digest ', 'Api-Key '],
  },
  {
    key: 'Cache-Control',
    valueSuggestions: ['no-cache', 'no-store', 'max-age=0', 'public, max-age=31536000'],
  },
  {
    key: 'Content-Type',
    valueSuggestions: [
      'application/json',
      'application/x-www-form-urlencoded',
      'multipart/form-data',
      'text/plain',
      'application/xml',
    ],
  },
  { key: 'Cookie', valueSuggestions: [] },
  {
    key: 'Host',
    valueSuggestions: [],
  },
  { key: 'Origin', valueSuggestions: [] },
  { key: 'Referer', valueSuggestions: [] },
  {
    key: 'User-Agent',
    valueSuggestions: [
      'Mozilla/5.0',
      'fetcher-http-client',
    ],
  },
  { key: 'X-Requested-With', valueSuggestions: ['XMLHttpRequest'] },
  { key: 'X-API-Key', valueSuggestions: [] },
];

interface Props {
  className?: string;
}

export function RequestHeaders({ className }: Props) {
  const { headers, setHeaders } = useRequestState();

  return (
    <KeyValueTable
      className={cn('p-4', className)}
      value={headers}
      onChange={setHeaders}
      keyFieldPlaceholder="Header name"
      valueFieldPlaceholder="Header value"
      keySuggestions={COMMON_HTTP_HEADER_SUGGESTIONS}
      emptyMessage="No headers yet."
      spreadsheetTrailingBlankRow
      showAddButton={false}
      showVisibilityToggle
    />
  );
}
