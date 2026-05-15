import { cn } from '@maxigarcia/js-utils';
import { Skeleton } from '../skeleton';

export function EditorSkeleton({ className }: { className?: string }) {
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
