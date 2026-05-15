import type { ComponentProps, ReactNode } from 'react';
import { MenuItem } from '@/components/menu';

interface ContextMenuItemProps extends ComponentProps<typeof MenuItem> {
  icon: ReactNode;
  command: ReactNode;
}

export function ContextMenuItem({ children, icon, command, ...props }: ContextMenuItemProps) {
  return (
    <MenuItem {...props}>
      <span className="shrink-0">
        {icon}
      </span>
      <span className="mt-1 flex-1">
        {children}
      </span>
      <span className="mt-1 shrink-0 text-app-text-muted">
        {command}
      </span>
    </MenuItem>
  );
}
