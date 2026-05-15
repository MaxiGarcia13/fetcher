import { cn } from '@maxigarcia/js-utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      aria-hidden
      className={cn('animate-pulse rounded-sm bg-app-border/70', className)}
    />
  );
}
