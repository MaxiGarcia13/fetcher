interface Point {
  x: number;
  y: number;
}

export const LONG_PRESS_DURATION_MS = 500;
export const TOUCH_MOVE_THRESHOLD_PX = 10;

export function hasTouchMovedBeyondThreshold(
  startPosition: Point,
  currentPosition: Point,
  threshold = TOUCH_MOVE_THRESHOLD_PX,
) {
  const dx = currentPosition.x - startPosition.x;
  const dy = currentPosition.y - startPosition.y;

  return Math.hypot(dx, dy) > threshold;
}
