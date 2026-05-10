import { cn } from '@maxigarcia/js-utils';
import { useRef, useState } from 'react';

interface ResizablePanelProps {
  className?: string;
  firstContent: React.ReactNode;
  secondContent: React.ReactNode;
  offset?: number;
  direction?: 'horizontal' | 'vertical';
}

export function ResizablePanel({
  className,
  firstContent,
  secondContent,
  direction = 'horizontal',
  offset = 100,
}: ResizablePanelProps) {
  const panelRef = useRef<HTMLElement>(null);
  const [leftWidth, setLeftWidth] = useState<number>();
  const [leftHeight, setLeftHeight] = useState<number>();

  const { mainClassName, containerClassName, cursorClassName, dividerClassName } = getClassNames({ className, direction });

  function onResize(event: MouseEvent) {
    const panel = panelRef.current;

    if (!panel)
      return;

    const panelBounds = panel.getBoundingClientRect();

    if (direction === 'horizontal') {
      const width = event.clientX - panelBounds.left;
      const isMaxWidth = width > (panelBounds.width - offset);
      const isMinWidth = width < offset;

      if (isMaxWidth || isMinWidth)
        return;

      setLeftWidth(width);
    } else {
      const height = event.clientY - panelBounds.top;
      const isMaxHeight = height > (panelBounds.height - offset);
      const isMinHeight = height < offset;

      if (isMaxHeight || isMinHeight)
        return;

      setLeftHeight(height);
    }
  }

  function onResizeEnd() {
    document.body.classList.remove(cursorClassName);

    document.removeEventListener('mousemove', onResize);
    document.removeEventListener('mouseup', onResizeEnd);
  }

  function handleMouseDown(event: React.MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    document.body.classList.add(cursorClassName);

    document.addEventListener('mousemove', onResize);
    document.addEventListener('mouseup', onResizeEnd);

    event.stopPropagation();
  }

  const firstPaneStyle
    = direction === 'horizontal'
      ? leftWidth !== undefined
        ? { width: leftWidth, flex: 'none' as const }
        : undefined
      : leftHeight !== undefined
        ? { height: leftHeight, flex: 'none' as const }
        : undefined;

  return (
    <section ref={panelRef} className={mainClassName}>
      <div className={containerClassName} style={firstPaneStyle}>
        {firstContent}
      </div>
      <div
        className={cn(dividerClassName, 'shrink-0 bg-gray-700', cursorClassName)}
        onMouseDown={handleMouseDown}
      >
      </div>
      <div className={containerClassName}>
        {secondContent}
      </div>
    </section>
  );
}

function getClassNames({ className, direction }: Partial<ResizablePanelProps>) {
  const pane = 'flex min-h-0 min-w-0 flex-1 basis-0 flex-col overflow-hidden';

  if (direction === 'horizontal') {
    return {
      mainClassName: cn(className, 'flex min-h-0 min-w-0 flex-1 flex-row overflow-hidden'),
      containerClassName: pane,
      cursorClassName: 'cursor-col-resize',
      dividerClassName: 'w-1',
    };
  }

  return {
    mainClassName: cn(className, 'flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden'),
    containerClassName: pane,
    cursorClassName: 'cursor-row-resize',
    dividerClassName: 'h-1',
  };
}
