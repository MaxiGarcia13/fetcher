import type { DocFieldRow } from '@/utils/request-doc';

interface RequestDocTableProps {
  title: string;
  rows: DocFieldRow[];
}

export function RequestDocTable({ title, rows }: RequestDocTableProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-sm font-semibold tracking-wide text-gray-300 uppercase">{title}</h2>

      {rows.length === 0
        ? (
            <p className="text-sm text-gray-500">No fields yet.</p>
          )
        : (
            <div className="overflow-x-auto rounded border border-gray-700">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-gray-800 text-xs tracking-wide text-gray-400 uppercase">
                  <tr>
                    <th className="px-3 py-2 font-medium">Key</th>
                    <th className="px-3 py-2 font-medium">Type</th>
                    <th className="px-3 py-2 font-medium">Example</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.key} className="border-t border-gray-700">
                      <td className="px-3 py-2 font-medium text-gray-100">{row.key}</td>
                      <td className="px-3 py-2 text-gray-400">{row.type}</td>
                      <td className="px-3 py-2 break-all text-gray-300">{row.example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
    </section>
  );
}
