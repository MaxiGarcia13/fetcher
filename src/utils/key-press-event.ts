import type { KeyboardEventHandler } from 'react';

export function handleKeyPressEvent(action: () => void): KeyboardEventHandler<HTMLElement> {
  return (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
      event.stopPropagation();
    }
  };
}
