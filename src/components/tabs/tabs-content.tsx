import type { TabsContentProps, TabsPanelProps } from './types';
import { cn } from '@maxigarcia/js-utils';
import { useTabsContext } from './context';

export function TabsPanel<T extends string>({ value, className, children }: TabsPanelProps<T>) {
  const { activeValue } = useTabsContext<T>();
  if (activeValue !== value) {
    return null;
  }
  return (
    <div role="tabpanel" id={`tabpanel-${value}`} aria-labelledby={`tab-${value}`} className={className}>
      {children}
    </div>
  );
}

export function TabsContent({ containerClassName, contentClassName }: TabsContentProps) {
  const { items } = useTabsContext();

  return (
    <div className={cn('flex min-h-0 flex-1 flex-col overflow-hidden', containerClassName)}>
      {items.map((item) => (
        <TabsPanel
          key={item.value}
          value={item.value}
          className={cn('flex min-h-0 flex-1 flex-col overflow-auto p-1', contentClassName)}
        >
          {item.content}
        </TabsPanel>
      ))}
    </div>
  );
}
