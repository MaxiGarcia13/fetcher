import type { TabsTriggerProps } from './types';
import { cn } from '@maxigarcia/js-utils';
import { HTTP_REQUEST_TEST_ID } from '@/constants/test-ids/http-request';
import { useTabsContext } from './context';

export function TabsTrigger<T extends string>({
  value,
  className,
  activeClassName,
  inactiveClassName,
  disabled = false,
  children,
}: TabsTriggerProps<T>) {
  const { activeValue, setActiveValue } = useTabsContext<T>();
  const isActive = activeValue === value;

  return (
    <button
      type="button"
      role="tab"
      id={`tab-${value}`}
      data-testid={`${HTTP_REQUEST_TEST_ID.REQUEST_OPTIONS_TAB}-${value}`}
      aria-selected={isActive}
      aria-controls={`tabpanel-${value}`}
      aria-disabled={disabled}
      disabled={disabled}
      tabIndex={isActive ? 0 : -1}
      className={cn(
        'border-b-2 px-4 py-2.5 text-sm font-medium',
        isActive
          ? 'border-blue-600'
          : 'border-transparent text-app-text-muted hover:text-app-text-primary',
        isActive ? activeClassName : inactiveClassName,
        disabled ? 'cursor-not-allowed opacity-60 hover:text-app-text-muted!' : 'cursor-pointer',
        className,
      )}
      onClick={() => {
        if (!disabled) {
          setActiveValue(value);
        }
      }}
    >
      {children}
    </button>
  );
}
