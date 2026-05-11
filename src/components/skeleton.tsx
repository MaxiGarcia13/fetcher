import { cn } from '@maxigarcia/js-utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      aria-hidden
      className={cn('animate-pulse rounded-sm bg-gray-700/70', className)}
    />
  );
}

interface EditorSkeletonProps {
  className?: string;
}

export function EditorSkeleton({ className }: EditorSkeletonProps) {
  return (
    <section
      aria-busy
      aria-label="Loading editor"
      className={cn(
        'box-border h-full min-h-0 w-full overflow-hidden',
        className,
      )}
    >
      <Skeleton className="h-full min-h-0 w-full rounded-md" />
    </section>
  );
}
