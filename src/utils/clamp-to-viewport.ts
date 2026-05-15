export const VIEWPORT_MARGIN = 8;

export interface Coords {
  top: number;
  left: number;
}

export function clampToViewport(
  elementRect: DOMRectReadOnly,
  top: number,
  left: number,
  margin = VIEWPORT_MARGIN,
): Coords {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const maxLeft = vw - elementRect.width - margin;
  const clampedLeft = Math.min(Math.max(left, margin), Math.max(margin, maxLeft));

  const maxTop = vh - elementRect.height - margin;
  const clampedTop = Math.min(Math.max(top, margin), Math.max(margin, maxTop));

  return { top: clampedTop, left: clampedLeft };
}

export function coordsToRect(coords: Coords): DOMRectReadOnly {
  return new DOMRect(coords.left, coords.top, 0, 0);
}
