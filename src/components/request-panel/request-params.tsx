import { cn } from '@maxigarcia/js-utils';
import { KeyValueTable } from '@/components/key-value-table';
import { useHttpRequestState } from '@/store/http-request';

interface Props {
  className?: string;
}

export function RequestParams({ className }: Props) {
  const { params, setParams } = useHttpRequestState();

  return (
    <KeyValueTable
      className={cn('px-3 py-4', className)}
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
