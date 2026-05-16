import type { SavedSessionSnapshot } from '@/domain/saved-sessions';
import { cn } from '@maxigarcia/js-utils';
import { SAVED_SESSIONS_TEST_ID } from '@/constants/test-ids';
import { formatShortDate } from '@/utils/date';
import { handleKeyPressEvent } from '@/utils/key-press-event';
import { Button } from '../button';
import { BinIcon } from '../icons/bin';
import { RequestMethodBadge } from '../request-method-badge';
import { getSnapshotRequestMeta } from './utils';

export interface SavedSessionItemProps {
  snapshot: SavedSessionSnapshot;
  isActive?: boolean;
  className?: string;
  onSelect?: (snapshot: SavedSessionSnapshot) => void;
  onRemove?: (snapshot: SavedSessionSnapshot) => void;
}

function display(value: string | null): string {
  return value?.trim() ? value.trim() : '—';
}

export function SavedSessionItem({
  snapshot,
  isActive,
  className,
  onSelect,
  onRemove,
}: SavedSessionItemProps) {
  const { method, domain } = getSnapshotRequestMeta(snapshot.search);

  return (
    <li
      role="button"
      tabIndex={0}
      aria-label={`Select saved session ${snapshot.id}`}
      onKeyDown={handleKeyPressEvent(() => onSelect?.(snapshot))}
      className={
        cn(
          'flex gap-2 items-center shrink-0 rounded border text-xs cursor-pointer transition-all duration-200 ease-in-out hover:border-blue-500',
          isActive
            ? 'border-blue-500'
            : 'border-app-border',
          className,
        )
      }
      onClick={() => onSelect?.(snapshot)}
      data-testid={SAVED_SESSIONS_TEST_ID.SAVED_SESSIONS_LIST_ITEM}
    >

      <div className="flex flex-1 flex-col truncate p-2">
        <div className="flex min-w-0 items-center gap-2">
          <RequestMethodBadge method={method} />
          <span
            className="min-w-0 truncate text-app-text-primary"
            title={domain ?? undefined}
          >
            {display(domain)}
          </span>
        </div>
        <time className="mt-1 block text-[11px] text-app-text-muted" dateTime={snapshot.savedAt}>
          {formatShortDate(snapshot.savedAt)}
        </time>
      </div>

      <Button
        className="h-full shrink-0 rounded border-none  hover:bg-app-bg-muted"
        aria-label="Remove saved session"
        onKeyDown={handleKeyPressEvent(() => onRemove?.(snapshot))}
        onClick={(e) => {
          e.stopPropagation();
          onRemove?.(snapshot);
        }}
        data-testid={SAVED_SESSIONS_TEST_ID.SAVED_SESSIONS_LIST_ITEM_REMOVE_BUTTON}
      >
        <BinIcon className="size-4 text-app-text-muted" />
      </Button>
    </li>
  );
}
