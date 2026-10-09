import { cn } from '@maxigarcia/js-utils';
import { Skeleton } from '../skeleton';

export function RequestEditorSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-col gap-2 sm:flex-row sm:items-start', className)}>
      <div className="flex w-full min-w-0 flex-1">
        <Skeleton className="h-10 max-w-20 flex-1 rounded-r-none sm:max-w-[110px]" />
        <Skeleton className="h-10 flex-1 rounded-l-none border-l border-app-border" />
      </div>

      <div className="flex shrink-0 items-center justify-end gap-1">
        <Skeleton className="h-10 w-20 sm:w-28" />
        <Skeleton className="h-10 w-10 sm:w-32" />
      </div>
    </div>
  );
}
