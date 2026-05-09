import { cn } from '@maxigarcia/js-utils';
import { useRef, useState } from 'react';

interface ResizablePanelProps {
  className?: string;
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  offset?: number;
  direction?: 'horizontal' | 'vertical';
}

export function ResizablePanel({
  className,
  leftContent,
  rightContent,
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

  return (
    <section ref={panelRef} className={mainClassName}>
      <div
        className={containerClassName}
        style={{ width: leftWidth, height: leftHeight }}
      >
        {leftContent}
      </div>
      <div
        className={cn(dividerClassName, 'bg-gray-700', cursorClassName)}
        onMouseDown={handleMouseDown}
      >
      </div>
      <div
        className={containerClassName}
        style={{ width: `calc(100% - ${leftWidth}px)`, height: `calc(100% - ${leftHeight}px)` }}
      >
        {rightContent}
      </div>
    </section>
  );
}

function getClassNames({ className, direction }: Partial<ResizablePanelProps>) {
  if (direction === 'horizontal') {
    return {
      mainClassName: cn(className, 'flex flex-row'),
      containerClassName: 'w-1/2',
      cursorClassName: 'cursor-col-resize',
      dividerClassName: 'w-1',
    };
  }

  return {
    mainClassName: cn(className, 'flex flex-col'),
    containerClassName: 'h-1/2',
    cursorClassName: 'cursor-row-resize',
    dividerClassName: 'h-1',
  };
}
