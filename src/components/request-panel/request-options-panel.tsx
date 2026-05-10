import { cn } from '@maxigarcia/js-utils';
import { Tabs } from '../tabs';
import { RequestParams } from './request-params';

interface RequestOptionsPanelProps {
  defaultTab?: 'params' | 'headers' | 'body';
  className?: string;
}

export function RequestOptionsPanel({ defaultTab = 'params', className }: RequestOptionsPanelProps = {}) {
  return (
    <Tabs
      defaultValue={defaultTab}
      className={cn('h-full border-b-0', className)}
      items={[
        {
          value: 'params',
          label: 'Params',
          content: (
            <RequestParams />
          ),
        },
        {
          value: 'headers',
          label: 'Headers',
          content: (
            <p className="text-sm text-gray-500">
              Request headers will go here.
            </p>
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
      ]}
    />
  );
}
