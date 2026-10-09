import { cn } from '@maxigarcia/js-utils';
import { Skeleton } from '../skeleton';

export function RequestEditorSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-col gap-2 sm:flex-row sm:items-start', className)}>
      <div className="flex w-full min-w-0 flex-1">
        <Skeleton className="h-10 max-w-20 flex-1 rounded-r-none sm:max-w-[110px]" />
        <Skeleton className="h-10 min-w-0 flex-1 rounded-none border-x border-app-border" />
        <Skeleton className="h-10 w-24 rounded-l-none sm:w-28" />
      </div>

      <Skeleton className="h-10 w-10 shrink-0 sm:w-32" />
    </div>
  );
}
