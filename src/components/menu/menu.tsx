import type { CSSProperties, ReactNode, RefObject } from 'react';
import { cn } from '@maxigarcia/js-utils';
import { useMenuDismiss } from './use-menu-dismiss';

interface MenuProps {
  id?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  menuRef?: RefObject<HTMLDivElement | null>;
  onClose: () => void;
}

export function Menu({ id, className, style, children, menuRef, onClose }: MenuProps) {
  useMenuDismiss(onClose, menuRef);

  return (
    <div
      id={id}
      ref={menuRef}
      role="menu"
      className={cn('z-50 min-w-[160px] rounded-md border border-gray-700 bg-gray-800 py-2 shadow-xl', className)}
      style={style}
    >
      {children}
    </div>
  );
}
