import type { TabsProps } from './types';
import { TabsContent } from './tabs-content';
import { TabsHeader } from './tabs-header';
import { TabsRoot } from './tabs-root';

export function Tabs<T extends string>({
  items,
  defaultValue,
  value,
  onValueChange,
  className,
  listClassName,
  triggerClassName,
  activeTriggerClassName,
  inactiveTriggerClassName,
  contentContainerClassName,
  contentClassName,
}: TabsProps<T>) {
  const first = items[0]?.value;
  const initialValue = (defaultValue ?? first) as T;

  return (
    <TabsRoot
      items={items}
      defaultValue={initialValue}
      value={value}
      onValueChange={onValueChange}
      className={className}
    >
      <TabsHeader
        className={listClassName}
        triggerClassName={triggerClassName}
        activeTriggerClassName={activeTriggerClassName}
        inactiveTriggerClassName={inactiveTriggerClassName}
      />
      <TabsContent
        containerClassName={contentContainerClassName}
        contentClassName={contentClassName}
      />
    </TabsRoot>
  );
}
