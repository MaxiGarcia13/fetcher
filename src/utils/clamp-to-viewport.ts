export const VIEWPORT_MARGIN = 8;

export interface ViewportCoordinates {
  top: number;
  left: number;
}

export function clampToViewport(
  elementRect: DOMRectReadOnly,
  top: number,
  left: number,
  margin = VIEWPORT_MARGIN,
): ViewportCoordinates {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const maxLeft = vw - elementRect.width - margin;
  const clampedLeft = Math.min(Math.max(left, margin), Math.max(margin, maxLeft));

  const maxTop = vh - elementRect.height - margin;
  const clampedTop = Math.min(Math.max(top, margin), Math.max(margin, maxTop));

  return { top: clampedTop, left: clampedLeft };
}

export function toPointRect(x: number, y: number): DOMRectReadOnly {
  return new DOMRect(x, y, 0, 0);
}
