import { useState } from 'react';

export function useCopyToClipboard(delay = 800) {
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const copyToClipboard = (callback: string | (() => string)) => {
    try {
      const text = typeof callback === 'function' ? callback() : callback;
      navigator.clipboard.writeText(text);
      setIsCopied(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred while copying to clipboard');
    } finally {
      setTimeout(() => {
        setIsCopied(false);
        setError(undefined);
      }, delay);
    }
  };

  return {
    isCopied,
    error,
    copyToClipboard,
  };
}
