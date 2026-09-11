import { SearchX } from 'lucide-react';
import DoctorCard from './DoctorCard';

export default function DoctorGrid({ doctors = [], onClearFilters = () => {} }) {
  if (!doctors.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-sand-200 bg-white px-6 py-14 text-center shadow-[0_10px_30px_rgba(15,23,42,0.03)]">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-600">
          <SearchX size={24} strokeWidth={2.2} />
        </div>
        <h3 className="text-xl font-bold text-ink-900">No doctors found</h3>
        <p className="mt-2 max-w-md text-sm text-ink-900/60">Try changing your filters or clearing the current search to see more doctors.</p>
        <button
          type="button"
          onClick={onClearFilters}
          className="mt-5 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(37,99,235,0.18)] transition hover:bg-brand-700"
        >
          Clear Filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {doctors.map((d) => (
        <DoctorCard key={d.id} doctor={d} />
      ))}
    </div>
  );
}
