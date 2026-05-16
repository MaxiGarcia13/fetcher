import type { ClipboardEvent } from 'react';
import type { KeyValueEntry } from './types';
import { cn } from '@maxigarcia/js-utils';
import { AutocompleteInput } from '@/components/autocomplete-input';
import { Button } from '@/components/button';
import { BinIcon } from '@/components/icons/bin';
import { EyeIcon } from '@/components/icons/eye';
import { EyeOffIcon } from '@/components/icons/eye-off';
import { LockPasswordIcon } from '@/components/icons/lock-password';
import { Tooltip } from '@/components/tooltip';
import { HTTP_REQUEST_TEST_ID } from '@/constants/test-ids/http-request';

export interface KeyValueTableRowProps {
  entry: KeyValueEntry;
  index: number;
  keyFieldPlaceholder: string;
  valueFieldPlaceholder: string;
  suggestedKeys: ReadonlyArray<string>;
  suggestedValues?: ReadonlyArray<string>;
  showVisibilityToggle?: boolean;
  onKeyChange: (nextKey: string) => void;
  onValueChange: (nextValue: string) => void;
  onMaskToggle: () => void;
  onVisibilityToggle: () => void;
  onRemoveRow: () => void;
  onPasteObject?: (clipboardText: string) => boolean;
}

export function KeyValueTableRow({
  entry,
  index,
  keyFieldPlaceholder,
  valueFieldPlaceholder,
  suggestedKeys,
  suggestedValues,
  showVisibilityToggle = false,
  onKeyChange,
  onValueChange,
  onMaskToggle,
  onVisibilityToggle,
  onRemoveRow,
  onPasteObject,
}: KeyValueTableRowProps) {
  const rowNumber = index + 1;
  const { hidden: isHidden, masked: isMasked } = entry;

  function handlePasteObject(event: ClipboardEvent<HTMLInputElement>) {
    if (!onPasteObject)
      return;
    const text = event.clipboardData.getData('text/plain');
    if (onPasteObject(text))
      event.preventDefault();
  }

  const rowBorderClass = isHidden ? 'border-app-border-muted' : 'border-app-border';

  return (
    <div className={cn(
      'grid grid-cols-[1fr_1fr_auto] rounded border',
      rowBorderClass,
      isHidden && 'border-dashed opacity-80 italic text-gray-300',
    )}
    >
      <AutocompleteInput
        value={entry.key}
        onChange={onKeyChange}
        onPaste={handlePasteObject}
        placeholder={keyFieldPlaceholder}
        suggestions={suggestedKeys}
        aria-label={`Key row ${rowNumber}${isHidden ? ', excluded from request' : ''}`}
        className="rounded-r-none border-0"
        data-testid={`${HTTP_REQUEST_TEST_ID.REQUEST_OPTIONS_INPUT_KEY}-${rowNumber}`}
      />
      <AutocompleteInput
        value={entry.value}
        onChange={onValueChange}
        onPaste={handlePasteObject}
        type={isMasked ? 'password' : 'text'}
        placeholder={valueFieldPlaceholder}
        suggestions={suggestedValues}
        aria-label={`Value row ${rowNumber}${isHidden ? ', excluded from request' : ''}`}
        className={cn('rounded-l-none rounded-r-none border-0 border-l', rowBorderClass)}
        data-testid={`${HTTP_REQUEST_TEST_ID.REQUEST_OPTIONS_INPUT_VALUE}-${rowNumber}`}
      />
      <div className="flex">
        <Tooltip
          className="shrink-0"
          content={
            isMasked
              ? 'Show the value as plain text instead of masking it.'
              : 'Mask the value so it behaves like a password field (characters hidden while typing).'
          }
        >
          <Button
            type="button"
            onClick={onMaskToggle}
            className={cn(
              'shrink-0 rounded-none border-0 border-l',
              rowBorderClass,
              !isMasked ? 'text-app-text-muted!' : 'bg-app-bg-muted! text-app-text!',
            )}
            aria-label={`${isMasked ? 'Show value' : 'Mask value'} for row ${rowNumber}`}
            data-testid={`${HTTP_REQUEST_TEST_ID.REQUEST_OPTIONS_TABLE_ROW_MASK_BUTTON}-${rowNumber}`}
          >
            <LockPasswordIcon className="size-4" />
          </Button>
        </Tooltip>
        {showVisibilityToggle
          ? (
              <Tooltip
                className="shrink-0"
                content={
                  isHidden
                    ? 'Include this row again (it will be sent with the request).'
                    : 'Exclude this row from the request while keeping it in the list.'
                }
              >
                <Button
                  type="button"
                  onClick={onVisibilityToggle}
                  className={cn(
                    'shrink-0 rounded-none border-0 border-l',
                    rowBorderClass,
                    !isHidden ? 'text-app-text-muted!' : 'bg-app-bg-muted! text-app-text!',
                  )}
                  aria-label={`${isHidden ? 'Show' : 'Hide'} row ${rowNumber}`}
                  data-testid={`${HTTP_REQUEST_TEST_ID.REQUEST_OPTIONS_TABLE_ROW_VISIBILITY_BUTTON}-${rowNumber}`}
                >
                  {isHidden
                    ? <EyeOffIcon className="size-4" />
                    : <EyeIcon className="size-4" />}
                </Button>
              </Tooltip>
            )
          : null}
        <Tooltip className="shrink-0" content="Remove this row from the list.">
          <Button
            type="button"
            onClick={onRemoveRow}
            className={cn('shrink-0 rounded-l-none border-0 border-l', rowBorderClass)}
            aria-label={`Remove row ${rowNumber}`}
            data-testid={`${HTTP_REQUEST_TEST_ID.REQUEST_OPTIONS_TABLE_ROW_DELETE_BUTTON}-${rowNumber}`}
          >
            <BinIcon className="size-4 text-app-text-muted" />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}
