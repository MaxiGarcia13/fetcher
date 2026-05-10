import { cn } from '@maxigarcia/js-utils';
import { KeyValueTable } from '@/components/key-value-table';
import { useRequestState } from '@/store/request';

interface Props {
  className?: string;
}

export function RequestParams({ className }: Props) {
  const { params, setParams } = useRequestState();

  return (
    <KeyValueTable
      className={cn('p-4', className)}
      value={params}
      onChange={setParams}
      keyFieldPlaceholder="Parameter name"
      valueFieldPlaceholder="Parameter value"
      emptyMessage="No query parameters yet."
      spreadsheetTrailingBlankRow
      showAddButton={false}
      showVisibilityToggle
    />
  );
}
