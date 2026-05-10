import type { TabsTriggerProps } from './types';
import { cn } from '@maxigarcia/js-utils';
import { useTabsContext } from './context';

export function TabsTrigger<T extends string>({
  value,
  className,
  activeClassName,
  inactiveClassName,
  children,
}: TabsTriggerProps<T>) {
  const { activeValue, setActiveValue } = useTabsContext<T>();
  const isActive = activeValue === value;

  return (
    <button
      type="button"
      role="tab"
      id={`tab-${value}`}
      aria-selected={isActive}
      aria-controls={`tabpanel-${value}`}
      tabIndex={isActive ? 0 : -1}
      className={cn(
        'border-b-2 px-4 cursor-pointer py-2.5 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900',
        isActive ? 'border-blue-600' : 'border-transparent text-gray-400 hover:text-gray-200',
        isActive ? activeClassName : inactiveClassName,
        className,
      )}
      onClick={() => {
        setActiveValue(value);
      }}
    >
      {children}
    </button>
  );
}
