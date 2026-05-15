import type { ReactNode } from 'react';
import { CheckIcon } from './icons/check';
import { LinkOffIcon } from './icons/link-off';

interface CopyToClipboardContentProps {
  children: ReactNode;
  success: boolean;
  error: string | undefined;
}

export function CopyToClipboardContent({ children, error, success }: CopyToClipboardContentProps) {
  if (success) {
    return <CheckIcon className="size-4" />;
  }

  if (error) {
    return <LinkOffIcon className="size-4" />;
  }

  return children;
}
