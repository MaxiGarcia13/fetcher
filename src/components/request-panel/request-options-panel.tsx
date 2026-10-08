import type { TabItem } from '@/components/tabs/types';
import { cn, createStorage } from '@maxigarcia/js-utils';
import { useState } from 'react';
import { TabsContent } from '@/components/tabs/tabs-content';
import { TabsHeader } from '@/components/tabs/tabs-header';
import { TabsRoot } from '@/components/tabs/tabs-root';
import { METHODS_WITH_BODY } from '@/constants/methods';
import { useHttpRequestState } from '@/store/http-request';
import { ActionsSession } from '../actions-session';
import { RequestBody } from './request-body';
import { RequestHeaders } from './request-headers';
import { RequestParams } from './request-params';

interface RequestOptionsPanelProps {
  defaultTab?: 'params' | 'headers' | 'body';
  className?: string;
}

type RequestOptionsTab = 'params' | 'headers' | 'body';

const requestOptionsTabStorage = createStorage<RequestOptionsTab>('request-options-active-tab');

function readStoredRequestOptionsTab(defaultTab: RequestOptionsTab): RequestOptionsTab {
  const stored = requestOptionsTabStorage.getItem();
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
    requestOptionsTabStorage.setItem(defaultTab);
  }

  const handleValueChange = (value: RequestOptionsTab) => {
    setActiveTab(value);
    requestOptionsTabStorage.setItem(value);
  };

  return (
    <TabsRoot
      items={items}
      defaultValue={defaultTab}
      value={activeTab}
      onValueChange={handleValueChange}
      className={cn('box-border h-full py-1', className)}
    >
      <div className="flex flex-col-reverse justify-between border-b border-app-border px-4 sm:flex-row sm:items-center sm:gap-4">
        <TabsHeader className="h-full flex-1 border-b-0" />
        <ActionsSession className="w-full pb-4 sm:max-w-95" />
      </div>
      <TabsContent />
    </TabsRoot>
  );
}
