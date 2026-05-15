import { useState } from 'react';
import { HTTP_REQUEST_TEST_ID } from '@/constants/test-ids';
import { submitHttpRequest } from '@/domain/http-request';
import { useHttpRequestState } from '@/store/http-request';
import { saveHttpResponse, saveHttpResponseError, setHttpResponseLoading, useHttpResponseState } from '@/store/http-response';
import { storage } from '@/utils/storage';
import { DropdownButton } from '../button';
import { BrowserIcon } from '../icons/browser';
import { SendIcon } from '../icons/send';
import { ServerIcon } from '../icons/server';
import { Tooltip } from '../tooltip';

const STORAGE_KEY = `fetcher.submit-button-selected-submit-type`;

const SUBMIT_OPTIONS = {
  server: {
    menuLabel: 'Send via server',
    tooltip: 'Proxy the request on the server to avoid browser CORS limits',
  },
  client: {
    menuLabel: 'Send from browser',
    tooltip: 'Send the request directly from your browser (subject to CORS)',
  },
} as const;

export function SubmitButton() {
  const { url, urlError } = useHttpRequestState();
  const { isLoading } = useHttpResponseState();

  const [selectedSubmitType, setSelectedSubmitType] = useState<'server' | 'client'>(() => {
    const storedSubmitType = storage.read(STORAGE_KEY);
    return (storedSubmitType as 'server' | 'client') ?? 'server';
  });

  const handleSend = (submitType: 'server' | 'client') => {
    setHttpResponseLoading(true);
    setSelectedSubmitType(submitType);
    storage.write(STORAGE_KEY, submitType);

    submitHttpRequest(submitType)
      .then((response) => saveHttpResponse(response))
      .catch((error) => saveHttpResponseError(error))
      .finally(() => setHttpResponseLoading(false));
  };

  return (
    <DropdownButton
      variant={selectedSubmitType === 'server' ? 'primary' : 'secondary'}
      className="min-w-0 shrink-0 sm:min-w-32"
      disabled={!url || urlError !== undefined || isLoading}
      data-testid={HTTP_REQUEST_TEST_ID.SEND_BUTTON}
      menuItems={
        [
          {
            label: (
              <>
                <ServerIcon className="size-4" />
                <span className="mt-0.5">{SUBMIT_OPTIONS.server.menuLabel}</span>
              </>
            ),
            onClick: () => {
              handleSend('server');
            },
            children: (
              <Tooltip content={SUBMIT_OPTIONS.server.tooltip} className="flex items-center gap-2">
                <span className="mt-0.5 hidden sm:block">Send</span>
                <SendIcon className="size-4" />
              </Tooltip>
            ),
          },
          {
            label: (
              <>
                <BrowserIcon className="size-4" />
                <span className="mt-0.5">{SUBMIT_OPTIONS.client.menuLabel}</span>
              </>
            ),
            onClick: () => {
              handleSend('client');
            },
            children: (
              <Tooltip content={SUBMIT_OPTIONS.client.tooltip} className="flex items-center gap-2">
                <span className="mt-0.5 hidden sm:block">Send</span>
                <SendIcon className="size-4" />
              </Tooltip>
            ),
          },
        ]
      }
    />
  );
}
