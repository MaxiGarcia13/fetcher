import type { TabItem } from '@/components/tabs/types';
import { cn } from '@maxigarcia/js-utils';
import { useState } from 'react';
import { TabsContent } from '@/components/tabs/tabs-content';
import { TabsHeader } from '@/components/tabs/tabs-header';
import { TabsRoot } from '@/components/tabs/tabs-root';
import { METHODS_WITH_BODY } from '@/domain/http-request';
import { useHttpRequestState } from '@/store/http-request';
import { storage } from '@/utils/storage';
import { ActionsSession } from '../actions-session';
import { RequestBody } from './request-body';
import { RequestHeaders } from './request-headers';
import { RequestParams } from './request-params';

interface RequestOptionsPanelProps {
  defaultTab?: 'params' | 'headers' | 'body';
  className?: string;
}

const REQUEST_OPTIONS_TAB_STORAGE_SUFFIX = 'request-options-active-tab';

type RequestOptionsTab = 'params' | 'headers' | 'body';

function readStoredRequestOptionsTab(defaultTab: RequestOptionsTab): RequestOptionsTab {
  const stored = storage.read(REQUEST_OPTIONS_TAB_STORAGE_SUFFIX);
  if (stored === 'params' || stored === 'headers' || stored === 'body') {
    return stored;
  }
  return defaultTab;
}

export function RequestOptionsPanel({ defaultTab = 'headers', className }: RequestOptionsPanelProps = {}) {
  const { method } = useHttpRequestState();
  const [activeTab, setActiveTab] = useState<RequestOptionsTab>(() => readStoredRequestOptionsTab(defaultTab));
  const bodyEnabled = METHODS_WITH_BODY.includes(method);

  const items: TabItem<RequestOptionsTab>[] = [
    {
      value: 'headers',
      label: 'Headers',
      content: <RequestHeaders />,
    },
    {
      value: 'params',
      label: 'Params',
      content: <RequestParams />,
    },
    {
      value: 'body',
      label: 'Body',
      content: <RequestBody />,
      disabled: !bodyEnabled,
    },
  ];

  if (!bodyEnabled && activeTab === 'body') {
    setActiveTab(defaultTab);
    storage.write(REQUEST_OPTIONS_TAB_STORAGE_SUFFIX, defaultTab);
  }

  const handleValueChange = (value: RequestOptionsTab) => {
    setActiveTab(value);
    storage.write(REQUEST_OPTIONS_TAB_STORAGE_SUFFIX, value);
  };

  return (
    <TabsRoot
      items={items}
      defaultValue={defaultTab}
      value={activeTab}
      onValueChange={handleValueChange}
      className={cn('h-full', className)}
    >
      <div className="flex flex-col-reverse justify-between border-b border-gray-700 px-4 sm:flex-row sm:items-center sm:gap-4">
        <TabsHeader className="h-full flex-1 border-b-0" />
        <ActionsSession className="w-full pb-4 sm:max-w-[230px]" />
      </div>
      <TabsContent />
    </TabsRoot>
  );
}
