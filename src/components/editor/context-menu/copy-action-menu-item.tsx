import type { editor } from 'monaco-editor';
import { KeyCode, KeyMod } from 'monaco-editor';
import { useEffect } from 'react';
import { CommandIcon } from '@/components/icons/command';
import { CopyIcon } from '@/components/icons/copy';
import { ContextMenuItem } from './context-menu-item';
import { getEffectiveSelectionRange } from './utils/effective-range';

interface CopyActionMenuItemProps {
  editor: editor.IStandaloneCodeEditor;
  onActionClick: () => void;
}

export function CopyActionMenuItem({ editor, onActionClick }: CopyActionMenuItemProps) {
  const runCopyAction = async () => {
    onActionClick();
    const copyAction = editor?.getAction('customCopy');
    await copyAction?.run();
    editor.focus();
  };

  useEffect(() => {
    editor.addAction({
      id: 'customCopy',
      label: 'Copy',
      keybindings: [KeyMod.CtrlCmd | KeyCode.KeyC],
      run: async () => {
        const model = editor?.getModel();
        const selection = editor?.getSelection();

        if (!editor || !model || !selection) {
          return;
        }

        const effectiveRange = getEffectiveSelectionRange(model, selection);
        const textToCopy = model.getValueInRange(effectiveRange);
        await navigator.clipboard.writeText(textToCopy);
      },
    });
  }, [editor]);

  return (
    <ContextMenuItem
      onClick={runCopyAction}
      icon={<CopyIcon className="size-4" />}
      command={<CommandIcon className="size-4" combination="C" />}
    >
      Copy
    </ContextMenuItem>
  );
}
