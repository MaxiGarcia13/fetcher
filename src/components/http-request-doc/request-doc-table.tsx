import type { DocFieldRow } from './type';
import { EmptyRequestOption } from './empty-request-option';

interface RequestDocTableProps {
  title: string;
  rows: DocFieldRow[];
}

export function RequestDocTable({ title, rows }: RequestDocTableProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-sm font-semibold tracking-wide text-app-text-muted uppercase">{title}</h2>

      {rows.length === 0
        ? (
            <EmptyRequestOption />
          )
        : (
            <div className="overflow-x-auto rounded border border-app-border">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-app-bg-surface text-xs tracking-wide text-app-text-muted uppercase">
                  <tr>
                    <th className="px-3 py-2 font-medium">Key</th>
                    <th className="px-3 py-2 font-medium">Type</th>
                    <th className="px-3 py-2 font-medium">Example</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.key} className="border-t border-app-border">
                      <td className="px-3 py-2 font-medium text-app-text-primary">{row.key}</td>
                      <td className="px-3 py-2 text-app-text-muted">{row.type}</td>
                      <td className="px-3 py-2 break-all text-app-text-primary">{row.example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
    </section>
  );
}
