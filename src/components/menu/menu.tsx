import type { CSSProperties, ReactNode, RefObject } from 'react';
import { cn } from '@maxigarcia/js-utils';
import { useCallback, useRef, useState } from 'react';
import { useFloatingPosition } from '@/hooks/use-floating-position';
import { computeAtPointPosition, computeBottomEndPosition } from './menu-position';
import { useMenuDismiss } from './use-menu-dismiss';

export type MenuPlacement = 'bottom-end' | 'at-point';

interface MenuProps {
  id?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  menuRef?: RefObject<HTMLDivElement | null>;
  anchorRef?: RefObject<HTMLElement | null>;
  placement?: MenuPlacement;
  anchorPoint?: { x: number; y: number };
  onClose: () => void;
}

const placementComputePosition = {
  'bottom-end': computeBottomEndPosition,
  'at-point': computeAtPointPosition,
} as const;

export function Menu({
  id,
  className,
  style,
  children,
  menuRef,
  anchorRef,
  placement = 'bottom-end',
  anchorPoint,
  onClose,
}: MenuProps) {
  const internalRef = useRef<HTMLDivElement | null>(null);
  const [menuElement, setMenuElement] = useState<HTMLDivElement | null>(null);
  const usesFloatingPosition = placement !== undefined;
  const anchorElement = placement === 'bottom-end' ? anchorRef?.current ?? null : null;

  const setMenuRef = useCallback(
    (node: HTMLDivElement | null) => {
      internalRef.current = node;
      setMenuElement(node);
      if (menuRef) {
        menuRef.current = node;
      }
    },
    [menuRef],
  );

  const coords = useFloatingPosition({
    isOpen: usesFloatingPosition,
    anchorElement,
    anchorX: placement === 'at-point' ? anchorPoint?.x : undefined,
    anchorY: placement === 'at-point' ? anchorPoint?.y : undefined,
    floatingElement: menuElement,
    computePosition: placement ? placementComputePosition[placement] : computeAtPointPosition,
  });

  useMenuDismiss(onClose, menuRef ?? internalRef);

  return (
    <div
      id={id}
      ref={setMenuRef}
      role="menu"
      className={cn(
        'z-50 min-w-[160px] rounded-md border border-gray-700 bg-gray-800 py-2 shadow-xl',
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
