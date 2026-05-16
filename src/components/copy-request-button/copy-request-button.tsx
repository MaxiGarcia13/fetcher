import type { ComponentProps } from 'react';
import { isValidHttpUrl } from '@maxigarcia/js-utils';
import { DropdownButton } from '@/components/button';
import { JsIcon } from '@/components/icons/js';
import { Tooltip } from '@/components/tooltip';
import { METHODS_WITH_BODY } from '@/constants/methods';
import { parseObjectFromKeyValueEntries } from '@/domain/http-request';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { useHttpRequestState } from '@/store/http-request';
import { CopyToClipboardContent } from '../copy-to-clipboard-content';
import { TerminalIcon } from '../icons/terminal';
import { getCopyToCurlText, getCopyToFetchText } from './utils';

interface CopyRequestButtonProps extends Omit<ComponentProps<typeof DropdownButton>, 'children' | 'menuItems' | 'onClick'> {
  className?: string;
}

export function CopyRequestButton({ className, ...props }: CopyRequestButtonProps) {
  const { url, method, headers, body, params } = useHttpRequestState();
  const { isCopied, error, copyToClipboard } = useCopyToClipboard();

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
    copyToClipboard(() => {
      const { url, options } = getOptions();
      return callback(url, options);
    });
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
      disabled={!isValidHttpUrl(url)}
      aria-label="Copy request"
      toggleMenuAriaLabel="Choose copy format"
      menuItems={[
        {
          label: (
            <>
              <JsIcon className="size-5 shrink-0" />
              Copy as JS
            </>
          ),
          children: (
            <CopyToClipboardContent
              success={isCopied}
              error={error}
            >
              <Tooltip
                content="Copy this request as JavaScript Fetch to the clipboard."
              >
                <JsIcon className="size-4" />
              </Tooltip>
            </CopyToClipboardContent>

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
            <CopyToClipboardContent
              success={isCopied}
              error={error}
            >
              <Tooltip
                content="Copy this request as cURL to the clipboard."
              >
                <TerminalIcon className="size-4" />
              </Tooltip>
            </CopyToClipboardContent>
          ),
          onClick: handleCopyAsCurl,
        },
      ]}
      {...props}
    />
  );
}
