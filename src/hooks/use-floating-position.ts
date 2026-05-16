import type { RefObject } from 'react';
import type { Coords } from '@/utils/clamp-to-viewport';
import { useEffect, useRef, useState } from 'react';
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

  const windowResizeObserverRef: RefObject<ResizeObserver | undefined> = useRef(undefined);
  const floatingResizeObserverRef: RefObject<ResizeObserver | undefined> = useRef(undefined);

  useEffect(() => {
    if (!isOpen) {
      setCoords(null);
      windowResizeObserverRef.current?.disconnect();
      floatingResizeObserverRef.current?.disconnect();
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

    windowResizeObserverRef.current = new ResizeObserver(() => {
      window.requestAnimationFrame(updatePosition);
    });

    windowResizeObserverRef.current?.observe(window.document.body);

    if (floatingElement.current) {
      floatingResizeObserverRef.current = new ResizeObserver(() => {
        window.requestAnimationFrame(updatePosition);
      });

      floatingResizeObserverRef.current?.observe(floatingElement.current);
    }

    return () => {
      windowResizeObserverRef.current?.disconnect();
      floatingResizeObserverRef.current?.disconnect();
    };
  }, [isOpen]);

  return coords;
}
