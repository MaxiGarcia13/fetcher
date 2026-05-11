import type { TabItem } from '@/components/tabs/types';
import { cn } from '@maxigarcia/js-utils';
import { TabsContent } from '@/components/tabs/tabs-content';
import { TabsHeader } from '@/components/tabs/tabs-header';
import { TabsRoot } from '@/components/tabs/tabs-root';
import { storage } from '@/utils/storage';
import { RequestBody } from './request-body';
import { RequestHeaders } from './request-headers';
import { RequestParams } from './request-params';

interface RequestOptionsPanelProps {
  defaultTab?: 'params' | 'headers' | 'body';
  className?: string;
}

const REQUEST_OPTIONS_TAB_STORAGE_SUFFIX = 'request-options-active-tab';

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
      content: <RequestBody />,
    },
  ];

  const handleValueChange = (value: 'params' | 'headers' | 'body') => {
    storage.write(REQUEST_OPTIONS_TAB_STORAGE_SUFFIX, value);
  };

  return (
    <TabsRoot
      items={items}
      defaultValue={storage.read(REQUEST_OPTIONS_TAB_STORAGE_SUFFIX) ?? defaultTab}
      onValueChange={handleValueChange}
      className={cn('h-full', className)}
    >
      <div className="border-b border-gray-700 px-4">
        <TabsHeader className="border-b-0" />
      </div>
      <TabsContent />
    </TabsRoot>
  );
}
