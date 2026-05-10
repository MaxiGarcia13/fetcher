import type { TabItem } from './types';
import { createContext, use } from 'react';

interface TabsContextValue<T extends string = string> {
  items: TabItem<T>[];
  activeValue: T;
  setActiveValue: (value: T) => void;
}

export const TabsContext = createContext<TabsContextValue | null>(null);

export function useTabsContext<T extends string = string>() {
  const context = use(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used inside TabsRoot.');
  }
  return context as TabsContextValue<T>;
}
