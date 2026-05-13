import type { KeyValueEntry } from './types';
import { cn } from '@maxigarcia/js-utils';
import { AutocompleteInput } from '@/components/autocomplete-input';
import { Button } from '@/components/button';
import { BinIcon } from '@/components/icons/bin';
import { EyeIcon } from '@/components/icons/eye';
import { EyeOffIcon } from '@/components/icons/eye-off';
import { LockPasswordIcon } from '@/components/icons/lock-password';
import { Tooltip } from '@/components/tooltip';
import { HTTP_REQUEST_TEST_ID } from '@/constants/tests/http-request';

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
}: KeyValueTableRowProps) {
  const rowNumber = index + 1;
  const { hidden: isHidden, masked: isMasked } = entry;

  return (
    <div className="grid grid-cols-[1fr_1fr_auto]">
      <AutocompleteInput
        value={entry.key}
        onChange={onKeyChange}
        placeholder={keyFieldPlaceholder}
        suggestions={suggestedKeys}
        aria-label={`Key row ${rowNumber}`}
        className="rounded-r-none border-r-0"
        data-testid={`${HTTP_REQUEST_TEST_ID.REQUEST_OPTIONS_INPUT_KEY}-${rowNumber}`}
      />
      <AutocompleteInput
        value={entry.value}
        onChange={onValueChange}
        type={isMasked ? 'password' : 'text'}
        placeholder={valueFieldPlaceholder}
        suggestions={suggestedValues}
        aria-label={`Value row ${rowNumber}`}
        className="rounded-l-none rounded-r-none border-r-0"
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
            className="shrink-0 rounded-none border-r-0"
            aria-label={`${isMasked ? 'Show value' : 'Mask value'} for row ${rowNumber}`}
          >
            <LockPasswordIcon className={cn('size-4', !isMasked ? 'text-gray-400' : 'text-gray-200')} />
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
                  className="shrink-0 rounded-none border-r-0"
                  aria-label={`${isHidden ? 'Show' : 'Hide'} row ${rowNumber}`}
                >
                  {isHidden
                    ? <EyeOffIcon className="size-4 text-gray-200" />
                    : <EyeIcon className="size-4 text-gray-400" />}
                </Button>
              </Tooltip>
            )
          : null}
        <Tooltip className="shrink-0" content="Remove this row from the list.">
          <Button
            type="button"
            onClick={onRemoveRow}
            className="shrink-0 rounded-l-none"
            aria-label={`Remove row ${rowNumber}`}
          >
            <BinIcon className="size-4 text-gray-400" />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}
