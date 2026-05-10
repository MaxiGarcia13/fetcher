import type { TabsRootProps } from './types';
import { cn } from '@maxigarcia/js-utils';
import { useMemo, useState } from 'react';
import { TabsContext } from './context';

export function TabsRoot<T extends string>({
  items,
  defaultValue,
  value,
  onValueChange,
  className,
  children,
}: TabsRootProps<T>) {
  const [internalValue, setInternalValue] = useState<T>(defaultValue);
  const activeValue = value ?? internalValue;

  const contextValue = useMemo(
    () => ({
      items,
      activeValue,
      setActiveValue: (nextValue: T) => {
        if (value === undefined) {
          setInternalValue(nextValue);
        }
        onValueChange?.(nextValue);
      },
    }),
    [activeValue, items, onValueChange, value],
  );

  return (
    <TabsContext value={contextValue}>
      <div className={cn('flex min-h-0 flex-1 flex-col', className)}>
        {children}
      </div>
    </TabsContext>
  );
}
