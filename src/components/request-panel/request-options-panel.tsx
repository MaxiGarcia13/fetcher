import { Tabs } from '../tabs';

export function RequestOptionsPanel() {
  return (
    <Tabs
      items={[
        {
          value: 'params',
          label: 'Params',
          content: (
            <p className="text-sm text-gray-500">
              Request params will go here.
            </p>
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
      defaultValue="headers"
      className="h-full"
    />
  );
}
