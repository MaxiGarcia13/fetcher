import type { ComponentProps, ReactNode } from 'react';
import { useState } from 'react';
import { Button } from './button';
import { CheckIcon } from './icons/check';
import { LinkIcon } from './icons/link';
import { Tooltip } from './tooltip';

interface ShareButtonData {
  tooltip: string;
  variant: ComponentProps<typeof Button>['variant'];
  icon: ReactNode;
}

export interface ShareButtonProps extends ComponentProps<typeof Button> {
  className?: string;
  children?: ReactNode;
}

export function ShareButton({ className, children, size }: ShareButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  let data: ShareButtonData = {
    tooltip: 'Share link',
    variant: 'default',
    icon: (
      <>
        <LinkIcon className="size-4" />
        {' '}
        {children}
      </>
    ),
  };

  if (isCopied) {
    data = {
      tooltip: 'Link copied',
      variant: 'success',
      icon: <CheckIcon className="size-5" />,
    };
  }

  const handleShare = () => {
    try {
      const url = window.location.href;
      navigator.clipboard.writeText(url);
      setIsCopied(true);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    }
  };

  return (
    <Tooltip content={data.tooltip} placement="bottom" className={className}>
      <Button
        onClick={handleShare}
        variant={data.variant}
        className={className}
        size={size}
      >
        {data.icon}
      </Button>
    </Tooltip>
  );
}
