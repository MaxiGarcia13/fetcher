import { cn } from '@maxigarcia/js-utils';
import { Skeleton } from '../skeleton';

export function RequestPanelSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-1 flex-col', className)}>
      <div className="flex items-center justify-between gap-2 border-b-2 border-app-border px-4 pb-2">
        <div className="flex gap-2">
          <Skeleton className="h-[40px] w-[92px]" />
          <Skeleton className="h-[40px] w-[92px]" />
          <Skeleton className="h-[40px] w-[92px]" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-[32px] w-[67px]" />
          <Skeleton className="h-[32px] w-[67px]" />
          <Skeleton className="h-[32px] w-[32px]" />
          <Skeleton className="h-[32px] w-[32px]" />
        </div>
      </div>
      <div className="flex flex-1 flex-col">
        <Skeleton className="flex-1 rounded-none! border-b-2 border-app-border" />
        <Skeleton className="flex-1 rounded-none!" />
      </div>
    </div>
  );
}
