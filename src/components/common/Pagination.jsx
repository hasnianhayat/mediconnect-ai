import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ page = 1, totalPages = 1, onChange = () => {} }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 5);
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        className="grid h-8 w-8 place-items-center rounded-lg border border-sand-200 text-ink-900/60 hover:bg-sand-100"
      >
        <ChevronLeft size={16} />
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`h-8 w-8 rounded-lg text-sm font-semibold ${
            p === page ? 'bg-brand-600 text-white' : 'text-ink-900/60 hover:bg-sand-100'
          }`}
        >
          {p}
        </button>
      ))}
      {totalPages > 5 && <span className="px-1 text-ink-900/40">…</span>}
      <button
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        className="grid h-8 w-8 place-items-center rounded-lg border border-sand-200 text-ink-900/60 hover:bg-sand-100"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
