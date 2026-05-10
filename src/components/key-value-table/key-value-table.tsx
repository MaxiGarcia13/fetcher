import type { KeyValueEntry } from './types';
import { cn } from '@maxigarcia/js-utils';
import { useMemo } from 'react';
import { AutocompleteInput } from '../autocomplete-input';
import { Button } from '../button';
import { BinIcon } from '../icons/bin';
import { applySpreadsheetTrailingBlankRow } from './utils';

export interface KeyValueSuggestion {
  key: string;
  valueSuggestions?: ReadonlyArray<string>;
}

interface KeyValueTableProps {
  value: ReadonlyArray<KeyValueEntry>;
  onChange: (nextValue: KeyValueEntry[]) => void;
  className?: string;
  keyPlaceholder?: string;
  valuePlaceholder?: string;
  keySuggestions?: ReadonlyArray<KeyValueSuggestion | string>;
  emptyMessage?: string;
  spreadsheetTrailingBlankRow?: boolean;
  showAddButton?: boolean;
}

export function KeyValueTable({
  value,
  onChange,
  className,
  keyPlaceholder = 'Key',
  valuePlaceholder = 'Value',
  keySuggestions = [],
  emptyMessage = 'No rows yet.',
  spreadsheetTrailingBlankRow = false,
}: KeyValueTableProps) {
  const normalizedSuggestions = useMemo(
    () =>
      keySuggestions.map((suggestion) =>
        typeof suggestion === 'string'
          ? { key: suggestion, valueSuggestions: [] }
          : suggestion,
      ),
    [keySuggestions],
  );

  function emit(rows: KeyValueEntry[]) {
    const nextRows = spreadsheetTrailingBlankRow ? applySpreadsheetTrailingBlankRow(rows) : rows;
    onChange(nextRows);
  }

  function updateCell(index: number, cell: 'key' | 'value', nextCellValue: string) {
    const nextValue = value.map((entry, entryIndex) =>
      entryIndex === index ? { ...entry, [cell]: nextCellValue } : entry,
    );
    emit(nextValue);
  }

  function removeRow(index: number) {
    emit(value.filter((_, entryIndex) => entryIndex !== index));
  }

  return (
    <section className={cn('space-y-3', className)}>
      <div className="grid grid-cols-[1fr_1fr_auto] gap-2 text-xs tracking-wide text-gray-400 uppercase">
        <span>Key</span>
        <span>Value</span>
        <span>Actions</span>
      </div>

      {value.length === 0
        ? (
            <p className="text-sm text-gray-500">{emptyMessage}</p>
          )
        : (
            <div className="space-y-2">
              {value.map((entry, index) => {
                const valueSuggestions = normalizedSuggestions.find(
                  (suggestion) => suggestion.key.toLowerCase() === entry.key.toLowerCase(),
                )?.valueSuggestions;

                return (
                  <div key={entry.id} className="grid grid-cols-[1fr_1fr_auto]">
                    <AutocompleteInput
                      value={entry.key}
                      onChange={(nextValue) => {
                        updateCell(index, 'key', nextValue);
                      }}
                      placeholder={keyPlaceholder}
                      suggestions={normalizedSuggestions.map((suggestion) => suggestion.key)}
                      aria-label={`Key row ${index + 1}`}
                      className="rounded-r-none border-r-0"
                    />
                    <AutocompleteInput
                      value={entry.value}
                      onChange={(nextValue) => {
                        updateCell(index, 'value', nextValue);
                      }}
                      placeholder={valuePlaceholder}
                      suggestions={valueSuggestions}
                      aria-label={`Value row ${index + 1}`}
                      className="rounded-l-none rounded-r-none border-r-0"
                    />
                    <Button
                      type="button"
                      onClick={() => {
                        removeRow(index);
                      }}
                      className="shrink-0 rounded-l-none"
                      aria-label={`Remove row ${index + 1}`}
                    >
                      <BinIcon className="size-4 text-gray-400" />
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
    </section>
  );
}
