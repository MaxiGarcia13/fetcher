import type { ComputeFloatingPosition } from '@/hooks/use-floating-position';

export const MENU_GAP = 4;

export const computeBottomEndPosition: ComputeFloatingPosition = (anchorRect, floatingRect) => ({
  top: anchorRect.bottom + MENU_GAP,
  left: anchorRect.right - floatingRect.width,
});

export const computeAtPointPosition: ComputeFloatingPosition = (anchorRect) => ({
  top: anchorRect.top,
  left: anchorRect.left,
});
