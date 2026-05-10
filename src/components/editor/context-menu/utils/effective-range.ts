import type { editor, Selection } from 'monaco-editor';
import { Range } from 'monaco-editor';

export function getEffectiveSelectionRange(
  model: editor.ITextModel,
  selection: Selection,
) {
  if (!selection.isEmpty()) {
    return selection;
  }

  const lineNumber = selection.startLineNumber;
  const maxLineNumber = model.getLineCount();

  if (lineNumber < maxLineNumber) {
    return new Range(lineNumber, 1, lineNumber + 1, 1);
  }

  return new Range(lineNumber, 1, lineNumber, model.getLineMaxColumn(lineNumber));
}
