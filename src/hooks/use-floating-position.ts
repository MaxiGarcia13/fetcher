import type { RefObject } from 'react';
import type { Coords } from '@/utils/clamp-to-viewport';
import { useEffect, useState } from 'react';
import { clampToViewport, coordsToRect } from '@/utils/clamp-to-viewport';

export type ComputeFloatingPosition = (
  anchorRect: DOMRectReadOnly,
  floatingRect: DOMRectReadOnly,
) => Coords;

interface UseFloatingPositionOptions {
  isOpen: boolean;
  anchorElement?: RefObject<HTMLElement | null>;
  anchorCoords?: Coords;
  floatingElement: RefObject<HTMLElement | null>;
  computePosition: ComputeFloatingPosition;
}

function getAnchorRect(
  anchorElement: HTMLElement | null | undefined,
  anchorCoords: Coords | undefined,
): DOMRectReadOnly | null {
  if (anchorElement) {
    return anchorElement.getBoundingClientRect();
  }

  if (anchorCoords) {
    return coordsToRect(anchorCoords);
  }

  return null;
}

export function useFloatingPosition({
  isOpen,
  anchorElement,
  anchorCoords,
  floatingElement,
  computePosition,
}: UseFloatingPositionOptions) {
  const [coords, setCoords] = useState<Coords | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const updatePosition = () => {
      const anchorRect = getAnchorRect(anchorElement?.current, anchorCoords);
      const floatingNode = floatingElement.current;
      if (!anchorRect || !floatingNode) {
        return;
      }

      const floatingRect = floatingNode.getBoundingClientRect();
      const { top, left } = computePosition(anchorRect, floatingRect);
      setCoords(clampToViewport(floatingRect, top, left));
    };

    let floatingResizeObserver: ResizeObserver | undefined;

    const windowResizeObserver = new ResizeObserver(() => {
      window.requestAnimationFrame(updatePosition);
    });

    windowResizeObserver.observe(window.document.body);

    if (floatingElement.current) {
      floatingResizeObserver = new ResizeObserver(() => {
        window.requestAnimationFrame(updatePosition);
      });

      floatingResizeObserver.observe(floatingElement.current);
    }

    return () => {
      windowResizeObserver.disconnect();
      floatingResizeObserver?.disconnect();
    };
  }, [isOpen, anchorElement, anchorCoords?.top, anchorCoords?.left, floatingElement.current, computePosition]);

  return coords;
}
