import { Tabs } from '../tabs';

export function RequestPanelLeft() {
  return (
    <Tabs
      items={[
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
      defaultValue="headers"
      className="h-full"
    />
  );
}
