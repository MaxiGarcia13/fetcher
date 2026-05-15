import { cn } from '@maxigarcia/js-utils';
import { Skeleton } from '../skeleton';
import { SavedSessionsTitle } from './saved-sessions-title';

export function SavedSessionPanelSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('flex min-h-0 flex-1 flex-col gap-4', className)}>
      <SavedSessionsTitle />

      <div className="flex flex-col gap-2">

        <Skeleton className="h-[53px] w-full" />
        <Skeleton className="h-[53px] w-full" />
        <Skeleton className="h-[53px] w-full" />
      </div>
    </div>
  );
}
