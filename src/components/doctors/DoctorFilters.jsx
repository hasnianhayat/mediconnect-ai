import { ChevronDown, MapPin, Building2, BriefcaseMedical, Search } from 'lucide-react';

export default function DoctorFilters({
  selectedRegion = '',
  selectedCity = '',
  selectedCategory = '',
  availableRegions = [],
  availableCities = [],
  availableCategories = [],
  onRegionChange = () => {},
  onCityChange = () => {},
  onCategoryChange = () => {},
  onClearFilters = () => {},
  onSearch = () => {},
  showSearchButton = false,
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 rounded-[18px]  bg-white p-3  md:flex-row md:items-center md:gap-3">
        <div className="relative min-w-0 flex-1">
          <span className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-brand-600">
            <MapPin size={18} strokeWidth={2.2} />
          </span>
          <select
            value={selectedRegion}
            onChange={(e) => onRegionChange(e.target.value)}
            className="h-14 w-full appearance-none rounded-2xl border border-sand-200 bg-white pl-11 pr-10 text-base font-medium text-ink-900 focus:border-brand-600 focus:outline-none"
          >
            <option value="">Select Region</option>
            {availableRegions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <ChevronDown size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-brand-700" />
        </div>

        <div className="relative min-w-0 flex-1">
          <span className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-brand-600">
            <Building2 size={18} strokeWidth={2.2} />
          </span>
          <select
            value={selectedCity}
            onChange={(e) => onCityChange(e.target.value)}
            className="h-14 w-full appearance-none rounded-2xl border border-sand-200 bg-white pl-11 pr-10 text-base font-medium text-ink-900 focus:border-brand-600 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
            disabled={!availableCities.length}
          >
            <option value="">Select City</option>
            {availableCities.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <ChevronDown size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-brand-700" />
        </div>

        <div className="relative min-w-0 flex-1">
          <span className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-brand-600">
            <BriefcaseMedical size={18} strokeWidth={2.2} />
          </span>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="h-14 w-full appearance-none rounded-2xl border border-sand-200 bg-white pl-11 pr-10 text-base font-medium text-ink-900 focus:border-brand-600 focus:outline-none"
          >
            <option value="">Select Category</option>
            {availableCategories.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <ChevronDown size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-brand-700" />
        </div>

        {showSearchButton && (
          <button
            type="button"
            onClick={onSearch}
            className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-brand-600 px-6 text-base font-semibold text-white transition hover:bg-brand-700"
          >
            <Search size={18} strokeWidth={2.2} />
            Search
          </button>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onClearFilters}
          className="text-sm font-semibold text-brand-600 underline-offset-4 hover:underline"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}
