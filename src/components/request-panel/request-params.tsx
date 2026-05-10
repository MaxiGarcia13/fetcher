import type { KeyValueEntry } from '../key-value-table';
import { cn } from '@maxigarcia/js-utils';
import { useState } from 'react';
import { createKeyValueEmptyEntry, KeyValueTable } from '../key-value-table';

interface Props {
  className?: string;
}

export function RequestParams({ className }: Props) {
  const [entries, setEntries] = useState<KeyValueEntry[]>(() => [
    createKeyValueEmptyEntry(),
  ]);

  return (
    <KeyValueTable
      className={cn(className)}
      value={entries}
      onChange={setEntries}
      keyPlaceholder="Parameter name"
      valuePlaceholder="Parameter value"
      emptyMessage="No query parameters yet."
      spreadsheetTrailingBlankRow
      showAddButton={false}
    />
  );
}
