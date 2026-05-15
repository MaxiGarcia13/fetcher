import type { ComponentProps } from 'react';
import { useState } from 'react';
import { DropdownButton } from '@/components/button';
import { CheckIcon } from '@/components/icons/check';
import { JsIcon } from '@/components/icons/js';
import { Tooltip } from '@/components/tooltip';
import { METHODS_WITH_BODY, parseObjectFromKeyValueEntries } from '@/domain/http-request';
import { useHttpRequestState } from '@/store/http-request';
import { TerminalIcon } from '../icons/terminal';
import { getCopyToCurlText, getCopyToFetchText } from './utils';

interface CopyRequestButtonProps extends Omit<ComponentProps<typeof DropdownButton>, 'children' | 'menuItems' | 'onClick'> {
  className?: string;
}

export function CopyRequestButton({ className, ...props }: CopyRequestButtonProps) {
  const { url, method, headers, body, params } = useHttpRequestState();

  const [isCopied, setIsCopied] = useState(false);

  const getOptions = () => {
    const paramsObject = parseObjectFromKeyValueEntries(params);
    const decodedParams = new URLSearchParams(paramsObject);
    const decodedUrl = new URL(url);

    const options: Parameters<typeof fetch>[1] = {
      method,
      headers: parseObjectFromKeyValueEntries(headers),
      ...(METHODS_WITH_BODY.includes(method)
        && typeof body === 'string' && body.length > 0
        ? { body }
        : undefined
      ),
    };

    if (decodedParams.size > 0) {
      decodedUrl.search = decodedParams.toString();
    }

    return {
      url: decodedUrl.toString(),
      options,
    };
  };

  const handleCopy = (callback: (url: string, options: Parameters<typeof fetch>[1]) => string) => {
    try {
      const { url, options } = getOptions();
      navigator.clipboard.writeText(
        callback(url, options),
      );

      setIsCopied(true);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    }
  };

  const handleCopyAsJavaScriptFetch = () => {
    handleCopy(getCopyToFetchText);
  };

  const handleCopyAsCurl = () => {
    handleCopy(getCopyToCurlText);
  };

  return (
    <DropdownButton
      variant={isCopied ? 'success' : 'default'}
      className={className}
      disabled={!url}
      menuItems={[
        {
          label: (
            <>
              <JsIcon className="size-5 shrink-0" />
              Copy as JS
            </>
          ),
          children: (
            <Tooltip
              content={isCopied ? 'Copied' : 'Copy this request as JavaScript Fetch to the clipboard.'}
            >
              { isCopied ? <CheckIcon className="size-4 " /> : <JsIcon className="size-4" />}
            </Tooltip>
          ),
          onClick: handleCopyAsJavaScriptFetch,
        },
        {
          label: (
            <>
              <TerminalIcon className="size-5" />
              Copy as cURL
            </>
          ),
          children: (
            <Tooltip
              content={isCopied ? 'Copied' : 'Copy this request as cURL to the clipboard.'}
            >
              { isCopied ? <CheckIcon className="size-4" /> : <TerminalIcon className="size-4" />}
            </Tooltip>
          ),
          onClick: handleCopyAsCurl,
        },
      ]}
      {...props}
    />
  );
}
