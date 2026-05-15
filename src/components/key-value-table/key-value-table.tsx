import type { KeyValueEntry } from './types';
import { cn, isRecord, toFlatObject } from '@maxigarcia/js-utils';
import { useMemo } from 'react';
import { tryParseJson } from '@/utils/value';
import { KeyValueTableRow } from './key-value-table-row';
import { applySpreadsheetTrailingBlankRow } from './utils';

export interface KeyValueSuggestion {
  key: string;
  valueSuggestions?: ReadonlyArray<string>;
}

interface KeyValueTableProps {
  value: ReadonlyArray<KeyValueEntry>;
  onChange: (nextValue: KeyValueEntry[]) => void;
  className?: string;
  keyFieldPlaceholder?: string;
  valueFieldPlaceholder?: string;
  keySuggestions?: ReadonlyArray<KeyValueSuggestion | string>;
  emptyMessage?: string;
  spreadsheetTrailingBlankRow?: boolean;
  showAddButton?: boolean;
  showVisibilityToggle?: boolean;
}

export function KeyValueTable({
  value,
  onChange,
  className,
  keyFieldPlaceholder = 'Key',
  valueFieldPlaceholder = 'Value',
  keySuggestions = [],
  emptyMessage = 'No rows yet.',
  spreadsheetTrailingBlankRow = false,
  showVisibilityToggle = false,
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

  const suggestedKeys = useMemo(
    () => normalizedSuggestions.map((suggestion) => suggestion.key),
    [normalizedSuggestions],
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

  function replaceRowWithPastedObject(index: number, clipboardText: string) {
    const parsed = tryParseJson(clipboardText);

    if (!isRecord(parsed))
      return false;

    const flattened = toFlatObject(parsed);

    const next = [
      ...value.slice(0, index),
      ...Object.entries(flattened).map(([key, value]) => ({
        id: crypto.randomUUID(),
        key,
        value: typeof value === 'string' ? value : JSON.stringify(value),
        hidden: false,
        masked: false,
      })),
      ...value.slice(index + 1),
    ];

    emit(next);
    return true;
  }

  return (
    <section className={cn('space-y-3', className)}>
      <div className="grid grid-cols-[1fr_1fr_148px] gap-2 text-xs tracking-wide text-app-text-muted uppercase">
        <span>Key</span>
        <span>Value</span>
        <span>Actions</span>
      </div>

      {value.length === 0
        ? (
            <p className="text-sm text-app-text-muted">{emptyMessage}</p>
          )
        : (
            <div className="space-y-2">
              {value.map((entry, index) => {
                const suggestedValues = normalizedSuggestions.find(
                  (suggestion) => suggestion.key.toLowerCase() === entry.key.toLowerCase(),
                )?.valueSuggestions;
                return (
                  <KeyValueTableRow
                    key={entry.id}
                    entry={entry}
                    index={index}
                    keyFieldPlaceholder={keyFieldPlaceholder}
                    valueFieldPlaceholder={valueFieldPlaceholder}
                    suggestedKeys={suggestedKeys}
                    suggestedValues={suggestedValues}
                    showVisibilityToggle={showVisibilityToggle}
                    onKeyChange={(nextKey) => {
                      updateCell(index, 'key', nextKey);
                    }}
                    onValueChange={(nextValue) => {
                      updateCell(index, 'value', nextValue);
                    }}
                    onPasteObject={(clipboardText) => {
                      return replaceRowWithPastedObject(index, clipboardText);
                    }}
                    onMaskToggle={() => {
                      toggleRowMask(entry.id);
                    }}
                    onVisibilityToggle={() => {
                      toggleRowVisibility(entry.id);
                    }}
                    onRemoveRow={() => {
                      removeRow(index);
                    }}
                  />
                );
              })}
            </div>
          )}
    </section>
  );
}
