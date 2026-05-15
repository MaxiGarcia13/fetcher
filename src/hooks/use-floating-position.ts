import type { ViewportCoordinates } from '@/utils/clamp-to-viewport';
import { useEffect, useState } from 'react';
import { clampToViewport, toPointRect } from '@/utils/clamp-to-viewport';

export type ComputeFloatingPosition = (
  anchorRect: DOMRectReadOnly,
  floatingRect: DOMRectReadOnly,
) => ViewportCoordinates;

interface UseFloatingPositionOptions {
  isOpen: boolean;
  anchorElement?: HTMLElement | null;
  anchorX?: number;
  anchorY?: number;
  floatingElement: HTMLElement | null;
  computePosition: ComputeFloatingPosition;
}

function getAnchorRect(
  anchorElement: HTMLElement | null | undefined,
  anchorX: number | undefined,
  anchorY: number | undefined,
): DOMRectReadOnly | null {
  if (anchorElement) {
    return anchorElement.getBoundingClientRect();
  }

  if (anchorX !== undefined && anchorY !== undefined) {
    return toPointRect(anchorX, anchorY);
  }

  return null;
}

export function useFloatingPosition({
  isOpen,
  anchorElement,
  anchorX,
  anchorY,
  floatingElement,
  computePosition,
}: UseFloatingPositionOptions) {
  const [coords, setCoords] = useState<ViewportCoordinates | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const updatePosition = () => {
      const anchorRect = getAnchorRect(anchorElement, anchorX, anchorY);
      if (!anchorRect || !floatingElement) {
        return;
      }

      const floatingRect = floatingElement.getBoundingClientRect();
      const { top, left } = computePosition(anchorRect, floatingRect);
      setCoords(clampToViewport(floatingRect, top, left));
    };

    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);

    let resizeObserver: ResizeObserver | undefined;
    if (floatingElement) {
      resizeObserver = new ResizeObserver(() => {
        window.requestAnimationFrame(updatePosition);
      });
      resizeObserver.observe(floatingElement);
    }

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
      resizeObserver?.disconnect();
    };
  }, [isOpen, anchorElement, anchorX, anchorY, floatingElement, computePosition]);

  return coords;
}
