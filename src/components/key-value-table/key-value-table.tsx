import type { KeyValueEntry } from './types';
import { cn } from '@maxigarcia/js-utils';
import { useMemo } from 'react';
import { AutocompleteInput } from '../autocomplete-input';
import { Button } from '../button';
import { BinIcon } from '../icons/bin';
import { EyeIcon } from '../icons/eye';
import { EyeOffIcon } from '../icons/eye-off';
import { LockPasswordIcon } from '../icons/lock-password';
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
  hideableRows?: boolean;
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
  hideableRows = false,
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
    const next
      = value.map((entry, entryIndex) =>
        entryIndex === index ? { ...entry, [cell]: nextCellValue } : entry,
      );
    emit(next);
  }

  function removeRow(index: number) {
    const nextValue = value.filter((_, entryIndex) => entryIndex !== index);
    emit(nextValue);
  }

  function toggleRowVisibility(rowId: string) {
    const next = value.map((entry) =>
      entry.id === rowId ? { ...entry, hidden: !entry.hidden } : entry,
    );
    emit(next);
  }

  function toggleRowMask(rowId: string) {
    const next = value.map((entry) =>
      entry.id === rowId ? { ...entry, masked: !entry.masked } : entry,
    );
    emit(next);
  }

  return (
    <section className={cn('space-y-3', className)}>
      <div className="grid grid-cols-[1fr_1fr_148px] gap-2 text-xs tracking-wide text-gray-400 uppercase">
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
                const { hidden: isHidden, masked: isMasked } = entry;

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
                      type={isMasked ? 'password' : 'text'}
                      placeholder={valuePlaceholder}
                      suggestions={valueSuggestions}
                      aria-label={`Value row ${index + 1}`}
                      className="rounded-l-none rounded-r-none border-r-0"
                    />
                    <div className="flex">
                      <Button
                        type="button"
                        onClick={() => {
                          toggleRowMask(entry.id);
                        }}
                        className="shrink-0 rounded-none border-r-0"
                        aria-label={`${isMasked ? 'Show value' : 'Mask value'} for row ${index + 1}`}
                      >
                        <LockPasswordIcon className={cn('size-4', !isMasked ? 'text-gray-400' : 'text-gray-200')} />
                      </Button>
                      {hideableRows
                        ? (
                            <Button
                              type="button"
                              onClick={() => {
                                toggleRowVisibility(entry.id);
                              }}
                              className="shrink-0 rounded-none border-r-0"
                              aria-label={`${isHidden ? 'Show' : 'Hide'} row ${index + 1}`}
                            >
                              {isHidden
                                ? <EyeOffIcon className="size-4 text-gray-200" />
                                : <EyeIcon className="size-4 text-gray-400" />}
                            </Button>
                          )
                        : null}
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
                  </div>
                );
              })}
            </div>
          )}
    </section>
  );
}
