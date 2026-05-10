import type { editor } from 'monaco-editor';
import { KeyCode, KeyMod } from 'monaco-editor';
import { useEffect } from 'react';
import { CommandIcon } from '../../icons/command';
import { CutIcon } from '../../icons/cut';
import { ContextMenuItem } from './context-menu-item';
import { getEffectiveSelectionRange } from './utils/effective-range';

interface CutActionMenuItemProps {
  editor: editor.IStandaloneCodeEditor;
  onActionClick: () => void;
}

export function CutActionMenuItem({ editor, onActionClick }: CutActionMenuItemProps) {
  const runCutAction = async () => {
    onActionClick();
    const cutAction = editor?.getAction('customCut');
    await cutAction?.run();
    editor.focus();
  };

  useEffect(() => {
    editor.addAction({
      id: 'customCut',
      label: 'Cut',
      keybindings: [KeyMod.CtrlCmd | KeyCode.KeyX],
      run: async () => {
        const model = editor?.getModel();
        const selection = editor?.getSelection();

        if (!editor || !model || !selection) {
          return;
        }

        const effectiveRange = getEffectiveSelectionRange(model, selection);
        const textToCut = model.getValueInRange(effectiveRange);
        await navigator.clipboard.writeText(textToCut);

        editor.executeEdits('cut', [{
          range: effectiveRange,
          text: '',
        }]);
      },
    });
  }, [editor]);

  return (
    <ContextMenuItem
      onClick={runCutAction}
      icon={<CutIcon className="size-4" />}
      command={(
        <CommandIcon className="size-4" combination="X" />
      )}
    >
      Cut
    </ContextMenuItem>
  );
}
