import { cn } from '@maxigarcia/js-utils';
import { useState } from 'react';

export interface TabItem<T extends string = string> {
  value: T;
  label: string;
  content: React.ReactNode;
}

interface TabsProps<T extends string = string> {
  items: TabItem<T>[];
  defaultValue?: T;
  className?: string;
}

export function Tabs<T extends string>({ items, defaultValue, className }: TabsProps<T>) {
  const first = items[0]?.value;
  const [active, setActive] = useState<T>(() => defaultValue ?? first as T);

  return (
    <div className={cn('flex min-h-0 flex-1 flex-col', className)}>
      <div role="tablist" aria-label="Tabs" className="flex border-b border-gray-700">
        {items.map((item) => {
          const isActive = active === item.value;

          return (
            <button
              key={item.value}
              type="button"
              role="tab"
              id={`tab-${item.value}`}
              aria-selected={isActive}
              aria-controls={`tabpanel-${item.value}`}
              tabIndex={isActive ? 0 : -1}
              className={cn(
                'border-b-2 px-4 cursor-pointer py-2.5 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900',
                isActive
                  ? 'border-blue-600'
                  : 'border-transparent text-gray-400 hover:text-gray-200',
              )}
              onClick={() => {
                setActive(item.value);
              }}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <div className="min-h-0 flex-1 overflow-auto">
        {items.map((item) =>
          active === item.value
            ? (
                <div
                  key={item.value}
                  role="tabpanel"
                  id={`tabpanel-${item.value}`}
                  aria-labelledby={`tab-${item.value}`}
                  className="p-4"
                >
                  {item.content}
                </div>
              )
            : null,
        )}
      </div>
    </div>
  );
}
