import type { SubmitType } from './submit-type';
import { isValidHttpUrl } from '@maxigarcia/js-utils';
import { useState } from 'react';
import { HTTP_REQUEST_TEST_ID } from '@/constants/test-ids';
import { submitHttpRequest, submitHttpStream } from '@/domain/http-request';
import { useHttpRequestState } from '@/store/http-request';
import {
  abortHttpStreamResponse,
  appendHttpStreamEvent,
  beginHttpStream,
  endHttpStream,
  saveHttpResponse,
  saveHttpResponseError,
  saveHttpStreamError,
  setHttpResponseLoading,
  useHttpResponseState,
} from '@/store/http-response';
import { Button, DropdownButton } from '../button';
import { BrowserIcon } from '../icons/browser';
import { SendIcon } from '../icons/send';
import { ServerIcon } from '../icons/server';
import { StopIcon } from '../icons/stop';
import { Tooltip } from '../tooltip';
import { $responseSendMode, $streamFormat } from './response-mode';
import { getStoredSubmitType, setStoredSubmitType } from './submit-type';

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
  const { url } = useHttpRequestState();
  const { isLoading, isStreaming } = useHttpResponseState();

  const [selectedSubmitType, setSelectedSubmitType] = useState<SubmitType>(getStoredSubmitType);

  const handleSend = async (submitType: SubmitType) => {
    setSelectedSubmitType(submitType);
    setStoredSubmitType(submitType);

    const mode = $responseSendMode.get();
    const streamFormat = $streamFormat.get();

    if (mode === 'stream') {
      beginHttpStream(streamFormat);

      try {
        for await (const event of submitHttpStream(submitType, streamFormat)) {
          appendHttpStreamEvent(event);
        }
        endHttpStream();
      } catch (error) {
        saveHttpStreamError(error);
      }

      return;
    }

    setHttpResponseLoading(true);

    try {
      const response = await submitHttpRequest(submitType);
      await saveHttpResponse(response);
    } catch (error) {
      saveHttpResponseError(error);
    } finally {
      setHttpResponseLoading(false);
    }
  };

  if (isStreaming) {
    return (
      <Button
        type="button"
        variant="default"
        className="min-w-0 shrink-0 sm:min-w-32"
        aria-label="Stop streaming request"
        data-testid={HTTP_REQUEST_TEST_ID.STOP_STREAM_BUTTON}
        onClick={() => {
          abortHttpStreamResponse();
        }}
      >
        <span className="mt-0.5 hidden sm:block">Stop</span>
        <StopIcon className="size-4" />
      </Button>
    );
  }

  const sendAriaLabel
    = selectedSubmitType === 'server'
      ? 'Send request via server (proxy avoids CORS limits)'
      : 'Send request from browser (subject to CORS)';

  return (
    <DropdownButton
      variant={selectedSubmitType === 'server' ? 'primary' : 'secondary'}
      className="min-w-0 shrink-0 sm:min-w-32"
      disabled={!isValidHttpUrl(url) || isLoading}
      aria-label={sendAriaLabel}
      toggleMenuAriaLabel="Choose how to send the request"
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
              void handleSend('server');
            },
            children: (
              <Tooltip content={SUBMIT_OPTIONS.server.tooltip} placement="bottom" className="flex items-center gap-2">
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
              void handleSend('client');
            },
            children: (
              <Tooltip content={SUBMIT_OPTIONS.client.tooltip} placement="bottom" className="flex items-center gap-2">
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
