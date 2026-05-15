import type { CSSProperties, HTMLAttributes, ReactNode, RefObject } from 'react';
import type { Coords } from '@/utils/clamp-to-viewport';
import { cn } from '@maxigarcia/js-utils';
import { useRef } from 'react';
import { useFloatingPosition } from '@/hooks/use-floating-position';
import { computeAtPointPosition, computeBottomEndPosition } from './menu-position';
import { useMenuDismiss } from './use-menu-dismiss';

export type MenuPlacement = 'bottom-end' | 'at-point';

interface MenuProps extends HTMLAttributes<HTMLDivElement> {
  ref?: RefObject<HTMLDivElement | null>;
  id?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  menuRef?: RefObject<HTMLDivElement | null>;
  anchorRef?: RefObject<HTMLElement | null>;
  placement?: MenuPlacement;
  coords?: Coords;
  onClose: () => void;
}

const placementComputePosition = {
  'bottom-end': computeBottomEndPosition,
  'at-point': computeAtPointPosition,
} as const;

export function Menu({
  ref,
  id,
  className,
  style,
  children,
  menuRef,
  anchorRef,
  placement = 'bottom-end',
  coords: anchorCoords,
  onClose,
}: MenuProps) {
  const internalRef = useRef<HTMLDivElement | null>(null);

  const usesFloatingPosition = placement !== undefined;

  const coords = useFloatingPosition({
    isOpen: usesFloatingPosition,
    anchorElement: anchorRef,
    anchorCoords: placement === 'at-point' ? anchorCoords : undefined,
    floatingElement: ref ?? internalRef,
    computePosition: placement ? placementComputePosition[placement] : computeAtPointPosition,
  });

  useMenuDismiss(onClose, menuRef ?? internalRef);

  return (
    <div
      id={id}
      ref={ref ?? internalRef}
      role="menu"
      className={cn(
        'z-50 min-w-[160px] rounded-md border border-app-border bg-app-bg-surface py-2 shadow-xl',
        usesFloatingPosition && 'fixed',
        !coords && usesFloatingPosition && 'invisible',
        className,
      )}
      style={
        usesFloatingPosition
          ? { top: coords?.top ?? 0, left: coords?.left ?? 0, ...style }
          : style
      }
    >
      {children}
    </div>
  );
}
