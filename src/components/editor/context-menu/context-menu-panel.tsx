import type { editor } from 'monaco-editor';
import type { RefObject } from 'react';
import { Menu } from '@/components/menu';
import { CopyActionMenuItem } from './copy-action-menu-item';
import { CutActionMenuItem } from './cut-action-menu-item';
import { PasteActionMenuItem } from './paste-action-menu-item';

interface ContextMenuPanelProps {
  x: number;
  y: number;
  editor: editor.IStandaloneCodeEditor;
  onActionClick: () => void;
  menuRef?: RefObject<HTMLDivElement | null>;
}

export function ContextMenuPanel({ x, y, editor, onActionClick, menuRef }: ContextMenuPanelProps) {
  return (
    <Menu
      menuRef={menuRef}
      placement="at-point"
      anchorPoint={{ x, y }}
      onClose={onActionClick}
    >
      <PasteActionMenuItem editor={editor} onActionClick={onActionClick} />
      <CopyActionMenuItem editor={editor} onActionClick={onActionClick} />
      <CutActionMenuItem editor={editor} onActionClick={onActionClick} />
    </Menu>
  );
}
