export default function DataTable({ columns = [], rows = [], renderRow }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[820px] text-left text-sm">
        <thead>
          <tr className="border-b border-sand-200 text-xs font-semibold uppercase tracking-wide text-ink-900/40">
            {columns.map((c) => (
              <th key={c} className="py-3 pr-4">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-sand-100 last:border-0 hover:bg-sand-50/60">
              {renderRow(row, i)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
