export interface TabItem<T extends string = string> {
  value: T;
  label: string;
  content: React.ReactNode;
}

export interface TabsRootProps<T extends string = string> {
  items: TabItem<T>[];
  defaultValue: T;
  value?: T;
  onValueChange?: (value: T) => void;
  className?: string;
  children: React.ReactNode;
}

export interface TabsListProps {
  className?: string;
  children: React.ReactNode;
}

export interface TabsTriggerProps<T extends string = string> {
  value: T;
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
  children: React.ReactNode;
}

export interface TabsContentProps<T extends string = string> {
  contentClassName?: string;
  containerClassName?: string;
}

export interface TabsPanelProps<T extends string = string> {
  value: T;
  className?: string;
  children: React.ReactNode;
}

export interface TabsHeaderProps {
  className?: string;
  triggerClassName?: string;
  activeTriggerClassName?: string;
  inactiveTriggerClassName?: string;
}

export interface TabsProps<T extends string = string> {
  items: TabItem<T>[];
  defaultValue?: T;
  value?: T;
  onValueChange?: (value: T) => void;
  className?: string;
  listClassName?: string;
  triggerClassName?: string;
  activeTriggerClassName?: string;
  inactiveTriggerClassName?: string;
  contentContainerClassName?: string;
  contentClassName?: string;
}
