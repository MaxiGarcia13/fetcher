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
