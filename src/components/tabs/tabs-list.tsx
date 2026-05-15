import type { TabsListProps } from './types';
import { cn } from '@maxigarcia/js-utils';

export function TabsList({ className, children }: TabsListProps) {
  return (
    <div role="tablist" aria-label="Tabs" className={cn('flex border-b border-app-border', className)}>
      {children}
    </div>
  );
}
