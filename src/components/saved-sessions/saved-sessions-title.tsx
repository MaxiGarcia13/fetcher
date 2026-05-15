import { cn } from '@maxigarcia/js-utils';
import { HistoryIcon } from '../icons/history';

export function SavedSessionsTitle({ className }: { className?: string }) {
  return (
    <h2 className={cn('flex shrink-0 items-center gap-2 text-sm font-medium text-app-text-muted uppercase', className)}>
      <HistoryIcon className="size-4" />
      <span className="mt-0.5">
        Saved requests
      </span>
    </h2>
  );
}
