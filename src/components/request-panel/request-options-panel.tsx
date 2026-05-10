import type { TabItem } from '../tabs/types';
import { cn } from '@maxigarcia/js-utils';
import { TabsContent } from '../tabs/tabs-content';
import { TabsHeader } from '../tabs/tabs-header';
import { TabsRoot } from '../tabs/tabs-root';
import { RequestHeaders } from './request-headers';
import { RequestParams } from './request-params';

interface RequestOptionsPanelProps {
  defaultTab?: 'params' | 'headers' | 'body';
  className?: string;
}

export function RequestOptionsPanel({ defaultTab = 'headers', className }: RequestOptionsPanelProps = {}) {
  const items: TabItem<'params' | 'headers' | 'body'>[] = [
    {
      value: 'headers',
      label: 'Headers',
      content: <RequestHeaders />,
    },
    {
      value: 'params',
      label: 'Params',
      content: (
        <RequestParams />
      ),
    },

    {
      value: 'body',
      label: 'Body',
      content: (
        <p className="text-sm text-gray-500">
          Request body will go here.
        </p>
      ),
    },
  ];

  return (
    <TabsRoot
      items={items}
      defaultValue={defaultTab}
      className={cn('h-full', className)}
    >
      <div className="border-b border-gray-700 px-4">
        <TabsHeader className="border-b-0" />
      </div>
      <TabsContent contentClassName="px-4" />
    </TabsRoot>
  );
}
