import type { TabsHeaderProps } from './types';
import { useTabsContext } from './context';
import { TabsList } from './tabs-list';
import { TabsTrigger } from './tabs-trigger';

export function TabsHeader({
  className,
  triggerClassName,
  activeTriggerClassName,
  inactiveTriggerClassName,
}: TabsHeaderProps) {
  const { items } = useTabsContext();

  return (
    <TabsList className={className}>
      {items.map((item) => (
        <TabsTrigger
          key={item.value}
          value={item.value}
          className={triggerClassName}
          activeClassName={activeTriggerClassName}
          inactiveClassName={inactiveTriggerClassName}
          disabled={item.disabled}
        >
          {item.label}
        </TabsTrigger>
      ))}
    </TabsList>
  );
}
