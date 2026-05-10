import type { TooltipCoordinates, TooltipPosition } from './types';
import { useEffect, useState } from 'react';

const TOOLTIP_GAP = 8;
const VIEWPORT_MARGIN = 8;

function clampToViewport(
  tooltipRect: DOMRectReadOnly,
  top: number,
  left: number,
): TooltipCoordinates {
  const pad = VIEWPORT_MARGIN;
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const maxLeft = vw - tooltipRect.width - pad;
  const clampedLeft = Math.min(Math.max(left, pad), Math.max(pad, maxLeft));

  const maxTop = vh - tooltipRect.height - pad;
  const clampedTop = Math.min(Math.max(top, pad), Math.max(pad, maxTop));

  return { top: clampedTop, left: clampedLeft };
}

interface UseTooltipPositionOptions {
  isOpen: boolean;
  position: TooltipPosition;
  triggerElement: HTMLDivElement | null;
  tooltipElement: HTMLSpanElement | null;
}

export function useTooltipPosition({
  isOpen,
  position,
  triggerElement,
  tooltipElement,
}: UseTooltipPositionOptions) {
  const [coords, setCoords] = useState<TooltipCoordinates | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const updatePosition = () => {
      if (!triggerElement || !tooltipElement) {
        return;
      }

      const triggerRect = triggerElement.getBoundingClientRect();
      const tooltipRect = tooltipElement.getBoundingClientRect();

      if (position === 'top') {
        const top = triggerRect.top - tooltipRect.height - TOOLTIP_GAP;
        const left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        setCoords(clampToViewport(tooltipRect, top, left));
        return;
      }

      if (position === 'bottom') {
        const top = triggerRect.bottom + TOOLTIP_GAP;
        const left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        setCoords(clampToViewport(tooltipRect, top, left));
        return;
      }

      if (position === 'left') {
        const top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        const left = triggerRect.left - tooltipRect.width - TOOLTIP_GAP;
        setCoords(clampToViewport(tooltipRect, top, left));
        return;
      }

      const top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
      const left = triggerRect.right + TOOLTIP_GAP;
      setCoords(clampToViewport(tooltipRect, top, left));
    };

    const animationFrameId = window.requestAnimationFrame(updatePosition);
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);

    let resizeObserver: ResizeObserver | undefined;
    if (tooltipElement) {
      resizeObserver = new ResizeObserver(() => {
        window.requestAnimationFrame(updatePosition);
      });
      resizeObserver.observe(tooltipElement);
    }

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
      resizeObserver?.disconnect();
    };
  }, [isOpen, position, triggerElement, tooltipElement]);

  return coords;
}
