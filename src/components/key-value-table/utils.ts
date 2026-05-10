import type { KeyValueEntry } from './types';

export function createKeyValueEmptyEntry(): KeyValueEntry {
  return {
    id: crypto.randomUUID(),
    key: '',
    value: '',
    hidden: false,
    masked: false,
  };
}

function rowIsEmpty(entry: KeyValueEntry): boolean {
  return entry.key.trim() === '' && entry.value.trim() === '';
}

function collapseDuplicateTrailingEmptyRows(rows: KeyValueEntry[]): KeyValueEntry[] {
  const out = [...rows];
  while (out.length >= 2 && rowIsEmpty(out[out.length - 1]) && rowIsEmpty(out[out.length - 2])) {
    out.pop();
  }
  return out;
}

export function applySpreadsheetTrailingBlankRow(rows: KeyValueEntry[]): KeyValueEntry[] {
  let next = collapseDuplicateTrailingEmptyRows(rows);
  if (next.length === 0)
    return [createKeyValueEmptyEntry()];

  const last = next[next.length - 1];
  if (!rowIsEmpty(last))
    next = [...next, createKeyValueEmptyEntry()];

  return next;
}
