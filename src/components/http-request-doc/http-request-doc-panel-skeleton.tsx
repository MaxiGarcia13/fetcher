import { Skeleton } from '../skeleton';

const sectionTitleClass
  = 'text-sm font-semibold tracking-wide text-app-text-muted uppercase';

function DocTableSectionSkeleton({ title }: { title: string }) {
  return (
    <section className="space-y-3">
      <h2 className={sectionTitleClass}>{title}</h2>

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
            {[0, 1].map((index) => (
              <tr key={index} className="border-t border-app-border">
                <td className="px-3 py-2">
                  <Skeleton className="h-4 w-24" />
                </td>
                <td className="px-3 py-2">
                  <Skeleton className="h-4 w-16" />
                </td>
                <td className="px-3 py-2">
                  <Skeleton className="h-4 w-full max-w-[200px]" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function HttpRequestDocPanelSkeleton() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className={sectionTitleClass}>Method</h2>
      <Skeleton className="h-7 w-16" />

      <section className="space-y-3">
        <h2 className={sectionTitleClass}>URL</h2>
        <Skeleton className="h-[42px] w-full rounded border border-app-border" />
      </section>

      <DocTableSectionSkeleton title="Headers" />
      <DocTableSectionSkeleton title="Params" />
      <DocTableSectionSkeleton title="Body" />
    </section>
  );
}
