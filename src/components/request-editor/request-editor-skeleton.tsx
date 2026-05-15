import { cn } from '@maxigarcia/js-utils';
import { Skeleton } from '../skeleton';

export function RequestEditorSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('flex max-h-[72px] min-h-0 flex-1 gap-2', className)}>
      <div className="flex flex-1">
        <Skeleton className="h-[38px] max-w-[80px] flex-1 rounded-r-none sm:max-w-[110px]" />
        <Skeleton className="h-[38px] flex-1 rounded-l-none border-l border-app-border" />
      </div>

      <Skeleton className="h-[38px] max-w-[100px] flex-1 sm:max-w-[140px]" />
    </div>
  );
}
