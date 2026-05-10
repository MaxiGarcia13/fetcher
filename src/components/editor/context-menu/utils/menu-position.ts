interface Point {
  x: number;
  y: number;
}

interface MenuSize {
  width: number;
  height: number;
}

export const DEFAULT_CONTEXT_MENU_SIZE: MenuSize = {
  width: 160,
  height: 120,
};

export function getContextMenuPosition(
  clientX: number,
  clientY: number,
  menuSize = DEFAULT_CONTEXT_MENU_SIZE,
): Point {
  return {
    x: Math.min(clientX, window.innerWidth - menuSize.width),
    y: Math.min(clientY, window.innerHeight - menuSize.height),
  };
}
