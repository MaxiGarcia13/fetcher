import type { ComponentProps, ReactNode } from 'react';
import type { Button } from './button';
import type { KeyValueEntry } from './key-value-table';
import { encodeText } from '@maxigarcia/js-utils';
import { filterNotVisibleAndEmptyKey, HTTP_REQUEST_BODY_PARAM, HTTP_REQUEST_HEADERS_PARAM, HTTP_REQUEST_METHOD_PARAM, HTTP_REQUEST_PARAMS_PARAM, HTTP_REQUEST_URL_PARAM } from '@/domain/http-request';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { useHttpRequestState } from '@/store/http-request';
import { DropdownButton } from './button';
import { CopyToClipboardContent } from './copy-to-clipboard-content';
import { LinkIcon } from './icons/link';
import { LinkPlusIcon } from './icons/link-plus';
import { Tooltip } from './tooltip';

export interface ShareButtonProps extends ComponentProps<typeof Button> {
  className?: string;
  children?: ReactNode;
}

export function ShareButton({ className, children, size }: ShareButtonProps) {
  const { isCopied, error, copyToClipboard } = useCopyToClipboard();
  const requestState = useHttpRequestState();

  const handleShareFullLink = () => {
    const url = window.location.href;
    copyToClipboard(url);
  };

  const handleShareWithoutMaskParams = () => {
    const newUrlnew = new URL(window.location.origin + window.location.pathname);

    const newParams = new URLSearchParams();
    newParams.set(HTTP_REQUEST_METHOD_PARAM, encodeText(requestState.method));
    newParams.set(HTTP_REQUEST_URL_PARAM, encodeText(requestState.url));
    newParams.set(HTTP_REQUEST_BODY_PARAM, encodeText(requestState.body));

    const maskValue = (param: KeyValueEntry) => {
      if (param.masked) {
        return {
          ...param,
          value: '********',
          masked: false,
        };
      }

      return param;
    };

    const filteredParams = requestState.params.filter(filterNotVisibleAndEmptyKey).map(maskValue);
    newParams.set(HTTP_REQUEST_PARAMS_PARAM, encodeText(JSON.stringify(filteredParams)));

    const filteredHeaders = requestState.headers.filter(filterNotVisibleAndEmptyKey).map(maskValue);
    newParams.set(HTTP_REQUEST_HEADERS_PARAM, encodeText(JSON.stringify(filteredHeaders)));

    newUrlnew.search = newParams.toString();

    copyToClipboard(newUrlnew.toString());
  };

  return (
    <DropdownButton
      variant={isCopied ? 'success' : 'default'}
      className={className}
      size={size}
      menuItems={[
        {
          label: (
            <>
              <LinkIcon className="size-4" />
              Share link
            </>
          ),
          children: (
            <Tooltip content="Copy a shareable link. Hidden entries are omitted and masked values are redacted.">
              <CopyToClipboardContent
                success={isCopied}
                error={error}
              >
                <LinkIcon className="size-4" />
                {' '}
                {children}
              </CopyToClipboardContent>
            </Tooltip>
          ),
          onClick: handleShareWithoutMaskParams,
        },
        {
          label: (
            <>

              <LinkPlusIcon className="size-4" />
              Share full link
            </>
          ),
          onClick: handleShareFullLink,
          children: (
            <Tooltip content="Copy the current URL as shown in the address bar.">
              <CopyToClipboardContent
                success={isCopied}
                error={error}
              >
                <LinkPlusIcon className="size-4" />
                {' '}
                {children}
              </CopyToClipboardContent>
            </Tooltip>
          ),
        },

      ]}
    />
  );
}
