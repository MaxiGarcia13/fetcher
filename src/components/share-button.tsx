import type { ComponentProps, ReactNode } from 'react';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { Button } from './button';
import { CopyToClipboardContent } from './copy-to-clipboard-content';
import { LinkIcon } from './icons/link';
import { Tooltip } from './tooltip';

interface ShareButtonData {
  tooltip: string;
  variant: ComponentProps<typeof Button>['variant'];
}

export interface ShareButtonProps extends ComponentProps<typeof Button> {
  className?: string;
  children?: ReactNode;
}

export function ShareButton({ className, children, size }: ShareButtonProps) {
  const { isCopied, error, copyToClipboard } = useCopyToClipboard();

  const data: ShareButtonData = !isCopied
    ? {
        tooltip: 'Share link',
        variant: 'default',
      }
    : {
        tooltip: 'Link copied',
        variant: 'success',
      };

  const handleShare = () => {
    const url = window.location.href;
    copyToClipboard(url);
  };

  return (
    <Tooltip content={data.tooltip} placement="bottom" className={className}>
      <Button
        onClick={handleShare}
        variant={data.variant}
        className={className}
        size={size}
      >
        <CopyToClipboardContent
          success={isCopied}
          error={error}
        >
          <LinkIcon className="size-4" />
          {' '}
          {children}
        </CopyToClipboardContent>
      </Button>
    </Tooltip>
  );
}
