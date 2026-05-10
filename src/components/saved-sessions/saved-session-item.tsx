import type { SavedSessionSnapshot } from '@/domain/saved-sessions';
import { cn } from '@maxigarcia/js-utils';
import { formatShortDate } from '@/utils/date';
import { Button } from '../button';
import { BinIcon } from '../icons/bin';
import { getSnapshotRequestMeta } from './utils';

export interface SavedSessionItemProps {
  snapshot: SavedSessionSnapshot;
  className?: string;
  onSelect?: (snapshot: SavedSessionSnapshot) => void;
  onRemove?: (snapshot: SavedSessionSnapshot) => void;
}

function display(value: string | null): string {
  return value?.trim() ? value.trim() : '—';
}

export function SavedSessionItem({
  snapshot,
  className,
  onSelect,
  onRemove,
}: SavedSessionItemProps) {
  const { method, domain } = getSnapshotRequestMeta(snapshot.search);
  const isActive
    = location.search === snapshot.search;

  return (
    <li
      className={cn(
        'flex gap-2 items-center rounded border text-xs cursor-pointer',
        isActive
          ? 'border-sky-500 bg-sky-950/25 ring-1 ring-sky-500/40'
          : 'border-gray-700',
        className,
      )}
      onClick={() => onSelect?.(snapshot)}
    >

      <div className="flex flex-1 flex-col p-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="shrink-0 font-mono text-[11px] font-semibold text-sky-400">
            {method ?? 'GET'}
          </span>
          <span
            className="min-w-0 truncate text-gray-300"
            title={domain ?? undefined}
          >
            {display(domain)}
          </span>
        </div>
        <time className="mt-1 block text-[11px] text-gray-500" dateTime={snapshot.savedAt}>
          {formatShortDate(snapshot.savedAt)}
        </time>
      </div>

      <Button
        className="h-full rounded border-none hover:bg-gray-700"
        aria-label="Remove saved session"
        onClick={(e) => {
          e.stopPropagation();
          onRemove?.(snapshot);
        }}
      >
        <BinIcon className="size-4 text-gray-400" />
      </Button>
    </li>
  );
}
