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
      className={cn('p-4', className)}
      value={entries}
      onChange={setEntries}
      keyFieldPlaceholder="Parameter name"
      valueFieldPlaceholder="Parameter value"
      emptyMessage="No query parameters yet."
      spreadsheetTrailingBlankRow
      showAddButton={false}
      showVisibilityToggle
    />
  );
}
