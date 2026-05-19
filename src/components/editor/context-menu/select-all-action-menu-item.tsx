import type { editor } from 'monaco-editor';
import { KeyCode, KeyMod } from 'monaco-editor';
import { useEffect } from 'react';
import { CommandIcon } from '@/components/icons/command';
import { SelectAllIcon } from '@/components/icons/select-all';
import { ContextMenuItem } from './context-menu-item';

interface SelectAllActionMenuItemProps {
  editor: editor.IStandaloneCodeEditor;
  onActionClick: () => void;
}

export function SelectAllActionMenuItem({ editor, onActionClick }: SelectAllActionMenuItemProps) {
  const runSelectAllAction = () => {
    onActionClick();
    const selectAllAction = editor?.getAction('customSelectAll');
    selectAllAction?.run();
    editor.focus();
  };

  useEffect(() => {
    editor.addAction({
      id: 'customSelectAll',
      label: 'Select All',
      keybindings: [KeyMod.CtrlCmd | KeyCode.KeyA],
      run: () => {
        const model = editor?.getModel();

        if (!editor || !model) {
          return;
        }

        editor.setSelection(model.getFullModelRange());
      },
    });
  }, [editor]);

  return (
    <ContextMenuItem
      onClick={runSelectAllAction}
      icon={<SelectAllIcon className="size-4" />}
      command={<CommandIcon className="size-4" combination="A" />}
    >
      Select All
    </ContextMenuItem>
  );
}
